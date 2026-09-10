# Netlify Forms setup

Quote requests from `/request-quote/` are delivered by **Netlify Forms**. No backend
code, serverless function, or API key is involved: Netlify detects the form in the
deployed HTML and captures each submission.

## What is wired up

| Piece           | Where                                       | Value                    |
| --------------- | ------------------------------------------- | ------------------------ |
| Form name       | `src/data/site.ts` → `quoteForm.name`       | `quote-request`          |
| Success page    | `src/data/site.ts` → `quoteForm.successUrl` | `/quote-received/`       |
| Build settings  | `netlify.toml`                              | `npm run build` → `dist` |
| Provider toggle | `src/data/site.ts` → `quoteForm.netlify`    | `true`                   |

The rendered `<form>` carries everything Netlify's build-time parser looks for:

```html
<form
  name="quote-request"
  action="/quote-received/"
  method="post"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="quote-request" />
  <p class="honeypot" hidden>
    <label>…<input name="bot-field" /></label>
  </p>
</form>
```

The hidden `form-name` field and the honeypot sit outside the main `<fieldset>` so they
are always submitted. All 31 visitor-facing fields are registered, including the radio
group, both unit selectors, and the six location-requirement checkboxes.

## Deploying

1. Connect the repository to Netlify. `netlify.toml` supplies the build command and
   publish directory, so accept the detected settings.
2. Under **Site configuration → Forms**, confirm form detection is enabled. Netlify
   requires this to be switched on for new sites before it will capture submissions.
3. Deploy. After the first successful deploy, `quote-request` appears under **Forms**.
   Netlify registers forms at deploy time, so a form only becomes active once a build
   containing it has been published.
4. Send one real test request and confirm it lands in the Netlify dashboard.
5. Add a notification so dispatch hears about submissions: **Forms → Form notifications
   → Add notification → Email notification**, sent to `dispatch@utopialogistics.ca`.
   Without this step submissions are captured but nobody is told.
6. Set `PUBLIC_SITE_URL` to the live domain under **Environment variables**, then
   redeploy so canonical and social URLs resolve.

## Spam handling

The honeypot (`bot-field`) is enabled. It is hidden with `display: none` and carries
`tabindex="-1"`, so neither sighted visitors nor screen-reader users reach it, while
bots that fill every field are silently discarded.

If spam still gets through, enable Netlify's reCAPTCHA option. That adds a Google
script to the page, so update `src/pages/privacy.astro` to disclose it before turning
it on.

Netlify's free tier includes a limited number of form submissions per month. Check the
current allowance and set a billing alert, because submissions over the cap are
rejected rather than queued.

## How submitting behaves

- **With JavaScript** — the visitor presses _Review Quote Request_, checks a summary of
  everything they entered, then presses _Send Request to Dispatch_, which posts the
  form. Reaching the review screen sends nothing; the QA harness asserts this.
- **Without JavaScript** — the fields stay enabled, the browser's own validation
  applies (the `novalidate` attribute is added by script, not markup), and submitting
  posts straight to Netlify. A `<noscript>` message explains that the review step is
  unavailable.
- **On success** — Netlify redirects to `/quote-received/`, which explains what happens
  next and repeats the dispatch phone number and email. The page is `noindex`.

## Local development

**Netlify Forms do not work against `astro dev` or `astro preview`.** A local POST to
`/quote-received/` is not intercepted by anything, so it will 404 or simply re-serve the
page. This is expected. To exercise the flow locally, run `netlify dev` from the Netlify
CLI, or rely on `npm run verify`, which stubs the POST and asserts the exact body that
would be sent.

## Switching provider

Setting `PUBLIC_QUOTE_ENDPOINT` points the form at a different provider and takes
precedence over Netlify — the Netlify attributes are then not rendered at all. Setting
`quoteForm.netlify` to `false` with no endpoint restores the previous review-and-email-draft
flow. See [quote integration](quote-integration.md) for the full field list a provider
receives.
