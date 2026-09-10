# Freight quote form integration

`src/components/QuoteForm.astro` now receives the confirmed dispatch email from `src/data/site.ts`. Required fields, email format, today-or-future pickup and delivery dates, a delivery date that is not before the pickup date, optional positive weight, and an optional whole-number piece count are validated in the browser. A valid request opens a review panel and prepares an email draft to **dispatch@utopialogistics.ca**. The visitor must review and send it from their own email app. The review and downloaded text explicitly state that the request has not been sent. No automatic POST or email occurs in this mode.

If the encoded email URL would exceed 1,800 characters, the draft contains a short attachment request instead. A prominent note asks the visitor to download the complete request and attach it before sending. The download always retains the complete entered information; the website never silently truncates shipment details. Visitors without an email app can download the request and use webmail.

The homepage and coverage route planners use GET parameters for pickup and delivery cities. Service CTAs carry the one parameter they are about: the FTL and LTL buttons send `shipment_type`, and the cross-border button sends `route_type`. The long-haul "Check Your Route" button opens the coverage route planner at `#plan-your-route`, which then forwards the cities.

Prefill accepts `shipment_type`, `route_type`, `stackable`, and the eight pickup/delivery location fields. Each parameter is applied independently, so supplying one never clears anything else already entered, and unrecognised values for the select and radio fields are ignored. Text values are trimmed to the field's `maxlength` and assigned as form values, never as markup. Fields remain editable and are not stored in browser storage.

Without JavaScript, the fields remain disabled and a message explains that JavaScript is needed. This prevents a preview form from accidentally posting to the current page.

## Optional automatic form delivery

Supply an existing, tested form provider or backend endpoint:

```astro
---
import QuoteForm from '../components/QuoteForm.astro';
const quoteEndpoint = import.meta.env.PUBLIC_QUOTE_ENDPOINT || '';
---

<QuoteForm endpoint={quoteEndpoint} email="dispatch@utopialogistics.ca" />
```

Set `PUBLIC_QUOTE_ENDPOINT` to the actual HTTPS provider URL or a same-origin absolute path (for example, `/api/quote`). It is a public destination, never an API secret. The quote page already passes this configuration through `site.quoteEndpoint`. Leave it empty to retain the review/email-draft workflow. Omitting both endpoint and email retains a standalone review/download preview.

A configured form submits a native `POST` using `application/x-www-form-urlencoded` after client validation. The endpoint handles the response and redirects or renders its own honest confirmation/error page. The component makes no assumption that receipt means email delivery. Configure the actual recipient, verify delivery, and test a failure response before launching.

### Submitted field names

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
