<?php
/**
 * One-time migration: moves images from flat /images/ dir into per-entry folders.
 * Run once via browser: https://yoursite/api/migrate-entries.php
 * Safe to re-run — skips entries that already have a folder.
 */
header('Content-Type: text/plain; charset=utf-8');

$logsFile     = __DIR__ . '/../weld-log-data/logs.json';
$archivedFile = __DIR__ . '/../weld-log-data/archived/logs.json';
$entriesDir   = __DIR__ . '/../weld-log-data/entries/';
$imagesDir    = __DIR__ . '/../weld-log-data/images/';

if (!is_dir($entriesDir)) mkdir($entriesDir, 0755, true);

function slugify($text) {
    $text = mb_strtolower($text, 'UTF-8');
    $text = preg_replace('/[^\p{L}\p{N}\s\-]/u', '', $text);
    $text = preg_replace('/[\s\-]+/', '-', $text);
    $text = trim($text, '-');
    if ($text === '') $text = 'entry';
    return mb_substr($text, 0, 50, 'UTF-8');
}

function makeFolder($entry, $entriesDir) {
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

function migrateFile(&$logs, $entriesDir, $imagesDir) {
    $migrated = 0;
    $skipped  = 0;

    foreach ($logs as &$entry) {
        // Skip if already migrated
        if (!empty($entry['folder'])) {
            $skipped++;
            continue;
        }

        // Create folder
        $folder = makeFolder($entry, $entriesDir);
        $entry['folder'] = $folder;

        // Move images
        if (!empty($entry['images'])) {
            foreach ($entry['images'] as $img) {
                $src = $imagesDir . $img;
                $dst = $entriesDir . $folder . '/' . $img;
                if (file_exists($src)) {
                    rename($src, $dst);
                    echo "  Moved: $img -> entries/$folder/$img\n";
                } else {
                    echo "  Warning: $img not found in images/\n";
                }
            }
        }

        // Write entry.json
        $jsonPath = $entriesDir . $folder . '/entry.json';
        file_put_contents($jsonPath, json_encode($entry, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        echo "Migrated: $folder (id: {$entry['id']})\n";
        $migrated++;
    }
    unset($entry);

    return [$migrated, $skipped];
}

// ── Migrate active logs ──
echo "=== Migrating active entries ===\n";
$logs = [];
if (file_exists($logsFile)) {
    $logs = json_decode(file_get_contents($logsFile), true) ?? [];
}
[$m1, $s1] = migrateFile($logs, $entriesDir, $imagesDir);
file_put_contents($logsFile, json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Active: $m1 migrated, $s1 skipped\n\n";

// ── Migrate archived logs ──
echo "=== Migrating archived entries ===\n";
$archived = [];
if (file_exists($archivedFile)) {
    $archived = json_decode(file_get_contents($archivedFile), true) ?? [];
}
[$m2, $s2] = migrateFile($archived, $entriesDir, $imagesDir);
file_put_contents($archivedFile, json_encode($archived, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "Archived: $m2 migrated, $s2 skipped\n\n";

$total = $m1 + $m2;
echo "=== Done! $total entries migrated. ===\n";
if ($total > 0) {
    echo "You can now safely delete the /weld-log-data/images/ directory if it's empty.\n";
}
