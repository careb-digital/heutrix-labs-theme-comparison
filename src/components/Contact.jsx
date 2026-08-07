import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-xxl px-lg bg-surface" id="contact">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-xxl">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed mb-sm block">Next step</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Book a free fit call.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">We will discuss the workflow or operational issue, what is currently difficult to manage and whether Heutrix Labs is the right fit to help. The purpose of this call is to decide the best next step.</p>
            <div className="p-md bg-secondary-container/30 border border-secondary/20 rounded-xl mb-xl">
              <p className="font-label-md text-label-md text-primary mb-xs">Privacy note before submitting</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Please do not include patient, client, clinical, Medicare, NDIS, diagnostic or other sensitive information in this form.</p>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            <form className="glass-card p-xl rounded-xxl border border-slate-200 shadow-xl space-y-md" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Email</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="email"/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Practice or organisation name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Role</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">What would you like help with?</label>
                <select className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white">
                  <option>Workflow Diagnostic</option>
                  <option>Workflow Automation Sprint</option>
                  <option>Operations Dashboard Build</option>
                  <option>Safe AI Setup</option>
                  <option>Tailored Internal Workflow System</option>
                  <option>Regulated Provider Workflow Tools</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">Preferred next step</label>
                <select className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white">
                  <option>Book a free fit call</option>
                  <option>View Services</option>
                  <option>View pricing</option>
                  <option>Start with a Workflow Diagnostic</option>
                  <option>Improve a workflow</option>
                  <option>Build an operations dashboard</option>
                  <option>Set up safe AI use</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">Message</label>
                <textarea 
                  className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none min-h-[120px]" 
                  placeholder="Briefly describe the workflow, admin issue or operational problem. Please do not include patient, participant, client, clinical, Medicare, NDIS, diagnostic or sensitive information."
                ></textarea>
              </div>

              <button className="w-full bg-primary text-on-primary py-lg rounded-xl font-headline-sm hover:opacity-95 transition-all shadow-md mt-md">
                Request fit call
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
