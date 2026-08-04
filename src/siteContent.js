export const routes = [
  {
    path: '/',
    label: 'Home',
    seoTitle: 'Heutrix Labs | Workflow Systems for Allied Health and Disability Providers',
    metaDescription:
      'Heutrix Labs helps Australian allied health practices and disability support providers improve messy admin, scattered spreadsheets, manual workflows, operations dashboards and safe AI use.'
  },
  {
    path: '/services',
    label: 'Services',
    seoTitle: 'Services | Heutrix Labs',
    metaDescription:
      'Compare Heutrix Labs workflow diagnostics, focused improvement sprints, operations dashboards, tailored workflow systems and Safe AI setup for care-related service providers.'
  },
  {
    path: '/allied-health',
    label: 'Allied Health',
    seoTitle: 'Workflow Systems for Allied Health Practices | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian allied health practices improve enquiry and referral tracking, document collection, reporting, onboarding, handovers and management visibility.'
  },
  {
    path: '/disability-providers',
    label: 'Disability Providers',
    seoTitle: 'Workflow Systems for Disability Support Providers | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian disability support providers improve intake, service agreement tracking, document collection, incidents, complaints, evidence, onboarding and handovers.'
  },
  {
    path: '/pricing',
    label: 'Pricing',
    seoTitle: 'Pricing | Heutrix Labs',
    metaDescription:
      'Review indicative starting prices and scope factors for Heutrix Labs workflow diagnostics, improvement sprints, dashboards, tailored systems and Safe AI setup.'
  },
  {
    path: '/safe-ai',
    label: 'Safe AI',
    seoTitle: 'Safe AI Setup for Allied Health and Disability Providers | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian care-related service providers define approved AI use cases, information boundaries, human review rules and practical staff guidance.'
  },
  {
    path: '/about',
    label: 'About',
    seoTitle: 'About Heutrix Labs',
    metaDescription:
      'Learn how Heutrix Labs approaches practical workflow improvement, operational visibility, maintainable systems and responsible AI use for care-related service providers.'
  },
  {
    path: '/faq',
    label: 'FAQ',
    seoTitle: 'FAQ | Heutrix Labs',
    metaDescription:
      'Answers about Heutrix Labs services, project timing, existing tools, handover, pricing, privacy, Safe AI and operational service boundaries.'
  },
  {
    path: '/contact',
    label: 'Contact',
    seoTitle: 'Contact Heutrix Labs',
    metaDescription:
      'Contact Heutrix Labs with a general description of a workflow, tracking, dashboard or Safe AI challenge and discuss a practical next step.'
  },
  {
    path: '/privacy-and-data-handling',
    label: 'Privacy and Data Handling',
    seoTitle: 'Privacy and Data Handling | Heutrix Labs',
    metaDescription:
      'Read how Heutrix Labs approaches data minimisation, access, storage, retention and AI information boundaries during workflow projects.'
  },
  {
    path: '/terms-of-use',
    label: 'Terms of Use',
    seoTitle: 'Terms of Use | Heutrix Labs',
    metaDescription:
      'Terms for using the Heutrix Labs website, including general-information limits, service boundaries, project scopes and client responsibilities.'
  },
  {
    path: '/website-disclaimer',
    label: 'Website Disclaimer',
    seoTitle: 'Website Disclaimer | Heutrix Labs',
    metaDescription:
      'Website disclaimer covering Heutrix Labs operational services, professional-advice limits, AI use, privacy and client responsibilities.'
  }
];

export const mainNav = routes.filter((route) =>
  ['/', '/services', '/allied-health', '/disability-providers', '/pricing', '/safe-ai', '/faq'].includes(route.path)
);

export const footerNav = [
  '/services',
  '/allied-health',
  '/disability-providers',
  '/pricing',
  '/safe-ai',
  '/about',
  '/faq',
  '/privacy-and-data-handling',
  '/terms-of-use',
  '/website-disclaimer',
  '/contact'
].map((path) => routeMapSafe(path));

function routeMapSafe(path) {
  return routes.find((route) => route.path === path);
}

export const ctas = {
  fitCall: { label: 'Book a free fit call', href: '/contact' },
  services: { label: 'View Services', href: '/services' },
  allServices: { label: 'View all services', href: '/services' },
  pricing: { label: 'View pricing', href: '/pricing' },
  diagnostic: { label: 'Start with a Workflow Diagnostic', href: '/contact?service=workflow-diagnostic' },
  workflow: { label: 'Improve a workflow', href: '/contact?service=workflow-automation-sprint' },
  dashboard: { label: 'Build an operations dashboard', href: '/contact?service=operations-dashboard-build' },
  ai: { label: 'Set up safe AI use', href: '/contact?service=safe-ai-setup' },
  tailored: { label: 'Scope a tailored workflow system', href: '/contact?service=tailored-internal-workflow-system' },
  regulated: { label: 'Discuss regulated provider workflow tools', href: '/contact?service=regulated-provider-workflow-tools' }
};

export const whoWeHelp = [
  'Allied health practices',
  'Disability support providers',
  'Specialist health providers',
  'Multidisciplinary care teams',
  'Practice managers and operations leads',
  'Provider owners managing growth, admin risk or reporting pressure'
];

export const homePainPoints = [
  'Intake, referral or enquiry follow-up handled differently by different people',
  'Service agreements, staff onboarding or handovers managed through memory and repeated manual reminders',
  'Incident, complaint, risk or evidence tracking spread across spreadsheets',
  'Managers lacking visibility over what is waiting, overdue or stuck',
  'Reporting preparation that takes too long because information is scattered',
  'AI tools being used informally without clear rules for privacy, review or suitable use'
];

export const capabilities = [
  'Workflow diagnostics',
  'Admin process mapping',
  'Workflow automation',
  'Operations dashboards',
  'Internal trackers and registers',
  'Evidence registers',
  'Incident and complaint tracking workflows',
  'Staff handover systems',
  'Onboarding workflows',
  'Reporting preparation workflows',
  'Safe AI rules and staff guidance',
  'Lightweight internal workflow tools'
];

export const homeServices = [
  {
    title: 'Workflow Diagnostic',
    icon: 'troubleshoot',
    lead: 'Find the workflow worth improving first.',
    description:
      'A structured review for organisations that know admin is messy, risky or time-consuming, but are not yet sure what should change first.',
    cta: { label: 'Learn more', href: '/services#workflow-diagnostic' }
  },
  {
    title: 'Workflow Automation Sprint',
    icon: 'auto_mode',
    lead: 'Improve one important admin or operational workflow.',
    description:
      'A focused 2-4 weeks period to improve one defined workflow such as intake tracking, referral follow-up, service agreements, document collection, incident and complaint tracking, onboarding, reporting preparation or evidence tracking.',
    cta: { label: 'Learn more', href: '/services#workflow-automation-sprint' }
  },
  {
    title: 'Operations Dashboard Build',
    icon: 'visibility',
    lead: 'See what needs attention without chasing updates.',
    description:
      'A practical dashboard or visibility view for practice managers, provider owners and operational leads who need to see workload, status, overdue items, bottlenecks, incidents, complaints, evidence or reporting inputs.',
    cta: { label: 'Learn more', href: '/services#operations-dashboard-build' }
  }
];

export const beforeAfterExamples = [
  {
    title: 'Referral tracking',
    before: 'Referral status is spread across emails, spreadsheets, inbox notes and verbal updates.',
    after: 'The team has one referral tracker showing status, owner, next action, due date and overdue items.'
  },
  {
    title: 'Staff onboarding',
    before: 'New starter tasks depend on memory and repeated reminders.',
    after: 'The organisation has a clear onboarding checklist, task ownership, handover steps and visibility for managers.'
  },
  {
    title: 'Incident and complaint tracking',
    before: 'Incidents and complaints are recorded inconsistently across forms, folders and spreadsheets.',
    after: 'The organisation has a structured register showing status, owner, review steps, due dates and follow-up actions.'
  },
  {
    title: 'Reporting preparation',
    before: 'Reports take too long because information is pulled from multiple places manually.',
    after: 'The organisation has a clearer reporting workflow with defined inputs, review steps and fewer repeated manual checks.'
  },
  {
    title: 'Safe AI use',
    before: 'Staff use AI tools informally without clear rules about privacy, review or suitable use.',
    after: 'The organisation has approved AI use rules, prompt guidance, human review expectations and clear boundaries for sensitive information.'
  }
];

export const services = [
  {
    title: 'Workflow Diagnostic',
    icon: 'troubleshoot',
    lead: 'Find the workflow worth improving first.',
    intro:
      'A short, structured review for organisations that can see recurring friction, risk or delay but need a clear priority and practical next step before committing to a build.',
    sections: [
      {
        title: 'Suitable for',
        items: [
          'Allied health practices',
          'Disability support providers',
          'Specialist health providers',
          'Growing providers with messy admin',
          'Practice managers dealing with scattered spreadsheets',
          'Provider owners who want a clear improvement plan before committing to a build'
        ]
      },
      {
        title: 'Common problems',
        items: [
          'Staff use different workarounds for the same task',
          'Follow-up actions have no consistent owner or due date',
          'Important admin depends too heavily on one person',
          'Managers cannot see what is waiting, overdue or blocked',
          'Reporting requires repeated manual collation',
          'Handovers vary between people, teams or locations',
          'Spreadsheets have become difficult to maintain',
          'AI tools are being used without agreed rules'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Workflow discovery session with relevant staff',
          'Current-state process and ownership review',
          'Pain point, handover and visibility mapping',
          'Identification of duplicated effort and avoidable manual steps',
          'Prioritised improvement options',
          'Recommended first action and suitable service pathway',
          'Concise written findings'
        ]
      },
      {
        title: 'What is excluded',
        items: [
          'Legal advice',
          'Clinical advice',
          'NDIS registration readiness',
          'Mock audits',
          'Official audit certification',
          'Regulatory approval',
          'Full workflow build unless separately scoped',
          'Software procurement unless separately agreed'
        ],
        tone: 'boundary'
      }
    ],
    outcome:
      'You receive a prioritised view of the workflow problem, the most useful first improvement and a practical recommendation for what to do next.',
    cta: ctas.diagnostic
  },
  {
    title: 'Workflow Automation Sprint',
    icon: 'auto_mode',
    lead: 'Improve one important admin or operational workflow.',
    intro:
      'A focused implementation project, typically delivered over 2–4 weeks, for one clearly defined workflow. Automation is used only where it adds value; the right solution may instead be a clearer process, tracker, handover view, reminder system or lightweight internal tool.',
    sections: [
      {
        title: 'Suitable for workflows such as',
        items: [
          'Intake tracking',
          'Referral follow-up',
          'Service agreement workflows',
          'Document collection',
          'Staff onboarding',
          'Internal requests',
          'Incident or complaint tracking',
          'Risk or evidence tracking',
          'Reporting preparation',
          'Routine admin tracking'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Agreed scope, users and success measures',
          'Current-state workflow review',
          'Clear future-state workflow design',
          'Configuration or build of the agreed improvement',
          'Practical user testing and refinement',
          'Handover guide and staff instructions',
          'Maintenance responsibilities and next-step recommendations'
        ]
      },
      {
        title: 'Possible deliverables',
        items: [
          'Workflow map',
          'Status and ownership tracker',
          'Operational register',
          'Structured internal form',
          'Reminder and escalation process',
          'Management visibility view',
          'Automation between approved tools',
          'Handover guide',
          'Staff instructions'
        ]
      },
      {
        title: 'What is excluded',
        items: [
          'Replacing your core practice, client or case management system',
          'Large enterprise software builds',
          'Clinical decision-making tools',
          'Legal or compliance advice',
          'Promised efficiency results',
          'Uncontrolled use of sensitive information'
        ],
        tone: 'boundary'
      }
    ],
    outcome:
      'Your team has one documented, usable workflow with clearer ownership, better visibility and a practical handover path.',
    cta: ctas.workflow
  },
  {
    title: 'Operations Dashboard Build',
    icon: 'visibility',
    lead: 'See what needs attention without chasing updates.',
    intro:
      'A focused visibility project for managers who need a reliable view of work in progress, overdue actions, workload, bottlenecks or reporting inputs without rebuilding their core system.',
    sections: [
      {
        title: 'Suitable for',
        items: [
          'Practice managers',
          'Provider owners',
          'Operations leads',
          'Growing allied health practices',
          'Disability support providers',
          'Multi-site or multi-team providers',
          'Teams relying on manual updates'
        ]
      },
      {
        title: 'Dashboard examples',
        items: [
          'Intake dashboard',
          'Referral dashboard',
          'Onboarding progress dashboard',
          'Document collection dashboard',
          'Task and overdue item dashboard',
          'Incident or complaint overview',
          'Risk or evidence tracking dashboard',
          'Reporting preparation dashboard',
          'Workflow workload view'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Dashboard purpose and audience session',
          'Review of available data sources',
          'Agreed status, measure and ownership definitions',
          'Dashboard build using agreed tools',
          'Data limitation and refresh notes',
          'Review, testing and refinement',
          'Handover and maintenance notes'
        ]
      }
    ],
    note:
      'A dashboard is only useful when its workflow, definitions and data inputs are dependable. If those foundations are unclear, a Workflow Diagnostic may be the better first step.',
    outcome:
      'Managers have a clearer, shared view of operational status and can spend less time collecting updates manually.',
    cta: ctas.dashboard
  },
  {
    title: 'Safe AI Setup',
    icon: 'verified_user',
    lead: 'Set clear rules before AI becomes part of everyday admin work.',
    intro:
      'A practical setup for organisations considering or already using commercially available AI tools for internal admin, drafting, summarising or workflow support. The focus is approved use cases, information boundaries, human review and staff accountability.',
    sections: [
      {
        title: 'Suitable AI uses may include',
        items: [
          'Drafting internal admin templates',
          'Summarising non-sensitive internal notes',
          'Preparing first drafts of process documents',
          'Generating task checklists',
          'Creating workflow guidance',
          'Helping structure reports for human review',
          'Improving internal knowledge support'
        ]
      },
      {
        title: 'AI should not be used to',
        items: [
          'Replace clinical judgement',
          'Provide legal advice',
          'Make compliance decisions',
          'Make clinical, safety or risk decisions without human review',
          'Process sensitive information without an approved privacy-reviewed process',
          'Produce client-facing clinical or support advice without qualified review',
          'Remove professional accountability'
        ],
        tone: 'boundary'
      },
      {
        title: 'What is included',
        items: [
          'Review of current or intended AI use',
          'Suitable and unsuitable use case mapping',
          'Staff AI use rules',
          'Privacy and sensitive information guidance',
          'Human review expectations',
          'Prompt and output review guidance',
          'Practical implementation recommendations'
        ]
      }
    ],
    outcome:
      'Your organisation has documented AI use boundaries, defined review responsibilities and practical guidance staff can apply in daily work.',
    cta: ctas.ai
  },
  {
    title: 'Tailored Internal Workflow System',
    icon: 'dashboard_customize',
    lead: 'Create a practical internal system for work that has outgrown spreadsheets.',
    intro:
      'For a bounded operational process that needs more structure than a spreadsheet but does not justify a large custom platform. Heutrix Labs designs lightweight internal systems around agreed users, steps, permissions and maintenance needs.',
    sections: [
      {
        title: 'Suitable for',
        items: [
          'Internal request systems',
          'Multi-step admin workflows',
          'Workflow trackers',
          'Team handover systems',
          'Evidence or document tracking',
          'Incident and complaint registers',
          'Onboarding workflows',
          'Operational approval processes',
          'AI-supported admin workflows with human review'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Users, requirements and scope confirmation',
          'Workflow, ownership and status design',
          'Tool selection within agreed constraints',
          'Configured internal system build',
          'User testing and refinement',
          'Operating and maintenance documentation',
          'Practical handover'
        ]
      },
      {
        title: 'What is excluded',
        items: [
          'Large-scale SaaS product development',
          'Replacement clinical, practice, client or case management software',
          'Legal or clinical advice',
          'Promised compliance outcomes',
          'Systems that rely on unsafe handling of sensitive information'
        ],
        tone: 'boundary'
      }
    ],
    outcome:
      'Your organisation has a maintainable internal system that supports one defined workflow and reduces reliance on memory, inboxes or scattered spreadsheets.',
    cta: ctas.tailored
  },
  {
    title: 'Regulated Provider Workflow Tools',
    icon: 'rule',
    lead: 'Operational systems for regulated service environments.',
    intro:
      'Operational workflow support for selected regulated service providers that need clearer registers, trackers, dashboards, handovers or Safe AI rules. The work supports internal operations and does not provide registration, audit, legal, clinical or regulatory services.',
    sections: [
      {
        title: 'Suitable work may include',
        items: [
          'Incident tracking workflows',
          'Complaint tracking workflows',
          'Risk registers',
          'Evidence tracking tools',
          'Staff onboarding workflows',
          'Internal task registers',
          'Reporting preparation workflows',
          'Operational dashboards',
          'Safe AI rules for internal admin use'
        ]
      },
    ],
    outcome:
      'The provider has a clearer operational tool or workflow while retaining responsibility for approving, maintaining and applying its own processes.',
    cta: ctas.regulated
  }
];

export const alliedHealthContent = {
  title: 'Clearer operational workflows for allied health practices that have outgrown scattered admin.',
  intro: [
    'Heutrix Labs helps allied health practices improve the operational work around client care without replacing the practice management system clinicians already use.',
    'We work with practice managers, owners and operational leads to create clearer ownership, practical tracking, useful management visibility and safer rules for AI-assisted admin.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'This support is suited to practices that need more consistency across everyday admin, clearer handovers and better visibility over work that sits between people or systems.',
  audienceItems: [
    'Psychology practices',
    'Physiotherapy practices',
    'Occupational therapy practices',
    'Speech pathology practices',
    'Dietetics and other allied health practices',
    'Multidisciplinary and multi-site clinics',
    'Practice managers and owners managing growth, admin pressure, handovers or reporting workload'
  ],
  problemsTitle: 'Common allied health workflow problems',
  problemsLead: 'You may be dealing with:',
  problems: [
    'New enquiries and intake follow-up handled differently by different staff',
    'Referral status and next actions spread across inboxes, spreadsheets and practice notes',
    'Appointment, recall or document follow-up that depends on memory',
    'Reports, letters or admin requests that are hard to track from request to completion',
    'Clinician and admin handovers that vary by person or location',
    'Staff onboarding steps that lack clear owners, due dates or completion visibility',
    'Managers lacking visibility over work in progress, overdue items or bottlenecks',
    'Reporting preparation taking too long because information is scattered',
    'Staff using AI tools without clear privacy, suitability or review rules'
  ],
  improvementsTitle: 'Workflows we can help improve',
  improvementsLead: 'A scoped improvement may include:',
  improvements: [
    'Enquiry and intake status tracking',
    'Referral ownership and follow-up trackers',
    'Document request and collection workflows',
    'Report and letter request tracking',
    'Review, waitlist or recall follow-up workflows where relevant',
    'Staff onboarding and role-transition checklists',
    'Clinician-to-admin handover guides',
    'Shared admin task and escalation registers',
    'Practice manager workload and status dashboards',
    'Reporting preparation checklists and views',
    'Approved AI use cases and review rules for internal admin'
  ],
  examplesTitle: 'Example allied health projects',
  examples: [
    {
      title: 'Referral tracking',
      before: 'Referral follow-up depends on inbox searches, staff memory and a shared spreadsheet that is not always updated.',
      after: 'The practice has a referral tracker showing status, owner, next action, due date and overdue items.'
    },
    {
      title: 'Reporting preparation',
      before: 'Reports and letters are hard to monitor because requests, drafts, reviews and follow-up actions are spread across different places.',
      after: 'The practice has a clearer reporting workflow showing status, owner, review steps and follow-up actions.'
    },
    {
      title: 'Staff onboarding',
      before: 'New starter tasks depend on memory and repeated reminders.',
      after: 'The practice has a structured onboarding checklist with task ownership, due dates and handover notes.'
    },
    {
      title: 'Enquiry and intake follow-up',
      before: 'Phone, email and website enquiries are recorded in different places, so contact attempts and next actions are easy to miss.',
      after: 'The practice has one intake view showing enquiry source, owner, contact status, next action and outcome.'
    },
    {
      title: 'Document collection',
      before: 'Referral documents, consent forms and other required information are chased through inbox searches and informal reminders.',
      after: 'The practice uses a document checklist showing what is required, what has arrived, who owns follow-up and when it is due.'
    }
  ],
  startingPoints: ['Workflow Diagnostic', 'Workflow Automation Sprint', 'Operations Dashboard Build', 'Safe AI Setup'],
  startingNote:
    'Choose a Workflow Diagnostic when the priority is unclear. When the workflow and desired outcome are already defined, a focused sprint, dashboard build or Safe AI Setup may be a better starting point.',
  boundary:
    'Heutrix Labs supports operational workflows around service delivery. Clinical decisions, legal obligations, professional standards and regulatory approvals remain the responsibility of the practice and its qualified advisers.',
  finalTitle: 'Make one allied health workflow easier to manage.'
};

export const disabilityContent = {
  title: 'Clearer operational workflows for disability support providers managing intake, evidence, incidents and handovers.',
  intro: [
    'Heutrix Labs helps disability support providers improve the internal workflows that support consistent service delivery, timely follow-up and management visibility.',
    'We focus on practical operational systems such as trackers, registers, dashboards, onboarding workflows, handover views and safer rules for AI-assisted admin.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'This support is suited to providers that need clearer ownership, more reliable records and better visibility across operational work without replacing their core client management platform.',
  audienceItems: [
    'Small-to-mid-sized disability support providers',
    'Provider owners managing growth or admin risk',
    'Operations managers and team leaders',
    'Providers relying on spreadsheets, folders and inboxes to track important work',
    'Teams needing clearer intake, service agreement, incident, complaint, evidence, onboarding or handover workflows'
  ],
  problemsTitle: 'Common disability provider workflow problems',
  problemsLead: 'You may be dealing with:',
  problems: [
    'Intake and enquiry follow-up spread across emails, messages and spreadsheets',
    'Service agreement drafting, approval, renewal or storage that is difficult to track end to end',
    'Participant document collection that depends on memory and repeated reminders',
    'Incident, complaint, risk or evidence records stored across inconsistent locations',
    'Staff onboarding and role changes managed through copied or informal checklists',
    'Shift, task or handover visibility depending too heavily on one coordinator',
    'Reporting preparation taking too long because information is scattered',
    'Managers lacking visibility over what is waiting, overdue or unresolved',
    'AI tools being used without clear privacy, suitability or review rules'
  ],
  improvementsTitle: 'Workflows we can help improve',
  improvementsLead: 'A scoped improvement may include:',
  improvements: [
    'Intake status and ownership trackers',
    'Service agreement preparation and renewal trackers',
    'Participant document request checklists',
    'Incident follow-up registers',
    'Complaint acknowledgement and action registers',
    'Operational risk and action registers',
    'Evidence location and review trackers',
    'Staff onboarding and role-transition workflows',
    'Internal task, escalation and handover registers',
    'Shift, task or coordinator visibility views',
    'Management dashboards for open and overdue work',
    'Reporting preparation checklists and views',
    'Approved AI use cases and review rules for internal admin'
  ],
  examplesTitle: 'Example disability provider projects',
  examples: [
    {
      title: 'Incident and complaint tracking',
      before:
        'Incident and complaint follow-up is spread across forms, folders and spreadsheets, making it hard to see what is open, overdue or unresolved.',
      after:
        'The provider has a structured register showing status, owner, review steps, due dates and follow-up actions.'
    },
    {
      title: 'Evidence tracking',
      before:
        'Evidence is collected across folders, emails and spreadsheets, making it hard to know what is current, missing or ready for review.',
      after:
        'The provider has an evidence tracker showing category, owner, location, review status and next action.'
    },
    {
      title: 'Staff onboarding',
      before: 'Onboarding tasks vary by manager and are tracked through memory, messages or copied checklists.',
      after: 'The provider has a clearer onboarding workflow with required steps, owners, due dates and handover notes.'
    },
    {
      title: 'Service agreement tracking',
      before: 'Drafts, approvals, signed versions and renewal dates are tracked across inboxes, folders and individual calendars.',
      after: 'The provider has one workflow view showing agreement status, owner, key dates, next action and the approved document location.'
    },
    {
      title: 'Participant document collection',
      before: 'Required documents arrive through different channels, and missing items are often discovered late in the intake process.',
      after: 'The provider uses a consistent checklist showing required items, receipt status, follow-up owner, due date and secure location.'
    }
  ],
  startingPoints: [
    'Workflow Diagnostic',
    'Workflow Automation Sprint',
    'Operations Dashboard Build',
    'Tailored Internal Workflow System',
    'Safe AI Setup'
  ],
  startingNote:
    'Choose a Workflow Diagnostic when the priority is unclear. When the workflow and desired outcome are already defined, a focused sprint, dashboard build, tailored system or Safe AI Setup may be a better starting point.',
  boundary:
    'Heutrix Labs supports operational workflow systems. It does not provide NDIS registration readiness, mock audits, audit certification, legal advice, clinical advice or regulatory approval. Each provider remains responsible for approving, applying and maintaining its own processes and obligations.',
  finalTitle: 'Make one disability support workflow easier to manage.'
};

export const pricingRows = [
  ['Workflow Diagnostic', '$950 + GST', 'Prioritising the first workflow improvement'],
  ['Workflow Automation Sprint', '$2,500 + GST', 'Designing and implementing one defined workflow'],
  ['Operations Dashboard Build', '$3,500 + GST', 'Creating shared visibility across status, workload or reporting'],
  ['Safe AI Setup', '$1,800 + GST', 'Defining approved use cases, boundaries and human review'],
  ['Tailored Internal Workflow System', '$4,500 + GST', 'Building a lightweight system for one bounded operational process']
];

export const priceFactors = [
  'Number of workflows, teams or sites',
  'Clarity of the current process and ownership',
  'Number and quality of data sources',
  'Sensitive information and access requirements',
  'Integrations between approved tools',
  'Custom views, filters or reporting logic',
  'User roles, permissions and training needs',
  'Testing, review and approval cycles',
  'Documentation and handover depth',
  'Privacy, security or governance requirements'
];

export const typicalProjects = [
  ['Prioritise the problem', 'Start with a Workflow Diagnostic when several issues are competing for attention or the best first improvement is unclear.'],
  ['Improve one workflow', 'Choose a Workflow Automation Sprint when the workflow, users and desired outcome can be clearly bounded.'],
  ['Improve management visibility', 'Choose an Operations Dashboard Build when the underlying workflow is stable but status and workload are difficult to see.'],
  ['Set responsible AI rules', 'Choose Safe AI Setup before wider staff adoption, or when informal AI use already needs clearer boundaries and review.']
];

export const pricingExclusions = [
  'Legal advice',
  'Clinical advice',
  'Official audit certification',
  'Regulatory approval',
  'NDIS registration readiness',
  'Mock audits',
  'Replacement practice, client or case management software',
  'Large enterprise software development',
  'Ongoing support unless separately scoped',
  'Sensitive data processing without an approved process'
];

export const safeAiHelps = [
  'Approved AI use cases and prohibited uses',
  'Information that must not be entered into public AI tools',
  'Tool-selection and access considerations',
  'Required human review and escalation points',
  'Responsibility for approving AI-assisted work',
  'How staff should check and document outputs',
  'Rules to confirm before wider rollout'
];

export const suitableAiUses = [
  'Drafting internal admin templates from non-sensitive prompts',
  'Generating first drafts of process checklists',
  'Summarising non-sensitive internal notes',
  'Preparing first drafts of internal workflow guidance',
  'Structuring reporting templates for human review',
  'Supporting approved internal knowledge searches',
  'Creating plain-English explanations for internal training',
  'Organising non-sensitive tasks or next-step suggestions'
];

export const unsuitableAiUses = [
  'Replace clinical judgement',
  'Replace legal advice',
  'Replace organisational or compliance accountability',
  'Make final clinical, safety, staffing, risk or compliance decisions',
  'Determine incident or complaint outcomes without accountable human review',
  'Enter personal or sensitive information into publicly available AI tools',
  'Process sensitive information without a documented and approved process',
  'Generate client-facing clinical or support advice without qualified review',
  'Remove human responsibility for checking outputs'
];

export const aiGuidanceRows = [
  ['Drafting internal admin notes from non-sensitive prompts', 'Usually suitable with review'],
  ['Summarising internal meeting notes', 'Assess the content and tool before use'],
  ['Creating a first draft of a process checklist', 'Usually suitable with review'],
  ['Writing client-facing clinical or support advice', 'Requires qualified human authorship and review'],
  ['Entering identifiable information into publicly available AI tools', 'Do not use'],
  ['Using AI to make final clinical, staffing, compliance or safety decisions', 'Not suitable']
];

export const safeAiIncluded = [
  'Current and intended AI use review',
  'AI use case mapping',
  'Approved, conditional and prohibited use guidance',
  'Information classification and input rules',
  'Human review, approval and escalation expectations',
  'Staff AI use checklist',
  'Prompt guidance for approved non-sensitive use',
  'Output review checklist',
  'Tool and rollout recommendations'
];

export const beliefs = [
  'Start with the real workflow, not the tool',
  'Support the people already doing the work',
  'Reduce avoidable admin friction and duplicated effort',
  'Make ownership, status and next actions visible',
  "Reduce dependence on one person's memory",
  'Use the minimum information needed for the task',
  'Keep accountable human review where it matters',
  'Design for practical maintenance after handover'
];

export const bestFit = [
  'Have grown beyond informal admin processes',
  'Rely too heavily on inboxes, spreadsheets or individual memory',
  'Can involve the staff who understand the current workflow',
  'Need clearer ownership and operational visibility',
  'Want a practical, bounded improvement rather than a large platform',
  'Are considering AI and want responsible use rules',
  'Value documentation, handover and maintainability'
];

export const notFor = [
  'Legal advice',
  'Clinical advice',
  'Official audit certification',
  'NDIS registration readiness',
  'Mock audits',
  'Regulatory approval',
  'A replacement practice, client or case management system',
  'A large enterprise software build',
  'An AI tool that removes human review or accountability',
  'A guaranteed efficiency, compliance, audit or registration outcome'
];

export const faqs = [
  {
    question: 'What does Heutrix Labs do?',
    answer:
      'Heutrix Labs helps Australian allied health practices, disability support providers and selected care-related service providers improve internal workflows, admin processes, dashboards, tracking systems, automation and safe AI use. We focus on the operational systems around care and service delivery, not clinical decision-making.'
  },
  {
    question: 'Who does Heutrix Labs work with?',
    answer:
      'We primarily work with allied health practices, disability support providers, specialist health providers, practice managers, provider owners and small-to-mid-sized care-related service operators. We may also support selected regulated service providers where the work is operational and within scope.'
  },
  {
    question: 'What is the best starting point?',
    answer:
      'Start with a Workflow Diagnostic when the priority or best solution is unclear. If the workflow and desired outcome are already well-defined, a Workflow Automation Sprint, Operations Dashboard Build, Tailored Internal Workflow System or Safe AI Setup may be more appropriate.'
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'A Workflow Automation Sprint is typically scoped for 2–4 weeks. Timing for diagnostics, dashboards, tailored systems and Safe AI Setup depends on availability, complexity, data access, review cycles and the number of users or teams involved. The expected timeline is confirmed in the written scope.'
  },
  {
    question: 'Do you build software?',
    answer:
      'Heutrix Labs may configure or build lightweight internal workflow systems, trackers, dashboards, forms and automations using agreed tools. We focus on bounded operational problems rather than large bespoke platforms or SaaS product development.'
  },
  {
    question: 'Can you work with our existing tools?',
    answer:
      'Usually. We first review the workflow, available data, permissions and practical limits of the tools already in use. Where an integration or automation is appropriate, feasibility and access requirements are confirmed before it is included in scope.'
  },
  {
    question: 'Do you replace practice, client or case management software?',
    answer:
      'No. Heutrix Labs does not replace your core practice, client or case management system. We help improve the operational workflows around your existing tools where appropriate.'
  },
  {
    question: 'Can you automate workflows involving sensitive information?',
    answer:
      'Possibly, but only where the purpose, minimum necessary information, tool, permissions, access, storage, retention and review process are understood and approved by the client. De-identified or sample data should be used for design and testing where practical.'
  },
  {
    question: 'Can staff use ChatGPT or other AI tools with client, patient or participant information?',
    answer:
      'Do not enter personal or sensitive information into publicly available AI tools. Any proposed AI use involving personal information needs an organisation-approved process covering the purpose, tool, access, storage, retention, privacy obligations and accountable human review.'
  },
  {
    question: 'Does AI replace staff review?',
    answer:
      'No. AI may assist with approved internal admin, drafting or workflow support, but a suitable person remains responsible for checking the source information, context, accuracy, tone and final use. AI does not replace clinical judgement, legal advice, professional responsibility or organisational accountability.'
  },
  {
    question: 'Do you provide legal advice?',
    answer: 'No. Heutrix Labs does not provide legal advice.'
  },
  {
    question: 'Do you provide clinical advice?',
    answer: 'No. Heutrix Labs does not provide clinical advice.'
  },
  {
    question: 'Do you promise compliance outcomes?',
    answer:
      'No. Heutrix Labs does not promise compliance outcomes, audit success, registration outcomes or regulatory approval. Our work can support better operational systems, but the client remains responsible for reviewing, approving and maintaining their own processes.'
  },
  {
    question: 'Do you provide NDIS registration readiness or mock audits?',
    answer:
      'No. Heutrix Labs does not provide NDIS registration readiness, mock audits, official audit certification or regulatory approval. Heutrix Labs may support operational workflow tools for disability support providers and other regulated providers where the work is within scope.'
  },
  {
    question: 'How much does it cost?',
    answer:
      'Indicative starting prices are listed on the Pricing page and exclude GST. Final pricing depends on scope, workflow clarity, data requirements, integrations, user roles, testing, documentation, handover and privacy or governance needs.'
  },
  {
    question: 'What happens after handover?',
    answer:
      'The agreed handover may include operating instructions, ownership and maintenance notes, known limitations and staff guidance. Optional follow-up support or further improvements can be scoped separately when needed.'
  },
  {
    question: 'What do you need from us?',
    answer:
      'We usually need access to the people who understand the workflow, examples of current forms or trackers, a list of systems involved, and a decision-maker who can approve scope and priorities. Please do not send patient, participant, client, clinical, Medicare, NDIS, diagnostic or sensitive information unless we have agreed a secure and appropriate process.'
  }
];

export const privacySensitiveItems = [
  'Patient information',
  'Participant information',
  'Client records',
  'Clinical notes',
  'Medicare details',
  'NDIS numbers or sensitive NDIS-related records',
  'Diagnostic information',
  'Health information',
  'Staff-sensitive information',
  'Passwords or credentials',
  'Confidential business records not required for initial enquiry'
];

export const privacyProjectChecks = [
  'The purpose of the workflow and minimum information required',
  'Whether de-identified, synthetic or sample data can be used',
  'Who needs access and what each role can do',
  'Where information is stored and processed',
  'Which tools and vendors are approved',
  'Whether AI, automation or external integrations are involved',
  'What human review and approval steps are required',
  'What must be retained, archived, returned or deleted'
];

export const footerCopy = {
  summary:
    'Heutrix Labs helps Australian allied health practices and disability support providers turn messy admin, scattered spreadsheets and manual workflows into safer, clearer and more reliable internal systems.',
  boundary:
    'Heutrix Labs provides workflow, automation, dashboard and safe AI support. It does not provide official audit certification, legal advice, clinical advice, NDIS registration readiness, mock audits or regulatory approval.'
};
