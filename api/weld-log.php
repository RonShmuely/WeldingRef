<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

$logsFile  = __DIR__ . '/../weld-log-data/logs.json';
$imagesDir = __DIR__ . '/../weld-log-data/images/';

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

function handleImages($imagesDir) {
    $saved       = [];
    $allowedMime = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExt  = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'];
    if (empty($_FILES['images']['name'][0])) return $saved;
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    foreach ($_FILES['images']['tmp_name'] as $i => $tmpName) {
        if (!is_uploaded_file($tmpName)) continue;
        $ext  = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));
        $mime = finfo_file($finfo, $tmpName);
        if (!in_array($ext, $allowedExt) || !in_array($mime, $allowedMime)) continue;
        $filename = uniqid('img_', true) . '.' . $ext;
        if (move_uploaded_file($tmpName, $imagesDir . $filename)) {
            $saved[] = $filename;
        }
    }
    finfo_close($finfo);
    return $saved;
}

// ── GET — return all entries ──────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(readLogs($logsFile));
    exit;
}

// ── DELETE — remove entry by id ──────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents('php://input'), $input);
    $id   = $input['id'] ?? '';
    $logs = readLogs($logsFile);
    $logs = array_values(array_filter($logs, fn($e) => $e['id'] !== $id));
    writeLogs($logsFile, $logs);
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
        if (isset($_POST['electrodes']))   $entry['electrodes']   = $_POST['electrodes'];
        if (isset($_POST['amps']))         $entry['amps']         = $_POST['amps'];
        if (isset($_POST['description']))  $entry['description']  = $_POST['description'];
        if (isset($_POST['project_name'])) $entry['project_name'] = $_POST['project_name'];
        if (isset($_POST['notes']))        $entry['notes']        = $_POST['notes'];

        // Append any new images
        $newImages = handleImages($imagesDir);
        if ($newImages) $entry['images'] = array_merge($entry['images'] ?? [], $newImages);

        // Remove individually deleted images
        if (!empty($_POST['remove_images'])) {
            $toRemove        = json_decode($_POST['remove_images'], true) ?? [];
            $entry['images'] = array_values(array_filter($entry['images'], fn($img) => !in_array($img, $toRemove)));
            foreach ($toRemove as $img) {
                $path = $imagesDir . basename($img);
                if (file_exists($path)) unlink($path);
            }
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
        $entry['electrodes']  = $_POST['electrodes']  ?? '';
        $entry['amps']        = $_POST['amps']        ?? '';
        $entry['description'] = $_POST['description'] ?? '';
    } else {
        $entry['project_name'] = $_POST['project_name'] ?? '';
        $entry['notes']        = $_POST['notes']        ?? '';
    }

    $entry['images'] = handleImages($imagesDir);

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
