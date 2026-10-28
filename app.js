const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const I = {
  chev: '<svg class="i sm" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  check: '<svg class="i sm" viewBox="0 0 24 24" style="color:var(--ok)"><path d="M20 6 9 17l-5-5"/></svg>',
  cross: '<svg class="i sm" viewBox="0 0 24 24" style="color:var(--bad)"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  warn: '<svg class="i sm" viewBox="0 0 24 24" style="margin-top:2px"><path d="M12 3 2 20h20zM12 10v4M12 17h.01"/></svg>',
  play: '<svg class="i sm" viewBox="0 0 24 24" style="width:11px;height:11px;fill:currentColor"><path d="M6 4l14 8-14 8z"/></svg>',
  sun: '<svg class="i sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  bolt: '<svg class="i sm" viewBox="0 0 24 24" style="fill:currentColor;stroke:none"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  arrowL: '<svg class="i sm" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  moon: '<svg class="i sm" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
};
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200); }
async function copy(text, msg) { try { await navigator.clipboard.writeText(text); toast(msg || 'Copied'); } catch (e) { toast('Copy blocked. Select the text instead.'); } }
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- theme (light by default) ---------- */
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('gl-theme', t); } catch (e) {}
  $('#themeBtn').innerHTML = t === 'dark' ? I.sun : I.moon;
  $('#themeBtn').setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
$('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
setTheme(document.documentElement.dataset.theme || 'light');

/* app marks, used only to identify the app */
const L = {
  gmail: s => `<svg viewBox="52 42 88 66" width="${s}" height="${s * .75}" aria-hidden="true"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>`,
};

/* ---------- views ---------- */
const VIEWS = ['guide', 'library', 'generate', 'planner', 'app', 'verify'];
var ctxApp = null;
function show(v, arg) {
  if (v === 'guide') ctxApp = null;
  if (v === 'app' && (!arg || arg === 'gmail')) v = arg === 'gmail' ? 'guide' : 'library';
  VIEWS.forEach(n => $('#v-' + n).hidden = n !== v);
  $$('.nav[data-view]').forEach(b => b.classList.toggle('on', b.dataset.view === (v === 'app' ? 'library' : v)));
  if (v === 'app') renderAppGuide(arg);
  /* real history entries, so the browser's back button moves between pages */
  const want = '#' + (v === 'app' ? 'app/' + arg : v);
  try { if (location.hash !== want) history[window.__navReplace ? 'replaceState' : 'pushState'](null, '', want); } catch (e) {}
  window.scrollTo({ top: 0 });
}
document.addEventListener('click', e => {
  const v = e.target.closest('[data-view]'); if (v) show(v.dataset.view);
  const c = e.target.closest('[data-copy]'); if (c) copy(c.dataset.copy, 'Copied');
  if (e.target.closest('[data-agent]')) toggleAgent();
  { const pl = e.target.closest('[data-plan]'); if (pl) { const id = pl.dataset.plan || 'gmail'; picked.add(id); renderPlan(); show('planner'); const ap = (window.APPS_DATA || []).find(x => x.id === id); toast(`${ap ? ap.name : 'App'} is in your launch plan`); } }
});

/* ================= GUIDE DATA ================= */
$('#gLogo').innerHTML = L.gmail(30);
$('#ctxApp').innerHTML = L.gmail(14) + 'Gmail';

/* Google's tiers. Index = severity. */
const TIERS = [
  { n: 'Non-sensitive', cls: 't-easy', col: 'var(--ok)', lv: 1, diff: 'Easy', work: '~1 hr', wait: '2–3 days', waitEv: 'docs', needs: 'Brand check', cost: '$0', costEv: 'docs', review: 'Brand verification', src: 'https://support.google.com/cloud/answer/13463817' },
  { n: 'Sensitive', cls: 't-med', col: 'var(--warn)', lv: 2, diff: 'Medium', work: '1–2 hrs', wait: '3–10 days', waitEv: 'docs', needs: 'Demo video', cost: '$0', costEv: 'docs', review: 'Google review', src: 'https://support.google.com/cloud/answer/13463817' },
  { n: 'Restricted', cls: 't-hard', col: 'var(--bad)', lv: 4, diff: 'Hard', work: '3–4 hrs', wait: '~6 wks', waitEv: 'docs', needs: 'CASA audit', cost: '$540+/yr', costEv: 'est', review: 'Google review + CASA audit', src: 'https://support.google.com/cloud/answer/13463817' },
  { n: 'Full access', cls: 't-hard', col: 'var(--bad)', lv: 5, diff: 'Hardest', work: '4+ hrs', wait: '6+ wks', waitEv: 'est', needs: 'CASA + strong case', cost: '$540+/yr', costEv: 'est', review: 'Google review + CASA audit' },
];
/* scope -> tier, and which scopes it already covers */
const SC = {
  'gmail.labels': { t: 0 },
  'gmail.send': { t: 1 },
  'contacts.readonly': { t: 1 },
  'contacts': { t: 1, covers: ['contacts.readonly'] },
  'gmail.readonly': { t: 2 },
  'gmail.compose': { t: 2, covers: ['gmail.send'] },
  'gmail.insert': { t: 2 },
  'gmail.settings.basic': { t: 2 },
  'gmail.modify': { t: 2, covers: ['gmail.readonly', 'gmail.compose', 'gmail.send', 'gmail.insert', 'gmail.labels'] },
  'mail.google.com/': { t: 3, covers: ['gmail.readonly', 'gmail.compose', 'gmail.send', 'gmail.insert', 'gmail.labels', 'gmail.modify', 'gmail.settings.basic'] },
};
/* 56 of Composio's 63 Gmail tools; scope = narrowest scope Google accepts for the underlying API call (inferred). */
const T = (n, id, s) => ({ n, id: 'GMAIL_' + id, s });
const TOOLS = [
  T('Fetch emails', 'FETCH_EMAILS', ['gmail.readonly']), T('Fetch message by ID', 'FETCH_MESSAGE_BY_MESSAGE_ID', ['gmail.readonly']), T('Fetch message by thread ID', 'FETCH_MESSAGE_BY_THREAD_ID', ['gmail.readonly']),
  T('List messages', 'LIST_MESSAGES', ['gmail.readonly']), T('Get attachment', 'GET_ATTACHMENT', ['gmail.readonly']), T('List threads', 'LIST_THREADS', ['gmail.readonly']),
  T('List history', 'LIST_HISTORY', ['gmail.readonly']), T('Stop watch', 'STOP_WATCH', ['gmail.readonly']), T('Get profile', 'GET_PROFILE', ['gmail.readonly']),
  T('Forward message', 'FORWARD_MESSAGE', ['gmail.readonly', 'gmail.send']),
  T('Send email', 'SEND_EMAIL', ['gmail.send']), T('Reply to thread', 'REPLY_TO_THREAD', ['gmail.send']),
  T('Create email draft', 'CREATE_EMAIL_DRAFT', ['gmail.compose']), T('Get draft', 'GET_DRAFT', ['gmail.compose']), T('List drafts', 'LIST_DRAFTS', ['gmail.compose']),
  T('Update draft', 'UPDATE_DRAFT', ['gmail.compose']), T('Send draft', 'SEND_DRAFT', ['gmail.compose']), T('Delete draft', 'DELETE_DRAFT', ['gmail.compose']),
  T('Import message', 'IMPORT_MESSAGE', ['gmail.insert']), T('Insert message', 'INSERT_MESSAGE', ['gmail.insert']),
  T('Add label to email', 'ADD_LABEL_TO_EMAIL', ['gmail.modify']), T('Modify thread labels', 'MODIFY_THREAD_LABELS', ['gmail.modify']), T('Batch modify messages', 'BATCH_MODIFY_MESSAGES', ['gmail.modify']),
  T('Move to trash', 'MOVE_TO_TRASH', ['gmail.modify']), T('Move thread to trash', 'MOVE_THREAD_TO_TRASH', ['gmail.modify']), T('Untrash message', 'UNTRASH_MESSAGE', ['gmail.modify']), T('Untrash thread', 'UNTRASH_THREAD', ['gmail.modify']),
  T('Create label', 'CREATE_LABEL', ['gmail.labels']), T('Get label', 'GET_LABEL', ['gmail.labels']), T('List labels', 'LIST_LABELS', ['gmail.labels']),
  T('Patch label', 'PATCH_LABEL', ['gmail.labels']), T('Delete label', 'DELETE_LABEL', ['gmail.labels']), T('Remove label', 'REMOVE_LABEL', ['gmail.labels']),
  T('Create filter', 'CREATE_FILTER', ['gmail.settings.basic']), T('Get filter', 'GET_FILTER', ['gmail.settings.basic']), T('List filters', 'LIST_FILTERS', ['gmail.settings.basic']), T('Delete filter', 'DELETE_FILTER', ['gmail.settings.basic']),
  T('Patch send-as', 'PATCH_SEND_AS', ['gmail.settings.basic']),
  T('Get auto-forwarding', 'GET_AUTO_FORWARDING', ['gmail.readonly']), T('Get vacation settings', 'GET_VACATION_SETTINGS', ['gmail.readonly']), T('Get language settings', 'GET_LANGUAGE_SETTINGS', ['gmail.readonly']),
  T('List forwarding addresses', 'LIST_FORWARDING_ADDRESSES', ['gmail.readonly']), T('List send-as', 'LIST_SEND_AS', ['gmail.readonly']), T('Get send-as', 'SETTINGS_SEND_AS_GET', ['gmail.readonly']),
  T('List S/MIME info', 'LIST_SMIME_INFO', ['gmail.readonly']), T('List CSE identities', 'LIST_CSE_IDENTITIES', ['gmail.readonly']), T('List CSE keypairs', 'LIST_CSE_KEYPAIRS', ['gmail.readonly']),
  T('Get IMAP settings', 'SETTINGS_GET_IMAP', ['gmail.readonly']), T('Get POP settings', 'SETTINGS_GET_POP', ['gmail.readonly']),
  T('Get contacts', 'GET_CONTACTS', ['contacts.readonly']), T('Get people', 'GET_PEOPLE', ['contacts.readonly']), T('Search people', 'SEARCH_PEOPLE', ['contacts.readonly']), T('Update contact', 'UPDATE_CONTACT', ['contacts']),
  T('Delete message (permanent)', 'DELETE_MESSAGE', ['mail.google.com/']), T('Batch delete messages', 'BATCH_DELETE_MESSAGES', ['mail.google.com/']), T('Delete thread (permanent)', 'DELETE_THREAD', ['mail.google.com/']),
];
TOOLS.forEach(t => t.tier = Math.max(...t.s.map(s => SC[s].t)));
/* Nothing is selected until the developer tells us: a preset, search, a repo scan or their own scopes. */
const selTools = new Set();
const selScopes = new Set();
let mode = 'tools', pickerQ = '', browsing = false;

function requested() { return mode === 'tools' ? [...new Set(TOOLS.filter(t => selTools.has(t.id)).flatMap(t => t.s))] : [...selScopes]; }
function minimal(list) { return list.filter(s => !list.some(o => o !== s && (SC[o].covers || []).includes(s))); }
function absorbed(list) { return list.filter(s => list.some(o => o !== s && (SC[o].covers || []).includes(s))).map(s => [s, list.find(o => o !== s && (SC[o].covers || []).includes(s))]); }
const need = () => minimal(requested());
const maxTier = () => { const n = need(); return n.length ? Math.max(...n.map(s => SC[s].t)) : -1; };
const toolsCoveredBy = scopes => TOOLS.filter(t => t.s.every(s => scopes.includes(s) || scopes.some(o => (SC[o].covers || []).includes(s))));

/* ---------- ways to connect ---------- */
/* Only routes backed by official docs. Setup times are our estimates and are tagged as such. */
const SRC = {
  composio: 'https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app',
  caps: 'https://support.google.com/cloud/answer/15549945',
  restricted: 'https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification',
};
/* The journey most teams take, in plain words. */
function renderPaths() {
  const mt = maxTier(), tr = curTier(), gs = window.gmailState ? window.gmailState() : { aud: 'public' };
  const ev = (e, href) => `<a class="ev ${e}" href="${href}" target="_blank" rel="noopener" style="text-decoration:none">${e === 'est' ? 'est.' : 'docs'} ↗</a>`;
  const tag = e => `<span class="ev ${e}">${e === 'est' ? 'est.' : 'docs'}</span>`;
  const STAGES = [
    { cls: 'now', badge: ["You're here", 'here'], title: "Use Composio's app", time: 'Today', line: `Works now. Google's screen says "Composio". ${ev('docs', SRC.composio)}` },
    { cls: '', title: 'Test your own app', time: `~30 min ${tag('est')}`, line: `Up to 100 invited users. Access expires every 7 days. ${ev('docs', SRC.caps)}` },
    gs.aud === 'private' ? { cls: 'goal', badge: ['Goal', 'goal'], title: 'Use it in your team', time: `No review ${ev('docs', gs.privSrc)}`, line: 'Internal apps skip verification and the user cap. Only your Workspace org can connect.' } :
    { cls: 'goal', badge: ['Goal', 'goal'], title: 'Get approved by Google', time: `${tr.wait} ${tag(tr.waitEv)}`, line: `Your name on the screen, no user cap.${mt >= 2 ? ' Yearly security audit.' : ''} ${ev('docs', SRC.restricted)}` },
  ];
  $('#journey').innerHTML = STAGES.map((s, i) => `${i ? '<span class="jarrow" aria-hidden="true"><svg class="i sm" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' : ''}
    <div class="stage ${s.cls}">
      <span class="stop"><span class="snum">${i + 1}</span><b class="stitle">${s.title}</b>${s.badge ? `<span class="sbadge ${s.badge[1]}">${s.badge[0]}</span>` : ''}</span>
      <span class="stime">${s.time}</span>
      <span class="sline">${s.line}</span>
    </div>`).join('');
  $('#notes').innerHTML = `
    <div class="note warnnote">${I.warn}<span><b>Don't go live unapproved.</b> Users see a warning, and the user cap never resets. ${ev('docs', SRC.caps)}</span></div>
`;
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]'); if (!g) return;
  if (e.target.closest('a')) return;
  if (g.dataset.goto === 'consent') { openK = 'consent'; renderFlow(); $('#n-consent').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  else $('#flow').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ---------- permissions ---------- */
/* Before the developer answers, every number is a range. */
const NONE = { n: 'Not chosen', lv: 0, col: 'var(--line2)', diff: 'Easy to hard', work: '1–4+ hrs', wait: '2 days – 6+ wks', waitEv: 'est', needs: '—', cost: '$0 – $540+/yr', costEv: 'est', review: 'Google review' };
const curTier = () => maxTier() < 0 ? NONE : TIERS[maxTier()];
const evTag = (e, src) => e === 'docs' && src ? `<a class="ev docs" href="${src}" target="_blank" rel="noopener">docs ↗</a>` : `<span class="ev ${e}">${e === 'est' ? 'est.' : 'docs'}</span>`;
/* the 56 tools grouped by what they do */
const GROUPS = [['read', 'Read mail'], ['send', 'Send & reply'], ['drafts', 'Drafts'], ['labels', 'Labels'], ['organise', 'Organise & trash'], ['settings', 'Settings & filters'], ['contacts', 'Contacts'], ['delete', 'Permanent delete']];
const groupOf = id => { const x = id.slice(6); return /^(DELETE_MESSAGE|BATCH_DELETE_MESSAGES|DELETE_THREAD)$/.test(x) ? 'delete' : /DRAFT/.test(x) ? 'drafts' : /LABEL/.test(x) ? 'labels' : /CONTACT|PEOPLE/.test(x) ? 'contacts' : /FILTER|SEND_AS|SETTINGS|AUTO_FORWARD|VACATION|LANGUAGE|FORWARDING_ADDR|SMIME|CSE|IMAP|POP/.test(x) ? 'settings' : /SEND_EMAIL|REPLY|FORWARD_MESSAGE/.test(x) ? 'send' : /TRASH|BATCH_MODIFY|IMPORT|INSERT/.test(x) ? 'organise' : 'read'; };
TOOLS.forEach(t => t.g = groupOf(t.id));
const GI = {
  read: '<path d="M3 9l9 6 9-6M3 9v11h18V9l-9-6z"/>', send: '<path d="M21 3 10 14M21 3l-7 18-4-8-8-4z"/>', drafts: '<path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4"/>',
  labels: '<path d="M3 12V3h9l9 9-9 9zM7.5 7.5h.01"/>', organise: '<path d="M4 7h16M6 7l1 13h10l1-13M9 7V4h6v3"/>', settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
  contacts: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>', delete: '<path d="M4 7h16M6 7l1 13h10l1-13M10 11l4 4M14 11l-4 4"/>',
};
const tpill = t => `<span class="tpill" title="${esc(t.n)}"><svg class="i sm" viewBox="0 0 24 24">${GI[t.g]}</svg><span>${t.n}</span><i style="background:${TIERS[t.tier].col}"></i></span>`;
/* common agents, cheapest first */
const PRESETS = [
  { k: 'labels', n: 'Organise labels', d: "Create and rename labels. Can't read mail.", tools: ['CREATE_LABEL', 'LIST_LABELS', 'PATCH_LABEL'] },
  { k: 'send', n: 'Send emails', d: 'Notifications, or replies a person approves.', tools: ['SEND_EMAIL', 'REPLY_TO_THREAD'] },
  { k: 'draft', n: 'Read and draft replies', d: 'Reads new mail, saves replies as drafts.', tools: ['FETCH_EMAILS', 'LIST_THREADS', 'CREATE_EMAIL_DRAFT'] },
  { k: 'triage', n: 'Triage the inbox', d: 'Reads, labels and trashes mail.', tools: ['FETCH_EMAILS', 'LIST_THREADS', 'ADD_LABEL_TO_EMAIL', 'MOVE_TO_TRASH'] },
  { k: 'full', n: 'Everything, including delete', d: 'Deletes mail for good.', tools: ['FETCH_EMAILS', 'SEND_EMAIL', 'MOVE_TO_TRASH', 'DELETE_MESSAGE'] },
].map(p => ({ ...p, tools: p.tools.map(x => 'GMAIL_' + x) }));
PRESETS.forEach(p => p.tier = Math.max(...p.tools.map(id => TOOLS.find(t => t.id === id).tier)));
const activePreset = () => mode === 'tools' ? PRESETS.find(p => p.tools.length === selTools.size && p.tools.every(id => selTools.has(id))) : null;

function setMode(m) {
  if (m === 'scopes' && mode !== 'scopes') { selScopes.clear(); need().forEach(s => selScopes.add(s)); }
  mode = m; pickerQ = ''; $('#pSearch').value = '';
  if (m === 'scopes') browsing = false;
}
function renderAccess() {
  const n = need(), mt = maxTier(), empty = !n.length, tools = mode === 'tools', ap = activePreset();
  const advanced = !tools || browsing;

  /* 1. simple choices */
  $('#uc').hidden = advanced;
  $('#uc').innerHTML = PRESETS.map(p => { const tr = TIERS[p.tier], on = ap === p; return `<button class="ucrow${on ? ' on' : ''}" role="radio" aria-checked="${on}" data-preset="${p.k}"><span class="radio"></span><span><b>${p.n}</b><small>${p.d}</small></span><span class="ucm"><span class="tier ${tr.cls}">${tr.n}</span>${tr.wait}</span></button>`; }).join('');
  $('#ucalt').hidden = advanced;
  $('#ucalt').innerHTML = `<span>Not sure?</span><button class="btn sm agent" data-detect>${I.bolt}Scan my code</button><button class="btn sm" data-custom>Pick tools one by one</button><button class="btn sm" data-scopes>I know my scopes</button>`;

  /* 2. the answer: fixed slots, only their contents change */
  const tr = empty ? null : TIERS[mt], col = tr ? tr.col : 'var(--line2)';
  const covered = tools ? TOOLS.filter(t => selTools.has(t.id)) : toolsCoveredBy(n);
  const ab = absorbed(requested()).map(x => x[0]);
  const ns = [...n].sort((x, y) => SC[y].t - SC[x].t);
  /* scopes: up to 2 shown, the rest behind a pill that opens a scrollable list */
  const scopeExtra = n.length > 1 ? `+${n.length - 1} more` : ab.length ? `includes ${ab.length}` : '';
  const scopePop = `<div class="pop"><b>Ask Google for</b>${ns.map(s => `<code>${s}</code>`).join('')}${ab.length ? `<b>Already included</b>${ab.map(s => `<code class="dim">${s}</code>`).join('')}<p>Broader scopes include these, so you don't list them.</p>` : ''}</div>`;
  /* tools: up to 6 pills, the rest behind +N */
  const MAXP = 4, shown = covered.length > MAXP ? covered.slice(0, MAXP - 1) : covered;
  const toolPop = `<div class="pop up"><b>${covered.length} tools</b>${covered.map(tpill).join('')}</div>`;
  const R = $('#result');
  R.classList.toggle('none', empty);
  R.innerHTML = `
    <div class="rs"><span class="k">Your tier</span><div class="rtier">${tr ? tr.n : 'Not chosen yet'}</div>
      <div class="tmeter">${TIERS.map((x, i) => `<i style="${i <= mt ? 'background:' + col : ''}"></i>`).join('')}</div>
      <div class="mlab">${TIERS.map((x, i) => `<span class="${i === mt ? 'on' : ''}">${x.n}</span>`).join('')}</div></div>
    <div class="rs rkv"><div><span>Google review</span><b>${tr ? `${tr.wait} ${evTag(tr.waitEv, tr.src)}` : '2 days – 6+ wks'}</b></div><div><span>Google asks for</span><b>${tr ? tr.needs : 'Brand check to audit'}</b></div><div><span>Yearly cost</span><b>${tr ? tr.cost : '$0 – $540+'}</b></div></div>
    <div class="rs"><div class="rsh"><span class="k">Ask Google for</span><button class="iconbtn" data-copyscopes aria-label="Copy scopes"${empty ? ' disabled' : ''}><svg class="i sm" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/></svg></button></div>
      <div class="rline">${empty ? '<span class="ghost w1"></span>' : ns.slice(0, 1).map(s => `<code>${s}</code>`).join('') + (scopeExtra ? `<span class="xp" tabindex="0">${scopeExtra}${scopePop}</span>` : '')}</div></div>
    <div class="rs rtools"><div class="rsh"><span class="k">Your agent can${empty ? '' : ` · ${covered.length} tool${covered.length > 1 ? 's' : ''}`}</span>${tools && !empty && !browsing ? '<button class="btn sm" data-custom>Adjust</button>' : ''}</div>
      <div class="tgrid">${empty ? '<span class="ghost"></span><span class="ghost"></span><span class="ghost"></span><span class="ghost"></span>' : shown.map(tpill).join('') + (covered.length > MAXP ? `<span class="xp tp" tabindex="0">+${covered.length - shown.length} more${toolPop}</span>` : '')}</div></div>`;

  /* header stats (respect the route / team choice shared with every guide) */
  const gs = window.gmailState ? window.gmailState() : { route: 'own', aud: 'public' };
  let ct = curTier();
  if (gs.route === 'managed') ct = { diff: 'Easy', lv: 1, col: 'var(--ok)', work: '0 min', wait: 'None', waitEv: 'docs', src: gs.managedSrc, cost: '$0', costEv: 'docs' };
  else if (gs.aud === 'private') ct = Object.assign({}, ct, { diff: 'Easy', lv: 1, col: 'var(--ok)', wait: 'None', waitEv: 'docs', src: gs.privSrc, cost: '$0', costEv: 'docs' });
  $('#sDiff').textContent = ct.diff;
  $('#sBars').innerHTML = [0, 1, 2, 3, 4].map(k => `<i style="${k < ct.lv ? 'background:' + ct.col : ''}"></i>`).join('');
  $('#sBars').hidden = empty;
  $('#sWork').textContent = ct.work; $('#sWait').textContent = ct.wait; $('#sCost').textContent = ct.cost;
  { const e = $('#sWaitEv'), src = ct.src || (ct.waitEv === 'docs' ? 'https://support.google.com/cloud/answer/13463817' : null); e.textContent = ct.waitEv === 'est' ? 'est.' : 'docs ↗'; e.className = 'ev ' + ct.waitEv; if (ct.waitEv === 'docs' && src) e.href = src; else e.removeAttribute('href'); }
  $('#sCostEv').textContent = ct.costEv === 'est' ? '3rd party' : 'docs'; $('#sCostEv').className = 'ev ' + (ct.costEv === 'est' ? 'est' : 'docs');
  $('#statHint').hidden = !empty || gs.route === 'managed' || gs.aud === 'private';
  $('#casaBox').hidden = mt < 2;
  $('#scopeStr').textContent = n.join(' ') || 'Choose permissions first';

  /* 3. advanced: every tool, or every scope */
  $('#finder').hidden = !advanced;
  $('#fCount').textContent = `${tools ? selTools.size : selScopes.size} selected`;
  $('#pSearch').placeholder = tools ? `Search ${TOOLS.length} tools: try "send", "label" or "trash"` : 'Search scopes';
  renderPicker();
}
function renderPicker() {
  if ($('#finder').hidden) return;
  const q = pickerQ.toLowerCase(), mt = maxTier();
  if (mode === 'tools') {
    /* each row says what adding it would do to your tier */
    const delta = t => { const tr = TIERS[t.tier];
      if (selTools.has(t.id) || mt < 0) return `<span class="tier ${tr.cls}">${tr.n}</span>`;
      return t.tier > mt ? `<span class="tier ${tr.cls}">↑ ${tr.n}</span>` : '<span class="same">No change</span>'; };
    const match = t => t.n.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.s.some(s => s.includes(q));
    $('#pList').innerHTML = (GROUPS.map(([g, label]) => {
      const rows = TOOLS.filter(t => t.g === g && match(t)); if (!rows.length) return '';
      const k = rows.filter(t => selTools.has(t.id)).length;
      return `<div class="pgroup"><span>${label}</span><span>${k ? k + ' selected' : ''}</span></div>` + rows.map(t => `<div class="prow" data-pt="${t.id}" role="checkbox" aria-checked="${selTools.has(t.id)}" tabindex="0"><span class="tcheck${selTools.has(t.id) ? ' on' : ''}"></span><span style="min-width:0">${t.n}<span class="pid">${t.s.join(' + ')}</span></span>${delta(t)}</div>`).join('');
    }).join('') || '<div style="padding:14px;color:var(--fg2)">No tools match.</div>') + `<div class="pnote">Scope per tool is inferred from Google's API docs <span class="ev est">inferred</span></div>`;
  } else {
    $('#pList').innerHTML = Object.keys(SC).filter(s => s.includes(q)).map(s => {
      const tr = TIERS[SC[s].t]; const c = TOOLS.filter(t => t.s.includes(s)).length, cv = (SC[s].covers || []).length;
      return `<div class="prow" data-ps="${s}" role="checkbox" aria-checked="${selScopes.has(s)}" tabindex="0"><span class="tcheck${selScopes.has(s) ? ' on' : ''}"></span><span style="min-width:0"><code>${s}</code><span class="pid">${cv ? `includes ${cv} narrower scope${cv > 1 ? 's' : ''}` : `used by ${c} tools`}</span></span><span class="tier ${tr.cls}">${tr.n}</span></div>`;
    }).join('') || '<div style="padding:14px;color:var(--fg2)">No scopes match.</div>';
  }
}
$('#pList').addEventListener('click', e => {
  const r = e.target.closest('.prow'); if (!r) return;
  if (r.dataset.pt) { selTools.has(r.dataset.pt) ? selTools.delete(r.dataset.pt) : selTools.add(r.dataset.pt); }
  if (r.dataset.ps) { selScopes.has(r.dataset.ps) ? selScopes.delete(r.dataset.ps) : selScopes.add(r.dataset.ps); }
  const top = $('#pList').scrollTop; update(); $('#pList').scrollTop = top;
});
$('#pList').addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && e.target.closest('.prow')) { e.preventDefault(); e.target.click(); } });
$('#pSearch').oninput = e => { pickerQ = e.target.value; renderPicker(); };
$('#closeFinder').onclick = () => { setMode('tools'); browsing = false; update(); };
$('#perm').addEventListener('click', e => {
  const t = e.target;
  const p = t.closest('[data-preset]');
  if (p) { const x = PRESETS.find(y => y.k === p.dataset.preset); selTools.clear(); x.tools.forEach(id => selTools.add(id)); update(); return; }
  if (t.closest('[data-detect]')) { openAgent(); runTask('detect'); return; }
  if (t.closest('[data-custom]')) { setMode('tools'); browsing = true; update(); $('#pSearch').focus({ preventScroll: true }); return; }
  if (t.closest('[data-scopes]')) { setMode('scopes'); update(); return; }
  if (t.closest('[data-simple]')) { setMode('tools'); browsing = false; update(); return; }
  if (t.closest('[data-copyscopes]')) $('#copyScopes').click();
});
$('#copyScopes').onclick = () => { if (!need().length) { toast('Choose permissions first'); return; } copy(need().map(s => s === 'mail.google.com/' ? 'https://mail.google.com/' : 'https://www.googleapis.com/auth/' + s).join(' '), 'Scopes copied'); };

/* ---------- steps ----------
   Each step has a status. Some we can verify (test connection, Composio API, fetching a URL);
   the rest the developer marks done, and a later check confirms them. */
const CONSOLE = 'https://console.cloud.google.com';
const REDIRECT = 'https://backend.composio.dev/api/v3/toolkits/auth/callback';
const FLOW = [
  { g: 'Prepare', tot: '~1 hr', steps: [
    { k: 'project', w: 'you', t: 'Create a Google Cloud project', d: 'Then enable the Gmail API.', time: '5 min', open: CONSOLE + '/projectcreate', done: true, how: 'marked', later: true },
    { k: 'privacy', w: 'agent', t: 'Draft the privacy policy', d: "Includes Google's Limited Use text.", time: '2 min' },
    { k: 'consent', w: 'you', t: 'Configure the consent screen', time: '15 min', open: CONSOLE + '/auth/branding', later: true, url: 'console.cloud.google.com/auth/branding', f: [['App name', 'Actme'], ['User type', 'External (Internal for your own org only)'], ['Homepage', 'https://actme.ai']], btn: 'Save and continue', warn: 'Consent-screen branding (app name, home page, privacy policy) must accurately represent your app.', warnSrc: 'https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification' },
    { k: 'client', w: 'you', t: 'Add redirect URI and scopes', time: '10 min', open: CONSOLE + '/auth/clients', check: 'Test connection', url: 'console.cloud.google.com/auth/clients', f: [['Redirect URI', REDIRECT], ['Scopes', 'see Composio values']], btn: 'Create', warn: 'Add the redirect URI exactly as Composio\'s dashboard shows it.', warnSrc: 'https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app' }] },
  { g: 'Submit', tot: '~1 hr', steps: [
    { k: 'justify', w: 'agent', t: 'Write scope justifications', d: 'One per scope, plus the demo video script.', time: '2 min' },
    { k: 'video', w: 'you', t: 'Record the demo video', d: 'Follow the script the agent wrote.', time: '45 min' },
    { k: 'submit', w: 'you', t: 'Submit for verification', d: 'In Google Cloud\'s Verification Center.', time: '10 min', open: CONSOLE + '/auth/verification' }] },
  { g: 'Wait', steps: [
    { k: 'wait', w: 'wait', t: '', d: 'Keep shipping on Composio\'s app meanwhile.', wait: true }] },
  { g: 'Go live', steps: [
    { k: 'authcfg', w: 'agent', t: 'Create the Composio auth config', d: 'Needs your approval.', time: '1 min' },
    { k: 'switch', w: 'you', t: 'Switch new users to your app', d: 'Composio\'s docs don\'t say how existing connections move. Plan for users to reconnect.', time: '5 min' }] },
];
const WHO = { you: ['w-you', 'You'], agent: ['w-agent', 'Agent'], wait: ['w-wait', 'Google'], cmp: ['w-cmp', 'Composio'] };
const ALL = () => FLOW.flatMap(g => g.steps);
const S = k => ALL().find(s => s.k === k);
let openK = null, testRuns = 0;
const current = () => ALL().find(s => !s.done);
const AGENT_ICON = '<svg class="i sm" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/></svg>';
function stepStatus(s, tr) {
  if (s.checking) return '<span class="stat"><span class="spin"></span>Testing…</span>';
  if (s.running) return '<span class="stat"><span class="spin"></span>Running</span>';
  if (s.fail) return `<span class="stat bad">${I.cross}Failed</span>`;
  if (s.done) return s.how === 'verified' ? `<span class="stat ok">${I.check}Verified</span>` : s.how === 'agent' ? `<span class="stat ok">${I.check}Done by agent</span>` : `<span class="stat mut">${I.check}Marked done</span>`;
  if (s.wait) return S('submit').done ? `<span class="stat rev"><span class="clock"></span>In review · ${tr.wait}</span>` : `<span class="stat mut">${tr.wait}</span>`;
  return `<span class="stat mut">${s.time || ''}</span>`;
}
function stepActions(s) {
  const out = [];
  const ext = s.open ? `<a class="btn sm" href="${s.open}" target="_blank" rel="noopener">Open in Console ↗</a>` : '';
  if (s.w === 'agent') {
    out.push(s.done ? `<button class="btn sm" data-run="${s.k}">Run again</button>` : `<button class="btn sm agent" data-run="${s.k}" ${s.running ? 'disabled' : ''}>${I.play}Run</button>`);
  } else if (s.wait) {
    if (!S('submit').done) out.push('<span class="hint">Starts when you submit.</span>');
    else if (!s.done) out.push(`<button class="btn sm" data-email>Paste Google's email</button><button class="btn sm" data-approve>Mark approved</button>`);
  } else {
    if (ext) out.push(ext);
    if (s.done) out.push(`<button class="btn sm ghost" data-undo="${s.k}">Undo</button>`);
    else if (s.check) out.push(`<button class="btn sm primary" data-check="${s.k}" ${s.checking ? 'disabled' : ''}>${s.fail ? 'Retry test' : s.check}</button>`);
    else if (s.k === 'video') out.push(`<button class="btn sm" data-script>Show script</button><button class="btn sm primary" data-mark="${s.k}">Mark done</button>`);
    else out.push(`<button class="btn sm primary" data-mark="${s.k}">Mark done</button>`);
  }
  return `<div class="acts">${out.join('')}<button class="btn sm askag" data-help="${s.k}">${AGENT_ICON}Ask agent</button></div>`;
}
function renderFlow() {
  const tr = curTier(), cur = current(), openStep = openK === null ? cur && cur.k : openK;
  $('#flow').innerHTML = FLOW.map(g => `<div class="group"><div class="gl"><span>${g.g}</span><span>${g.g === 'Wait' ? tr.wait : (g.tot || '')}</span></div>${g.steps.map(s => {
    const [cls, lab] = WHO[s.w];
    const t = s.wait ? tr.review : s.t, isOpen = s.k === openStep;
    const skip = (window.gmailState ? window.gmailState().aud === 'private' : false) && ['justify', 'video', 'submit', 'wait'].includes(s.k);
    const state = skip ? 'skipped' : s.fail ? 'failed' : s.done ? 'done' : s.running || s.checking ? 'running' : s.wait && S('submit').done ? 'review' : '';
    const body = `${s.url ? `<div class="sim"><div class="zoom"><div class="bar"><i></i><i></i><i></i><span>${s.url}</span></div><div class="sb"><div></div><div></div><div></div></div><div class="form">${s.f.map(x => `<div class="f"><span>${x[0]}</span><div>${x[1]}</div></div>`).join('')}</div><div class="go">${s.btn}</div><div class="ring"></div></div><div class="cur"></div></div>
      ${s.f.map(x => `<div class="copyrow"><span style="min-width:0;overflow-wrap:anywhere"><span class="k">${x[0]}</span>${x[1]}</span>${x[1].startsWith('see') || x[1].includes('(') ? '' : `<button class="btn sm" data-copy="${x[1]}">Copy</button>`}</div>`).join('')}
      <div class="caution">${I.warn}<span>${s.warn} <a class="ev docs" href="${s.warnSrc}" target="_blank" rel="noopener">docs ↗</a></span></div>` : ''}
      ${s.fail ? `<div class="sfail"><b>${I.cross}Google said <code>${s.fail.code}</code></b><div class="kv"><span>Expected</span><code>${s.fail.exp}</code><span>Found</span><code>${s.fail.got}</code></div><div class="acts"><button class="btn sm agent" data-fix="${s.k}">${AGENT_ICON}Fix with agent</button></div></div>` : ''}
      ${s.later && !s.done ? '<p class="hint">We confirm this with a test connection in step 4.</p>' : ''}
      ${s.wait && s.sub ? `<p class="hint">Submitted ${s.sub}. Google replies by email. Paste it here and the agent explains what they want.</p>` : ''}
      ${stepActions(s)}`;
    return `<div class="node ${state}${cur === s ? ' cur' : ''}" id="n-${s.k}"><div class="rail"><span class="dot" aria-hidden="true"></span></div>
    <div class="step${s.wait ? ' wait' : ''}${isOpen ? ' open' : ''}"><button class="sh" data-step="${s.k}" aria-expanded="${isOpen}"><span class="who ${cls}">${lab}</span><span class="st"><b>${t}</b>${s.d ? `<small>${s.d}</small>` : ''}</span>${s.url ? `<span class="wtag" title="Has a step-by-step visual walkthrough"><svg class="i sm" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3z" fill="currentColor"/></svg>Walkthrough</span>` : ''}${skip ? '<span class="stat mut">Not needed for Internal apps</span>' : stepStatus(s, tr)}<span class="chev">${I.chev}</span></button>
    <div class="more">${body}</div></div></div>`;
  }).join('')}</div>`).join('');
  const done = ALL().filter(s => s.done).length;
  $('#progress').innerHTML = `${done} of ${ALL().length} done<span class="pbar"><i style="width:${done / ALL().length * 100}%"></i></span>`;
  const ag = ALL().filter(s => s.w === 'agent');
  $('#agentCount').textContent = `${ag.filter(s => s.done).length} of ${ag.length} agent steps`;
  $('#agentMeter').style.width = (ag.filter(s => s.done).length / ag.length * 100) + '%';
}
async function testConnection(s) {
  s.checking = true; s.fail = null; renderFlow();
  await sleep(1400); s.checking = false; testRuns++;
  if (testRuns === 1) { s.fail = { code: 'redirect_uri_mismatch', exp: REDIRECT, got: 'https://actme.ai/api/auth/callback' }; renderFlow(); toast('Test connection failed'); return; }
  s.done = true; s.how = 'verified';
  ['project', 'consent'].forEach(k => { const x = S(k); x.done = true; x.how = 'verified'; });
  openK = null; update(); toast('Test passed. Consent screen shows "Actme"');
}
$('#flow').addEventListener('click', e => {
  const q = sel => e.target.closest(sel);
  if (q('[data-copy]') || q('a')) return;
  let x;
  if ((x = q('[data-run]'))) { openAgent(); runTask(x.dataset.run); return; }
  if ((x = q('[data-help]'))) { openAgent(); runTask('help', x.dataset.help); return; }
  if ((x = q('[data-fix]'))) { openAgent(); runTask('fix', x.dataset.fix); return; }
  if ((x = q('[data-check]'))) { testConnection(S(x.dataset.check)); return; }
  if ((x = q('[data-mark]'))) { const s = S(x.dataset.mark); s.done = true; s.how = 'marked'; if (s.k === 'submit') S('wait').sub = new Date().toLocaleDateString('en', { month: 'short', day: 'numeric' }); openK = null; update(); return; }
  if ((x = q('[data-undo]'))) { const s = S(x.dataset.undo); s.done = false; s.how = null; if (s.k === 'submit') S('wait').sub = null; openK = s.k; update(); return; }
  if (q('[data-approve]')) { const s = S('wait'); s.done = true; s.how = 'marked'; openK = null; update(); toast('Approved. Next: create the auth config.'); return; }
  if (q('[data-email]')) { openAgent(); runTask('email'); return; }
  if (q('[data-script]')) { openAgent(); runTask('script'); return; }
  if ((x = q('[data-step]'))) { const k = x.dataset.step, openStep = openK === null ? current() && current().k : openK; openK = openStep === k ? '' : k; renderFlow(); }
});

/* readiness (homepage + repo scan) */
const READY = [
  { ok: true, t: 'Redirect URI matches Composio' },
  { ok: false, t: 'No /privacy page in repo', fix: 'privacy' },
  { ok: false, t: 'Homepage says "Actme AI", app name is "Actme"' },
  { ok: true, t: 'Tokens stored encrypted' },
];
let scanned = false;
function renderReady() {
  $('#readyList').innerHTML = scanned
    ? READY.map(r => { const fixed = r.fix && S(r.fix).done; return `<div>${r.ok || fixed ? I.check : I.cross}<span>${fixed ? 'Privacy page drafted' : r.t}</span></div>`; }).join('')
    : '<div style="color:var(--fg2)">Not run yet. The agent checks actme.ai and actme/app for rejection risks.</div>';
}
function update() { renderAccess(); renderPaths(); renderFlow(); renderReady(); }

$('#shareBtn').onclick = () => copy(location.origin + location.pathname + '#guide', 'Guide link copied');

/* ================= AGENT (split view) ================= */
const shell = $('#shell'), dlog = $('#dlog');
let greeted = false, busy = false;
function openAgent() {
  shell.classList.add('ag'); $('#agentcol').setAttribute('aria-hidden', 'false');
  if (!greeted) { greeted = true; say(!$('#v-guide').hidden
    ? `I can find which Gmail tools your code uses, do <b>${ALL().filter(s => s.w === 'agent').length} of the ${ALL().length} steps</b>, check your homepage and repo, and prepare everything else for you. I'll ask before changing your repo or Composio project.`
    : `Ask me about any of the <b>${window.APPS_DATA ? window.APPS_DATA.length : 37} apps</b> in the library: how hard it is, what it needs, how long approval takes. I can compare apps, or write a guide live for any app that isn't here.`); }
  setTimeout(() => $('#cInput').focus({ preventScroll: true }), 340);
}
function closeAgent() { shell.classList.remove('ag'); $('#agentcol').setAttribute('aria-hidden', 'true'); }
function toggleAgent() { shell.classList.contains('ag') ? closeAgent() : openAgent(); }
$('#closeAgent').onclick = closeAgent;
$('#agentcol').setAttribute('aria-hidden', 'true');
document.addEventListener('keydown', e => { if (e.key === 'Escape' && shell.classList.contains('ag')) closeAgent(); });
$('#startAgent').onclick = () => { openAgent(); runTask('all'); };

function status(b) { const s = $('#dStatus'); s.className = b ? 'busy' : ''; s.innerHTML = `<i></i>${b ? 'Working' : 'Ready'}`; }
function add(html, cls) { const el = document.createElement('div'); el.className = cls; el.innerHTML = html; dlog.appendChild(el); dlog.scrollTop = dlog.scrollHeight; return el; }
const say = h => add(h, 'msg');
async function tool(label, ms = 700) { const el = add(`<span class="ic"><span class="spin"></span></span><span>${label}</span>`, 'tool'); await sleep(ms); el.querySelector('.ic').innerHTML = I.check; return el; }
function card(cls, head, body, foot) { return add(`<div class="ch">${head}</div><div class="cb">${body}</div>${foot ? `<div class="cf">${foot}</div>` : ''}`, 'card ' + cls); }
function waitClick(el) { return new Promise(res => el.querySelectorAll('.cf button').forEach(b => b.onclick = () => { el.querySelectorAll('.cf button').forEach(x => x.disabled = true); res(b.dataset.a); })); }
function mark(k, v) { const s = S(k); if (v === 'run') s.running = true; else { s.running = false; s.done = true; s.how = 'agent'; openK = null; } update(); }
const WHY = {
  'gmail.readonly': 'Actme reads new customer emails to suggest replies. Metadata alone cannot show message bodies.',
  'gmail.compose': 'Actme saves suggested replies as drafts and sends them once the user approves.',
  'gmail.send': 'Actme sends replies the user approves in the Actme inbox.',
  'gmail.modify': 'Actme labels and archives handled threads for the user.',
  'gmail.labels': 'Actme creates an "Actme" label to group handled threads.',
  'gmail.insert': 'Actme imports messages the user forwards from other inboxes.',
  'gmail.settings.basic': 'Actme creates filters the user asks for.',
  'contacts.readonly': 'Actme looks up the sender to personalise replies.',
  'contacts': 'Actme updates a contact when the user asks it to.',
  'mail.google.com/': 'Actme permanently deletes messages when the user asks. Trash is not enough because…',
};

const TASKS = {
  async scan() {
    say('Checking your homepage and repo against the common Google rejection reasons.');
    await tool('fetch https://actme.ai'); await tool('read actme/app · 214 files', 900); await tool('compare with 6 rejection rules');
    scanned = true; renderReady();
    card('', `<span>Readiness check</span><span class="ev est">demo</span>`, READY.map(r => `<div class="find">${r.ok ? I.check : I.cross}<span>${r.t}</span></div>`).join(''));
  },
  async privacy() {
    mark('privacy', 'run'); await tool('draft app/privacy/page.tsx', 900);
    const c = card('approve', `<span>app/privacy/page.tsx · 46 lines</span><span class="ev docs">Limited Use</span>`,
      `<div class="pre">Actme's use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.\n\nWe do not use Gmail data to train AI models…</div>`,
      `<button class="btn sm agent" data-a="pr">Open pull request</button><button class="btn sm" data-a="copy">Copy text</button>`);
    const a = await waitClick(c);
    if (a === 'pr') await tool('open PR #128 “Add privacy policy for Google review”', 800); else toast('Copied');
    mark('privacy');
  },
  async detect() {
    say('Looking for the Gmail tools Actme calls.');
    await tool('search actme/app for GMAIL_* tool slugs', 900);
    const found = [['GMAIL_FETCH_EMAILS', 'lib/agent/inbox.ts:18'], ['GMAIL_CREATE_EMAIL_DRAFT', 'lib/agent/reply.ts:42'], ['GMAIL_SEND_EMAIL', 'lib/agent/reply.ts:57']];
    card('', `<span>Found ${found.length} Gmail tools</span><span class="ev est">demo</span>`, found.map(([id, f]) => `<div class="find">${I.check}<span><code>${id}</code> <span style="color:var(--fg3)">${f}</span></span></div>`).join(''));
    await tool("composio.toolkits.recommend_scopes('gmail', tools)", 800);
    setMode('tools'); browsing = false; selTools.clear(); found.forEach(([id]) => selTools.add(id)); update();
    say(`Least privilege: ${need().map(s => `<code>${s}</code>`).join(' ')}. That puts you at <b>${curTier().n}</b>. Reading and drafting are both restricted, so the CASA audit applies. Sending alone would avoid it.`);
  },
  async justify() {
    if (!need().length) { say('Tell me what your agent does first. Try <b>Find my tools</b>.'); return; }
    mark('justify', 'run'); await tool('draft docs/google-review.md', 900);
    card('', `<span>docs/google-review.md</span><span class="ev docs">Google format</span>`,
      need().map(s => `<div><code>${s}</code><div style="color:var(--fg2);margin-top:3px">${WHY[s] || ''}</div></div>`).join('') || 'No scopes selected.');
    await tool('write demo video script · 6 shots', 600);
    mark('justify');
  },
  async authcfg() {
    if (!need().length) { say('Choose permissions first so I know which scopes to set.'); return; }
    mark('authcfg', 'run'); await sleep(300);
    const c = card('approve', 'Create auth config in Composio?', `<div class="kvs"><div><span>Project</span><span>actme-prod</span></div><div><span>Toolkit</span><span>Gmail · OAuth2</span></div><div><span>Client ID</span><span>from secret manager</span></div><div><span>Scopes</span><span>${need().length}</span></div></div>`,
      `<button class="btn sm agent" data-a="ok">Approve</button><button class="btn sm" data-a="no">Not now</button>`);
    const a = await waitClick(c);
    if (a === 'ok') { await tool('composio.auth_configs.create(gmail)', 900); say('Created <code>ac_8fK2x9</code> and saved it to <code>.env</code> as <code>COMPOSIO_GMAIL_AUTH_CONFIG</code>.'); mark('authcfg'); }
    else { S('authcfg').running = false; update(); say("Okay. I'll leave it until your app is approved."); }
  },
  async handoff() {
    const c = card('you', `<span>Your turn: configure the consent screen</span><span>15 min</span>`,
      `<div>Use app name <b>Actme</b>. I'll fix the homepage title to match in the same PR.</div>`,
      `<button class="btn sm" data-a="show">Show me how</button><button class="btn sm" data-a="done">I've done it</button>`);
    const a = await waitClick(c);
    if (a === 'show') { openK = 'consent'; show('guide'); renderFlow(); $('#n-consent').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    else { S('consent').done = true; S('consent').how = 'marked'; openK = null; update(); say('Next for you: <b>add the redirect URI and scopes</b>. The values are in the side panel.'); }
  },
  async all() {
    if (!need().length) await TASKS.detect();
    say("Starting with what doesn't need you.");
    if (!scanned) await TASKS.scan();
    if (!S('privacy').done) await TASKS.privacy();
    if (!S('justify').done) await TASKS.justify();
    say('Your steps are next. The auth config waits until Google approves you.');
    await TASKS.handoff();
  },
  async help(k) {
    const s = S(k), H = {
      project: 'Create a project, name it after your app (for example <b>actme-prod</b>), then enable the <b>Gmail API</b> under APIs & Services. Tell me what you see if a screen looks different.',
      privacy: "I'll draft <code>app/privacy/page.tsx</code> with Google's Limited Use text and open a pull request. You review and merge it.",
      consent: 'Use the app name <b>Actme</b>, exactly as it appears on actme.ai. Choose <b>External</b> unless only people in your Workspace will connect. Add <b>actme.ai</b> as an authorised domain.',
      client: 'Create an OAuth client of type <b>Web application</b>. Paste Composio\'s redirect URI exactly, with no trailing slash. Then press <b>Test connection</b> and I\'ll check it end to end.',
      justify: `I'll write one short justification per scope you request: ${need().map(x => `<code>${x}</code>`).join(' ') || 'none chosen yet'}.`,
      video: 'Record your screen: sign in, Google\'s consent screen with the scopes visible, then each feature that uses each scope. Upload it to YouTube as unlisted.',
      submit: 'In Verification Center, press <b>Prepare for verification</b>, paste the justifications and the video link, then submit.',
      wait: "Google's reviewers reply by email. Paste any email here and I'll explain what they want and draft your reply.",
      authcfg: "Once Google approves you, I'll create the Gmail auth config in Composio with your client ID. I'll ask before I do.",
      switch: 'Pass the new auth config ID when users connect. Composio\'s docs don\'t say how existing connections move to it, so plan for users to reconnect.',
    };
    say(`<b>${s.wait ? 'Google review' : s.t}</b><br>${H[k] || ''}`);
    add(['I can\'t find this screen', 'Google rejected this', 'Why is this needed?'].map(x => `<button class="sug" data-say="${esc(x)}">${x}</button>`).join(''), 'sugs');
  },
  async fix(k) {
    const s = S(k); if (!s.fail) return;
    say(`Google returned <code>${s.fail.code}</code>. Your OAuth client lists <code>${s.fail.got}</code>, but Composio sends users back to <code>${s.fail.exp}</code>.`);
    const c = card('you', '<span>Your turn: add the redirect URI</span><span>2 min</span>',
      `<ol class="fixlist"><li>Open <b>Clients</b> and select your web client.</li><li>Under <b>Authorised redirect URIs</b>, add Composio's URI.</li><li>Save, wait a few minutes, then retry the test.</li></ol>`,
      `<button class="btn sm" data-a="copy">Copy URI</button><button class="btn sm" data-a="open">Open Console ↗</button>`);
    c.querySelector('[data-a="copy"]').onclick = () => copy(REDIRECT, 'Redirect URI copied');
    c.querySelector('[data-a="open"]').onclick = () => window.open(CONSOLE + '/auth/clients', '_blank', 'noopener');
    say("I can't change Google Cloud for you. Press <b>Retry test</b> on the step when you've saved it.");
  },
  async email() {
    say('Paste the email from Google. For this demo I\'ll use a typical one.');
    add('"Your app\'s home page does not include a link to your privacy policy. Please update your home page and reply to this email."', 'msg me');
    await tool('match against 6 common rejection reasons', 700);
    card('', '<span>What Google wants</span><span class="ev est">demo</span>', '<div>Your homepage needs a visible link to <b>/privacy</b>. Add it to the footer, then reply to the same email thread.</div>');
    const c = card('approve', 'Fix it in actme/app?', '<div>Add a "Privacy" link to the footer of <code>app/layout.tsx</code>.</div>', '<button class="btn sm agent" data-a="pr">Open pull request</button><button class="btn sm" data-a="draft">Just draft the reply</button>');
    const a = await waitClick(c);
    if (a === 'pr') await tool('open PR #131 "Link privacy policy from homepage"', 800);
    say('Reply draft: <i>"We\'ve added a link to our privacy policy in the homepage footer: https://actme.ai/privacy. Please continue the review."</i>');
  },
  async script() {
    say('Demo video script, 6 shots:<ol class="fixlist"><li>Open actme.ai and sign in.</li><li>Click <b>Connect Gmail</b>.</li><li>Show Google\'s consent screen with the app name and scopes.</li>' + need().map(x => `<li>Show the feature that uses <code>${x}</code>.</li>`).join('') + '<li>Show where users disconnect.</li></ol>');
  },
  async check() { await TASKS.scan(); },
  async casa() { reply(KB.find(e => e.k.test('casa')).a()); return;
    say(maxTier() >= 2
      ? `CASA is a yearly security audit Google requires for <b>restricted</b> scopes. You need it because of ${need().filter(s => SC[s].t >= 2).map(s => `<code>${s}</code>`).join(', ')}. The cheapest listed lab is TAC Security at about <b>$540–720</b> for Tier 2 <span class="ev est">est.</span>. If your agent only sends email, you skip it.`
      : `Your current scopes are not restricted, so you don't need a CASA audit.`);
  },
};
async function runTask(k, arg) {
  if (busy) { toast('The agent is still working'); return; }
  busy = true; status(true);
  try { await (TASKS[k] || TASKS.all)(arg); } finally { busy = false; status(false); }
}
/* ================= AGENT BRAIN (no model) =================
   Answers come from this guide's researched facts and the developer's current state:
   chosen tools, tier, step statuses. Every fact carries its source tag. */
const SRCS = {
  faq: ['Google: verification FAQ', 'https://support.google.com/cloud/answer/13463817'],
  scopes: ['Gmail scopes', 'https://developers.google.com/workspace/gmail/api/auth/scopes'],
  caps: ['Google: unverified apps', SRC.caps],
  sens: ['Google: sensitive scopes', 'https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification'],
  restr: ['Google: restricted scopes', SRC.restricted],
  policy: ['Google API user data policy', 'https://developers.google.com/terms/api-services-user-data-policy'],
  composio: ['Composio: managed vs own app', SRC.composio],
  cscopes: ['Composio: controlling scopes', 'https://docs.composio.dev/docs/authentication/controlling-scopes'],
  labs: ['CASA labs list', 'https://appdefensealliance.dev/casa/casa-assessors'],
};
const cite = (...ks) => `<div class="cites">${ks.map(k => `<a href="${SRCS[k][1]}" target="_blank" rel="noopener"><span class="ev docs">docs</span>${SRCS[k][0]}</a>`).join('')}</div>`;
const tierName = () => maxTier() < 0 ? null : TIERS[maxTier()].n;
const needTxt = () => need().map(s => `<code>${s}</code>`).join(' ');
const noPick = 'You haven\'t chosen what your agent does yet, so I\'ll give you the range.';

/* verbs people use -> tool groups */
const VERBS = [
  [/\b(delete|remove|erase|purge)\b.*\b(forever|permanent|for good)\b|\bpermanent(ly)? delet/, 'delete'],
  [/\btrash|\bbin\b|\barchive/, 'organise'],
  [/\bsend|\bemail (people|someone|users)|\bnotif/, 'send'],
  [/\brepl(y|ies)|\bforward/, 'send'],
  [/\bdraft/, 'drafts'],
  [/\blabel|\btag\b|\bcategor/, 'labels'],
  [/\bread|\bfetch|\bsummar|\bsearch (mail|email|inbox)|\binbox|\battachment|\bthread/, 'read'],
  [/\bfilter|\bvacation|\bsignature|\bforwarding|\bsettings?\b/, 'settings'],
  [/\bcontact|\bpeople|\baddress book/, 'contacts'],
  [/\bdelete|\bremove\b/, 'delete'],
];
function toolAnswer(g) {
  const ts = TOOLS.filter(t => t.g === g), tierI = Math.max(...ts.map(t => t.tier)), lo = Math.min(...ts.map(t => t.tier));
  const sc = [...new Set(ts.flatMap(t => t.s))].sort((x, y) => SC[x].t - SC[y].t);
  const label = GROUPS.find(x => x[0] === g)[1];
  const mt = maxTier(), have = ts.filter(t => selTools.has(t.id));
  let r = `<b>${label}</b> uses ${sc.map(s => `<code>${s}</code>`).join(' or ')}. That's <b>${TIERS[lo].n}</b>${tierI !== lo ? ` to <b>${TIERS[tierI].n}</b>` : ''}.`;
  if (g === 'delete') r = `Deleting mail <b>forever</b> needs <code>mail.google.com/</code>, which is <b>Full access</b>, the hardest review. Google says every other action works with a narrower scope. Moving to trash only needs <code>gmail.modify</code> (Restricted).`;
  if (g === 'send') r = 'Sending and replying use <code>gmail.send</code>, which is <b>Sensitive</b>: no security audit, review in 3–10 business days. Forwarding is different: it reads the original message, so it\'s Restricted.';
  if (g === 'read') r += ' Reading any message content is <b>Restricted</b>, so it brings the yearly CASA audit.';
  if (have.length) r += `<br>Your agent already has ${have.map(t => t.n).join(', ')}.`;
  else if (mt >= 0) r += tierI > mt ? `<br>Adding it would move you from <b>${TIERS[mt].n}</b> to <b>${TIERS[tierI].n}</b>.` : `<br>It wouldn't change your tier (${TIERS[mt].n}).`;
  const pick = { send: 'GMAIL_SEND_EMAIL', read: 'GMAIL_FETCH_EMAILS', drafts: 'GMAIL_CREATE_EMAIL_DRAFT', labels: 'GMAIL_CREATE_LABEL', organise: 'GMAIL_MOVE_TO_TRASH', delete: 'GMAIL_DELETE_MESSAGE', settings: 'GMAIL_CREATE_FILTER', contacts: 'GMAIL_GET_CONTACTS' }[g];
  const acts = [];
  if (g === 'delete') acts.push(['Use trash instead', () => { setMode('tools'); TOOLS.filter(t => t.tier === 3).forEach(t => selTools.delete(t.id)); selTools.add('GMAIL_MOVE_TO_TRASH'); update(); return 'Added <b>Move to trash</b>. You\'re at ' + tierName() + '.'; }]);
  else if (pick && !selTools.has(pick)) acts.push([`Add ${TOOLS.find(t => t.id === pick).n}`, () => { setMode('tools'); selTools.add(pick); update(); return `Added. You're now at <b>${tierName()}</b>, review ${TIERS[maxTier()].wait}.`; }]);
  return { html: r, src: ['scopes'], acts, next: ['What does CASA cost?', 'How long will review take?'] };
}

const KB = [
  { k: /\b(where am i|status|progress|what('s| is) next|next step|what now|what should i do)\b/, a: () => {
      const c = current(), f = ALL().find(s => s.fail), d = ALL().filter(s => s.done).length;
      if (f) return { html: `Step <b>${f.t}</b> failed: Google said <code>${f.fail.code}</code>. Fix that first.`, acts: [['Fix it with me', () => { runTask('fix', f.k); return null; }]] };
      if (!need().length) return { html: `First, choose what your agent does. Everything else depends on it. ${d} of ${ALL().length} steps done.`, acts: [['Find my tools', () => { runTask('detect'); return null; }]] };
      return { html: `You're at <b>${tierName()}</b>, ${d} of ${ALL().length} steps done. Next: <b>${c ? (c.wait ? 'Google review' : c.t) : 'nothing, you\'re live'}</b>${c && c.w === 'agent' ? ', which I can do for you' : ''}.`,
        acts: c ? [[c.w === 'agent' ? 'Do it' : 'Show me', () => { if (c.w === 'agent') { runTask(c.k); return null; } openK = c.k; renderFlow(); $('#n-' + c.k).scrollIntoView({ behavior: 'smooth', block: 'center' }); return null; }]] : [] };
    } },
  { k: /avoid (the )?(casa|audit)|skip (the )?(casa|audit)|cheaper|cheapest|lower tier|less (scope|permission)|without (the )?audit/, a: () => ({
      html: 'Only <b>restricted</b> scopes need the audit: anything that reads message content, saves drafts, or changes labels on mail. If your agent only <b>sends</b>, you stay at Sensitive: no audit, review in 3–10 business days. Another way out: <b>Internal</b> apps used only inside your own Google Workspace skip verification.',
      src: ['scopes', 'sens', 'restr'], acts: [['Switch to send only', () => { setMode('tools'); selTools.clear(); ['GMAIL_SEND_EMAIL', 'GMAIL_REPLY_TO_THREAD'].forEach(id => selTools.add(id)); update(); return 'Done. You\'re at <b>Sensitive</b> now.'; }]] }) },
  { k: /which lab|lab (to|should)|tac security|netsentries|prescient/, a: () => ({
      html: 'Google only accepts labs on the App Defense Alliance list. Listed prices: <b>TAC Security</b> $540–720, <b>NetSentries</b> about $700, <b>Prescient</b> $3,000+ for full service <span class="ev est">3rd party</span>. Check the current list before paying.', src: ['labs'] }) },
  { k: /\bcasa\b|security (audit|assessment)|\baudit\b|\bassessment\b/, a: () => ({
      html: `CASA is the security assessment Google requires for <b>restricted</b> scopes, renewed at least every 12 months. An approved lab runs it.${maxTier() >= 2 ? ` You need it because of ${need().filter(s => SC[s].t >= 2).map(s => `<code>${s}</code>`).join(' ')}.` : maxTier() >= 0 ? ' Your current permissions don\'t need it.' : ''} Listed prices start around <b>$540–720</b> (TAC Security) <span class="ev est">3rd party</span>.`,
      src: ['restr', 'labs'], next: maxTier() >= 2 ? ['How do I avoid CASA?', 'Which lab should I use?'] : ['Which permissions need CASA?'] }) },
  { k: /how long|review time|wait|weeks|days|timeline|when (can|will)/, a: () => {
      const t = maxTier();
      return { html: t < 0 ? `${noPick} Google review takes from <b>2–3 days</b> (brand check only) to <b>several weeks</b> plus a security audit for restricted scopes.` : `At <b>${TIERS[t].n}</b>, expect <b>${TIERS[t].wait}</b> <span class="ev ${TIERS[t].waitEv}">${TIERS[t].waitEv === 'est' ? 'est.' : 'docs'}</span>${t >= 2 ? ', plus the CASA lab\'s time' : ''}. Your users can stay on Composio's app until then, so you don't have to wait to launch.`,
        src: t >= 2 ? ['restr', 'faq'] : ['sens', 'faq'], next: ['Can I launch before approval?'] };
    } },
  { k: /launch (before|without|now|today)|before approv|ship (now|today)|managed|composio('s)? app|don'?t (want to )?wait/, a: () => ({
      html: 'Yes. Composio\'s managed app works today: users connect through Composio\'s Google app, and Google\'s screen says "Composio". When your own app is approved, you create an auth config with your client ID and new users connect to it. Composio says managed apps are "fine for internal tools, prototypes, and development", but they share quota across all Composio users. Its docs don\'t say how existing connections move, so plan for users to reconnect.',
      src: ['composio'] }) },
  { k: /test(ing)? (mode|users?)|test users|100 users|7 days|expire/, a: () => ({
      html: 'In <b>Testing</b>, only people you add as test users (up to 100) can connect, and their access expires 7 days after they consent. Good for building and demos, not for real users.', src: ['caps'] }) },
  { k: /unverified|go live without|publish without|user cap|warning screen/, a: () => ({
      html: 'Publishing without verification shows users a "Google hasn\'t verified this app" warning, and only a limited number of users can ever connect. That limit applies for the project\'s lifetime and never resets, so don\'t spend it early.', src: ['caps'] }) },
  { k: /internal|own team|workspace only|only (our|my) (team|company|org)/, a: () => ({
      html: 'If only people in your own Google Workspace will connect, set the user type to <b>Internal</b>. Internal apps don\'t need Google verification.', src: ['restr'],
      acts: [['Show the step', () => { openK = 'consent'; renderFlow(); $('#n-consent').scrollIntoView({ behavior: 'smooth', block: 'center' }); return null; }]] }) },
  { k: /redirect|callback|uri|mismatch/, a: () => ({
      html: `Composio's redirect URI is <code>${REDIRECT}</code>. Paste it exactly into your OAuth client's <b>Authorised redirect URIs</b>, with no trailing slash. If it's wrong, Google shows <code>redirect_uri_mismatch</code>.`,
      src: ['composio'], acts: [['Copy URI', () => { copy(REDIRECT, 'Redirect URI copied'); return null; }]] }) },
  { k: /privacy|limited use|policy page/, a: () => ({
      html: 'Your privacy policy must be on the same domain as your homepage, linked from it, and say how you use Google user data. For Gmail it needs Google\'s <b>Limited Use</b> statement. I can draft it and open a pull request.',
      src: ['policy', 'sens'], acts: S('privacy').done ? [] : [['Draft it', () => { runTask('privacy'); return null; }]] }) },
  { k: /video|demo|record/, a: () => ({
      html: 'Google wants an unlisted YouTube video that shows your app\'s Google consent screen with the scopes, then each feature that uses each scope.', src: ['sens'], acts: [['Show the script', () => { runTask('script'); return null; }]] }) },
  { k: /justif|why (do|does) (we|i|it) need|explain (the )?scope/, a: () => ({
      html: need().length ? `Google asks one question per scope: why does your app need it? You request ${needTxt()}. I'll write one short reason each, tied to a visible feature.` : 'Choose what your agent does first, then I\'ll write one reason per scope.',
      src: ['sens'], acts: need().length && !S('justify').done ? [['Write them', () => { runTask('justify'); return null; }]] : [] }) },
  { k: /reject|denied|declined|google (said|says|email)|feedback/, a: () => ({
      html: 'The common reasons: the homepage doesn\'t explain the app, the app name doesn\'t match the homepage, the privacy policy is on another domain or missing Limited Use, or the video doesn\'t show each scope in use. Paste Google\'s email and I\'ll tell you which one it is.',
      src: ['sens'], acts: [['Paste an email', () => { runTask('email'); return null; }]] }) },
  { k: /tier|sensitive|restricted|non-sensitive|levels?/, a: () => ({
      html: `Google sorts scopes into tiers. <b>Non-sensitive</b>: brand check only. <b>Sensitive</b> (e.g. sending): review, 3–10 business days. <b>Restricted</b> (reading, drafts, modifying): review plus a yearly security audit. <b>Full access</b> (<code>mail.google.com/</code>): the same, plus a strong reason, since it's only needed for deleting forever.${maxTier() >= 0 ? ` You're at <b>${tierName()}</b>.` : ''}`,
      src: ['scopes', 'sens', 'restr'] }) },
  { k: /\bscopes?\b|permission/, a: () => ({
      html: need().length ? `You need ${needTxt()}. Broader scopes include narrower ones, so you don't list those separately. Composio can also recommend scopes from a list of tools.` : 'Tell me what your agent does, or let me scan your code, and I\'ll work out the smallest set of scopes.',
      src: need().length ? ['scopes', 'cscopes'] : ['cscopes'], acts: need().length ? [['Copy scopes', () => { $('#copyScopes').click(); return null; }]] : [['Find my tools', () => { runTask('detect'); return null; }]] }) },
  { k: /cost|price|pay|money|\$/, a: () => ({
      html: maxTier() < 0 ? `${noPick} Google's review itself is free. Restricted scopes add a yearly security audit, with listed prices from about $540 <span class="ev est">3rd party</span>.` : maxTier() >= 2 ? `Google charges nothing. The yearly security audit is the cost: listed from about <b>$540–720</b> <span class="ev est">3rd party</span>.` : 'Nothing. Google\'s review is free, and your tier doesn\'t need the paid audit.',
      src: ['restr', 'labs'] }) },
  { k: /what can you do|help|who are you|what do you do/, a: () => ({
      html: `I know this guide's research and your setup. I can find the Gmail tools your code uses, draft the privacy policy and scope justifications, check your homepage and repo, explain Google's emails, and create the Composio auth config once you're approved. You do the parts in Google Cloud. I'll ask before changing anything.`,
      next: ['What\'s next?', 'Can my agent delete emails?', 'How do I avoid CASA?'] }) },
];
/* imperative requests run tasks */
const DO = [
  [/^(find|detect|scan for) (my )?tools|which tools (do i|does my)/, 'detect'],
  [/(scan|check) (my )?(repo|code|homepage|site)|readiness/, 'scan'],
  [/^(draft|write|create) (the |a )?privacy/, 'privacy'],
  [/^(write|draft) (the )?(scope )?justif/, 'justify'],
  [/^(create|make) (the )?(composio )?auth config/, 'authcfg'],
  [/^(do|run|start)( all| my)? (steps|setup|it all|everything)|^set (it )?up/, 'all'],
];
const isLong = v => v.trim().split(/\s+/).length >= 9;
function answer(v) {
  const q = v.toLowerCase().trim();
  for (const [re, task] of DO) if (re.test(q)) { runTask(task); return; }
  if (isLong(v) && window.agentContext) return askLLM(v, () => ruleAnswer(v));
  return ruleAnswer(v);
}
function ruleAnswer(v) {
  const q = v.toLowerCase().trim();
  /* capability questions: "can my agent ...", "how do I ..." about Gmail actions */
  const kb = KB.find(e => e.k.test(q) && !(e.k.source.includes('scopes?') && VERBS.some(([re]) => re.test(q))));
  const verb = VERBS.find(([re]) => re.test(q));
  const r = (verb && (!kb || /can (my|the|it|i)|able to|let it|allow|want (it|my agent) to|need to (read|send|delete|draft|label)/.test(q))) ? toolAnswer(verb[1]) : kb ? kb.a() : null;
  if (r) return reply(r);
  askLLM(v);
}
/* questions the built-in answers don't cover go to the model, grounded in this guide's data */
async function askLLM(v, fallback) {
  const pendingCard = window.__cardNext; window.__cardNext = null;
  const ctx = window.agentContext ? window.agentContext() : null;
  const fail = () => { window.__cardNext = pendingCard; return fallback ? fallback() : reply(NO_ANSWER); };
  if (!ctx) return fail();
  const dots = add('<span class="typing"><i></i><i></i><i></i></span><small class="thinking">Reading this guide\'s sources…</small>', 'msg');
  try {
    const r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q: v, ctx: JSON.stringify(ctx) }) }).then(x => x.json());
    dots.remove();
    if (r.error || !r.answer) return fail();
    const el = say(esc(r.answer) + (r.sources && r.sources.length ? `<div class="cites">${r.sources.map(u => `<a href="${esc(u)}" target="_blank" rel="noopener"><span class="ev docs">docs</span>${esc(u.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60))}</a>`).join('')}</div>` : '') + `<small class="aimeta">Answered by ${esc(r.model || 'Gemini')} from this guide's data${r.covered ? '' : ' · not covered by the guide'}</small>` + (pendingCard && window.appCardHtml ? window.appCardHtml(pendingCard) : window.appCardsFor ? window.appCardsFor(v) : ''));
    dlog.scrollTop = dlog.scrollHeight; return el;
  } catch (e) { dots.remove(); return fail(); }
}
const NO_ANSWER = { html: 'I don\'t have a sourced answer for that yet, and I won\'t guess. Here\'s what I can help with:', next: ['What\'s next?', 'How long will review take?', 'Can my agent read emails?', 'What does CASA cost?'] };
async function reply(r) {
  const dots = add('<span class="typing"><i></i><i></i><i></i></span>', 'msg'); await sleep(450 + Math.random() * 350); dots.remove();
  if (!r.card && window.__cardNext) r.card = window.__cardNext;
  window.__cardNext = null;
  const el = say(r.html + (r.src ? cite(...r.src) : '') + (r.card && window.appCardHtml ? window.appCardHtml(r.card) : ''));
  if (r.acts && r.acts.length) {
    const row = document.createElement('div'); row.className = 'acts-row';
    r.acts.forEach(([label, fn]) => { const b = document.createElement('button'); b.className = 'btn sm'; b.textContent = label; b.onclick = () => { row.querySelectorAll('button').forEach(x => x.disabled = true); const out = fn(); if (out) reply({ html: out }); }; row.appendChild(b); });
    el.appendChild(row);
  }
  if (r.next) { r.next.forEach(x => window.__chips && window.__chips.add(x)); add(r.next.map(x => `<button class="sug" data-say="${esc(x)}">${esc(x)}</button>`).join(''), 'sugs'); }
  dlog.scrollTop = dlog.scrollHeight;
}
dlog.addEventListener('click', e => {
  const b = e.target.closest('[data-say]'); if (!b) return;
  const v = b.dataset.say; b.parentElement.remove(); add(esc(v), 'msg me');
  if (/rejected/i.test(v)) { runTask('email'); return; }
  if (/can'?t find/i.test(v)) { reply({ html: 'Google moved these pages into <b>Google Auth Platform</b>. In Google Cloud, open the menu and choose it: Branding, Audience, Clients, Data Access and Verification Center are all there.' }); return; }
  if (/why is this needed/i.test(v)) { reply({ html: 'Google checks that every permission you ask for is used by a feature people can see. Asking for less makes review faster.', src: ['sens'] }); return; }
  answer(v);
});
$('#quick').onclick = e => { const b = e.target.closest('[data-q]'); if (!b) return; add(esc(b.textContent), 'msg me'); runTask(b.dataset.q); };
$('#composer').onsubmit = e => {
  e.preventDefault(); const v = $('#cInput').value.trim(); if (!v) return; $('#cInput').value = ''; add(esc(v), 'msg me');
  answer(v);
};
const AGENT_PROMPT = () => `Prepare Actme's Gmail OAuth app for Google verification.
1. Add a /privacy page on actme.ai with Google's "Limited Use" disclosure.
2. Make the homepage use the exact name "Actme" and link to /privacy.
3. Write docs/google-review.md with one justification per scope: ${need().join(', ') || '(find the Gmail tools in our code first)'}.
4. Create a Composio auth config for Gmail using our client ID and secret from the secret manager.
Leave for a human: domain verification, the demo video, submitting in Google Cloud Console, paying the CASA lab.`;
$('#copyPrompt').onclick = () => copy(AGENT_PROMPT(), 'Prompt copied');

/* ================= LIBRARY ================= */
/* ================= PLANNER ================= */
const picked = new Set(['gmail', 'slack', 'hubspot', 'xero']);
function renderPlan() { /* defined in library.js, built from the guides' data */ }
$('#pick').onclick = e => { const b = e.target.closest('[data-pk]'); if (!b) return; const k = b.dataset.pk; picked.has(k) ? picked.delete(k) : picked.add(k); renderPlan(); };

update(); renderPlan();
/* library.js finishes boot */
