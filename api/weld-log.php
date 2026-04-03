<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$logsFile     = __DIR__ . '/../weld-log-data/logs.json';
$archivedFile = __DIR__ . '/../weld-log-data/archived/logs.json';
$entriesDir   = __DIR__ . '/../weld-log-data/entries/';
$imagesDir    = __DIR__ . '/../weld-log-data/images/'; // legacy fallback

// Ensure entries directory exists
if (!is_dir($entriesDir)) mkdir($entriesDir, 0755, true);

// ── Helpers ──────────────────────────────────────────────
function readLogs($logsFile) {
    if (!file_exists($logsFile)) return [];
    $raw = file_get_contents($logsFile);
    return json_decode($raw, true) ?? [];
}

function writeLogs($logsFile, $logs) {
    $fp = fopen($logsFile, 'c+');
    if (!$fp) return false;
    if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
    $json    = json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    ftruncate($fp, 0);
    rewind($fp);
    $written = fwrite($fp, $json);
    flock($fp, LOCK_UN);
    fclose($fp);
    return $written !== false;
}

function slugify($text) {
    $text = mb_strtolower($text, 'UTF-8');
    // Transliterate common Hebrew chars to keep slugs readable
    $text = preg_replace('/[^\p{L}\p{N}\s\-]/u', '', $text);
    $text = preg_replace('/[\s\-]+/', '-', $text);
    $text = trim($text, '-');
    if ($text === '') $text = 'entry';
    return mb_substr($text, 0, 50, 'UTF-8');
}

function makeEntryFolder($entry, $entriesDir) {
    $name = ($entry['type'] === 'project')
        ? ($entry['project_name'] ?? 'project')
        : ($entry['machine'] ?? 'repair');
    $date = str_replace('/', '-', $entry['date'] ?? date('d-m-y'));
    $slug = slugify($name) . '_' . $date;

    $folder = $slug;
    $counter = 2;
    while (is_dir($entriesDir . $folder)) {
        $folder = $slug . '-' . $counter;
        $counter++;
    }

    mkdir($entriesDir . $folder, 0755, true);
    return $folder;
}

function writeEntryJson($entriesDir, $folder, $entry) {
    $path = $entriesDir . $folder . '/entry.json';
    file_put_contents($path, json_encode($entry, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function handleImages($targetDir) {
    $saved       = [];
    $allowedMime = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo',
    ];
    $allowedExt  = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'mp4', 'mov', 'webm', 'avi'];
    if (empty($_FILES['images']['name'][0])) return $saved;
    if (!is_dir($targetDir)) mkdir($targetDir, 0755, true);
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    foreach ($_FILES['images']['tmp_name'] as $i => $tmpName) {
        if (!is_uploaded_file($tmpName)) continue;
        $ext  = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));
        $mime = finfo_file($finfo, $tmpName);
        if (!in_array($ext, $allowedExt) || !in_array($mime, $allowedMime)) continue;
        $prefix = in_array($ext, ['mp4','mov','webm','avi']) ? 'vid_' : 'img_';
        $filename = uniqid($prefix, true) . '.' . $ext;
        if (move_uploaded_file($tmpName, $targetDir . $filename)) {
            $saved[] = $filename;
        }
    }
    finfo_close($finfo);
    return $saved;
}

function getEntryImageDir($entry, $entriesDir, $imagesDir) {
    if (!empty($entry['folder'])) {
        return $entriesDir . $entry['folder'] . '/';
    }
    return $imagesDir; // legacy fallback
}

function deleteFolder($dir) {
    if (!is_dir($dir)) return;
    $files = array_diff(scandir($dir), ['.', '..']);
    foreach ($files as $f) {
        $path = $dir . '/' . $f;
        is_dir($path) ? deleteFolder($path) : unlink($path);
    }
    rmdir($dir);
}

// ── GET — return entries (or archived) ───────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $file = !empty($_GET['archive']) ? $archivedFile : $logsFile;
    echo json_encode(readLogs($file));
    exit;
}

// ── DELETE / ARCHIVE / UNARCHIVE ─────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents('php://input'), $input);
    $id          = $input['id']      ?? '';
    $action      = $input['action']  ?? 'delete';
    $fromArchive = !empty($input['archive']);

    if ($action === 'archive') {
        $logs     = readLogs($logsFile);
        $entry    = null;
        $logs     = array_values(array_filter($logs, function($e) use ($id, &$entry) {
            if ($e['id'] === $id) { $entry = $e; return false; }
            return true;
        }));
        if ($entry) {
            $archived = readLogs($archivedFile);
            array_unshift($archived, $entry);
            writeLogs($archivedFile, $archived);
        }
        writeLogs($logsFile, $logs);

    } elseif ($action === 'unarchive') {
        $archived = readLogs($archivedFile);
        $entry    = null;
        $archived = array_values(array_filter($archived, function($e) use ($id, &$entry) {
            if ($e['id'] === $id) { $entry = $e; return false; }
            return true;
        }));
        if ($entry) {
            $logs = readLogs($logsFile);
            array_unshift($logs, $entry);
            writeLogs($logsFile, $logs);
        }
        writeLogs($archivedFile, $archived);

    } else {
        // Hard delete — also remove entry folder
        $file = $fromArchive ? $archivedFile : $logsFile;
        $logs = readLogs($file);
        $deletedEntry = null;
        $logs = array_values(array_filter($logs, function($e) use ($id, &$deletedEntry) {
            if ($e['id'] === $id) { $deletedEntry = $e; return false; }
            return true;
        }));
        writeLogs($file, $logs);

        // Remove entry folder if it exists
        if ($deletedEntry && !empty($deletedEntry['folder'])) {
            $folderPath = $entriesDir . basename($deletedEntry['folder']);
            deleteFolder($folderPath);
        }
        // Also remove legacy images
        if ($deletedEntry && !empty($deletedEntry['images']) && empty($deletedEntry['folder'])) {
            foreach ($deletedEntry['images'] as $img) {
                $path = $imagesDir . basename($img);
                if (file_exists($path)) unlink($path);
            }
        }
    }

    echo json_encode(['ok' => true]);
    exit;
}

// ── POST — create new or update existing ─────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id   = $_POST['id'] ?? '';
    $type = $_POST['type'] ?? '';

    // ── UPDATE existing entry ─────────────────────────────
    if ($id !== '') {
        $logs = readLogs($logsFile);
        $idx  = null;
        foreach ($logs as $i => $e) {
            if ($e['id'] === $id) { $idx = $i; break; }
        }
        if ($idx === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Entry not found']);
            exit;
        }

        $entry = $logs[$idx];
        if (isset($_POST['date']))         $entry['date']         = $_POST['date'];
        if (isset($_POST['machine']))      $entry['machine']      = $_POST['machine'];
        if (isset($_POST['welder']))       $entry['welder']       = $_POST['welder'];
        if (isset($_POST['electrodes']))   $entry['electrodes']   = $_POST['electrodes'];
        if (isset($_POST['amps']))         $entry['amps']         = $_POST['amps'];
        if (isset($_POST['description']))  $entry['description']  = $_POST['description'];
        if (isset($_POST['project_name'])) $entry['project_name'] = $_POST['project_name'];
        if (isset($_POST['notes']))        $entry['notes']        = $_POST['notes'];
        if (isset($_POST['status']))       $entry['status']       = $_POST['status'];
        if (isset($_POST['start_date']))   $entry['start_date']   = $_POST['start_date'];
        if (isset($_POST['end_date']))     $entry['end_date']     = $_POST['end_date'];

        // Determine image directory for this entry
        $imgDir = getEntryImageDir($entry, $entriesDir, $imagesDir);

        // Append any new images
        $newImages = handleImages($imgDir);
        if ($newImages) $entry['images'] = array_merge($entry['images'] ?? [], $newImages);

        // Remove individually deleted images
        if (!empty($_POST['remove_images'])) {
            $toRemove        = json_decode($_POST['remove_images'], true) ?? [];
            $entry['images'] = array_values(array_filter($entry['images'], fn($img) => !in_array($img, $toRemove)));
            foreach ($toRemove as $img) {
                $path = $imgDir . basename($img);
                if (file_exists($path)) unlink($path);
            }
        }

        // Update entry.json in folder
        if (!empty($entry['folder'])) {
            writeEntryJson($entriesDir, $entry['folder'], $entry);
        }

        $logs[$idx] = $entry;
        writeLogs($logsFile, $logs);
        echo json_encode($entry);
        exit;
    }

    // ── CREATE new entry ──────────────────────────────────
    if (!in_array($type, ['repair', 'project'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid type']);
        exit;
    }

    $entry = [
        'id'        => uniqid('', true),
        'type'      => $type,
        'date'      => $_POST['date'] ?? '',
        'images'    => [],
        'createdAt' => date('c'),
    ];

    if ($type === 'repair') {
        $entry['machine']     = $_POST['machine']     ?? '';
        $entry['welder']      = $_POST['welder']      ?? '';
        $entry['electrodes']  = $_POST['electrodes']  ?? '';
        $entry['amps']        = $_POST['amps']         ?? '';
        $entry['description'] = $_POST['description'] ?? '';
    } else {
        $entry['project_name'] = $_POST['project_name'] ?? '';
        $entry['notes']        = $_POST['notes']        ?? '';
        $entry['status']       = $_POST['status']       ?? 'ongoing';
        $entry['start_date']   = $_POST['start_date']   ?? $entry['date'];
        $entry['end_date']     = $_POST['end_date']     ?? '';
    }

    // Create per-entry folder
    $folder = makeEntryFolder($entry, $entriesDir);
    $entry['folder'] = $folder;

    // Save images into the entry folder
    $entry['images'] = handleImages($entriesDir . $folder . '/');

    // Write entry.json into the folder
    writeEntryJson($entriesDir, $folder, $entry);

    $logs = readLogs($logsFile);
    array_unshift($logs, $entry);
    if (!writeLogs($logsFile, $logs)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write log file']);
        exit;
    }

    echo json_encode($entry);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
