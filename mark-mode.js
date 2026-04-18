/* mark-mode.js — visual annotation overlay for web-cowork
 * Activates a crosshair picker; click any element to attach a comment.
 * All marks are stored in window.__marks and can be read back by Claude via page.evaluate().
 * Load via:  <script src="mark-mode.js"></script>  OR  fetch('/mark-mode.js').then(r=>r.text()).then(eval)
 */
(function () {
  if (window.__markMode) { console.log('[mark-mode] already active'); return; }

  const css = `
    #mm-cursor-style * { cursor: crosshair !important; }
    .mm-hover { outline: 2px dashed #d97757 !important; outline-offset: 2px !important; background: rgba(217,119,87,0.08) !important; }
    .mm-marked { outline: 2px solid #d97757 !important; outline-offset: 2px !important; }
    #mm-panel {
      position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
      z-index: 999999;
      background: #141413; color: #faf9f5;
      border-radius: 999px;
      padding: 8px 14px 8px 18px;
      font: 500 13px/1 "Poppins", -apple-system, system-ui, sans-serif;
      display: flex; align-items: center; gap: 12px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.4);
      user-select: none;
    }
    #mm-panel .mm-pill { background: #d97757; color: #fff; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 600; }
    #mm-panel button { background: #2b2a26; color: #faf9f5; border: none; border-radius: 999px; padding: 6px 12px; font: 500 12px "Poppins", sans-serif; cursor: pointer; }
    #mm-panel button:hover { background: #3a3834; }
    #mm-panel button.mm-primary { background: #d97757; color: #fff; }
    #mm-panel button.mm-primary:hover { filter: brightness(1.1); }
    #mm-input-wrap {
      position: fixed; z-index: 999998;
      background: #fff; color: #141413;
      border: 1px solid #d97757;
      border-radius: 12px;
      padding: 10px;
      box-shadow: 0 16px 48px rgba(20,20,19,0.25);
      width: 280px;
      font: 13px "Poppins", -apple-system, system-ui, sans-serif;
    }
    #mm-input-wrap textarea { width: 100%; min-height: 64px; border: 1px solid #e8e6dc; border-radius: 8px; padding: 8px 10px; font: inherit; resize: vertical; outline: none; box-sizing: border-box; }
    #mm-input-wrap textarea:focus { border-color: #d97757; }
    #mm-input-wrap .mm-row { display: flex; gap: 6px; justify-content: flex-end; margin-top: 8px; }
    #mm-input-wrap button { background: #f5f4ee; color: #141413; border: 1px solid #e8e6dc; border-radius: 8px; padding: 6px 12px; font: 500 12px "Poppins", sans-serif; cursor: pointer; }
    #mm-input-wrap button.mm-primary { background: #d97757; color: #fff; border-color: #d97757; }
    #mm-input-wrap .mm-hint { font-size: 11px; color: #6d6b62; margin-bottom: 6px; line-height: 1.4; max-height: 3em; overflow: hidden; }
    .mm-badge {
      position: absolute;
      background: #d97757; color: #fff;
      font: 600 11px "Poppins", sans-serif;
      border-radius: 999px;
      padding: 2px 7px;
      pointer-events: none;
      box-shadow: 0 4px 10px rgba(217,119,87,0.5);
      z-index: 999997;
    }
  `;
  const style = document.createElement('style');
  style.id = 'mm-style';
  style.textContent = css;
  document.head.appendChild(style);
  document.documentElement.id = 'mm-cursor-style';

  const marks = window.__marks = window.__marks || [];
  let currentHover = null;
  let picking = true;

  const panel = document.createElement('div');
  panel.id = 'mm-panel';
  panel.innerHTML = `
    <span>✦ Mark Mode</span>
    <span class="mm-pill" id="mm-count">0</span>
    <button id="mm-toggle">Pause</button>
    <button id="mm-clear">Clear</button>
    <button class="mm-primary" id="mm-export">Copy JSON</button>
    <button id="mm-exit" title="Exit">✕</button>
  `;
  document.body.appendChild(panel);

  function cssPath(el) {
    if (!(el instanceof Element)) return '';
    const parts = [];
    let n = el;
    while (n && n.nodeType === 1 && parts.length < 6) {
      let part = n.nodeName.toLowerCase();
      if (n.id) { part += '#' + n.id; parts.unshift(part); break; }
      if (n.className && typeof n.className === 'string') {
        const cls = n.className.trim().split(/\s+/).filter(c => !c.startsWith('mm-')).slice(0, 2).join('.');
        if (cls) part += '.' + cls;
      }
      const siblings = Array.from(n.parentNode?.children || []).filter(s => s.nodeName === n.nodeName);
      if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(n) + 1})`;
      parts.unshift(part);
      n = n.parentNode;
    }
    return parts.join(' > ');
  }

  function textSnippet(el) {
    const t = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
    return t.length > 80 ? t.slice(0, 80) + '…' : t;
  }

  function renderBadges() {
    document.querySelectorAll('.mm-badge').forEach(b => b.remove());
    document.querySelectorAll('.mm-marked').forEach(el => el.classList.remove('mm-marked'));
    marks.forEach((m, i) => {
      try {
        const el = document.querySelector(m.selector);
        if (!el) return;
        el.classList.add('mm-marked');
        const r = el.getBoundingClientRect();
        const badge = document.createElement('div');
        badge.className = 'mm-badge';
        badge.textContent = '#' + (i + 1);
        badge.style.top = (r.top + window.scrollY - 8) + 'px';
        badge.style.left = (r.left + window.scrollX - 8) + 'px';
        badge.title = m.comment;
        document.body.appendChild(badge);
      } catch (e) {}
    });
    const countEl = document.getElementById('mm-count');
    if (countEl) countEl.textContent = marks.length;
  }
  window.__renderMarks = renderBadges;

  function onMouseMove(e) {
    if (!picking) return;
    const el = e.target;
    if (el.closest('#mm-panel, #mm-input-wrap, .mm-badge')) return;
    if (currentHover && currentHover !== el) currentHover.classList.remove('mm-hover');
    currentHover = el;
    el.classList.add('mm-hover');
  }

  function onClick(e) {
    if (!picking) return;
    const el = e.target;
    if (el.closest('#mm-panel, #mm-input-wrap, .mm-badge')) return;
    e.preventDefault(); e.stopPropagation();
    el.classList.remove('mm-hover');
    currentHover = null;

    document.querySelectorAll('#mm-input-wrap').forEach(x => x.remove());
    const wrap = document.createElement('div');
    wrap.id = 'mm-input-wrap';
    const r = el.getBoundingClientRect();
    wrap.style.top = Math.min(window.innerHeight - 180, r.bottom + window.scrollY + 8) + 'px';
    wrap.style.left = Math.min(window.innerWidth - 300, r.left + window.scrollX) + 'px';
    wrap.innerHTML = `
      <div class="mm-hint"><b>${el.tagName.toLowerCase()}</b>: ${textSnippet(el).replace(/</g, '&lt;') || '<em>no text</em>'}</div>
      <textarea placeholder="What's wrong or what should change?" autofocus></textarea>
      <div class="mm-row">
        <button id="mm-cancel">Cancel</button>
        <button class="mm-primary" id="mm-save">Save mark</button>
      </div>
    `;
    document.body.appendChild(wrap);
    const ta = wrap.querySelector('textarea');
    ta.focus();

    wrap.querySelector('#mm-cancel').onclick = () => wrap.remove();
    const save = () => {
      const comment = ta.value.trim();
      if (!comment) { wrap.remove(); return; }
      marks.push({
        id: marks.length + 1,
        selector: cssPath(el),
        tag: el.tagName.toLowerCase(),
        text: textSnippet(el),
        comment,
        timestamp: new Date().toISOString()
      });
      wrap.remove();
      renderBadges();
    };
    wrap.querySelector('#mm-save').onclick = save;
    ta.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) save();
      if (ev.key === 'Escape') wrap.remove();
    });
  }

  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('click', onClick, true);
  window.addEventListener('scroll', renderBadges, true);
  window.addEventListener('resize', renderBadges);

  panel.querySelector('#mm-toggle').onclick = (e) => {
    picking = !picking;
    e.target.textContent = picking ? 'Pause' : 'Resume';
    if (!picking && currentHover) { currentHover.classList.remove('mm-hover'); currentHover = null; }
  };
  panel.querySelector('#mm-clear').onclick = () => { marks.length = 0; renderBadges(); };
  panel.querySelector('#mm-export').onclick = async () => {
    const json = JSON.stringify(marks, null, 2);
    const btn = panel.querySelector('#mm-export');
    try { await navigator.clipboard.writeText(json); btn.textContent = 'Copied ✓'; setTimeout(() => btn.textContent = 'Copy JSON', 1400); }
    catch { console.log(json); btn.textContent = 'Logged to console'; setTimeout(() => btn.textContent = 'Copy JSON', 1400); }
  };
  panel.querySelector('#mm-exit').onclick = () => {
    document.documentElement.removeAttribute('id');
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click', onClick, true);
    window.removeEventListener('scroll', renderBadges, true);
    window.removeEventListener('resize', renderBadges);
    document.querySelectorAll('.mm-hover,.mm-marked').forEach(el => el.classList.remove('mm-hover', 'mm-marked'));
    document.querySelectorAll('.mm-badge, #mm-panel, #mm-input-wrap, #mm-style').forEach(x => x.remove());
    window.__markMode = false;
  };

  window.__markMode = true;
  console.log('[mark-mode] active — window.__marks collects annotations');
})();
