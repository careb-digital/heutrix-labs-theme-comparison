import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ set expanded from supplied copy to address buying objections and service boundaries.
  const faqs = [
    { q: 'What does Heutrix Labs do?', a: 'Heutrix Labs helps health practices improve operational workflows through practical process improvement, automation, better visibility, safe AI support and lightweight internal systems.' },
    { q: 'Who does Heutrix Labs work with?', a: 'We work primarily with GP clinics, allied health practices, specialist providers and small-to-mid-sized healthcare operators that need clearer workflows, better follow-up, safer AI use or better visibility over day-to-day operations. We may also support selected NDIS or care-related providers where the work is operational and within scope.' },
    { q: 'What is the Workflow Diagnostic?', a: 'The Workflow Diagnostic is a paid assessment that helps identify the best workflow to improve first. It is designed for practices that know something is taking too much time, creating avoidable risk or causing inconsistent follow-up, but are not sure what should be changed first.' },
    { q: 'Do I need a Workflow Diagnostic before every project?', a: 'No. If the workflow problem is already clear, we may recommend moving directly to a Workflow Automation Sprint, Operations Dashboard Build, Safe AI Setup, Tailored Internal Workflow System or another scoped project.' },
    { q: 'What is an Operations Dashboard Build?', a: 'An Operations Dashboard Build creates a practical view of important operational information in one place so owners and managers can see what is happening and what needs attention. Automatic updating depends on your existing tools, data access, integration options and budget.' },
    { q: 'What is Safe AI Setup?', a: 'Safe AI Setup helps your practice set rules before staff use AI at work. It includes approved use cases, prohibited use cases, sensitive information rules, human review requirements, staff guidance and an AI use case register.' },
    { q: 'Do you build clinical AI tools?', a: 'No. Heutrix Labs does not build diagnostic tools, treatment recommendation tools, clinical decision-making systems or medical-device software as part of its current services. AI support is limited to approved operational use cases subject to data handling and human review controls.' },
    { q: 'Can we use AI with patient or client information?', a: 'Not without a careful review. Heutrix Labs does not recommend entering identifiable patient, client, participant, staff or sensitive business information into publicly available generative AI tools.' },
    { q: 'Will Heutrix Labs need access to patient or client data?', a: 'Not for an initial enquiry or fit call. A general description of the workflow is enough. If a project proceeds and data access is required, Heutrix Labs will confirm the purpose, data types, systems involved, access requirements, testing approach and handling arrangements before work begins.' },
    { q: 'Does NDIS operational workflow support include registration readiness?', a: 'No. It does not include registration readiness, evidence preparation, audit readiness, mock audit support, audit-readiness dashboards, compliance gap assessments or assurance services.' },
    { q: 'How much does Heutrix Labs cost?', a: 'Indicative packages start from: Workflow Diagnostic from $1,500, Workflow Automation Sprint from $4,500, Operations Dashboard Build from $4,500, Safe AI Setup from $4,800 and Tailored Internal Workflow System from $9,500. All prices are quoted excluding GST.' },
    { q: 'Do you promise cost savings or productivity improvements?', a: 'No. Heutrix Labs does not promise cost savings, revenue growth, productivity gains or business performance improvements. Outcomes depend on implementation, adoption, data quality, staff use and management oversight.' }
  ];

  return (
    <section className="py-xxl px-lg bg-surface" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-xxl">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Frequently asked questions.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Clear answers about Heutrix Labs services, pricing, privacy, safe AI and service boundaries.</p>
        </motion.div>
        
        <div className="space-y-md">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              viewport={{ once: true }}
              key={index} 
              className={`border border-slate-200 rounded-xl overflow-hidden bg-white transition-all ${openIndex === index ? 'shadow-md border-secondary/30' : 'shadow-sm'}`}
            >
              <button 
                className="w-full flex items-center justify-between p-lg text-left hover:bg-slate-50 transition-colors" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-headline-sm text-headline-sm text-primary">{faq.q}</span>
                <motion.span 
                  animate={{ rotate: openIndex === index ? 180 : 0 }} 
                  className="material-symbols-outlined" 
                  data-icon="expand_more"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                    className="px-lg pb-lg text-on-surface-variant font-body-md overflow-hidden"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
