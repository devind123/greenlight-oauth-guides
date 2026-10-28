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
