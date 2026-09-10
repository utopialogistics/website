# Freight quote form integration

**Quote submissions are delivered by Netlify Forms.** Setup, deployment steps, spam
handling, and local-development caveats are in [netlify-forms.md](netlify-forms.md).
This document covers the form's behaviour and the exact fields a receiving provider
gets, whether that provider is Netlify or a replacement.

`src/components/QuoteForm.astro` validates required fields, email format, today-or-future
pickup and delivery dates, a delivery date that is not before the pickup date, optional
positive weight, and an optional whole-number piece count in the browser. A valid request
opens a review panel listing every entered value. Nothing is transmitted at that point.

With a delivery destination configured — Netlify or `PUBLIC_QUOTE_ENDPOINT` — the review
panel's **Send Request to Dispatch** button posts the form natively, and the provider
handles the result page. The button disables itself on click so a request cannot be sent
twice. The visitor can still edit any detail or download a copy first.

With no destination configured, the review panel instead prepares an email draft to
**dispatch@utopialogistics.ca**, which the visitor must review and send from their own
email app. In that mode the site never claims a request was sent.

In that email-draft mode, if the encoded email URL would exceed 1,800 characters, the draft contains a short attachment request instead. A prominent note asks the visitor to download the complete request and attach it before sending. The download always retains the complete entered information; the website never silently truncates shipment details. Visitors without an email app can download the request and use webmail.

The homepage and coverage route planners use GET parameters for pickup and delivery cities. Service CTAs carry the one parameter they are about: the FTL and LTL buttons send `shipment_type`, and the cross-border button sends `route_type`. The long-haul "Check Your Route" button opens the coverage route planner at `#plan-your-route`, which then forwards the cities.

Prefill accepts `shipment_type`, `route_type`, `stackable`, and the eight pickup/delivery location fields. Each parameter is applied independently, so supplying one never clears anything else already entered, and unrecognised values for the select and radio fields are ignored. Text values are trimmed to the field's `maxlength` and assigned as form values, never as markup. Fields remain editable and are not stored in browser storage.

Without JavaScript the behaviour depends on the mode. With a delivery destination configured, the fields stay enabled, the browser's own validation applies (the `novalidate` attribute is set by script rather than markup), and submitting posts straight to the provider; a `<noscript>` message explains that the review step is unavailable. With no destination configured, the fields remain disabled and the message asks for JavaScript, which prevents a preview form from posting to the current page.

## Replacing Netlify with another provider

Netlify Forms is already wired up. To send submissions somewhere else instead, supply an existing, tested form provider or backend endpoint:

```astro
---
import QuoteForm from '../components/QuoteForm.astro';
const quoteEndpoint = import.meta.env.PUBLIC_QUOTE_ENDPOINT || '';
---

<QuoteForm endpoint={quoteEndpoint} email="dispatch@utopialogistics.ca" />
```

Set `PUBLIC_QUOTE_ENDPOINT` to the actual HTTPS provider URL or a same-origin absolute path (for example, `/api/quote`). It is a public destination, never an API secret. The quote page already passes this configuration through `site.quoteEndpoint`, and it takes precedence over Netlify — when it is set, the Netlify attributes are not rendered at all. Leave it empty to keep Netlify Forms. Setting `site.quoteForm.netlify` to `false` with no endpoint restores the review/email-draft workflow; omitting endpoint, Netlify, and email leaves a standalone review/download preview.

A configured form submits a native `POST` using `application/x-www-form-urlencoded` after client validation. The endpoint handles the response and redirects or renders its own honest confirmation/error page. The component makes no assumption that receipt means email delivery. Configure the actual recipient, verify delivery, and test a failure response before launching.

### Submitted field names

Under Netlify, two extra plumbing fields are posted alongside these: `form-name` (always `quote-request`, identifying the form) and `bot-field` (the honeypot, always empty for genuine submissions). A replacement provider should ignore both.

Shipment size, equipment, and route are separate fields. Do not infer one from another.

| Field               | Required | Notes                                                              |
| ------------------- | -------- | ------------------------------------------------------------------ |
| `shipment_type`     | Yes      | `ftl`, `ltl`, or `not-sure`; defaults to `not-sure`                |
| `route_type`        | Yes      | `not-sure` (default), `domestic`, `cross-border`, or `other`       |
| `pickup_city`       | Yes      | City; max 160 characters                                           |
| `pickup_region`     | No       | Province or state; max 80 characters                               |
| `pickup_postal`     | No       | Postal or ZIP code; max 20 characters                              |
| `pickup_country`    | Yes      | Country text; max 100 characters                                   |
| `delivery_city`     | Yes      | City; max 160 characters                                           |
| `delivery_region`   | No       | Province or state; max 80 characters                               |
| `delivery_postal`   | No       | Postal or ZIP code; max 20 characters                              |
| `delivery_country`  | Yes      | Country text; max 100 characters                                   |
| `commodity`         | Yes      | What is being shipped; max 2,500 characters                        |
| `piece_count`       | No       | Pallet/package count; whole number greater than zero when provided |
| `dimensions`        | No       | Free text such as `48 x 40 x 50`; max 200 characters               |
| `dimension_unit`    | Yes      | `in` or `cm`; ignore if `dimensions` is empty                      |
| `weight`            | No       | Positive decimal when provided                                     |
| `weight_unit`       | Yes      | `lb` or `kg`; ignore if `weight` is empty                          |
| `stackable`         | Yes      | `not-sure` (default), `yes`, or `no`                               |
| `equipment`         | No       | Free-text equipment or handling request; max 300 characters        |
| `pickup_date`       | Yes      | ISO `YYYY-MM-DD`; today or later in the visitor's local time       |
| `delivery_date`     | No       | ISO `YYYY-MM-DD`; today or later, and not before `pickup_date`     |
| `pickup_dock`       | No       | `yes` when ticked; absent otherwise                                |
| `pickup_forklift`   | No       | `yes` when ticked; absent otherwise                                |
| `delivery_dock`     | No       | `yes` when ticked; absent otherwise                                |
| `delivery_forklift` | No       | `yes` when ticked; absent otherwise                                |
| `liftgate`          | No       | `yes` when ticked; absent otherwise                                |
| `appointment`       | No       | `yes` when ticked; absent otherwise                                |
| `name`              | Yes      | Full name; max 120 characters                                      |
| `company`           | Yes      | Company name; max 160 characters                                   |
| `email`             | Yes      | Email address; max 254 characters                                  |
| `phone`             | No       | International telephone text; max 40 characters                    |
| `details`           | No       | Additional notes; max 4,000 characters                             |

The six location-requirement checkboxes and `equipment` are **requests for dispatch to
assess**, not confirmed services. Any confirmation email or reply must not imply that a
liftgate, forklift, dock, appointment, or particular equipment has been arranged.

Validate all submitted values again on the server, apply appropriate spam protection and rate limits, and retain only the information needed for the enquiry. Update the quote-related FAQs and website privacy information for the chosen provider and company data handling practices. The email and contact details were supplied by the company; no backend delivery has been configured or assumed.

If rendering more than one form on a page, pass a unique `id` prop to each instance so labels and error references remain unique.
