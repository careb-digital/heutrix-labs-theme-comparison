import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'What does Heutrix Labs do?', a: 'Heutrix Labs helps health practices improve operational workflows through practical process improvement, automation, better visibility, safe AI support and lightweight internal systems.' },
    { q: 'Who does Heutrix Labs work with?', a: 'We work primarily with allied health, dental, medical, specialist and care-related practices that need clearer workflows, better follow-up, safer AI use or better visibility over day-to-day operations.' },
    { q: 'What is the Workflow Diagnostic?', a: 'It is a paid assessment that helps identify the best workflow to improve first. It is designed for practices that know something is taking too much time, creating avoidable risk or causing inconsistent follow-up, but are not sure what should be changed first.' },
    { q: 'Can we use AI with patient or client information?', a: 'Not without a careful review. Heutrix Labs does not recommend entering identifiable patient, client, participant, staff or sensitive business information into publicly available generative AI tools.' },
    { q: 'Do you guarantee cost savings or productivity improvements?', a: 'No. Heutrix Labs does not guarantee cost savings, revenue growth, productivity gains or business performance improvements. Outcomes depend on implementation, adoption, data quality, staff use and management oversight.' }
  ];

  return (
    <section className="py-xxl px-lg bg-surface" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-xxl">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Operational Clarity</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Common questions about working with Heutrix Labs.</p>
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
