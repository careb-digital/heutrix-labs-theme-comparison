export const routes = [
 {path:'/case-studies',label:'Case studies',seoTitle:'Heutrix Delivery Case Studies | Heutrix Labs',metaDescription:'Explore 15 connected examples of Heutrix delivery for an Australian disability support provider, with clear evidence and outcome limits.'},
  {
    path: '/',
    label: 'Home',
    seoTitle: 'Heutrix Labs | Workflow Improvement for Disability Providers',
    metaDescription:
      'Heutrix Labs helps Australian disability support providers and allied health practices diagnose operational friction, transform one bounded workflow and put practical AI guardrails in place.'
  },
  {
    path: '/services',
    label: 'Services',
    seoTitle: 'Diagnostics, Workflow Transformation and AI Guardrails | Heutrix Labs',
    metaDescription:
      'Compare Heutrix Diagnostics, Workflow Transformation and AI Guardrails for Australian disability support providers and allied health practices.'
  },
  {
    path: '/allied-health',
    label: 'Allied Health',
    seoTitle: 'Workflow Improvement for Allied Health Practices | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian allied health practices improve enquiry and referral tracking, document collection, reporting, onboarding, handovers and management visibility.'
  },
  {
    path: '/disability-providers',
    label: 'Disability Providers',
    seoTitle: 'Workflow Improvement for Disability Support Providers | Heutrix Labs',
    metaDescription:
      'Heutrix Labs helps Australian disability support providers improve intake, service agreement tracking, document collection, incidents, complaints, evidence, onboarding and handovers.'
  },
  {
    path: '/ai-guardrails',
    label: 'AI Guardrails',
    seoTitle: 'AI Guardrails for Disability Providers and Allied Health | Heutrix Labs',
    metaDescription:
      'Heutrix AI Guardrails helps Australian disability support providers and allied health practices define approved AI uses, information boundaries, accountable review and staff guidance.'
  },
  {
    path: '/resources',
    label: 'Resources',
    seoTitle: 'Free Workflow Tools and AI Guardrails Templates | Heutrix Labs',
    metaDescription:
      'Download practical, ungated workflow prioritisation, enquiry-to-service-start visibility and AI guardrails starter resources from Heutrix Labs.'
  },
  {
    path: '/about',
    label: 'About',
    seoTitle: 'About Heutrix Labs',
    metaDescription:
      'Learn how Heutrix approaches bounded workflow improvement, responsible technology use, testing, documentation and maintainable handover.'
  },
  {
    path: '/faq',
    label: 'FAQ',
    seoTitle: 'FAQ | Heutrix Labs',
    metaDescription:
      'Answers about Heutrix Diagnostics, Workflow Transformation, AI Guardrails, project timing, free resources, information handling and service boundaries.'
  },
  {
    path: '/contact',
    label: 'Contact',
    seoTitle: 'Request a Free Consultation | Heutrix Labs',
    metaDescription:
      'Request a 20-minute workflow fit call about one recurring operational problem. No sensitive information is needed.'
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

export const mainNav = ['/services', '/case-studies', '/resources', '/about'].map(
  (path) => routeMapSafe(path)
);

export const footerNav = [
  '/case-studies',
  '/services',
  '/disability-providers',
  '/allied-health',
  '/ai-guardrails',
  '/resources',
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
  fitCall: { label: 'Request a free consultation', href: '/contact' },
  services: { label: 'View the three products', href: '/services' },
  diagnostic: { label: 'Explore Heutrix Diagnostics', href: '/contact?service=heutrix-diagnostics' },
  workflow: { label: 'Transform a workflow', href: '/contact?service=heutrix-workflow-transformation' },
  ai: { label: 'Put AI guardrails in place', href: '/contact?service=heutrix-ai-guardrails' }
};

export const resources = [
  {
    id: 'workflow-bottleneck-scorecard',
    icon: 'score',
    title: '20-Minute Workflow Bottleneck Scorecard',
    audience: 'Best first resource for disability-provider operations leaders',
    summary:
      'Compare up to 12 recurring non-clinical workflows using frequency, staff effort, handoffs, delay, rework, visibility, feasibility and evidence confidence.',
    outcome:
      'Leave with one evidence-backed workflow to examine next, plus any control issue that must be resolved before change.',
    guideHref: '/downloads/workflow-bottleneck-scorecard-guide.pdf',
    workbookHref: '/downloads/workflow-bottleneck-scorecard.xlsx',
    bridge:
      'If the priority or feasible option is still unclear, Heutrix Diagnostics may be useful. If one bounded workflow is already clear, a Workflow Transformation scope may be worth discussing.'
  },
  {
    id: 'enquiry-to-service-start-starter-kit',
    icon: 'view_kanban',
    title: 'Enquiry-to-Service-Start Visibility Starter Kit',
    audience: 'Disability-provider-first, adaptable for allied health referral workflows',
    summary:
      'Create a minimum operational view of stage, status, owner, next action, due date, exception and readiness decision without turning the tracker into a duplicate client record.',
    outcome:
      'Test normal, waiting, overdue, exception and closure paths with synthetic records before choosing an approved system.',
    guideHref: '/downloads/enquiry-to-service-start-starter-kit-guide.pdf',
    workbookHref: '/downloads/enquiry-to-service-start-starter-kit.xlsx',
    bridge:
      'If the template exposes recurring integration, permission, handover or adoption gaps, Heutrix Workflow Transformation may be the relevant paid route.'
  },
  {
    id: 'ai-guardrails-staff-starter-pack',
    icon: 'shield_lock',
    title: 'AI Guardrails Staff Starter Pack',
    audience: 'For teams already considering or using AI for administrative work',
    summary:
      'Screen proposed use cases, set information and decision boundaries, name accountable human review, and record conditions, escalation and review dates.',
    outcome:
      'Give staff a usable starting path while keeping actual tool and use-case approval with the organisation.',
    guideHref: '/downloads/ai-guardrails-staff-starter-pack-guide.pdf',
    workbookHref: '/downloads/ai-guardrails-staff-starter-pack.xlsx',
    bridge:
      'If use is already widespread or the rules are difficult to apply in practice, Heutrix AI Guardrails may help turn the starter controls into an organisation-specific operating system.'
  }
];

export const whoWeHelp = [
  'Disability support providers',
  'Provider owners and chief executives',
  'Operations and general managers',
  'Workflow owners and team leads',
  'Allied health practices with comparable workflow problems',
  'Teams with recurring intake, reporting, evidence or document work'
];

export const homePainPoints = [
  'Intake or referral follow-up handled differently by different people',
  'Reporting preparation that depends on repeated chasing and manual collation',
  'Evidence or document tracking spread across folders, inboxes and spreadsheets',
  "Handovers that rely too heavily on one person's memory",
  'Managers unable to see what is waiting, blocked, overdue or ready for review',
  'AI tools being used without approved information boundaries or review rules'
];

export const capabilities = [
  'Heutrix Diagnostics',
  'Heutrix Workflow Transformation',
  'Heutrix AI Guardrails',
  'Current-state and future-state workflow mapping',
  'Ownership, status and handover design',
  'Forms, trackers, registers and management views',
  'Fit-for-purpose automation where feasible',
  'Testing, staff guidance and maintainable handover'
];

export const homeServices = [
  {
    title: 'Heutrix Diagnostics',
    icon: 'troubleshoot',
    lead: 'See what is slowing the work down and what to fix first.',
    description:
      'A paid decision engagement that defines the workflow, ranks bottlenecks and feasible options, and produces a decision-ready implementation brief—even when the answer is no build.',
    cta: { label: 'Learn more', href: '/services#heutrix-diagnostics' }
  },
  {
    title: 'Heutrix Workflow Transformation',
    icon: 'auto_mode',
    primary: true,
    lead: 'Turn one difficult workflow into a clearer, usable operating system.',
    description:
      'The primary implementation product: map, redesign, configure or build, test, guide users and hand over one bounded operational workflow.',
    cta: { label: 'Learn more', href: '/services#heutrix-workflow-transformation' }
  },
  {
    title: 'Heutrix AI Guardrails',
    icon: 'verified_user',
    lead: 'Give staff clear, practical boundaries for using AI at work.',
    description:
      'A paid governance engagement covering approved, conditional and prohibited uses, information boundaries, accountable human review, escalation and staff guidance.',
    cta: { label: 'Learn more', href: '/services#heutrix-ai-guardrails' }
  }
];

export const serviceDecisionRows = [
  {
    situation: 'We know operations are messy, but not what to fix first.',
    product: 'Heutrix Diagnostics',
    result:
      'A prioritised diagnosis and decision-ready implementation brief, including a no-build conclusion where appropriate.',
    href: '#heutrix-diagnostics'
  },
  {
    situation: 'We know which workflow needs to work better.',
    product: 'Heutrix Workflow Transformation',
    result: 'One bounded workflow mapped, redesigned, configured or built, tested, guided and handed over.',
    href: '#heutrix-workflow-transformation',
    primary: true
  },
  {
    situation: 'Staff use AI, but our rules and review controls are unclear.',
    product: 'Heutrix AI Guardrails',
    result: 'Documented AI-use boundaries, accountable review rules and practical staff guidance.',
    href: '#heutrix-ai-guardrails'
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
    title: 'AI guardrails',
    before: 'Staff use AI tools informally without clear rules about privacy, review or suitable use.',
    after: 'The organisation has approved AI use rules, prompt guidance, human review expectations and clear boundaries for sensitive information.'
  }
];

export const services = [
  {
    title: 'Heutrix Diagnostics',
    icon: 'troubleshoot',
    lead: 'See what is slowing the work down and what to fix first.',
    intro:
      'A paid, standalone decision engagement for organisations that can see recurring friction but need a clear priority, workflow boundary, baseline or feasible solution before implementation.',
    sections: [
      {
        title: 'Suitable for',
        items: [
          'Disability support providers',
          'Allied health practices with comparable workflow problems',
          'Several operational problems competing for attention',
          'Unclear workflow ownership or baseline',
          'Leaders who need a decision-ready scope before implementation'
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
          'Several operational problems are competing for attention'
        ]
      },
      {
        title: 'What is included',
        items: [
          'Defined problem and workflow boundary',
          'Current-state workflow and ownership map',
          'Agreed baseline or baseline plan',
          'Ranked bottlenecks, risks and dependencies',
          'Feasible options, including a no-build option',
          'Recommended future state and draft success measures',
          'Decision-ready implementation brief and no-go conditions'
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
          'Workflow implementation unless separately scoped',
          'Software procurement unless separately agreed'
        ],
        tone: 'boundary'
      }
    ],
    outcome:
      'You receive a decision-ready diagnosis that remains useful if you stop, use it internally or choose another implementer.',
    cta: ctas.diagnostic
  },
  {
    title: 'Heutrix Workflow Transformation',
    icon: 'auto_mode',
    primary: true,
    lead: 'Turn one difficult workflow into a clearer, usable operating system.',
    intro:
      'The primary implementation product for one clearly defined non-clinical workflow. Heutrix maps, redesigns, configures or builds, tests, guides users and hands over the agreed improvement.',
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
          'Agreed workflow boundary, users and success measures or baseline plan',
          'Current-state and approved future-state workflow maps',
          'Ownership, status, next-action, handover and escalation design',
          'Written acceptance criteria and test plan',
          'Configuration or build in approved systems',
          'Synthetic or de-identified testing first where practical',
          'User acceptance and agreed refinement rounds',
          'Staff guidance, administrator runbook and training',
          'Client-controlled access where agreed, limitations and handover'
        ]
      },
      {
        title: 'Possible deliverables',
        items: [
          'Documented future-state workflow',
          'Status and ownership tracker or operational register',
          'Structured internal forms and checklists',
          'Reminder, notification and escalation logic',
          'Management dashboard or visibility view',
          'Automation between approved tools where it adds value',
          'Lightweight internal workflow system where appropriate',
          'Handover guide and staff instructions'
        ]
      },
      {
        title: 'What is excluded',
        items: [
          'Replacing your core practice, client or case management system',
          'Large enterprise software or SaaS product builds',
          'Clinical decision-making tools',
          'Legal or compliance advice',
          'Promised efficiency results',
          'Uncontrolled use of sensitive information'
        ],
        tone: 'boundary'
      }
    ],
    outcome:
      'One agreed workflow is documented, implemented, tested against written acceptance criteria and handed over with the agreed guidance, access and limitations.',
    cta: ctas.workflow
  },
  {
    title: 'Heutrix AI Guardrails',
    icon: 'verified_user',
    lead: 'Give staff clear, practical boundaries for using AI at work.',
    intro:
      'A paid, fixed-scope governance engagement for organisations considering or already using commercially available AI tools. The focus is approved, conditional and prohibited uses, information boundaries, accountable review, escalation and staff guidance.',
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
          'Make compliance or regulatory decisions',
          'Make clinical, safety or risk decisions without accountable human review',
          'Process sensitive information without an approved process',
          'Produce client-facing clinical or support advice without qualified review',
          'Remove professional accountability'
        ],
        tone: 'boundary'
      },
      {
        title: 'What is included',
        items: [
          'Review of current or intended AI use',
          'Approved, conditional and prohibited use case mapping',
          'Information classification and input rules',
          'Human review, approval and escalation expectations',
          'Staff AI use checklist',
          'Prompt and output review guidance',
          'Practical rollout recommendations'
        ]
      }
    ],
    outcome:
      'Your organisation has documented AI-use boundaries, defined review and escalation responsibilities, and practical guidance staff can apply in daily work.',
    cta: ctas.ai
  }
];

export const alliedHealthContent = {
  title: 'Make one recurring allied health admin workflow easier to see, manage and hand over.',
  intro: [
    'Heutrix works with selected Australian allied health practices where referral, intake, reporting or document work crosses people and systems but still depends on inboxes, spreadsheets, memory or repeated status checks.',
    'The aim is one bounded non-clinical workflow with clearer ownership, visible status and next action, agreed testing, practical staff guidance and a maintainable handover—not a replacement practice-management platform.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'Allied health is a secondary Heutrix launch segment. Fit depends on the workflow, an accountable owner and decision-maker, staff participation, lawful access and a problem important enough to fund as a fixed-scope improvement.',
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
      after: 'A possible scoped future state shows status, owner, missing information, next action and due point in one agreed view.'
    },
    {
      title: 'Reporting preparation',
      before: 'Reports and letters are hard to monitor because requests, drafts, reviews and follow-up actions are spread across different places.',
      after: 'A possible scoped future state uses agreed stages, owners and review points to show what is waiting, blocked or ready.'
    },
    {
      title: 'Staff onboarding',
      before: 'New starter tasks depend on memory and repeated reminders.',
      after: 'A possible scoped future state uses an agreed checklist with ownership, due points and handover notes.'
    },
    {
      title: 'Enquiry and intake follow-up',
      before: 'Phone, email and website enquiries are recorded in different places, so contact attempts and next actions are easy to miss.',
      after: 'A possible scoped future state shows source, owner, contact status and next action for the bounded intake workflow.'
    },
    {
      title: 'Document collection',
      before: 'Referral documents, consent forms and other required information are chased through inbox searches and informal reminders.',
      after: 'A possible scoped future state shows required items, receipt status, follow-up owner and due point.'
    }
  ],
  startingPoints: ['Heutrix Diagnostics', 'Heutrix Workflow Transformation', 'Heutrix AI Guardrails'],
  startingNote:
    'Choose Heutrix Diagnostics when the priority is unclear, Heutrix Workflow Transformation when one workflow is ready to improve, or Heutrix AI Guardrails when staff need practical rules for responsible AI use.',
  boundary:
    'Heutrix Labs supports operational workflows around service delivery. Clinical decisions, legal obligations, professional standards and regulatory approvals remain the responsibility of the practice and its qualified advisers.',
  finalTitle: 'Make one allied health workflow easier to manage.'
};

export const disabilityContent = {
  title: 'Fix one recurring disability-provider workflow without replacing your core platform.',
  intro: [
    'Heutrix helps Australian disability support providers improve the non-clinical workflows around service delivery: the intake, reporting, evidence, document and handover work that must move reliably between people and systems.',
    'The focus is one bounded improvement with clear ownership, visible status and next action, written acceptance criteria, practical staff guidance and a maintainable handover.'
  ],
  audienceTitle: 'Who this is for',
  audienceIntro:
    'Fit is based on recurring workflow volume, cross-role complexity, an accountable owner and decision-maker, staff participation, lawful access and a problem important enough to fund—not a public staff-count threshold.',
  audienceItems: [
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
        'A possible scoped future state shows status, owner, review stage, due point and next action in one agreed view.'
    },
    {
      title: 'Evidence tracking',
      before:
        'Evidence is collected across folders, emails and spreadsheets, making it hard to know what is current, missing or ready for review.',
      after:
        'A possible scoped future state shows required item, approved location, owner, review status and next action.'
    },
    {
      title: 'Staff onboarding',
      before: 'Onboarding tasks vary by manager and are tracked through memory, messages or copied checklists.',
      after: 'A possible scoped future state uses agreed steps, owners, due points and handover notes.'
    },
    {
      title: 'Service agreement tracking',
      before: 'Drafts, approvals, signed versions and renewal dates are tracked across inboxes, folders and individual calendars.',
      after: 'A possible scoped future state shows status, owner, key dates, next action and the approved document location.'
    },
    {
      title: 'Participant document collection',
      before: 'Required documents arrive through different channels, and missing items are often discovered late in the intake process.',
      after: 'A possible scoped future state shows required items, receipt status, follow-up owner, due point and approved location.'
    }
  ],
  startingPoints: ['Heutrix Diagnostics', 'Heutrix Workflow Transformation', 'Heutrix AI Guardrails'],
  startingNote:
    'Choose Heutrix Diagnostics when the priority is unclear, Heutrix Workflow Transformation when one workflow is ready to improve, or Heutrix AI Guardrails when staff need practical rules for responsible AI use.',
  boundary:
    'Heutrix Labs supports operational workflow systems. It does not provide NDIS registration readiness, mock audits, audit certification, legal advice, clinical advice or regulatory approval. Each provider remains responsible for approving, applying and maintaining its own processes and obligations.',
  finalTitle: 'Make one disability support workflow easier to manage.'
};

export const aiGuardrailsHelps = [
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

export const aiGuardrailsIncluded = [
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
  'Define the result and acceptance criteria before building',
  'Involve the people who do and approve the work',
  'Make ownership, status and next action visible',
  'Use the minimum necessary information',
  'Keep accountable human review visible',
  'Design for testing, documentation and maintainable handover'
];

export const bestFit = [
  'Disability support providers with a recurring non-clinical workflow',
  'Allied health practices with a comparable workflow problem',
  'Teams relying on inboxes, spreadsheets or individual memory',
  'Organisations with an owner, decision-maker and relevant staff available',
  'Buyers seeking a fixed-scope improvement rather than a large platform',
  'Teams that value testing, documentation and maintainable handover'
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
      'Heutrix Labs offers three practical services: Heutrix Diagnostics to identify and prioritise operational problems, Heutrix Workflow Transformation to redesign and implement one bounded workflow, and Heutrix AI Guardrails to establish responsible workplace AI rules. We focus on the operational systems around care and service delivery, not clinical decision-making.'
  },
  {
    question: 'Who does Heutrix Labs work with?',
    answer:
      'Australian disability support providers are the primary launch audience. Allied health practices are a secondary fit where a recurring intake, referral, reporting, evidence or document workflow crosses people or systems and needs clearer ownership or visibility. Fit is based on workflow maturity, not a public staff-count threshold.'
  },
  {
    question: 'What is the best starting point?',
    answer:
      'Choose Heutrix Diagnostics when the priority, workflow boundary, baseline or feasible solution is unclear. Choose Heutrix Workflow Transformation when one workflow, owner, users and desired result can be bounded and tested. Choose Heutrix AI Guardrails when workplace AI needs approved uses, information boundaries, accountable review, escalation and staff guidance. You do not need to select a product before the fit call.'
  },
  {
    question: 'Do we need Heutrix Diagnostics first?',
    answer:
      'Not always. You can move directly to Heutrix Workflow Transformation when the workflow, owner, users, desired result, systems and access path are clear enough to create a fixed scope and acceptance criteria. When priorities or feasibility are uncertain, Diagnostics creates a decision-ready plan that remains useful even if you do not proceed with Heutrix.'
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Heutrix Workflow Transformation is typically scoped for 2–4 weeks after the written scope, access, decision-makers and prerequisites are ready. Client delay, third-party changes, additional requirements or unresolved information issues may change timing through written change control. Diagnostics and AI Guardrails timing is confirmed in their written scope.'
  },
  {
    question: 'Do you build software?',
    answer:
      'Heutrix may configure or build a form, tracker, register, management view, automation or lightweight internal workflow tool where it is the simplest suitable intervention. These are deliverables within Workflow Transformation, not separate products or a promise to build a large bespoke platform.'
  },
  {
    question: 'Can you work with our existing tools?',
    answer:
      'Heutrix first assesses approved existing systems where feasible. Every tool, integration, export, licence, permission, vendor dependency and information path must be checked before it is included. Naming a product does not guarantee capability, native integration or support for every feature.'
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
    'Heutrix Labs helps Australian disability support providers—and selected allied health practices—diagnose operational friction, transform one bounded workflow and put practical AI guardrails in place.',
  boundary:
    'Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails are operational services. Heutrix Labs does not provide official audit certification, legal advice, clinical advice, NDIS registration readiness, mock audits or regulatory approval.'
};
