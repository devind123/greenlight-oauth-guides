/* Generated from researched JSON. Every docs-tagged claim carries its source URL. */
window.APPS_DATA = [
 {
  "id": "gmail",
  "name": "Gmail",
  "slug": "gmail",
  "category": "Google Workspace",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app",
  "difficulty": "hard",
  "oneLiner": "Reading mail needs a yearly security audit.",
  "setup": {
   "time": "~1 hr",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Google verification",
   "wait": "2–3 days (brand) to ~6 weeks (restricted)",
   "ev": "docs",
   "src": "https://support.google.com/cloud/answer/13463817"
  },
  "cost": {
   "text": "$0, or ~$540+/yr if restricted",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "In Testing, up to 100 test users, and access expires after 7 days.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   }
  ],
  "requirements": [
   {
    "text": "Restricted scopes (reading mail, drafts, modify) need a CASA security assessment, renewed at least every 12 months.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification"
   },
   {
    "text": "Sensitive scopes such as gmail.send need Google verification, typically 3-5 business days.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   }
  ],
  "gotchas": [
   {
    "text": "Only permanent delete needs https://mail.google.com/; every other action works with a narrower scope.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/gmail/api/auth/scopes"
   },
   {
    "text": "Unverified production apps have a user cap for the project's lifetime that cannot be reset.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Google's verification FAQ estimates 10 business days for sensitive scopes and 6 weeks for restricted scopes.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   }
  ],
  "steps": [],
  "sources": [
   {
    "t": "Google: restricted scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification"
   },
   {
    "t": "Google: unverified apps",
    "u": "https://support.google.com/cloud/answer/15549945"
   }
  ],
  "unverified": [],
  "checked": "2026-10-29",
  "portal": "https://console.cloud.google.com/auth/overview",
  "bespoke": true,
  "waitShort": "2 days–6 wks"
 },
 {
  "category": "Google Workspace",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "difficulty": "medium",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "portal": "https://console.developers.google.com/auth/clients",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as an authorized redirect URI on the Web OAuth client and set the same value in the Composio auth config.",
  "checked": "2026-10-29",
  "id": "googlecalendar",
  "name": "Google Calendar",
  "slug": "googlecalendar",
  "managedSrc": "https://docs.composio.dev/toolkits/googlecalendar",
  "oneLiner": "Calendar event scopes are sensitive; verify past 100 users",
  "review": {
   "required": true,
   "what": "Google OAuth sensitive scope verification (branding must be published first)",
   "wait": "typically 3-5 business days",
   "ev": "docs",
   "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
  },
  "cost": {
   "text": "No Google fee stated for verification",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before approval: Testing mode is limited to 100 test users listed on the consent screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: test-user authorizations and refresh tokens expire 7 days after consent.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: an In-production app requesting unapproved sensitive or restricted scopes shows the unverified app screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: unverified apps that request sensitive or restricted scopes are capped at 100 new users for the lifetime of the project, and the cap cannot be reset.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817",
    "fixed": true
   }
  ],
  "requirements": [
   {
    "text": "Verify ownership of your authorized domains in Google Search Console.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Host a public home page and a privacy policy on the same domain, both linked from the consent screen.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "The privacy policy must disclose how the app accesses, uses, stores, or shares Google user data.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Give a written justification for each sensitive scope, including why a narrower scope is not enough.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Submit an unlisted YouTube video showing the consent flow, the client ID in the address bar, and each scope in use.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "You must publish your branding before you can request verification for data access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Internal-only apps (Workspace-owned project, Internal audience) skip verification and the 100-user cap but only work in that org.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   }
  ],
  "gotchas": [
   {
    "text": "Google lists reading Google Calendar events as an example of a sensitive scope.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "No Calendar API scope is on Google's restricted scope list.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464325",
    "fixed": true
   },
   {
    "text": "Narrower scopes such as calendar.events.owned and calendar.freebusy exist if you don't need full calendar access.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/calendar/api/auth"
   },
   {
    "text": "Google requires you to request the narrowest scope that provides the feature.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Google's FAQ estimates sensitive scope verification at 10 business days, which is longer than the 3-5 days on the developer page.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "text": "Limits apply to refresh tokens: 100 per Google Account per client ID, and creating a new one silently invalidates the oldest.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Refresh tokens stop working after 6 months unused or if the user revokes access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Your OAuth redirect URI must exactly match oauth_redirect_uri in the Composio auth config; some defaults still use /api/v1/auth-apps/add.",
    "ev": "docs",
    "src": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "text": "Use separate Google Cloud projects for testing and production, and submit only the production project for verification.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "text": "Workspace admins can restrict sensitive scopes to OAuth clients they explicitly mark as trusted.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Google Cloud project and enable the Google Calendar API",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set up Google Auth Platform branding and an External audience, and add test users",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Create a Web application OAuth client with redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and matching redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy text and a justification for each sensitive scope",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Verify your domain, record the demo video, publish branding and submit for verification",
    "time": "1-2 h"
   }
  ],
  "docs": "https://developers.google.com/workspace/calendar/api/auth",
  "sources": [
   {
    "t": "Google Calendar API: Choose scopes",
    "u": "https://developers.google.com/workspace/calendar/api/auth"
   },
   {
    "t": "Composio: Google Calendar toolkit",
    "u": "https://docs.composio.dev/toolkits/googlecalendar"
   },
   {
    "t": "Google: Sensitive scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "t": "Google Cloud Help: Verification FAQ",
    "u": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "t": "Google Cloud Help: Manage app audience",
    "u": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "t": "Google Cloud Help: When is verification not needed",
    "u": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "t": "Google Cloud Help: OAuth App Verification",
    "u": "https://support.google.com/cloud/answer/13463073"
   },
   {
    "t": "Google Cloud Help: Restricted scopes",
    "u": "https://support.google.com/cloud/answer/13464325"
   },
   {
    "t": "Google: Using OAuth 2.0 to access Google APIs",
    "u": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth2 credentials for Google Apps",
    "u": "https://composio.dev/auth/googleapps"
   }
  ],
  "unverified": [
   "Google's docs do not state any fee for brand or sensitive scope verification.",
   "The Calendar scopes page does not label each scope's tier; only Google's example confirms that reading events is sensitive."
  ],
  "waitShort": "3–5 days"
 },
 {
  "category": "Google Workspace",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "difficulty": "hard",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "portal": "https://console.developers.google.com/auth/clients",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as an authorized redirect URI on the Web OAuth client and set the same value in the Composio auth config.",
  "checked": "2026-10-29",
  "id": "googledrive",
  "name": "Google Drive",
  "slug": "googledrive",
  "managedSrc": "https://docs.composio.dev/toolkits/googledrive",
  "oneLiner": "Full drive scope is restricted: CASA audit every year",
  "review": {
   "required": true,
   "what": "Google restricted scope verification, plus a CASA security assessment if the app stores or transmits restricted-scope data on servers",
   "wait": "can take several weeks",
   "ev": "docs",
   "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification"
  },
  "cost": {
   "text": "Google charges no fee; the CASA assessor's fee is agreed directly with them",
   "ev": "docs",
   "src": "https://support.google.com/cloud/answer/13463817"
  },
  "limits": [
   {
    "text": "Before approval: Testing mode is limited to 100 test users listed on the consent screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: test-user authorizations and refresh tokens expire 7 days after consent.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: an In-production app requesting unapproved sensitive or restricted scopes shows the unverified app screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: unverified apps are capped at 100 new users for the lifetime of the project, and the cap cannot be reset.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   }
  ],
  "requirements": [
   {
    "text": "Verify ownership of your authorized domains in Google Search Console.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Host a public home page and a privacy policy on the same domain, both linked from the consent screen.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "The privacy policy must disclose how the app accesses, uses, stores, or shares Google user data.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Give a written justification for each sensitive scope, including why a narrower scope is not enough.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Submit an unlisted YouTube video showing the consent flow, the client ID in the address bar, and each scope in use.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "You must publish your branding before you can request verification for data access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Restricted Drive scopes are allowed only for backup and sync, productivity and education, or reporting and security apps.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth"
   },
   {
    "text": "Apps that store or transmit restricted scope data on servers must pass a security assessment.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth"
   },
   {
    "text": "The assessment uses the App Defense Alliance CASA framework and must be renewed every 12 months.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13465431"
   },
   {
    "text": "Internal-only apps (Workspace-owned project, Internal audience) skip verification and the 100-user cap but only work in that org.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   }
  ],
  "gotchas": [
   {
    "text": "drive, drive.readonly, drive.metadata, drive.metadata.readonly, drive.activity and drive.scripts are restricted.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth"
   },
   {
    "text": "drive.file, drive.appdata and drive.install are non-sensitive; drive.apps.readonly is sensitive.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth"
   },
   {
    "text": "drive.file only covers files your app creates or the user opens or picks with your app, not the whole Drive.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth",
    "fixed": true
   },
   {
    "text": "Google's Trust and Safety team tells you when to start the CASA assessment; it is the last step of the review.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13465431"
   },
   {
    "text": "Adding a new restricted scope later may require a new assessment covering it.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification"
   },
   {
    "text": "Google's FAQ estimates sensitive scope verification at 10 business days, which is longer than the 3-5 days on the developer page.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "text": "Limits apply to refresh tokens: 100 per Google Account per client ID, and creating a new one silently invalidates the oldest.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Refresh tokens stop working after 6 months unused or if the user revokes access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Your OAuth redirect URI must exactly match oauth_redirect_uri in the Composio auth config; some defaults still use /api/v1/auth-apps/add.",
    "ev": "docs",
    "src": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "text": "Use separate Google Cloud projects for testing and production, and submit only the production project for verification.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "text": "Workspace admins can restrict sensitive scopes to OAuth clients they explicitly mark as trusted.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Google Cloud project and enable the Google Drive API",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set up Google Auth Platform branding and an External audience, and add test users",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Create a Web application OAuth client with redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and matching redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy text and a justification for each sensitive scope",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Verify your domain, record the demo video, publish branding and submit for verification",
    "time": "1-2 h"
   },
   {
    "who": "you",
    "t": "Complete the CASA security assessment with an authorized assessor when Google asks",
    "time": "weeks"
   }
  ],
  "docs": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth",
  "sources": [
   {
    "t": "Google Drive API: Choose scopes",
    "u": "https://developers.google.com/workspace/drive/api/guides/api-specific-auth"
   },
   {
    "t": "Google: Restricted scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification"
   },
   {
    "t": "Google Cloud Help: Security assessment",
    "u": "https://support.google.com/cloud/answer/13465431"
   },
   {
    "t": "Composio: Google Drive toolkit",
    "u": "https://docs.composio.dev/toolkits/googledrive"
   },
   {
    "t": "Google: Sensitive scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "t": "Google Cloud Help: Verification FAQ",
    "u": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "t": "Google Cloud Help: Manage app audience",
    "u": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "t": "Google Cloud Help: When is verification not needed",
    "u": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "t": "Google Cloud Help: OAuth App Verification",
    "u": "https://support.google.com/cloud/answer/13463073"
   },
   {
    "t": "Google Cloud Help: Restricted scopes",
    "u": "https://support.google.com/cloud/answer/13464325"
   },
   {
    "t": "Google: Using OAuth 2.0 to access Google APIs",
    "u": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth2 credentials for Google Apps",
    "u": "https://composio.dev/auth/googleapps"
   }
  ],
  "unverified": [
   "Google does not publish CASA assessor prices.",
   "Which Drive scopes Composio's default Drive auth config requests is not listed on the toolkit page."
  ],
  "waitShort": "Several weeks"
 },
 {
  "category": "Google Workspace",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "difficulty": "medium",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "portal": "https://console.developers.google.com/auth/clients",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as an authorized redirect URI on the Web OAuth client and set the same value in the Composio auth config.",
  "checked": "2026-10-29",
  "id": "googlesheets",
  "name": "Google Sheets",
  "slug": "googlesheets",
  "managedSrc": "https://docs.composio.dev/toolkits/googlesheets",
  "oneLiner": "spreadsheets scope is sensitive; drive.file is not",
  "review": {
   "required": true,
   "what": "Google OAuth sensitive scope verification for spreadsheets or spreadsheets.readonly",
   "wait": "3-5 business days (Google's FAQ estimates 10)",
   "ev": "docs",
   "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
  },
  "cost": {
   "text": "No Google fee stated for verification",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before approval: Testing mode is limited to 100 test users listed on the consent screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: test-user authorizations and refresh tokens expire 7 days after consent.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: an In-production app requesting unapproved sensitive or restricted scopes shows the unverified app screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: unverified apps are capped at 100 new users for the lifetime of the project, and the cap cannot be reset.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   }
  ],
  "requirements": [
   {
    "text": "Verify ownership of your authorized domains in Google Search Console.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Host a public home page and a privacy policy on the same domain, both linked from the consent screen.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "The privacy policy must disclose how the app accesses, uses, stores, or shares Google user data.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Give a written justification for each sensitive scope, including why a narrower scope is not enough.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Submit an unlisted YouTube video showing the consent flow, the client ID in the address bar, and each scope in use.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "You must publish your branding before you can request verification for data access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Internal-only apps (Workspace-owned project, Internal audience) skip verification and the 100-user cap but only work in that org.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   }
  ],
  "gotchas": [
   {
    "text": "spreadsheets and spreadsheets.readonly are sensitive; drive.file is the recommended non-sensitive scope.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/sheets/api/scopes"
   },
   {
    "text": "drive and drive.readonly also work with Sheets but are restricted, which adds a security assessment if you store or transmit the data on servers.",
    "ev": "docs",
    "src": "https://developers.google.com/workspace/sheets/api/scopes"
   },
   {
    "text": "Composio says its default OAuth app shares Sheets quota across users; your own app gets a dedicated quota.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/googlesheets"
   },
   {
    "text": "Google's FAQ estimates sensitive scope verification at 10 business days, which is longer than the 3-5 days on the developer page.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "text": "Limits apply to refresh tokens: 100 per Google Account per client ID, and creating a new one silently invalidates the oldest.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Refresh tokens stop working after 6 months unused or if the user revokes access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Your OAuth redirect URI must exactly match oauth_redirect_uri in the Composio auth config; some defaults still use /api/v1/auth-apps/add.",
    "ev": "docs",
    "src": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "text": "Use separate Google Cloud projects for testing and production, and submit only the production project for verification.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "text": "Workspace admins can restrict sensitive scopes to OAuth clients they explicitly mark as trusted.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Google Cloud project and enable the Google Sheets API",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set up Google Auth Platform branding and an External audience, and add test users",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Create a Web application OAuth client with redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and matching redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy text and a justification for each sensitive scope",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Verify your domain, record the demo video, publish branding and submit for verification",
    "time": "1-2 h"
   }
  ],
  "docs": "https://developers.google.com/workspace/sheets/api/scopes",
  "sources": [
   {
    "t": "Google Sheets API: Choose scopes",
    "u": "https://developers.google.com/workspace/sheets/api/scopes"
   },
   {
    "t": "Composio: Google Sheets toolkit",
    "u": "https://docs.composio.dev/toolkits/googlesheets"
   },
   {
    "t": "Google: Sensitive scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "t": "Google Cloud Help: Verification FAQ",
    "u": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "t": "Google Cloud Help: Manage app audience",
    "u": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "t": "Google Cloud Help: When is verification not needed",
    "u": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "t": "Google Cloud Help: OAuth App Verification",
    "u": "https://support.google.com/cloud/answer/13463073"
   },
   {
    "t": "Google Cloud Help: Restricted scopes",
    "u": "https://support.google.com/cloud/answer/13464325"
   },
   {
    "t": "Google: Using OAuth 2.0 to access Google APIs",
    "u": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth2 credentials for Google Apps",
    "u": "https://composio.dev/auth/googleapps"
   }
  ],
  "unverified": [
   "Google's docs do not state any fee for brand or sensitive scope verification."
  ],
  "waitShort": "3–5 days"
 },
 {
  "category": "Social & marketing",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "difficulty": "medium",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "portal": "https://console.developers.google.com/auth/clients",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as an authorized redirect URI on the Web OAuth client and set the same value in the Composio auth config.",
  "checked": "2026-10-29",
  "id": "youtube",
  "name": "YouTube",
  "slug": "youtube",
  "managedSrc": "https://docs.composio.dev/toolkits/youtube",
  "oneLiner": "Sensitive scopes plus a 10,000 units/day default quota",
  "review": {
   "required": true,
   "what": "Google OAuth sensitive scope verification; a YouTube compliance audit only to raise quota",
   "wait": "3-5 business days for OAuth (audit wait not stated)",
   "ev": "docs",
   "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
  },
  "cost": {
   "text": "No Google fee stated for verification or the quota audit",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before approval: Testing mode is limited to 100 test users listed on the consent screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: test-user authorizations and refresh tokens expire 7 days after consent.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: an In-production app requesting unapproved sensitive or restricted scopes shows the unverified app screen.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "text": "Before approval: unverified apps are capped at 100 new users for the lifetime of the project, and the cap cannot be reset.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "text": "Before a quota audit: default quota is 100 search.list calls, 100 videos.insert calls and 10,000 units a day for all other endpoints.",
    "ev": "docs",
    "src": "https://developers.google.com/youtube/data/guides/quota_and_compliance_audits"
   }
  ],
  "requirements": [
   {
    "text": "Verify ownership of your authorized domains in Google Search Console.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Host a public home page and a privacy policy on the same domain, both linked from the consent screen.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "The privacy policy must disclose how the app accesses, uses, stores, or shares Google user data.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Give a written justification for each sensitive scope, including why a narrower scope is not enough.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "Submit an unlisted YouTube video showing the consent flow, the client ID in the address bar, and each scope in use.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "You must publish your branding before you can request verification for data access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "More quota than the default requires passing a YouTube API Services compliance audit.",
    "ev": "docs",
    "src": "https://developers.google.com/youtube/data/guides/quota_and_compliance_audits"
   },
   {
    "text": "Internal-only apps (Workspace-owned project, Internal audience) skip verification and the 100-user cap but only work in that org.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   }
  ],
  "gotchas": [
   {
    "text": "Google lists deleting a YouTube video as an example of a sensitive scope.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "text": "No YouTube Data API scope appears on Google's restricted scope list.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464325"
   },
   {
    "text": "Composio says its managed YouTube app's quota can be shared across users and recommends creating your own Google Cloud OAuth app for production.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/youtube",
    "fixed": true
   },
   {
    "text": "YouTube runs periodic audits and requires a form if your company changes control.",
    "ev": "docs",
    "src": "https://developers.google.com/youtube/data/guides/quota_and_compliance_audits"
   },
   {
    "text": "Google's FAQ estimates sensitive scope verification at 10 business days, which is longer than the 3-5 days on the developer page.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "text": "Limits apply to refresh tokens: 100 per Google Account per client ID, and creating a new one silently invalidates the oldest.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Refresh tokens stop working after 6 months unused or if the user revokes access.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "text": "Your OAuth redirect URI must exactly match oauth_redirect_uri in the Composio auth config; some defaults still use /api/v1/auth-apps/add.",
    "ev": "docs",
    "src": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "text": "Use separate Google Cloud projects for testing and production, and submit only the production project for verification.",
    "ev": "docs",
    "src": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "text": "Workspace admins can restrict sensitive scopes to OAuth clients they explicitly mark as trusted.",
    "ev": "docs",
    "src": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Google Cloud project and enable the YouTube Data API v3",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set up Google Auth Platform branding and an External audience, and add test users",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Create a Web application OAuth client with redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and matching redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy text and a justification for each sensitive scope",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Verify your domain, record the demo video, publish branding and submit for verification",
    "time": "1-2 h"
   },
   {
    "who": "you",
    "t": "If you need more quota, submit the YouTube Audit and Quota Extension Form",
    "time": "30 min"
   }
  ],
  "docs": "https://developers.google.com/youtube/data/guides/auth/server-side-web-apps",
  "sources": [
   {
    "t": "YouTube Data API: OAuth for web server apps",
    "u": "https://developers.google.com/youtube/data/guides/auth/server-side-web-apps"
   },
   {
    "t": "YouTube Data API: Quota and compliance audits",
    "u": "https://developers.google.com/youtube/data/guides/quota_and_compliance_audits"
   },
   {
    "t": "Composio: YouTube toolkit",
    "u": "https://docs.composio.dev/toolkits/youtube"
   },
   {
    "t": "Google: Sensitive scope verification",
    "u": "https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification"
   },
   {
    "t": "Google Cloud Help: Verification FAQ",
    "u": "https://support.google.com/cloud/answer/13463817"
   },
   {
    "t": "Google Cloud Help: Manage app audience",
    "u": "https://support.google.com/cloud/answer/15549945"
   },
   {
    "t": "Google Cloud Help: When is verification not needed",
    "u": "https://support.google.com/cloud/answer/13464323"
   },
   {
    "t": "Google Cloud Help: OAuth App Verification",
    "u": "https://support.google.com/cloud/answer/13463073"
   },
   {
    "t": "Google Cloud Help: Restricted scopes",
    "u": "https://support.google.com/cloud/answer/13464325"
   },
   {
    "t": "Google: Using OAuth 2.0 to access Google APIs",
    "u": "https://developers.google.com/identity/protocols/oauth2"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth2 credentials for Google Apps",
    "u": "https://composio.dev/auth/googleapps"
   }
  ],
  "unverified": [
   "Google's docs do not state any fee for brand or sensitive scope verification.",
   "The YouTube scopes page does not label each scope's tier.",
   "No wait time is published for the YouTube quota audit."
  ],
  "waitShort": "3–5 days"
 },
 {
  "id": "outlook",
  "name": "Microsoft Outlook",
  "slug": "outlook",
  "category": "Microsoft 365",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/outlook",
  "difficulty": "medium",
  "oneLiner": "Unverified multitenant apps can be blocked from consent",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Publisher verification via Partner Center (optional, but affects whether users can consent)",
   "wait": "A few minutes once your Partner Center account is verified",
   "ev": "docs",
   "src": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified"
  },
  "cost": {
   "text": "$0: Microsoft doesn't charge for publisher verification and no license is needed",
   "ev": "docs",
   "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
  },
  "limits": [
   {
    "text": "Before verification: the consent prompt shows 'Unverified' instead of a publisher name.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience"
   },
   {
    "text": "Before verification: with risk-based step-up consent on, users in other tenants can't consent to most unverified multitenant apps registered after 8 Nov 2020 that ask for more than sign-in and profile.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview",
    "fixed": true
   }
  ],
  "requirements": [
   {
    "text": "Register the app in Microsoft Entra ID as at least an Application Developer.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "text": "For other organizations, set supported account types to multiple Entra ID tenants, with or without personal Microsoft accounts.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "text": "Publisher verification needs a verified Microsoft AI Cloud Partner Program (formerly MPN) partner global account ID.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The app must be registered with a work or school account, not a personal Microsoft account, to be publisher verified.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The publisher domain can't be *.onmicrosoft.com and must match the Partner Center email domain or a DNS-verified custom domain.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The person verifying needs Application Administrator or Cloud Application Administrator in Entra, and Microsoft AI Cloud Partner Program Admin or Accounts Admin in Partner Center, and must sign in with MFA.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified",
    "fixed": true
   }
  ],
  "gotchas": [
   {
    "text": "Delegated Mail.Read, Mail.ReadWrite, Mail.Send and Calendars.ReadWrite don't need admin consent, but their application versions do.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "text": "Delegated Mail.Read is available for consent in personal Microsoft accounts.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "text": "Composio says 'Needs admin approval' errors are a tenant consent setting; a verified publisher helps but doesn't remove admin consent everywhere.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/outlook"
   },
   {
    "text": "Composio says an admin approving inside the user's OAuth flow may connect the admin's mailbox instead of the user's.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/outlook"
   },
   {
    "text": "Application (app-only) permissions always need tenant admin consent.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Tenant admins can turn off user consent, which makes admin consent mandatory for every app in that tenant.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Microsoft recommends tenants allow user consent only for apps from verified publishers.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
   },
   {
    "text": "If the app needs admin consent and an admin consents without prompt=consent, the consent only covers the admin's own account.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant",
    "fixed": true
   },
   {
    "text": "Client secrets last 24 months at most, and Microsoft recommends under 12 months.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
   },
   {
    "text": "Refresh tokens last 90 days by default, or 24 hours for single-page app redirect URIs.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens"
   },
   {
    "text": "Multitenant apps send sign-in requests to /common (or /organizations), but later token requests for an already signed-in user should go to that user's tenant endpoint.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant",
    "fixed": true
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Register an app in the Entra admin center as multitenant",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add a Web redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "2 min"
   },
   {
    "who": "you",
    "t": "Create a client secret and add delegated Microsoft Graph permissions",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and redirect URI",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Link a verified Partner Center ID under Branding & properties to become a verified publisher",
    "time": "15 min"
   }
  ],
  "portal": "https://entra.microsoft.com",
  "docs": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as a Web redirect URI under Authentication and use the same value in the Composio auth config.",
  "sources": [
   {
    "t": "Composio: Outlook toolkit",
    "u": "https://docs.composio.dev/toolkits/outlook"
   },
   {
    "t": "Microsoft: Register an application",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "t": "Microsoft: Publisher verification",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "t": "Microsoft: Mark an app as publisher verified",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified"
   },
   {
    "t": "Microsoft: Convert app to multitenant",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "t": "Microsoft: Configure user consent",
    "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
   },
   {
    "t": "Microsoft: Application consent experience",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience"
   },
   {
    "t": "Microsoft Graph permissions reference",
    "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "t": "Microsoft: Refresh tokens",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens"
   },
   {
    "t": "Microsoft: Add app credentials",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth credentials for Outlook",
    "u": "https://composio.dev/auth/outlook"
   }
  ],
  "unverified": [
   "Partner Center account verification time is not stated on the pages checked.",
   "Which tenants have risk-based step-up consent turned on is not stated."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "microsoftteams",
  "name": "Microsoft Teams",
  "slug": "microsoft_teams",
  "category": "Microsoft 365",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/microsoft_teams",
  "difficulty": "medium",
  "oneLiner": "Reading channel messages needs tenant admin consent",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Publisher verification via Partner Center (optional, but affects whether users can consent)",
   "wait": "A few minutes once your Partner Center account is verified",
   "ev": "docs",
   "src": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified"
  },
  "cost": {
   "text": "$0: Microsoft doesn't charge for publisher verification and no license is needed",
   "ev": "docs",
   "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
  },
  "limits": [
   {
    "text": "Before verification: the consent prompt shows 'Unverified' instead of a publisher name.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience"
   },
   {
    "text": "Before verification: with risk-based step-up consent on, users in other tenants can't consent to multitenant apps registered after 8 Nov 2020 that ask for more than sign-in and profile.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   }
  ],
  "requirements": [
   {
    "text": "Register the app in Microsoft Entra ID as at least an Application Developer.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "text": "For other organizations, set supported account types to multiple Entra ID tenants, with or without personal Microsoft accounts.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "text": "Publisher verification needs a verified Microsoft AI Cloud Partner Program (formerly MPN) partner global account ID.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The app must be registered with a work or school account, not a personal Microsoft account, to be publisher verified.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The publisher domain can't be *.onmicrosoft.com and must match the Partner Center email domain or a DNS-verified custom domain.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "text": "The person verifying needs Application Administrator or Cloud Application Administrator in Entra, and Microsoft AI Cloud Partner Program Admin or Accounts Admin in Partner Center, and must sign in with MFA.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified",
    "fixed": true
   }
  ],
  "gotchas": [
   {
    "text": "Delegated ChannelMessage.Read.All and TeamMember.Read.All require admin consent.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "text": "Delegated Chat.Read, Chat.ReadWrite, ChatMessage.Send, ChannelMessage.Send and Team.ReadBasic.All don't need admin consent.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "text": "For apps that need admin consent, add an admin sign-up link that sends prompt=consent so one admin approves for the whole tenant.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Application (app-only) permissions always need tenant admin consent.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Tenant admins can turn off user consent, which makes admin consent mandatory for every app in that tenant.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Microsoft recommends tenants allow user consent only for apps from verified publishers.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
   },
   {
    "text": "If an admin consents without prompt=consent, the consent only covers the admin's own account.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "text": "Client secrets last 24 months at most, and Microsoft recommends under 12 months.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
   },
   {
    "text": "Refresh tokens last 90 days by default, or 24 hours for single-page app redirect URIs.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens"
   },
   {
    "text": "Multitenant apps send sign-in requests to /common (or /organizations if they don't support personal accounts), but later token calls for an already signed-in user should go to that user's tenant endpoint.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant",
    "fixed": true
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Register an app in the Entra admin center as multitenant",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add a Web redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
    "time": "2 min"
   },
   {
    "who": "you",
    "t": "Create a client secret and add delegated Microsoft Graph permissions",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with your client ID, secret and redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the admin-consent request and explain to tenant admins which permissions need it",
    "time": "15 min"
   },
   {
    "who": "you",
    "t": "Link a verified Partner Center ID under Branding & properties to become a verified publisher",
    "time": "15 min"
   }
  ],
  "portal": "https://entra.microsoft.com",
  "docs": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as a Web redirect URI under Authentication and use the same value in the Composio auth config.",
  "sources": [
   {
    "t": "Composio: Microsoft Teams toolkit",
    "u": "https://docs.composio.dev/toolkits/microsoft_teams"
   },
   {
    "t": "Microsoft: Register an application",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app"
   },
   {
    "t": "Microsoft: Publisher verification",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview"
   },
   {
    "t": "Microsoft: Mark an app as publisher verified",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/mark-app-as-publisher-verified"
   },
   {
    "t": "Microsoft: Convert app to multitenant",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/howto-convert-app-to-be-multi-tenant"
   },
   {
    "t": "Microsoft: Configure user consent",
    "u": "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent"
   },
   {
    "t": "Microsoft: Application consent experience",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience"
   },
   {
    "t": "Microsoft Graph permissions reference",
    "u": "https://learn.microsoft.com/en-us/graph/permissions-reference"
   },
   {
    "t": "Microsoft: Refresh tokens",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens"
   },
   {
    "t": "Microsoft: Add app credentials",
    "u": "https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials"
   },
   {
    "t": "Composio: Custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "Composio: OAuth credentials for Outlook",
    "u": "https://composio.dev/auth/outlook"
   }
  ],
  "unverified": [
   "Partner Center account verification time is not stated on the pages checked.",
   "Which tenants have risk-based step-up consent turned on is not stated.",
   "Whether Teams Graph APIs work for personal Microsoft accounts was not confirmed.",
   "Composio's Teams toolkit page has no setup FAQ, so the Outlook guide's Entra steps are assumed to apply."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "github",
  "name": "GitHub",
  "slug": "github",
  "category": "Developer tools",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/github",
  "difficulty": "easy",
  "oneLiner": "No review; new OAuth apps issue 8-hour expiring tokens",
  "setup": {
   "time": "~10 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "None for an OAuth app; GitHub Marketplace listing is optional",
   "wait": "none",
   "ev": "docs",
   "src": "https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "OAuth tokens use the user's rate limit of 5,000 requests per hour.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps"
   },
   {
    "text": "A private GitHub App can only be installed on the account that owns it.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private"
   }
  ],
  "requirements": [
   {
    "text": "Register the app with a name, homepage URL and authorization callback URL.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   },
   {
    "text": "Use only information you consider public in the app's fields, since users see them.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   },
   {
    "text": "A user or organization can own up to 100 OAuth apps.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   },
   {
    "text": "A GitHub App must be set to 'Any account' (public) before other accounts can install it.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app"
   }
  ],
  "gotchas": [
   {
    "text": "'Expire user access tokens' is on by default for new OAuth apps; uncheck it only if your code can't refresh.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   },
   {
    "text": "Expiring tokens last 8 hours and the refresh token 6 months; each refresh invalidates the old pair.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
   },
   {
    "text": "GitHub App installation tokens expire after 1 hour, and GitHub App user access tokens can expire and be renewed with a refresh token.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps",
    "fixed": true
   },
   {
    "text": "Non-expiring OAuth tokens are revoked automatically if unused for one year.",
    "ev": "docs",
    "src": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation"
   },
   {
    "text": "Only 10 tokens per user/app/scope are kept; creating an 11th revokes an older one.",
    "ev": "docs",
    "src": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation"
   },
   {
    "text": "New organizations enable OAuth app access restrictions by default, so an org owner must approve your OAuth app.",
    "ev": "docs",
    "src": "https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/about-oauth-app-access-restrictions"
   },
   {
    "text": "With a GitHub App, users must install it on their account or org separately; Composio doesn't supply the install link.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/github"
   },
   {
    "text": "OAuth apps act only as a user; GitHub Apps can also act as the app and get finer-grained permissions.",
    "ev": "docs",
    "src": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Decide between an OAuth app (simpler) and a GitHub App (fine-grained, needs install)",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Settings > Developer settings > OAuth apps > New OAuth App; fill name, homepage and callback URL",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Leave 'Expire user access tokens' on, register, then generate and copy a client secret",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a GitHub OAuth2 auth config in Composio with the client ID, secret and scopes",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Connect a test account and, for org repos, ask the org owner to approve the app",
    "time": "5 min"
   }
  ],
  "portal": "https://github.com/settings/developers",
  "docs": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback as the authorization callback URL (up to 10 are allowed); use the exact value your Composio auth config shows.",
  "sources": [
   {
    "t": "Creating an OAuth app",
    "u": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app"
   },
   {
    "t": "Authorizing OAuth apps",
    "u": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps"
   },
   {
    "t": "Differences between GitHub Apps and OAuth apps",
    "u": "https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps"
   },
   {
    "t": "Token expiration and revocation",
    "u": "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/token-expiration-and-revocation"
   },
   {
    "t": "About OAuth app access restrictions",
    "u": "https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data/about-oauth-app-access-restrictions"
   },
   {
    "t": "Refreshing user access tokens (GitHub Apps)",
    "u": "https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens"
   },
   {
    "t": "Registering a GitHub App",
    "u": "https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app"
   },
   {
    "t": "Making a GitHub App public or private",
    "u": "https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/making-a-github-app-public-or-private"
   },
   {
    "t": "Composio GitHub toolkit",
    "u": "https://docs.composio.dev/toolkits/github"
   },
   {
    "t": "Composio GitHub OAuth guide",
    "u": "https://composio.dev/auth/github"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "GitHub's comparison page still calls OAuth app tokens long-lived by default, while the creation page says expiry is on by default for new apps."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "linear",
  "name": "Linear",
  "slug": "linear",
  "category": "Developer tools",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/linear",
  "difficulty": "easy",
  "oneLiner": "No review to use; access tokens expire after 24 hours",
  "setup": {
   "time": "~10 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "None to use the app; listing in Linear's integration directory is an optional form submission",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://linear.app/docs/integration-directory"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "OAuth apps get 5,000 requests and 2,000,000 complexity points per hour per user or app user.",
    "ev": "docs",
    "src": "https://linear.app/developers/rate-limiting"
   }
  ],
  "requirements": [
   {
    "text": "Configure your redirect callback URLs on the app; the token exchange must use the same redirect_uri.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "Linear highly recommends creating a dedicated workspace to own the OAuth app.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "Directory listings are for useful integrations built by formal companies, not hobby or low-effort apps.",
    "ev": "docs",
    "src": "https://linear.app/docs/integration-directory"
   },
   {
    "text": "A directory listing needs a submission form, 320x320 color and white icons, and 1-3 showcase images at 1600x1000.",
    "ev": "docs",
    "src": "https://linear.app/docs/integration-directory"
   }
  ],
  "gotchas": [
   {
    "text": "Authorization-code access tokens are valid for 24 hours and come with a refresh token.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "All OAuth apps were moved to the refresh token system on April 1, 2026.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "Each refresh returns a new access and refresh token; a lost response can be replayed within 30 minutes.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "actor=app creates resources as the app instead of the authorizing user.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "Request the admin scope only when absolutely necessary.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "text": "Every admin of the workspace that owns the app can access the app's settings.",
    "ev": "docs",
    "src": "https://linear.app/developers/oauth-2-0-authentication"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create (or pick) a dedicated Linear workspace to own the app",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Create an OAuth2 application at linear.app/settings/api/applications/new",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio callback URL and copy the client ID and secret",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a Linear OAuth2 auth config in Composio with your credentials and trimmed scopes",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Connect a test workspace and confirm token refresh works after 24 hours",
    "time": "5 min"
   }
  ],
  "portal": "https://linear.app/settings/api/applications/new",
  "docs": "https://linear.app/developers/oauth-2-0-authentication",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback as a callback URL; use the exact value your Composio auth config shows.",
  "sources": [
   {
    "t": "Linear OAuth 2.0 authentication",
    "u": "https://linear.app/developers/oauth-2-0-authentication"
   },
   {
    "t": "Linear rate limiting",
    "u": "https://linear.app/developers/rate-limiting"
   },
   {
    "t": "Linear integration directory",
    "u": "https://linear.app/docs/integration-directory"
   },
   {
    "t": "Composio Linear toolkit",
    "u": "https://docs.composio.dev/toolkits/linear"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "Linear's own docs don't describe the 'Public' toggle that third-party guides say is needed for other workspaces to authorize the app.",
   "Integration directory review time is not published."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "jira",
  "name": "Jira",
  "slug": "jira",
  "category": "Developer tools",
  "auth": "OAuth 2.0 (3LO)",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/jira",
  "difficulty": "medium",
  "oneLiner": "Private until you share it; unreviewed apps show a warning",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Optional Atlassian approval via a third-party integration listing on the Marketplace; without it users see a warning",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before sharing: a new 3LO app is private, so only you can install and use it.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Before approval: users installing an unapproved integration are warned it hasn't been reviewed by Atlassian.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Sharing doesn't list the app on the Marketplace; you must send the authorization URL to every user.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   }
  ],
  "requirements": [
   {
    "text": "Create an 'OAuth 2.0 integration' in the developer console, configure OAuth 2.0 (3LO) and add Jira API scopes under Permissions.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Turn on 'Enable sharing' under Distribution before anyone else can authorize the app.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Apps that store personal data must report those account IDs to the Personal data reporting API.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/user-privacy-developer-guide/"
   },
   {
    "text": "Report each stored account once per cycle period (7 days by default, or per the Cycle-Period header), and not more often.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/user-privacy-developer-guide/",
    "fixed": true
   },
   {
    "text": "Erase or refresh a user's data when the reporting API says so; 3LO apps call POST https://api.atlassian.com/app/report-accounts/.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/user-privacy-developer-guide/"
   },
   {
    "text": "For Marketplace approval, give reviewers access to a test instance of your software.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/platform/marketplace/knowledge-base/listing-a-third-party-integration-on-the-atlassian-marketplace/"
   }
  ],
  "gotchas": [
   {
    "text": "Add offline_access to the scope to get a refresh token at all.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Refresh tokens rotate; store the new one every time, since the old one is disabled.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "A refresh token expires after 90 days of inactivity, and then the user must re-authorize.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Changing scopes forces users who already consented to consent again.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "API calls go to api.atlassian.com/ex/jira/{cloudid}; get the cloudid from accessible-resources.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Site-scoped grants make users pick one site per consent, so multi-site installs mean repeating the flow.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Admins can't revoke one user's grant from Connected Apps; they can only uninstall the app.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "text": "Jira 3LO apps can't declare searchable entity properties, so they can't be used in JQL.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In developer.atlassian.com > Developer console, create an OAuth 2.0 integration",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Authorization > OAuth 2.0 (3LO) > Configure; paste the Composio callback URL",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Permissions: add the Jira API (and User Identity API) and pick classic or granular scopes",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Decide whether you store Atlassian account IDs and draft the personal data reporting job if so",
    "time": "15 min"
   },
   {
    "who": "you",
    "t": "Distribution: enable sharing, then copy client ID and secret from Settings",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Jira OAuth2 auth config in Composio with offline_access in the scopes",
    "time": "3 min"
   }
  ],
  "portal": "https://developer.atlassian.com/console/myapps/",
  "docs": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/",
  "callbackNote": "Set the 3LO callback URL to https://backend.composio.dev/api/v3/toolkits/auth/callback; use the exact value your Composio auth config shows.",
  "sources": [
   {
    "t": "OAuth 2.0 (3LO) apps",
    "u": "https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/"
   },
   {
    "t": "User privacy guide for app developers",
    "u": "https://developer.atlassian.com/cloud/jira/platform/user-privacy-developer-guide/"
   },
   {
    "t": "Distribute and list apps",
    "u": "https://developer.atlassian.com/developer-guide/distribute-and-list-apps/"
   },
   {
    "t": "List a third-party integration on the Marketplace",
    "u": "https://developer.atlassian.com/platform/marketplace/knowledge-base/listing-a-third-party-integration-on-the-atlassian-marketplace/"
   },
   {
    "t": "Data privacy guidelines for developers",
    "u": "https://developer.atlassian.com/platform/marketplace/data-privacy-guidelines/"
   },
   {
    "t": "Composio Jira toolkit",
    "u": "https://docs.composio.dev/toolkits/jira"
   },
   {
    "t": "Composio Jira OAuth guide",
    "u": "https://composio.dev/auth/jira"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "The exact fields of the Distribution form (vendor name, privacy policy, personal data declaration) aren't listed in Atlassian's public docs; only third-party and community sources describe them.",
   "Marketplace approval time for 3LO integrations is not published.",
   "Access token lifetime isn't stated; the token response gives it in expires_in.",
   "Composio's toolkit page says managed OAuth is available, but composio.dev/auth/jira says Composio does not provide managed Jira credentials."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "confluence",
  "name": "Confluence",
  "slug": "confluence",
  "category": "Files & docs",
  "auth": "OAuth 2.0 (3LO)",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/confluence",
  "difficulty": "medium",
  "oneLiner": "Must enable sharing and report stored personal data",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Optional Atlassian approval via a third-party integration listing on the Marketplace; without it users see a warning",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before sharing: a new 3LO app is private, so only you can install and use it.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Before approval: users installing an unapproved integration are warned it hasn't been reviewed by Atlassian.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Sharing doesn't list the app on the Marketplace; you must send the authorization URL to every user.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   }
  ],
  "requirements": [
   {
    "text": "Create an 'OAuth 2.0 integration' in the developer console, configure OAuth 2.0 (3LO) and add Confluence API scopes under Permissions.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Turn on 'Enable sharing' under Distribution before anyone else can authorize the app.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Apps that store personal data must report those account IDs to the Personal data reporting API.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/user-privacy-developer-guide/"
   },
   {
    "text": "Report each stored account once per cycle period (7 days by default, or per the Cycle-Period header), and not more often.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/user-privacy-developer-guide/",
    "fixed": true
   },
   {
    "text": "Erase or refresh a user's data when the reporting API says so; 3LO apps call POST https://api.atlassian.com/app/report-accounts/.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/user-privacy-developer-guide/"
   },
   {
    "text": "For Marketplace approval, give reviewers access to a test instance of your software.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/platform/marketplace/knowledge-base/listing-a-third-party-integration-on-the-atlassian-marketplace/"
   }
  ],
  "gotchas": [
   {
    "text": "Add offline_access to the scope to get a refresh token at all.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Refresh tokens rotate; store the new one every time, since the old one is disabled.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "A refresh token expires after 90 days of inactivity, and then the user must re-authorize.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Changing scopes forces users who already consented to consent again.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "API calls go to api.atlassian.com/ex/confluence/{cloudid}; get the cloudid from accessible-resources.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Site-scoped grants make users pick one site per consent, so multi-site installs mean repeating the flow.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "text": "Admins can't revoke one user's grant from Connected Apps; they can only uninstall the app.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In developer.atlassian.com > Developer console, create an OAuth 2.0 integration",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Authorization > OAuth 2.0 (3LO) > Configure; paste the Composio callback URL",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Permissions: add the Confluence API (and User Identity API) and pick classic or granular scopes",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Decide whether you store Atlassian account IDs and draft the personal data reporting job if so",
    "time": "15 min"
   },
   {
    "who": "you",
    "t": "Distribution: enable sharing, then copy client ID and secret from Settings",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Confluence OAuth2 auth config in Composio with offline_access in the scopes",
    "time": "3 min"
   }
  ],
  "portal": "https://developer.atlassian.com/console/myapps/",
  "docs": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/",
  "callbackNote": "Set the 3LO callback URL to https://backend.composio.dev/api/v3/toolkits/auth/callback; use the exact value your Composio auth config shows.",
  "sources": [
   {
    "t": "OAuth 2.0 (3LO) apps",
    "u": "https://developer.atlassian.com/cloud/confluence/oauth-2-3lo-apps/"
   },
   {
    "t": "User privacy guide for app developers",
    "u": "https://developer.atlassian.com/cloud/confluence/user-privacy-developer-guide/"
   },
   {
    "t": "Distribute and list apps",
    "u": "https://developer.atlassian.com/developer-guide/distribute-and-list-apps/"
   },
   {
    "t": "List a third-party integration on the Marketplace",
    "u": "https://developer.atlassian.com/platform/marketplace/knowledge-base/listing-a-third-party-integration-on-the-atlassian-marketplace/"
   },
   {
    "t": "Data privacy guidelines for developers",
    "u": "https://developer.atlassian.com/platform/marketplace/data-privacy-guidelines/"
   },
   {
    "t": "Composio Confluence toolkit",
    "u": "https://docs.composio.dev/toolkits/confluence"
   },
   {
    "t": "Composio Confluence OAuth guide",
    "u": "https://composio.dev/auth/confluence"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "The exact fields of the Distribution form (vendor name, privacy policy, personal data declaration) aren't listed in Atlassian's public docs; only third-party and community sources describe them.",
   "Marketplace approval time for 3LO integrations is not published.",
   "Access token lifetime isn't stated; the token response gives it in expires_in."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "figma",
  "name": "Figma",
  "slug": "figma",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/figma",
  "difficulty": "hard",
  "oneLiner": "Public apps need Figma approval before outside users",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Figma review of a public OAuth app (testing instructions, reviewer access)",
   "wait": "not stated; Figma says it varies with volume",
   "ev": "docs",
   "src": "https://help.figma.com/hc/en-us/articles/34963247780247"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before publishing: a draft app can only be tested by you and your plan's admins.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "A private app only works for users in the team or org it belongs to, and it needs no Figma review.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/",
    "fixed": true
   }
  ],
  "requirements": [
   {
    "text": "The app must be associated with a team or organization; its users don't need to belong to it.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "Public apps need testing instructions and any trial access or login credentials the reviewer needs.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "Apps need an accurate name, description and an icon that matches your brand.",
    "ev": "docs",
    "src": "https://help.figma.com/hc/en-us/articles/34963247780247"
   },
   {
    "text": "Provide a support contact and keep it accurate.",
    "ev": "docs",
    "src": "https://help.figma.com/hc/en-us/articles/34963247780247"
   },
   {
    "text": "Apps must not bulk-export file content or index files through the projects endpoints.",
    "ev": "docs",
    "src": "https://help.figma.com/hc/en-us/articles/34963247780247"
   },
   {
    "text": "Users must authorize in a web browser; WebViews are not supported.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   }
  ],
  "gotchas": [
   {
    "text": "The client secret is shown only once when you create the app.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "Any change to a published public app needs another review.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "files:read and file_read are deprecated; apps must use granular scopes.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/republish-oauth-apps/"
   },
   {
    "text": "Existing apps marked 'Update required' must be republished to meet the November 17, 2025 rules.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/republish-oauth-apps/"
   },
   {
    "text": "Write scopes like teams:write and folders:write work only in private apps on Enterprise.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/scopes/"
   },
   {
    "text": "file_variables:read and :write are Enterprise-only scopes.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/scopes/"
   },
   {
    "text": "Authorization codes expire after 30 seconds.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "Access tokens last 90 days; refreshing invalidates the previous token because Figma keeps one per user per app.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "text": "OAuth rate limits are tracked per user, per plan, per app.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/rate-limits/"
   },
   {
    "text": "Users on View or Collab seats get up to 20 Tier 1 file requests a month, possibly fewer under load.",
    "ev": "docs",
    "src": "https://developers.figma.com/docs/rest-api/rate-limits/"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Go to figma.com/developers/apps and create an app under your team or org; save the client secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "OAuth credentials: add the Composio redirect URL; OAuth scopes: pick granular scopes",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Figma OAuth2 auth config in Composio with the same scopes",
    "time": "3 min"
   },
   {
    "who": "agent",
    "t": "Draft reviewer testing instructions, privacy policy and support contact",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Publish privately to test with your org, then submit as public for review",
    "time": "15 min"
   }
  ],
  "portal": "https://www.figma.com/developers/apps",
  "docs": "https://developers.figma.com/docs/rest-api/oauth-apps/",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback on the app's OAuth credentials page; use the exact value your Composio auth config shows.",
  "sources": [
   {
    "t": "Figma OAuth apps",
    "u": "https://developers.figma.com/docs/rest-api/oauth-apps/"
   },
   {
    "t": "Figma scopes",
    "u": "https://developers.figma.com/docs/rest-api/scopes/"
   },
   {
    "t": "Re-publish OAuth apps",
    "u": "https://developers.figma.com/docs/rest-api/republish-oauth-apps/"
   },
   {
    "t": "Figma rate limits",
    "u": "https://developers.figma.com/docs/rest-api/rate-limits/"
   },
   {
    "t": "Figma REST API authentication",
    "u": "https://developers.figma.com/docs/rest-api/authentication/"
   },
   {
    "t": "Figma Community Apps review guidelines",
    "u": "https://help.figma.com/hc/en-us/articles/34963247780247"
   },
   {
    "t": "Composio Figma toolkit",
    "u": "https://docs.composio.dev/toolkits/figma"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "Figma does not publish a review duration.",
   "The review guidelines page covers 'Figma Community Apps'; it's not explicit that every item applies to REST API OAuth apps."
  ],
  "checked": "2026-10-29",
  "waitShort": "Not stated"
 },
 {
  "id": "notion",
  "name": "Notion",
  "slug": "notion",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/notion",
  "difficulty": "easy",
  "oneLiner": "Reconnecting a user can kill their old refresh token",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "None found to use a public integration; a security review applies only to Marketplace listing (unconfirmed)",
   "wait": "not stated",
   "ev": "est",
   "src": null
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [],
  "requirements": [
   {
    "text": "Set the integration type to Public to use OAuth; internal integrations only use an API token.",
    "ev": "docs",
    "src": "https://composio.dev/auth/notion"
   },
   {
    "text": "Redirect URIs must use HTTPS, match exactly, and have no trailing slash, fragment or wildcard.",
    "ev": "docs",
    "src": "https://composio.dev/auth/notion"
   },
   {
    "text": "Users pick which pages to share during authorization, then press Allow access.",
    "ev": "docs",
    "src": "https://www.notion.com/help/add-and-manage-connections-with-the-api"
   }
  ],
  "gotchas": [
   {
    "text": "Notion has no OAuth scopes; access comes from the pages and databases users share.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "text": "Actions show the integration's name and logo, not the user's; your own app lets you set them.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "text": "Connecting the same user again issues a new token pair and can invalidate the older refresh token.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "text": "Keep one connection per real user per Notion app to avoid broken refresh tokens.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "text": "A user removing the connection in Settings > Connections revokes the tokens.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "text": "On Enterprise, workspace owners can restrict which connections members may install.",
    "ev": "docs",
    "src": "https://www.notion.com/help/add-and-manage-connections-with-the-api"
   },
   {
    "text": "With your own app, Notion webhooks need you to paste back a verification token Notion sends to Composio.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/notion"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Open notion.so/profile/integrations and create a new integration in your workspace",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Name it, pick the associated workspace and set the type to Public",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URI and pick capabilities (read, update, insert, user info)",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Copy the OAuth client ID and client secret",
    "time": "1 min"
   },
   {
    "who": "agent",
    "t": "Create the Notion OAuth2 auth config in Composio with your credentials",
    "time": "3 min"
   }
  ],
  "portal": "https://www.notion.so/profile/integrations",
  "docs": "https://developers.notion.com/docs/authorization",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback under OAuth domains & URIs; it must match exactly with no trailing slash.",
  "sources": [
   {
    "t": "Composio Notion toolkit",
    "u": "https://docs.composio.dev/toolkits/notion"
   },
   {
    "t": "Composio Notion OAuth guide",
    "u": "https://composio.dev/auth/notion"
   },
   {
    "t": "Notion: add and manage connections",
    "u": "https://www.notion.com/help/add-and-manage-connections-with-the-api"
   },
   {
    "t": "Composio white-labeling (callback URL)",
    "u": "https://docs.composio.dev/docs/authentication/white-labeling-authentication"
   }
  ],
  "unverified": [
   "developers.notion.com could not be reached from this environment, so Notion's own developer docs were not read.",
   "Search snippets say public connections need a Notion security review only to be listed on the Marketplace.",
   "Search snippets say installation scope (any workspace vs selected workspaces) is fixed at creation and only 'any workspace' can be listed.",
   "Which fields (privacy policy, terms of use, company details) are mandatory for a public integration was not confirmed.",
   "Notion's access token lifetime was not confirmed."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "hubspot",
  "name": "HubSpot",
  "slug": "hubspot",
  "category": "CRM & support",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/hubspot",
  "difficulty": "medium",
  "oneLiner": "Unlisted marketplace apps are capped at 25 installs.",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "HubSpot Marketplace listing review (needed only to lift the 25-install cap)",
   "wait": "Initial review within 10 business days; full process up to 60 days from first feedback",
   "ev": "docs",
   "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
  },
  "cost": {
   "text": "$0; no listing fee is stated in the listing requirements",
   "ev": "docs",
   "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
  },
  "limits": [
   {
    "text": "Before listing: a marketplace-distribution app is limited to 25 installs, excluding developer test accounts.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/manage-apps-in-hubspot"
   },
   {
    "text": "The 25-install cap applies to apps created or migrated on the Developer Platform from September 22, 2025.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/changelog/new-marketplace-distribution-app-install-limits"
   },
   {
    "text": "Private-distribution apps can only be installed in up to 10 allowlisted accounts.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/manage-apps-in-hubspot"
   },
   {
    "text": "Before review, installers see an unverified-app warning and must type \"I accept the risk\" to connect.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/manage-apps-in-hubspot"
   }
  ],
  "requirements": [
   {
    "text": "New apps are created with the HubSpot CLI (v7.6.0) via `hs project create`, with redirect URLs and scopes in app-hsmeta.json.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/create-an-app"
   },
   {
    "text": "Production redirect URLs must use HTTPS.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/api/oauth-quickstart-guide"
   },
   {
    "text": "Listing needs at least three active installs in unaffiliated production accounts with activity in the past 30 days.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   },
   {
    "text": "Listing needs live Terms of Service and Privacy Policy URLs, a support contact, and a public setup guide.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   },
   {
    "text": "Listed apps must use OAuth as the only auth method and request only the scopes they need.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   },
   {
    "text": "Listed AI connectors must require user-level permissions or be built with HubSpot's MCP Server.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens currently expire after 30 minutes, so the refresh flow must work.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/api/oauth-quickstart-guide"
   },
   {
    "text": "You can submit only one app for listing at a time; extra submissions are rejected automatically.",
    "ev": "docs",
    "src": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   },
   {
    "text": "Composio's managed HubSpot app is still awaiting HubSpot approval, so users see a warning; your own app avoids that once listed.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/hubspot"
   },
   {
    "text": "Composio's managed app cannot add scopes; a different scope set needs your own app.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/hubspot"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Install the HubSpot CLI, run `hs account auth`, then `hs project create` with OAuth auth and marketplace distribution",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Add Composio's redirect URI and your scopes to app-hsmeta.json, then `hs project upload`",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Open the app's Auth tab and copy the client ID and secret",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a custom HubSpot auth config in Composio with the client ID, secret and scopes",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy, terms and HubSpot setup guide needed for listing",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Get three active unaffiliated installs, then submit the Marketplace listing for review",
    "time": "days to weeks"
   }
  ],
  "portal": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/create-an-app",
  "docs": "https://developers.hubspot.com/docs/api/oauth-quickstart-guide",
  "callbackNote": "Add the redirect URI shown in Composio's dashboard (Composio's HubSpot guide uses https://backend.composio.dev/api/v3/toolkits/auth/callback) to config.auth.redirectUrls in app-hsmeta.json.",
  "sources": [
   {
    "t": "HubSpot Marketplace listing requirements",
    "u": "https://developers.hubspot.com/docs/apps/developer-platform/list-apps/listing-your-app/app-marketplace-listing-requirements"
   },
   {
    "t": "HubSpot changelog: marketplace distribution install limits",
    "u": "https://developers.hubspot.com/changelog/new-marketplace-distribution-app-install-limits"
   },
   {
    "t": "HubSpot: manage apps (distribution, install limits, warnings)",
    "u": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/manage-apps-in-hubspot"
   },
   {
    "t": "HubSpot: create an app",
    "u": "https://developers.hubspot.com/docs/apps/developer-platform/build-apps/create-an-app"
   },
   {
    "t": "HubSpot OAuth quickstart",
    "u": "https://developers.hubspot.com/docs/api/oauth-quickstart-guide"
   },
   {
    "t": "Composio HubSpot toolkit",
    "u": "https://docs.composio.dev/toolkits/hubspot"
   },
   {
    "t": "Composio: custom vs managed app",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   },
   {
    "t": "Composio: HubSpot OAuth credentials guide",
    "u": "https://composio.dev/auth/hubspot"
   }
  ],
  "unverified": [
   "Refresh token lifetime is not stated in the OAuth quickstart.",
   "Whether installs beyond 25 on migrated legacy apps keep working was not confirmed in fetched docs."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "salesforce",
  "name": "Salesforce",
  "slug": "salesforce",
  "category": "CRM & support",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/salesforce",
  "difficulty": "medium",
  "oneLiner": "New Connected Apps are restricted; use External Client Apps.",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "AgentExchange (formerly AppExchange) security review, needed only to list publicly",
   "wait": "1-2 weeks verification plus 3-4 weeks first test; resubmissions 2-3 weeks",
   "ev": "docs",
   "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
  },
  "cost": {
   "text": "Security review fee for paid apps; no fee if you distribute for free (amount not on current docs page)",
   "ev": "docs",
   "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
  },
  "limits": [
   {
    "text": "Without passing security review you can't list on AgentExchange or distribute your solution there.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
   },
   {
    "text": "A customer org admin may need to install or approve your app before users can connect.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/salesforce"
   }
  ],
  "requirements": [
   {
    "text": "Creating Connected Apps is restricted as of Spring '26; Salesforce recommends External Client Apps instead.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html"
   },
   {
    "text": "Creating a Connected App now needs Salesforce Support to enable an org permission, once per org.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-auth-connected-app.html"
   },
   {
    "text": "Security review requires ISV Partner Program enrollment, a Lightning Ready solution and a Partner Console provider profile.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
   },
   {
    "text": "API-only submissions need a Developer Edition org, credentials for external components, DAST scan reports, false-positive notes if any, and solution documentation.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-required-materials.html",
    "fixed": true
   },
   {
    "text": "Reviewers test external web apps and services your solution uses, following where Salesforce data goes.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-required-materials.html"
   }
  ],
  "gotchas": [
   {
    "text": "OAUTH_APPROVAL_ERROR_GENERIC or 'app must be installed into org' means an org admin must approve or install the app.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/salesforce"
   },
   {
    "text": "Distributing an External Client App to other orgs is done through a second-generation managed package.",
    "ev": "docs",
    "src": "https://trailhead.salesforce.com/content/learn/modules/external-client-app-basics/package-and-distribute-external-client-apps"
   },
   {
    "text": "OAuth consumer credentials are global settings that must stay in a long-lived org, not in the package.",
    "ev": "docs",
    "src": "https://trailhead.salesforce.com/content/learn/modules/external-client-app-basics/package-and-distribute-external-client-apps"
   },
   {
    "text": "Refresh token expiry is set by the app's OAuth policy, so check it before going live.",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-auth-connected-app.html"
   },
   {
    "text": "Apps that skip pre-testing rarely pass review, and re-testing a resubmission typically takes 2-3 weeks (an estimate).",
    "ev": "docs",
    "src": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html",
    "fixed": true
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In Setup, search External Client Apps and create a new External Client App",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Enable OAuth, add Composio's callback URL and the api, refresh_token and id scopes",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Copy the consumer key and secret from the app's OAuth settings",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a custom Salesforce auth config in Composio with the key and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Have each customer org's admin install or approve the app",
    "time": "varies"
   },
   {
    "who": "you",
    "t": "Optional: join the ISV Partner Program and submit for AgentExchange security review",
    "time": "4-6 weeks"
   }
  ],
  "portal": "Salesforce Setup > External Client Apps (in your org)",
  "docs": "https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html",
  "callbackNote": "Add the redirect URI shown in Composio's dashboard (Composio's Salesforce guide uses https://backend.composio.dev/api/v3/toolkits/auth/callback) as the app's Callback URL.",
  "sources": [
   {
    "t": "Salesforce REST API: External Client Apps or Connected Apps",
    "u": "https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html"
   },
   {
    "t": "Salesforce CLI: create a connected app",
    "u": "https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-auth-connected-app.html"
   },
   {
    "t": "How the AgentExchange security review works",
    "u": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
   },
   {
    "t": "Required materials for security review",
    "u": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-required-materials.html"
   },
   {
    "t": "Pass the AgentExchange security review",
    "u": "https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-guidelines.html"
   },
   {
    "t": "Trailhead: package and distribute External Client Apps",
    "u": "https://trailhead.salesforce.com/content/learn/modules/external-client-app-basics/package-and-distribute-external-client-apps"
   },
   {
    "t": "Metadata API: ExternalClientApplication",
    "u": "https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_externalclientapplication.htm"
   },
   {
    "t": "Composio Salesforce toolkit",
    "u": "https://docs.composio.dev/toolkits/salesforce"
   },
   {
    "t": "Composio: Salesforce OAuth credentials guide",
    "u": "https://composio.dev/auth/salesforce"
   }
  ],
  "unverified": [
   "Security review fee amount: older ISVforce guide versions listed $999 (and earlier $2,550), but the current docs page no longer states an amount and the old fee pages now 404.",
   "Whether a 'Local' External Client App can authorize users from other orgs without packaging was not confirmed in fetched Salesforce docs.",
   "Access token lifetime is not stated in the fetched pages."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "pipedrive",
  "name": "Pipedrive",
  "slug": "pipedrive",
  "category": "CRM & support",
  "auth": "OAuth 2.0",
  "managed": "no",
  "managedSrc": "https://docs.composio.dev/toolkits/pipedrive",
  "difficulty": "easy",
  "oneLiner": "Private apps install via direct link, no review needed.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Pipedrive Marketplace app approval (only for public, listed apps)",
   "wait": "Up to 21 business days",
   "ev": "docs",
   "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
  },
  "cost": {
   "text": "$0; no submission or listing fee is mentioned",
   "ev": "docs",
   "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
  },
  "limits": [
   {
    "text": "Private apps get no Marketplace listing page but can be shared with any Pipedrive company via an unlisted install link.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app"
   }
  ],
  "requirements": [
   {
    "text": "You need a developer sandbox account to access the Developer Hub.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
   },
   {
    "text": "Both private and public apps must use OAuth 2.0 with working install and uninstall flows.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app"
   },
   {
    "text": "Public apps need Terms of Service and Privacy Policy pages and agreement to the Developer Partner Agreement.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
   },
   {
    "text": "Public app review needs a demo video, up-to-date test accounts, and 3-5 listing images.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
   },
   {
    "text": "The callback URL in requests must match the one entered when registering the app.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-oauth-authorization"
   }
  ],
  "gotchas": [
   {
    "text": "The app type (private or public) cannot be changed later in Developer Hub.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app"
   },
   {
    "text": "Every user in a company installs the app separately; installs are per user.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app"
   },
   {
    "text": "Access tokens last 60 minutes; refresh tokens expire after 60 days unused, forcing a full reinstall.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-oauth-authorization"
   },
   {
    "text": "Approved public apps are unlisted by default and must be published manually.",
    "ev": "docs",
    "src": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
   },
   {
    "text": "Don't click Install and Test in Pipedrive; start the connection from Composio and enter the company subdomain.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/pipedrive"
   },
   {
    "text": "\"App not found\" usually means the OAuth app isn't approved or available for that user; also check that the client ID and secret belong to the same app.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/pipedrive",
    "fixed": true
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Request a Pipedrive developer sandbox account",
    "time": "5 min + wait"
   },
   {
    "who": "you",
    "t": "In Developer Hub, create a private app with a unique name and Composio's callback URL",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Pick only the access scopes you need and copy the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a custom Pipedrive auth config in Composio with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Connect from Composio, entering the Pipedrive company subdomain when asked",
    "time": "2 min"
   }
  ],
  "portal": "https://pipedrive.readme.io/docs/developer-sandbox-account",
  "docs": "https://pipedrive.readme.io/docs/marketplace-oauth-authorization",
  "callbackNote": "Add the redirect URI shown in Composio's dashboard (Composio's Pipedrive guide uses https://backend.composio.dev/api/v3/toolkits/auth/callback) as the app's Callback URL.",
  "sources": [
   {
    "t": "Pipedrive Marketplace app approval process",
    "u": "https://pipedrive.readme.io/docs/marketplace-app-approval-process"
   },
   {
    "t": "Pipedrive: creating a proper app (public vs private)",
    "u": "https://pipedrive.readme.io/docs/marketplace-creating-a-proper-app"
   },
   {
    "t": "Pipedrive OAuth authorization",
    "u": "https://pipedrive.readme.io/docs/marketplace-oauth-authorization"
   },
   {
    "t": "Pipedrive developer sandbox account",
    "u": "https://pipedrive.readme.io/docs/developer-sandbox-account"
   },
   {
    "t": "Composio Pipedrive toolkit",
    "u": "https://docs.composio.dev/toolkits/pipedrive"
   },
   {
    "t": "Composio: Pipedrive OAuth credentials guide",
    "u": "https://composio.dev/auth/pipedrive"
   }
  ],
  "unverified": [
   "Whether the developer sandbox account is free, and how long access takes, is not stated.",
   "No install cap for private apps is stated, but no page explicitly says there is none."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "zendesk",
  "name": "Zendesk",
  "slug": "zendesk",
  "category": "CRM & support",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/zendesk",
  "difficulty": "gated",
  "oneLiner": "Multi-customer apps need a Zendesk-issued global client.",
  "setup": {
   "time": "~45 min plus account approvals",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Global OAuth client request through the Zendesk Marketplace portal",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
  },
  "cost": {
   "text": "No fee is mentioned for the global OAuth request",
   "ev": "docs",
   "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
  },
  "limits": [
   {
    "text": "Before approval: a local OAuth client's tokens only access the single Zendesk instance that created it.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/api-reference/introduction/security-and-auth/"
   },
   {
    "text": "Third-party apps may not use a customer's API token or the customer's own OAuth client, listed or not.",
    "ev": "docs",
    "src": "https://support.zendesk.com/hc/en-us/articles/9590471542170-Developer-update-Enhanced-security-guidelines-for-third-party-apps-integrations-and-bots"
   }
  ],
  "requirements": [
   {
    "text": "Apps distributed to multiple Zendesk customers must use global OAuth tokens.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "Requests must come from a d3v- sponsored account; non-d3v- submissions aren't accepted.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "Sponsored d3v- accounts are reserved for developers building Zendesk Marketplace apps.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/api-basics/getting-started/getting-a-trial-or-sponsored-account-for-development/"
   },
   {
    "text": "The local client's unique identifier must start with zdg- and every field must be filled in.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "Unlisted integrations must still create a Marketplace profile, register the organization and submit for review.",
    "ev": "docs",
    "src": "https://support.zendesk.com/hc/en-us/articles/9590471542170-Developer-update-Enhanced-security-guidelines-for-third-party-apps-integrations-and-bots"
   },
   {
    "text": "Global OAuth clients must support the refresh token flow from January 31, 2026.",
    "ev": "docs",
    "src": "https://support.zendesk.com/hc/en-us/articles/9590471542170-Developer-update-Enhanced-security-guidelines-for-third-party-apps-integrations-and-bots"
   }
  ],
  "gotchas": [
   {
    "text": "Save the client secret and identifier first; you lose the client admin page after conversion to global.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "Zendesk may cap allowed scopes; requesting others returns 400 invalid_scope.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "Scope changes after approval go through Zendesk Support, since only Marketplace Operations can edit global clients.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "text": "New global clients get 30-minute access tokens and 30-day refresh tokens by default.",
    "ev": "docs",
    "src": "https://support.zendesk.com/hc/en-us/articles/10212201463962-Announcing-the-required-expiration-of-global-OAuth-access-and-refresh-tokens"
   },
   {
    "text": "A sponsored account is suspended if used to provide real customer support.",
    "ev": "docs",
    "src": "https://developer.zendesk.com/documentation/api-basics/getting-started/getting-a-trial-or-sponsored-account-for-development/"
   },
   {
    "text": "Integration apps must send custom headers identifying the integration, organization ID and Marketplace app ID.",
    "ev": "docs",
    "src": "https://support.zendesk.com/hc/en-us/articles/9590471542170-Developer-update-Enhanced-security-guidelines-for-third-party-apps-integrations-and-bots"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Start a Zendesk trial, rename the subdomain with a d3v- prefix and file the Sponsored Account Request Form",
    "time": "15 min + wait"
   },
   {
    "who": "you",
    "t": "Create a local OAuth client with a zdg- identifier, all fields filled and Composio's redirect URL",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Save the client ID and secret somewhere safe",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Draft the scope list and justification for the global OAuth request",
    "time": "15 min"
   },
   {
    "who": "you",
    "t": "In the Marketplace portal, open Global OAuth and click Request new OAuth",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "After approval, create a custom Zendesk auth config in Composio with the saved credentials",
    "time": "5 min"
   }
  ],
  "portal": "https://apps.zendesk.com",
  "docs": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/",
  "callbackNote": "Add the redirect URI shown in Composio's dashboard; Composio's Zendesk guide lists an older v1 URL (https://backend.composio.dev/api/v1/auth-apps/add), so confirm against the dashboard.",
  "sources": [
   {
    "t": "Zendesk: set up a global OAuth client",
    "u": "https://developer.zendesk.com/documentation/marketplace/building-a-marketplace-app/set-up-a-global-oauth-client/"
   },
   {
    "t": "Zendesk: managing global OAuth clients and app associations",
    "u": "https://developer.zendesk.com/documentation/apps/app-developer-guide/managing-global-oauth-clients-and-app-associations/"
   },
   {
    "t": "Zendesk: security and authentication",
    "u": "https://developer.zendesk.com/api-reference/introduction/security-and-auth/"
   },
   {
    "t": "Zendesk: trial or sponsored account for development",
    "u": "https://developer.zendesk.com/documentation/api-basics/getting-started/getting-a-trial-or-sponsored-account-for-development/"
   },
   {
    "t": "Zendesk developer update: enhanced security guidelines",
    "u": "https://support.zendesk.com/hc/en-us/articles/9590471542170-Developer-update-Enhanced-security-guidelines-for-third-party-apps-integrations-and-bots"
   },
   {
    "t": "Zendesk: required expiration of global OAuth tokens",
    "u": "https://support.zendesk.com/hc/en-us/articles/10212201463962-Announcing-the-required-expiration-of-global-OAuth-access-and-refresh-tokens"
   },
   {
    "t": "Composio Zendesk toolkit",
    "u": "https://docs.composio.dev/toolkits/zendesk"
   },
   {
    "t": "Composio: Zendesk OAuth credentials guide",
    "u": "https://composio.dev/auth/zendesk"
   }
  ],
  "unverified": [
   "Global OAuth review duration is not published.",
   "Sponsored account approval time and cost are not stated.",
   "What happens on rejection is not described on the current global OAuth page."
  ],
  "checked": "2026-10-29",
  "setupShort": "~45 min"
 },
 {
  "id": "intercom",
  "name": "Intercom",
  "slug": "intercom",
  "category": "CRM & support",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/intercom",
  "difficulty": "medium",
  "oneLiner": "Only your team can install until review passes.",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Intercom app review (required for both listed and unlisted public apps)",
   "wait": "Up to 7 business days",
   "ev": "docs",
   "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
  },
  "cost": {
   "text": "$0; development workspaces are free and no review fee is mentioned",
   "ev": "docs",
   "src": "https://developers.intercom.com/docs/build-an-integration/getting-started"
  },
  "limits": [
   {
    "text": "Before approval the app is private and can only be used by you and your team.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
   },
   {
    "text": "Development workspaces cap at 20 users, can't send outbound email, and can't become production workspaces.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/getting-started"
   }
  ],
  "requirements": [
   {
    "text": "Public app developers must create a development workspace to build and publish the app.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/getting-started"
   },
   {
    "text": "OAuth redirect URLs must use HTTPS.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth"
   },
   {
    "text": "Review needs a video showing OAuth install, end-to-end functionality, and OAuth uninstall.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
   },
   {
    "text": "Requested scopes are checked against what the app does.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
   },
   {
    "text": "Unlisted apps must be installed from your own product or website.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
   }
  ],
  "gotchas": [
   {
    "text": "Each region (US, EU, AU) has its own authorization host; matching it avoids an extra region-selection step and is required only when the customer signs in with Google.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth",
    "fixed": true
   },
   {
    "text": "You may be asked to adjust your scopes and resubmit the app for review.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app",
    "fixed": true
   },
   {
    "text": "OAuth is off until you tick \"Use OAuth\" on the app's Authentication page.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth"
   },
   {
    "text": "In EU and AU, development-workspace apps can't be installed into paid workspaces.",
    "ev": "docs",
    "src": "https://developers.intercom.com/docs/build-an-integration/getting-started"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Sign up for a free development workspace and create a new app in Developer Hub",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Tick Use OAuth, add Composio's HTTPS redirect URL and select only the scopes you need",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Copy the client ID and secret from Basic Information",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a custom Intercom auth config in Composio with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Record the install, functionality and uninstall video",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Choose listed or unlisted and submit the app for review",
    "time": "10 min + up to 7 business days"
   }
  ],
  "portal": "https://developers.intercom.com/docs/build-an-integration/getting-started",
  "docs": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth",
  "callbackNote": "Add the HTTPS redirect URI shown in Composio's dashboard on the app's Authentication page; the first redirect URL is the default.",
  "sources": [
   {
    "t": "Intercom: app review and publishing",
    "u": "https://developers.intercom.com/docs/publish-to-the-app-store/review-publish-your-app"
   },
   {
    "t": "Intercom: setting up OAuth",
    "u": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication/setting-up-oauth"
   },
   {
    "t": "Intercom: authentication",
    "u": "https://developers.intercom.com/docs/build-an-integration/learn-more/authentication"
   },
   {
    "t": "Intercom: set up a workspace",
    "u": "https://developers.intercom.com/docs/build-an-integration/getting-started"
   },
   {
    "t": "Composio Intercom toolkit",
    "u": "https://docs.composio.dev/toolkits/intercom"
   },
   {
    "t": "Composio: custom vs managed app",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Whether Intercom OAuth access tokens expire or use refresh tokens is not stated in the fetched pages.",
   "Privacy policy and terms requirements sit in the developer terms, which were not fetched.",
   "A search snippet said reviews take 7-14 days; the fetched page says up to seven business days."
  ],
  "checked": "2026-10-29",
  "waitShort": "Up to 7 days"
 },
 {
  "id": "slack",
  "name": "Slack",
  "slug": "slack",
  "category": "Communication",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/slack",
  "difficulty": "medium",
  "oneLiner": "Unlisted apps get 1 history call a minute.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Slack Marketplace review (needed to lift unlisted-app limits)",
   "wait": "Up to 10 business days preliminary, then up to 10 weeks functional",
   "ev": "docs",
   "src": "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide"
  },
  "cost": {
   "text": "$0 (no fee found in Slack docs)",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before Marketplace approval: conversations.history and conversations.replies are limited to 1 request per minute for new unlisted commercial apps.",
    "ev": "docs",
    "src": "https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps"
   },
   {
    "text": "Before Marketplace approval: those two methods return at most 15 objects per request.",
    "ev": "docs",
    "src": "https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps"
   },
   {
    "text": "Internal customer-built apps keep 50+ requests per minute and up to 1,000 objects per request.",
    "ev": "docs",
    "src": "https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps"
   }
  ],
  "requirements": [
   {
    "text": "Redirect URLs must use HTTPS.",
    "ev": "docs",
    "src": "https://docs.slack.dev/authentication/installing-with-oauth"
   },
   {
    "text": "Marketplace submission requires the app to be installed on 10 or more active workspaces.",
    "ev": "docs",
    "src": "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide"
   },
   {
    "text": "Installing on other workspaces requires Activate Public Distribution under Manage Distribution.",
    "ev": "docs",
    "src": "https://docs.slack.dev/app-management/distribution"
   },
   {
    "text": "A short video demo of install, OAuth, setup and uninstall is optional but speeds up Marketplace review.",
    "ev": "docs",
    "src": "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide",
    "fixed": true
   }
  ],
  "gotchas": [
   {
    "text": "Slack's updated API terms say the Marketplace is the only appropriate channel for commercially distributing apps.",
    "ev": "docs",
    "src": "https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps"
   },
   {
    "text": "Workspaces that require Marketplace or approved apps show a warning or need admin approval for unlisted apps.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/slack"
   },
   {
    "text": "Each preliminary resubmission resets your place in the review queue.",
    "ev": "docs",
    "src": "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide"
   },
   {
    "text": "With your own app, Slack triggers need the Composio custom OAuth webhook setup.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/slack"
   },
   {
    "text": "Every scope in the Composio auth config must also be added in the Slack app, or calls fail with insufficient scopes.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/slack"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an app at api.slack.com/apps and add the bot and user scopes you need",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Add Composio's callback as a Redirect URL under OAuth & Permissions",
    "time": "2 min"
   },
   {
    "who": "you",
    "t": "Activate Public Distribution under Manage Distribution",
    "time": "3 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID and secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft scope justifications and the listing copy for Marketplace review",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Reach 10 active workspace installs, record a demo video, and submit to the Marketplace",
    "time": "weeks"
   }
  ],
  "portal": "https://api.slack.com/apps",
  "docs": "https://docs.slack.dev/authentication/installing-with-oauth",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback under OAuth & Permissions > Redirect URLs.",
  "sources": [
   {
    "t": "Composio Slack toolkit",
    "u": "https://docs.composio.dev/toolkits/slack"
   },
   {
    "t": "Slack: rate limit changes for non-Marketplace apps",
    "u": "https://docs.slack.dev/changelog/2025/05/29/rate-limit-changes-for-non-marketplace-apps"
   },
   {
    "t": "Slack Marketplace review guide",
    "u": "https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide"
   },
   {
    "t": "Slack: installing with OAuth",
    "u": "https://docs.slack.dev/authentication/installing-with-oauth"
   },
   {
    "t": "Slack: distributing your app",
    "u": "https://docs.slack.dev/app-management/distribution"
   },
   {
    "t": "Slack conversations.history",
    "u": "https://docs.slack.dev/reference/methods/conversations.history"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Slack does not publish a fee for creating or listing apps; $0 is inferred."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "discord",
  "name": "Discord",
  "slug": "discord",
  "category": "Communication",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/discord",
  "difficulty": "easy",
  "oneLiner": "User OAuth works for anyone; bots need verification at 100+",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "App Verification (bots in 100+ servers); Privileged Intent review above 10,000 users",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://docs.discord.com/developers/events/gateway"
  },
  "cost": {
   "text": "$0 (no fee found in Discord docs)",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "All bots can make up to 50 requests per second to the API (global limit).",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/topics/rate-limits"
   },
   {
    "text": "Bots with privileged intents need review once more than 10,000 unique users can see the app.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review"
   }
  ],
  "requirements": [
   {
    "text": "Verification is required for apps in 100+ guilds.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/events/gateway"
   },
   {
    "text": "App Verification requires the team owner to complete identity and application verification.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/discovery/enabling-discovery"
   },
   {
    "text": "The redirect_uri must be one you registered on the application.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/topics/oauth2"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens expire (example expires_in is 604800 seconds), so use the refresh token.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/topics/oauth2"
   },
   {
    "text": "Some scopes such as voice, rpc and dm_channels.read are only available to approved partners.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/topics/oauth2"
   },
   {
    "text": "Several Composio Discord tools are deprecated because they need a bot token, not a user OAuth connection.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/discord"
   },
   {
    "text": "As of June 10, 2026, the privileged intent review threshold is based on more than 10,000 unique users instead of 100+ servers, and approved apps must reapply annually.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review",
    "fixed": true
   },
   {
    "text": "Approved privileged intent access must be reapplied for every year.",
    "ev": "docs",
    "src": "https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an application at discord.com/developers/applications",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Copy the client ID and secret and register Composio's redirect URI",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID, secret and scopes",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Connect a test account and confirm the scopes work",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "If you ship a bot past 100 servers, complete App Verification in the Developer Portal",
    "time": "varies"
   }
  ],
  "portal": "https://discord.com/developers/applications",
  "docs": "https://docs.discord.com/developers/topics/oauth2",
  "callbackNote": "Register https://backend.composio.dev/api/v3/toolkits/auth/callback as a redirect on the application; it must match the auth config's redirect URI exactly.",
  "sources": [
   {
    "t": "Composio Discord toolkit",
    "u": "https://docs.composio.dev/toolkits/discord"
   },
   {
    "t": "Discord OAuth2",
    "u": "https://docs.discord.com/developers/topics/oauth2"
   },
   {
    "t": "Discord Gateway (privileged intents)",
    "u": "https://docs.discord.com/developers/events/gateway"
   },
   {
    "t": "Discord privileged intent review guide",
    "u": "https://docs.discord.com/developers/gateway/getting-started-with-privileged-intent-review"
   },
   {
    "t": "Discord enabling discovery (App Verification)",
    "u": "https://docs.discord.com/developers/discovery/enabling-discovery"
   },
   {
    "t": "Discord rate limits",
    "u": "https://docs.discord.com/developers/topics/rate-limits"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Discord's App Verification help article returned 403, so exact verification requirements, review time, and what happens to an unverified bot at 100 servers were not confirmed.",
   "No fee for Discord apps found; $0 is inferred."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "zoom",
  "name": "Zoom",
  "slug": "zoom",
  "category": "Communication",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/zoom",
  "difficulty": "hard",
  "oneLiner": "Unreviewed apps only work inside your own Zoom account.",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Zoom App Marketplace review, including a security review",
   "wait": "not stated (varies with app quality)",
   "ev": "docs",
   "src": "https://developers.zoom.us/docs/distribute/app-review-process"
  },
  "cost": {
   "text": "$0 (no fee found in Zoom docs)",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before review: private apps can only be shared with members of your own Zoom account.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   },
   {
    "text": "Beta apps can reach limited external users only after Zoom approves sharing the authorization URL.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   },
   {
    "text": "Approved beta authorization URLs last 4 weeks, with up to two 4-week extensions.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   },
   {
    "text": "Beta sharing caps: 10 additions for account-level apps and 100 for user-level apps.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   }
  ],
  "requirements": [
   {
    "text": "Publishing requires one-time domain validation for the privacy policy, OAuth redirect, chat subscription bot, webhook callback and home URLs.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/publish",
    "fixed": true
   },
   {
    "text": "Zoom asks for test credentials so reviewers can fully test the app, and first-time submissions must use the Production Client ID during authorization.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/publish",
    "fixed": true
   },
   {
    "text": "Sharing a beta URL externally requires SSDLC docs, SAST and DAST results, a privacy policy, any three of five extra security artifacts, and TLS 1.2 or higher.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps",
    "fixed": true
   },
   {
    "text": "Published apps must provide Terms of Use, a privacy policy and user support.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute"
   },
   {
    "text": "An OAuth redirect URL and an OAuth allow list are required.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/basic-info/oauth-info"
   }
  ],
  "gotchas": [
   {
    "text": "Zoom answers external beta sharing requests within 3-4 business days.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   },
   {
    "text": "Development and production OAuth values differ, so configure both.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/basic-info/oauth-info"
   },
   {
    "text": "Loopback or dev redirect URLs in production may be rejected in review.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/basic-info/oauth-info"
   },
   {
    "text": "Access tokens last one hour; refresh tokens expire after 90 days.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/integrations/oauth"
   },
   {
    "text": "Zoom enables no scopes by default; add each one in the Scopes tab.",
    "ev": "docs",
    "src": "https://composio.dev/auth/zoom"
   },
   {
    "text": "Unlisted apps still go through review and still need full listing metadata.",
    "ev": "docs",
    "src": "https://developers.zoom.us/docs/build-flow/before-you-build"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a General app at marketplace.zoom.us and copy the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add Composio's callback to the OAuth redirect URL and allow list, then add scopes",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID and secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy, terms, and technical design answers",
    "time": "1-2 hr"
   },
   {
    "who": "you",
    "t": "Verify your domains and provide test credentials in the Publish section",
    "time": "1 hr"
   },
   {
    "who": "you",
    "t": "Submit for Marketplace review and respond to review notes",
    "time": "weeks"
   }
  ],
  "portal": "https://marketplace.zoom.us/develop/create",
  "docs": "https://developers.zoom.us/docs/integrations/oauth",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback as the OAuth Redirect URL and to the OAuth Allow List, in both development and production.",
  "sources": [
   {
    "t": "Composio Zoom toolkit",
    "u": "https://docs.composio.dev/toolkits/zoom"
   },
   {
    "t": "Composio: Zoom OAuth credentials",
    "u": "https://composio.dev/auth/zoom"
   },
   {
    "t": "Zoom build flow: Publish",
    "u": "https://developers.zoom.us/docs/build-flow/publish"
   },
   {
    "t": "Zoom: sharing private and beta apps",
    "u": "https://developers.zoom.us/docs/distribute/sharing-private-and-beta-apps"
   },
   {
    "t": "Zoom app review process",
    "u": "https://developers.zoom.us/docs/distribute/app-review-process"
   },
   {
    "t": "Zoom app distribution",
    "u": "https://developers.zoom.us/docs/distribute"
   },
   {
    "t": "Zoom: before you build",
    "u": "https://developers.zoom.us/docs/build-flow/before-you-build"
   },
   {
    "t": "Zoom OAuth information",
    "u": "https://developers.zoom.us/docs/build-flow/basic-info/oauth-info"
   },
   {
    "t": "Zoom OAuth tokens",
    "u": "https://developers.zoom.us/docs/integrations/oauth"
   }
  ],
  "unverified": [
   "Zoom does not publish a Marketplace review duration.",
   "No developer fee found; $0 is inferred."
  ],
  "checked": "2026-10-29",
  "waitShort": "Not stated"
 },
 {
  "id": "linkedin",
  "name": "LinkedIn",
  "slug": "linkedin",
  "category": "Social & marketing",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/linkedin",
  "difficulty": "medium",
  "oneLiner": "Self-serve covers sign-in and member posts only.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Community Management API (Development, then Standard tier) for organization/page scopes",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
  },
  "cost": {
   "text": "$0 (no fee found in LinkedIn docs)",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Without approval, only open permissions work: profile, email (OpenID Connect) and w_member_social.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access"
   },
   {
    "text": "Community Management Development tier allows 500 requests per app and 100 per member.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
   },
   {
    "text": "Rate limits are daily, reset at midnight UTC, and are not published; check the app's Analytics tab.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits"
   }
  ],
  "requirements": [
   {
    "text": "Redirect URLs must be absolute HTTPS URLs with no # fragment.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow"
   },
   {
    "text": "Creating the app asks for an app name, a Company page URL and a logo.",
    "ev": "docs",
    "src": "https://composio.dev/auth/linkedin"
   },
   {
    "text": "Self-serve products are added from the Products tab of the app.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin"
   },
   {
    "text": "Standard tier requests need a screencast showing each use case.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens last 60 days; programmatic refresh tokens are for approved Marketing Developer Platform partners.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens"
   },
   {
    "text": "Changing an app's scopes means users must re-authenticate.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow"
   },
   {
    "text": "Composio's LinkedIn organization tools need w_organization_social to post as an organization, rw_organization_admin for page and share statistics, and r_organization_admin for company info.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/linkedin",
    "fixed": true
   },
   {
    "text": "w_member_social and r_organization_admin cannot be used together.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/linkedin"
   },
   {
    "text": "Community Management access must be requested on a new app with no other API products.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
   },
   {
    "text": "r_member_social is closed and LinkedIn is not accepting requests for it.",
    "ev": "docs",
    "src": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an app at linkedin.com/developers with a Company page and logo",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add Sign In with LinkedIn using OpenID Connect and Share on LinkedIn in the Products tab",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Add Composio's callback as an authorized redirect URL in the Auth tab",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID, secret and scopes",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft use-case answers for the Community Management API form if you need page tools",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Apply for Development tier, then record a screencast for Standard tier",
    "time": "weeks"
   }
  ],
  "portal": "https://www.linkedin.com/developers/apps",
  "docs": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow",
  "callbackNote": "Add https://backend.composio.dev/api/v3/toolkits/auth/callback under Auth > OAuth 2.0 settings > Authorized redirect URLs.",
  "sources": [
   {
    "t": "Composio LinkedIn toolkit",
    "u": "https://docs.composio.dev/toolkits/linkedin"
   },
   {
    "t": "Composio: LinkedIn OAuth credentials",
    "u": "https://composio.dev/auth/linkedin"
   },
   {
    "t": "LinkedIn: getting access",
    "u": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access"
   },
   {
    "t": "LinkedIn authorization code flow",
    "u": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow"
   },
   {
    "t": "LinkedIn programmatic refresh tokens",
    "u": "https://learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens"
   },
   {
    "t": "LinkedIn Community Management overview",
    "u": "https://learn.microsoft.com/en-us/linkedin/marketing/community-management/community-management-overview"
   },
   {
    "t": "LinkedIn rate limits",
    "u": "https://learn.microsoft.com/en-us/linkedin/shared/api-guide/concepts/rate-limits"
   },
   {
    "t": "Share on LinkedIn",
    "u": "https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin"
   },
   {
    "t": "Sign In with LinkedIn using OpenID Connect",
    "u": "https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2"
   },
   {
    "t": "LinkedIn Advertising API tiers",
    "u": "https://learn.microsoft.com/en-us/linkedin/marketing/integrations/marketing-tiers"
   }
  ],
  "unverified": [
   "LinkedIn does not publish review times for Community Management tiers.",
   "The fetched pages do not name the exact scopes Community Management grants.",
   "No developer fee found; $0 is inferred."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "twitter",
  "name": "X (Twitter)",
  "slug": "twitter",
  "category": "Social & marketing",
  "auth": "OAuth 2.0",
  "managed": "no",
  "managedSrc": "https://docs.composio.dev/toolkits/twitter",
  "difficulty": "medium",
  "oneLiner": "No free tier: prepaid credits, $0.015 per post.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No app review; you accept the Developer Agreement and pay per use",
   "wait": "none",
   "ev": "docs",
   "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/getting-access.mdx"
  },
  "cost": {
   "text": "Pay-per-use credits, e.g. $0.005 per post read and $0.015 per post created",
   "ev": "docs",
   "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/pricing.mdx"
  },
  "limits": [
   {
    "text": "Pay-per-use plans are capped at 3 million Post reads per monthly billing cycle.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/pricing.mdx"
   },
   {
    "text": "API requests are blocked when your credit balance or spending limit runs out.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/pricing.mdx"
   },
   {
    "text": "Posts with a URL cost $0.20 per request.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/pricing.mdx"
   }
  ],
  "requirements": [
   {
    "text": "You must sign in at console.x.com, accept the Developer Agreement and Policy, and describe your use.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/getting-access.mdx"
   },
   {
    "text": "Callback URLs must be allowlisted, match exactly, and use https in production.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/fundamentals/developer-apps.mdx"
   },
   {
    "text": "Choose Web App or Automated App to get a client secret (confidential client).",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/fundamentals/developer-apps.mdx"
   }
  ],
  "gotchas": [
   {
    "text": "By default, access tokens are valid for two hours unless the offline.access scope is used, and refresh tokens are only issued with the offline.access scope.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/fundamentals/authentication/oauth-2-0/authorization-code.mdx",
    "fixed": true
   },
   {
    "text": "Credentials are shown once; losing them means regenerating and invalidating the old ones.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/getting-access.mdx"
   },
   {
    "text": "Composio managed credentials for Twitter were removed in February 2026.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/twitter"
   },
   {
    "text": "Post analytics actions return 403 unless you are on an X Enterprise plan.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/twitter"
   },
   {
    "text": "Apps can have at most 10 callback URLs.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/fundamentals/developer-apps.mdx"
   },
   {
    "text": "First-time credit incentives ($20 plus up to $50 match) expire 3 months after they are granted.",
    "ev": "docs",
    "src": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/free-credits.mdx"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Sign in at console.x.com and accept the Developer Agreement",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Create an app and set up OAuth 2.0 user authentication as a Web App",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add Composio's callback URL and save the client ID and secret",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Buy credits and set a spending limit in the Developer Console",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID, secret and scopes, including offline.access",
    "time": "5 min"
   }
  ],
  "portal": "https://console.x.com",
  "docs": "https://github.com/xdevplatform/docs/blob/main/fundamentals/authentication/oauth-2-0/authorization-code.mdx",
  "callbackNote": "Composio's Twitter guide uses https://backend.composio.dev/api/v1/auth-apps/add; if you use https://backend.composio.dev/api/v3/toolkits/auth/callback instead, set it in both the X app and the auth config.",
  "sources": [
   {
    "t": "Composio Twitter toolkit",
    "u": "https://docs.composio.dev/toolkits/twitter"
   },
   {
    "t": "Composio: Twitter OAuth credentials",
    "u": "https://composio.dev/auth/twitter"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   },
   {
    "t": "X API pricing (docs source)",
    "u": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/pricing.mdx"
   },
   {
    "t": "X API free credits (docs source)",
    "u": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/free-credits.mdx"
   },
   {
    "t": "X API getting access (docs source)",
    "u": "https://github.com/xdevplatform/docs/blob/main/x-api/getting-started/getting-access.mdx"
   },
   {
    "t": "X OAuth 2.0 authorization code with PKCE (docs source)",
    "u": "https://github.com/xdevplatform/docs/blob/main/fundamentals/authentication/oauth-2-0/authorization-code.mdx"
   },
   {
    "t": "X developer apps (docs source)",
    "u": "https://github.com/xdevplatform/docs/blob/main/fundamentals/developer-apps.mdx"
   }
  ],
  "unverified": [
   "docs.x.com did not resolve from this network; X facts come from the official xdevplatform/docs GitHub source that docs.x.com is built from.",
   "Per-endpoint request rate limits were not checked."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "reddit",
  "name": "Reddit",
  "slug": "reddit",
  "category": "Social & marketing",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/reddit",
  "difficulty": "gated",
  "oneLiner": "Commercial use needs a separate agreement with Reddit.",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Separate agreement with Reddit for commercial use or use beyond the Data API Terms",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://redditinc.com/policies/data-api-terms"
  },
  "cost": {
   "text": "No published price; Reddit reserves the right to charge fees",
   "ev": "docs",
   "src": "https://redditinc.com/policies/data-api-terms"
  },
  "limits": [
   {
    "text": "Without a separate agreement: no commercial use, and no research beyond the rate limits.",
    "ev": "docs",
    "src": "https://redditinc.com/policies/data-api-terms"
   },
   {
    "text": "You may not derive revenue from the Data APIs without Reddit's express written approval.",
    "ev": "docs",
    "src": "https://redditinc.com/policies/data-api-terms"
   }
  ],
  "requirements": [
   {
    "text": "You must provide up-to-date identification and contact details to access the Data APIs.",
    "ev": "docs",
    "src": "https://redditinc.com/policies/data-api-terms"
   },
   {
    "text": "The redirect_uri in requests must exactly match the one registered on the app.",
    "ev": "docs",
    "src": "https://github.com/reddit-archive/reddit/wiki/OAuth2"
   },
   {
    "text": "Use a web app type to get a client secret; installed apps get none.",
    "ev": "docs",
    "src": "https://github.com/reddit-archive/reddit/wiki/OAuth2"
   },
   {
    "text": "Reddit's archived API rules require a unique, descriptive User-Agent.",
    "ev": "docs",
    "src": "https://github.com/reddit-archive/reddit/wiki/API"
   }
  ],
  "gotchas": [
   {
    "text": "Bearer tokens expire after 1 hour; request duration=permanent to get a refresh token.",
    "ev": "docs",
    "src": "https://github.com/reddit-archive/reddit/wiki/OAuth2"
   },
   {
    "text": "The terms ban using User Content to train ML or AI models without rightsholders' permission.",
    "ev": "docs",
    "src": "https://redditinc.com/policies/data-api-terms"
   },
   {
    "text": "You must delete data not needed for your approved use case.",
    "ev": "docs",
    "src": "https://redditinc.com/policies/data-api-terms"
   },
   {
    "text": "Reddit says Devvit is now its primary way to build apps, not the Data API.",
    "ev": "docs",
    "src": "https://developers.reddit.com/docs/guides/migrate/public-api"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Go to reddit.com/prefs/apps and create a web app",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set the redirect URI to Composio's callback and copy the client ID and secret",
    "time": "3 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your client ID, secret and scopes",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Check your use case against the Data API Terms and draft an access request",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "For commercial use, contact Reddit and sign a separate agreement",
    "time": "weeks"
   }
  ],
  "portal": "https://www.reddit.com/prefs/apps",
  "docs": "https://github.com/reddit-archive/reddit/wiki/OAuth2",
  "callbackNote": "Set the app's redirect URI to https://backend.composio.dev/api/v3/toolkits/auth/callback; Reddit requires an exact match.",
  "sources": [
   {
    "t": "Composio Reddit toolkit",
    "u": "https://docs.composio.dev/toolkits/reddit"
   },
   {
    "t": "Reddit Data API Terms",
    "u": "https://redditinc.com/policies/data-api-terms"
   },
   {
    "t": "Reddit OAuth2 wiki (archived)",
    "u": "https://github.com/reddit-archive/reddit/wiki/OAuth2"
   },
   {
    "t": "Reddit API rules wiki (archived)",
    "u": "https://github.com/reddit-archive/reddit/wiki/API"
   },
   {
    "t": "Reddit: migrating from the Data API to Devvit",
    "u": "https://developers.reddit.com/docs/guides/migrate/public-api"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Reddit's Data API Wiki and Responsible Builder Policy pages returned 403, so the current approval process for new apps and the current rate limit were not confirmed.",
   "Reports that self-serve API access closed in November 2025 come from community threads, not an official page I fetched.",
   "The OAuth2 and API wikis are archived (last edited 2016 and 2015) and may be out of date.",
   "Commercial agreement pricing and turnaround are not published."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "shopify",
  "name": "Shopify",
  "slug": "shopify",
  "category": "Commerce & finance",
  "auth": "OAuth 2.0",
  "managed": "no",
  "managedSrc": "https://docs.composio.dev/toolkits/shopify",
  "difficulty": "hard",
  "oneLiner": "Multi-store apps need Shopify App Store review",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Public distribution requires Shopify approval and Shopify App Store registration",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://shopify.dev/docs/apps/launch/distribution"
  },
  "cost": {
   "text": "One-time $19 USD App Store registration fee per Partner account",
   "ev": "docs",
   "src": "https://shopify.dev/docs/apps/launch/distribution/revenue-share"
  },
  "limits": [
   {
    "text": "Before approval: a custom-distribution app installs only on one store, stores in one Plus organization, or development stores.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/distribution"
   },
   {
    "text": "Before approval: a public app can use protected customer data without review only while installed solely on development stores; custom apps get level 1 and 2 access without review.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/protected-customer-data",
    "fixed": true
   }
  ],
  "requirements": [
   {
    "text": "Public apps that use protected customer data must request access, and level 1 and 2 access requires review.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/protected-customer-data",
    "fixed": true
   },
   {
    "text": "App Store apps must subscribe to the customers/data_request, customers/redact and shop/redact compliance webhooks.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance"
   },
   {
    "text": "New public apps must be built only with the GraphQL Admin API.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements"
   },
   {
    "text": "Review submissions need a screencast, working test credentials and an emergency developer contact.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements"
   },
   {
    "text": "The app must authenticate with OAuth immediately after install, before any other step.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements"
   },
   {
    "text": "App charges must go through Shopify App Pricing or the Billing API.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements"
   }
  ],
  "gotchas": [
   {
    "text": "Composio has no managed Shopify app, so you must bring your own credentials.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/shopify"
   },
   {
    "text": "New public apps must use expiring offline tokens that last 1 hour, with refresh tokens valid 90 days.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/offline-access-tokens"
   },
   {
    "text": "You cannot change the distribution method after you select it.",
    "ev": "docs",
    "src": "https://shopify.dev/docs/apps/launch/distribution"
   },
   {
    "text": "Composio asks for the store subdomain (e.g. je0xpi-12) when connecting an account.",
    "ev": "docs",
    "src": "https://composio.dev/auth/shopify"
   },
   {
    "text": "Order updates can 403 without the read_all_orders scope.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/shopify"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an app in the Shopify Dev Dashboard, set the app URL and scopes",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URI, release the version, copy Client ID and secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your own Shopify credentials",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Choose public distribution and pay the $19 App Store registration fee",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Draft data-use justifications for protected customer data access",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Add compliance webhooks, screencast and test credentials, then submit for review",
    "time": "2 h"
   }
  ],
  "portal": "https://partners.shopify.com",
  "docs": "https://shopify.dev/docs/apps/launch/distribution",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "Composio Shopify toolkit",
    "u": "https://docs.composio.dev/toolkits/shopify"
   },
   {
    "t": "Composio: Shopify OAuth credentials",
    "u": "https://composio.dev/auth/shopify"
   },
   {
    "t": "Shopify app distribution",
    "u": "https://shopify.dev/docs/apps/launch/distribution"
   },
   {
    "t": "Shopify protected customer data",
    "u": "https://shopify.dev/docs/apps/launch/protected-customer-data"
   },
   {
    "t": "Shopify app review process",
    "u": "https://shopify.dev/docs/apps/launch/app-store-review/review-process"
   },
   {
    "t": "Shopify App Store requirements",
    "u": "https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements"
   },
   {
    "t": "Shopify revenue share",
    "u": "https://shopify.dev/docs/apps/launch/distribution/revenue-share"
   },
   {
    "t": "Shopify privacy law compliance",
    "u": "https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance"
   },
   {
    "t": "Shopify offline access tokens",
    "u": "https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/offline-access-tokens"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Shopify does not publish an App Store review duration.",
   "Portal URL partners.shopify.com not fetched; Composio's guide starts from the Dev Dashboard in Shopify Admin."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "xero",
  "name": "Xero",
  "slug": "xero",
  "category": "Commerce & finance",
  "auth": "OAuth 2.0",
  "managed": "no",
  "managedSrc": "https://docs.composio.dev/toolkits/xero",
  "difficulty": "hard",
  "oneLiner": "Uncertified apps cap at 50 orgs; free tier caps at 5",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Xero app certification (required for the Plus tier and above, over 50 connections)",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.xero.com/pricing"
  },
  "cost": {
   "text": "Starter free (5 connections); Core $35 AUD/mo (50); Plus $245 AUD/mo (1,000), tax exclusive",
   "ev": "docs",
   "src": "https://developer.xero.com/pricing"
  },
  "limits": [
   {
    "text": "Before certification: new apps start on Starter with 5 connections, and Core allows up to 50.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/guides/oauth2/limits/"
   },
   {
    "text": "Each Xero organisation can connect at most five uncertified apps.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/guides/oauth2/limits/"
   },
   {
    "text": "Starter allows 1,000 API calls per day per organisation; higher tiers allow 5,000.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/guides/oauth2/limits/"
   },
   {
    "text": "All tiers: 60 calls per minute and 5 concurrent calls per organisation.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/guides/oauth2/limits/"
   }
  ],
  "requirements": [
   {
    "text": "Plus, Advanced and Enterprise tiers require app certification.",
    "ev": "docs",
    "src": "https://developer.xero.com/pricing"
   },
   {
    "text": "Core and above require a payment method on file.",
    "ev": "docs",
    "src": "https://developer.xero.com/pricing"
   },
   {
    "text": "Certification requires the offline_access scope.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "text": "Certification needs a connect/disconnect settings page showing the connected tenant name and status.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "text": "The app name cannot include the word Xero.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "text": "Listing on the Xero App Store requires the Plus tier or higher.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   }
  ],
  "gotchas": [
   {
    "text": "Composio has no managed Xero app, so you must bring your own credentials.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/xero"
   },
   {
    "text": "Data from Xero's APIs may not be used to train AI/ML models.",
    "ev": "docs",
    "src": "https://developer.xero.com/pricing"
   },
   {
    "text": "Access tokens last 30 minutes; refresh tokens last 60 days and rotate on each use.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "text": "Apps created on or after 2 March 2026 use Xero's new granular scopes.",
    "ev": "docs",
    "src": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "text": "Redirect URI must use https with no trailing slash.",
    "ev": "docs",
    "src": "https://composio.dev/auth/xero"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Web app at developer.xero.com with the Composio redirect URI",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Copy the Client ID and generate a client secret",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your own Xero credentials and scopes",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add a payment method to move to Core if you need more than 5 connections",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Check your integration against Xero's certification checkpoints",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Submit for certification before you pass 50 connections",
    "time": "1 h"
   }
  ],
  "portal": "https://developer.xero.com",
  "docs": "https://developer.xero.com/documentation/guides/oauth2/limits/",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback (https, no trailing slash).",
  "sources": [
   {
    "t": "Composio Xero toolkit",
    "u": "https://docs.composio.dev/toolkits/xero"
   },
   {
    "t": "Composio: Xero OAuth credentials",
    "u": "https://composio.dev/auth/xero"
   },
   {
    "t": "Xero OAuth 2.0 API limits",
    "u": "https://developer.xero.com/documentation/guides/oauth2/limits/"
   },
   {
    "t": "Xero developer pricing",
    "u": "https://developer.xero.com/pricing"
   },
   {
    "t": "Xero certification checkpoints",
    "u": "https://developer.xero.com/documentation/xero-app-store/app-partner-guides/certification-checkpoints/"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Xero does not publish how long certification takes.",
   "Granular scope names were not checked against Composio's default Xero scopes."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "quickbooks",
  "name": "QuickBooks Online",
  "slug": "quickbooks",
  "category": "Commerce & finance",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/quickbooks",
  "difficulty": "medium",
  "oneLiner": "Production keys need an approved app assessment",
  "setup": {
   "time": "~1.5 h",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Intuit App Assessment Questionnaire, approved before production keys are shown",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
  },
  "cost": {
   "text": "$0 on the Builder tier; Silver is $300 USD/month",
   "ev": "docs",
   "src": "https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq"
  },
  "limits": [
   {
    "text": "Before approval: you only have development keys; the production Show Credentials switch stays hidden.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
   },
   {
    "text": "Builder tier: 500,000 CorePlus API calls per month, and calls above that are blocked.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq"
   }
  ],
  "requirements": [
   {
    "text": "Production app details need EULA and privacy policy URLs, host domain, launch, disconnect and connect/reconnect URLs.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
   },
   {
    "text": "Production redirect URIs must use https, and IP addresses are not allowed.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/set-redirect-uri"
   },
   {
    "text": "You must get the App Assessment Questionnaire approved to see production credentials.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
   },
   {
    "text": "Listed apps must be on the Silver tier or above to avoid delisting.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens last 1 hour; refresh tokens expire after 100 days unused.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/faq"
   },
   {
    "text": "The refresh token value rotates every 24 hours, so always store the latest one.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/faq"
   },
   {
    "text": "Refresh tokens have a hard limit of 5 years, after which users must reconnect.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/faq"
   },
   {
    "text": "Sandbox and production redirect URIs are set separately, and sandbox redirect URIs can use localhost without HTTPS.",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/set-redirect-uri",
    "fixed": true
   },
   {
    "text": "The com.intuit.quickbooks.payment scope can cause Cloudflare Error 1016 if Payments is not enabled.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/quickbooks"
   },
   {
    "text": "Sandbox connections need https://sandbox-quickbooks.api.intuit.com as the base URL in Composio.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/quickbooks"
   },
   {
    "text": "The Intuit App Partner Program is available only to partners in the US, UK, Australia and Canada (excluding Quebec).",
    "ev": "docs",
    "src": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an app in the Intuit Developer Portal and add the Composio redirect URI",
    "time": "10 min"
   },
   {
    "who": "agent",
    "t": "Draft the EULA and privacy policy pages",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Fill in production App Details (URLs, categories, hosting regions)",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Test connect, disconnect and reconnect with a sandbox company",
    "time": "15 min"
   },
   {
    "who": "you",
    "t": "Complete the App Assessment Questionnaire under Production > Compliance",
    "time": "40 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with the production Client ID and secret",
    "time": "5 min"
   }
  ],
  "portal": "https://developer.intuit.com/app/developer/dashboard",
  "docs": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback to the Production redirect URIs tab (https only).",
  "sources": [
   {
    "t": "Composio QuickBooks toolkit",
    "u": "https://docs.composio.dev/toolkits/quickbooks"
   },
   {
    "t": "Intuit: Publish your app",
    "u": "https://developer.intuit.com/app/developer/qbo/docs/go-live/publish-app"
   },
   {
    "t": "Intuit OAuth FAQ",
    "u": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/faq"
   },
   {
    "t": "Intuit: Set redirect URIs",
    "u": "https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/set-redirect-uri"
   },
   {
    "t": "Intuit App Partner Program FAQ",
    "u": "https://developer.intuit.com/app/developer/qbo/docs/get-started/partner-faq"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Intuit does not state how long questionnaire review takes.",
   "The 40-minute questionnaire estimate is ours, not Intuit's.",
   "Portal URL path not confirmed; docs say My Hub > App dashboard."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "stripe",
  "name": "Stripe",
  "slug": "stripe",
  "category": "Commerce & finance",
  "auth": "OAuth 2.0 (Connect) or API key",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/stripe",
  "difficulty": "medium",
  "oneLiner": "Connect OAuth is legacy; Stripe Apps review takes 4 days",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review in Stripe's Connect OAuth setup docs; Stripe Apps need App Marketplace review",
   "wait": "4 business days (Stripe Apps)",
   "ev": "docs",
   "src": "https://docs.stripe.com/stripe-apps/publish-app"
  },
  "cost": {
   "text": "No fee stated for Connect OAuth or Stripe Apps setup",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Connect OAuth with read_write cannot connect to Standard accounts controlled by another platform.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-changes-for-standard-platforms"
   },
   {
    "text": "Stripe Apps before publishing: external testing is capped at 25 testers per app.",
    "ev": "docs",
    "src": "https://docs.stripe.com/stripe-apps/test-app"
   }
  ],
  "requirements": [
   {
    "text": "Each redirect URI must be listed in Connect OAuth settings, and live mode redirect URIs must use HTTPS.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-reference"
   },
   {
    "text": "Stripe Apps review needs test credentials, testing guidance and the live-mode public install URL.",
    "ev": "docs",
    "src": "https://docs.stripe.com/stripe-apps/publish-app"
   },
   {
    "text": "Your business cannot be on Stripe's prohibited and restricted businesses list to publish an app.",
    "ev": "docs",
    "src": "https://docs.stripe.com/stripe-apps/publish-app"
   }
  ],
  "gotchas": [
   {
    "text": "Stripe says OAuth is not recommended for new Connect platforms.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-standard-accounts"
   },
   {
    "text": "New Connect extensions can no longer be built; Stripe Apps replaced them.",
    "ev": "docs",
    "src": "https://docs.stripe.com/building-extensions"
   },
   {
    "text": "Only extensions can use the read_only scope, so new platforms get read_write.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-changes-for-standard-platforms"
   },
   {
    "text": "The Connect token call uses your platform's secret API key as client_secret.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-reference"
   },
   {
    "text": "Each client_id is either live or test, so use the matching one per environment.",
    "ev": "docs",
    "src": "https://docs.stripe.com/connect/oauth-standard-accounts"
   },
   {
    "text": "Stripe Apps OAuth access tokens expire in 1 hour; refresh tokens last 1 year and roll on use.",
    "ev": "docs",
    "src": "https://docs.stripe.com/stripe-apps/api-authentication/oauth"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In the Stripe Dashboard, enable OAuth under Connect onboarding options",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URI and copy the ca_ client_id",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with the client_id and your secret key",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Test with a test-mode client_id before switching to live",
    "time": "15 min"
   },
   {
    "who": "agent",
    "t": "Check whether you need Stripe Apps OAuth instead, given Connect OAuth is not recommended",
    "time": "10 min"
   }
  ],
  "portal": "https://dashboard.stripe.com/settings/connect/onboarding-options/oauth",
  "docs": "https://docs.stripe.com/connect/oauth-standard-accounts",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback to your Connect OAuth redirect URIs (HTTPS in live mode).",
  "sources": [
   {
    "t": "Composio Stripe toolkit",
    "u": "https://docs.composio.dev/toolkits/stripe"
   },
   {
    "t": "Composio: Stripe OAuth credentials",
    "u": "https://composio.dev/auth/stripe"
   },
   {
    "t": "Stripe OAuth with Standard accounts",
    "u": "https://docs.stripe.com/connect/oauth-standard-accounts"
   },
   {
    "t": "Stripe Connect OAuth reference",
    "u": "https://docs.stripe.com/connect/oauth-reference"
   },
   {
    "t": "Stripe OAuth changes for Standard platforms",
    "u": "https://docs.stripe.com/connect/oauth-changes-for-standard-platforms"
   },
   {
    "t": "Stripe legacy Connect extensions",
    "u": "https://docs.stripe.com/building-extensions"
   },
   {
    "t": "Stripe Apps OAuth 2.0",
    "u": "https://docs.stripe.com/stripe-apps/api-authentication/oauth"
   },
   {
    "t": "Stripe Apps publish",
    "u": "https://docs.stripe.com/stripe-apps/publish-app"
   },
   {
    "t": "Stripe Apps external testing",
    "u": "https://docs.stripe.com/stripe-apps/test-app"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Composio's own-credentials guide uses Connect OAuth; whether Composio accepts Stripe Apps OAuth credentials is not documented.",
   "Whether a Connect platform needs Stripe review before live-mode OAuth was not confirmed.",
   "Composio's guide suggests read_only,read_write scopes, which conflicts with Stripe limiting read_only to extensions."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "dropbox",
  "name": "Dropbox",
  "slug": "dropbox",
  "category": "Files & docs",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/dropbox",
  "difficulty": "medium",
  "oneLiner": "Apply for production within 2 weeks of 50 users",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Dropbox production status approval",
   "wait": "not stated; review starts after 50 linked users",
   "ev": "docs",
   "src": "https://www.dropbox.com/developers/reference/developer-guide"
  },
  "cost": {
   "text": "No fee stated",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before approval: a development app links only your own account until you click Enable additional users.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "Before approval: a development app can link at most 500 Dropbox users.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "After 50 linked users you have two weeks to get production approval, or new links are frozen.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   }
  ],
  "requirements": [
   {
    "text": "The app must follow Dropbox's branding guidelines and terms, or production is rejected.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "Request the least privileged permissions; Dropbox reviews scope breadth at production.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "The production application asks how the app uses the API and for an app icon.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "The app name cannot include Dropbox, start with drop, or use DBX or DB.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/branding-guide"
   }
  ],
  "gotchas": [
   {
    "text": "Production review does not start until 50 linked users unless you request early review.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "A frozen app can only be unfrozen by getting production approval, not by unlinking users.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "You cannot change the app name after production approval.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "text": "Access tokens are short-lived; add token_access_type=offline to get a refresh token.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/oauth-guide"
   },
   {
    "text": "Redirect URIs must exactly match a registered value in the App Console.",
    "ev": "docs",
    "src": "https://www.dropbox.com/developers/reference/oauth-guide"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a Scoped access app in the Dropbox App Console",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URI and enable only needed permissions",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with the app key and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Click Enable additional users so others can connect",
    "time": "1 min"
   },
   {
    "who": "agent",
    "t": "Draft the production application describing API use",
    "time": "20 min"
   },
   {
    "who": "you",
    "t": "Apply for production status before or soon after 50 users",
    "time": "15 min"
   }
  ],
  "portal": "https://www.dropbox.com/developers/apps",
  "docs": "https://www.dropbox.com/developers/reference/developer-guide",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback under OAuth 2 Redirect URIs.",
  "sources": [
   {
    "t": "Composio Dropbox toolkit",
    "u": "https://docs.composio.dev/toolkits/dropbox"
   },
   {
    "t": "Composio: Dropbox OAuth credentials",
    "u": "https://composio.dev/auth/dropbox"
   },
   {
    "t": "Dropbox developer guide",
    "u": "https://www.dropbox.com/developers/reference/developer-guide"
   },
   {
    "t": "Dropbox OAuth guide",
    "u": "https://www.dropbox.com/developers/reference/oauth-guide"
   },
   {
    "t": "Dropbox branding guide",
    "u": "https://www.dropbox.com/developers/reference/branding-guide"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "Dropbox does not publish how long production review takes."
  ],
  "checked": "2026-10-29",
  "waitShort": "Not stated"
 },
 {
  "id": "box",
  "name": "Box",
  "slug": "box",
  "category": "Files & docs",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/box",
  "difficulty": "easy",
  "oneLiner": "No review needed, but some enterprises must enable it",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Optional Box Partner team review to list in Box Integrations",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://github.com/box/developer.box.com/blob/main/content/guides/applications/integrations/index.md"
  },
  "cost": {
   "text": "No fee stated",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "If an enterprise turns on Disable unpublished apps by default, its admin must enable your OAuth 2.0 app first.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/authorization/index.md"
   }
  ],
  "requirements": [
   {
    "text": "Redirect URIs must be HTTPS, or HTTP only for localhost or loopback addresses.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/oauth2/oauth2-setup.md"
   },
   {
    "text": "Box Integrations listing accepts only OAuth 2.0 apps that are finished and production-ready.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/applications/integrations/index.md"
   }
  ],
  "gotchas": [
   {
    "text": "You cannot change the authentication method after creating the app.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/oauth2/oauth2-setup.md"
   },
   {
    "text": "Refresh tokens are single-use and expire after 60 days, after which users must re-authorize.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/tokens/refresh.md"
   },
   {
    "text": "Admins enable an OAuth 2.0 app by entering its client ID under Platform > Platform Apps.",
    "ev": "docs",
    "src": "https://support.box.com/hc/en-us/articles/360044196653-Managing-custom-apps"
   },
   {
    "text": "With Disable unpublished platform apps by default on, Box disables unpublished platform apps whose status an admin never manually changed; admins can re-enable them in Platform Apps.",
    "ev": "docs",
    "src": "https://support.box.com/hc/en-us/articles/49348283011731-Enterprise-Settings-Platform-Apps",
    "fixed": true
   },
   {
    "text": "Redirect URIs are checked by exact match.",
    "ev": "docs",
    "src": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/oauth2/oauth2-setup.md"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In the Box Developer Console, create a Platform App with User Authentication (OAuth 2.0)",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URI and select scopes on the Configuration tab",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create a Composio auth config with your Box client ID and secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Write admin instructions for enabling your client ID in enterprise accounts",
    "time": "10 min"
   },
   {
    "who": "you",
    "t": "Optionally submit the app for Box Integrations from the Publishing tab",
    "time": "30 min"
   }
  ],
  "portal": "https://app.box.com/developers/console",
  "docs": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/oauth2/oauth2-setup.md",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback (HTTPS, exact match).",
  "sources": [
   {
    "t": "Composio Box toolkit",
    "u": "https://docs.composio.dev/toolkits/box"
   },
   {
    "t": "Box: Setup with OAuth 2.0 (docs source)",
    "u": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/oauth2/oauth2-setup.md"
   },
   {
    "t": "Box: Authorization (docs source)",
    "u": "https://github.com/box/developer.box.com/blob/main/content/guides/authorization/index.md"
   },
   {
    "t": "Box: Publish your app (docs source)",
    "u": "https://github.com/box/developer.box.com/blob/main/content/guides/getting-started/publish-app.md"
   },
   {
    "t": "Box: Integrations (docs source)",
    "u": "https://github.com/box/developer.box.com/blob/main/content/guides/applications/integrations/index.md"
   },
   {
    "t": "Box: Refresh tokens (docs source)",
    "u": "https://github.com/box/developer.box.com/blob/main/content/guides/authentication/tokens/refresh.md"
   },
   {
    "t": "Box support: Managing custom apps",
    "u": "https://support.box.com/hc/en-us/articles/360044196653-Managing-custom-apps"
   },
   {
    "t": "Box support: Enterprise settings, platform apps",
    "u": "https://support.box.com/hc/en-us/articles/49348283011731-Enterprise-Settings-Platform-Apps"
   },
   {
    "t": "Composio custom auth configs",
    "u": "https://docs.composio.dev/docs/auth-configuration/custom-auth-configs"
   }
  ],
  "unverified": [
   "developer.box.com did not resolve from this environment; Box facts come from Box's official docs repo on GitHub, which may lag the live site.",
   "Box does not state how long Box Integrations review takes.",
   "Composio has no Box own-credentials guide; portal URL app.box.com/developers/console not fetched."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "asana",
  "name": "Asana",
  "slug": "asana",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/asana",
  "difficulty": "medium",
  "oneLiner": "Submission needed to serve workspaces beyond your own.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": true,
   "what": "Asana app submission review (needed to serve any workspace or list in the App Directory)",
   "wait": "Initial response within one week",
   "ev": "docs",
   "src": "https://developers.asana.com/docs/publish-your-app"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Before submission, Asana says the app is for your own organization, development, or internal tools.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/publish-your-app"
   },
   {
    "text": "Rate limit is per token: 150 requests/min on free domains, 1,500/min on paid domains.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/rate-limits"
   },
   {
    "text": "Search API is limited to 60 requests per minute.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/rate-limits"
   }
  ],
  "requirements": [
   {
    "text": "Non-native apps must use an https redirect URL.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/oauth"
   },
   {
    "text": "Submission requires a privacy policy URL and a support page URL.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/publish-your-app"
   },
   {
    "text": "Submission requires an app icon, images, a short description and a 250+ character long description.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/publish-your-app"
   },
   {
    "text": "Apps submitted to the App Directory must be shared to Any workspace.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/share-your-app"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens typically last one hour (3600 seconds); refresh tokens are long-lived and are used to get new access tokens when old ones expire.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/oauth",
    "fixed": true
   },
   {
    "text": "Turning on Full permissions means you cannot request specific scopes.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/oauth"
   },
   {
    "text": "Scope requests are not additive; always send the full set you need.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/oauth"
   },
   {
    "text": "The app must be available in the user's workspace before they can authorize.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/oauth"
   },
   {
    "text": "Enterprise admins can control which apps are allowed from the admin console.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/share-your-app"
   },
   {
    "text": "Switching from Any workspace to Specific workspace blocks new authorizations from other workspaces.",
    "ev": "docs",
    "src": "https://developers.asana.com/docs/share-your-app"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create an app at app.asana.com/0/my-apps",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URL and choose permission scopes",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Set distribution to Any workspace in Manage distribution",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Draft the privacy policy, support page and listing text",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Submit for review in the developer console",
    "time": "15 min"
   }
  ],
  "portal": "https://app.asana.com/0/my-apps",
  "docs": "https://developers.asana.com/docs/oauth",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "Asana OAuth",
    "u": "https://developers.asana.com/docs/oauth"
   },
   {
    "t": "Asana manage distribution",
    "u": "https://developers.asana.com/docs/share-your-app"
   },
   {
    "t": "Asana submit your app",
    "u": "https://developers.asana.com/docs/publish-your-app"
   },
   {
    "t": "Asana rate limits",
    "u": "https://developers.asana.com/docs/rate-limits"
   },
   {
    "t": "Composio Asana toolkit",
    "u": "https://docs.composio.dev/toolkits/asana"
   },
   {
    "t": "Composio Asana OAuth guide",
    "u": "https://composio.dev/auth/asana"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Asana's distribution page says Any workspace lets any workspace authorize with the URL, while the submit page says submission is needed beyond your own organization; which one is enforced was not confirmed.",
   "No fee for submission is mentioned in the docs."
  ],
  "checked": "2026-10-29",
  "waitShort": "~1 week"
 },
 {
  "id": "trello",
  "name": "Trello",
  "slug": "trello",
  "category": "Productivity",
  "auth": "OAuth 1.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/trello",
  "difficulty": "easy",
  "oneLiner": "Your API key comes from a Power-Up you create.",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review documented for API keys",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "300 requests per 10 seconds per API key and 100 per 10 seconds per token.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/"
   },
   {
    "text": "Requests to /1/members/ are limited to 100 per 900 seconds.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/"
   }
  ],
  "requirements": [
   {
    "text": "An API key is tied to a Power-Up created in the admin portal at trello.com/apps/admin.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "text": "The Power-Up must be owned by a Trello Workspace.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/power-ups/managing-apps/"
   },
   {
    "text": "The app form asks for an email, a support email and an author name.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/power-ups/managing-apps/"
   },
   {
    "text": "OAuth 1.0 signing needs the application secret from the Trello Auth tab.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   }
  ],
  "gotchas": [
   {
    "text": "If the API key has no allowed origins set, no redirect URL works.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "text": "Redirects to a return_url not in allowed origins are blocked.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "text": "Token expiration can be 1hour, 1day, 30days or never.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "text": "Scopes are only read, write and account.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "text": "By default only admins of the owning Workspace can manage the app.",
    "ev": "docs",
    "src": "https://developer.atlassian.com/cloud/trello/guides/power-ups/managing-apps/"
   },
   {
    "text": "Composio's Trello toolkit uses OAuth 1, not OAuth 2.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/trello"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Create a new app (Power-Up) in trello.com/power-ups/admin",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Generate an API key and copy the secret on the Trello Auth tab",
    "time": "2 min"
   },
   {
    "who": "you",
    "t": "Add Composio's callback origin to the key's allowed origins",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio OAuth 1 auth config with the key and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Connect a test account and confirm a board read works",
    "time": "5 min"
   }
  ],
  "portal": "https://trello.com/power-ups/admin",
  "docs": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/",
  "callbackNote": "Add the redirect URI shown in the Composio dashboard to the API key's Allowed origins; Trello blocks any origin not listed.",
  "sources": [
   {
    "t": "Trello authorization",
    "u": "https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/"
   },
   {
    "t": "Trello rate limits",
    "u": "https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/"
   },
   {
    "t": "Trello managing apps",
    "u": "https://developer.atlassian.com/cloud/trello/guides/power-ups/managing-apps/"
   },
   {
    "t": "Composio Trello toolkit",
    "u": "https://docs.composio.dev/toolkits/trello"
   },
   {
    "t": "Composio Trello API key guide",
    "u": "https://composio.dev/auth/trello"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Trello OAuth 2.0 client rules and workspace restrictions; the OAuth 2.0 client configuration page returned 404.",
   "Exact origin Composio needs in Allowed origins is not documented by Composio for Trello.",
   "Public Power-Up directory review is not described in the fetched pages."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "airtable",
  "name": "Airtable",
  "slug": "airtable",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/airtable",
  "difficulty": "easy",
  "oneLiner": "Add privacy and terms URLs or others can't authorize.",
  "setup": {
   "time": "~20 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review documented; privacy policy and terms URLs required before sharing",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://airtable.com/developers/web/guides/oauth-integrations"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Without privacy policy and terms of service URLs, other users cannot authorize the integration.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/guides/oauth-integrations"
   },
   {
    "text": "API limit is 5 requests per second per base; a 429 means waiting 30 seconds.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/rate-limits"
   },
   {
    "text": "Keep refresh requests below 10 per second per token.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference",
    "fixed": true
   }
  ],
  "requirements": [
   {
    "text": "Register at airtable.com/create/oauth with a unique name and a valid redirect URL.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/guides/oauth-integrations"
   },
   {
    "text": "Redirect URIs must use HTTPS, except localhost.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "text": "Privacy policy URL and terms of service URL are required before sharing.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/guides/oauth-integrations"
   },
   {
    "text": "Generate a client secret if token requests come from a server.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/guides/oauth-integrations"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens expire after 60 minutes.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "text": "Refresh tokens are valid for 60 days; unused ones force re-authorization.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "text": "Refreshing invalidates the previous access and refresh tokens.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "text": "The code exchange must happen within 10 minutes of the authorization request.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "text": "Users choose which bases to grant and can change that at any time.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/guides/oauth-integrations"
   },
   {
    "text": "Frequent invalid refresh requests may get the token revoked.",
    "ev": "docs",
    "src": "https://airtable.com/developers/web/api/oauth-reference"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Register a new OAuth integration at airtable.com/create/oauth",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Add the Composio redirect URL, pick scopes and generate a client secret",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft a privacy policy and terms of service",
    "time": "30 min"
   },
   {
    "who": "you",
    "t": "Add support email, privacy policy and terms URLs to the integration",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   }
  ],
  "portal": "https://airtable.com/create/oauth",
  "docs": "https://airtable.com/developers/web/guides/oauth-integrations",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "Airtable OAuth integrations guide",
    "u": "https://airtable.com/developers/web/guides/oauth-integrations"
   },
   {
    "t": "Airtable OAuth reference",
    "u": "https://airtable.com/developers/web/api/oauth-reference"
   },
   {
    "t": "Airtable rate limits",
    "u": "https://airtable.com/developers/web/api/rate-limits"
   },
   {
    "t": "Composio Airtable toolkit",
    "u": "https://docs.composio.dev/toolkits/airtable"
   },
   {
    "t": "Composio Airtable OAuth guide",
    "u": "https://composio.dev/auth/airtable"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "No user cap or plan requirement for unshared integrations is stated in the docs."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "clickup",
  "name": "ClickUp",
  "slug": "clickup",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/clickup",
  "difficulty": "easy",
  "oneLiner": "Only Workspace owners or admins can create OAuth apps.",
  "setup": {
   "time": "~10 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review mentioned in ClickUp auth docs",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.clickup.com/docs/authentication"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Rate limit is per token: 100 requests/min on Free, Unlimited and Business plans.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/rate-limits"
   },
   {
    "text": "Business Plus gets 1,000 and Enterprise 10,000 requests per minute per token.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/rate-limits"
   }
  ],
  "requirements": [
   {
    "text": "Only Workspace owners or admins can create OAuth apps.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/authentication"
   },
   {
    "text": "Create the app under Settings > Apps with a name and redirect URL.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/authentication"
   }
  ],
  "gotchas": [
   {
    "text": "Access tokens currently do not expire, but ClickUp says this may change.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/authentication"
   },
   {
    "text": "Non-SSL redirect URIs may not be supported in the future.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/authentication"
   },
   {
    "text": "Users pick one or more Workspaces at authorization; re-authorize to change them.",
    "ev": "docs",
    "src": "https://developer.clickup.com/docs/authentication"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "In ClickUp, open Settings > Apps and click Create new app",
    "time": "3 min"
   },
   {
    "who": "you",
    "t": "Name the app and add the Composio redirect URL",
    "time": "2 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Connect a test account and select the Workspaces to authorize",
    "time": "3 min"
   }
  ],
  "portal": "https://app.clickup.com",
  "docs": "https://developer.clickup.com/docs/authentication",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "ClickUp authentication",
    "u": "https://developer.clickup.com/docs/authentication"
   },
   {
    "t": "ClickUp rate limits",
    "u": "https://developer.clickup.com/docs/rate-limits"
   },
   {
    "t": "Composio ClickUp toolkit",
    "u": "https://docs.composio.dev/toolkits/clickup"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "ClickUp docs do not mention scopes or a review process.",
   "Composio's redirect URI for ClickUp is taken from its other OAuth guides; no ClickUp-specific Composio guide exists (404)."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "monday",
  "name": "Monday.com",
  "slug": "monday",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/monday",
  "difficulty": "medium",
  "oneLiner": "A workspace admin must install the app before users connect.",
  "setup": {
   "time": "~30 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "Marketplace review only if you want a listing; sharing a public app by link works without it",
   "wait": "Initial response within 72 business hours",
   "ev": "docs",
   "src": "https://developer.monday.com/apps/docs/submit-your-app"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Private apps can only be used inside the account that built them.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/install-and-share-your-apps"
   },
   {
    "text": "Shared apps without monday approval show a banner saying monday hasn't vetted them.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/install-and-share-your-apps"
   },
   {
    "text": "You can restrict a shared app to specific monday accounts.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/install-and-share-your-apps"
   }
  ],
  "requirements": [
   {
    "text": "Create the app in the Developer Center; viewers cannot access it.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/the-developer-center"
   },
   {
    "text": "Accept the developer terms on the Share tab to get a shareable install link.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/install-and-share-your-apps"
   },
   {
    "text": "Requested scopes must match the scopes configured on the app.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "text": "Redirect URI must match one of the redirect URLs added to the app.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "text": "Marketplace apps are reviewed on product, engineering, security, privacy, content, assets, support, documentation and legal.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/submit-your-app",
    "fixed": true
   }
  ],
  "gotchas": [
   {
    "text": "If the app is not installed in the workspace, users see 'App is not installed'.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/monday"
   },
   {
    "text": "A workspace admin installs the app once; then users can connect.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/monday"
   },
   {
    "text": "Legacy OAuth tokens do not expire and there are no refresh tokens.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "text": "A newer OAuth 2.1 flow adds expiring access tokens and refresh tokens.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "text": "The authorization code is valid for only 10 minutes.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "text": "New apps built mainly with no-code tools or AI 'vibe code' are not eligible for the marketplace.",
    "ev": "docs",
    "src": "https://developer.monday.com/apps/docs/submit-your-app"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Open Developers from your monday profile menu and click Create app",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "On the OAuth tab, set scopes and add the Composio redirect URL",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "On the Share tab, accept developer terms and copy the install link",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Have each customer's admin install the app via the link",
    "time": "5 min"
   },
   {
    "who": "agent",
    "t": "Draft marketplace listing and review checklist answers if listing",
    "time": "1 hr"
   }
  ],
  "portal": "https://developer.monday.com/apps/docs/the-developer-center",
  "docs": "https://developer.monday.com/apps/docs/oauth",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "monday OAuth",
    "u": "https://developer.monday.com/apps/docs/oauth"
   },
   {
    "t": "monday install and share apps",
    "u": "https://developer.monday.com/apps/docs/install-and-share-your-apps"
   },
   {
    "t": "monday submit to marketplace",
    "u": "https://developer.monday.com/apps/docs/submit-your-app"
   },
   {
    "t": "monday Developer Center",
    "u": "https://developer.monday.com/apps/docs/the-developer-center"
   },
   {
    "t": "Composio Monday toolkit",
    "u": "https://docs.composio.dev/toolkits/monday"
   },
   {
    "t": "Composio Monday OAuth guide",
    "u": "https://composio.dev/auth/monday"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Developer Center has no standalone URL; it opens from the profile menu > Developers.",
   "Full marketplace review duration beyond the first response is not stated.",
   "Which OAuth flow (legacy or 2.1) Composio uses was not confirmed."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "calendly",
  "name": "Calendly",
  "slug": "calendly",
  "category": "Productivity",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/calendly",
  "difficulty": "easy",
  "oneLiner": "Self-serve; use a Production app, HTTPS redirect.",
  "setup": {
   "time": "~15 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review or application step in the OAuth app docs",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://developer.calendly.com/creating-an-oauth-app"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Rate limit is per user: 50 requests/min on Free plans, 500/min on paid plans.",
    "ev": "docs",
    "src": "https://developer.calendly.com/api-docs/overview/rate-limits"
   },
   {
    "text": "Only 8 OAuth tokens per user can be requested within one minute.",
    "ev": "docs",
    "src": "https://developer.calendly.com/api-docs/overview/rate-limits"
   },
   {
    "text": "Webhook subscriptions need the user on a paid Standard, Teams or Enterprise plan.",
    "ev": "docs",
    "src": "https://developer.calendly.com/docs/getting-started/frequently-asked-questions"
   }
  ],
  "requirements": [
   {
    "text": "Sign up for a developer account with GitHub or Google; it is separate from your Calendly user account.",
    "ev": "docs",
    "src": "https://developer.calendly.com/creating-an-oauth-app"
   },
   {
    "text": "Production apps must use an HTTPS redirect URI; Sandbox allows http localhost.",
    "ev": "docs",
    "src": "https://developer.calendly.com/creating-an-oauth-app"
   },
   {
    "text": "Calendly recommends a Sandbox app for development and a second app for Production.",
    "ev": "docs",
    "src": "https://developer.calendly.com/creating-an-oauth-app"
   }
  ],
  "gotchas": [
   {
    "text": "The client secret and webhook signing key are shown only once at creation.",
    "ev": "docs",
    "src": "https://developer.calendly.com/creating-an-oauth-app"
   },
   {
    "text": "Access tokens expire after 2 hours.",
    "ev": "docs",
    "src": "https://developer.calendly.com/api-docs/calendly-o-auth/o-auth/post-oauth-refresh-token"
   },
   {
    "text": "Refresh tokens are single-use and rotate on every refresh.",
    "ev": "docs",
    "src": "https://developer.calendly.com/docs/authentication/refresh-token-rotation-guide"
   },
   {
    "text": "Tokens are revoked if the user changes login email, password or login method.",
    "ev": "docs",
    "src": "https://developer.calendly.com/docs/getting-started/frequently-asked-questions"
   },
   {
    "text": "Users cannot approve individual scopes; the app's configured scopes are requested.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/calendly"
   },
   {
    "text": "A few endpoints require the Enterprise plan.",
    "ev": "docs",
    "src": "https://developer.calendly.com/docs/getting-started/frequently-asked-questions"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Sign up at developer.calendly.com and open My Apps",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Create a Web app in the Production environment with the Composio redirect URI",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Select scopes and copy the client ID and secret immediately",
    "time": "3 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   }
  ],
  "portal": "https://developer.calendly.com",
  "docs": "https://developer.calendly.com/creating-an-oauth-app",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "Calendly creating an OAuth app",
    "u": "https://developer.calendly.com/creating-an-oauth-app"
   },
   {
    "t": "Calendly rate limits",
    "u": "https://developer.calendly.com/api-docs/overview/rate-limits"
   },
   {
    "t": "Calendly FAQ",
    "u": "https://developer.calendly.com/docs/getting-started/frequently-asked-questions"
   },
   {
    "t": "Calendly refresh token rotation",
    "u": "https://developer.calendly.com/docs/authentication/refresh-token-rotation-guide"
   },
   {
    "t": "Calendly get access token",
    "u": "https://developer.calendly.com/api-docs/calendly-o-auth/o-auth/post-oauth-refresh-token"
   },
   {
    "t": "Composio Calendly toolkit",
    "u": "https://docs.composio.dev/toolkits/calendly"
   },
   {
    "t": "Composio Calendly OAuth guide",
    "u": "https://composio.dev/auth/calendly"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Docs do not say whether Sandbox apps can authorize real customer accounts.",
   "No application or approval step was found in the current docs, contrary to the brief's note."
  ],
  "checked": "2026-10-29"
 },
 {
  "id": "mailchimp",
  "name": "Mailchimp",
  "slug": "mailchimp",
  "category": "Social & marketing",
  "auth": "OAuth 2.0",
  "managed": "yes",
  "managedSrc": "https://docs.composio.dev/toolkits/mailchimp",
  "difficulty": "easy",
  "oneLiner": "Tokens never expire; only 10 simultaneous connections.",
  "setup": {
   "time": "~10 min",
   "ev": "est"
  },
  "review": {
   "required": false,
   "what": "No review to register an app; OAuth is required to list in the Mailchimp Marketplace",
   "wait": "not stated",
   "ev": "docs",
   "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication/oauth-2"
  },
  "cost": {
   "text": "$0",
   "ev": "est",
   "src": null
  },
  "limits": [
   {
    "text": "Limit of 10 simultaneous connections per user; there is no way to raise it.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/rate-limits-and-timeouts"
   },
   {
    "text": "API calls time out after 120 seconds.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/rate-limits-and-timeouts"
   },
   {
    "text": "Some Composio Mailchimp tools need at least the Essentials plan.",
    "ev": "docs",
    "src": "https://docs.composio.dev/toolkits/mailchimp"
   }
  ],
  "requirements": [
   {
    "text": "Register the app on the Registered Apps page in your Mailchimp account.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/build/start-developing/set-up-an-oauth-app"
   },
   {
    "text": "HTTPS for the redirect URI is strongly recommended but not enforced.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication/oauth-2"
   },
   {
    "text": "Delete stored tokens when a user disconnects or uninstalls your app.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication/oauth-2"
   }
  ],
  "gotchas": [
   {
    "text": "The client secret is shown only once at registration.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/build/start-developing/set-up-an-oauth-app"
   },
   {
    "text": "Access tokens never expire and there is no refresh token.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication/oauth-2"
   },
   {
    "text": "A token is revoked if the authorizing user is removed from the account.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication"
   },
   {
    "text": "API access is bounded by the authorizing user's role; use an admin where possible.",
    "ev": "docs",
    "src": "https://mailchimp.com/developer/marketing/api-concepts/authentication"
   }
  ],
  "steps": [
   {
    "who": "you",
    "t": "Open Registered Apps in Mailchimp and click Register An App",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Enter the Composio redirect URI and copy the client ID and secret",
    "time": "3 min"
   },
   {
    "who": "agent",
    "t": "Create the Composio auth config with the client ID and secret",
    "time": "5 min"
   },
   {
    "who": "you",
    "t": "Connect a test account with an admin user",
    "time": "3 min"
   }
  ],
  "portal": "https://us1.admin.mailchimp.com/account/oauth2/",
  "docs": "https://mailchimp.com/developer/marketing/build/start-developing/set-up-an-oauth-app",
  "callbackNote": "Add Composio's redirect URI https://backend.composio.dev/api/v3/toolkits/auth/callback",
  "sources": [
   {
    "t": "Mailchimp set up an OAuth app",
    "u": "https://mailchimp.com/developer/marketing/build/start-developing/set-up-an-oauth-app"
   },
   {
    "t": "Mailchimp OAuth 2",
    "u": "https://mailchimp.com/developer/marketing/api-concepts/authentication/oauth-2"
   },
   {
    "t": "Mailchimp authentication",
    "u": "https://mailchimp.com/developer/marketing/api-concepts/authentication"
   },
   {
    "t": "Mailchimp rate limits",
    "u": "https://mailchimp.com/developer/marketing/api-concepts/rate-limits-and-timeouts"
   },
   {
    "t": "Composio Mailchimp toolkit",
    "u": "https://docs.composio.dev/toolkits/mailchimp"
   },
   {
    "t": "Composio managed vs custom auth",
    "u": "https://docs.composio.dev/docs/authentication/custom-app-vs-managed-app"
   }
  ],
  "unverified": [
   "Mailchimp Marketplace listing review steps and timing were not checked.",
   "Composio's redirect URI for Mailchimp is taken from its other OAuth guides; no Mailchimp-specific Composio guide exists (404)."
  ],
  "checked": "2026-10-29"
 }
];
