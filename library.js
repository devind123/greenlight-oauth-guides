/* ================= LIBRARY + GENERIC APP GUIDES =================
   Data lives in data/apps.js (researched, every claim has a source or an est. tag).
   Logos are Composio's own toolkit logos, saved locally in /logos. */
const APPS = (window.APPS_DATA || []).slice().sort((a, b) => a.name.localeCompare(b.name));
const APP = id => APPS.find(a => a.id === id);
const DIFF = {
  easy: { n: 'Easy', cls: 't-easy', col: 'var(--ok)', lv: 1, blurb: 'Minutes, no review' },
  medium: { n: 'Medium', cls: 't-med', col: 'var(--warn)', lv: 2, blurb: 'Works now, limits until approved' },
  hard: { n: 'Hard', cls: 't-hard', col: 'var(--bad)', lv: 4, blurb: 'Review before public use' },
  gated: { n: 'Gated', cls: 't-gate', col: 'var(--fg)', lv: 5, blurb: 'Apply for access first' },
};
const CATS = ['Google Workspace', 'Microsoft 365', 'Communication', 'Developer tools', 'CRM & support', 'Productivity', 'Files & docs', 'Commerce & finance', 'Social & marketing'];
const initials = n => n.replace(/[^A-Za-z0-9 ]/g, '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const logo = (a, s = 32) => `<span class="lg-img" style="width:${s}px;height:${s}px"><img src="${a.logoUrl || (a.slug ? 'logos/' + a.slug + '.svg' : 'data:,')}" alt="" width="${s}" height="${s}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('b'),{textContent:'${initials(a.name)}'}))"></span>`;
const dbars = d => `<span class="bars">${[0, 1, 2, 3, 4].map(k => `<i style="${k < DIFF[d].lv ? 'background:' + DIFF[d].col : ''}"></i>`).join('')}</span>`;
const evl = (ev, src) => { const lab = ev === 'est' ? 'est.' : 'docs'; return src ? `<a class="ev ${ev}" href="${src}" target="_blank" rel="noopener">${lab} ↗</a>` : `<span class="ev ${ev}">${lab}</span>`; };
const reviewTxt = a => a.review && a.review.required ? (a.review.wait || 'Not stated') : 'None';
const shortWait = a => { if (a.waitShort) return a.waitShort; const w = reviewTxt(a); return cap(w.split(/[(;,]/)[0].replace(/business /, '').trim()); };
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : '';
/* turn URLs and bare domains in already-escaped text into links */
const linkify = h => h.replace(/\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|io|dev|net|org|co|ai|app)(?:\/[^\s,;)<]*)?)/gi, m => { const u = m.replace(/[.]+$/, ''), tail = m.slice(u.length); return `<a class="tlink" href="${/^https?:/.test(u) ? u : 'https://' + u}" target="_blank" rel="noopener">${u}</a>${tail}`; });
const first = s => cap(String(s || '').split(/;|\(| — /)[0].trim());
const unprefix = s => cap(String(s).replace(/^before (approval|review|listing)[:,]\s*/i, ''));
const clip = (arr, fn, n = 5) => arr.length <= n ? arr.map(fn).join('') : arr.slice(0, n).map(fn).join('') + `<li class="hid" hidden></li>${arr.slice(n).map(x => fn(x).replace('<li>', '<li class="hid" hidden>')).join('')}<button class="morebtn" data-more>Show ${arr.length - n} more</button>`;

/* ---------- library ---------- */
const LS = { q: '', diff: 'all', cat: 'all', managed: false, view: 'grid' };
try { LS.view = localStorage.getItem('gl-libview') || 'grid'; } catch (e) {}
function libFiltered(ignore) {
  const q = LS.q.toLowerCase();
  return APPS.filter(a => (ignore === 'diff' || LS.diff === 'all' || a.difficulty === LS.diff)
    && (ignore === 'cat' || LS.cat === 'all' || a.category === LS.cat)
    && (!LS.managed || a.managed === 'yes')
    && (!q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || (a.oneLiner || '').toLowerCase().includes(q)));
}
function renderLibrary() {
  const srcCount = new Set(APPS.flatMap(a => (a.sources || []).map(s => s.u))).size;
  $('#libCount').textContent = APPS.length;
  $('#lstats').innerHTML = `<div><b>${APPS.length}</b><span>apps</span></div><div><b>${srcCount}</b><span>sources</span></div><div><b>${APPS.filter(a => a.managed === 'yes').length}</b><span>managed by Composio</span></div>`;
  const base = libFiltered('diff');
  $('#libDiff').innerHTML = [['all', 'All', null], ...Object.entries(DIFF).map(([k, d]) => [k, d.n, d.col])].map(([k, n, c]) => {
    const cnt = k === 'all' ? base.length : base.filter(a => a.difficulty === k).length;
    return `<button class="${LS.diff === k ? 'on' : ''}" data-diff="${k}" role="tab" aria-selected="${LS.diff === k}">${c ? `<i style="background:${c}"></i>` : ''}${n}<span>${cnt}</span></button>`;
  }).join('');
  const cbase = libFiltered('cat');
  $('#libCats').innerHTML = [['all', 'All categories'], ...CATS.map(c => [c, c])].map(([k, n]) => {
    const cnt = k === 'all' ? cbase.length : cbase.filter(a => a.category === k).length;
    return cnt || k === LS.cat || k === 'all' ? `<button class="${LS.cat === k ? 'on' : ''}" data-cat="${esc(k)}">${n}<span>${cnt}</span></button>` : '';
  }).join('');
  $$('#libView button').forEach(b => b.classList.toggle('on', b.dataset.v === LS.view));
  const list = libFiltered();
  const out = $('#libOut');
  if (!list.length) {
    out.innerHTML = `<div class="lempty"><b>No guide for "${esc(LS.q || 'this filter')}" yet</b><span>The agent can draft one from the provider's docs.</span><button class="btn sm agent" data-view="generate">Generate a guide</button></div>`;
    return;
  }
  if (LS.view === 'list') {
    out.innerHTML = `<div class="ltable" role="table"><div class="lrow lhd" role="row"><span>App</span><span>Difficulty</span><span>Approval wait</span><span>Key limit</span><span>Composio</span></div>${list.map(a => {
      const d = DIFF[a.difficulty];
      return `<button class="lrow" data-app="${a.id}" role="row"><span class="lname">${logo(a, 26)}<span><b>${a.name}</b><small>${a.category}</small></span></span><span><span class="tier ${d.cls}">${d.n}</span></span><span>${esc(shortWait(a))}</span><span class="lim">${a.limits && a.limits[0] ? esc(unprefix(a.limits[0].text)) : '<span class="mute">No limit found</span>'}</span><span>${a.managed === 'yes' ? '<span class="mchip">Managed</span>' : a.managed === 'no' ? '<span class="mute">Bring your own</span>' : '<span class="mute">Unknown</span>'}</span></button>`;
    }).join('')}</div>`;
  } else {
    out.innerHTML = `<div class="lgrid">${list.map(a => {
      const d = DIFF[a.difficulty];
      return `<button class="acard" data-app="${a.id}">
        <span class="ah">${logo(a, 34)}<span class="an"><b>${a.name}</b><small>${a.category}</small></span><span class="tier ${d.cls}">${d.n}</span></span>
        <span class="aone">${esc(cap(a.oneLiner || ''))}</span>
        <span class="am"><span><small>Setup</small>${a.setupShort || (a.setup ? a.setup.time : '—')}</span><span><small>Approval</small>${esc(shortWait(a))}</span>${a.managed === 'yes' ? '<span class="mchip" title="Composio has a managed app">Managed</span>' : a.managed === 'no' ? '<span class="ownchip" title="Composio needs your own credentials">Own app</span>' : ''}</span>
        <span class="ago">Open guide<svg class="i sm" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </button>`;
    }).join('')}</div>`;
  }
}
$('#libSearch').oninput = e => { LS.q = e.target.value; renderLibrary(); };
$('#libDiff').onclick = e => { const b = e.target.closest('[data-diff]'); if (!b) return; LS.diff = b.dataset.diff; renderLibrary(); };
$('#libCats').onclick = e => { const b = e.target.closest('[data-cat]'); if (!b) return; LS.cat = b.dataset.cat; renderLibrary(); };
$('#libManaged').onchange = e => { LS.managed = e.target.checked; renderLibrary(); };
$('#libView').onclick = e => { const b = e.target.closest('[data-v]'); if (!b) return; LS.view = b.dataset.v; try { localStorage.setItem('gl-libview', LS.view); } catch (x) {} renderLibrary(); };
document.addEventListener('keydown', e => { if (e.key === '/' && !$('#v-library').hidden && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); $('#libSearch').focus(); } });
document.addEventListener('click', e => { const a = e.target.closest('[data-app]'); if (!a) return; show('app', a.dataset.app); });

/* ---------- choices: route, audience, permissions ----------
   Data comes from data/choices.js (researched with sources). Everything degrades
   gracefully: no data for an app means that choice is simply not shown. */
const CH = window.CHOICES || { aud: {}, perms: {} };
const COMPOSIO_SRC = 'https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app';
const PERM_TIERS = {
  google: { order: ['non-sensitive', 'sensitive', 'restricted'], t: {
    'non-sensitive': { n: 'Non-sensitive', diff: 'easy', wait: '2–3 days', review: 'Brand verification only', ev: 'docs', src: 'https://support.google.com/cloud/answer/13463817' },
    sensitive: { n: 'Sensitive', diff: 'medium', wait: '3–10 days', review: 'Google review and demo video, no audit', ev: 'docs', src: 'https://support.google.com/cloud/answer/13463817' },
    restricted: { n: 'Restricted', diff: 'hard', wait: '~6 weeks', review: 'Google review plus a yearly CASA security assessment', ev: 'docs', src: 'https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification' } } },
  microsoft: { order: ['user', 'admin'], t: { user: { n: 'User consent', diff: 'medium', review: 'Users approve it themselves' }, admin: { n: 'Admin consent', diff: 'medium', review: 'A tenant admin must approve it first' } } },
  linkedin: { order: ['open', 'partner'], t: { open: { n: 'Self-serve', diff: 'easy', review: 'Self-serve, no application' }, partner: { n: 'Partner program', diff: 'gated', review: 'Apply to a LinkedIn partner program first', wait: 'Not stated' } } },
  shopify: { order: ['standard', 'protected-1', 'protected-2'], t: { standard: { n: 'Standard data', diff: 'hard', review: 'App Store review if listed' }, 'protected-1': { n: 'Protected data, Level 1', diff: 'hard', review: 'Protected customer data request and review' }, 'protected-2': { n: 'Protected data, Level 2', diff: 'hard', review: 'Level 2 protected data: stricter requirements and review' } } },
};
const familyOf = id => /^google|^youtube/.test(id) ? 'google' : /outlook|teams/.test(id) ? 'microsoft' : id === 'linkedin' ? 'linkedin' : id === 'shopify' ? 'shopify' : null;
const AS = {};
function stateOf(a) { return AS[a.id] || (AS[a.id] = { route: 'own', aud: 'public', perms: new Set() }); }
function viewOf(a, st) {
  const rv = a.review || {}, vw = { diff: a.difficulty, time: a.setup ? a.setup.time : '—', wait: shortWait(a), waitFull: reviewTxt(a), waitTag: rv.required && rv.ev ? evl(rv.ev, rv.src) : '', notes: [] };
  if (st.route === 'managed') return Object.assign(vw, { diff: 'easy', time: '0 min', wait: 'None', waitFull: "Uses Composio's approved app", waitTag: evl('docs', COMPOSIO_SRC) });
  const P = CH.perms[a.id], fam = familyOf(a.id);
  if (P && fam && st.perms.size) {
    const F = PERM_TIERS[fam], picked = P.options.filter(o => st.perms.has(o.k));
    const top = picked.map(o => o.tier).sort((x, y) => F.order.indexOf(y) - F.order.indexOf(x))[0];
    const T = Object.assign({}, F.t[top] || {}, (P.tiers || {})[top] || {});
    vw.tier = { key: top, n: T.n || top, review: T.effect || T.review, src: T.src, ev: T.ev || 'docs' };
    if (T.diff) vw.diff = T.diff;
    if (T.wait) { vw.wait = T.wait; vw.waitFull = T.wait; vw.waitTag = T.src ? evl(T.ev || 'docs', T.src) : ''; }
  }
  const A = (CH.aud || {})[a.id];
  if (A && st.aud === 'private' && A.private && A.private.works !== 'no') {
    vw.private = A.private;
    if (A.private.works === 'yes') { vw.wait = 'None'; vw.waitFull = A.private.review || 'No review for your own team'; vw.waitTag = A.private.src ? evl('docs', A.private.src) : ''; if (vw.diff !== 'gated') vw.diff = 'easy'; }
  }
  return vw;
}
function setupPanel(a, st, vw) {
  const man = a.managed === 'yes', A = (CH.aud || {})[a.id], P = CH.perms[a.id], fam = familyOf(a.id);
  const seg = (name, opts, cur) => `<div class="seg" role="radiogroup">${opts.map(([v, l]) => `<button type="button" data-set="${name}" data-val="${v}" class="${cur === v ? 'on' : ''}" aria-pressed="${cur === v}">${l}</button>`).join('')}</div>`;
  const rows = [];
  if (man) rows.push(`<div class="srow"><span class="sk">How users connect</span>${seg('route', [['managed', "Composio's app"], ['own', 'Your own app']], st.route)}<span class="shint">${st.route === 'managed' ? 'Ready today. Nothing to set up.' : 'Your name on the consent screen.'}</span></div>`);
  if (st.route === 'own' && A && A.private && A.private.works !== 'no' && !/^same as public/i.test(A.private.text || '')) rows.push(`<div class="srow"><span class="sk">Who connects</span>${seg('aud', [['private', 'Only my team'], ['public', 'Any customer']], st.aud)}<span class="shint">${st.aud === 'private' ? esc(A.private.who || '') : 'Customers outside your organization'}</span></div>`);
  if (st.route === 'own' && A && A.private && A.private.works === 'no') rows.push(`<div class="srow"><span class="sk">Who connects</span><span class="tier t-hard">No private option</span><span class="shint">${esc(A.private.text || '')} ${A.private.src ? evl('docs', A.private.src) : ''}</span></div>`);
  if (st.route === 'own' && P && fam) {
    const F = PERM_TIERS[fam];
    rows.push(`<div class="srow top"><span class="sk">What your agent does</span><div class="pchips">${P.options.map(o => { const T = F.t[o.tier] || {}, on = st.perms.has(o.k); return `<button type="button" class="pchip${on ? ' on' : ''}" data-perm="${o.k}" aria-pressed="${on}" title="${esc(o.scope || '')}"><span class="tc t-${F.order.indexOf(o.tier)}"></span>${esc(o.task)}<small>${esc(T.n || o.tier)}${o.ev === 'inferred' ? ' · inferred' : ''}</small></button>`; }).join('')}</div></div>`);
  }
  if (!rows.length) return '';
  let res = '';
  if (st.route === 'managed') res = `<b>Composio's app:</b> live today, no review. Composio calls it "fine for internal tools, prototypes, and development". ${evl('docs', COMPOSIO_SRC)}`;
  else if (vw.private) res = `<b>Only your team:</b> ${esc(vw.private.text || '')} ${vw.private.src ? evl('docs', vw.private.src) : ''}`;
  else if (vw.tier) { const ps = P.options.filter(o => st.perms.has(o.k)); res = `<b>${esc(vw.tier.n)}:</b> ${esc(vw.tier.review || '')}${vw.tier.src ? ' ' + evl(vw.tier.ev || 'docs', vw.tier.src) : ''}${ps.some(o => o.ev === 'inferred' && o.tier === vw.tier.key) ? ' <span class="ev est" title="Google does not publish a tier for this scope; inferred from its restricted list">tier inferred</span>' : ''}${[...new Set(ps.flatMap(o => String(o.note || '').split(/;\s*|\.\s+/)).map(s => s.trim().replace(/\.$/, '')).filter(s => s.length > 20 && !/listed|table|this page|inferred|label|quote|reference|cell|source/i.test(s)))].slice(0, 2).map(s => `<span class="snote">${esc(cap(s))}.</span>`).join('')} <span class="scopes">${[...new Set(ps.map(o => String(o.scope || '').split(' (')[0]))].map(s => `<code>${esc(s)}</code>`).join('')}</span>`; }
  else if (P && fam && st.route === 'own') res = 'Pick what your agent does to see the permissions it needs and the review that follows.';
  return `<div class="pad"><div class="wrap"><div class="setup">${rows.join('')}${res ? `<div class="sres">${res}</div>` : ''}</div></div></div>`;
}
function managedBody(a) {
  const pro = ['Live today: no OAuth app of your own, no provider review, no waiting.', 'It is the default auth whenever Composio offers a managed app.'];
  const con = [['Users see "Composio wants to access your account", not your name.', COMPOSIO_SRC], ["Composio's default scopes may not include everything you need.", COMPOSIO_SRC], ['Quota is shared across all Composio users.', COMPOSIO_SRC], ['Polling has a 15-minute minimum interval.', COMPOSIO_SRC]];
  return `<div class="pad"><div class="wrap body"><div class="mainc">
    <section><div class="h"><h2>What you get, and what you give up</h2></div>
      <ul class="checks req">${pro.map(t => `<li>${I.check}<span>${t}</span></li>`).join('')}</ul>
      <ul class="checks" style="margin-top:8px">${con.map(([t, s]) => `<li>${I.warn}<span>${esc(t)} ${evl('docs', s)}</span></li>`).join('')}</ul></section>
    <section><div class="h"><h2>Steps</h2><small>1 of 1 by the agent</small></div><div class="gsteps"><div class="gstep"><span class="gn">1</span><span class="who w-agent">Agent</span><span class="gtt">Create ${/^[aeiou]/i.test(a.name) ? 'an' : 'a'} ${esc(a.name)} auth config that uses Composio managed auth, and connect your first user</span><span class="time">2 min</span></div></div>
      <p class="hint" style="margin-top:10px">Switch to your own app when users should see your name, you need custom scopes, or you hit the shared quota. ${evl('docs', COMPOSIO_SRC)}</p>
      <div class="acts" style="margin-top:10px"><button class="btn sm" data-set="route" data-val="own">See the own-app guide</button><button class="btn sm askag" data-askapp>${AGENT_ICON}Ask agent</button></div></section>
  </div><aside class="rail-c"><div class="box"><div class="bh">Composio values</div><div class="bb"><div class="kvs"><div><span>Auth</span><span>${esc(a.auth || 'OAuth 2.0')}</span></div><div><span>Managed app</span><span>Available ${a.managedSrc ? evl('docs', a.managedSrc) : ''}</span></div><div><span>Toolkit</span><span><code>${a.slug}</code></span></div></div></div></div></aside></div></div>`;
}
$('#v-app').addEventListener('click', e => {
  const b = e.target.closest('[data-set],[data-perm]'); if (!b || !curApp) return;
  const st = stateOf(curApp);
  if (b.dataset.set) st[b.dataset.set] = b.dataset.val;
  if (b.dataset.perm) st.perms.has(b.dataset.perm) ? st.perms.delete(b.dataset.perm) : st.perms.add(b.dataset.perm);
  const y = window.scrollY; renderAppGuide(curApp.id); window.scrollTo(0, y);
});

/* ---------- real setup attempts ---------- */
const PR = window.PROBES || {};
const probeOf = a => PR[a.slug] || PR[a.id];
const OUT = { rejects: ['t-easy', 'Checks the client ID at once'], login: ['t-med', 'Sign-in comes first'], blocked: ['t-gate', "Couldn't test"] };
function probeBox(a) {
  const r = probeOf(a); if (!r) return '';
  const o = OUT[r.outcome] || OUT.blocked, host = (() => { try { return new URL(r.endpoint).host; } catch (e) { return r.endpoint; } })();
  return `<div class="box"><div class="bh">Tested: starting the OAuth flow<span class="ev tested" style="margin-left:auto">tested</span></div><div class="bb">
    ${r.shot ? `<a class="pshot" href="${r.shot}" target="_blank" rel="noopener" title="Open screenshot"><img src="${r.shot}" alt="${esc(a.name)} response to a placeholder client ID" loading="lazy"></a>` : ''}
    <span class="tier ${o[0]}" style="justify-self:start">${o[1]}</span>
    <p class="ptake">${esc(r.takeaway || '')}</p>
    ${r.outcome === 'rejects' && r.text ? `<q class="pq">${esc((t => { try { return decodeURIComponent(t); } catch (e) { return t; } })(r.text).replace(/^Sign in with Google\s*/, ''))}</q>` : ''}
    <small class="pmeta">Opened ${esc(host)} with Composio's redirect URI and a placeholder client ID · ${new Date(r.checked).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</small>
  </div></div>`;
}

/* ---------- generic guide page ---------- */
let curApp = null;
function renderAppGuide(id) {
  const a = APP(id); const V = $('#v-app');
  if (!a) { V.innerHTML = '<div class="pad"><div class="wrap"><p>Guide not found.</p></div></div>'; return; }
  curApp = a;
  const st = stateOf(a), vw = viewOf(a, st);
  const d = DIFF[vw.diff], rv = a.review || {}, man = a.managed === 'yes';
  const item = x => `<li>${I.warn}<span>${linkify(esc(unprefix(x.text)))} ${evl(x.ev || 'docs', x.src)}</span></li>`;
  const req = x => `<li>${I.check}<span>${linkify(esc(x.text))} ${evl(x.ev || 'docs', x.src)}</span></li>`;
  const stages = [
    a.noOAuth ? { cls: 'now', badge: ['Start here', 'here'], title: 'Connect with an API key', time: 'Today', line: `Composio uses ${esc(a.auth || 'API key')} auth for ${esc(a.name)}: no OAuth app, no review. ${a.managedSrc ? evl('docs', a.managedSrc) : ''}` }
    : man ? { cls: 'now', badge: ["You're here", 'here'], title: "Use Composio's app", time: 'Today', line: `Works now. ${a.name}'s screen shows Composio. ${evl('docs', a.managedSrc)}` }
        : a.managed === 'no' ? { cls: 'now', badge: ['Start here', 'here'], title: 'No managed app', time: '—', line: `Composio needs your own credentials for ${a.name}. ${a.managedSrc ? evl('docs', a.managedSrc) : ''}` }
        : { cls: 'now', badge: ['Start here', 'here'], title: a.slug ? 'Managed app unclear' : 'No Composio toolkit found', time: '—', line: a.slug ? `Composio's docs don't say. ${a.managedSrc ? evl('docs', a.managedSrc) : ''}` : `Check Composio for a ${esc(a.name)} toolkit, or build a custom integration.` },
    { cls: '', title: 'Create your own app', time: `${a.setup ? a.setup.time : '—'} <span class="ev est">est.</span>`, line: a.limits && a.limits[0] ? esc(unprefix(a.limits[0].text)) : 'Works for your own account right away.' },
    vw.private ? { cls: 'goal', badge: ['Goal', 'goal'], title: 'Use it in your team', time: esc(vw.wait), line: `${esc(vw.private.text || '')}` }
    : vw.tier ? { cls: 'goal', badge: ['Goal', 'goal'], title: 'Get approved', time: `${esc(vw.wait)} ${vw.waitTag}`, line: `${esc(String(vw.tier.review || '').replace(/\.$/, ''))}. Then any user can connect.` }
    : rv.required ? { cls: 'goal', badge: ['Goal', 'goal'], title: 'Get approved', time: `${esc(shortWait(a))} ${rv.ev ? evl(rv.ev, rv.src) : ''}`, line: `${esc(first(rv.what || 'Provider review'))}. Then any user can connect.` }
                : { cls: 'goal', badge: ['Goal', 'goal'], title: 'Ship to everyone', time: 'No review', line: 'No provider review found in the docs.' },
  ];
  const steps = (a.steps || []).map((s, i) => `<div class="gstep"><span class="gn">${i + 1}</span><span class="who ${s.who === 'agent' ? 'w-agent' : 'w-you'}">${s.who === 'agent' ? 'Agent' : 'You'}</span><span class="gtt">${linkify(esc(s.t))}</span><span class="time">${s.time || ''}</span></div>`).join('');
  V.innerHTML = `
  <div class="band pad"><div class="wrap">
    <button class="back" data-view="library"><svg class="i sm" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>Library</button>
    <div class="titlerow"><span class="lg lgbig">${logo(a, 34)}</span><div><h1>${a.name}</h1><p>${esc(cap(a.oneLiner || ''))}</p></div></div>
    ${a.noOAuth ? `<div class="genbanner info">${I.check}<span><b>No OAuth app needed.</b> Composio connects to ${esc(a.name)} with ${esc(a.auth || 'an API key')}: each user pastes their own key. The OAuth details below only matter if you build your own OAuth flow. ${a.managedSrc ? evl('docs', a.managedSrc) : ''}</span></div>` : ''}
    ${a.thin ? `<div class="genbanner warn">${I.warn}<span><b>Thin guide.</b> Only ${[...(a.limits || []), ...(a.requirements || []), ...(a.gotchas || [])].length} fact(s) could be confirmed in the official docs. Treat this as a starting point.</span></div>` : ''}
    ${a.generated ? `<div class="genbanner"><span class="dotlive"></span><span><b>Generated live by the agent</b> · ${a.gen ? `${a.gen.model}, ${a.gen.pages || a.gen.searches.length} pages read, ${a.gen.seconds}s · <b>${a.gen.quotesFound} of ${a.gen.quotesChecked}</b> quotes found on the source page` : ''} · not reviewed by a person yet</span></div>` : ''}
    <div class="actions">
      <button class="btn primary agent" data-askapp>${I.bolt}Ask the agent</button>
      <button class="btn" ${a.generated ? 'data-sharegen' : `data-copy="${location.origin + location.pathname}#app/${a.id}"`}><svg class="i sm" viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>Share</button>
      ${a.portal ? `<a class="btn" href="${a.portal}" target="_blank" rel="noopener">Developer portal ↗</a>` : ''}
      <span class="pill">Checked ${a.checked ? new Date(a.checked).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : '—'}</span>
    </div>
    <div class="stats">
      <div><span class="k">Difficulty</span><span class="v">${d.n}${dbars(vw.diff)}</span></div>
      <div><span class="k">Your time <span class="ev est">est.</span></span><span class="v">${esc(vw.time)}</span></div>
      <div><span class="k">Approval wait ${vw.waitTag}</span><span class="v" title="${esc(vw.waitFull)}">${esc(vw.wait)}</span></div>
      <div><span class="k">Cost ${a.cost ? evl(a.cost.ev || 'est', a.cost.src) : ''}</span><span class="v vcl" title="${a.cost ? esc(a.cost.text) : ''}">${st.route === 'managed' ? '$0' : a.cost ? esc(first(a.cost.text)) : '—'}</span></div>
    </div>
  </div></div>
  ${setupPanel(a, st, vw)}
  ${st.route === 'managed' ? managedBody(a) : `
  <div class="pad"><div class="wrap access">
    <div class="sec-h"><h2>${man ? 'Launch today, switch to your own app later' : 'Bring your own app from day one'}</h2></div>
    <div class="journey">${stages.map((s, i) => `${i ? '<span class="jarrow" aria-hidden="true"><svg class="i sm" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' : ''}<div class="stage ${s.cls}"><span class="stop"><span class="snum">${i + 1}</span><b class="stitle">${s.title}</b>${s.badge ? `<span class="sbadge ${s.badge[1]}">${s.badge[0]}</span>` : ''}</span><span class="stime">${s.time}</span><span class="sline">${s.line}</span></div>`).join('')}</div>
  </div></div>
  <div class="pad"><div class="wrap body">
    <div class="mainc">
      ${a.limits && a.limits.length ? `<section><div class="h"><h2>Before approval</h2></div><ul class="checks">${clip(a.limits, item)}</ul></section>` : ''}
      ${a.requirements && a.requirements.length ? `<section><div class="h"><h2>What ${a.name} requires</h2></div><ul class="checks req">${clip(a.requirements, req)}</ul></section>` : ''}
      ${a.gotchas && a.gotchas.length ? `<section><div class="h"><h2>Watch out for</h2></div><ul class="checks">${clip(a.gotchas, item)}</ul></section>` : ''}
      ${steps ? `<section><div class="h"><h2>Steps</h2><small>${(a.steps || []).filter(s => s.who === 'agent').length} of ${(a.steps || []).length} by the agent</small></div><div class="gsteps">${steps}</div>
        <div class="acts" style="margin-top:10px">${a.portal ? `<a class="btn sm" href="${a.portal}" target="_blank" rel="noopener">Open ${a.name} developer portal ↗</a>` : ''}<button class="btn sm askag" data-askapp>${AGENT_ICON}Ask agent</button></div></section>` : ''}
    </div>
    <aside class="rail-c">
      <div class="box"><div class="bh">Composio values</div><div class="bb">
        <div class="kvs"><div><span>Auth</span><span>${esc(a.auth || 'OAuth 2.0')}</span></div><div><span>Managed app</span><span>${man ? 'Available' : a.managed === 'no' ? 'Not available' : a.managed === 'n/a' ? 'Not needed (no OAuth)' : 'Unknown'} ${a.managedSrc ? evl('docs', a.managedSrc) : ''}</span></div><div><span>Toolkit</span><span>${a.slug ? `<code>${a.slug}</code>` : 'Not found'}</span></div></div>
        <div class="urlbox"><div style="min-width:0"><span class="k">REDIRECT URI</span><span class="v">backend.composio.dev/api/v3/toolkits/auth/callback</span></div><button class="iconbtn" aria-label="Copy redirect URI" data-copy="${REDIRECT}"><svg class="i sm" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/></svg></button></div>
      </div></div>
      ${probeBox(a)}
      ${a.unverified && a.unverified.length ? `<div class="box"><div class="bh">Not confirmed<span class="ev est" style="margin-left:auto">${a.unverified.length}</span></div><div class="bb"><ul class="unv">${a.unverified.map(u => `<li>${esc(u)}</li>`).join('')}</ul></div></div>` : ''}
      <div class="box"><div class="bh">Sources<span style="margin-left:auto;font-weight:400;font-size:12.5px;color:var(--fg3)">${(a.sources || []).length}</span></div><div class="bb"><div class="src">${(a.sources || []).map(s => `<a href="${s.u}" target="_blank" rel="noopener"><span>${esc(s.t)}</span><span class="ev docs">docs</span></a>`).join('')}</div></div></div>
    </aside>
  </div></div>`}`;
}
document.addEventListener('click', e => { if (!e.target.closest('[data-askapp]') || !curApp) return; openAgent(); askApp(curApp, true); });
$('#v-app').addEventListener('click', e => { const b = e.target.closest('[data-more]'); if (!b) return; b.parentElement.querySelectorAll('.hid').forEach(x => x.hidden = false); b.remove(); });

/* ---------- agent: knows the open app ---------- */
function askApp(a, echo) {
  ctxApp = a;
  const d = DIFF[a.difficulty], rv = a.review || {};
  if (echo) add(`About ${esc(a.name)}`, 'msg me');
  reply({ html: `<b>${a.name}</b> is <b>${d.n}</b>: ${esc((a.oneLiner || d.blurb).replace(/\.$/, ''))}. ${a.managed === 'yes' ? "You can launch today on Composio's managed app." : a.managed === 'no' ? 'Composio has no managed app here, so you need your own from day one.' : ''} ${rv.required ? `Approval: ${esc(rv.what || 'review')}, ${esc(rv.wait || 'wait not stated')}.` : 'No mandatory provider review found.'}`,
    next: ['What are the limits before approval?', 'What does it require?', 'What should I watch out for?'] });
}
const baseAnswer = answer;
answer = function (v) {
  const lv = v.toLowerCase(), named = APPS.find(x => [x.name.split(' (')[0], x.id, x.slug].some(n => new RegExp('\\b' + n.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(lv)));
  if (named && named.id !== 'gmail' && named !== (!$('#v-app').hidden ? curApp : ctxApp)) { ctxApp = named; askApp(named); return; }
  const a = !$('#v-app').hidden ? curApp : ctxApp;
  if (!a) return baseAnswer(v);
  if (isLong(v)) return askLLM(v, () => appRules(a, v));
  return appRules(a, v);
};
function appRules(a, v) {
  const q = v.toLowerCase(), list = (arr, empty) => arr && arr.length ? `<ul class="alist">${arr.map(x => `<li>${esc(x.text)} ${evl(x.ev || 'docs', x.src)}</li>`).join('')}</ul>` : empty;
  if (/limit|cap\b|before approv|restrict/.test(q)) return reply({ html: `<b>${a.name}, before approval:</b>${list(a.limits, ' No limits found in the docs.')}` });
  if (/require|need|privacy|policy|verify|verification/.test(q)) return reply({ html: `<b>${a.name} requires:</b>${list(a.requirements, ' Nothing beyond a standard OAuth app.')}` });
  if (/watch|gotcha|careful|problem|issue|token|expire/.test(q)) return reply({ html: `<b>Watch out for:</b>${list(a.gotchas, ' Nothing specific found.')}` });
  if (/how long|wait|review|approv|time/.test(q)) return reply({ html: a.review && a.review.required ? `${esc(a.review.what || 'Review')}: <b>${esc(a.review.wait || 'not stated')}</b> ${evl(a.review.ev || 'est', a.review.src)}. Setup on your side: ${a.setup ? a.setup.time : '—'} <span class="ev est">est.</span>` : `No provider review found. Setup: ${a.setup ? a.setup.time : '—'} <span class="ev est">est.</span>` });
  if (/cost|price|pay|\$/.test(q)) return reply({ html: a.cost ? `${esc(a.cost.text)} ${evl(a.cost.ev || 'est', a.cost.src)}` : 'No cost found in the docs.' });
  if (/managed|composio/.test(q)) return reply({ html: a.managed === 'yes' ? `Yes, Composio has a managed ${a.name} app. ${evl('docs', a.managedSrc)}` : `Composio needs your own ${a.name} credentials. ${evl('docs', a.managedSrc)}` });
  if (/step|how do i|set ?up|start/.test(q)) return reply({ html: `<ol class="fixlist">${(a.steps || []).map(s => `<li>${esc(s.t)}${s.who === 'agent' ? ' <span class="who w-agent">Agent</span>' : ''}</li>`).join('')}</ol>` });
  if (/unverified|not sure|confirm/.test(q)) return reply({ html: a.unverified && a.unverified.length ? `I couldn't confirm:<ul class="alist">${a.unverified.map(u => `<li>${esc(u)}</li>`).join('')}</ul>` : 'Everything in this guide has a source.' });
  return askLLM(v);
}

/* ---------- agent: knows every app in the library ---------- */
const chipList = list => `<div class="aplist">${list.map(a => `<button data-app="${a.id}">${logo(a, 16)}<span>${a.name}</span><i style="background:${DIFF[a.difficulty].col}"></i></button>`).join('')}</div>`;
const showIn = (label, f) => [label, () => { Object.assign(LS, { q: '', diff: 'all', cat: 'all', managed: false }, f); $('#libSearch').value = ''; $('#libManaged').checked = !!LS.managed; renderLibrary(); show('library'); return null; }];
const hasReview = a => a.review && a.review.required;
const capRe = /\b\d[\d,]*\s*(\w+[\s-])?(installs?|users?|orgs?|organi[sz]ations?|connections?|servers?|guilds?|workspaces?)\b/i;
const auditRe = /security (assessment|review)|casa|penetration|pen test/i;
const allText = a => [...(a.limits || []), ...(a.requirements || []), ...(a.gotchas || [])].map(x => x.text).join(' ');
function namedApps(q) { return APPS.filter(x => [x.name.split(' (')[0], x.id, x.slug].some(n => new RegExp('\\b' + n.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(q))); }
function compare(list) {
  const rows = [['Difficulty', a => `<span class="tier ${DIFF[a.difficulty].cls}">${DIFF[a.difficulty].n}</span>`], ['Setup', a => a.setupShort || (a.setup ? a.setup.time : '—')], ['Approval', a => esc(shortWait(a))], ['Composio', a => a.managed === 'yes' ? 'Managed' : a.managed === 'no' ? 'Own app' : '—'], ['Key limit', a => a.limits && a.limits[0] ? esc(unprefix(a.limits[0].text)) : '—']];
  const best = list.slice().sort((x, y) => DIFF[x.difficulty].lv - DIFF[y.difficulty].lv || (x.review && x.review.required) - (y.review && y.review.required))[0];
  return { html: `<table class="cmp"><tr><th></th>${list.map(a => `<th>${logo(a, 16)} ${a.name}</th>`).join('')}</tr>${rows.map(([k, f]) => `<tr><td>${k}</td>${list.map(a => `<td>${f(a)}</td>`).join('')}</tr>`).join('')}</table><p style="margin-top:8px">${list.every(x => DIFF[x.difficulty].lv === DIFF[best.difficulty].lv && !!(x.review && x.review.required) === !!(best.review && best.review.required)) ? 'Similar effort on paper. The key limits are the real difference.' : `Easiest to run on your own app: <b>${best.name}</b>.`}</p>`,
    acts: list.map(a => [`Open ${a.name}`, () => { show('app', a.id); return null; }]) };
}
function crossAnswer(q) {
  const named = namedApps(q);
  if (named.length >= 2) return compare(named.slice(0, 3));
  if (!/\bapps?\b|which|list|show|compare|\bvs\b|easiest|hardest|fastest|quickest|how many|any(thing)? (that|without)/.test(q) || named.length === 1) return null;
  let list = null, title = '', f = {};
  const catHit = CATS.find(c => q.includes(c.toLowerCase()) || (c === 'CRM & support' && /\bcrm|support\b/.test(q)) || (c === 'Microsoft 365' && /microsoft/.test(q)) || (c === 'Google Workspace' && /\bgoogle\b/.test(q)) || (c === 'Commerce & finance' && /commerce|finance|accounting|payments?/.test(q)) || (c === 'Social & marketing' && /social|marketing/.test(q)) || (c === 'Developer tools' && /developer|dev tools?/.test(q)) || (c === 'Files & docs' && /files|docs|storage/.test(q)));
  if (/no (review|approval)|without (a )?(review|approval)|don'?t need (a |any )?(review|approval)|skip review/.test(q)) { list = APPS.filter(a => !hasReview(a)); title = 'No mandatory provider review'; }
  else if (/(need|require)s? (a |an )?(review|approval|verification)|review required|get approved/.test(q)) { list = APPS.filter(hasReview); title = 'Need a provider review before public use'; }
  else if (/audit|security (review|assessment)|casa|pen ?test/.test(q)) { list = APPS.filter(a => auditRe.test(allText(a) + ' ' + ((a.review || {}).what || ''))); title = 'Mention a security assessment or review'; }
  else if (/(not|isn'?t|no|without) (composio )?managed|bring your own|own (app|credentials)|\bbyo\b/.test(q)) { list = APPS.filter(a => a.managed !== 'yes'); title = 'Need your own app from day one'; }
  else if (/\bmanaged\b/.test(q)) { list = APPS.filter(a => a.managed === 'yes'); title = "Composio has a managed app"; f = { managed: true }; }
  else if (/\bcaps?\b|install limit|user limit|limited to|how many users/.test(q)) { list = APPS.filter(a => capRe.test((a.limits || []).map(x => x.text).join(' '))); title = 'Have a user, install or org cap before approval'; }
  else if (/gated|partner|apply for (api )?access/.test(q)) { list = APPS.filter(a => a.difficulty === 'gated'); title = 'Gated: apply for access first'; f = { diff: 'gated' }; }
  else if (/hardest|toughest|most difficult|blockers?/.test(q)) { list = APPS.filter(a => a.difficulty === 'hard' || a.difficulty === 'gated'); title = 'Hard or gated'; }
  else if (/\bhard\b|difficult/.test(q)) { list = APPS.filter(a => a.difficulty === 'hard'); title = 'Hard'; f = { diff: 'hard' }; }
  else if (/\bmedium\b/.test(q)) { list = APPS.filter(a => a.difficulty === 'medium'); title = 'Medium'; f = { diff: 'medium' }; }
  else if (/easiest|easy|simple|fastest|quickest|quick/.test(q)) { list = APPS.filter(a => a.difficulty === 'easy'); title = 'Easy: minutes, no review'; f = { diff: 'easy' }; }
  else if (catHit) { list = APPS.filter(a => a.category === catHit); title = catHit; f = { cat: catHit }; }
  else if (/how many|all apps|list (all|the) apps|what apps/.test(q)) {
    return { html: `The library has <b>${APPS.length}</b> guides: ${Object.entries(DIFF).map(([k, d]) => `<b>${APPS.filter(a => a.difficulty === k).length}</b> ${d.n.toLowerCase()}`).join(', ')}. Composio has a managed app for <b>${APPS.filter(a => a.managed === 'yes').length}</b> of them.`, next: ['Which apps need a review?', 'Which apps have install caps?', 'Compare HubSpot and Salesforce'] };
  }
  if (!list) return null;
  if (catHit && list.length && !f.cat && title !== catHit) { list = list.filter(a => a.category === catHit); title += ` · ${catHit}`; }
  return { html: list.length ? `<b>${title}</b> (${list.length})${chipList(list)}` : `No app in the library matches <b>${title.toLowerCase()}</b>.`, acts: Object.keys(f).length ? [showIn('Show in library', f)] : [], next: ['Compare HubSpot and Salesforce', 'Which apps need my own app?'] };
}
const appAnswer = answer;
answer = function (v) { const r = crossAnswer(v.toLowerCase()); if (r) return reply(r); return appAnswer(v); };
const LIB_SUGS = ['Which apps need a review?', 'Which apps have install caps?', 'Compare HubSpot and Salesforce', 'Which apps need my own app?'];
$('#libSugs').innerHTML = LIB_SUGS.map(s => `<button type="button" data-libq="${esc(s)}">${s}</button>`).join('');
function libAsk(v) { if (!v) return; openAgent(); add(esc(v), 'msg me'); answer(v); }
$('#libAsk').onsubmit = e => { e.preventDefault(); const v = $('#libAskIn').value.trim(); $('#libAskIn').value = ''; libAsk(v); };
$('#libSugs').onclick = e => { const b = e.target.closest('[data-libq]'); if (b) libAsk(b.dataset.libq); };

/* ---------- launch planner, built from the guides' data ----------
   Bar lengths come from each guide's stated approval wait. If a provider doesn't state one,
   the bar is hatched and labelled instead of guessed. */
function waitWeeks(a) {
  if (a.id === 'gmail') { const mt = maxTier(); if (mt < 0) return null; const w = TIERS[mt].wait; return /wk/.test(w) ? parseFloat(w.replace(/[^\d.]/g, '')) || null : (parseFloat((w.match(/[–-](\d+)/) || w.match(/(\d+)/))[1]) / 5); }
  if (!a.review || !a.review.required) return 0;
  const w = (a.review.wait || '').toLowerCase();
  let m;
  if ((m = w.match(/(\d+)\s*[–-]\s*(\d+)\s*(business )?days?/))) return +m[2] / 5;
  if ((m = w.match(/(\d+)\s*(business )?days?/))) return +m[1] / 5;
  if ((m = w.match(/(\d+)\s*[–-]\s*(\d+)\s*weeks?/))) return +m[2];
  if ((m = w.match(/(\d+)\s*weeks?/))) return +m[1];
  if (/one week|a week/.test(w)) return 1;
  if ((m = w.match(/(\d+)\s*months?/))) return +m[1] * 4.3;
  return null;
}
renderPlan = function () {
  const sel = [...picked].map(APP).filter(Boolean);
  $('#pick').innerHTML = APPS.filter(a => !a.generated).map(a => `<button class="${picked.has(a.id) ? 'on' : ''}" data-pk="${a.id}" aria-pressed="${picked.has(a.id)}">${logo(a, 16)}${a.name}</button>`).join('');
  const rows = sel.map(a => ({ a, w: waitWeeks(a), m: a.managed === 'yes' }));
  const fmt = w => w === null ? 'Not stated' : w < 1 ? 'This week' : `~${Math.ceil(w)} wks`;
  const own = rows.filter(r => !r.m), unk = rows.filter(r => r.w === null);
  const launch = own.some(r => r.w === null) ? null : own.length ? Math.max(0, ...own.map(r => r.w)) : 0;
  const full = unk.length ? null : rows.length ? Math.max(0, ...rows.map(r => r.w)) : 0;
  $('#sum').innerHTML = `<div><span class="k">Live today on Composio</span><span class="v">${rows.filter(r => r.m).length} / ${rows.length}</span></div><div><span class="k">Earliest launch <span class="ev est">from guides</span></span><span class="v">${rows.length ? fmt(launch) : '—'}</span></div><div><span class="k">All on your own apps</span><span class="v">${rows.length ? (full === null ? `${unk.length} not stated` : fmt(full)) : '—'}</span></div>`;
  const W = 9, pc = w => Math.min(100, w / W * 100);
  $('#gt').innerHTML = `<div class="nm" style="color:var(--fg3);font-size:12.5px">App</div><div class="lane"><div class="scale">${[...Array(W)].map((_, i) => `<span>${i ? 'Wk ' + i : 'Today'}</span>`).join('')}</div></div>` +
    rows.sort((x, y) => (y.w === null ? 99 : y.w) - (x.w === null ? 99 : x.w)).map(({ a, w, m }) => {
      const end = w === null ? W : Math.max(w, 0.25), label = w === 0 ? 'Own app this week, no review' : w === null ? (a.id === 'gmail' ? 'Depends on the permissions you pick' : 'Review · wait not stated') : esc(first((a.review || {}).what || 'Review')).slice(0, 40);
      return `<div class="nm">${logo(a, 18)}${a.name}${!m ? '<span class="tier t-hard" style="margin-left:auto;font-size:11px">no managed</span>' : ''}</div><div class="lane">${m ? `<div class="gb m" style="left:0;width:${Math.max(pc(end), 28)}%">Managed, live</div>` : ''}<div class="gb ${m ? 'o' : 'w'}${w === null ? ' unk' : ''}" style="left:${pc(0.15)}%;width:${Math.max(pc(end - 0.15), 26)}%" title="${esc(reviewTxt(a))}">${label}</div></div>`;
    }).join('');
  const flags = [];
  rows.forEach(({ a, m, w }) => {
    if (!m) flags.push(`<b>${a.name}</b>: no Composio managed app, so it blocks launch until your own app works. ${a.managedSrc ? evl('docs', a.managedSrc) : ''}`);
    const cap = (a.limits || []).find(x => capRe.test(x.text) || /per minute|requests? per|rate limit/i.test(x.text)); if (cap) flags.push(`<b>${a.name}</b>: ${esc(unprefix(cap.text))} ${evl(cap.ev || 'docs', cap.src)}`);
    if (w === null && a.id !== 'gmail') flags.push(`<b>${a.name}</b>: ${esc(first((a.review || {}).what || 'review'))}, and the docs don't state how long it takes.`);
    if (a.id === 'gmail' && w === null) flags.push('<b>Gmail</b>: the wait depends on the permissions you pick in the Gmail guide.');
  });
  $('#flags').innerHTML = flags.map(f => `<div class="flag">${I.warn}<span>${f}</span></div>`).join('') || '<p style="color:var(--fg2)">Nothing to flag.</p>';
};

/* ================= LIVE GENERATION =================
   Calls /api/generate (Gemini + Google Search on the server), streams real progress,
   then opens the guide in the same page every library app uses. */
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
async function packGuide(g) { const cs = new Blob([JSON.stringify(g)]).stream().pipeThrough(new CompressionStream('deflate-raw')); return b64u(await new Response(cs).arrayBuffer()); }
async function unpackGuide(s) { const ds = new Blob([unb64u(s)]).stream().pipeThrough(new DecompressionStream('deflate-raw')); return JSON.parse(await new Response(ds).text()); }
function addGenerated(g) { const i = APPS.findIndex(x => x.id === g.id); if (i >= 0) APPS.splice(i, 1); APPS.push(g); }
async function openGenerated(g) {
  addGenerated(g); show('app', g.id);
  try { history.replaceState(null, '', '#gen/' + await packGuide(g)); } catch (e) { }
}
async function openShared(s) { try { const g = await unpackGuide(s); addGenerated(g); show('app', g.id); history.replaceState(null, '', '#gen/' + s); } catch (e) { toast('That shared guide link is damaged'); show('generate'); } }
document.addEventListener('click', async e => {
  if (!e.target.closest('[data-sharegen]') || !curApp) return;
  copy(location.origin + location.pathname + '#gen/' + await packGuide(curApp), 'Guide link copied. It works for anyone, no account needed');
});

let genBusy = false, genTimer = null;
$$('.try button').forEach(b => b.onclick = () => { $('#genInput').value = b.textContent; genCheckLib(); $('#genInput').focus(); });
function genCheckLib() {
  const v = $('#genInput').value.trim().toLowerCase(), hit = v && namedApps(v)[0];
  $('#genLib').hidden = !hit;
  if (hit) $('#genLib').innerHTML = `${logo(hit, 18)}<span><b>${hit.name}</b> is already in the library, researched and spot-checked.</span><button type="button" class="btn sm" data-app="${hit.id}">Open guide</button>`;
}
$('#genInput').addEventListener('input', genCheckLib);
$('#genForm').onsubmit = async e => {
  e.preventDefault(); if (genBusy) return;
  const app = $('#genInput').value.trim(); if (!app) { $('#genInput').focus(); return; }
  genBusy = true; $('#genGo').disabled = true; $('#genGo').textContent = 'Generating…';
  $('#genRun').hidden = false; $('#genTitle').textContent = 'Researching ' + app; const log = $('#genLog'); log.innerHTML = '';
  const t0 = Date.now(); clearInterval(genTimer); genTimer = setInterval(() => $('#genTime').textContent = Math.round((Date.now() - t0) / 1000) + 's', 500);
  const lines = {};
  const line = (k, html, state) => { let el = lines[k]; if (!el) { el = lines[k] = document.createElement('div'); el.className = 'ln'; log.appendChild(el); } el.innerHTML = `<span class="ic">${state === 'run' ? '<span class="spin"></span>' : state === 'err' ? I.cross : I.check}</span>${html}`; };
  const done = () => { genBusy = false; clearInterval(genTimer); $('#genGo').disabled = false; $('#genGo').textContent = 'Generate guide'; };
  try {
    const r = await fetch('/api/generate?app=' + encodeURIComponent(app));
    if (!r.ok || !r.body) throw new Error(r.status === 404 ? 'Live generation needs the server. Run "npm run dev" or use the deployed link.' : 'Server error ' + r.status);
    const rd = r.body.getReader(), dec = new TextDecoder(); let buf = '';
    for (;;) {
      const { value, done: end } = await rd.read(); if (end) break;
      buf += dec.decode(value, { stream: true });
      let i; while ((i = buf.indexOf('\n')) >= 0) {
        const raw = buf.slice(0, i); buf = buf.slice(i + 1); if (!raw.trim()) continue;
        const m = JSON.parse(raw);
        if (m.error) {
          line('err', `<span>${esc(m.error)}</span>`, 'err');
          if (m.partial) { const p = m.partial, el = document.createElement('div'); el.className = 'genpartial';
            el.innerHTML = `<b>What the agent found before the model got busy</b>${p.comp ? `<div>Composio toolkit <code>${esc(p.comp.slug)}</code> · managed auth: ${esc(p.comp.managed)} <a class="ev docs" href="${esc(p.comp.url)}" target="_blank" rel="noopener">docs ↗</a></div>` : '<div>No Composio toolkit found.</div>'}${p.pages.length ? `<div>Official pages read:</div><ul>${p.pages.map(u => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^https?:\/\//, ''))}</a></li>`).join('')}</ul>` : ''}<button type="button" class="btn sm" id="genRetry">Try again</button>`;
            log.appendChild(el); $('#genRetry').onclick = () => $('#genForm').requestSubmit(); }
          done(); return;
        }
        if (m.step) line(m.step, `<span>${esc(m.label)}</span>${m.detail ? `<small>${esc(m.detail)}</small>` : ''}`, m.state);
        if (m.guide) {
          const g = m.guide;
          line('ready', `<span><b style="font-weight:500">${esc(g.name)} guide ready</b> · ${g.gen.quotesFound} of ${g.gen.quotesChecked} quotes confirmed</span><button class="btn sm agent" type="button" id="genOpen" style="margin-left:auto">Open guide</button>`, 'done');
          $('#genOpen').onclick = () => openGenerated(g);
          setTimeout(() => { if (!$('#v-generate').hidden) openGenerated(g); }, 900);
        }
      }
    }
  } catch (err) { line('err', `<span>${esc(err.message)}</span>`, 'err'); }
  done();
};

/* ---------- agent context follows the page ---------- */
const GMAIL_QUICK = $('#quick').innerHTML;
const baseShow = show;
show = function (v, arg) {
  baseShow(v, arg);
  const onGmail = !$('#v-guide').hidden, a = !$('#v-app').hidden ? curApp : null;
  $('#ctxApp').innerHTML = onGmail ? L.gmail(14) + 'Gmail' : a ? logo(a, 14) + a.name : `${APPS.length} apps`;
  $('#quick').innerHTML = onGmail ? GMAIL_QUICK : (a ? ['What are the limits before approval?', 'How long is the review?', 'What does it require?', 'What should I watch out for?'] : LIB_SUGS).map(s => `<button type="button" data-libq="${esc(s)}">${s}</button>`).join('');
};
$('#quick').addEventListener('click', e => { const b = e.target.closest('[data-libq]'); if (!b) return; add(esc(b.dataset.libq), 'msg me'); answer(b.dataset.libq); });

/* ---------- verification log ---------- */
const V = window.VERIFY || [];
const LEARNED = [
  ['Xero changed its limits', 'Since March 2026 the free developer plan allows 5 connections and uncertified apps cap at 50. Our first draft said "5 organisations until certified".', 'xero'],
  ["Google's two review times disagree", "Google's developer guide says sensitive-scope review takes 3–5 business days; its own FAQ estimates 10. We now show 3–10 and cite both.", 'gmail'],
  ['Restricted review is ~6 weeks, not our guess', 'We had "3–6 wks (est.)". Google\'s FAQ says 6 weeks, so the Gmail guide now uses that, tagged docs.', 'gmail'],
  ['CASA lab time and tier had no source', 'We removed "Lab time 5–20 days" and "Tier 2 (most apps)". Google publishes neither.', 'gmail'],
  ['Salesforce moved to External Client Apps', 'New Connected Apps are restricted as of Spring \'26, so the guide follows External Client Apps.', 'salesforce'],
  ["Composio's managed X app is gone", "Composio removed managed auth for X in February 2026, so X needs your own app from day one.", 'twitter'],
  ['Composio contradicts itself on Jira', "The toolkit page says managed auth exists; an older Composio page says it doesn't. We follow the toolkit page and flag it.", 'jira'],
  ['Unpublished limits stay unpublished', 'Several providers (Shopify, Xero, Intuit, Zoom, Figma) state no review time. We show "Not stated" instead of guessing.', null],
];
let vFilter = 'all';
function renderVerify() {
  const docsClaims = APPS.filter(a => !a.generated).reduce((n, a) => n + ['limits', 'requirements', 'gotchas'].reduce((m, k) => m + (a[k] || []).filter(x => (x.ev || 'docs') === 'docs').length, 0), 0);
  const unv = APPS.filter(a => !a.generated).reduce((n, a) => n + (a.unverified || []).length, 0);
  const ok = V.filter(v => v.verdict === 'confirmed').length, part = V.filter(v => v.verdict === 'partly').length, bad = V.filter(v => !['confirmed', 'partly'].includes(v.verdict)).length;
  const rows = V.filter(v => vFilter === 'all' || (vFilter === 'confirmed' ? v.verdict === 'confirmed' : v.verdict !== 'confirmed'));
  $('#vlog').innerHTML = `
    <div class="lhead2"><div><h1>Verification log</h1><p>How the guides were researched and checked, and what we corrected along the way.</p></div><span class="pill">Checked ${new Date((V[0] || {}).checked || Date.now()).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span></div>
    <div class="vstats">
      <div><b>${docsClaims}</b><span>claims with a source</span></div>
      <div><b>${V.length}</b><span>re-checked at random</span></div>
      <div class="ok"><b>${ok}</b><span>confirmed word for word</span></div>
      <div class="warn"><b>${part}</b><span>partly right, corrected</span></div>
      <div><b>${bad}</b><span>wrong or unreachable</span></div>
      <div><b>${unv}</b><span>items we could not confirm</span></div>
    </div>
    <div class="vsteps">
      <div><span class="snum">1</span><b>Research</b><p>Six agents read each provider's official developer docs and its Composio toolkit page. Every claim stores the URL it came from; estimates are tagged est.</p></div>
      <div><span class="snum">2</span><b>Re-check</b><p>A separate agent re-opened the sources for ${V.length} random claims (at least one per app) and judged each one strictly against the page text.</p></div>
      <div><span class="snum">3</span><b>Correct</b><p>We fixed every partly-right claim (below). Anything no page states sits in each guide's "Not confirmed" box.</p></div>
      <div><span class="snum">4</span><b>Live guides</b><p>Generated guides check themselves: code confirms each quote is on its page, and moves the rest to "Not confirmed".</p></div>
    </div>
    <section><div class="h"><h2>What we learned and corrected</h2></div><div class="vlearn">${LEARNED.map(([t, d, id]) => { const a = id && APP(id); return `<div>${a ? logo(a, 22) : '<span class="lg-img" style="width:22px;height:22px"><b>•</b></span>'}<span><b>${t}</b><small>${d}</small></span></div>`; }).join('')}</div></section>
    <section><div class="h"><h2>Setup attempts</h2><small>${Object.keys(PR).length} providers · real browser · placeholder client ID</small></div>
      <p class="hint" style="margin-bottom:10px">An agent started each provider's OAuth flow with Composio's redirect URI and a placeholder client ID, then recorded what the provider did. It shows how each provider fails, which is what you'll see while debugging your own setup.</p>
      <div class="pgrid">${Object.entries(OUT).map(([k, o]) => { const list = Object.values(PR).filter(r => r.outcome === k); return `<div class="pcol"><div class="pch"><span class="tier ${o[0]}">${o[1]}</span><b>${list.length}</b></div><div class="aplist">${list.map(r => { const a = APPS.find(x => x.slug === r.id || x.id === r.id); return a ? `<a class="pchipl" href="${r.shot || '#'}" target="_blank" rel="noopener" title="${esc(r.text || '')}">${logo(a, 16)}<span>${a.name}</span></a>` : ''; }).join('')}</div></div>`; }).join('')}</div>
    </section>
    <section><div class="h"><h2>Sample re-check</h2><div class="seg" id="vSeg"><button data-vf="all" class="${vFilter === 'all' ? 'on' : ''}">All ${V.length}</button><button data-vf="confirmed" class="${vFilter === 'confirmed' ? 'on' : ''}">Confirmed ${ok}</button><button data-vf="fixed" class="${vFilter === 'fixed' ? 'on' : ''}">Corrected ${part + bad}</button></div></div>
      <div class="vtable">${rows.map(v => { const a = APP(v.app); return `<div class="vrow ${v.verdict}">
        <span class="vapp">${a ? logo(a, 20) : ''}<span>${a ? a.name : v.app}</span></span>
        <span class="vclaim">${v.corrected ? `<s>${esc(v.claim)}</s><span class="vfix">${esc(v.corrected)}</span>` : esc(v.claim)}${v.note && v.verdict !== 'confirmed' ? `<small>${esc(v.note)}</small>` : ''}<q>${esc(v.quote || '')}</q></span>
        <span class="vver"><span class="tier ${v.verdict === 'confirmed' ? 't-easy' : 't-med'}">${v.verdict === 'confirmed' ? 'Confirmed' : v.corrected ? 'Corrected' : 'Partly'}</span><a class="ev docs" href="${v.src}" target="_blank" rel="noopener">source ↗</a></span>
      </div>`; }).join('')}</div></section>`;
}
document.addEventListener('click', e => { const b = e.target.closest('[data-vf]'); if (!b) return; vFilter = b.dataset.vf; renderVerify(); });
{ const s0 = show; show = function (v, arg) { s0(v, arg); if (v === 'verify') renderVerify(); }; }

/* ---------- what the model may use when the agent asks for help ---------- */
const slim = a => ({ name: a.name, category: a.category, difficulty: a.difficulty, composioAuth: a.auth, composioManaged: a.managed, managedSource: a.managedSrc, oneLiner: a.oneLiner, setupTime: a.setup && a.setup.time, review: a.review, cost: a.cost, limits: a.limits, requirements: a.requirements, gotchas: a.gotchas, steps: a.steps, notConfirmed: a.unverified, whoCanConnect: (CH.aud || {})[a.id], permissions: CH.perms[a.id] && CH.perms[a.id].options.map(o => ({ task: o.task, scope: o.scope, tier: o.tier, src: o.src })), setupAttempt: probeOf(a) && { outcome: probeOf(a).outcome, providerSaid: probeOf(a).text, takeaway: probeOf(a).takeaway } });
window.agentContext = () => {
  if (!$('#v-app').hidden && curApp) return { page: 'guide', app: slim(curApp), composio: { managedAppTradeoffs: 'Users see "Composio wants to access your account"; default scopes may not cover everything; quota shared across all Composio users; 15-minute minimum polling', src: COMPOSIO_SRC } };
  if (!$('#v-guide').hidden) { const g = APP('gmail'); return { page: 'gmail guide', app: slim(g), chosenScopes: need(), tier: maxTier() >= 0 ? TIERS[maxTier()].n : 'not chosen yet', tiers: TIERS.map(t => ({ tier: t.n, review: t.review, wait: t.wait, needs: t.needs, yearlyCost: t.cost })), scopeTiers: Object.fromEntries(Object.entries(SC).map(([k, v]) => [k, TIERS[v.t].n])), toolScopes: TOOLS.map(t => ({ tool: t.n, scopes: t.s, tier: TIERS[t.tier].n })), toolScopeNote: 'Tool-to-scope mapping is inferred from Google API docs; gmail.labels only manages labels, applying labels to messages needs gmail.modify', sources: Object.values(SRCS).map(s => s[1]), nextStep: (current() || {}).t }; }
  if (ctxApp) return { page: 'library', app: slim(ctxApp) };
  return { page: 'library', apps: APPS.filter(a => !a.generated).map(a => ({ name: a.name, difficulty: a.difficulty, managed: a.managed, approvalWait: shortWait(a), keyLimit: a.limits && a.limits[0] && a.limits[0].text, src: a.limits && a.limits[0] && a.limits[0].src })) };
};

/* ---------- boot ---------- */
{ const g = APP('gmail'); if (g && $('#gProbe')) $('#gProbe').innerHTML = probeBox(g); }
const gsc = $$('#v-guide .src a'); $('#gSrcCount').textContent = `${gsc.length} · ${[...gsc].filter(a => a.querySelector('.ev.est')).length} third-party`;
renderLibrary(); renderPlan();
function route() { const h = (location.hash || '').slice(1); if (h.startsWith('gen/')) { openShared(h.slice(4)); return; } if (h.startsWith('app/')) show('app', h.slice(4)); else show(VIEWS.includes(h) ? h : 'guide'); }
route();
window.addEventListener('hashchange', route);
