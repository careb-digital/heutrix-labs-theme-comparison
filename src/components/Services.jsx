import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const card = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  const servicesData = [
    { 
      icon: 'troubleshoot', 
      title: 'Workflow Diagnostic', 
      subtitle: 'Find the workflow worth improving first.',
      desc: 'A structured review for organisations that know admin is messy, risky or time-consuming, but are not yet sure what should change first.', 
      link: 'Learn more', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'auto_mode', 
      title: 'Workflow Automation Sprint', 
      subtitle: 'Improve one important admin or operational workflow.',
      desc: 'A focused 2-4 weeks period to improve one defined workflow such as intake tracking, referral follow-up, service agreements, document collection, incident and complaint tracking, onboarding, reporting preparation or evidence tracking.', 
      link: 'Learn more', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'visibility', 
      title: 'Operations Dashboard Build', 
      subtitle: 'See what needs attention without chasing updates.',
      desc: 'A practical dashboard or visibility view for practice managers, provider owners and operational leads who need to see workload, status, overdue items, bottlenecks, incidents, complaints, evidence or reporting inputs.', 
      link: 'Learn more', bg: 'bg-surface-container', text: 'text-primary' 
    }
  ];

  return (
    <section className="py-xxl px-lg bg-surface relative z-20" id="services">
      <div className="max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="mb-xxl text-center max-w-3xl mx-auto">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">Practical ways we can help.</h2>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mt-md">
            Start with one of the clearest entry points. These services are designed to help allied health practices and disability support providers understand what to improve, fix one defined workflow, or see operational work more clearly.
          </p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {servicesData.map((s, i) => (
            <motion.div 
              key={i} 
              variants={card} 
              className="glass-card p-xl rounded-xl border border-slate-200 hover:shadow-2xl transition-all group flex flex-col h-full transform-gpu origin-center"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={`w-14 h-14 ${s.bg} rounded-full flex items-center justify-center ${s.text} mb-lg group-hover:scale-110 transition-transform shrink-0`}>
                <span className="material-symbols-outlined text-[32px]" data-icon={s.icon}>{s.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-xs text-primary">{s.title}</h3>
              <p className="font-label-md text-primary font-bold mb-sm">{s.subtitle}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-xl">{s.desc}</p>
              <div className="mt-auto">
                <a className="flex items-center gap-sm text-primary font-bold hover:underline" href="#contact">{s.link} <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span></a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="mt-xl text-center max-w-2xl mx-auto">
          <p className="font-body-lg text-on-surface-variant">
            Need Safe AI Setup or a tailored internal workflow system? <a href="#services" className="font-bold text-primary hover:underline">View all services.</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
