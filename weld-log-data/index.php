<?php
/**
 * Weld Log Data Browser
 * Shows per-entry folders with their images and data.
 * Supports deleting entries and individual images.
 */

$baseDir    = __DIR__;
$entriesDir = $baseDir . '/entries';
$imagesDir  = $baseDir . '/images';

// ── Handle DELETE actions via POST ──
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'delete_entry') {
        $folder = basename($_POST['folder'] ?? '');
        $path = $entriesDir . '/' . $folder;
        if ($folder && is_dir($path)) {
            // Also remove from logs.json and archived/logs.json
            foreach ([$baseDir . '/logs.json', $baseDir . '/archived/logs.json'] as $logFile) {
                if (!file_exists($logFile)) continue;
                $logs = json_decode(file_get_contents($logFile), true) ?? [];
                $filtered = array_values(array_filter($logs, fn($e) => ($e['folder'] ?? '') !== $folder));
                if (count($filtered) !== count($logs)) {
                    file_put_contents($logFile, json_encode($filtered, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
                }
            }
            // Remove folder and contents
            $files = array_diff(scandir($path), ['.', '..']);
            foreach ($files as $f) unlink($path . '/' . $f);
            rmdir($path);
        }
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    }

    if ($action === 'delete_image') {
        $folder = basename($_POST['folder'] ?? '');
        $image  = basename($_POST['image'] ?? '');
        $isLegacy = !empty($_POST['legacy']);

        if ($isLegacy && $image) {
            $imgPath = $imagesDir . '/' . $image;
            if (file_exists($imgPath)) unlink($imgPath);
            // Remove from logs
            foreach ([$baseDir . '/logs.json', $baseDir . '/archived/logs.json'] as $logFile) {
                if (!file_exists($logFile)) continue;
                $logs = json_decode(file_get_contents($logFile), true) ?? [];
                $changed = false;
                foreach ($logs as &$e) {
                    if (!empty($e['images']) && in_array($image, $e['images'])) {
                        $e['images'] = array_values(array_filter($e['images'], fn($i) => $i !== $image));
                        $changed = true;
                    }
                }
                unset($e);
                if ($changed) file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            }
        } elseif ($folder && $image) {
            $imgPath = $entriesDir . '/' . $folder . '/' . $image;
            if (file_exists($imgPath)) unlink($imgPath);
            // Update entry.json
            $jsonPath = $entriesDir . '/' . $folder . '/entry.json';
            if (file_exists($jsonPath)) {
                $entry = json_decode(file_get_contents($jsonPath), true) ?? [];
                $entry['images'] = array_values(array_filter($entry['images'] ?? [], fn($i) => $i !== $image));
                file_put_contents($jsonPath, json_encode($entry, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            }
            // Update logs.json
            foreach ([$baseDir . '/logs.json', $baseDir . '/archived/logs.json'] as $logFile) {
                if (!file_exists($logFile)) continue;
                $logs = json_decode(file_get_contents($logFile), true) ?? [];
                $changed = false;
                foreach ($logs as &$e) {
                    if (($e['folder'] ?? '') === $folder && !empty($e['images']) && in_array($image, $e['images'])) {
                        $e['images'] = array_values(array_filter($e['images'], fn($i) => $i !== $image));
                        $changed = true;
                    }
                }
                unset($e);
                if ($changed) file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            }
        }
        header('Location: ' . $_SERVER['REQUEST_URI']);
        exit;
    }
}

// ── Gather per-entry folders ──
$folders = [];
if (is_dir($entriesDir)) {
    $dirs = scandir($entriesDir, SCANDIR_SORT_DESCENDING);
    foreach ($dirs as $d) {
        if ($d === '.' || $d === '..') continue;
        $path = $entriesDir . '/' . $d;
        if (!is_dir($path)) continue;

        $folder = ['name' => $d, 'images' => [], 'entry' => null];

        $jsonPath = $path . '/entry.json';
        if (file_exists($jsonPath)) {
            $folder['entry'] = json_decode(file_get_contents($jsonPath), true);
        }

        $files = scandir($path);
        foreach ($files as $f) {
            if ($f === '.' || $f === '..' || $f === 'entry.json') continue;
            $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg','jpeg','png','gif','webp','heic','mp4','mov','webm','avi'])) {
                $folder['images'][] = $f;
            }
        }

        $folders[] = $folder;
    }
}

$legacyImages = [];

$totalFolders = count($folders);
$totalImages  = array_sum(array_map(fn($f) => count($f['images']), $folders)) + count($legacyImages);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Weld Log Data</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0e0e0f;
    color: #f0f0f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    padding: 20px;
    min-height: 100vh;
  }
  h1 { font-size: 20px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  h1 span { color: #e8290b; }
  .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
  .back-link { display: inline-block; color: #888; text-decoration: none; font-size: 13px; margin-bottom: 20px; transition: color .2s; }
  .back-link:hover { color: #f0f0f0; }
  .section { background: #161618; border: 1px solid #2a2a2e; border-radius: 8px; padding: 16px; margin-bottom: 16px; position: relative; }
  .section-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 4px; }
  .section-title { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; }
  .section-meta { font-size: 12px; color: #666; margin-bottom: 12px; }
  .section-meta strong { color: #f5a623; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
  .grid-item { position: relative; border-radius: 4px; overflow: hidden; border: 1px solid #2a2a2e; transition: border-color .2s; }
  .grid-item:hover { border-color: #e8290b; }
  .grid-item img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; cursor: pointer; }
  .grid-item a { display: block; }
  .entry-desc { font-size: 13px; color: #ccc; margin-bottom: 10px; line-height: 1.4; }
  .entry-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: 2px 8px; border-radius: 3px; margin-left: 8px; }
  .badge-repair { background: rgba(232,41,11,.15); color: #e8290b; border: 1px solid rgba(232,41,11,.3); }
  .badge-project { background: rgba(62,168,255,.15); color: #3ea8ff; border: 1px solid rgba(62,168,255,.3); }
  .empty { color: #888; font-size: 13px; padding: 10px 0; }
  .no-images { color: #555; font-size: 12px; font-style: italic; }

  /* Delete buttons */
  .del-entry-btn {
    background: none; border: 1px solid rgba(232,41,11,.3); border-radius: 4px;
    color: #e8290b; cursor: pointer; font-size: 11px; font-weight: 600;
    padding: 4px 10px; transition: background .15s, color .15s; white-space: nowrap;
  }
  .del-entry-btn:hover { background: rgba(232,41,11,.15); color: #ff6b47; }
  .del-img-btn {
    position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,.7);
    border: none; border-radius: 50%; color: #e8290b; cursor: pointer;
    font-size: 12px; font-weight: 700; width: 22px; height: 22px;
    display: none; align-items: center; justify-content: center; line-height: 1;
    transition: background .15s;
  }
  .del-img-btn:hover { background: rgba(232,41,11,.4); color: #fff; }
  .grid-item:hover .del-img-btn { display: flex; }
</style>
</head>
<body>
  <a href="/" class="back-link">&larr; Back to WeldRef</a>
  <h1>Weld Log <span>Data</span></h1>
  <p class="subtitle"><?= $totalFolders ?> entr<?= $totalFolders !== 1 ? 'ies' : 'y' ?> &middot; <?= $totalImages ?> image<?= $totalImages !== 1 ? 's' : '' ?></p>

  <?php if (empty($folders) && empty($legacyImages)): ?>
    <p class="empty">No entries or images yet.</p>
  <?php endif; ?>

  <?php foreach ($folders as $folder): ?>
    <div class="section">
      <div class="section-header">
        <div class="section-title">
          <?= htmlspecialchars($folder['name']) ?>
          <?php if ($folder['entry']): ?>
            <span class="entry-badge <?= $folder['entry']['type'] === 'repair' ? 'badge-repair' : 'badge-project' ?>">
              <?= htmlspecialchars($folder['entry']['type']) ?>
            </span>
          <?php endif; ?>
        </div>
        <form method="POST" onsubmit="return confirm('Delete this entire entry and all its images?')">
          <input type="hidden" name="action" value="delete_entry">
          <input type="hidden" name="folder" value="<?= htmlspecialchars($folder['name']) ?>">
          <button type="submit" class="del-entry-btn">Delete Entry</button>
        </form>
      </div>

      <?php if ($folder['entry']): ?>
        <div class="section-meta">
          <?= htmlspecialchars($folder['entry']['date'] ?? '') ?>
          <?php if (!empty($folder['entry']['machine'])): ?>
            &middot; <strong><?= htmlspecialchars($folder['entry']['machine']) ?></strong>
          <?php elseif (!empty($folder['entry']['project_name'])): ?>
            &middot; <strong><?= htmlspecialchars($folder['entry']['project_name']) ?></strong>
          <?php endif; ?>
        </div>
        <?php if (!empty($folder['entry']['description'])): ?>
          <div class="entry-desc"><?= htmlspecialchars($folder['entry']['description']) ?></div>
        <?php elseif (!empty($folder['entry']['notes'])): ?>
          <div class="entry-desc"><?= htmlspecialchars($folder['entry']['notes']) ?></div>
        <?php endif; ?>
      <?php endif; ?>

      <?php if (count($folder['images']) > 0): ?>
        <div class="grid">
          <?php foreach ($folder['images'] as $img): ?>
            <div class="grid-item">
              <a href="entries/<?= htmlspecialchars($folder['name']) ?>/<?= htmlspecialchars($img) ?>" target="_blank">
                <img src="entries/<?= htmlspecialchars($folder['name']) ?>/<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($img) ?>" loading="lazy">
              </a>
              <form method="POST" onsubmit="return confirm('Delete this image?')" style="margin:0">
                <input type="hidden" name="action" value="delete_image">
                <input type="hidden" name="folder" value="<?= htmlspecialchars($folder['name']) ?>">
                <input type="hidden" name="image" value="<?= htmlspecialchars($img) ?>">
                <button type="submit" class="del-img-btn" title="Delete image">✕</button>
              </form>
            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <p class="no-images">No images</p>
      <?php endif; ?>
    </div>
  <?php endforeach; ?>

  <?php if (!empty($legacyImages)): ?>
    <div class="section">
      <div class="section-title">Legacy Images (unmigrated)</div>
      <div class="section-meta"><?= count($legacyImages) ?> image<?= count($legacyImages) !== 1 ? 's' : '' ?> &middot; Run <code>/api/migrate-entries.php</code> to organize</div>
      <div class="grid">
        <?php foreach ($legacyImages as $img): ?>
          <div class="grid-item">
            <a href="images/<?= htmlspecialchars($img) ?>" target="_blank">
              <img src="images/<?= htmlspecialchars($img) ?>" alt="<?= htmlspecialchars($img) ?>" loading="lazy">
            </a>
            <form method="POST" onsubmit="return confirm('Delete this image?')" style="margin:0">
              <input type="hidden" name="action" value="delete_image">
              <input type="hidden" name="image" value="<?= htmlspecialchars($img) ?>">
              <input type="hidden" name="legacy" value="1">
              <button type="submit" class="del-img-btn" title="Delete image">✕</button>
            </form>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>
</body>
</html>
