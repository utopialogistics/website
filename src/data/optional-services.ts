/**
 * DRAFT SERVICES — NOT PUBLISHED.
 *
 * Editable draft content prepared for owner review. These describe services that
 * are common across the Canadian trucking industry; industry research establishes
 * what the terms mean, it does NOT establish that Utopia Logistics Inc. offers them.
 *
 * PUBLICATION CONTROL
 * -------------------
 * Nothing in this file is rendered while `published` is `false`. The website reads
 * `publishedOptionalServices`, which is empty until a service is confirmed. To
 * publish one, Utopia must first confirm the service is genuinely available, then:
 *
 *   1. Set `published: true` on that entry.
 *   2. Review the `description`, `explains`, and `bestFor` copy for accuracy.
 *   3. Clear the `awaiting` note, which lists what still needs confirming.
 *   4. Add a matching, licensed photograph and record it in `image-credits.md`.
 *
 * Publishing an entry adds it to the "Additional services" band on `/services/`
 * and to the equipment guidance on the quote form. It does NOT create a detail
 * page or a main navigation entry; add those deliberately if they are wanted.
 *
 * See `docs/optional-services.md` for the owner-facing handoff notes.
 */
export interface OptionalService {
  slug: string;
  published: boolean;
  title: string;
  label: string;
  icon: string;
  description: string;
  explains: string[];
  bestFor: string[];
  /** What Utopia must confirm before this may be published. */
  awaiting: string;
}

export const optionalServices: OptionalService[] = [
  {
    slug: 'dry-van',
    published: false,
    title: 'Dry Van Transportation',
    label: 'Enclosed trailer',
    icon: 'box',
    description:
      'Enclosed trailer transportation for general freight that does not require temperature control.',
    explains: [
      'A dry van is an enclosed trailer that keeps freight out of the weather and out of view during the trip. It does not heat or cool the load.',
      'Dry van describes the equipment rather than the size of the shipment, so it can overlap with either FTL or LTL. A full trailer of one customer’s goods and a shared trailer of several customers’ pallets can both travel in a dry van.',
    ],
    bestFor: [
      'Packaged products and boxed goods',
      'Palletised manufactured goods',
      'General freight that does not need temperature control',
    ],
    awaiting:
      'Confirm that dry van equipment is available, and whether it is offered for FTL, LTL, or both.',
  },
  {
    slug: 'expedited',
    published: false,
    title: 'Expedited Freight',
    label: 'Urgent timing',
    icon: 'arrow',
    description:
      'Transportation planned around urgent pickup or delivery requirements.',
    explains: [
      'Expedited freight is arranged when the timing of a shipment is the priority. The route, the equipment, and the driver arrangements are planned around the pickup or delivery window rather than around a standard schedule.',
      'Timing, equipment, and availability are confirmed for each individual shipment before anything is arranged.',
    ],
    bestFor: [
      'Shipments with a firm pickup or delivery window',
      'Freight replacing a delayed or short-shipped order',
      'Time-sensitive parts and production materials',
    ],
    awaiting:
      'Confirm that expedited service is offered. Do not publish same-day delivery, guaranteed transit times, or team driver claims unless Utopia confirms them.',
  },
  {
    slug: 'dedicated',
    published: false,
    title: 'Dedicated Transportation',
    label: 'Ongoing capacity',
    icon: 'route',
    description:
      'Capacity arranged for a customer’s recurring routes or ongoing shipping needs.',
    explains: [
      'Dedicated transportation sets aside capacity for a customer’s repeating freight over an agreed period, so the same routes can be planned in advance rather than booked shipment by shipment.',
      'This is different from booking exclusive capacity for a single FTL shipment. An FTL booking reserves a truck for one load; a dedicated arrangement covers a pattern of shipments across an ongoing commitment.',
    ],
    bestFor: [
      'Regular shipments along the same lane',
      'Predictable weekly or monthly freight volumes',
      'Businesses planning capacity ahead of a season',
    ],
    awaiting:
      'Confirm that dedicated capacity is offered, and the commitment terms Utopia is willing to describe publicly.',
  },
  {
    slug: 'temperature-controlled',
    published: false,
    title: 'Temperature-Controlled / Reefer Transport',
    label: 'Controlled conditions',
    icon: 'truck',
    description:
      'Equipment designed to maintain agreed temperature conditions for suitable freight.',
    explains: [
      'A temperature-controlled trailer, often called a reefer, is an insulated trailer with a refrigeration unit that holds the trailer at an agreed setting during the trip.',
      'Suitability depends on the freight, the agreed temperature setting, and the handling required at each end. Conditions are agreed for each shipment before it is arranged.',
    ],
    bestFor: [
      'Freight that must stay within an agreed temperature range',
      'Goods that would be damaged by heat or freezing',
      'Shipments where the required conditions can be confirmed in advance',
    ],
    awaiting:
      'Confirm that reefer equipment is available. Do not publish temperature ranges, food-safety programs, or pharmaceutical certifications unless Utopia holds and confirms them.',
  },
];

/** Empty until an entry above is confirmed and switched to `published: true`. */
export const publishedOptionalServices = optionalServices.filter(
  (service) => service.published,
);
