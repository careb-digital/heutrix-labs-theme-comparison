import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-xxl px-lg bg-surface" id="contact">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-xxl">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Book a free fit call.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-md">Book a free 20-minute fit call with Heutrix Labs.</p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              We will discuss the workflow or operational issue, what is currently difficult to manage and whether Heutrix Labs is the right fit to help. The purpose of this call is to decide the best next step.
            </p>

            {/* Privacy note mirrors the supplied contact page and keeps sensitive information out of the enquiry form. */}
            <div className="p-md bg-secondary-container/30 border border-secondary/20 rounded-xl mb-xl">
              <p className="font-label-md text-label-md text-primary mb-xs">Important privacy note before you submit the form</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Please do not include patient names, Medicare numbers, clinical details, diagnosis information, participant records, photos, staff records or other sensitive information in this form. A general description of the workflow is enough for the fit call.
              </p>
            </div>

            <div className="space-y-lg">
              <div className="flex items-center gap-lg">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" data-icon="mail">mail</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary">Email</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">hello@heutrixlabs.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            <form className="glass-card p-xl rounded-xxl border border-slate-200 shadow-xl space-y-md" onSubmit={(e) => e.preventDefault()}>
              {/* Form fields updated from the supplied fit-call requirements; no sensitive data is requested. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="Your name" type="text" required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Practice or organisation name</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="Practice or organisation" type="text" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Email</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="you@example.com" type="email" required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Practice type</label>
                  <input className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none" placeholder="GP clinic, allied health, specialist, etc." type="text" required />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">What workflow or process needs improvement?</label>
                <textarea className="min-h-28 p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none resize-y" placeholder="A general description is enough. Do not include sensitive information." required></textarea>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">What is currently difficult, slow or inconsistent?</label>
                <textarea className="min-h-24 p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none resize-y" placeholder="Describe the operational issue at a high level." required></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Support interest</label>
                  <select className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white">
                    <option>Not sure yet</option>
                    <option>Workflow Diagnostic</option>
                    <option>Workflow Automation Sprint</option>
                    <option>Operations Dashboard Build</option>
                    <option>Safe AI Setup</option>
                    <option>Tailored Internal Workflow System</option>
                    <option>Regulated Provider Workflow Tools</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-primary px-xs">Preferred timeframe</label>
                  <select className="p-md rounded-lg border border-slate-300 focus:ring-2 focus:ring-secondary/50 outline-none bg-white">
                    <option>Flexible</option>
                    <option>Next 2-4 weeks</option>
                    <option>Next 1-3 months</option>
                    <option>Planning for later</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-primary px-xs">Operational status</label>
                <div className="space-y-sm mt-xs">
                  <label className="flex items-center gap-md p-md border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input className="w-5 h-5 text-secondary rounded" type="checkbox" />
                    <span className="font-body-sm">Patient, client, participant, staff, financial or sensitive records may be involved.</span>
                  </label>
                  <label className="flex items-center gap-md p-md border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input className="w-5 h-5 text-secondary rounded" type="checkbox" />
                    <span className="font-body-sm">Staff are currently using or considering AI tools at work.</span>
                  </label>
                  <label className="flex items-center gap-md p-md bg-error-container/20 border border-error/20 rounded-lg cursor-pointer hover:bg-error-container/30">
                    <input className="w-5 h-5 text-error rounded" type="checkbox" required />
                    <span className="font-body-sm font-bold text-on-surface">I confirm I have not included identifiable patient, client, participant, staff, clinical or sensitive information in this form.</span>
                  </label>
                  <label className="flex items-center gap-md p-md border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input className="w-5 h-5 text-secondary rounded" type="checkbox" required />
                    <span className="font-body-sm">I consent to Heutrix Labs contacting me about this enquiry.</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-primary text-on-primary py-lg rounded-xl font-headline-sm hover:opacity-95 transition-all shadow-md mt-md">
                Book a free fit call
              </button>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                The free fit call is general in nature and does not create an engagement. Any project is subject to written scope, feasibility review, data handling review and commercial agreement.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
