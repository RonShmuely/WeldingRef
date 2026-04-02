<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

$logsFile  = __DIR__ . '/../weld-log-data/logs.json';
$imagesDir = __DIR__ . '/../weld-log-data/images/';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($logsFile)) {
        echo '[]';
        exit;
    }
    echo file_get_contents($logsFile);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'] ?? '';
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

    // Handle image uploads with MIME type validation
    $allowedMime = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedExt  = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic'];

    if (!empty($_FILES['images']['name'][0])) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        foreach ($_FILES['images']['tmp_name'] as $i => $tmpName) {
            if (!is_uploaded_file($tmpName)) continue;
            $ext  = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));
            $mime = finfo_file($finfo, $tmpName);
            if (!in_array($ext, $allowedExt) || !in_array($mime, $allowedMime)) continue;
            $filename = uniqid('img_', true) . '.' . $ext;
            if (move_uploaded_file($tmpName, $imagesDir . $filename)) {
                $entry['images'][] = $filename;
            }
        }
        finfo_close($finfo);
    }

    // Write to logs.json with exclusive file lock to prevent race conditions
    $fp = fopen($logsFile, 'c+');
    if (!$fp) {
        http_response_code(500);
        echo json_encode(['error' => 'Could not open log file']);
        exit;
    }
    if (!flock($fp, LOCK_EX)) {
        fclose($fp);
        http_response_code(500);
        echo json_encode(['error' => 'Could not lock log file']);
        exit;
    }
    $size = filesize($logsFile);
    $raw  = $size > 0 ? fread($fp, $size) : '[]';
    $logs = json_decode($raw, true) ?? [];
    array_unshift($logs, $entry);
    $json = json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    ftruncate($fp, 0);
    rewind($fp);
    $written = fwrite($fp, $json);
    flock($fp, LOCK_UN);
    fclose($fp);

    if ($written === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write log file']);
        exit;
    }

    echo json_encode($entry);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
