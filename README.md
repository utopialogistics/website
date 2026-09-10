# Utopia Logistics Inc.

A complete responsive Astro website for Utopia Logistics Inc., based in Milton, Ontario and serving North America. The redesigned site includes 13 pages, shared navigation, dispatch contact links, a route planner, a full services section covering FTL, LTL, cross-border, and long-haul transportation, and a quote review/email workflow.

## Pages

| Page                                | Route                                |
| ----------------------------------- | ------------------------------------ |
| Home                                | `/`                                  |
| Services                            | `/services/`                         |
| Full truckload (FTL)                | `/services/ftl/`                     |
| Less than truckload (LTL)           | `/services/ltl/`                     |
| Canada–U.S. cross-border            | `/services/cross-border/`            |
| Canadian & North American long-haul | `/services/long-haul/`               |
| Coverage                            | `/coverage/`                         |
| About                               | `/about/`                            |
| Contact                             | `/contact/`                          |
| Request a quote                     | `/request-quote/`                    |
| Frequently asked questions          | `/faq/`                              |
| Website privacy                     | `/privacy/`                          |
| Custom error page                   | `/404.html` (used for missing pages) |

## Working preview

```powershell
npm install
npm run dev -- --background
```

Open http://localhost:4321. Manage the background server with:

```powershell
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Edit the website

- `src/data/site.ts`: supplied phone, email, address, company information, the four published core services, navigation, and shipment steps.
- `src/data/content.ts`: original services-page sections, the FTL/LTL comparison, service-detail copy, and grouped FAQs.
- `src/data/optional-services.ts`: **unpublished** draft services awaiting owner confirmation. Nothing renders while `published` is `false`. See [optional services](docs/optional-services.md).
- `src/pages/`: complete page content with page-specific titles and descriptions; service detail pages use static dynamic routes.
- `src/components/Header.astro` and `Footer.astro`: shared navigation, active-page states, mobile menu, and real dispatch contacts.
- `src/styles/global.css`: shared typography, brand colours, spacing, focus states, and reduced-motion support.
- `src/components/QuoteForm.astro`: labelled fields, validation, shipment-type/route prefill, review, email-draft preparation, editing, and text downloads. Shipment size, equipment, and route are kept as separate fields.
- `src/assets/brand/utopia-logistics-master.svg`: unchanged official master.
- `public/images/utopia-logo.svg`: web-ready logo, original artwork with fitted viewBox.
- `public/images/`: optimized local stock photography and geographic map.

## Quote workflow and launch settings

The quote form validates shipment details and presents a review. It prepares an email draft to **dispatch@utopialogistics.ca**, which the visitor must review and send in their email app. The site does not send an email automatically and never claims that a request was sent. The complete request can also be downloaded. For long requests, clear instructions explain how to download the text and attach it to the email. Without JavaScript, the form stays disabled while phone/email links remain available.

The route planners carry only pickup and delivery cities into the quote page. Service CTAs prefill the one field they are about — the FTL and LTL buttons preselect the shipment type, the cross-border button preselects the route — and applying a prefill never clears anything else already entered. Form details are not autosaved or stored in browser storage.

Before launch:

1. For automatic form delivery, optionally connect a tested backend/form provider using `PUBLIC_QUOTE_ENDPOINT`. It must accept URL-encoded POST requests and handle honest success/error responses. The current email-draft route works without that integration. See [quote integration](docs/quote-integration.md).
2. Set `PUBLIC_SITE_URL` to the actual public HTTPS domain for canonical and social image URLs. Copy `.env.example` to `.env` and rebuild after configuration changes.
3. Review the factual website privacy notice against your eventual hosting, email, and form setup, and add company-specific data handling information when available. The supplied phone, email, and postal address are already published with working call, email, and Google Maps links.
4. Confirm specific routes and any additional services before advertising them. Current content does not claim dedicated equipment, specialised transport, customs brokerage, guaranteed border clearance, guaranteed times, terminals, or a fleet size. Dry van, expedited, dedicated, and temperature-controlled services are drafted but deliberately unpublished — see [optional services](docs/optional-services.md).

The output is static HTML/CSS with small client scripts. No backend is bundled or required for preview. A same-origin backend path requires a real deployed handler; static hosting alone does not create one.

## Verification and production build

```powershell
npm run check
npm run build
npx playwright install chromium
npm run verify
```

`verify` expects the background server on port 4321. It checks all 13 pages at desktop (1440px), tablet (768px), mobile (390px), and small mobile (320px): 52 page/viewport combinations. It checks images, links, contact destinations, overflow, metadata, and axe accessibility, then exercises mobile navigation, quote validation (required, email, dates including delivery-before-pickup, weight, and piece count), all four service-CTA prefills, combined prefill without clearing other entries, email draft contents, long-request handling, downloads, editing, FAQ keyboard operation, 404 handling, and no-JavaScript safeguards. It does not send emails or contact the company. Screenshots and results are saved under `.qa/revamp/` (git-ignored).

The production build is in `dist/`, ready for a static host. The displayed copyright year is generated at build time; rebuild annually or as part of regular deployment.

## Sources and licences

- [Image credits and Pexels licences](image-credits.md)
- [Map, logo provenance, and Natural Earth credits](docs/map-credits.md)
- [Industry reference review and fonts](docs/design-references.md)
- [Optional services awaiting confirmation](docs/optional-services.md)

Stock imagery is illustrative and is not presented as Utopia's own vehicles or facilities. Fonts and images are served locally.
