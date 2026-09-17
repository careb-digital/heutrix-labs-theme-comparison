import React from 'react';
import { motion } from 'framer-motion';

const processSteps = [
  ['1. Free fit call', 'A short call to understand the workflow or operational problem, confirm whether Heutrix Labs is likely to help and recommend the most practical next step.'],
  ['2. Diagnostic where the problem is unclear', 'If the workflow needs more investigation, the Workflow Diagnostic helps answer what is happening now, where the friction sits, what risks need to be considered and what should be improved first.'],
  ['3. Scoped build where the opportunity is clear', 'Where the opportunity is clear, we move into a focused implementation with agreed deliverables, practical testing and handover documentation.'],
  ['4. Handover and support', 'We document how the workflow works, explain what the practice needs to maintain and offer optional support for small changes, troubleshooting and improvement.']
];

const workflowRows = [
  ['Patient enquiry follow-up', 'Enquiries sit in inboxes or are followed up inconsistently', 'Enquiry tracker, reminder workflow and handover view'],
  ['Referral tracking', 'Status is unclear across reception, clinicians and managers', 'Referral pipeline, status tracker and follow-up dashboard'],
  ['Recall and review coordination', 'Actions depend on memory or manual checking', 'Recall tracker, review workflow and overdue view'],
  ['Document collection', 'Missing documents are hard to monitor', 'Collection tracker, status view and reminder process'],
  ['Staff onboarding', 'Steps vary by person or location', 'Onboarding checklist, responsibility tracker and handover guide'],
  ['Internal admin requests', 'Requests move through email, chat or verbal updates', 'Internal request workflow and task register'],
  ['Incident or complaint tracking', 'Records are scattered or hard to review', 'Register, review workflow and reporting view'],
  ['Reporting', 'Managers wait for manual spreadsheet updates', 'Operations dashboard or repeatable reporting workflow'],
  ['AI use', 'Staff experiment without clear boundaries', 'Safe AI rules, approved use cases and human review steps']
];

const principles = [
  'practice-led',
  'operationally practical',
  'privacy-aware',
  'safe-AI aware',
  'commercially grounded',
  'documented',
  'tested with users',
  'designed for handover',
  'built to fit the tools and team you already have where possible'
];

const aiSupport = [
  'first-draft internal emails',
  'internal procedure drafting',
  'meeting or call summaries, where appropriate',
  'task extraction from internal notes',
  'internal knowledge summaries',
  'report summarisation',
  'content planning',
  'workflow prompts',
  'admin drafting',
  'staff productivity support'
];

const aiBoundaries = [
  'clinical judgement',
  'professional responsibility',
  'legal advice',
  'privacy obligations',
  'management oversight',
  'final human review',
  'patient, client, staff, financial, compliance or safety decision-making'
];

export default function Methodology() {
  return (
    <div className="bg-surface relative" id="methodology">
      {/* UX update: replaced long sticky storytelling with compact decision and workflow sections for easier scanning. */}
      <section className="py-xxl px-lg bg-surface">
        <div className="max-w-container-max mx-auto">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-xl items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }}>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">How we work.</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Most practices start with a free fit call. If the problem is unclear, we usually recommend a Workflow Diagnostic. If the workflow is already defined, we may move straight to a scoped build.
              </p>
              <a className="inline-flex items-center justify-center gap-sm bg-primary text-on-primary px-xl py-lg rounded-xl font-headline-sm hover:opacity-90 transition-all shadow-md mt-lg" href="#contact">Book a free fit call</a>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-lg">
              {processSteps.map(([title, copy], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.05 }} viewport={{ once: true, amount: 0.2 }} className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">{title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-xxl px-lg bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mb-xl">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Common workflows we can improve.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              The goal is not just to display information. The goal is to help the right person see what needs attention, what is waiting, what is overdue and what needs review.
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-xxl bg-white border border-outline-variant shadow-xl">
            <div className="hidden md:grid grid-cols-[0.85fr_1fr_1fr] gap-md bg-primary text-white px-lg py-md font-label-md text-label-md uppercase">
              <span>Workflow</span>
              <span>What often goes wrong</span>
              <span>What we may build</span>
            </div>
            {workflowRows.map(([workflow, problem, build]) => (
              <div key={workflow} className="grid grid-cols-1 md:grid-cols-[0.85fr_1fr_1fr] gap-sm md:gap-md px-lg py-md border-t border-outline-variant">
                <p className="font-headline-sm text-headline-sm text-primary">{workflow}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{problem}</p>
                <p className="font-body-md text-body-md text-on-surface-variant">{build}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-xxl px-lg bg-surface">
        <div className="max-w-container-max mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-xl items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }}>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Workflow first. Technology second.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
              Heutrix Labs does not start by pushing software or AI. We start by understanding the workflow, the people involved, the information being handled, the decisions being made and the points where work gets stuck.
            </p>
            <p className="font-body-lg text-body-lg text-primary font-medium border-l-4 border-secondary pl-md">
              We do not automate a workflow without first understanding why it matters, who relies on it and what could go wrong if it is changed poorly.
            </p>
          </motion.div>

          <div className="bg-surface-container rounded-xxl p-xl border border-outline-variant">
            <p className="font-label-md text-label-md text-primary mb-md uppercase">Our work is</p>
            <ul className="grid sm:grid-cols-2 gap-sm">
              {principles.map((item) => (
                <li key={item} className="flex items-center gap-xs font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-[18px]" data-icon="check">check</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary text-on-primary py-xxl px-lg relative z-20" id="safe-ai">
        <div className="max-w-container-max mx-auto">
          {/* Safe AI section keeps the explicit exclusions and sensitive-information warning from the supplied copy. */}
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-xl items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }}>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-md">Safe AI setup for health practices.</h2>
              <p className="font-body-lg text-body-lg text-inverse-on-surface mb-md">
                AI can support internal admin, drafting, summarising, task extraction and workflow guidance. It can also create privacy, quality and trust risks if staff use it without clear rules.
              </p>
              <p className="font-body-lg text-body-lg text-inverse-on-surface">
                Heutrix Labs helps health practices set practical AI boundaries before AI becomes part of everyday work.
              </p>
              <a className="inline-flex items-center justify-center gap-sm bg-secondary-fixed text-on-secondary-fixed px-xl py-lg rounded-xl font-headline-sm hover:opacity-90 transition-all shadow-md mt-lg" href="#contact">Set up safe AI use</a>
            </motion.div>

            <div className="space-y-lg">
              <div className="p-xl border border-white/10 rounded-xxl bg-white/5 backdrop-blur-md">
                <h3 className="font-headline-sm text-headline-sm text-white mb-md">What AI can safely support, when properly controlled</h3>
                <ul className="grid sm:grid-cols-2 gap-sm">
                  {aiSupport.map((item) => (
                    <li key={item} className="flex items-start gap-xs font-body-md text-body-md text-inverse-on-surface">
                      <span className="material-symbols-outlined text-secondary-fixed text-[18px]" data-icon="check">check</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-xl bg-error-container text-on-error-container rounded-xxl shadow-lg border border-error/20">
                <h3 className="font-headline-sm text-headline-sm mb-sm">Sensitive information rule</h3>
                <p className="font-body-md text-body-md font-medium">
                  Heutrix Labs does not recommend entering identifiable patient, client, participant, staff or sensitive business information into publicly available generative AI tools.
                </p>
              </div>

              <div className="p-xl border border-white/10 rounded-xxl bg-white/5 backdrop-blur-md">
                <h3 className="font-headline-sm text-headline-sm text-white mb-md">What AI should not replace</h3>
                <ul className="grid sm:grid-cols-2 gap-sm">
                  {aiBoundaries.map((item) => (
                    <li key={item} className="flex items-start gap-xs font-body-md text-body-md text-inverse-on-surface">
                      <span className="material-symbols-outlined text-secondary-fixed text-[18px]" data-icon="block">block</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="font-body-md text-body-md text-inverse-on-surface mt-lg border-l-4 border-secondary-fixed pl-md">
                  Heutrix Labs does not build diagnostic tools, treatment recommendation tools, clinical decision-making systems or medical-device software as part of its current services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-xxl px-lg bg-surface">
        <div className="max-w-container-max mx-auto bg-surface-container rounded-xxl p-xl border border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-primary mb-md">Selected NDIS operational workflow support.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
            Heutrix Labs can support selected NDIS providers with operational workflows such as intake, onboarding, internal admin tracking and routine service coordination.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">
            This work is separate from NDIS registration readiness, evidence preparation, audit readiness, mock audit support, compliance gap assessments and assurance services.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Heutrix Labs work does not promise registration, audit success, NDIS Commission approval, compliance outcomes or regulator approval.
          </p>
        </div>
      </section>
    </div>
  );
}
