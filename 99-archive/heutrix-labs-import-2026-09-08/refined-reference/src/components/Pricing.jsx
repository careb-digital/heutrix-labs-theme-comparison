import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  ['Free fit call', 'Checking whether the problem is a good fit', 'Free'],
  ['Workflow Diagnostic', 'Clarifying the best workflow to improve first', 'From $1,500'],
  ['Workflow Automation Sprint', 'Improving one defined workflow', 'From $4,500'],
  ['Operations Dashboard Build', 'Creating clearer operational visibility', 'From $4,500'],
  ['Safe AI Setup', 'Setting practical AI rules and controls', 'From $4,800'],
  ['Tailored Internal Workflow System', 'Building a more tailored internal workflow or approved AI-supported admin step', 'From $9,500'],
  ['Regulated Provider Workflow Tools', 'Selected operational tools for regulated providers', 'Scoped separately']
];

const supportOptions = [
  ['Light Support', 'Minor fixes, questions and small adjustments', 'From $350 per month'],
  ['Maintenance Support', 'Ongoing updates, workflow changes and troubleshooting', 'From $750 per month'],
  ['Improvement Retainer', 'Regular workflow improvement, visibility support and automation refinement', 'From $1,500 per month']
];

const startingPoints = [
  ['Start with a Workflow Diagnostic', 'Use this when you know something is slow, inconsistent, risky or hard to manage, but you are not yet sure which workflow should be improved first.'],
  ['Start with a Workflow Automation Sprint', 'Use this when the process to improve is already known, such as enquiry follow-up, referral tracking, recall coordination, onboarding or document collection.'],
  ['Start with an Operations Dashboard Build', 'Use this when important information exists across tools, spreadsheets, inboxes or people, but managers need to see what is waiting or delayed.'],
  ['Start with Safe AI Setup', 'Use this before AI becomes part of routine practice work, especially where sensitive information, professional judgement or patient trust need consideration.']
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-xxl px-lg bg-surface-container-low relative z-20">
      <div className="max-w-container-max mx-auto">
        {/* Replaced old generic tiers with the supplied AUD ex-GST package overview. */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mb-xl">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Clear pricing for practical workflow improvement, visibility and safe AI support.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Heutrix Labs packages give health practices a clear pathway from operational problem to practical solution. Start with a free fit call. If the problem needs more investigation, the Workflow Diagnostic helps identify what to improve first. If the opportunity is already clear, we can move directly into a defined build.
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-md">All prices are indicative and quoted in AUD excluding GST.</p>
        </motion.div>

        <div className="overflow-hidden rounded-xxl border border-outline-variant bg-white shadow-xl mb-xl">
          <div className="hidden md:grid grid-cols-[1.1fr_1.4fr_0.8fr] gap-md bg-primary text-white px-lg py-md font-label-md text-label-md uppercase">
            <span>Offer</span>
            <span>Best for</span>
            <span className="text-right">Indicative price ex GST</span>
          </div>
          {packages.map(([offer, bestFor, price]) => (
            <div key={offer} className="grid grid-cols-1 md:grid-cols-[1.1fr_1.4fr_0.8fr] gap-sm md:gap-md px-lg py-md border-t border-outline-variant">
              <p className="font-headline-sm text-headline-sm text-primary">{offer}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">{bestFor}</p>
              <p className="font-headline-sm text-headline-sm text-primary md:text-right">{price}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="bg-white rounded-xxl p-xl border border-outline-variant shadow-sm">
            <h3 className="font-headline-md text-headline-md text-primary mb-lg">How to choose the right starting point.</h3>
            <div className="space-y-lg">
              {startingPoints.map(([title, copy]) => (
                <div key={title} className="border-l-4 border-secondary pl-md">
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-xs">{title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.2 }} className="bg-primary text-on-primary rounded-xxl p-xl shadow-xl">
            <h3 className="font-headline-md text-headline-md mb-lg">Optional support after handover.</h3>
            <div className="space-y-md">
              {supportOptions.map(([name, bestFor, price]) => (
                <div key={name} className="bg-white/10 border border-white/10 rounded-xl p-md">
                  <p className="font-headline-sm text-headline-sm text-white">{name}</p>
                  <p className="font-body-sm text-body-sm text-on-primary-fixed-variant my-xs">{bestFor}</p>
                  <p className="font-label-md text-label-md text-secondary-fixed">{price}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mt-xl max-w-4xl">
          Pricing is indicative and subject to final scope. Final pricing depends on workflow complexity, existing tools, data structure, integration needs, user numbers, urgency, testing requirements, privacy considerations, risk controls and support requirements. Heutrix Labs does not promise cost savings, revenue growth, productivity gains, compliance outcomes, registration outcomes, regulator approval or business performance improvements.
        </p>
      </div>
    </section>
  );
}
