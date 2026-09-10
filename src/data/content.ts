/**
 * Long-form copy for the Services page sections, the service detail pages,
 * and the FAQ content used across the site.
 *
 * `serviceSections` drives `/services/#<slug>`; `serviceDetails` drives the
 * deeper page at `/services/<slug>/`. Keys must match a slug in `site.ts`.
 */
export const serviceSections = {
  ftl: {
    explains: [
      'A full truckload booking reserves a truck’s freight capacity for your shipment. Your goods are loaded at the pickup, stay on the same trailer, and are unloaded at the delivery, rather than being combined with freight from other customers along the way.',
      'Your shipment does not have to physically fill the trailer to travel as FTL. Customers also choose full truckload when a load is awkward to handle, when it should not be moved between trailers, or when it simply suits the shipment to travel on its own.',
    ],
    bestFor: [
      'Larger shipments and high-volume freight',
      'Loads that need a truck’s capacity reserved for them',
      'Freight that benefits from travelling separately from other customers’ shipments',
      'Shipments where extra handling in transit is best avoided',
    ],
    note: 'Equipment, route availability, and shipment arrangements are confirmed with dispatch for each individual trip.',
  },
  ltl: {
    explains: [
      'Less than truckload moves smaller freight without reserving an entire trailer. Your shipment travels with freight from other customers, and you are quoted for the portion of the trailer your goods occupy rather than for the whole truck.',
      'Because LTL freight is combined with other shipments, it is usually handled more than a full truckload is. Palletised, well-packaged, clearly labelled goods travel best. Pricing and suitability depend on your shipment’s dimensions, weight, route, handling requirements, and other details, so an LTL quote is prepared shipment by shipment.',
    ],
    bestFor: [
      'Palletised goods and smaller commercial loads',
      'Shipments too small to need a truck’s full capacity',
      'Freight that is packaged and labelled for handling in transit',
      'Businesses shipping a few pallets at a time',
    ],
    note: 'Whether LTL suits a shipment, and how it compares to a full truckload for that shipment, is discussed with dispatch. Neither option is automatically cheaper or faster.',
  },
  'cross-border': {
    explains: [
      'Cross-border covers freight moving between Canada and the United States in either direction. It is a route category rather than a type of equipment, so a cross-border shipment can travel as either FTL or LTL depending on its size and requirements.',
      'Tell us where the freight is picked up and delivered, what is being moved, and when it needs to travel. It also helps to mention any documentation or border-related requirements you already know about, so responsibilities can be agreed before anything is arranged.',
    ],
    bestFor: [
      'Freight moving from Canada into the United States',
      'Freight moving from the United States into Canada',
      'Either full truckload or LTL shipments crossing the border',
      'Businesses planning a first shipment across the border',
    ],
    note: 'Utopia Logistics Inc. does not advertise customs brokerage, guaranteed border clearance, or specific customs certifications. Border requirements and who is responsible for them are discussed for each shipment.',
  },
  'long-haul': {
    explains: [
      'Long-haul covers the longer distances: freight travelling between distant Canadian destinations, and trips reaching across North America. Like cross-border, it describes the journey rather than the equipment, so a long-haul trip may be arranged as FTL or LTL.',
      'Longer trips reward early planning. Share where your freight starts, where it needs to arrive, and the requirements at each end, and we will discuss the route with you. Availability is confirmed for the specific route you ask about.',
    ],
    bestFor: [
      'Domestic Canadian shipments travelling long distances',
      'Trips reaching across North America',
      'Freight with flexible dates and a longer road ahead',
      'Businesses connecting distant sites or customers',
    ],
    note: 'Service availability is confirmed for your requested route. Transit times and specific arrangements are discussed for each trip and are not confirmed by an online enquiry.',
  },
};

/** Compact FTL / LTL comparison. Qualitative on purpose — no invented cutoffs. */
export const ftlLtlComparison = [
  {
    aspect: 'Trailer capacity',
    ftl: 'A truck’s freight capacity is reserved for your shipment alone.',
    ltl: 'You use a portion of a trailer that is shared with other customers’ freight.',
  },
  {
    aspect: 'Typical shipment size',
    ftl: 'Suits larger loads and higher-volume freight. Your shipment does not have to fill the trailer to travel this way.',
    ltl: 'Suits smaller shipments, commonly a handful of pallets or packaged goods.',
  },
  {
    aspect: 'Consolidation & handling',
    ftl: 'Loaded at pickup and unloaded at delivery, without being combined with other shipments in transit.',
    ltl: 'Combined with other shipments, so freight is generally handled more along the way. Sturdy packaging and clear labelling matter.',
  },
  {
    aspect: 'Pricing considerations',
    ftl: 'Priced around reserving the capacity for the trip, so it often suits freight that uses much of a trailer.',
    ltl: 'Priced around the space and handling your shipment needs. Dimensions, weight, route, and requirements all affect it.',
  },
];

/** FAQ shown on the Services page. */
export const serviceFaqs = [
  {
    question: 'What is the difference between FTL and LTL?',
    answer:
      'Full truckload reserves a truck’s freight capacity for your shipment, so your goods travel on their own from pickup to delivery. Less than truckload uses part of a trailer that is shared with other customers’ freight, so shipments are combined and generally handled more in transit. FTL suits larger loads and freight that benefits from travelling separately; LTL suits smaller, well-packaged shipments. Which one fits depends on your shipment, and dispatch can talk it through with you.',
  },
  {
    question: 'Does my shipment need to fill a truck to use FTL?',
    answer:
      'No. A shipment does not have to physically fill the trailer to travel as full truckload. FTL is about reserving the capacity, not about filling every inch of it. Customers also choose FTL when a load is awkward to handle, when it should not be moved between trailers in transit, or when it simply suits the freight to travel separately.',
  },
  {
    question: 'What information is needed for a freight quote?',
    answer:
      'The most useful starting points are your pickup and delivery locations including city, province or state, postal or ZIP code, and country; what you are shipping; the pallet or package count, dimensions, and total weight; and your preferred pickup and requested delivery dates. It also helps to know whether there is a commercial dock or a forklift at each end, whether a liftgate is needed, and whether an appointment is required. Estimates are fine where details are still being confirmed.',
  },
  {
    question: 'Can I request a Canada–U.S. shipment?',
    answer:
      'Yes. Include both countries along with the pickup and delivery cities in your quote request, and tell us about the cargo and your timing requirements. Cross-border is a route category, so the shipment may travel as either FTL or LTL. Utopia Logistics Inc. does not advertise customs brokerage or guaranteed border clearance; documentation and border responsibilities are discussed before a trip is arranged.',
  },
  {
    question: 'How do I check availability for my route?',
    answer:
      'Send the route to dispatch. Enter your pickup and delivery cities in the route planner or the quote request form, add your freight details and preferred dates, and our team will confirm whether the route is available for your shipment. Our coverage map shows a broad North American outlook rather than a fixed list of lanes, so availability is always confirmed route by route.',
  },
];

export const serviceDetails = {
  ftl: {
    heading: 'One shipment.\nThe whole truck.',
    intro:
      'Reserve a truck’s freight capacity for your shipment, so your load travels from pickup to delivery without being combined with other customers’ freight.',
    title: 'Capacity reserved for your load.',
    body: 'A full truckload enquiry starts with the shape of the load. Tell us what you are shipping, how much of it there is, and what needs to happen at each end. Your shipment does not have to fill the trailer to travel this way, so share the details you have and our Milton-based team will discuss whether FTL suits the trip.',
    points: [
      'Pickup and delivery cities, provinces or states, and countries',
      'Commodity, pallet or package count, dimensions, and total weight',
      'Preferred pickup date, requested delivery date, and any loading requirements',
    ],
    note: 'Equipment and route availability are confirmed for each individual shipment. An enquiry does not confirm a booking or a rate.',
    faq: [
      {
        question: 'Does my freight have to fill the trailer?',
        answer:
          'No. FTL reserves a truck’s freight capacity for your shipment rather than requiring you to fill it. Customers choose it for larger loads, and also when freight is best kept away from other shipments or is awkward to handle.',
      },
      {
        question: 'How do I know whether FTL or LTL suits my shipment?',
        answer:
          'Share the pallet or package count, dimensions, weight, and route in your quote request, and note that you would like both options considered. Dispatch will discuss which approach fits. You can also select “Not sure” as the shipment type on the form.',
      },
    ],
  },
  ltl: {
    heading: 'Smaller freight.\nShared trailer space.',
    intro:
      'Move smaller shipments without reserving an entire trailer, with your palletised goods travelling alongside freight from other customers.',
    title: 'Space for what you’re actually shipping.',
    body: 'LTL enquiries depend on the detail. Because your freight shares a trailer and is handled alongside other shipments, dimensions, weight, packaging, and the requirements at each end all shape the quote. Send those details with your route and preferred dates, and dispatch will discuss whether LTL is the right fit for the shipment.',
    points: [
      'Pickup and delivery cities, provinces or states, postal or ZIP codes, and countries',
      'Commodity, pallet or package count, dimensions, total weight, and whether the freight is stackable',
      'Dock, forklift, liftgate, and appointment requirements at each end',
    ],
    note: 'Pricing and suitability depend on the shipment. LTL is not automatically cheaper or faster than a full truckload, and each enquiry is assessed individually.',
    faq: [
      {
        question: 'Is LTL always cheaper than FTL?',
        answer:
          'No. LTL is priced around the space and handling your shipment needs, so dimensions, weight, route, and requirements all affect it. For some shipments a full truckload is the better fit. Share your details and dispatch will discuss the options with you.',
      },
      {
        question: 'How should my freight be packaged for LTL?',
        answer:
          'LTL freight is combined with other shipments and generally handled more in transit, so sturdy packaging, secure palletising, and clear labelling all help. Tell us whether the freight is stackable and note any handling requirements in your enquiry.',
      },
    ],
  },
  'cross-border': {
    heading: 'New destinations.\nBeyond the border.',
    intro:
      'Plan freight transportation between Canada and the United States, with your route, cargo, and timing requirements in focus.',
    title: 'Start with both sides of the journey.',
    body: 'Cross-border enquiries need a clear picture of the origin, destination, and load. Send our dispatch team your pickup and delivery cities and countries, your freight description, and your preferred dates. Because cross-border describes the route rather than the equipment, the shipment may travel as either FTL or LTL, and we will discuss which suits it.',
    points: [
      'Pickup and delivery addresses, including both countries',
      'Commodity, dimensions, pallet or package count, and total weight',
      'Preferred dates, shipment contacts, and any known border-related requirements',
    ],
    note: 'Customs brokerage, guaranteed border clearance, and specific customs certifications are not advertised Utopia services. Documentation and border responsibilities are discussed before a trip is arranged.',
    faq: [
      {
        question: 'Can a cross-border shipment travel as LTL?',
        answer:
          'Cross-border describes the route, not the size of the shipment, so it can apply to either FTL or LTL. Share your freight details and dispatch will discuss which option suits the trip.',
      },
      {
        question: 'Does this include customs brokerage?',
        answer:
          'Customs brokerage is not an advertised Utopia service. Tell dispatch about any shipment documentation or border requirements so responsibilities can be discussed before a trip is arranged.',
      },
    ],
  },
  'long-haul': {
    heading: 'More miles.\nThe same conversation.',
    intro:
      'Keep your business connected over longer distances, across Canadian destinations and North American routes.',
    title: 'Give the whole journey a clear starting point.',
    body: 'Long-distance transportation begins well before the first mile. Share where your freight starts, where it needs to go, and the requirements at each end. Long-haul describes the journey rather than the equipment, so the trip may be arranged as FTL or LTL. Our team will discuss your enquiry and confirm availability for the route before anything is arranged.',
    points: [
      'Complete origin and destination information',
      'Commodity, dimensions, pallet or package count, and total weight',
      'Preferred pickup date and any delivery timing requirements',
    ],
    note: 'Service availability is confirmed for your requested route. Transit times and trip arrangements are discussed individually, and no delivery time is guaranteed by an online enquiry.',
    faq: [
      {
        question: 'How are pickup and delivery dates confirmed?',
        answer:
          'Include your preferred pickup date and any delivery requirements in the enquiry. Timing is discussed with dispatch and confirmed for the individual trip.',
      },
      {
        question: 'Can I ask about a route that is not listed?',
        answer:
          'Yes. Our map illustrates broad North American coverage rather than a list of established lanes. Share your route with dispatch to discuss availability.',
      },
    ],
  },
};

export const faqs = [
  {
    category: 'Getting started',
    question: 'How do I request a freight quote?',
    answer:
      'Use the Request a Quote page to enter your shipment type, pickup and delivery locations, freight details, preferred dates, and contact information. You will see a review screen with everything you entered; press Send Request to Dispatch and it reaches our team directly. You can also email dispatch@utopialogistics.ca or call +1 (437) 484-0017.',
  },
  {
    category: 'Getting started',
    question: 'What information should I have ready?',
    answer:
      'Have your pickup and delivery cities, provinces or states, postal or ZIP codes, and countries ready, along with what you are shipping and a preferred pickup date. Pallet or package count, dimensions, total weight, stackability, and the dock, forklift, liftgate, or appointment requirements at each end all help provide a clearer picture.',
  },
  {
    category: 'Getting started',
    question: 'Does completing the form book a shipment?',
    answer:
      'No. Preparing or sending an enquiry does not confirm a booking, a rate, or availability. Shipment arrangements must be discussed and confirmed with Utopia Logistics.',
  },
  {
    category: 'Coverage & services',
    question: 'What is the difference between FTL and LTL?',
    answer:
      'Full truckload reserves a truck’s freight capacity for your shipment, so your goods travel on their own from pickup to delivery. Less than truckload uses part of a trailer shared with other customers’ freight, so shipments are combined and generally handled more in transit. FTL suits larger loads and freight that benefits from travelling separately; LTL suits smaller, well-packaged shipments.',
  },
  {
    category: 'Coverage & services',
    question: 'Does my shipment need to fill a truck to use FTL?',
    answer:
      'No. A shipment does not have to physically fill the trailer to travel as full truckload. FTL reserves the capacity rather than requiring you to fill it, and customers also choose it when freight is awkward to handle or is best kept away from other shipments.',
  },
  {
    category: 'Coverage & services',
    question: 'Where does Utopia Logistics operate?',
    answer:
      'Utopia Logistics is based in Milton, Ontario, Canada, and provides trucking transportation across North America. Contact dispatch about a specific pickup location, delivery destination, and preferred date. Route availability is confirmed individually.',
  },
  {
    category: 'Coverage & services',
    question: 'Can I enquire about cross-border transportation?',
    answer:
      'Yes. Include both countries and the pickup and delivery cities in your enquiry, along with your cargo details and timing. Cross-border is a route category, so the shipment may travel as either FTL or LTL. Customs brokerage and guaranteed border clearance are not advertised Utopia services.',
  },
  {
    category: 'Coverage & services',
    question: 'What if my shipment has special requirements?',
    answer:
      'Describe your freight and its requirements when you contact us, including anything you request on the quote form such as a liftgate or an appointment. These are treated as requests for us to assess, not confirmed services. Equipment, handling needs, and service suitability must all be confirmed. Specialised services such as refrigerated transport, hazardous goods, and customs brokerage are not advertised on this website.',
  },
  {
    category: 'Your quote request',
    question: 'Has my request been sent when I see the review screen?',
    answer:
      'Not yet. The review screen is the last check before anything leaves your browser. Nothing is sent until you press Send Request to Dispatch. You can edit any detail first, or download a copy of the request for your own records.',
  },
  {
    category: 'Your quote request',
    question: 'What happens after I send my request?',
    answer:
      'You are taken to a confirmation page, and your request reaches Utopia Logistics dispatch. A member of the team will contact you using the email address or phone number you provided, to discuss the shipment and confirm availability for your route. Sending a request does not confirm a booking, a rate, or route availability.',
  },
  {
    category: 'Your quote request',
    question: 'Can I change details after sending an enquiry?',
    answer:
      'Yes. Email dispatch@utopialogistics.ca or call +1 (437) 484-0017 with the original pickup and delivery locations and the details that have changed, so the team can identify your enquiry. You can also send a fresh request and say that it replaces the earlier one.',
  },
];
