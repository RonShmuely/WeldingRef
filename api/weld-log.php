<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$logsFile   = __DIR__ . '/../weld-log-data/logs.json';
$imagesDir  = __DIR__ . '/../weld-log-data/images/';

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

    // Handle image uploads
    if (!empty($_FILES['images']['name'][0])) {
        foreach ($_FILES['images']['tmp_name'] as $i => $tmpName) {
            if (!is_uploaded_file($tmpName)) continue;
            $ext      = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));
            $allowed  = ['jpg','jpeg','png','gif','webp','heic'];
            if (!in_array($ext, $allowed)) continue;
            $filename = uniqid('img_', true) . '.' . $ext;
            if (move_uploaded_file($tmpName, $imagesDir . $filename)) {
                $entry['images'][] = $filename;
            }
        }
    }

    // Append to logs.json
    $logs = [];
    if (file_exists($logsFile)) {
        $logs = json_decode(file_get_contents($logsFile), true) ?? [];
    }
    array_unshift($logs, $entry);
    file_put_contents($logsFile, json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    echo json_encode($entry);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
