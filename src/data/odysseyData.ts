export interface PillarComponent {
  name: string;
  description: string;
  diagnosticFocus: string;
}

export interface Pillar {
  id: 'value-proposition' | 'value-architecture' | 'profit-equation';
  name: string;
  tagline: string;
  description: string;
  components: PillarComponent[];
  canonicalExample: {
    business: string;
    transformation: string;
    insight: string;
  };
}

export interface Direction {
  id: number;
  name: string;
  pillar: 'Value Proposition' | 'Value Architecture';
  plainEnglishExplanation: string;
  strategicMechanism: string;
  diagnosticQuestion: string;
  primaryPillarImpact: string;
  crossPillarImplications: {
    valueProposition?: string;
    valueArchitecture?: string;
    profitEquation: string;
  };
  canonicalCaseExample: {
    company: string;
    howApplied: string;
    impact: string;
  };
}

export interface BusinessCase {
  id: string;
  name: string;
  sector: string;
  tagline: string;
  summary: string;
  valueProposition: {
    clients: string;
    offering: string;
    pricing: string;
  };
  valueArchitecture: {
    valueChain: string;
    partners: string;
    resources: string;
  };
  profitEquation: {
    revenueDrivers: string;
    costStructure: string;
    capitalEmployed: string;
  };
  keyInnovationMechanism: string;
  courseTakeaway: string;
  category: 'Platform & Ecosystem' | 'Access & Mobility' | 'Quick Commerce' | 'Social Commerce' | 'Niche Craft' | 'Frugal Strategy';
}

export interface StrategicLever {
  id: string;
  name: string;
  pillar: 'Value Proposition' | 'Value Architecture' | 'Profit Equation';
  summary: string;
  impactOnModel: string;
  relatedCaseExample: string;
}

export interface BaselineBusinessModel {
  targetCustomers: string;
  customerNeed: string;
  productOrService: string;
  pricingAndRevenueModel: string;
  mainActivitiesAndPartners: string;
  keyResources: string;
  mainCosts: string;
  capitalRequirements: string;
}

export interface BusinessScenario {
  id: string;
  name: string;
  sector: string;
  oneLiner: string;
  baseline: BaselineBusinessModel;
  diagnosticPrompts: {
    id: string;
    title: string;
    description: string;
    suggestedLevers: string[];
  }[];
  defaultLevers: string[];
  curatedRemix: {
    name: string;
    leversUsed: string[];
    diagnosticRationale: string;
    proposedModel: {
      valueProposition: {
        clients: string;
        offering: string;
        price: string;
      };
      valueArchitecture: {
        valueChain: string;
        partners: string;
        resources: string;
      };
      profitEquation: {
        revenueDynamics: string;
        costStructure: string;
        capitalEmployed: string;
      };
    };
    whoBenefits: string;
    whatChanges: string;
    valueCreationLogic: string;
    risksAndAssumptions: string[];
    realityCheck: {
      customerValueScore: number;
      operationalFeasibilityScore: number;
      economicViabilityScore: number;
      verdict: string;
      stressQuestions: string[];
    };
  };
}

export interface QuizQuestion {
  id: string;
  type: 'concept' | 'scenario' | 'tradeoff' | 'pillar';
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pedagogicalTakeaway: string;
  relatedPillar: 'Value Proposition' | 'Value Architecture' | 'Profit Equation';
  relatedCaseId?: string;
}

export interface WordleWord {
  word: string; // 5-letter uppercase string
  hint: string;
  strategicMeaning: string;
  relatedCaseOrDirection: string;
}

export interface SpinChallenge {
  id: string;
  directionId: number;
  directionName: string;
  businessScenario: string;
  prompt: string;
  options: {
    id: string;
    label: string;
    actionDescription: string;
    isOptimal: boolean;
    feedback: string;
    roceImpact: string;
    xp: number;
  }[];
}

export interface SynergyTrio {
  id: string;
  theme: string;
  vpCard: { title: string; text: string };
  vaCard: { title: string; text: string };
  peCard: { title: string; text: string };
  takeaway: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 'value-proposition',
    name: 'Value Proposition',
    tagline: 'What the business offers, to whom, and at what price (Who, What & Price)',
    description:
      'In my synthesis of the course, the Value Proposition defines the customer promise. It answers three strategic questions: Who are the clients? What products and services solve their needs? And what is the pricing model, including total cost of ownership?',
    components: [
      {
        name: 'Clients (Target Segments)',
        description: 'Existing customers, underserved niches, or overlooked non-customers who face adoption hurdles.',
        diagnosticFocus: 'Who does not buy today, and what barriers prevent them from entering the market?',
      },
      {
        name: 'Products & Services',
        description: 'The bundle of functionalities, emotional experiences, and outcomes delivered to solve the client problem.',
        diagnosticFocus: 'Are we selling an isolated physical good, or an integrated outcome with guaranteed performance?',
      },
      {
        name: 'Price & Total Cost of Ownership',
        description: 'The pricing mechanism, payment terms, timing of cash collection, and lifecycle cost perceived by buyers.',
        diagnosticFocus: 'Can we convert fixed purchase friction into recurring usage or negative working capital?',
      },
    ],
    canonicalExample: {
      business: 'Hilti Fleet Management',
      transformation: 'Transformed power tool sales into a monthly tool-as-a-service lease including proactive maintenance and rapid tool replacement.',
      insight: 'The Profit Equation shifted from lumpy, capital-heavy product sales to high-margin recurring cash flows with negative working capital, vastly increasing customer lifetime value.',
    },
  },
  {
    id: 'value-architecture',
    name: 'Value Architecture',
    tagline: 'How the offering is engineered, produced, and orchestrated (How & With Whom)',
    description:
      'The Value Architecture is the operational engine that fulfills the customer promise. It maps out internal workflows, external partner alliances, and critical strategic assets.',
    components: [
      {
        name: 'Value Chain (Internal Workflows)',
        description: 'The sequence of operational activities executed inside the firm, from design and procurement to fulfillment and support.',
        diagnosticFocus: 'Which internal step is slowest or most expensive? Can we eliminate or digitize intermediate stages?',
      },
      {
        name: 'Value Network (Partners & Ecosystem)',
        description: 'External alliances, gig logistics fleets, complementary providers, and platforms orchestrated to deliver value.',
        diagnosticFocus: 'Who else has assets that we can mobilize without buying them on our balance sheet?',
      },
      {
        name: 'Resources & Competencies',
        description: 'Proprietary technology algorithms, geospatial real estate density, specialized craft skills, and brand equity.',
        diagnosticFocus: 'What rare capability creates a durable competitive wedge against fast-following imitators?',
      },
    ],
    canonicalExample: {
      business: 'Blinkit Micro-Fulfillment & Yulu Swapping',
      transformation: 'Replaced suburban distribution warehouses with hyper-local 2km dark stores, while Yulu decoupled battery charging from vehicle downtime.',
      insight: 'Speed and asset uptime are architectural outcomes: when the Value Architecture eliminates physical transit and downtime, unit margins become defendable.',
    },
  },
  {
    id: 'profit-equation',
    name: 'Profit Equation',
    tagline: 'The economic logic and capital efficiency that makes the business model viable (How Much & ROCE)',
    description:
      'The Profit Equation evaluates the economic reality of the business model. It connects customer willingness to pay and operational costs to Return on Capital Employed: ROCE = (Revenues - Costs) / Capital Employed.',
    components: [
      {
        name: 'Revenue Streams & Dynamics',
        description: 'Volume drivers, monetization mechanisms, recurring subscription revenue, advertising margins, and pricing power.',
        diagnosticFocus: 'How sensitive is total revenue to customer churn or seasonality? Can we introduce high-margin ancillary streams?',
      },
      {
        name: 'Cost Structure (Fixed vs Variable)',
        description: 'Breakdown between fixed overhead (dark store rents, vehicle depreciation) and variable costs (rider payouts, pick-and-pack labor).',
        diagnosticFocus: 'What is the breakeven threshold? How rapidly do fixed costs amortize as order density climbs?',
      },
      {
        name: 'Capital Employed (Assets + WKR)',
        description: 'Total capital tied up: working capital requirements (inventory, receivables) and fixed capital (plant, IT infrastructure, real estate).',
        diagnosticFocus: 'Is the business capital-heavy or asset-light? Can we achieve negative working capital through upfront customer subscriptions?',
      },
    ],
    canonicalExample: {
      business: 'Pinduoduo C2M & Dell Direct',
      transformation: 'Collected payments upfront from social team shoppers while settling supplier payouts on 30-day supplier credit terms.',
      insight: 'Negative working capital self-funds aggressive scaling without needing external debt or equity dilution.',
    },
  },
];

// THE 14 OFFICIAL DIRECTIONS OF ODYSSEY 3.14
export const DIRECTIONS: Direction[] = [
  // Value Proposition (Directions 1 to 7)
  {
    id: 1,
    name: 'Reduce customer overall costs',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Lower the total financial burden borne by customers: not merely the upfront purchase sticker price, but maintenance, consumables, and disposal costs throughout the lifecycle.',
    strategicMechanism:
      'De-engineering extraneous features or designing low-maintenance systems that radically compress total cost of ownership.',
    diagnosticQuestion:
      'What hidden expenses, ongoing consumables, or maintenance fees make using the existing solution painful for budget-conscious buyers?',
    primaryPillarImpact: 'Expands customer willingness to buy by removing financial barriers to entry.',
    crossPillarImplications: {
      valueArchitecture: 'Requires lean production, modular components, or low-cost supply chains.',
      profitEquation: 'Requires lower unit cost of delivery so reduced customer price preserves healthy gross margin spreads.',
    },
    canonicalCaseExample: {
      company: 'Frugal Innovation (GE Healthcare MAC 400)',
      howApplied: 'Stripped hospital ECG machines down to battery-operated handheld devices using consumer bus-ticket printers.',
      impact: 'Reduced scan cost from $50 to under $1, serving millions of previously excluded rural patients profitably.',
    },
  },
  {
    id: 2,
    name: 'Reduce customer hassles and simplify life',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Systematically eliminate operational friction, waiting times, complex configurations, paperwork, and anxiety from the customer journey.',
    strategicMechanism:
      'Engineers automated self-service, instant gratification, or turnkey delivery that absorbs administrative headache on behalf of the customer.',
    diagnosticQuestion:
      'Where do customers waste time, experience anxiety, or endure frustrating administrative friction in the current purchase journey?',
    primaryPillarImpact: 'Dramatically improves convenience and customer retention by removing cognitive and temporal burden.',
    crossPillarImplications: {
      valueArchitecture: 'Demands seamless digital dispatch, real-time tracking algorithms, or dense fulfillment networks.',
      profitEquation: 'Allows the firm to command premium convenience fees and achieve higher repeat customer lifetime value.',
    },
    canonicalCaseExample: {
      company: 'Blinkit & Zipcar',
      howApplied: 'Blinkit eliminated grocery planning via 10-minute delivery; Zipcar replaced car rental counter queues with instant RFID app unlocks.',
      impact: 'Converts infrequent planned errands into spontaneous, frictionless daily micro-transactions.',
    },
  },
  {
    id: 3,
    name: 'Find non-customers and overcome reluctance',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Target audiences who do not buy current offerings because prices are prohibitive, products are too complex, or access is physically restricted.',
    strategicMechanism:
      'Identifies the specific hurdle preventing non-consumers from entering the category and redesigns the offering specifically for them.',
    diagnosticQuestion:
      'Who actively avoids or cannot access the industry today, and what specific barrier (price, skill, geography) keeps them locked out?',
    primaryPillarImpact: 'Expands the total addressable market rather than fighting bloody battles for existing market share.',
    crossPillarImplications: {
      valueArchitecture: 'Requires alternative grassroots distribution, simplified user interfaces, or pay-as-you-go access models.',
      profitEquation: 'Unlocks massive unserved volume that compensates for lower individual transaction sizes.',
    },
    canonicalCaseExample: {
      company: 'Pinduoduo & Yulu',
      howApplied: 'Pinduoduo targeted Tier 3/4 Chinese rural consumers ignored by Alibaba; Yulu targeted license-free gig workers needing cheap daily transit.',
      impact: 'Grew to hundreds of millions of users by serving non-customers who lacked credit cards or luxury purchasing power.',
    },
  },
  {
    id: 4,
    name: 'Add more functionality or emotional resonance',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Elevate a mundane or commoditized product by weaving in superior emotional identity, status, craftsmanship, or integrated multipurpose utility.',
    strategicMechanism:
      'Transforms a purely utilitarian transaction into a bespoke, identity-affirming experience that customers take pride in owning.',
    diagnosticQuestion:
      'Can we transform a boring functional utility into an emotional, sensorial, or prestige experience that commands pride of ownership?',
    primaryPillarImpact: 'Elevates customer willingness to pay and shields the business from generic price-slashing competition.',
    crossPillarImplications: {
      valueArchitecture: 'Requires artisanal craftsmanship, premium storytelling, bespoke customization, or specialized brand prestige.',
      profitEquation: 'Commands high unit gross margins, offsetting smaller niche production runs.',
    },
    canonicalCaseExample: {
      company: 'Atelier Taffy & Apple',
      howApplied: 'Atelier Taffy creates bespoke made-to-order leathercraft with personal artisan connection; Apple weaves hardware with lifestyle identity.',
      impact: 'Generates exceptional gross margins and zero price competition from mass-market industrial producers.',
    },
  },
  {
    id: 5,
    name: 'Explore other segments or transpose from other industries',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Borrow a proven value proposition mechanism from an unrelated industry and adapt it to revolutionize your traditional sector.',
    strategicMechanism:
      'Cross-pollinates strategic ideas (e.g., bringing airline dynamic pricing to fitness classes, or software subscriptions to heavy machinery).',
    diagnosticQuestion:
      'What business model logic works brilliantly in another industry that has never been tried in our historical sector?',
    primaryPillarImpact: 'Surprises customers with unexpected value and disrupts traditional category expectations.',
    crossPillarImplications: {
      valueArchitecture: 'Adapts digital platforms, reservation software, or telemetry tracking from the source sector.',
      profitEquation: 'Shifts traditional revenue models to higher-velocity or recurring streams.',
    },
    canonicalCaseExample: {
      company: 'BMW Rent-A-Car / DriveNow',
      howApplied: 'Transposed the on-demand micro-billing model of telecom and scooter sharing into luxury automotive car rental.',
      impact: 'Created pay-per-minute luxury urban mobility, turning idle city cars into interactive brand showrooms.',
    },
  },
  {
    id: 6,
    name: 'Introduce new stakeholders and societal trends',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Incorporate third-party beneficiaries, environmental sustainability, circular lifecycle loops, or government sponsors into the core value equation.',
    strategicMechanism:
      'Aligns business incentives with broader societal outcomes: clean air, zero waste, animal welfare, or public health.',
    diagnosticQuestion:
      'Which external societal actors (cities, environmental groups, insurers) care deeply about our impact and could become co-beneficiaries or payers?',
    primaryPillarImpact: 'Creates strong public brand advocacy and unlocks institutional partnerships or municipal backing.',
    crossPillarImplications: {
      valueArchitecture: 'Requires verified green certifications, circular supply loops, or civic municipal cooperation.',
      profitEquation: 'Can unlock third-party sponsorships, municipal tax incentives, or green consumer premiums.',
    },
    canonicalCaseExample: {
      company: 'Yulu Clean Mobility',
      howApplied: 'Partnered with city municipal metro stations to provide zero-emission electric last-mile feeder mobility.',
      impact: 'Secured dedicated public transit parking zones and municipal endorsement by reducing urban smog.',
    },
  },
  {
    id: 7,
    name: 'Modify the revenue stream (Subscription, Usage, Freemium)',
    pillar: 'Value Proposition',
    plainEnglishExplanation:
      'Reinvent how, when, and for what customers pay: shifting from lumpy one-off product purchases to subscriptions, pay-per-use, or performance fees.',
    strategicMechanism:
      'Decouples cash generation from sporadic transactional purchases, building recurring revenue retainers and customer lock-in.',
    diagnosticQuestion:
      'Why must customers pay a large lump sum upfront? Could they pay per minute, per month, or only upon successful outcome?',
    primaryPillarImpact: 'Lowers customer adoption hurdles while dramatically improving customer lifetime value (LTV).',
    crossPillarImplications: {
      valueArchitecture: 'Requires billing software, customer success monitoring, and fleet maintenance capabilities.',
      profitEquation: 'Shifts lumpy revenue into predictable recurring cash flow; upfront annual retainers create negative working capital.',
    },
    canonicalCaseExample: {
      company: 'Zomato Gold & Hilti Fleet',
      howApplied: 'Zomato converted diners into monthly Gold subscribers; Hilti shifted drill purchases into monthly tool leases.',
      impact: 'Guaranteed predictable monthly recurring cash flow and built massive barriers against competitors.',
    },
  },

  // Value Architecture (Directions 8 to 14)
  {
    id: 8,
    name: 'Introduce radical technologies and platform automation',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Deploy modern digital tools, real-time telemetry, IoT sensors, or algorithmic matching to automate previously labor-heavy processes.',
    strategicMechanism:
      'Replaces human gatekeepers and manual workflows with digital coordination, multiplying operational speed and scalability.',
    diagnosticQuestion:
      'Which physical bottleneck or coordination delay in our current operations can be solved through algorithmic automation or IoT connectivity?',
    primaryPillarImpact: 'Enables real-time responsiveness and near-zero marginal cost of servicing incremental customers.',
    crossPillarImplications: {
      valueProposition: 'Allows on-demand, instant, and personalized service delivery.',
      profitEquation: 'High initial software capex amortizes rapidly, driving immense operational leverage as scale increases.',
    },
    canonicalCaseExample: {
      company: 'Yulu IoT Telematics & Blinkit Dispatch',
      howApplied: 'Yulu installed keyless smart IoT locks on all bikes; Blinkit uses algorithmic pick-and-pack routing in dark stores.',
      impact: 'Enables automated 24/7 self-service access without human checkout staff or physical rental counters.',
    },
  },
  {
    id: 9,
    name: 'Modify steps in the value chain',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Reconfigure how products are engineered, assembled, or distributed: rearranging the traditional chronological sequence of production.',
    strategicMechanism:
      'Changes when, where, and how activities occur to unlock hidden speed, cost advantages, or customization flexibility.',
    diagnosticQuestion:
      'What if we performed the final assembly at the customer doorstep, or prepared products before orders even arrive using predictive data?',
    primaryPillarImpact: 'Delivers unprecedented turnaround speed or tailored personalization that competitors cannot match.',
    crossPillarImplications: {
      valueProposition: 'Delivers hyper-customized products with near-instant turnaround times.',
      profitEquation: 'Reduces inventory carrying costs and eliminates markdown write-downs.',
    },
    canonicalCaseExample: {
      company: 'Dell Direct & Blinkit Predictive Restocking',
      howApplied: 'Dell assembled PCs only after customer credit cards cleared; Blinkit stages high-velocity SKUs in dark stores before morning rush.',
      impact: 'Radically shortened order fulfillment cycles while keeping working capital requirements negative.',
    },
  },
  {
    id: 10,
    name: 'Eliminate or add steps in the value chain (Disintermediation)',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Bypass traditional intermediaries (wholesalers, brokers, department stores) to connect manufacturers directly with end buyers (D2C / C2M).',
    strategicMechanism:
      'Cuts out middleman markup layers, capturing direct customer data and passing savings back to shoppers.',
    diagnosticQuestion:
      'Which middlemen take heavy margin cuts without adding real customer value, and how can we connect directly to the end user?',
    primaryPillarImpact: 'Recovers distributor margin spreads while establishing direct, unfiltered relationships with buyers.',
    crossPillarImplications: {
      valueProposition: 'Enables 30% to 50% lower retail pricing while maintaining superior manufacturer margins.',
      profitEquation: 'Cuts distributor margin leakage and speeds cash collection from months to minutes.',
    },
    canonicalCaseExample: {
      company: 'Pinduoduo C2M & Atelier Taffy',
      howApplied: 'Pinduoduo connected factories directly to group shoppers; Atelier Taffy sells bespoke leathercraft direct to clients online.',
      impact: 'Eliminated wholesale distributors, reducing consumer prices by 40% while preserving high creator margins.',
    },
  },
  {
    id: 11,
    name: 'Identify new inputs and circular resources',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Substitute expensive traditional raw materials or physical assets with reclaimed, crowdsourced, open-source, or circular inputs.',
    strategicMechanism:
      'Taps into underutilized community assets or off-the-shelf industrial parts to build products at a fraction of standard cost.',
    diagnosticQuestion:
      'What alternative, cheaper, or circular materials can replace expensive bespoke industrial components without sacrificing core utility?',
    primaryPillarImpact: 'Positions the offering as resource-efficient, durable, and resilient to supply chain shocks.',
    crossPillarImplications: {
      valueProposition: 'Creates compelling ecological and cost advantages for environmentally conscious buyers.',
      profitEquation: 'Drastically reduces unit variable bill-of-materials costs, boosting gross profit margins.',
    },
    canonicalCaseExample: {
      company: 'Frugal Innovation (ChotuKool & GE MAC 400)',
      howApplied: 'ChotuKool replaced expensive compressors with thermoelectric cooling chips; GE ECG used bus-ticket printing paper.',
      impact: 'Slashed manufacturing bills of materials by 70%, making products affordable for emerging market clinics.',
    },
  },
  {
    id: 12,
    name: 'Associate with competitors, clients, or suppliers (Coopetition)',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Forge strategic alliances with industry rivals, municipal authorities, or suppliers to pool infrastructure and share heavy capital costs.',
    strategicMechanism:
      'Transforms zero-sum competitive rivalries into collaborative ecosystems that expand the entire market pie.',
    diagnosticQuestion:
      'Which massive fixed infrastructure costs can we co-invest in with competitors or industry peers rather than funding alone?',
    primaryPillarImpact: 'Gives the business rapid access to established customer networks and shared standard infrastructure.',
    crossPillarImplications: {
      valueProposition: 'Expands geographic coverage and reliability for end users.',
      profitEquation: 'Amortizes massive fixed capital expenditures across multiple industry players, raising ROCE.',
    },
    canonicalCaseExample: {
      company: 'BMW DriveNow & Sixt / Yulu & Bajaj',
      howApplied: 'BMW partnered with Sixt for fleet operations and later with Daimler; Yulu partnered with Bajaj for purpose-built EV manufacturing.',
      impact: 'Shared fleet operations and vehicle engineering overhead, preventing duplicate capital destruction.',
    },
  },
  {
    id: 13,
    name: 'Identify and mobilize complementors',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Partner with independent products or services that make your offering significantly more valuable when consumed together.',
    strategicMechanism:
      'Co-creates joint value with ecosystem allies whose products naturally pair with yours (e.g., Michelin guide with road trips, apps with smartphones).',
    diagnosticQuestion:
      'What else does our customer buy right before, during, or after using our product, and how can we bundle or cross-sell with them?',
    primaryPillarImpact: 'Increases the perceived total value bundle for the customer with zero internal R&D cost.',
    crossPillarImplications: {
      valueProposition: 'Provides complete end-to-end solutions rather than standalone puzzle pieces.',
      profitEquation: 'Unlocks mutual referral commissions and joint marketing that slashes customer acquisition cost (CAC).',
    },
    canonicalCaseExample: {
      company: 'Zomato & Dining Out / Michelin',
      howApplied: 'Zomato paired restaurant discovery with bank credit card dining discounts; Michelin created gourmet dining guides to boost tire wear.',
      impact: 'Multiplies user engagement frequency while generating high-margin co-branded advertising revenues.',
    },
  },
  {
    id: 14,
    name: 'Monetize and leverage strategic resources',
    pillar: 'Value Architecture',
    plainEnglishExplanation:
      'Commercialize latent, underutilized, or proprietary assets: opening up internal logistics, data, or computing infrastructure to third parties.',
    strategicMechanism:
      'Turns internal cost centers into external high-margin profit centers by licensing capabilities to other businesses.',
    diagnosticQuestion:
      'What proprietary internal capability, data repository, or physical capacity do we possess that other firms would gladly pay to use?',
    primaryPillarImpact: 'Positions the company as an indispensable industry infrastructure utility.',
    crossPillarImplications: {
      valueProposition: 'Creates new B2B product lines alongside existing B2C operations.',
      profitEquation: 'Generates near-pure gross margin from previously sunk capital investments.',
    },
    canonicalCaseExample: {
      company: 'Amazon Web Services (AWS) & Zomato Hyperpure',
      howApplied: 'Amazon monetized excess server capacity as AWS; Zomato leveraged restaurant procurement scale into Hyperpure B2B food supply.',
      impact: 'Transformed internal operational assets into dominant, highly profitable standalone revenue engines.',
    },
  },
];

export const BUSINESS_CASES: BusinessCase[] = [
  {
    id: 'blinkit',
    name: 'Blinkit',
    sector: 'Quick Commerce & Instant Grocery',
    tagline: '10-minute micro-fulfillment engineered through hyper-local dark store density',
    summary:
      'Blinkit pioneered the quick-commerce revolution by shifting away from distant suburban ecommerce warehouses to a dense urban network of dark stores located within 2 to 3 kilometers of consumers, delivering essential groceries in 10 minutes.',
    valueProposition: {
      clients: 'Time-poor urban professionals, young families, and spontaneous convenience shoppers seeking immediate grocery and household deliveries.',
      offering: 'Ultra-fast delivery of 10,000+ everyday supermarket SKUs within 10 to 15 minutes, removing the need for planned weekly shopping trips.',
      pricing: 'Market retail price parity plus small variable handling and surge fees on peak or late-night orders.',
    },
    valueArchitecture: {
      valueChain: 'Predictive algorithm-driven replenishment, hyper-local dark stores (micro-fulfillment centers) with 2-minute pick-and-pack times, and dedicated gig rider dispatch.',
      partners: 'Direct FMCG brand partnerships for high-margin shelf placement, micro-warehousing property owners, and gig logistics partners.',
      resources: 'Proprietary store inventory algorithms, dense geo-spatial dark store network, real-time rider tracking software.',
    },
    profitEquation: {
      revenueDrivers: 'Product retail margin spreads, customer delivery and handling fees, and high-margin brand advertising/search placement on the app.',
      costStructure: 'Dark store rents, pick-and-pack warehouse staff, rider payout per delivery drop, and inventory shrinkage/spoilage.',
      capitalEmployed: 'Working capital tied up in rapid-turnover inventory (inventory turns every 10 to 14 days), modest fit-out capex per dark store.',
    },
    keyInnovationMechanism:
      'Replacing massive suburban distribution centers with hyper-dense urban dark stores, turning delivery speed from a luxury perk into the core competitive barrier to entry.',
    courseTakeaway:
      'Quick commerce proves that speed is a function of Value Architecture density. However, the Profit Equation only works when order density per dark store exceeds 1,000 orders/day to cover fixed rental overhead.',
    category: 'Quick Commerce',
  },
  {
    id: 'zomato',
    name: 'Zomato',
    sector: 'Food Delivery & Restaurant Platform',
    tagline: 'Multi-sided restaurant ecosystem combining consumer delivery with B2B farm-to-fork supply',
    summary:
      'Zomato evolved from a restaurant menu discovery directory into a dominant multi-sided platform orchestrating consumer food delivery, dining-out discovery, premium memberships (Zomato Gold), and B2B raw ingredient supply (Hyperpure).',
    valueProposition: {
      clients: 'Hungry consumers seeking restaurant variety on demand, and restaurant owners needing incremental dine-in discovery and delivery order volume.',
      offering: 'Seamless restaurant search, verified crowd reviews, live GPS food tracking, table bookings, and dining discounts.',
      pricing: 'Free discovery for consumers; tiered delivery charges, restaurant commissions (18% to 25%), and monthly Gold membership subscription.',
    },
    valueArchitecture: {
      valueChain: 'Consumer mobile discovery, automated restaurant order relay, dynamic algorithmic dispatch to nearby delivery partners, and Hyperpure farm-to-kitchen logistics.',
      partners: 'Over 200,000 restaurant partners, hundreds of thousands of gig delivery executives, and agricultural farm producers for Hyperpure.',
      resources: 'Extensive food ordering database, verified customer review repository, algorithmic dispatch engine, and high brand recall.',
    },
    profitEquation: {
      revenueDrivers: 'Restaurant take-rate commissions, customer delivery fees, Zomato Gold subscriptions, restaurant advertising, and Hyperpure B2B food wholesale margins.',
      costStructure: 'Delivery rider incentives, digital cloud infrastructure, payment processing fees, and customer acquisition marketing.',
      capitalEmployed: 'Asset-light marketplace model with low fixed physical assets, supplemented by working capital for Hyperpure B2B agricultural inventory.',
    },
    keyInnovationMechanism:
      'Building an integrated multi-sided ecosystem where consumer food delivery data feeds high-margin B2B ingredient supply, creating switching costs on both sides.',
    courseTakeaway:
      'Platforms achieve defensibility by expanding from consumer transactions (Value Proposition) into deep backend B2B supply infrastructure (Value Architecture).',
    category: 'Platform & Ecosystem',
  },
  {
    id: 'yulu',
    name: 'Yulu',
    sector: 'Urban Micro-Mobility & Clean Transit',
    tagline: 'Shared low-speed electric vehicles powered by decentralized modular battery-swapping kiosks',
    summary:
      'Yulu disrupted congested urban transit by deploying purpose-built low-speed electric two-wheelers for first-mile, last-mile, and gig delivery commutes, powered by its proprietary Yuma battery-swapping network that decouples vehicle uptime from charging downtime.',
    valueProposition: {
      clients: 'Urban commuters seeking affordable transit, and gig delivery workers (food and grocery couriers) needing low-cost daily transport without vehicle ownership.',
      offering: 'Accessible on-demand dockless electric bikes (Miracle and DeX) unlocked via mobile app, with zero driver license required and endless battery swaps.',
      pricing: 'Base unlock fee plus pay-per-minute driving rates, alongside discounted multi-day and weekly rental bundles for delivery executives.',
    },
    valueArchitecture: {
      valueChain: 'Hardware vehicle manufacturing partnership with Bajaj Auto, proprietary IoT telemetry tracking, and dense network of modular battery-swapping kiosks (Yuma).',
      partners: 'Bajaj Auto (vehicle production and equity partner), municipal metro stations, retail host partners for battery swap kiosks, and gig employers (Zomato, Swiggy, Blinkit).',
      resources: 'Proprietary BMS (battery management software), IoT telematics firmware, dense urban charging infrastructure, and custom rugged vehicle design.',
    },
    profitEquation: {
      revenueDrivers: 'Per-minute rental charges, daily and weekly delivery courier subscription passes, and battery-swap fees.',
      costStructure: 'Fleet vehicle depreciation, battery cell replacement, kiosk electricity tariffs, host store rent commissions, and field van rebalancing teams.',
      capitalEmployed: 'Capital-heavy fleet asset base, mitigated by long asset lifespan (3+ years with Bajaj) and high daily asset utilization exceeding 10 hours/day.',
    },
    keyInnovationMechanism:
      'Decoupling the battery from the vehicle. By swapping discharged batteries in 60 seconds at kiosks, Yulu keeps vehicles on the road generating revenue all day.',
    courseTakeaway:
      'In asset-heavy access models, Return on Capital Employed (ROCE) is entirely determined by asset uptime. Decoupling energy charging from asset downtime transforms unit economics.',
    category: 'Access & Mobility',
  },
  {
    id: 'pinduoduo',
    name: 'Pinduoduo',
    sector: 'Social E-Commerce & C2M Manufacturing',
    tagline: 'Viral social team purchases connecting factories directly to budget-conscious consumers',
    summary:
      'Pinduoduo revolutionized e-commerce in China by combining social media sharing (WeChat) with team purchases, allowing consumers to unlock ultra-low wholesale pricing directly from manufacturers (Consumer-to-Manufacturer / C2M), bypassing all traditional distributor layers.',
    valueProposition: {
      clients: 'Price-sensitive consumers in Tier 3, 4, and 5 cities seeking value for money, fresh agricultural produce, and everyday household necessities.',
      offering: 'Gamified social shopping where forming a team purchase with friends or strangers unlocks radical 30% to 70% discounts.',
      pricing: 'Deep discount pricing: individual purchase price vs. significantly lower team purchase price.',
    },
    valueArchitecture: {
      valueChain: 'Viral social acquisition via WeChat links, direct C2M demand aggregation transmitted to factories, and decentralized drop-ship delivery.',
      partners: 'Direct agricultural farmers, consumer goods manufacturers, WeChat (Tencent ecosystem), and third-party courier delivery networks.',
      resources: 'Proprietary consumer demand prediction algorithms, gamified mobile user interface, and direct relationships with over 10 million small factories and farmers.',
    },
    profitEquation: {
      revenueDrivers: 'Online merchant marketing services (advertising search slots and sponsored product recommendations) and modest transaction take rates.',
      costStructure: 'Bandwidth and cloud server infrastructure, customer acquisition promotional coupons, and platform trust/safety operations.',
      capitalEmployed: 'Extremely asset-light marketplace model. Carries negative working capital because consumers pay upfront while merchants are paid on credit terms.',
    },
    keyInnovationMechanism:
      'Aggregating fragmented consumer demand through viral social sharing to provide manufacturers with guaranteed batch volume, disintermediating multi-layered wholesale distributors.',
    courseTakeaway:
      'Pinduoduo illustrates the power of C2M disintermediation: when social sharing aggregates demand, the Value Architecture bypasses wholesale markups, creating massive cost savings and negative working capital.',
    category: 'Social Commerce',
  },
  {
    id: 'atelier-taffy',
    name: 'Atelier Taffy',
    sector: 'Niche Luxury Artisan Leathercraft',
    tagline: 'Made-to-order bespoke leathercraft eliminating finished goods inventory risk',
    summary:
      'Atelier Taffy operates an artisan luxury model producing handmade bespoke leather goods strictly on demand, capturing luxury willingness to pay without the working capital burden of unsold seasonal inventory.',
    valueProposition: {
      clients: 'Discerning luxury consumers, collectors, and connoisseurs seeking unique craftsmanship, bespoke personalization, and heirloom durability.',
      offering: 'Custom handmade leather bags, wallets, and accessories crafted one-by-one by master artisans with client-chosen hides, stitching, and hardware.',
      pricing: 'Premium luxury price point (EUR 500 to 2,500+) reflecting artisan labor hours, with 50% deposit collected at commission.',
    },
    valueArchitecture: {
      valueChain: 'Client digital consultation, individual hide selection from certified European tanneries, hand-cutting, saddle-stitching, edge finishing, and direct insured shipping.',
      partners: 'Artisan tannery suppliers (France and Italy), custom hardware foundries, and direct digital storytelling channels.',
      resources: 'Master leathercraft techniques, proprietary patterns, premium brand reputation, and intimate client relationships.',
    },
    profitEquation: {
      revenueDrivers: 'High unit margin bespoke commissions and limited seasonal batch releases.',
      costStructure: 'Master artisan labor time, premium vegetable-tanned hides, workshop equipment, and custom brass hardware.',
      capitalEmployed: 'Virtually zero finished goods inventory; working capital requirement is negative or minimal because upfront client deposits fund raw material purchases.',
    },
    keyInnovationMechanism:
      'Strict made-to-order production model. Eliminates unsold seasonal inventory markdowns, high-rent retail storefront leases, and department store intermediary fees.',
    courseTakeaway:
      'Atelier Taffy demonstrates that small businesses can achieve superior ROCE by eliminating inventory risk through made-to-order craftsmanship and direct customer intimacy.',
    category: 'Niche Craft',
  },
  {
    id: 'zipcar',
    name: 'Zipcar',
    sector: 'Car-Sharing & Access-Over-Ownership',
    tagline: 'Neighborhood-embedded self-service car club replacing personal vehicle ownership',
    summary:
      'Zipcar pioneered urban car-sharing by placing vehicles in designated neighborhood parking pods, accessible 24/7 via mobile app with fuel and insurance included, allowing city dwellers to avoid the high fixed costs of personal vehicle ownership.',
    valueProposition: {
      clients: 'Urban apartment dwellers, college students, and small business owners who drive occasionally and want to avoid car ownership costs.',
      offering: 'Self-service 24/7 access to cars parked in reserved neighborhood spots, bookable by the hour or day via mobile app, with fuel and insurance included.',
      pricing: 'Annual membership fee plus all-inclusive hourly (approx. $10 to $15/hr) and daily rental rates.',
    },
    valueArchitecture: {
      valueChain: 'Automated vehicle reservation, keyless RFID/mobile card vehicle unlock, fleet telemetry tracking, and centralized cleaning and fueling operations.',
      partners: 'Municipal parking authorities, university campuses, commercial parking garages, and vehicle leasing finance companies.',
      resources: 'Proprietary in-car telematics hardware, mobile reservation platform, and strategic reserved parking spots.',
    },
    profitEquation: {
      revenueDrivers: 'Predictable annual membership subscription fees plus variable hourly driving charges and optional damage waiver fees.',
      costStructure: 'Vehicle lease and depreciation, urban parking spot lease fees, commercial fleet insurance, maintenance, and fuel.',
      capitalEmployed: 'Capital-heavy fleet ownership or long-term lease liabilities, requiring consistent 40%+ fleet utilization to achieve operating profitability.',
    },
    keyInnovationMechanism:
      'Replacing the traditional airport rental counter with neighborhood-embedded keyless vehicles, monetizing fractional vehicle usage in hyper-local clusters.',
    courseTakeaway:
      'Zipcar illustrates the fundamental tension in "access over ownership" models: convenience drives high customer value, but the Profit Equation remains vulnerable to fixed vehicle lease costs and parking expenses during off-peak weekdays.',
    category: 'Access & Mobility',
  },
  {
    id: 'bmw-rent-a-car',
    name: 'BMW Rent-A-Car / DriveNow',
    sector: 'Automotive OEM Mobility Services',
    tagline: 'Free-floating luxury car rental turning vehicle production into on-demand urban mobility services',
    summary:
      'BMW launched DriveNow (later ShareNow) as an OEM direct mobility service, deploying fleets of premium BMW and MINI vehicles in major European cities with a "free-floating" model where users could drop cars anywhere within the business district.',
    valueProposition: {
      clients: 'Urban professionals and travelers desiring a spontaneous premium driving experience without long-term car leases or traditional rental paperwork.',
      offering: 'Instant on-street location and unlocking of premium BMW/MINI vehicles, pay-per-minute driving, free public street parking, and electric models (BMW i3).',
      pricing: 'One-time registration fee plus pay-per-minute driving rates (approx. EUR 0.30 to 0.40/min) covering fuel, insurance, and municipal street parking.',
    },
    valueArchitecture: {
      valueChain: 'OEM direct vehicle manufacturing and fleet allocation, in-car connected DriveNow infotainment telematics, on-street fleet rebalancing, and municipal parking permits.',
      partners: 'City municipal councils (citywide street parking agreements), Sixt (initial joint-venture operations partner), and electric charging providers.',
      resources: 'Direct access to OEM vehicle inventory, proprietary in-dash software integration, and premium BMW brand equity.',
    },
    profitEquation: {
      revenueDrivers: 'Per-minute and hourly driving fees, package bundles (3-hour, 6-hour passes), and inter-airport transit surcharges.',
      costStructure: 'Municipal parking block permits, vehicle depreciation, fleet refueling/charging labor teams, maintenance, and commercial insurance.',
      capitalEmployed: 'High balance sheet fleet capital, partially mitigated by internal OEM transfer pricing and capturing marketing trial value for future car sales.',
    },
    keyInnovationMechanism:
      'An automotive manufacturer integrating downstream into mobility services, capturing recurring urban driving minutes and utilizing fleet rental as an experiential showroom.',
    courseTakeaway:
      'OEM mobility showcases the strategic duality of business models: even when per-minute rental margins are pressured by high municipal parking costs, the model serves as an invaluable customer acquisition engine for luxury brand affinity.',
    category: 'Access & Mobility',
  },
  {
    id: 'frugal-innovation',
    name: 'Frugal Innovation (Jugaad Strategy)',
    sector: 'Resource-Constrained Engineering & Emerging Markets',
    tagline: 'Radical cost reduction by stripping non-essential complexity to serve mass underserved markets',
    summary:
      'Frugal innovation (exemplified by cases like GE Healthcare’s MAC 400 portable ECG, ChotuKool clay refrigeration, and solar micro-grids) redesigns products from scratch to deliver 80% of essential performance at 20% of the conventional cost.',
    valueProposition: {
      clients: 'Low-income households, rural healthcare clinics, and emerging market consumers excluded by expensive Western equipment.',
      offering: 'Durable, battery-powered, ultra-simple products engineered to withstand dust, erratic power grids, and unskilled operator environments.',
      pricing: 'Extremely accessible price points, pay-as-you-go micro-transactions, or community rental schemes.',
    },
    valueArchitecture: {
      valueChain: 'Bottom-up local customer research, modular component engineering using off-the-shelf consumer parts (e.g. bus ticket printers in medical ECGs), and grassroots rural distribution.',
      partners: 'Local community health workers, non-governmental organizations, village entrepreneurs, and regional fabrication shops.',
      resources: 'Deep context-specific engineering talent, frugal patent portfolio, and grassroots brand trust.',
    },
    profitEquation: {
      revenueDrivers: 'Mass unit volume sales to hundreds of millions of low-income consumers, and consumables/parts replacement.',
      costStructure: 'Extremely low bill of materials (BOM), low R&D development capex, and minimal localized sales overhead.',
      capitalEmployed: 'Low fixed capital requirements; high capital efficiency drives exceptional return on capital employed (ROCE).',
    },
    keyInnovationMechanism:
      'Rethinking product architecture under extreme resource constraints. Rather than de-featuring an expensive product, frugal innovation designs from the bottom up to solve core jobs-to-be-done.',
    courseTakeaway:
      'Frugal innovation proves that low price does not equal low margin. When the Value Architecture eliminates unnecessary complexity, a company can achieve outstanding ROCE by unlocking millions of non-customers.',
    category: 'Frugal Strategy',
  },
];

export const STRATEGIC_LEVERS: StrategicLever[] = [
  // Value Proposition Levers
  {
    id: 'access-over-ownership',
    name: 'Access over Ownership',
    pillar: 'Value Proposition',
    summary: 'Shift from selling physical assets to offering on-demand usage, pay-per-minute, or leasing.',
    impactOnModel: 'Lowers client capital threshold and increases accessibility while creating recurring revenue.',
    relatedCaseExample: 'Zipcar & BMW Rent-A-Car',
  },
  {
    id: 'instant-convenience',
    name: 'Instant Convenience & Friction Removal',
    pillar: 'Value Proposition',
    summary: 'Eliminate waiting times, complex ordering, and logistical friction for the customer.',
    impactOnModel: 'Drives high customer loyalty and habit formation, commanding premium convenience pricing.',
    relatedCaseExample: 'Blinkit 10-Minute Delivery',
  },
  {
    id: 'target-non-customers',
    name: 'Target Overlooked Non-Customers',
    pillar: 'Value Proposition',
    summary: 'Redesign offerings to attract audiences excluded by high prices, skill requirements, or geographical distance.',
    impactOnModel: 'Expands the addressable market dramatically by breaking traditional industry barriers.',
    relatedCaseExample: 'Frugal Innovation & Pinduoduo',
  },
  {
    id: 'recurring-subscription',
    name: 'Recurring Subscription Retainers',
    pillar: 'Value Proposition',
    summary: 'Replace erratic transactional billing with predictable weekly, monthly, or annual membership plans.',
    impactOnModel: 'Stabilizes cash flow and improves customer lifetime value while building negative working capital.',
    relatedCaseExample: 'Zomato Gold & Hilti Fleet',
  },

  // Value Architecture Levers
  {
    id: 'micro-fulfillment-density',
    name: 'Hyper-Local Micro-Fulfillment',
    pillar: 'Value Architecture',
    summary: 'Deploy dense urban fulfillment nodes (dark stores) within 2-3 km of end consumers.',
    impactOnModel: 'Enables ultra-fast delivery times while reducing last-mile transit duration.',
    relatedCaseExample: 'Blinkit Dark Stores',
  },
  {
    id: 'platform-disintermediation',
    name: 'C2M & Direct Disintermediation',
    pillar: 'Value Architecture',
    summary: 'Bypass wholesalers and multi-tiered distributors to connect manufacturers directly with buyers.',
    impactOnModel: 'Recovers distributor margin spreads and gives the company direct customer relationship data.',
    relatedCaseExample: 'Pinduoduo & Atelier Taffy',
  },
  {
    id: 'ecosystem-partnerships',
    name: 'Multi-Sided Ecosystem Alliances',
    pillar: 'Value Architecture',
    summary: 'Orchestrate independent partners (restaurants, drivers, manufacturers) to deliver value without owning all assets.',
    impactOnModel: 'Enables rapid asset-light scaling while shifting fixed equipment liabilities to partners.',
    relatedCaseExample: 'Zomato Marketplace & Yulu/Bajaj',
  },
  {
    id: 'battery-swapping-infra',
    name: 'Decoupled Energy Infrastructure',
    pillar: 'Value Architecture',
    summary: 'Separate battery charging from vehicle operations through rapid modular battery-swapping kiosks.',
    impactOnModel: 'Maximizes fleet vehicle uptime to 10+ hours per day and eliminates charging downtime.',
    relatedCaseExample: 'Yulu Yuma Network',
  },

  // Profit Equation Levers
  {
    id: 'negative-working-capital',
    name: 'Negative Working Capital Dynamics',
    pillar: 'Profit Equation',
    summary: 'Collect cash upfront from customers before paying suppliers and partners for delivery.',
    impactOnModel: 'Self-funds rapid operational growth without needing heavy external bank debt or equity dilution.',
    relatedCaseExample: 'Pinduoduo & Dell Direct',
  },
  {
    id: 'asset-utilization-scale',
    name: 'Fleet & Asset Utilization Maximization',
    pillar: 'Profit Equation',
    summary: 'Amortize heavy fixed capital across continuous day-and-night commercial and consumer cycles.',
    impactOnModel: 'Transforms return on capital employed (ROCE) by multiplying revenue hours per asset.',
    relatedCaseExample: 'Yulu & Zipcar',
  },
];

export const BASELINE_SCENARIOS: BusinessScenario[] = [
  {
    id: 'repair-shop',
    name: 'Neighbourhood Repair Shop',
    sector: 'Consumer Electronics & Home Appliances',
    oneLiner: 'A local walk-in workshop fixing broken appliances and smartphones on an ad-hoc hourly basis.',
    baseline: {
      targetCustomers: 'Local residents and walk-in owners of faulty appliances, laptops, and smartphones within a 3-mile radius.',
      customerNeed: 'Urgent emergency repair when a device or home appliance breaks down unexpectedly.',
      productOrService: 'Ad-hoc diagnostic inspections and manual parts replacement (screen fixes, motor repairs, battery swaps).',
      pricingAndRevenueModel: 'Lumpy transactional billing: flat diagnostic fee (EUR 30) plus hourly labor rate (EUR 50/hr) and marked-up spare parts.',
      mainActivitiesAndPartners: 'Diagnostic troubleshooting, physical teardowns, ordering OEM replacement parts from secondary suppliers.',
      keyResources: '2 certified master technicians, 1 specialized workbench, basic solder/diagnostic tooling, local storefront lease.',
      mainCosts: 'Fixed workshop rent, technician salaries, inventory of generic screws/batteries, shop insurance.',
      capitalRequirements: 'Modest working capital tied up in slow-moving spare parts; EUR 15,000 invested in workshop testing equipment.',
    },
    diagnosticPrompts: [
      {
        id: 'p1',
        title: 'Unpredictable, Lumpy Transactional Cash Flow',
        description: 'Shop depends on unexpected device breakdowns; winter months suffer 60% revenue slumps while technician salaries and rent remain fixed.',
        suggestedLevers: ['recurring-subscription', 'access-over-ownership'],
      },
      {
        id: 'p2',
        title: 'High Customer Friction & Mistrust',
        description: 'Customers delay fixing minor issues because they fear surprise diagnostic charges and unpredictable repair turnaround times.',
        suggestedLevers: ['instant-convenience', 'ecosystem-partnerships'],
      },
      {
        id: 'p3',
        title: 'Zero Relationship with B2B Property Managers',
        description: 'Local apartment landlords manage 500+ residential rental units nearby, yet the shop deals solely with individual walk-in residents.',
        suggestedLevers: ['ecosystem-partnerships', 'recurring-subscription'],
      },
    ],
    defaultLevers: ['recurring-subscription', 'ecosystem-partnerships'],
    curatedRemix: {
      name: 'HomeCare Plus: Proactive Appliance Maintenance Subscription',
      leversUsed: ['recurring-subscription', 'ecosystem-partnerships'],
      diagnosticRationale:
        'Transform an anxious, reactive walk-in repair shop into an indispensable subscription partner for homeowners and residential property managers.',
      proposedModel: {
        valueProposition: {
          clients: 'Homeowners and property managers seeking guaranteed home appliance uptime without surprise emergency expenses.',
          offering: 'All-inclusive home maintenance retainer: biannual preventive tune-ups, priority 2-hour emergency dispatch, and free temporary loaner appliances.',
          price: 'EUR 19/month per residential household (or EUR 15/unit for property managers with 20+ units).',
        },
        valueArchitecture: {
          valueChain: 'Scheduled off-peak route inspections, digitized technician dispatch mobile app, standardized multi-point maintenance checklists.',
          partners: 'Local residential property managers, appliance insurance underwriters, and direct spare parts OEM distributors.',
          resources: 'Preventive maintenance diagnostic software, fleet of 3 branded mobile repair vans, inventory of standard loaner appliances.',
        },
        profitEquation: {
          revenueDynamics: 'Predictable, recurring subscription revenue accounting for 75% of total income, with 85% annual subscriber renewal rate.',
          costStructure: 'Lower customer acquisition cost through bulk property manager contracts; technician schedules smoothed across off-peak weekdays.',
          capitalEmployed: 'Working capital turns negative because annual and monthly subscriptions are collected upfront before repair labor is deployed.',
        },
      },
      whoBenefits:
        'Tenants and homeowners receive peace of mind and loaner appliances; property managers protect asset values; the shop eliminates seasonal revenue volatility.',
      whatChanges:
        'Shifts from reactive breakdown billing (Direction 7) to proactive ecosystem service management with property managers (Direction 12).',
      valueCreationLogic:
        'Preventive maintenance avoids costly emergency teardowns, saving money for clients while creating high-margin recurring cash flows for the shop.',
      risksAndAssumptions: [
        'Assumption: Property managers value proactive maintenance enough to sign multi-unit annual retainers.',
        'Risk: A sudden cluster of simultaneous catastrophic breakdowns could temporarily overwhelm technician dispatch capacity.',
      ],
      realityCheck: {
        customerValueScore: 8.8,
        operationalFeasibilityScore: 8.1,
        economicViabilityScore: 9.0,
        verdict: 'Commercially Compelling with Immediate Cash Flow Stabilization',
        stressQuestions: [
          'What is the maximum number of subscribers one technician can service without compromising the 2-hour emergency response SLA?',
          'Will property managers demand heavy discounts that squeeze technician gross margins below 50%?',
        ],
      },
    },
  },
  {
    id: 'food-producer',
    name: 'Artisanal Organic Food Producer',
    sector: 'Agrifood & Consumer Packaged Goods (CPG)',
    oneLiner: 'A family-owned organic farm producing small-batch olive oils, honey, and fruit preserves sold via supermarket distributors.',
    baseline: {
      targetCustomers: 'Eco-conscious grocery shoppers buying organic gourmet pantry staples in regional supermarkets.',
      customerNeed: 'Healthy, traceable, natural food items free from synthetic pesticides and artificial preservatives.',
      productOrService: 'Single-jar retail sales of extra virgin olive oil, wild lavender honey, and stone-fruit jams.',
      pricingAndRevenueModel: 'Wholesale pricing: sells to distributors at 50% below retail shelf price, with 90-day deferred payment terms.',
      mainActivitiesAndPartners: 'Organic cultivation, harvesting, small-batch cold-pressing, bottling, shipping to regional food distributors.',
      keyResources: 'Certified 25-hectare organic orchard, cold-press bottling machinery, regional brand trademark.',
      mainCosts: 'Seasonal farm labor, glass packaging, certified organic testing audits, distributor freight handling.',
      capitalRequirements: 'High working capital tied up in seasonal inventory between autumn harvest and slow retail store sell-through.',
    },
    diagnosticPrompts: [
      {
        id: 'f1',
        title: 'Severe Intermediary Margin Erosion',
        description: 'Wholesale distributors and supermarket chains capture over 55% of the consumer shelf price, leaving the farm with razor-thin margins.',
        suggestedLevers: ['platform-disintermediation', 'negative-working-capital'],
      },
      {
        id: 'f2',
        title: 'Zero Consumer Relationship & Data',
        description: 'Because supermarkets control checkout, the farm has no direct communication, contact info, or loyalty data from shoppers.',
        suggestedLevers: ['platform-disintermediation', 'recurring-subscription'],
      },
    ],
    defaultLevers: ['platform-disintermediation', 'recurring-subscription'],
    curatedRemix: {
      name: 'Terroir Club: Farm-to-Table Seasonal Subscription & Tree Adoption',
      leversUsed: ['platform-disintermediation', 'recurring-subscription'],
      diagnosticRationale:
        'Disintermediate supermarket distributors (Direction 10) by shifting to direct-to-consumer quarterly harvest boxes and tree adoption retainers (Direction 7).',
      proposedModel: {
        valueProposition: {
          clients: 'Gourmet culinary enthusiasts and corporate gift buyers seeking direct provenance, harvest-fresh olive oils, and personal connection to the land.',
          offering: 'Adopt-an-Olive-Tree membership: personalized quarterly harvest reserve boxes, private orchard visits, and seasonal chef pairings.',
          price: 'EUR 240 annual membership (billed annually or EUR 22/month), delivering 4 curated seasonal shipments directly to doorsteps.',
        },
        valueArchitecture: {
          valueChain: 'Direct-to-consumer digital portal, batch parcel logistics, branded sustainable packaging, quarterly harvest newsletters.',
          partners: 'Eco-friendly courier services, artisan culinary chefs, specialty cheese and sourdough partners.',
          resources: 'Direct subscriber CRM database, dedicated storytelling content production, on-farm visitor guest house.',
        },
        profitEquation: {
          revenueDynamics: 'Captures full 100% consumer retail value (no 55% supermarket distributor haircut), with predictable 80%+ annual subscription retention.',
          costStructure: 'Eliminates distributor shelf-listing fees; parcel shipping costs are covered by subscribers.',
          capitalEmployed: 'Upfront annual subscription payments collected before harvest fund all seasonal labor, producing negative working capital requirements.',
        },
      },
      whoBenefits:
        'Consumers receive harvest-fresh products with radical traceability; the farm doubles net profit margins and eliminates wholesale credit risk.',
      whatChanges:
        'Transitions from commoditized wholesale shelf listing into an intimate consumer membership community.',
      valueCreationLogic:
        'Direct relationship replaces anonymous distributor layers, converting agricultural produce into an experiential luxury ritual.',
      risksAndAssumptions: [
        'Assumption: Direct-to-consumer parcel delivery does not encounter high glass bottle breakage rates in transit.',
        'Risk: Digital customer acquisition costs (CAC) through social channels could exceed wholesale distributor fees if viral word-of-mouth fails.',
      ],
      realityCheck: {
        customerValueScore: 9.1,
        operationalFeasibilityScore: 8.4,
        economicViabilityScore: 9.2,
        verdict: 'Remarkable Margin Expansion with Direct Customer Intimacy',
        stressQuestions: [
          'What is the customer acquisition cost to acquire 2,000 direct club subscribers via organic digital storytelling?',
          'How will the farm handle reverse logistics if a batch is delayed by seasonal frost or shipping customs?',
        ],
      },
    },
  },
  {
    id: 'edtech',
    name: 'Vocational Training Institute',
    sector: 'Professional Education & B2B Skills',
    oneLiner: 'A private technical academy offering in-person 12-week coding and technical certifications funded by student tuition.',
    baseline: {
      targetCustomers: 'Career changers and recent high school graduates seeking entry-level software development and IT jobs.',
      customerNeed: 'Accelerated, job-ready practical skills to break into high-paying technology careers without a 4-year degree.',
      productOrService: '12-week intensive in-person bootcamp covering full-stack software development.',
      pricingAndRevenueModel: 'High upfront student tuition fee (EUR 6,500) payable prior to course commencement.',
      mainActivitiesAndPartners: 'Curriculum development, campus classroom leasing, hiring instructor practitioners, job fair placement.',
      keyResources: 'City center campus facility, computer labs, network of tech hiring company partners.',
      mainCosts: 'Fixed campus rent, instructor salaries, paid student recruitment advertising on Google and LinkedIn.',
      capitalRequirements: 'Significant upfront capital invested in campus leases, workstations, and high student recruitment marketing.',
    },
    diagnosticPrompts: [
      {
        id: 'e1',
        title: 'High Student Tuition Adoption Barrier',
        description: 'Upfront EUR 6,500 tuition fee causes an 85% drop-off rate among qualified applicants who lack savings or bank loans.',
        suggestedLevers: ['target-non-customers', 'access-over-ownership'],
      },
      {
        id: 'e2',
        title: 'Skyrocketing Paid Acquisition (CAC)',
        description: 'Google and social ad costs have tripled over 3 years, consuming 35% of each student tuition fee in pure marketing overhead.',
        suggestedLevers: ['ecosystem-partnerships', 'platform-disintermediation'],
      },
    ],
    defaultLevers: ['target-non-customers', 'ecosystem-partnerships'],
    curatedRemix: {
      name: 'TalentBridge: Employer-Sponsored Apprenticeship Pipeline',
      leversUsed: ['target-non-customers', 'ecosystem-partnerships'],
      diagnosticRationale:
        'Remove student tuition friction entirely by shifting the paying client to hiring tech enterprises seeking qualified, pre-vetted engineers.',
      proposedModel: {
        valueProposition: {
          clients: 'Talented career switchers (who pay EUR 0 upfront) and tech enterprises facing expensive junior developer recruitment bottlenecks.',
          offering: 'Zero-tuition 16-week project academy followed by guaranteed 12-month paid apprenticeship with hiring enterprise partners.',
          price: 'EUR 0 for students; hiring corporate partner pays a EUR 9,000 placement success fee plus monthly apprenticeship management retainer.',
        },
        valueArchitecture: {
          valueChain: 'Rigorous cognitive screening, employer-customized curriculum sprints, remote project labs, and automated technical assessments.',
          partners: 'Tech enterprises (SaaS companies, banks, digital agencies), cloud infrastructure providers, and industry mentors.',
          resources: 'Proprietary project assessment algorithm, employer hiring portal, and active developer alumni network.',
        },
        profitEquation: {
          revenueDynamics: 'Higher revenue yield per student (EUR 9,000 corporate placement fee vs. EUR 6,500 old student fee), with zero default rate.',
          costStructure: 'Student acquisition CAC drops to near-zero as thousands apply for zero-tuition training; campus lease replaced by hybrid remote delivery.',
          capitalEmployed: 'Asset-light operational model with zero campus lease commitments and rapid cash conversion upon placement.',
        },
      },
      whoBenefits:
        'Students enter tech careers debt-free; hiring companies access pre-vetted, loyal junior talent at half the cost of recruitment headhunters.',
      whatChanges:
        'Shifts the customer from cash-strapped students to talent-hungry corporations, replacing tuition barriers with corporate recruitment sponsorship.',
      valueCreationLogic:
        'Aligns business incentives with student success: the institute only profits when the graduate is successfully hired and productive.',
      risksAndAssumptions: [
        'Assumption: Corporate hiring demand remains strong during macroeconomic tech hiring contractions.',
        'Risk: Slower placement cycles during enterprise budget freezes could lengthen cash collection cycles.',
      ],
      realityCheck: {
        customerValueScore: 9.4,
        operationalFeasibilityScore: 8.6,
        economicViabilityScore: 9.1,
        verdict: 'Transformative Incentive Realignment with Massive Scalability',
        stressQuestions: [
          'What contractual penalty applies if an employer cancels their apprenticeship cohort after training has commenced?',
          'How does the model maintain student completion discipline when they have zero financial capital invested?',
        ],
      },
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'concept',
    question: 'Why did Blinkit abandon centralized suburban ecommerce warehouses to adopt urban dark stores?',
    context: 'Evaluating Value Architecture choices in Quick Commerce.',
    options: [
      {
        id: 'a',
        text: 'To minimize real estate rental costs in city centers.',
        isCorrect: false,
        explanation: 'Incorrect. City-center dark stores actually carry higher rent per square meter than distant suburban warehouses.',
      },
      {
        id: 'b',
        text: 'To achieve 10-minute delivery by establishing micro-fulfillment density within a 2-3km radius of consumers.',
        isCorrect: true,
        explanation: 'Correct! Delivery speed in quick commerce is an architectural outcome of geospatial proximity, reducing transit distance and enabling 2-minute pick-and-pack times.',
      },
      {
        id: 'c',
        text: 'To eliminate the need for delivery gig couriers entirely.',
        isCorrect: false,
        explanation: 'Incorrect. Blinkit still relies on dedicated gig couriers.',
      },
      {
        id: 'd',
        text: 'To sell exclusively high-end luxury electronics.',
        isCorrect: false,
        explanation: 'Incorrect. Blinkit focuses primarily on everyday supermarket groceries and household essentials.',
      },
    ],
    pedagogicalTakeaway:
      'Speed is a function of Value Architecture density. By shifting fulfillment nodes closer to the customer, the business model creates competitive barriers that distant competitors cannot match.',
    relatedPillar: 'Value Architecture',
    relatedCaseId: 'blinkit',
  },
  {
    id: 'q2',
    type: 'tradeoff',
    question: 'How did Yulu overcome the crippling fleet downtime bottleneck that hurt traditional electric scooter sharing clubs?',
    context: 'Analyzing Profit Equation and ROCE dynamics in urban micro-mobility.',
    options: [
      {
        id: 'a',
        text: 'By asking customers to take batteries home and charge them overnight.',
        isCorrect: false,
        explanation: 'Incorrect. Forcing customers to charge vehicles creates massive friction and safety hazards.',
      },
      {
        id: 'b',
        text: 'By building the Yuma battery-swapping network, decoupling vehicle revenue uptime from charging downtime.',
        isCorrect: true,
        explanation: 'Correct! Traditional shared EVs sit idle for 4 to 6 hours while charging. Battery swapping takes 60 seconds, keeping vehicles on the road 10+ hours per day to maximize Return on Capital Employed (ROCE).',
      },
      {
        id: 'c',
        text: 'By increasing per-minute rental tariffs by 400%.',
        isCorrect: false,
        explanation: 'Incorrect. Higher tariffs would destroy commuter demand.',
      },
      {
        id: 'd',
        text: 'By using petrol engines instead of electric motors.',
        isCorrect: false,
        explanation: 'Incorrect. Yulu is strictly an all-electric micro-mobility ecosystem.',
      },
    ],
    pedagogicalTakeaway:
      'In capital-heavy access models, Return on Capital Employed (ROCE) is determined by asset uptime. Decoupling energy replenishment from asset downtime transforms unit profitability.',
    relatedPillar: 'Profit Equation',
    relatedCaseId: 'yulu',
  },
  {
    id: 'q3',
    type: 'concept',
    question: 'Why does Frugal Innovation frequently achieve exceptional Return on Capital Employed (ROCE) despite ultra-low unit prices?',
    context: 'Connecting Value Architecture simplification to the Profit Equation.',
    options: [
      {
        id: 'a',
        text: 'Because development capex is drastically minimized using off-the-shelf consumer parts for massive unaddressed markets.',
        isCorrect: true,
        explanation: 'Correct! By stripping non-essential complexity and repurposing existing consumer parts (e.g. bus ticket printers in medical ECGs), capital employed is ultra-low. Massive volume to non-customers multiplies total ROCE.',
      },
      {
        id: 'b',
        text: 'Because governments provide 100% subsidies for all frugal products.',
        isCorrect: false,
        explanation: 'Incorrect. Frugal innovations like GE MAC 400 are commercially self-sustaining products, not subsidized charities.',
      },
      {
        id: 'c',
        text: 'Because frugal products are sold at 90% gross margins.',
        isCorrect: false,
        explanation: 'Incorrect. Gross margins are modest, but capital turnover speed is extremely rapid.',
      },
      {
        id: 'd',
        text: 'Because customers are forced to sign lifetime maintenance contracts.',
        isCorrect: false,
        explanation: 'Incorrect. Frugal devices are designed for standalone simplicity without expensive service contracts.',
      },
    ],
    pedagogicalTakeaway:
      'Low price does not equal low margin. When the Value Architecture eliminates unnecessary complexity, a company can achieve outstanding ROCE by unlocking millions of non-customers.',
    relatedPillar: 'Profit Equation',
    relatedCaseId: 'frugal-innovation',
  },
  {
    id: 'q4',
    type: 'tradeoff',
    question: 'What is the primary economic vulnerability of Zipcars access-over-ownership car sharing model?',
    context: 'Analyzing fixed versus variable cost structures in car-sharing clubs.',
    options: [
      {
        id: 'a',
        text: 'High fixed vehicle lease commitments and parking spot fees during off-peak weekday lulls.',
        isCorrect: true,
        explanation: 'Correct! While convenience drives strong weekend demand, vehicles sit idle during weekday mornings. Fixed vehicle depreciation and reserved parking slot leases continue burning capital, pressuring operating margins.',
      },
      {
        id: 'b',
        text: 'Excessive cloud software server costs.',
        isCorrect: false,
        explanation: 'Incorrect. Cloud software is a scalable fixed cost with near-zero marginal expense per trip.',
      },
      {
        id: 'c',
        text: 'Inability of consumers to use mobile smartphones.',
        isCorrect: false,
        explanation: 'Incorrect. Smartphone adoption is universal among urban car-sharing drivers.',
      },
      {
        id: 'd',
        text: 'Lack of fuel stations in metropolitan cities.',
        isCorrect: false,
        explanation: 'Incorrect. Fuel availability was never a barrier for Zipcar.',
      },
    ],
    pedagogicalTakeaway:
      'Access-over-ownership models require high continuous asset utilization. When assets sit idle during off-peak periods, fixed lease liabilities erode profitability.',
    relatedPillar: 'Profit Equation',
    relatedCaseId: 'zipcar',
  },
  {
    id: 'q5',
    type: 'scenario',
    question: 'How does Pinduoduo achieve negative working capital in its social e-commerce business model?',
    context: 'Investigating cash conversion cycles and disintermediation.',
    options: [
      {
        id: 'a',
        text: 'By collecting cash upfront from social team shoppers while settling manufacturer payouts on delayed credit terms.',
        isCorrect: true,
        explanation: 'Correct! Shoppers pay instantly via WeChat Pay on Day 0. Pinduoduo aggregates demand and pays factories 30 to 60 days later, generating a large float of customer cash that self-funds rapid expansion.',
      },
      {
        id: 'b',
        text: 'By borrowing capital at zero interest from international banks.',
        isCorrect: false,
        explanation: 'Incorrect. Negative working capital is an operational cash flow dynamic, not bank borrowing.',
      },
      {
        id: 'c',
        text: 'By warehousing 6 months of inventory in regional warehouses.',
        isCorrect: false,
        explanation: 'Incorrect. Pinduoduo holds zero inventory under its C2M drop-ship model.',
      },
      {
        id: 'd',
        text: 'By charging sellers a 50% non-refundable onboarding deposit.',
        isCorrect: false,
        explanation: 'Incorrect. Pinduoduo attracted factories specifically through low barriers to entry.',
      },
    ],
    pedagogicalTakeaway:
      'Negative working capital occurs when a company collects cash from clients before paying its suppliers. It creates internal self-funding capital that accelerates business model growth.',
    relatedPillar: 'Profit Equation',
    relatedCaseId: 'pinduoduo',
  },
  {
    id: 'q6',
    type: 'concept',
    question: 'In the Odyssey 3.14 framework, how does Corporate Strategy differ from a Business Model?',
    context: 'Distinguishing strategic hierarchy taught in Session 1.',
    options: [
      {
        id: 'a',
        text: 'Corporate strategy manages a portfolio of distinct business models, while the business model articulates how value is created, delivered, and captured in an operational unit.',
        isCorrect: true,
        explanation: 'Correct! Large corporations (like Amazon or LVMH) manage multiple distinct business models simultaneously. The business model describes the operational reality: who we serve, what we promise, how we architect the engine, and how much return on capital (ROCE) is captured.',
      },
      {
        id: 'b',
        text: 'They are completely synonymous terms with no academic distinction.',
        isCorrect: false,
        explanation: 'Incorrect. Our course explicitly established strategy levels: Corporate Strategy vs. Business Strategy vs. Business Model.',
      },
      {
        id: 'c',
        text: 'A business model only applies to non-profit charitable organizations.',
        isCorrect: false,
        explanation: 'Incorrect. All commercial and non-profit enterprises operate under a business model.',
      },
      {
        id: 'd',
        text: 'Corporate strategy only focuses on graphic design and logo creation.',
        isCorrect: false,
        explanation: 'Incorrect. Corporate strategy manages company scope, mergers, acquisitions, and portfolio resource allocation.',
      },
    ],
    pedagogicalTakeaway:
      'A firm is not a monolithic entity: it is a collection of business models. Diagnosis requires separating each distinct value logic rather than analyzing the company as an undifferentiated whole.',
    relatedPillar: 'Value Proposition',
  },
];

// GAMIFICATION DATA: WORDLE (TERMLE) WORDS
export const WORDLE_WORDS: WordleWord[] = [
  {
    word: 'VALUE',
    hint: 'The core promise created for clients and captured as economic margin.',
    strategicMeaning: 'In Odyssey 3.14, competitive advantage widens the wedge between willingness to pay and firm cost.',
    relatedCaseOrDirection: 'Direction 1 to 7 (Value Proposition)',
  },
  {
    word: 'SCALE',
    hint: 'Amortizing fixed operational density over soaring transaction volumes.',
    strategicMeaning: 'In Quick Commerce (Blinkit), scale density amortizes fixed dark store rent across 1,000+ daily orders.',
    relatedCaseOrDirection: 'Blinkit & Zomato Marketplaces',
  },
  {
    word: 'PILOT',
    hint: 'A low-risk, rapid experiment to test critical business model hypotheses before full rollout.',
    strategicMeaning: 'Before building heavy infrastructure, test whether target clients value the new mechanism.',
    relatedCaseOrDirection: 'Remix Lab Reality Check',
  },
  {
    word: 'CHAIN',
    hint: 'The sequential flow of activities and transformations within the firm.',
    strategicMeaning: 'Direction 9 and 10: Modify, eliminate, or add steps in the value chain to disintermediate middlemen.',
    relatedCaseOrDirection: 'Pinduoduo C2M & Dell Direct',
  },
  {
    word: 'PRICE',
    hint: 'The monetary mechanism and timing through which customers pay for value delivered.',
    strategicMeaning: 'Price is not just a number: it is a business model lever (subscriptions, usage billing, freemium).',
    relatedCaseOrDirection: 'Direction 7: Modify the Revenue Stream',
  },
  {
    word: 'FLEET',
    hint: 'Physical mobile assets deployed to deliver on-demand mobility or logistics.',
    strategicMeaning: 'Fleet models (Zipcar, Yulu, BMW DriveNow) live or die on daily vehicle utilization hours and ROCE.',
    relatedCaseOrDirection: 'Yulu, Zipcar & BMW Rent-A-Car',
  },
  {
    word: 'ASSET',
    hint: 'Physical or digital capabilities that appear on balance sheets and determine capital employed.',
    strategicMeaning: 'Asset-light architectures monetize external partner assets to scale without heavy balance sheet debt.',
    relatedCaseOrDirection: 'Direction 14: Leverage Strategic Resources',
  },
  {
    word: 'PIVOT',
    hint: 'A deliberate strategic shift from a failing baseline model to an alternative value architecture.',
    strategicMeaning: 'Challenging industry orthodoxies to escape commodity price-slashing competition.',
    relatedCaseOrDirection: 'HEC Paris Odyssey 3.14 Framework',
  },
  {
    word: 'WEDGE',
    hint: 'The spread between customer willingness to pay and total operational cost.',
    strategicMeaning: 'Business model innovation widens this wedge either by raising perceived value or stripping architectural cost.',
    relatedCaseOrDirection: 'Session 1: Competitive Advantage Foundations',
  },
];

// GAMIFICATION DATA: SPIN THE WHEEL CHALLENGES
export const SPIN_CHALLENGES: SpinChallenge[] = [
  {
    id: 'spin-1',
    directionId: 10,
    directionName: 'Direction 10: Eliminate or Add Steps (Disintermediation)',
    businessScenario: 'Artisanal olive oil producer losing 55% margin to supermarket distributors.',
    prompt: 'You landed on Direction 10! How should the producer disintermediate the value chain to maximize ROCE?',
    options: [
      {
        id: 'opt-a',
        label: 'Direct-to-Consumer Terroir Club with Upfront Pre-Orders',
        actionDescription: 'Launch a farm-to-table quarterly harvest membership collecting cash upfront before bottling.',
        isOptimal: true,
        feedback: 'Magnificent move! Recovers the 55% distributor haircut, builds direct customer intimacy, and creates negative working capital.',
        roceImpact: '+140% ROCE Surge',
        xp: 150,
      },
      {
        id: 'opt-b',
        label: 'Open 10 expensive physical retail boutiques in capital cities',
        actionDescription: 'Sign 10-year prime downtown leases to sell oil directly to foot traffic.',
        isOptimal: false,
        feedback: 'Dangerous! High retail lease commitments and shop staffing incinerate working capital and destroy ROCE.',
        roceImpact: '-40% ROCE Destruction',
        xp: 25,
      },
      {
        id: 'opt-c',
        label: 'Lower wholesale price to supermarkets by 20%',
        actionDescription: 'Accept even slimmer margins in hopes of winning larger shelf volume.',
        isOptimal: false,
        feedback: 'Race to the bottom! Supermarkets will demand even higher discounts, eroding farm viability.',
        roceImpact: '-25% ROCE Drop',
        xp: 10,
      },
    ],
  },
  {
    id: 'spin-2',
    directionId: 7,
    directionName: 'Direction 7: Modify the Revenue Stream',
    businessScenario: 'Neighbourhood repair shop facing 60% revenue winter slumps during off-peak months.',
    prompt: 'You landed on Direction 7! How should the repair shop transform its revenue model?',
    options: [
      {
        id: 'opt-a',
        label: 'B2B & Residential Preventive Maintenance Retainers',
        actionDescription: 'Offer EUR 19/month appliance uptime subscriptions with loaner appliances and landlord partnerships.',
        isOptimal: true,
        feedback: 'Brilliant! Converts unpredictable emergency repair spikes into predictable monthly recurring revenue (MRR) with upfront cash collection.',
        roceImpact: '+110% ROCE Surge',
        xp: 150,
      },
      {
        id: 'opt-b',
        label: 'Double diagnostic fees for emergency walk-ins',
        actionDescription: 'Charge customers EUR 80 just to inspect a broken washing machine.',
        isOptimal: false,
        feedback: 'Customer friction alert! High diagnostic fees trigger customer mistrust and drive clients to makeshift YouTube fixes.',
        roceImpact: '-15% Volume Contraction',
        xp: 20,
      },
      {
        id: 'opt-c',
        label: 'Sell raffle tickets to walk-in clients',
        actionDescription: 'Offer a chance to win a free toaster with every repair.',
        isOptimal: false,
        feedback: 'Gimmick without strategic substance. Does not fix the underlying operational fixed-cost imbalance.',
        roceImpact: '0% Economic Shift',
        xp: 10,
      },
    ],
  },
  {
    id: 'spin-3',
    directionId: 8,
    directionName: 'Direction 8: Introduce Radical Technology & Automation',
    businessScenario: 'Shared electric mobility fleet suffering from 4 hours of vehicle charging downtime.',
    prompt: 'You landed on Direction 8! How should the mobility operator deploy technology to eliminate asset downtime?',
    options: [
      {
        id: 'opt-a',
        label: 'Modular IoT Battery-Swapping Kiosk Infrastructure (Yulu Model)',
        actionDescription: 'Decouple batteries from vehicles, enabling 60-second instant battery swaps at local retail kiosks.',
        isOptimal: true,
        feedback: 'Masterstroke! Multiplies fleet vehicle revenue hours to over 10 hours daily, amortizing fixed vehicle capex and skyrocketing ROCE.',
        roceImpact: '+180% ROCE Surge',
        xp: 150,
      },
      {
        id: 'opt-b',
        label: 'Install huge solar panels on the roof of every tiny scooter',
        actionDescription: 'Equip small two-wheelers with bulky overhead solar wings.',
        isOptimal: false,
        feedback: 'Impractical engineering! Solar panels add weight, create aerodynamic drag, and charge too slowly to offset battery drain.',
        roceImpact: '-30% Vehicle Uptime',
        xp: 20,
      },
      {
        id: 'opt-c',
        label: 'Hire hundreds of overnight drivers in diesel vans to collect scooters',
        actionDescription: 'Haul dead scooters back to a distant industrial park each night for charging.',
        isOptimal: false,
        feedback: 'The Bird/Lime nightmare! Massive logistics collection labor and diesel fuel costs devour operating cash flow.',
        roceImpact: '-65% Margin Erosion',
        xp: 30,
      },
    ],
  },
  {
    id: 'spin-4',
    directionId: 1,
    directionName: 'Direction 1: Reduce Customer Overall Costs (Frugal Strategy)',
    businessScenario: 'Medical diagnostic equipment company attempting to serve rural clinics in emerging markets.',
    prompt: 'You landed on Direction 1! How should the engineering team design for radical affordability?',
    options: [
      {
        id: 'opt-a',
        label: 'Bottom-Up Frugal Redesign Using Off-The-Shelf Consumer Parts',
        actionDescription: 'Use bus-ticket printers and lithium battery packs to deliver 80% of performance at 20% of cost (GE MAC 400).',
        isOptimal: true,
        feedback: 'Pure Jugaad innovation! Unlocks hundreds of millions of underserved non-customers and drives immense ROCE through ultra-low capex.',
        roceImpact: '+160% ROCE Surge',
        xp: 150,
      },
      {
        id: 'opt-b',
        label: 'Take a $15,000 hospital machine and remove the instruction manual',
        actionDescription: 'De-feature an expensive Western device by 5% and keep the price at $12,000.',
        isOptimal: false,
        feedback: 'Flawed de-featuring! Still 10x too expensive for rural village clinics and incapable of surviving dusty, erratic power grids.',
        roceImpact: '-20% Market Rejection',
        xp: 15,
      },
      {
        id: 'opt-c',
        label: 'Provide high-interest subprime loans to village doctors',
        actionDescription: 'Pressure rural clinics into 10-year bank debt to buy overpriced machinery.',
        isOptimal: false,
        feedback: 'Predatory and unsustainable! High loan default rates will destroy credit partnerships.',
        roceImpact: '-50% Capital Loss',
        xp: 10,
      },
    ],
  },
];

// GAMIFICATION DATA: 3-PILLAR SYNERGY CARD MATCH
export const SYNERGY_TRIOS: SynergyTrio[] = [
  {
    id: 'trio-1',
    theme: 'Quick Commerce Hyper-Speed Architecture',
    vpCard: {
      title: 'Value Proposition',
      text: '10-minute grocery delivery at supermarket retail price parity.',
    },
    vaCard: {
      title: 'Value Architecture',
      text: 'Dense urban network of dark stores within 2km with 2-minute pick-and-pack routing algorithms.',
    },
    peCard: {
      title: 'Profit Equation',
      text: 'Requires over 1,000 orders/day per dark store to amortize fixed rental overhead and courier minimums.',
    },
    takeaway: 'Speed in quick commerce is a function of dark store geographic density, not courier speed on the road.',
  },
  {
    id: 'trio-2',
    theme: 'Decoupled Energy Micro-Mobility Architecture',
    vpCard: {
      title: 'Value Proposition',
      text: 'Cheap, license-free electric two-wheeler mobility for gig delivery couriers.',
    },
    vaCard: {
      title: 'Value Architecture',
      text: 'Modular Yuma battery-swapping kiosks and rugged purpose-built Bajaj EVs.',
    },
    peCard: {
      title: 'Profit Equation',
      text: 'Decoupling battery charging from vehicle downtime elevates active asset revenue generation to 10+ hours/day.',
    },
    takeaway: 'In asset-heavy mobility, Return on Capital Employed is maximized by eliminating vehicle charging downtime.',
  },
  {
    id: 'trio-3',
    theme: 'C2M Social Disintermediation Architecture',
    vpCard: {
      title: 'Value Proposition',
      text: 'Up to 70% discounts on household goods unlocked via viral social group purchases on messaging apps.',
    },
    vaCard: {
      title: 'Value Architecture',
      text: 'Direct C2M data pipelines connecting aggregated buyer batches straight to factory assembly lines.',
    },
    peCard: {
      title: 'Profit Equation',
      text: 'Negative working capital: shoppers pay upfront on Day 0 while factories are settled on 30-day supplier credit terms.',
    },
    takeaway: 'Viral social coordination disintermediates distributors, self-funding rapid growth through negative working capital.',
  },
];

export const REFLECTION_TEXT = `Odyssey Lab reflects my personal synthesis of the Odyssey 3.14 course, translating frameworks into an experiential playground where students actively test strategic choices. By combining retrieval practice with my Business Model Remix Lab, the tool turns passive theory into active experimentation. Rather than memorising definitions, learners diagnose baseline vulnerabilities, combine verified innovation directions, and observe how altering a value proposition triggers systemic ripples across value architecture and profit equations.

Crucially, the embedded Reality Check and Socratic Odyssey Coach scaffold evaluative thinking. Instead of dispensing passive solutions, the coach asks targeted questions, prompting students to justify their rationale and scrutinise operational feasibility. This active recall environment preserves momentum through browser-stored retrieval challenges that reward contextual trade-off analysis over rote repetition.

However, pedagogical efficacy depends on critical student judgement. Generative AI suggestions risk creating an illusion of competence if learners uncritically accept plausible recommendations without verifying underlying assumptions or unit economics. Moreover, a simulated tool cannot replace rich classroom debates, peer challenge, or direct customer validation. Odyssey Lab therefore succeeds best not as a solitary substitute for professorial instruction, but as a provocative pre-class rehearsal studio that sharpens strategic curiosity, equips team discussions, and builds durable business model literacy for future cohorts.`;

export const RUBRIC_CRITERIA = [
  {
    criterion: 'Functionality and Originality',
    maxPoints: 10,
    howMet:
      'Odyssey Lab is a fully functional web application featuring the 14 Directions Explorer, the Class Case Library (Blinkit, Zomato, Yulu, Pinduoduo, Atelier Taffy, Zipcar, BMW Rent-A-Car, Frugal Innovation), the Business Model Remix Lab across the 3 pillars, the gamified Innovation Arcade (Spin the Wheel of Disruption, Termle Wordle, 3-Pillar Synergy Match), active recall testing, and a Socratic AI Coach with Gemini 3.8 Flash server integration and verified offline fallbacks.',
  },
  {
    criterion: 'Pedagogical Value',
    maxPoints: 10,
    howMet:
      'Designed around cognitive science principles (retrieval practice, elaboration, systemic feedback). Rather than rewarding rote memorisation, students explore real-world cases, diagnose vulnerabilities, remix strategic levers, and stress-test economic viability (ROCE) and operational feasibility.',
  },
  {
    criterion: 'Reflection and Critical Analysis',
    maxPoints: 5,
    howMet:
      'Includes an exactly 200-word critical pedagogical reflection (verified with an automated word counter) that candidly evaluates the tool’s potential to accelerate learning alongside its limitations, including the risk of student AI over-reliance, the necessity of human judgement, and the complementary role of classroom debate.',
  },
];

export const VERIFIED_SOURCES = [
  {
    title: '(Re)invent your business model with Odyssey 3.14 (2nd & 3rd Editions)',
    authors: 'Laurence Lehmann-Ortega, Helene Musikas, Jean-Marc Schoettl',
    publisher: 'Dunod, Paris',
    relevance: 'Primary authoritative text defining the 3 pillars (Value Proposition, Value Architecture, Profit Equation) and the 14 innovation directions.',
  },
  {
    title: 'HEC Paris Business Model Innovation Course Discussions',
    institution: 'HEC Paris Strategy & Business Policy Department',
    relevance: 'Classroom case discussions: Blinkit, Zomato, Yulu, Pinduoduo, Atelier Taffy, Zipcar, BMW Rent-A-Car, and Frugal Innovation.',
  },
  {
    title: 'Odyssey 3.14 Official Research Portal',
    url: 'https://odyssey314.com',
    relevance: 'Framework reference for 3 pillars, ROCE equation, and sustainable business model reinvention.',
  },
];
