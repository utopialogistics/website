// Edit confirmed company information and homepage copy here.
// Contact information supplied by the company. The public domain remains configurable.
export const site = {
  name: 'Utopia Logistics Inc.',
  description:
    'Canada-based trucking transportation across North America. Explore Utopia Logistics Inc. full truckload, LTL, cross-border, and long-haul services, and plan your next freight shipment.',
  url: import.meta.env.PUBLIC_SITE_URL || '',
  quoteEndpoint: import.meta.env.PUBLIC_QUOTE_ENDPOINT || '',
  /**
   * Quote submissions are delivered by Netlify Forms.
   *
   * `name` must match the form's `name` attribute and its hidden `form-name`
   * field; Netlify labels submissions in the dashboard with it. `successUrl`
   * is the page Netlify redirects to once a submission is accepted.
   *
   * Setting PUBLIC_QUOTE_ENDPOINT points the form at a different provider and
   * takes precedence over this. Netlify Forms only run on a Netlify deploy —
   * a local `astro dev` server does not accept the POST.
   */
  quoteForm: {
    netlify: true,
    name: 'quote-request',
    successUrl: '/quote-received/',
  },
  email: 'dispatch@utopialogistics.ca',
  phone: '+1 (437) 484-0017',
  phoneHref: 'tel:+14374840017',
  address: '10862 Steeles Ave E, Milton ON L9T 6R1',
  street: '10862 Steeles Ave E',
  locality: 'Milton, ON L9T 6R1',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=10862%20Steeles%20Ave%20E%2C%20Milton%20ON%20L9T%206R1',
  hero: {
    eyebrow: 'Canada based. North America bound.',
    lineOne: 'Your freight.',
    lineTwo: 'The road ahead.',
    description:
      'Utopia Logistics Inc. provides trucking transportation across North America. Tell us where your freight needs to go, and let’s plan the next trip.',
  },
  coverage: {
    title: 'Based in Canada. Moving across North America.',
    description:
      'From Canadian destinations to cross-border trips across North America, contact Utopia Logistics Inc. to discuss your pickup location, delivery destination, and shipment requirements.',
  },
  about: {
    title: 'A Canadian trucking company with a North American outlook.',
    description:
      'Utopia Logistics Inc. is based in Canada and provides trucking transportation across North America. We help businesses take the next step in moving their freight, starting with the details that matter: the route, the load, and the delivery requirements.',
  },
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Coverage', href: '/coverage/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/**
 * Published core services.
 *
 * Each entry drives the homepage summary cards, the Services page sections
 * (`/services/#<slug>`), the detail page at `/services/<slug>/`, and the footer.
 * Draft services awaiting owner confirmation live in `optional-services.ts`
 * and are deliberately kept out of this array.
 */
export const services = [
  {
    number: '01',
    slug: 'ftl',
    shortTitle: 'Full truckload (FTL)',
    title: 'Full Truckload (FTL)',
    label: 'Exclusive capacity',
    icon: 'truck',
    summary:
      'Reserve a truck’s freight capacity for your shipment, so your load travels on its own rather than alongside other customers’ freight.',
    description:
      'Reserve a truck’s freight capacity for your shipment. FTL is suited to larger loads and freight that benefits from travelling separately from other customers’ shipments.',
    image: '/images/freight-road.webp',
    alt: 'Red conventional semi-truck hauling a silver trailer through a desert landscape',
    position: 'center',
    quoteHref: '/request-quote/?shipment_type=ftl',
    cta: {
      label: 'Request an FTL Quote',
      href: '/request-quote/?shipment_type=ftl',
    },
  },
  {
    number: '02',
    slug: 'ltl',
    shortTitle: 'Less than truckload (LTL)',
    title: 'Less Than Truckload (LTL)',
    label: 'Shared trailer space',
    icon: 'box',
    summary:
      'Move smaller freight shipments without reserving an entire trailer, with your goods travelling alongside other customers’ freight.',
    description:
      'Move smaller freight shipments without reserving an entire trailer. LTL combines shipments from multiple customers, making it a practical option for palletised goods and smaller commercial loads.',
    image: '/images/palletised-freight.webp',
    alt: 'Forklift carrying a shrink-wrapped pallet of boxed goods beside an open trailer',
    position: 'center',
    quoteHref: '/request-quote/?shipment_type=ltl',
    cta: {
      label: 'Request an LTL Quote',
      href: '/request-quote/?shipment_type=ltl',
    },
  },
  {
    number: '03',
    slug: 'cross-border',
    shortTitle: 'Canada–U.S. cross-border',
    title: 'Canada–U.S. Cross-Border Trucking',
    label: 'Canada and the United States',
    icon: 'globe',
    summary:
      'Plan freight transportation between Canada and the United States. Cross-border is a route category, so it can apply to either FTL or LTL.',
    description:
      'Plan freight transportation between Canada and the United States. Share your origin, destination, cargo details, and timing requirements so we can discuss your cross-border shipment.',
    image: '/images/trucking-detail.webp',
    alt: 'White conventional tractor-trailer on a forest-lined road in British Columbia',
    position: 'center',
    quoteHref: '/request-quote/?route_type=cross-border',
    cta: {
      label: 'Discuss a Cross-Border Shipment',
      href: '/request-quote/?route_type=cross-border',
    },
  },
  {
    number: '04',
    slug: 'long-haul',
    shortTitle: 'Canadian & North American long-haul',
    title: 'Canadian and North American Long-Haul Transportation',
    label: 'The longer journey',
    icon: 'route',
    summary:
      'Keep your business connected over longer distances, with domestic Canadian shipments and North American trips discussed route by route.',
    description:
      'Keep your business connected over longer distances. Discuss domestic Canadian shipments and North American trips with Utopia Logistics Inc., with service availability confirmed for your requested route.',
    image: '/images/hero-truck.webp',
    alt: 'White semi-truck travelling on a highway beneath snow-capped mountains',
    position: '65% bottom',
    quoteHref: '/request-quote/',
    cta: { label: 'Check Your Route', href: '/coverage/#plan-your-route' },
  },
];

export const steps = [
  {
    number: '01',
    title: 'Start with the route.',
    description:
      'Share your pickup and delivery locations. Every trip begins with a point A and a point B.',
    icon: 'pin',
  },
  {
    number: '02',
    title: 'Give us the details.',
    description:
      'Tell us about your freight, shipment requirements, and preferred pickup dates.',
    icon: 'box',
  },
  {
    number: '03',
    title: 'Let’s talk about the trip.',
    description:
      'Request a quote so we can discuss your shipment and confirm route availability.',
    icon: 'arrow',
  },
];
