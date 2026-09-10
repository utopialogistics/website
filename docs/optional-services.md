# Optional services awaiting Utopia's confirmation

Four additional services common to the Canadian trucking industry have been drafted so
they are ready to publish quickly **if** Utopia Logistics Inc. confirms it offers them.

**None of them is published.** They do not appear on the Services page, the homepage, the
main navigation, the footer, the sitemap, or the quote form. Industry research establishes
what these terms mean across the sector; it does **not** establish that Utopia provides
them. Nothing here should be advertised until the owner confirms it.

Draft copy lives in [`src/data/optional-services.ts`](../src/data/optional-services.ts).

## Awaiting confirmation

| Service                             | Draft summary                                                                                                                                                                                   | What Utopia must confirm                                                                                                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Dry Van Transportation**          | Enclosed trailer transportation for general freight that does not require temperature control. Draft copy explains that dry van describes the equipment and can overlap with either FTL or LTL. | Whether dry van equipment is available, and whether it is offered for FTL, LTL, or both.                                                                                    |
| **Expedited Freight**               | Transportation planned around urgent pickup or delivery requirements.                                                                                                                           | Whether expedited service is offered at all. Do **not** publish same-day delivery, guaranteed transit times, or team-driver claims unless Utopia states them.               |
| **Dedicated Transportation**        | Capacity arranged for a customer's recurring routes or ongoing shipping needs. Draft copy distinguishes this from reserving exclusive capacity for a single FTL shipment.                       | Whether dedicated capacity is offered, and the commitment terms Utopia is willing to describe publicly.                                                                     |
| **Temperature-Controlled / Reefer** | Insulated trailer with a refrigeration unit holding an agreed setting during the trip.                                                                                                          | Whether reefer equipment is available. Do **not** publish temperature ranges, food-safety programs, or pharmaceutical certifications unless Utopia holds and confirms them. |

Each entry carries an `awaiting` note repeating its specific constraint, so the warning
travels with the copy rather than living only in this file.

## How to publish one

Only after Utopia confirms the service is genuinely available:

1. Set `published: true` on that entry in `src/data/optional-services.ts`.
2. Review the `description`, `explains`, and `bestFor` copy for accuracy against what
   Utopia actually offers, and correct anything that overstates it.
3. Clear the `awaiting` note.
4. Add a licensed photograph that genuinely matches the service and record its source,
   licence, and treatment in [`image-credits.md`](../image-credits.md). Do not reuse a
   photograph that shows different equipment from the service being described.
5. Run `npm run check`, `npm run build`, and `npm run verify`.

Publishing an entry adds it to an "Additional services" band on `/services/`. It does
**not** create a detail page at `/services/<slug>/` or a main navigation entry; add those
deliberately if they are wanted, and add the route to `scripts/verify-site.mjs`.

## What deliberately stays out

Regardless of which services are published, the current site makes no claim about customs
brokerage, guaranteed border clearance, customs certifications, hazardous goods, terminals,
scheduled departures, transit times, fleet size, or direct service to every destination.
The quote form treats liftgate, dock, forklift, appointment, and equipment entries as
requests for dispatch to assess, not as confirmed services.
