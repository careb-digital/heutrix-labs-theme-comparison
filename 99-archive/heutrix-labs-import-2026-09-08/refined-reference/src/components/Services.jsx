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

  // Service cards use the supplied package names and service-boundary language.
  const servicesData = [
    { 
      icon: 'troubleshoot', 
      title: 'Workflow Diagnostic', 
      lead: 'Find the workflow worth improving first.',
      desc: 'A structured review for practices that know something is taking too much time, creating risk or causing avoidable friction, but are not yet sure what should change first.',
      bestFor: 'Unclear problems, manual admin, duplicated work, scattered spreadsheets or poor visibility.',
      link: 'Start with a Workflow Diagnostic', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'auto_mode', 
      title: 'Workflow Automation Sprint', 
      lead: 'Improve one defined admin or operational workflow.',
      desc: 'A focused implementation sprint for enquiry follow-up, referral tracking, recall coordination, document collection, onboarding, internal requests or routine reporting preparation.',
      bestFor: 'One known workflow that is slow, inconsistent or too dependent on manual handling.',
      link: 'Improve a workflow', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'visibility', 
      title: 'Operations Dashboard Build', 
      lead: 'See what needs attention without chasing updates.',
      desc: 'For practices that need a clearer view of enquiries, referrals, recalls, tasks, workload, onboarding, document collection, incidents, complaints or management reporting.',
      bestFor: 'Owners and managers who need better operational visibility.',
      link: 'Build an operations dashboard', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'security', 
      title: 'Safe AI Setup', 
      lead: 'Set safe rules before AI becomes part of practice work.',
      desc: 'For practices that want to explore AI carefully, or already have staff using AI tools informally. We define approved uses, prohibited uses, sensitive information rules and human review steps.',
      bestFor: 'Practices that want productivity support without weakening privacy, trust or professional judgement.',
      link: 'Set up safe AI use', bg: 'bg-secondary-container', text: 'text-on-secondary-container', active: true 
    },
    { 
      icon: 'dashboard_customize', 
      title: 'Tailored Internal Workflow System', 
      lead: 'For workflows that need something more tailored.',
      desc: "For practices that need more than a standard tracker, form or dashboard, including a lightweight internal request system, structured admin workflow or approved AI-supported admin step.",
      bestFor: 'Multi-step workflows, custom operating layers or approved AI-supported admin processes.',
      link: 'Scope a tailored workflow system', bg: 'bg-surface-container', text: 'text-primary' 
    },
    { 
      icon: 'rule', 
      title: 'Regulated Provider Workflow Tools', 
      lead: 'Operational tools for selected regulated providers.',
      desc: 'Selected care-related or regulated providers can get clearer internal workflows for intake, onboarding, service coordination, incident tracking, complaint tracking, evidence tracking or handovers.',
      bestFor: 'Providers that need better internal systems and understand compliance responsibilities remain with them.',
      link: 'Discuss regulated provider workflow tools', bg: 'bg-surface-container', text: 'text-primary' 
    }
  ];

  const capabilities = [
    'workflow diagnostics',
    'process mapping',
    'workflow automation',
    'operations dashboards',
    'internal trackers and registers',
    'handover systems',
    'safe AI setup',
    'lightweight internal workflow systems'
  ];

  return (
    <section className="py-xxl px-lg bg-surface relative z-20" id="services">
      <div className="max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="mb-xxl max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-xl items-start">
            <div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">What Heutrix Labs does.</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Heutrix Labs is a practical implementation partner for health practices and regulated service providers. We help service providers turn messy admin, scattered spreadsheets and manual workflows into safer, clearer and more reliable internal systems.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-xxl p-lg border border-outline-variant">
              <p className="font-label-md text-label-md text-primary mb-md uppercase">Our work may include</p>
              <div className="flex flex-wrap gap-sm">
                {capabilities.map((item) => (
                  <span key={item} className="bg-white border border-slate-200 rounded-full px-md py-sm font-body-sm text-body-sm text-on-surface-variant">
                    {item}
                  </span>
                ))}
              </div>
              <p className="font-headline-sm text-headline-sm text-primary mt-lg">We start with the workflow first. Technology comes second.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="mb-xl text-center max-w-3xl mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary mb-md">Practical ways we can help.</h2>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
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
              <h3 className="font-headline-sm text-headline-sm mb-sm text-primary">{s.title}</h3>
              <p className="font-label-md text-label-md text-primary mb-sm">{s.lead}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md">{s.desc}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-xl"><strong className="text-primary">Best for:</strong> {s.bestFor}</p>
              <div className="mt-auto">
                <a className="flex items-center gap-sm text-primary font-bold hover:underline" href="#contact">{s.link} <span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span></a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
