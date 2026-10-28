# Research brief: OAuth app setup guides (shared by all batches)

The product is a library of guides. Each guide tells a developer building an AI agent on Composio what it takes to create their OWN OAuth app for a provider and get it approved for public use, instead of using Composio's managed app. Each guide covers:
- difficulty;
- your time;
- the approval wait;
- costs;
- limits before approval;
- requirements and gotchas;
- the steps.

## Hard rules (accuracy matters more than coverage)
- Every factual claim must come from a page you actually fetched in this session: the provider's official developer docs, or Composio's docs. Put its URL in `src`.
- If you cannot confirm something, either leave it out or put it in `unverified` with a short note. NEVER invent numbers.
- Time and duration estimates you derive yourself (for example "~30 min") must have `"ev": "est"`. Facts stated in docs get `"ev": "docs"`.
- Composio managed-auth availability: check the toolkit page at `https://docs.composio.dev/toolkits/<slug>`, or its `.md` variant (append `.md`). It may say whether Composio-managed auth exists or whether you need your own credentials. Record exactly what it says. If it's unclear, set `managed` to `"unknown"`.
- Confirm the Composio toolkit slug. The logo URL is `https://logos.composio.dev/api/<slug>`; check that it returns 200 with `curl -sI`.
- Keep text short and plain: one sentence per item, no marketing language.

## Output
Write ONE JSON file (an array of app objects) to the path given in your task. Every object must match this schema exactly:

```json
{
  "id": "slack",                       // lowercase, no spaces
  "name": "Slack",
  "slug": "slack",                     // Composio toolkit slug (logo + docs)
  "category": "Communication",         // one of: Communication, Developer tools, CRM & support, Productivity, Files & docs, Commerce & finance, Social & marketing, Google Workspace, Microsoft 365
  "auth": "OAuth 2.0",                 // what Composio uses for this toolkit
  "managed": "yes" | "no" | "unknown", // does Composio offer managed auth (use Composio's app)?
  "managedSrc": "https://docs.composio.dev/toolkits/slack",
  "difficulty": "easy" | "medium" | "hard" | "gated",
     // easy   = own app works for everyone in minutes, no provider review
     // medium = works without review but with real limits until listed/approved, OR a light review
     // hard   = mandatory review/audit before public use, weeks
     // gated  = you must apply to a partner program / get approved for API access at all
  "oneLiner": "Unlisted apps get 1 history call a minute.",   // the single most important thing, <= 60 chars, factual
  "setup": { "time": "~20 min", "ev": "est" },
  "review": { "required": true, "what": "Slack Marketplace review", "wait": "~X weeks or 'not stated'", "ev": "docs|est", "src": "url" },
  "cost": { "text": "$0" , "ev": "docs|est", "src": "url or null" },
  "limits": [ { "text": "Before approval: ...", "ev": "docs", "src": "url" } ],   // caps or restrictions that apply before review/listing; can be empty
  "requirements": [ { "text": "...", "ev": "docs", "src": "url" } ],              // what the provider requires (privacy policy, HTTPS redirect, admin consent, business verification...)
  "gotchas": [ { "text": "...", "ev": "docs|est", "src": "url" } ],               // nuances that bite people (token expiry, refresh token rules, scopes needing approval, workspace admin install...)
  "steps": [ { "who": "you|agent", "t": "Create an app at api.slack.com/apps", "time": "5 min" } ],  // 4-7 steps. 'agent' only for things an AI agent could do without the provider console: drafting a privacy policy, writing justifications, creating the Composio auth config, checking docs
  "portal": "https://api.slack.com/apps",          // where you create the OAuth app
  "docs": "https://api.slack.com/authentication/oauth-v2",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback", // or a provider-specific note
  "sources": [ { "t": "Slack OAuth v2", "u": "https://..." } ],   // every URL you used
  "unverified": [ "Exact Marketplace review duration not published" ],
  "checked": "2026-10-28"
}
```

Before you finish, re-read every item and delete anything you did not confirm from a fetched page. Reply with a 3-line summary: the apps done, anything you could not confirm, and the file path.
