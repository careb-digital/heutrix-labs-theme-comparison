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
      'Explore Heutrix Labs services for allied health practices and disability support providers, including workflow diagnostics, automation sprints, operations dashboards, tailored workflow systems and safe AI setup.'
  },
  {
    path: '/allied-health',
    label: 'Allied Health',
    seoTitle: 'Workflow Systems for Allied Health Practices | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian allied health practices improve intake, referral tracking, document collection, reporting preparation, handovers, dashboards and safe AI use.'
  },
  {
    path: '/disability-providers',
    label: 'Disability Providers',
    seoTitle: 'Workflow Systems for Disability Support Providers | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian disability support providers improve intake tracking, evidence tracking, incident and complaint registers, staff onboarding, dashboards, reporting preparation and safe AI use.'
  },
  {
    path: '/pricing',
    label: 'Pricing',
    seoTitle: 'Pricing | Heutrix Labs',
    metaDescription:
      'View starting prices for Heutrix Labs workflow diagnostics, workflow automation sprints, operations dashboards, tailored workflow systems and safe AI setup.'
  },
  {
    path: '/safe-ai',
    label: 'Safe AI',
    seoTitle: 'Safe AI Setup for Allied Health and Disability Providers | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian allied health practices and disability support providers set clear, privacy-aware rules for safe AI use in internal admin, drafting, reporting support and workflow guidance.'
  },
  {
    path: '/about',
    label: 'About',
    seoTitle: 'About Heutrix Labs',
    metaDescription:
      'Heutrix Labs is an Australian workflow systems, automation, dashboard and Safe AI implementation partner for allied health practices, disability support providers and selected regulated service providers.'
  },
  {
    path: '/faq',
    label: 'FAQ',
    seoTitle: 'FAQ | Heutrix Labs',
    metaDescription:
      'Frequently asked questions about Heutrix Labs workflow systems, automation, dashboards, safe AI setup, pricing, privacy and service boundaries.'
  },
  {
    path: '/contact',
    label: 'Contact',
    seoTitle: 'Contact Heutrix Labs',
    metaDescription:
      'Contact Heutrix Labs to discuss workflow diagnostics, workflow automation, operations dashboards and safe AI setup for allied health practices and disability support providers.'
  },
  {
    path: '/privacy-and-data-handling',
    label: 'Privacy and Data Handling',
    seoTitle: 'Privacy and Data Handling | Heutrix Labs',
    metaDescription:
      'Heutrix Labs takes a privacy-aware approach to workflow systems, automation, dashboards and Safe AI setup for allied health practices, disability support providers and regulated service providers.'
  },
  {
    path: '/terms-of-use',
    label: 'Terms of Use',
    seoTitle: 'Terms of Use | Heutrix Labs',
    metaDescription:
      'Terms of use for the Heutrix Labs website and information about service boundaries, website content and client responsibilities.'
  },
  {
    path: '/website-disclaimer',
    label: 'Website Disclaimer',
    seoTitle: 'Website Disclaimer | Heutrix Labs',
    metaDescription:
      'Website disclaimer for Heutrix Labs, including service boundaries for workflow systems, automation, dashboards, Safe AI and regulated provider support.'
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
      'The Workflow Diagnostic is for organisations that know something is inefficient, risky or frustrating, but are not yet sure what should be fixed first.',
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
          'Staff are working around the system',
          'Follow-up actions are hard to monitor',
          'Admin depends too heavily on one person',
          'Managers lack visibility',
          'Reporting takes too long',
          'Handovers are inconsistent',
          'Spreadsheets have become difficult to manage',
          'AI is being used without clear rules'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Workflow discovery session',
          'Review of the current process',
          'Pain point and risk mapping',
          'Identification of duplicated effort and handover gaps',
          'Practical improvement options',
          'Recommended next step',
          'Short written summary'
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
      'You receive a clear recommendation for what should be improved first, what type of solution is suitable, and what the next step should be.',
    cta: ctas.diagnostic
  },
  {
    title: 'Workflow Automation Sprint',
    icon: 'auto_mode',
    lead: 'Improve one important admin or operational workflow.',
    intro:
      'The Workflow Automation Sprint is a focused implementation project for one clearly defined workflow. Despite the name, not every sprint needs automation. Sometimes the best improvement is a clearer process, tracker, handover view, reminder system, reporting workflow or lightweight internal tool.',
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
          'Scope confirmation',
          'Current workflow review',
          'Improved workflow design',
          'Implementation of the agreed workflow improvement',
          'Basic testing',
          'Handover documentation',
          'Practical recommendations for maintenance'
        ]
      },
      {
        title: 'Possible deliverables',
        items: [
          'Workflow map',
          'Tracker',
          'Register',
          'Form',
          'Reminder process',
          'Dashboard view',
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
      'Your team has one clearer, more reliable workflow with better ownership, visibility and handover.',
    cta: ctas.workflow
  },
  {
    title: 'Operations Dashboard Build',
    icon: 'visibility',
    lead: 'See what needs attention without chasing updates.',
    intro:
      'The Operations Dashboard Build is for practice managers, provider owners and operational leads who need a clearer view of work in progress, overdue items, task status, bottlenecks or reporting inputs.',
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
          'Dashboard requirements session',
          'Review of available data sources',
          'Dashboard structure and metric definition',
          'Dashboard build using agreed tools',
          'Review and testing',
          'Handover notes'
        ]
      }
    ],
    note:
      'A dashboard is only useful if the underlying workflow and data inputs are reliable. If the workflow is unclear, Heutrix Labs may recommend a Workflow Diagnostic before building a dashboard.',
    outcome:
      'Your team can see key operational information more clearly and reduce the need to chase status updates manually.',
    cta: ctas.dashboard
  },
  {
    title: 'Safe AI Setup',
    icon: 'verified_user',
    lead: 'Set clear rules before AI becomes part of everyday admin work.',
    intro:
      'Safe AI Setup is for organisations that want to use AI carefully for internal admin, drafting, summarising, workflow guidance or productivity support. It is also suitable for organisations where staff are already experimenting with AI and management needs clearer boundaries.',
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
      'Your organisation has clearer internal AI boundaries, safer admin use cases and practical rules for staff.',
    cta: ctas.ai
  },
  {
    title: 'Tailored Internal Workflow System',
    icon: 'dashboard_customize',
    lead: 'Create a practical internal system for work that has outgrown spreadsheets.',
    intro:
      'Some workflows need more structure than a spreadsheet, but do not require a full custom software platform. Heutrix Labs can help design and build lightweight internal workflow systems using approved, practical tools.',
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
          'Requirements scoping',
          'Workflow design',
          'Tool selection within agreed constraints',
          'System build',
          'Testing',
          'Documentation',
          'Handover'
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
      'Your organisation has a more structured internal system that supports the workflow, improves visibility and reduces reliance on memory or scattered spreadsheets.',
    cta: ctas.tailored
  },
  {
    title: 'Regulated Provider Workflow Tools',
    icon: 'rule',
    lead: 'Operational systems for regulated service environments.',
    intro:
      'Heutrix Labs may support selected care-related or regulated providers with operational workflow tools, dashboards, trackers and Safe AI setup. This work is operational. It does not include NDIS registration readiness, mock audits, official audit certification, legal advice, clinical advice or regulatory approval.',
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
      'The work supports operational systems only. It does not remove the client responsibility to review, approve and maintain their own processes.',
    cta: ctas.regulated
  }
];

export const alliedHealthContent = {
  title: 'Workflow systems for allied health practices that have outgrown scattered admin.',
  intro: [
    'Heutrix Labs helps allied health practices improve the admin and operational workflows that sit around client care.',
    'We support practice managers, owners and operational leads with clearer workflows, practical trackers, dashboards, automations, handover systems and safe AI rules.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'This page is for allied health practices that need better visibility and consistency across everyday operations without replacing their core practice management software.',
  audienceItems: [
    'Psychology practices',
    'Physiotherapy practices',
    'Occupational therapy practices',
    'Speech pathology practices',
    'Dietetics and other allied health practices',
    'Multidisciplinary clinics',
    'Practice managers and owners managing growth, admin pressure or reporting workload'
  ],
  problemsTitle: 'Common allied health workflow problems',
  problemsLead: 'You may be dealing with:',
  problems: [
    'Intake and enquiry follow-up handled differently by different staff',
    'Referral tracking spread across inboxes, spreadsheets and practice notes',
    'Appointment or document follow-up that depends on memory',
    'Reports, letters or admin tasks that are hard to track from request to completion',
    'Clinician and admin handovers that are inconsistent or person-dependent',
    'Staff onboarding steps that are not documented clearly',
    'Managers lacking visibility over work in progress, overdue items or bottlenecks',
    'Reporting preparation taking too long because information is scattered',
    'Staff using AI tools without clear privacy, suitability or review rules'
  ],
  improvementsTitle: 'Workflows we can help improve',
  improvementsLead: 'Practical improvements may include:',
  improvements: [
    'Intake workflow improvements',
    'Referral trackers',
    'Enquiry follow-up workflows',
    'Document collection workflows',
    'Report and letter tracking workflows',
    'Review or recall follow-up workflows, where relevant',
    'Staff onboarding checklists',
    'Clinician and admin handover guides',
    'Admin task registers',
    'Practice manager dashboards',
    'Reporting preparation workflows',
    'Safe AI rules for internal admin, drafting and workflow support'
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
    }
  ],
  startingPoints: ['Workflow Diagnostic', 'Workflow Automation Sprint', 'Operations Dashboard Build', 'Safe AI Setup'],
  startingNote:
    'If the problem is clear but the best fix is not, start with a Workflow Diagnostic. If the workflow is already well-defined, Heutrix Labs can move straight into a scoped sprint, dashboard build or Safe AI setup.',
  boundary:
    'Heutrix Labs provides workflow, automation, dashboard and safe AI support. It does not provide clinical advice, legal advice or regulatory approval.',
  finalTitle: 'Make one allied health workflow easier to manage.'
};

export const disabilityContent = {
  title: 'Workflow systems for disability support providers managing admin, evidence and handovers.',
  intro: [
    'Heutrix Labs helps disability support providers improve the internal systems that support service delivery, admin visibility and safer information handling.',
    'We focus on operational workflow support, including trackers, registers, dashboards, handover systems, reporting preparation workflows and safe AI rules.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'This page is for disability support providers that need clearer operational workflows without positioning the work as NDIS registration readiness, audit support or regulatory advice.',
  audienceItems: [
    'Small-to-mid-sized disability support providers',
    'Provider owners managing growth or admin risk',
    'Operations managers and team leaders',
    'Providers relying on spreadsheets, folders and inboxes to track important work',
    'Teams needing clearer evidence, incident, complaint, onboarding or handover workflows'
  ],
  problemsTitle: 'Common disability provider workflow problems',
  problemsLead: 'You may be dealing with:',
  problems: [
    'Intake and enquiry follow-up spread across emails and spreadsheets',
    'Service agreement workflows that are difficult to track end to end',
    'Participant document collection steps that depend on memory or repeated reminders',
    'Incident, complaint, risk or evidence records stored inconsistently',
    'Staff onboarding and role changes managed through informal checklists',
    'Shift, task or handover visibility depending too heavily on one person',
    'Reporting preparation taking too long because information is scattered',
    'Managers lacking visibility over what is waiting, overdue or unresolved',
    'AI tools being used without clear privacy, suitability or review rules'
  ],
  improvementsTitle: 'Workflows we can help improve',
  improvementsLead: 'Practical improvements may include:',
  improvements: [
    'Intake trackers',
    'Service agreement workflow trackers',
    'Participant document collection workflows',
    'Incident registers',
    'Complaint registers',
    'Risk registers',
    'Evidence tracking tools',
    'Staff onboarding workflows',
    'Internal task registers',
    'Shift, task or handover visibility views',
    'Operational dashboards',
    'Reporting preparation workflows',
    'Safe AI rules for internal admin use'
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
    'If the problem is clear but the best fix is not, start with a Workflow Diagnostic. If the workflow is already well-defined, Heutrix Labs can move straight into a scoped sprint, dashboard build, tailored workflow system or Safe AI setup.',
  boundary:
    'Heutrix Labs supports operational workflow systems. It does not provide NDIS registration readiness, mock audits, official audit certification, legal advice, clinical advice or regulatory approval. Any compliance-related workflow, register or dashboard should support the provider responsibilities but does not remove the provider obligation to review, approve and maintain its own processes.',
  finalTitle: 'Make one disability support workflow easier to manage.'
};

export const pricingRows = [
  ['Workflow Diagnostic', '$950 + GST', 'Finding the best workflow to improve first'],
  ['Workflow Automation Sprint', '$2,500 + GST', 'Improving one defined workflow'],
  ['Operations Dashboard Build', '$3,500 + GST', 'Improving visibility across tasks, status or reporting'],
  ['Safe AI Setup', '$1,800 + GST', 'Setting clear AI use rules for internal admin work'],
  ['Tailored Internal Workflow System', '$4,500 + GST', 'Building a more structured workflow tool or internal system']
];

export const priceFactors = [
  'Multiple workflows',
  'Multiple teams or sites',
  'Unclear current processes',
  'Complex data sources',
  'Sensitive information handling requirements',
  'Integrations between tools',
  'Custom dashboard requirements',
  'Staff training or documentation',
  'Testing and review cycles',
  'Higher privacy, access control or governance needs'
];

export const typicalProjects = [
  ['Start small', 'A Workflow Diagnostic is often the best starting point when the organisation knows something needs improvement but does not yet know what should be changed first.'],
  ['Fix one workflow', 'A Workflow Automation Sprint is suitable when one workflow is clearly causing repeated admin friction or visibility issues.'],
  ['Improve management visibility', 'An Operations Dashboard Build is suitable when managers need a clearer view of work in progress, overdue items, workload or reporting inputs.'],
  ['Set AI rules', 'Safe AI Setup is suitable when staff are using or considering AI tools and the organisation needs clear rules before AI becomes part of daily work.']
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
  'Ongoing managed service support',
  'Sensitive data processing without an approved process'
];

export const safeAiHelps = [
  'Where AI may be useful',
  'Where AI should not be used',
  'What information must not be entered into AI tools',
  'When human review is required',
  'Who is responsible for approving AI-assisted work',
  'How staff should document and check AI outputs',
  'What rules should apply before wider use'
];

export const suitableAiUses = [
  'Drafting internal admin documents',
  'Generating process checklist drafts',
  'Summarising non-sensitive internal notes',
  'Preparing first drafts of workflow guidance',
  'Helping structure reports for human review',
  'Improving internal knowledge support',
  'Creating plain-English explanations for internal training',
  'Helping staff organise tasks or next steps'
];

export const unsuitableAiUses = [
  'Replace clinical judgement',
  'Replace legal advice',
  'Replace compliance accountability',
  'Make clinical or safety decisions',
  'Make final decisions about risk, incidents or complaints',
  'Process sensitive information without an approved privacy-reviewed process',
  'Generate client-facing clinical or support advice without qualified review',
  'Remove human responsibility for checking outputs'
];

export const aiGuidanceRows = [
  ['Drafting internal admin notes from non-sensitive prompts', 'Usually suitable with review'],
  ['Summarising internal meeting notes', 'May be suitable depending on content'],
  ['Creating a first draft of a process checklist', 'Usually suitable with review'],
  ['Writing client-facing clinical or support advice', 'Not suitable without qualified professional review'],
  ['Entering identifiable client, patient or participant information into public AI tools', 'Not recommended'],
  ['Using AI to make clinical, staffing, compliance or safety decisions', 'Not suitable']
];

export const safeAiIncluded = [
  'Current AI use review',
  'AI use case mapping',
  'Approved and prohibited use case guidance',
  'Privacy and sensitive information rules',
  'Human review expectations',
  'Staff AI use checklist',
  'Prompt guidance for approved internal use',
  'Output review checklist',
  'Implementation recommendations'
];

export const beliefs = [
  'Support the people already doing the work',
  'Reduce avoidable admin friction',
  'Improve visibility for managers',
  'Make handover easier',
  "Reduce dependence on one person's memory",
  'Handle sensitive information carefully',
  'Keep human review where it matters',
  'Be maintainable after handover'
];

export const bestFit = [
  'Have grown beyond informal admin processes',
  'Rely too heavily on spreadsheets or inboxes',
  'Need clearer operational visibility',
  'Want practical systems rather than software hype',
  'Are considering AI and want safer rules',
  'Value privacy, handover and responsible implementation'
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
  'A tool that removes human review or accountability'
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
      'If you are not sure what to fix first, start with a Workflow Diagnostic. If the workflow is already clear, a Workflow Automation Sprint, Operations Dashboard Build or Safe AI Setup may be more appropriate.'
  },
  {
    question: 'Do you build software?',
    answer:
      'Heutrix Labs may build lightweight internal workflow systems, trackers, dashboards, forms and automation using approved tools. We are not a generic software development shop and do not position ourselves as a SaaS platform.'
  },
  {
    question: 'Do you replace practice, client or case management software?',
    answer:
      'No. Heutrix Labs does not replace your core practice, client or case management system. We help improve the operational workflows around your existing tools where appropriate.'
  },
  {
    question: 'Can you automate workflows involving sensitive information?',
    answer:
      'Possibly, but only where the workflow, tool, access controls, permissions, data handling and privacy requirements are reviewed and approved by the client. We follow a minimum necessary data approach and do not recommend unnecessary movement of sensitive information.'
  },
  {
    question: 'Can staff use ChatGPT or other AI tools with client, patient or participant information?',
    answer:
      'Heutrix Labs does not recommend copying patient, participant, client, health, clinical, Medicare, NDIS, diagnostic or other sensitive information into AI tools unless there is a documented, privacy-reviewed and approved process. AI outputs should be reviewed by a suitable human before use.'
  },
  {
    question: 'Does AI replace staff review?',
    answer:
      'No. AI should support internal admin, drafting, reporting support, workflow guidance and productivity. It should not replace clinical judgement, legal advice, professional responsibility, compliance accountability or human review.'
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
      'Starting prices are listed on the Pricing page. Final pricing depends on scope, workflow complexity, data requirements, integrations, testing, documentation and privacy considerations.'
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
  'What information is actually required',
  'Whether de-identified or sample data can be used',
  'Who needs access',
  'Where files are stored',
  'What tools are approved',
  'Whether AI is involved',
  'What review or approval process is required',
  'What should be retained or deleted after the project'
];

export const footerCopy = {
  summary:
    'Heutrix Labs helps Australian allied health practices and disability support providers turn messy admin, scattered spreadsheets and manual workflows into safer, clearer and more reliable internal systems.',
  boundary:
    'Heutrix Labs provides workflow, automation, dashboard and safe AI support. It does not provide official audit certification, legal advice, clinical advice, NDIS registration readiness, mock audits or regulatory approval.'
};
