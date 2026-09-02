import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } }
};

const included = [
  'Baseline and agreed success measures',
  'Current-state workflow and ownership map',
  'Bottleneck, dependency, data and risk review',
  'Approved future-state design',
  'Written acceptance criteria and test plan',
  'Configuration or build in approved tools',
  'Synthetic or de-identified testing first where practical',
  'User acceptance and agreed refinements',
  'Staff quick-start guidance and administrator runbook',
  'Training, client-controlled access and handover',
  'Maintenance, dependency and limitation notes',
  'Before/after summary against the agreed baseline',
  '30-day correction of qualifying in-scope defects'
];

const startingPoints = [
  {
    number: '1',
    title: 'Heutrix Diagnostics',
    lead: 'When you know operations are messy, but not what to fix first.',
    body: 'Receive a current-state map, baseline plan, ranked bottlenecks, risks and dependencies, feasible options, a recommended future state and a decision-ready implementation brief. The diagnostic remains useful if you decide not to build.',
    cta: 'Explore Heutrix Diagnostics',
    href: '/contact?service=heutrix-diagnostics',
    icon: 'troubleshoot'
  },
  {
    number: '2',
    title: 'Heutrix Workflow Transformation',
    lead: 'When one important workflow is defined and ready to improve.',
    body: 'Heutrix maps, designs, builds or configures, tests, trains and hands over the agreed improvement in a defined 2–4 week engagement.',
    cta: 'Discuss my workflow',
    href: '/workflow-transformation',
    icon: 'account_tree'
  },
  {
    number: '3',
    title: 'Heutrix AI Guardrails',
    lead: 'When staff use AI, but approved boundaries and review controls are unclear.',
    body: 'Heutrix defines approved and prohibited uses, information boundaries, accountable human review, escalation and practical staff guidance. This operational guidance does not replace legal, privacy, clinical or professional advice.',
    cta: 'Put AI guardrails in place',
    href: '/contact?service=heutrix-ai-guardrails',
    icon: 'verified_user'
  }
];

const processSteps = [
  ['Map', 'Agree the baseline and document how the workflow actually runs.'],
  ['Design', 'Define ownership, status, next action, controls and acceptance tests.'],
  ['Build', 'Configure the smallest useful improvement in approved tools.'],
  ['Prove', 'Test with synthetic or de-identified data first where practical, then with agreed users.'],
  ['Hand over', 'Train the team, document administration and maintenance, transfer agreed access and review the first 30 days.']
];

const buyerEffort = [
  'one 60–90-minute workflow workshop;',
  'one accountable workflow owner;',
  'access to relevant staff, approved systems and representative materials;',
  'two focused review checkpoints;',
  'user testing and training; and',
  'one decision-maker who can approve scope and acceptance.'
];

const workflowFit = [
  'You can name the recurring problem',
  'You can provide a workflow owner and relevant staff',
  'You can give approved access and involve a decision-maker',
  'The work can be bounded within a fixed scope',
  'The issue is material enough to fund and fix now'
];

const workflowNotFit = [
  'Legal, privacy, clinical, audit, registration or regulatory advice or outcomes',
  'A complete platform replacement',
  'An unassessed integration',
  'A system that removes accountable human review',
  'A broad enterprise rollout that cannot be bounded as one workflow'
];

const transformationAudience = [
  'crosses several people, roles or systems;',
  'depends on manual checking, chasing or handovers;',
  'lacks a reliable owner, status or next action;',
  'is important enough to fund and fix now; and',
  'has an accountable owner and decision-maker available.'
];

const transformationTimeline = [
  ['Week 1', 'Map the real workflow', 'Run the workflow workshop, agree the baseline and document the current steps, roles, handovers, systems, bottlenecks and dependencies.'],
  ['Week 2', 'Approve the future state', 'Define ownership, statuses, next actions, controls, user experience, acceptance criteria and the implementation direction. Begin configuration or build after approval.'],
  ['Week 3', 'Build and test', 'Complete the in-scope improvement and test the agreed functions using synthetic or de-identified information first where practical.'],
  ['Week 4', 'User acceptance and handover', 'Run user testing, complete agreed refinements, prepare documentation, train the team and seek decision-maker acceptance.'],
  ['Week 5, when required', 'Resolve agreed final actions', 'Use the fifth week for approved in-scope refinements, dependency resolution or handover activities included in the proposal.'],
  ['Following 30 days', 'Stabilise', 'Review the operating workflow and correct qualifying in-scope defects. New requests, process changes, new systems, extra integrations and third-party changes are separate.']
];

const clientNeeds = [
  'One workflow owner and one decision-maker',
  'Relevant staff for the workshop, reviews, testing and training',
  'Timely access to approved tools, permissions and representative materials',
  'Internal approvals for privacy, security, legal, clinical, procurement or vendors where required',
  'Decisions and feedback by the agreed dates',
  'A nominated administrator for ongoing ownership'
];

const exclusions = [
  'Legal, privacy, clinical, audit, registration or regulatory advice or certification',
  'Promised compliance, revenue, clinical or fixed time-saving outcomes',
  'Replacement of a core practice, participant, client or case-management platform',
  'Large enterprise or multi-workflow transformation unless separately phased',
  'Unapproved live sensitive-data processing',
  'Integrations, migration, data repair, roles, reports, reviews, training or support not written into scope',
  'Ongoing monitoring or support after stabilisation unless separately agreed'
];

const approvedFaqs = [
  ['Do we need Heutrix Diagnostics first?', 'Not always. You can move directly to Heutrix Workflow Transformation when one workflow, owner, users, desired operating result, systems and access path are clear enough to create a fixed scope and acceptance criteria. When priorities or feasibility are uncertain, Heutrix Diagnostics creates a decision-ready plan and remains useful even if you do not proceed with Heutrix.'],
  ['What result does Heutrix Workflow Transformation promise?', 'The controllable result is one agreed non-clinical workflow documented, configured or built, tested against written acceptance criteria and handed over with staff/admin guidance, client-controlled access and known limitations. Heutrix does not promise compliance, revenue, clinical results or a fixed number of hours saved.'],
  ['How long does it take?', 'Heutrix Workflow Transformation is typically scoped for 2–4 weeks once scope, access, decision-makers and prerequisites are ready. Client delays, third-party changes, additional requirements or unresolved data issues may change the schedule through written change control.'],
  ['How much time will our team need?', 'A typical Workflow Transformation engagement needs one 60–90-minute workshop, two focused review checkpoints, access to the workflow owner and relevant staff, user testing, training and one decision-maker for acceptance. Any additional meeting or training load is stated before work begins.'],
  ['Will we have to replace our existing software?', 'Usually not. Heutrix first assesses what can be improved around approved existing systems. A replacement or major migration is not included unless it is separately assessed and phased.'],
  ['Which tools can you work with?', 'The workflow may be assessed around Microsoft 365, Google Workspace, Airtable, Smartsheet or information held in a care-management platform. Every tool, integration, export, licence, permission and data path must pass feasibility and scope review. Product names do not guarantee native integration or support for every feature.'],
  ['How is sensitive information handled?', 'The fit call and initial materials should contain only a general, non-sensitive description. Design and testing use the minimum necessary information and prefer synthetic or de-identified examples where practical. Any live-data use requires an approved project-specific process covering purpose, access, storage, retention and accountable review.'],
  ['Who owns the result?', 'Production accounts should be client-controlled. The written scope identifies administrator access, workflow maps, documentation, test records, configuration or source exports where available, maintenance responsibility and known limitations. Third-party licensing and export restrictions still apply.'],
  ['What if the agreed workflow fails testing?', 'In-scope functions must pass the written acceptance criteria before handover. Qualifying defects found during the 30-day stabilisation period are corrected without an additional build fee. New features, changed requirements and third-party platform changes are handled separately.'],
  ['What happens when we ask for something outside scope?', 'Heutrix documents the requested change and its effect on deliverables, timing, price and dependencies. Work proceeds only after the authorised decision-maker approves the change.'],
  ['How much does it cost?', 'After the fit call, Heutrix recommends Heutrix Diagnostics, Heutrix Workflow Transformation, Heutrix AI Guardrails or no project. No paid work begins until the deliverables, assumptions, exclusions, acceptance criteria, timing, change triggers and price are agreed in writing.'],
  ['Where do you deliver?', 'Projects are delivered remotely, with onsite work where the agreed scope requires it. Any location, travel or onsite cost is confirmed in the proposal.']
];

function ActionLink({ href, children, secondary = false, icon = 'arrow_forward' }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-sm rounded-xl border px-lg py-md font-headline-sm text-[18px] leading-6 transition-colors ${
        secondary
          ? 'border-primary bg-white text-primary hover:bg-primary hover:text-white'
          : 'border-primary bg-primary text-white shadow-md hover:opacity-95'
      }`}
    >
      <span>{children}</span>
      {icon ? <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{icon}</span> : null}
    </a>
  );
}

function OfferSection({ id, children, className = '' }) {
  return (
    <section id={id} className={`px-lg py-xxl ${className}`}>
      <motion.div className="mx-auto max-w-container-max" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
        {children}
      </motion.div>
    </section>
  );
}

function Heading({ eyebrow, title, children, inverse = false, className = '' }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow ? <p className={`mb-sm font-label-md text-label-md uppercase ${inverse ? 'text-secondary-fixed' : 'text-secondary'}`}>{eyebrow}</p> : null}
      <h2 className={`mb-md font-display-lg text-display-lg-mobile md:text-display-lg ${inverse ? 'text-white' : 'text-primary'}`}>{title}</h2>
      {children ? <div className={`space-y-md font-body-lg text-body-lg ${inverse ? 'text-inverse-on-surface' : 'text-on-surface-variant'}`}>{children}</div> : null}
    </div>
  );
}

function CheckList({ items, columns = false, inverse = false }) {
  return (
    <ul className={`grid gap-md ${columns ? 'md:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-start gap-sm font-body-md text-body-md ${inverse ? 'text-inverse-on-surface' : 'text-on-surface-variant'}`}>
          <span className={`material-symbols-outlined mt-0.5 text-[20px] ${inverse ? 'text-secondary-fixed' : 'text-secondary'}`} aria-hidden="true">check_circle</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ScopePreview() {
  return (
    <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-xl">
      <div className="mb-lg flex items-center justify-between gap-md border-b border-outline-variant pb-md">
        <div>
          <p className="font-label-sm text-label-sm uppercase text-secondary">One bounded workflow</p>
          <p className="font-headline-sm text-headline-sm text-primary">Clear from baseline to handover</p>
        </div>
        <span className="material-symbols-outlined rounded-lg bg-secondary-container p-sm text-on-secondary-container" aria-hidden="true">account_tree</span>
      </div>
      <div className="grid gap-sm sm:grid-cols-2">
        {['Intake or referral', 'Reporting', 'Evidence', 'Documents'].map((label) => (
          <div key={label} className="rounded-lg bg-surface-container-low p-md">
            <p className="font-label-md text-label-md text-primary">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-lg space-y-md">
        {['Baseline agreed', 'Ownership visible', 'Acceptance tested', 'Client-controlled handover'].map((label, index) => (
          <div key={label} className="flex items-center gap-md">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-label-sm text-white">{index + 1}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full rounded-full bg-secondary" style={{ width: `${68 + index * 10}%` }} />
            </div>
            <p className="w-40 font-body-sm text-body-sm text-on-surface-variant">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ApprovedHomePage() {
  return (
    <>
      <motion.section className="relative overflow-hidden px-lg pb-xxl pt-[144px]" initial="hidden" animate="show" variants={stagger}>
        <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div className="max-w-3xl" variants={stagger}>
            <motion.p variants={fadeUp} className="mb-md inline-flex rounded-[999px] border border-secondary/20 bg-secondary-container px-md py-xs font-label-sm text-label-sm uppercase text-on-secondary-container">
              Workflow improvement for disability providers and allied health practices
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Fix the operational workflow your team keeps chasing.
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs maps, improves, tests and hands over one intake, referral, reporting, evidence or document workflow—built around approved systems your team already uses.
            </motion.p>
            <motion.div variants={fadeUp} className="mb-md flex flex-col gap-md sm:flex-row sm:flex-wrap">
              <ActionLink href="/contact?next=workflow-fit-call">Book a 20-minute workflow fit call</ActionLink>
              <ActionLink href="/#starting-points" secondary icon={null}>See the three starting points</ActionLink>
            </motion.div>
            <motion.p variants={fadeUp} className="mb-sm font-body-md text-body-md text-on-surface-variant">
              One bounded workflow. Written acceptance criteria. Staff guidance, management visibility and client-controlled handover. Remote delivery, with onsite work where the agreed scope requires it.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body-sm text-body-sm text-on-surface-variant">
              Bring a general, non-sensitive description of one workflow that is hard to track, hand over or report. Heutrix responds within two business days.
            </motion.p>
          </motion.div>
          <motion.div variants={fadeUp}><ScopePreview /></motion.div>
        </div>
      </motion.section>

      <OfferSection className="bg-primary">
        <Heading title="Important work should not disappear between people and systems." inverse>
          <p>An intake arrives, but the next owner is unclear. A referral waits for follow-up. Reporting inputs are collected by chasing several people. Required evidence or documents are discovered missing late.</p>
          <p>When work is spread across inboxes, spreadsheets, shared drives, core systems and memory, capable teams still lose visibility. The problem is not a lack of effort. The workflow does not make ownership, status and next action clear enough.</p>
        </Heading>
      </OfferSection>

      <OfferSection className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Heading title="One workflow your team can see, use and maintain.">
            <p>The finished workflow gives staff a consistent way to handle the agreed work and gives managers a shared view of what is waiting, blocked, overdue or ready for review.</p>
            <p>The goal is not more technology. It is one tested operating improvement with an agreed baseline, clear ownership, practical guidance, client-controlled access and a handover your team can maintain.</p>
          </Heading>
          <div className="grid gap-md sm:grid-cols-2">
            {['Waiting', 'Blocked', 'Overdue', 'Ready for review'].map((status) => (
              <div key={status} className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
                <p className="font-label-sm text-label-sm uppercase text-on-surface-variant">Shared status</p>
                <p className="mt-xs font-headline-sm text-headline-sm text-primary">{status}</p>
              </div>
            ))}
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <div className="grid gap-xxl lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Heading eyebrow="Primary implementation product" title="Heutrix Workflow Transformation">
            <p>In a defined 2–4 week engagement, turn one high-friction operational workflow into a documented, tested working process with clear ownership, visible status and next action, staff guidance, management visibility and a handover your team can maintain.</p>
            <p>Heutrix Workflow Transformation can address a bounded intake/referral, reporting, evidence or document workflow. The right implementation may be a clearer process, form, tracker, register, management view, reminder path, automation or lightweight internal tool.</p>
            <div className="pt-md"><ActionLink href="/workflow-transformation">See whether my workflow fits</ActionLink></div>
          </Heading>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-lg">
            <h3 className="mb-lg font-headline-md text-headline-md text-primary">What is included</h3>
            <CheckList items={included} columns />
          </div>
        </div>
      </OfferSection>

      <OfferSection id="starting-points" className="bg-surface-container-low">
        <Heading title="Start with the smallest useful engagement." className="mb-xl" />
        <motion.div className="grid gap-lg lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          {startingPoints.map((item) => (
            <motion.article key={item.title} variants={fadeUp} className="flex h-full flex-col rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
              <div className="mb-lg flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-container font-headline-sm text-primary">{item.number}</span>
                <span className="material-symbols-outlined text-secondary" aria-hidden="true">{item.icon}</span>
              </div>
              <h3 className="mb-sm font-headline-md text-headline-md text-primary">{item.title}</h3>
              <p className="mb-md font-headline-sm text-[18px] leading-7 text-primary">{item.lead}</p>
              <p className="mb-lg flex-1 font-body-md text-body-md text-on-surface-variant">{item.body}</p>
              <a href={item.href} className="inline-flex items-center gap-sm font-label-md text-label-md text-secondary underline decoration-secondary/40 underline-offset-4">
                {item.cta}<span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
              </a>
            </motion.article>
          ))}
        </motion.div>
      </OfferSection>

      <OfferSection className="bg-primary">
        <Heading title="Map → Design → Build → Prove → Hand over" inverse className="mb-xl" />
        <div className="grid gap-md md:grid-cols-2 xl:grid-cols-5">
          {processSteps.map(([title, body], index) => (
            <div key={title} className="rounded-xl border border-white/15 bg-white/10 p-lg backdrop-blur-sm">
              <p className="mb-md font-label-md text-label-md text-secondary-fixed">0{index + 1}</p>
              <h3 className="mb-sm font-headline-sm text-headline-sm text-white">{title}</h3>
              <p className="font-body-sm text-body-sm text-inverse-on-surface">{body}</p>
            </div>
          ))}
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <div className="grid gap-xl lg:grid-cols-2 lg:items-start">
          <Heading title="A bounded project with a clear commitment from both sides.">
            <p>A typical Heutrix Workflow Transformation engagement requires:</p>
          </Heading>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <CheckList items={buyerEffort} />
            <p className="mt-lg border-t border-outline-variant pt-lg font-body-md text-body-md text-on-surface-variant">The written scope names any additional interviews, meetings, reviews or training before work begins.</p>
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface-container-low">
        <Heading title="Improve the workflow around approved systems where feasible.">
          <p>Heutrix starts with the tools already in use rather than assuming a new platform is required. A project may assess Microsoft 365, Google Workspace, Airtable, Smartsheet or information held in a care-management platform.</p>
          <p>Every system, integration, export, licence, permission and data path is checked before it is included. Naming a product does not guarantee a native integration or support for every feature.</p>
        </Heading>
        <div className="mt-xl flex flex-wrap gap-md">
          {['Microsoft 365', 'Google Workspace', 'Airtable', 'Smartsheet', 'Care-management platforms'].map((tool) => (
            <span key={tool} className="rounded-full border border-outline-variant bg-white px-lg py-sm font-label-md text-label-md text-primary shadow-sm">{tool}</span>
          ))}
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <Heading title="A good fit when one workflow matters enough to fix." className="mb-xl" />
        <div className="grid gap-lg lg:grid-cols-2">
          <div className="rounded-xl border border-secondary/30 bg-secondary-container/20 p-lg">
            <h3 className="mb-lg font-headline-md text-headline-md text-primary">Good fit</h3>
            <CheckList items={workflowFit} />
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-lg">
            <h3 className="mb-lg font-headline-md text-headline-md text-primary">Not a fit</h3>
            <ul className="grid gap-md">
              {workflowNotFit.map((item) => (
                <li key={item} className="flex items-start gap-sm font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined mt-0.5 text-[20px] text-outline" aria-hidden="true">block</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-2">
          <Heading title="Your team should not be locked out of the result.">
            <p>The written scope defines client-controlled production accounts, administrator access, workflow maps, documentation, test records, configuration or source exports where available, maintenance responsibility and known limitations.</p>
            <p>Third-party licences and platform restrictions still apply. Ongoing support is optional and separately scoped.</p>
          </Heading>
          <div className="rounded-xl bg-primary p-xl text-white shadow-lg">
            <span className="material-symbols-outlined mb-lg text-[42px] text-secondary-fixed" aria-hidden="true">key</span>
            <p className="font-headline-md text-headline-md">Client-controlled access</p>
            <p className="mt-md font-body-md text-body-md text-inverse-on-surface">Documentation, test records, maintenance notes and available configuration or source exports are defined in writing.</p>
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Heading eyebrow="Investment" title="Fixed scope before paid work begins.">
            <p>After the fit call, Heutrix will recommend Heutrix Diagnostics, Heutrix Workflow Transformation, Heutrix AI Guardrails or no project. The written proposal states deliverables, assumptions, dependencies, exclusions, review rounds, acceptance criteria, timing, third-party costs, change triggers and price.</p>
            <p>No paid work begins until those terms are agreed.</p>
          </Heading>
          <div id="proof" className="rounded-xl border border-outline-variant bg-white p-lg shadow-lg">
            <p className="mb-sm font-label-md text-label-md uppercase text-secondary">Workflow demonstration</p>
            <h3 className="mb-md font-headline-md text-headline-md text-primary">See what the finished handover looks like.</h3>
            <p className="mb-lg font-body-md text-body-md text-on-surface-variant">Review a clearly labelled synthetic example containing a current-state map, future-state workflow, manager view, staff guide, acceptance checklist and handover note. It demonstrates the form of the deliverable; it is not presented as a client result.</p>
            <ActionLink href="/contact?next=workflow-demonstration" secondary>View the workflow demonstration</ActionLink>
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-primary">
        <div className="mx-auto max-w-4xl text-center">
          <Heading title="Bring one workflow that should not be this hard." inverse className="mx-auto">
            <p>In 20 minutes, we will identify the operating problem, assess whether Heutrix is a fit and agree the smallest useful next step. If a build is not justified, we will tell you. No patient, participant, client, clinical or other sensitive information is needed for the call.</p>
          </Heading>
          <div className="mt-lg"><ActionLink href="/contact?next=workflow-fit-call">Book my 20-minute workflow fit call</ActionLink></div>
          <p className="mt-md font-body-sm text-body-sm text-inverse-on-surface">Book a time online. Heutrix responds within two business days. Delivery is remote, with onsite work where the agreed scope requires it.</p>
        </div>
      </OfferSection>
    </>
  );
}

export function WorkflowTransformationPage() {
  return (
    <>
      <section className="bg-surface px-lg pb-xxl pt-[144px]">
        <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-4xl">
            <p className="mb-md font-label-md text-label-md uppercase text-secondary">Heutrix Workflow Transformation</p>
            <h1 className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">One critical workflow, working end to end and handed over to your team.</h1>
            <p className="mb-lg font-body-lg text-body-lg text-on-surface-variant">In a defined 2–4 week engagement, Heutrix maps, improves, tests and hands over one high-friction intake, referral, reporting, evidence or document workflow around approved systems your team already uses.</p>
            <ActionLink href="/contact?service=heutrix-workflow-transformation">See whether my workflow fits</ActionLink>
          </div>
          <ScopePreview />
        </div>
      </section>

      <OfferSection className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-2 lg:items-start">
          <Heading title="Who it is for">
            <p>Heutrix Workflow Transformation is designed for disability providers and allied health practices where one recurring non-clinical workflow:</p>
          </Heading>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm"><CheckList items={transformationAudience} /></div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <Heading title="What you receive">
          <p>At handover, the agreed workflow has a baseline, current and future-state maps, in-scope configuration or build, test evidence, acceptance record, staff guidance, administrator documentation, client-controlled access, maintenance notes and a 30-day stabilisation path.</p>
          <p>The exact forms, fields, views, automations, systems, roles, permissions, integrations, review rounds and training coverage are written into the proposal.</p>
        </Heading>
      </OfferSection>

      <OfferSection className="bg-primary">
        <Heading title="Example timeline" inverse className="mb-xl" />
        <div className="grid gap-md md:grid-cols-2 lg:grid-cols-3">
          {transformationTimeline.map(([period, title, body]) => (
            <article key={period} className="rounded-xl border border-white/15 bg-white/10 p-lg">
              <p className="mb-sm font-label-md text-label-md uppercase text-secondary-fixed">{period}</p>
              <h3 className="mb-sm font-headline-sm text-headline-sm text-white">{title}</h3>
              <p className="font-body-sm text-body-sm text-inverse-on-surface">{body}</p>
            </article>
          ))}
        </div>
      </OfferSection>

      <OfferSection className="bg-surface">
        <div className="grid gap-lg lg:grid-cols-2">
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <h2 className="mb-lg font-headline-md text-headline-md text-primary">What we need from you</h2>
            <CheckList items={clientNeeds} />
          </div>
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-lg">
            <h2 className="mb-lg font-headline-md text-headline-md text-primary">What is not included</h2>
            <ul className="grid gap-md">
              {exclusions.map((item) => (
                <li key={item} className="flex items-start gap-sm font-body-md text-body-md text-on-surface-variant"><span className="material-symbols-outlined mt-0.5 text-[20px] text-outline" aria-hidden="true">block</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </OfferSection>

      <OfferSection className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl text-center">
          <Heading title="Investment" className="mx-auto">
            <p>Every Heutrix Workflow Transformation engagement is fixed in scope and price before paid work begins. If the workflow is not clear enough to quote responsibly, Heutrix will recommend Heutrix Diagnostics first.</p>
          </Heading>
          <div className="mt-lg"><ActionLink href="/contact?service=heutrix-workflow-transformation">Book a 20-minute workflow fit call</ActionLink></div>
        </div>
      </OfferSection>
    </>
  );
}

export function ApprovedFaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <section className="bg-surface px-lg pb-xl pt-[132px]">
        <div className="mx-auto max-w-container-max">
          <p className="mb-sm font-label-md text-label-md uppercase text-secondary">Heutrix Labs</p>
          <h1 className="max-w-4xl font-display-lg text-display-lg-mobile text-primary md:text-display-lg">Frequently asked questions</h1>
        </div>
      </section>
      <OfferSection className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl space-y-md">
          {approvedFaqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <article key={question} className="rounded-xl border border-outline-variant bg-white shadow-sm">
                <button type="button" className="flex w-full items-center justify-between gap-md p-lg text-left" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                  <span className="font-headline-sm text-headline-sm text-primary">{question}</span>
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">{open ? 'expand_less' : 'expand_more'}</span>
                </button>
                {open ? <div className="border-t border-outline-variant px-lg pb-lg pt-md"><p className="font-body-md text-body-md text-on-surface-variant">{answer}</p></div> : null}
              </article>
            );
          })}
        </div>
      </OfferSection>
      <OfferSection className="bg-primary">
        <div className="mx-auto max-w-4xl text-center">
          <Heading title="Bring one workflow that should not be this hard." inverse className="mx-auto" />
          <ActionLink href="/contact?next=workflow-fit-call">Book my 20-minute workflow fit call</ActionLink>
        </div>
      </OfferSection>
    </>
  );
}
