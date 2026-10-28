/* Real setup attempts: start each provider's OAuth flow with Composio's redirect URI and a
   placeholder client ID, then record what the provider actually does (status, final URL,
   visible error, screenshot). Needs: npm i -D playwright && npx playwright install chromium
   Usage: node scripts/probe.mjs  -> research/probes.json, data/probes.js, probes/*.jpg */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
const ROOT = new URL('..', import.meta.url).pathname;
const REDIRECT = 'https://backend.composio.dev/api/v3/toolkits/auth/callback';
const G = 'https://accounts.google.com/o/oauth2/v2/auth', MS = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize', ATL = 'https://auth.atlassian.com/authorize';
const EP = {
  gmail: [G, 'https://www.googleapis.com/auth/gmail.send'], googlecalendar: [G, 'https://www.googleapis.com/auth/calendar.readonly'], googledrive: [G, 'https://www.googleapis.com/auth/drive.file'], googlesheets: [G, 'https://www.googleapis.com/auth/spreadsheets.readonly'], youtube: [G, 'https://www.googleapis.com/auth/youtube.readonly'],
  outlook: [MS, 'Mail.Read'], microsoft_teams: [MS, 'Chat.Read'], github: ['https://github.com/login/oauth/authorize', 'repo'], linear: ['https://linear.app/oauth/authorize', 'read'],
  jira: [ATL, 'read:jira-work', { audience: 'api.atlassian.com', prompt: 'consent' }], confluence: [ATL, 'read:confluence-content.all', { audience: 'api.atlassian.com', prompt: 'consent' }],
  figma: ['https://www.figma.com/oauth', 'file_content:read'], notion: ['https://api.notion.com/v1/oauth/authorize', '', { owner: 'user' }], hubspot: ['https://app.hubspot.com/oauth/authorize', 'oauth'],
  salesforce: ['https://login.salesforce.com/services/oauth2/authorize', 'api'], pipedrive: ['https://oauth.pipedrive.com/oauth/authorize', ''], intercom: ['https://app.intercom.com/oauth', ''],
  slack: ['https://slack.com/oauth/v2/authorize', 'chat:write'], discord: ['https://discord.com/oauth2/authorize', 'identify'], zoom: ['https://zoom.us/oauth/authorize', ''], linkedin: ['https://www.linkedin.com/oauth/v2/authorization', 'openid profile'],
  twitter: ['https://x.com/i/oauth2/authorize', 'tweet.read users.read', { code_challenge: 'challenge', code_challenge_method: 'plain' }], reddit: ['https://www.reddit.com/api/v1/authorize', 'identity', { duration: 'permanent' }],
  xero: ['https://login.xero.com/identity/connect/authorize', 'openid'], quickbooks: ['https://appcenter.intuit.com/connect/oauth2', 'com.intuit.quickbooks.accounting'], stripe: ['https://connect.stripe.com/oauth/authorize', 'read_write'],
  dropbox: ['https://www.dropbox.com/oauth2/authorize', ''], box: ['https://account.box.com/api/oauth2/authorize', ''], asana: ['https://app.asana.com/-/oauth_authorize', ''], airtable: ['https://airtable.com/oauth2/v1/authorize', 'data.records:read', { code_challenge: 'x'.repeat(43), code_challenge_method: 'S256' }],
  clickup: ['https://app.clickup.com/api', ''], monday: ['https://auth.monday.com/oauth2/authorize', ''], calendly: ['https://auth.calendly.com/oauth/authorize', ''], mailchimp: ['https://login.mailchimp.com/oauth2/authorize', ''],
  trello: ['https://trello.com/1/authorize', '', { key: 'greenlightprobe0000', name: 'Greenlight probe', expiration: '1day', return_url: REDIRECT }],
};
mkdirSync(ROOT + 'probes', { recursive: true });
const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const out = {};
for (const [id, [ep, scope, extra]] of Object.entries(EP)) {
  const u = new URL(ep);
  if (id !== 'trello') { u.searchParams.set('response_type', 'code'); u.searchParams.set('client_id', 'greenlight-probe-0000'); u.searchParams.set('redirect_uri', REDIRECT); u.searchParams.set('state', 'probe'); if (scope) u.searchParams.set('scope', scope); }
  for (const [k, v] of Object.entries(extra || {})) u.searchParams.set(k, v);
  const p = await b.newPage({ viewport: { width: 900, height: 640 }, locale: 'en-US' });
  const r = { id, endpoint: ep, url: u.toString(), checked: new Date().toISOString().slice(0, 10) };
  try {
    const resp = await p.goto(u.toString(), { waitUntil: 'domcontentloaded', timeout: 20000 });
    await p.waitForTimeout(2500);
    r.status = resp ? resp.status() : null; r.final = p.url();
    r.title = (await p.title()).slice(0, 120);
    const txt = (await p.evaluate(() => document.body ? document.body.innerText : '')).replace(/\s+/g, ' ').trim();
    const m = txt.match(/[^.!?]*(invalid|not found|doesn.t exist|does not exist|unknown|error|isn.t valid|not valid|mismatch|unauthori[sz]ed|no application|could not|can.t|cannot|problem|wrong)[^.!?]*[.!?]?/i);
    r.text = (m ? m[0] : txt).trim().slice(0, 220);
    r.landedOn = new URL(r.final).host;
    await p.screenshot({ path: `${ROOT}probes/${id}.jpg`, type: 'jpeg', quality: 55 });
    r.shot = `probes/${id}.jpg`;
  } catch (e) { r.error = e.message.slice(0, 160); }
  out[id] = r; console.log(id.padEnd(16), r.status, r.landedOn, '|', (r.text || r.error || '').slice(0, 110));
  await p.close();
}
await b.close();
/* outcome + takeaway are added after a person reviews each screenshot (see research/probes.json) */
writeFileSync(ROOT + 'research/probes.json', JSON.stringify(out, null, 1));
writeFileSync(ROOT + 'data/probes.js', '/* Real OAuth-flow attempts, generated by scripts/probe.mjs */\nwindow.PROBES = ' + JSON.stringify(out) + ';\n');
