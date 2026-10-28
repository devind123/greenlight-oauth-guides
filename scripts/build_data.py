"""Merge researched app JSON into data/apps.js. Drops claims without a source, downloads Composio logos."""
import json, glob, os, re, subprocess, sys
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
R = str(ROOT / 'research')
OUT = str(ROOT)
GMAIL_REST = 'https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification'
GMAIL_CAPS = 'https://support.google.com/cloud/answer/15549945'
gmail = {
  "id": "gmail", "name": "Gmail", "slug": "gmail", "category": "Google Workspace", "auth": "OAuth 2.0",
  "managed": "yes", "managedSrc": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app",
  "difficulty": "hard", "oneLiner": "Reading mail needs a yearly security audit.",
  "setup": {"time": "~1 hr", "ev": "est"},
  "review": {"required": True, "what": "Google verification", "wait": "2–3 days (brand) to ~6 weeks (restricted)", "ev": "docs", "src": "https://support.google.com/cloud/answer/13463817"},
  "cost": {"text": "$0, or ~$540+/yr if restricted", "ev": "est", "src": None},
  "limits": [{"text": "In Testing, up to 100 test users, and access expires after 7 days.", "ev": "docs", "src": GMAIL_CAPS}],
  "requirements": [
    {"text": "Restricted scopes (reading mail, drafts, modify) need a CASA security assessment, renewed at least every 12 months.", "ev": "docs", "src": GMAIL_REST},
    {"text": "Sensitive scopes such as gmail.send need Google verification, typically 3-5 business days.", "ev": "docs", "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"}],
  "gotchas": [
    {"text": "Only permanent delete needs https://mail.google.com/; every other action works with a narrower scope.", "ev": "docs", "src": "https://developers.google.com/workspace/gmail/api/auth/scopes"},
    {"text": "Unverified production apps have a user cap for the project's lifetime that cannot be reset.", "ev": "docs", "src": GMAIL_CAPS},
    {"text": "Google's verification FAQ estimates 10 business days for sensitive scopes and 6 weeks for restricted scopes.", "ev": "docs", "src": "https://support.google.com/cloud/answer/13463817"}],
  "steps": [], "sources": [{"t": "Google: restricted scope verification", "u": GMAIL_REST}, {"t": "Google: unverified apps", "u": GMAIL_CAPS}],
  "unverified": [], "checked": "2026-10-28", "portal": "https://console.cloud.google.com/auth/overview", "bespoke": True,
}
apps, log = [gmail], []
for f in sorted(glob.glob(R + '/raw/[a-f].json')):
    try: data = json.load(open(f))
    except Exception as e: log.append(f'BAD JSON {f}: {e}'); continue
    for a in data:
        for key in ('limits', 'requirements', 'gotchas'):
            keep = []
            for x in a.get(key) or []:
                ev = x.get('ev', 'docs')
                if ev == 'docs' and not (x.get('src') or '').startswith('http'):
                    log.append(f"DROP {a['id']}.{key}: no source: {x.get('text','')[:70]}"); continue
                keep.append(x)
            a[key] = keep
        rv = a.get('review') or {}
        if rv.get('ev') == 'docs' and not (rv.get('src') or '').startswith('http'): rv['ev'] = 'est'; log.append(f"REVIEW->est {a['id']}")
        if a.get('difficulty') not in ('easy', 'medium', 'hard', 'gated'): log.append(f"BAD difficulty {a['id']}: {a.get('difficulty')}"); continue
        if any(x['id'] == a['id'] for x in apps): log.append(f"DUP {a['id']}"); continue
        apps.append(a)
SHORT_WAIT = {'gmail': '2 days–6 wks', 'googlecalendar': '3–5 days', 'googlesheets': '3–5 days', 'googledrive': 'Several weeks', 'youtube': '3–5 days', 'figma': 'Not stated', 'zoom': 'Not stated', 'dropbox': 'Not stated', 'asana': '~1 week', 'intercom': 'Up to 7 days'}
SHORT_SETUP = {'zendesk': '~45 min'}
for a in apps:
    if a['id'] in SHORT_WAIT: a['waitShort'] = SHORT_WAIT[a['id']]
    if a['id'] in SHORT_SETUP: a['setupShort'] = SHORT_SETUP[a['id']]
# Corrections from the independent fact-check (research/verify.json)
FIX = {
 "No Calendar API scope appears on Google's restricted scope list, so no CASA assessment is needed.": "No Calendar API scope is on Google's restricted scope list.",
 "Report each stored account at least every 7 days by default, or per the Cycle-Period header.": "Report each stored account once per cycle period (7 days by default, or per the Cycle-Period header), and not more often.",
 "API-only submissions need a Developer Edition org, false-positive notes if any, and solution documentation.": "API-only submissions need a Developer Edition org, credentials for external components, DAST scan reports, false-positive notes if any, and solution documentation.",
 "Marketplace reviewers ask for a video demo of install, OAuth, setup and uninstall.": "A short video demo of install, OAuth, setup and uninstall is optional but speeds up Marketplace review.",
 "drive.file only covers files the user opens with your app or picks in the Google Picker, not the whole Drive.": "drive.file only covers files your app creates or the user opens or picks with your app, not the whole Drive.",
 "The person verifying needs Application Administrator or Cloud Application Administrator in Entra, and Partner Admin or Account Admin in Partner Center, and must sign in with MFA.": "The person verifying needs Application Administrator or Cloud Application Administrator in Entra, and Microsoft AI Cloud Partner Program Admin or Accounts Admin in Partner Center, and must sign in with MFA.",
}
fixed = 0
for a in apps:
    for key in ('limits', 'requirements', 'gotchas'):
        for x in a.get(key) or []:
            if x['text'] in FIX: x['text'] = FIX[x['text']]; x['fixed'] = True; fixed += 1
log.append(f'corrected {fixed} claims from fact-check')
# Full audit (research/audit/result*.json): every sourced claim re-checked against its page.
AUD = []
for f in sorted(glob.glob(R + '/audit/result*.json')):
    try: AUD += json.load(open(f))
    except Exception as e: log.append(f'BAD audit file {f}: {e}')
afix = {'fixed': 0, 'moved': 0}
byid = {a['id']: a for a in apps}
for v in AUD:
    a = byid.get(v.get('app'))
    if not a: continue
    fld, i, verdict, fx = v.get('field'), v.get('i', 0), v.get('verdict'), (v.get('fix') or '').strip()
    if fld in ('limits', 'requirements', 'gotchas'):
        arr = a.get(fld) or []
        x = next((c for c in arr if c.get('text') == v.get('text')), arr[i] if i < len(arr) else None)
        if not x or verdict in ('confirmed', 'unreachable'): continue
        if fx and verdict in ('partly', 'contradicted', 'not_found'):
            x['text'] = fx; x['fixed'] = True; afix['fixed'] += 1
        elif verdict in ('not_found', 'contradicted'):
            arr.remove(x); a.setdefault('unverified', []).append(f"{x['text']} (not found on the cited page in the full audit)"); afix['moved'] += 1
    elif fld == 'review' and fx and verdict in ('partly', 'contradicted') and ' | wait: ' in fx:
        w, wt = fx.split(' | wait: ', 1); a['review']['what'] = w.strip(); a['review']['wait'] = wt.strip(); afix['fixed'] += 1
    elif fld == 'review' and verdict in ('not_found', 'contradicted') and not fx:
        a['review']['ev'] = 'est'; afix['moved'] += 1
    elif fld == 'cost' and verdict in ('not_found', 'contradicted', 'partly'):
        a['cost']['ev'] = 'est'; afix['moved'] += 1
# follow known redirects so source links land on the current page
REDIRECTS = {'https://developers.asana.com/docs/submit-your-app': 'https://developers.asana.com/docs/publish-your-app', 'https://developers.asana.com/docs/manage-distribution': 'https://developers.asana.com/docs/share-your-app'}
def _fix_urls(o):
    if isinstance(o, dict): return {k: _fix_urls(v) for k, v in o.items()}
    if isinstance(o, list): return [_fix_urls(v) for v in o]
    if isinstance(o, str): return REDIRECTS.get(o, o)
    return o
apps[:] = [_fix_urls(a) for a in apps]
from collections import Counter
AC = Counter(v.get('verdict') for v in AUD)
AUDIT = {'total': len(AUD), 'counts': dict(AC), 'checked': '2026-10-29', 'items': [{k: v.get(k) for k in ('app', 'field', 'text', 'src', 'verdict', 'quote', 'fix', 'note')} for v in AUD if v.get('verdict') != 'confirmed'], 'confirmedSample': [{k: v.get(k) for k in ('app', 'field', 'text', 'src', 'quote')} for v in AUD if v.get('verdict') == 'confirmed']}
open(OUT + '/data/audit.js', 'w').write('/* Full audit: every sourced claim re-checked against its page (research/audit). */\nwindow.AUDIT = ' + json.dumps(AUDIT, ensure_ascii=False) + ';\n')
log.append(f"full audit: {len(AUD)} claims, corrected {afix['fixed']}, moved/downgraded {afix['moved']}")
V = json.load(open(R + '/verify.json'))
for v in V:
    v['corrected'] = FIX.get(v['claim'])
open(OUT + '/data/verify.js', 'w').write('/* Independent re-check of a random sample of claims against their sources. */\nwindow.VERIFY = ' + json.dumps(V, ensure_ascii=False, indent=1) + ';\n')
os.makedirs(OUT + '/logos', exist_ok=True)
for a in apps:
    p = f"{OUT}/logos/{a['slug']}.svg"
    if os.path.exists(p) and os.path.getsize(p) > 100: continue
    r = subprocess.run(['curl', '-sL', '-o', p, '-w', '%{http_code} %{content_type}', f"https://logos.composio.dev/api/{a['slug']}"], capture_output=True, text=True)
    ok = r.stdout.startswith('200') and 'svg' in r.stdout
    if not ok:
        log.append(f"LOGO {a['slug']}: {r.stdout}")
        if os.path.exists(p): os.remove(p)
open(OUT + '/data/apps.js', 'w').write('/* Generated from researched JSON. Every docs-tagged claim carries its source URL. */\nwindow.APPS_DATA = ' + json.dumps(apps, ensure_ascii=False, indent=1) + ';\n')
print(len(apps), 'apps'); print('\n'.join(log) or 'no issues')
