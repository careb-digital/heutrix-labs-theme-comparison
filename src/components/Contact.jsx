import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-xl md:py-xxl px-md sm:px-lg bg-surface relative overflow-hidden w-full" id="contact">
      <div className="max-w-container-max mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-xl lg:gap-xxl items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="w-full min-w-0">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed mb-sm block">Next step</span>
            <h2 className="font-display-lg text-[28px] sm:text-display-lg-mobile md:text-display-lg text-primary mb-md break-words">Book a free fit call.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">We will discuss the workflow or operational issue, what is currently difficult to manage and whether Heutrix Labs is the right fit to help. The purpose of this call is to decide the best next step.</p>
            <div className="p-md bg-secondary-container/30 border border-secondary/20 rounded-xl mb-xl">
              <p className="font-label-md text-label-md text-primary mb-xs">Privacy note before submitting</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Please do not include patient, client, clinical, Medicare, NDIS, diagnostic or other sensitive information in this form.</p>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.2 }} className="w-full min-w-0">
            <form className="glass-card p-md sm:p-lg md:p-xl rounded-2xl sm:rounded-xxl border border-slate-200 shadow-xl space-y-md w-full max-w-full box-border" onSubmit={(e) => e.preventDefault()}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
                <div className="flex flex-col gap-xs w-full">
                  <label className="font-label-md text-label-md text-primary px-xs">Name</label>
                  <input className="w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
                <div className="flex flex-col gap-xs w-full">
                  <label className="font-label-md text-label-md text-primary px-xs">Email</label>
                  <input className="w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="email"/>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md w-full">
                <div className="flex flex-col gap-xs w-full">
                  <label className="font-label-md text-label-md text-primary px-xs">Practice or organisation name</label>
                  <input className="w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
                <div className="flex flex-col gap-xs w-full">
                  <label className="font-label-md text-label-md text-primary px-xs">Role</label>
                  <input className="w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" type="text"/>
                </div>
              </div>

              <div className="flex flex-col gap-xs w-full">
                <label className="font-label-md text-label-md text-primary px-xs">What would you like help with?</label>
                <select className="w-full max-w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white text-ellipsis overflow-hidden">
                  <option>Workflow Diagnostic</option>
                  <option>Workflow Automation Sprint</option>
                  <option>Operations Dashboard Build</option>
                  <option>Safe AI Setup</option>
                  <option>Tailored Internal Workflow System</option>
                  <option>Regulated Provider Workflow Tools</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs w-full">
                <label className="font-label-md text-label-md text-primary px-xs">Preferred next step</label>
                <select className="w-full max-w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white text-ellipsis overflow-hidden">
                  <option>Book a free fit call</option>
                  <option>View Services</option>
                  <option>View pricing</option>
                  <option>Start with a Workflow Diagnostic</option>
                  <option>Improve a workflow</option>
                  <option>Build an operations dashboard</option>
                  <option>Set up safe AI use</option>
                </select>
              </div>

              <div className="flex flex-col gap-xs w-full">
                <label className="font-label-md text-label-md text-primary px-xs">Message</label>
                <textarea 
                  className="w-full max-w-full box-border p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none min-h-[120px]" 
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
