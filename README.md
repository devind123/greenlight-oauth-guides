<img src="logo.svg" width="56" alt="Greenlight logo: a traffic light with the bottom light lit">

# Greenlight: OAuth app guides for agent builders

**Live:** https://greenlight-oauth-guides.vercel.app

This is a take-home project for Composio's APM Integrations role. It is a concept, not an official Composio product.

A developer building an AI agent wants their users to connect Gmail, Slack or HubSpot. Before launch they may need their **own** OAuth app, approved by the provider. Greenlight answers the questions that decide their roadmap:
- Is this an hour of work or weeks of waiting?
- What blocks approval?
- What can an agent do for me, and where do I take over?

## What's in it

| Page | What it shows |
|---|---|
| **Library** | 37 researched guides with filters for difficulty, category and Composio-managed. Each guide covers effort, approval wait, limits before approval, requirements, gotchas, steps and sources. An agent bar answers questions across apps, such as "which apps need a review?" or "compare HubSpot and Salesforce". |
| **Choices on every guide** | Use Composio's managed app or your own (with what you give up, from Composio's docs). Only your team or any customer (36 apps, researched). For 19 apps where permissions change the review or who must approve (Google Calendar, Drive, Sheets, YouTube, Outlook, Teams, LinkedIn, Shopify, Slack, Discord, HubSpot, Zoom, QuickBooks, Xero, Dropbox, GitHub, Jira, X, Figma), pick what your agent does and see the tier. Where Composio also accepts an API key (10 apps), that's a third route with no OAuth app at all. Stats and the launch path update with every choice. |
| **Same structure on every guide** | Header (Set up with agent, Share, Developer portal, Launch plan), choices, Before approval, Requirements, Watch out for, and interactive steps: status, Mark done, Open developer portal, Run (agent, simulated), Ask agent per step, plus an agent-progress panel. Gmail adds Google-specific extras: the permission picker with tool-level scopes, walkthroughs, the CASA panel and rejection reasons. |
| **Gmail guide** | The deep example. You pick what your agent does, and it works out the minimum scopes, the Google review tier, wait, cost and audit, and a cheaper alternative. Steps have statuses, checks, "Ask agent" and "Fix with agent". |
| **Generate a guide** | **Live.** Type any app name or website. An agent researches the provider's official docs and writes a guide in the same format, with every quote checked against its page. The result can be shared as a link. |
| **Verification log** | How the guides were checked: a random 45-claim sample re-checked against sources, what was corrected, and what we couldn't confirm. |
| **Launch planner** | Pick several apps to see what's live today on Composio's managed apps, what blocks launch, and how long until you're on your own apps. It's built from the guides' stated waits. |

**To try:**
1. Generate a guide for an app that isn't in the library: *Typeform*, *Webflow* or *zoho.com/books*.
2. In the Gmail guide, pick "Read and draft replies", then press "Send only".
3. In the library, ask the agent "Which apps have install caps?"

## Setup

You need Node 18+. No other dependencies.

```bash
cp .env.example .env.local      # then put your key in it
npm run dev                     # http://localhost:4321
```

- **Gemini key.** `GEMINI_API_KEY` is a Google AI Studio key from https://aistudio.google.com/apikey. The free tier is enough; no billing is needed. Without a key, everything works except live generation, which says it isn't configured.
- **Deploy.** Import to Vercel (no build step) and set `GEMINI_API_KEY` in the project's environment variables. Static files are served as they are, and `api/generate.js` is the only function.
- **Rebuild the library data from the raw research.** Run `python3 scripts/build_data.py`. It writes `data/apps.js` and `data/verify.js`, drops any docs-tagged claim without a source URL, applies the fact-check corrections, and downloads the logos.

## Key decisions

1. **Difficulty depends on what you ask for, not on the app.** The same Gmail integration can take 3–10 days or about 6 weeks plus a yearly security audit, depending on the scopes. So the guide starts by asking *what your agent does* and works out the minimum scopes. It doesn't print one difficulty per app.
2. **Launch on Composio's managed app first, switch later.** The most useful advice for most developers is that they don't have to wait for Google to ship. Every guide shows that path, and says clearly when Composio has no managed app (Pipedrive, X, Shopify, Xero).
3. **Evidence is visible on every claim.** Tags are `docs` (official source, linked), `est.` (our estimate or third party) and `demo` (simulated). What we couldn't confirm goes in a "Not confirmed" box instead of being dropped or guessed. Sometimes the answer is "Not stated", and that is shown.
4. **Agents did the research; separate agents checked it.** Six agents researched the providers in parallel against official docs. Another agent re-opened the sources for a random sample and judged each claim strictly. Corrections are shown in the Verification log.
5. **Live generation is a pipeline with a check at the end, not one prompt.** The steps:
   - look the app up in Composio's toolkit docs;
   - search the web for the provider's docs;
   - have the model pick the official pages;
   - fetch them and follow relevant links;
   - have the model write the guide from the page text, quoting every claim;
   - **check in code that every quote is really on its page.**

   That last step is what makes a free, small model safe to use. A claim whose quote isn't on the page can't reach the guide as fact.
6. **Agent vs. you, step by step.** Each step says who does it. Agent steps are drafting the privacy policy, writing scope justifications and creating the Composio auth config. Steps that need your accounts (Google Cloud Console, recording a demo video, submitting) are yours, with links and walkthroughs.
7. **No database.** The library is static data. A generated guide is compressed into its share link, so anyone can open it with no account or storage.

## What I learned

1. **The app isn't the unit of difficulty; the developer's choices are.** The same Gmail integration can take 3–10 days or about 6 weeks plus a yearly security audit, depending on the scopes. Many providers need no review at all if only your own team connects (Google Internal apps, Figma, Linear, single-tenant Microsoft apps). So every guide asks three questions first: Composio's app or your own, who connects, and, where it matters, what your agent does.
2. **Most developers shouldn't start with their own OAuth app.** 33 of the 37 apps have a Composio managed app that works today. The real decision is *when* to switch. Composio's own docs give the reasons: users should see your name, you need custom scopes, or you hit the shared quota.
3. **Providers rarely publish how long review takes, and their own pages disagree.**
   - Google's guide says 3–5 business days for sensitive scopes; its FAQ says 10.
   - Asana's distribution and submission pages contradict each other.
   - Composio's toolkit page and its older auth page disagree about Jira.
   - Shopify, Xero, Intuit, Zoom and Figma state no review time.

   So "Not stated" is a real, useful answer, and guessing would have been the worst thing to do.
4. **Docs go stale fast.**
   - Xero's limits changed in March 2026.
   - Salesforce restricted new Connected Apps in Spring '26.
   - Composio dropped its managed X app in February 2026.

   That's why every guide carries a checked date and links to its sources, and why live generation re-reads the docs instead of relying on what a model remembers.
5. **Some "OAuth" toolkits don't need OAuth at all.** Composio connects Freshdesk and Close with API keys, so those users need no OAuth app and no review. The generator now says so.
6. **How a provider fails matters for debugging.** Starting each provider's real OAuth flow showed that:
   - 14 providers reject a bad client ID immediately;
   - 17 make users sign in first, so a wrong client ID or redirect URI only shows up after login;
   - 4 block automated browsers.
7. **A free, small model is good enough when code checks its work.** Making it quote each claim, and dropping quotes that aren't on the page, mattered more than model size. In 16 live test generations, most confirmed 80–100% of their quotes. The exceptions were one Pipedrive run at 4 of 7, and one Strava run that found almost nothing; a result like that is now flagged as a "thin guide".

## Verification

**Full audit:** eight separate agents re-opened the source for **all 527** sourced claims.
- **499** were confirmed word for word.
- **27** were partly right and **1** wasn't on its page; all 28 were rewritten to what the page supports.
- **0** were contradicted or unreachable.

Composio's managed and auth facts were re-checked against the live toolkit pages for all 37 apps; all matched.

An earlier random **45**-claim re-check, with at least one claim per app, came first:

From the re-check of **45** randomly sampled claims, with at least one per app:
- **38** were confirmed word for word;
- **7** were partly right and have been corrected;
- **0** were wrong or unreachable.

Other things we found and fixed include:
- Xero's limits changed in March 2026.
- Google states two different times for sensitive-scope review: 3–5 business days in its guide, about 10 in its FAQ. Both are shown.
- Composio's managed X app was removed in February 2026.
- Two unsourced CASA figures were removed.

Details are in the in-app Verification log, `research/audit/`, `research/composio_audit.json`, `research/verify.json` and `research/sample.json`.

## Setup attempts (tested)

`scripts/probe.mjs` opened each provider's real OAuth authorize endpoint in a headless browser, using Composio's redirect URI and a placeholder client ID. It recorded the status, the visible error and a screenshot (`probes/`). This is shown on every guide as a `tested` box and summarised in the Verification log.

We didn't go further, for example creating real apps and completing consent. That needs provider accounts and credentials, which the brief asks us to keep out.

## Demo script (5 minutes)

1. **Library:** filter Hard, then ask the agent bar *"Which apps have install caps?"*
2. **Gmail guide:**
   - Pick "Read and draft replies": Restricted, about 6 weeks, plus an audit.
   - Switch to "Send emails": no audit.
   - Open a step, run "Test connection" (simulated), which fails with `redirect_uri_mismatch`, then press "Fix with agent".
3. **A library guide, e.g. Google Drive:**
   - Toggle "Composio's app": live today, with what you give up.
   - Toggle "Only my team".
   - Pick "Open files the user picks" (no review) vs. "Edit all files" (restricted).
4. **Generate:** type an app they name, or *Canva*, *Freshdesk* or *Strava*. Show the live steps, the quote count, and the share link opening in a new tab.
5. **Verification log:** the 45-claim re-check, the corrections, and the setup-attempt results.

## Time spent

Well over the suggested 6–8 hours. Much of it went into research and fact-checking (about 15 research and fact-check agents) and repeated UI iteration. The core slice, a library plus live generation plus a verification sample, could be built within the budget. The rest is depth.

## Limitations

- **Setup actions are simulated.** Repo scanning, opening pull requests, the test connection and decoding Google's emails show the intended flow but don't run. They would need real provider accounts, a Composio project and credentials, which the brief asks us to keep out. Each is labelled `demo`.
- **Generated guides are not reviewed by a person.** Their banner says so and shows how many quotes were confirmed.
  - They take 30–60 s.
  - They use Gemini's free tier, which is sometimes overloaded. A fallback chain across four models covers most of that. If all four are busy, the page shows what it found and offers a retry.
  - Free Gemini 3 models can't use Google Search grounding. So we search with DuckDuckGo, which works locally but is blocked from Vercel's servers. In production the agent falls back to official doc URLs it knows, and each one is fetched and checked.
- **Library coverage.** Every sourced claim was re-checked once against its page (Oct 29). Docs change, so the checked date matters. Permission tiers marked "inferred" (Google Calendar and YouTube) aren't published by Google. A few official sites couldn't be read during research: Notion's and Box's developer sites, and some Reddit and Discord help pages. Those guides lean on Composio's docs and official doc repos, and say so.
- **Some permission tiers are inferred.** Google labels Drive and Sheets scope tiers, but not Calendar or YouTube. Those show "inferred" (not on Google's restricted list). Microsoft admin consent comes from the Graph permissions reference table.
- **Gmail tool-to-scope mapping is inferred** from Google's API docs, because Composio doesn't publish a per-tool scope map. It's tagged `inferred`.
- **The side-panel agent understands any of the 37 apps by name, typos included** ("gmai" → Gmail). It answers with a guide card you can click, handles lists and comparisons ("which apps need a review", "slack vs discord"), navigation, and "generate a guide for X".
- **Its answers are mostly built-in.**
  - Short questions and buttons get instant answers from the guide data and your current state.
  - Longer questions go to Gemini (`api/ask.js`). It may only use the guide data the page sends, and may only cite URLs that appear in it. It says when the guide doesn't cover something.
  - The repo-scan, pull-request and test-connection actions are still simulated.
- **The rate limit is basic.** It allows 6 generations per 10 minutes per visitor and is held in memory per server instance.
- **Logos** come from Composio's public toolkit logo service and are used only to identify apps.

## Project layout

```
index.html, styles.css      UI (Composio-style dashboard, light/dark)
app.js                      Gmail guide, permissions, steps, agent
library.js                  library, generic guide page, live generation UI, verification log, planner
data/apps.js, data/verify.js  generated guide data and fact-check results
api/generate.js             Vercel function: streams progress, then the guide
api/ask.js                  Vercel function: grounded answers for the side-panel agent
scripts/probe.mjs           real OAuth-flow attempts -> research/probes.json, data/probes.js, probes/*.jpg
lib/generate.js             the research pipeline and quote verification
dev-server.mjs              local server (static + /api/generate)
research/                   agent brief, raw research per batch, sample + verification results
scripts/build_data.py       raw research -> data/apps.js, data/verify.js
scripts/build_choices.py    research/choices -> data/choices.js (audience + permission catalogues)
scripts/audit_composio.mjs  re-check managed/auth facts against docs.composio.dev -> data/composio.js
```
