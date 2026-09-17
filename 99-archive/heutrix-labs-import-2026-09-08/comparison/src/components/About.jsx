import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-xxl px-lg bg-surface-container-low overflow-hidden" id="about">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-xxl items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">"We diagnose before we build."</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              Good operational improvement starts with understanding the workflow. Before recommending a system, dashboard, automation or AI-supported workflow, we look at what triggers the process, who is involved, where work gets stuck, and what risks need to be controlled. Then we recommend the simplest useful solution.
            </p>
            <div className="p-lg bg-error-container text-on-error-container rounded-xl border-l-4 border-error mb-xl">
              <div className="flex items-start gap-md">
                <span className="material-symbols-outlined mt-1" data-icon="warning">warning</span>
                <div>
                  <p className="font-label-md text-label-md font-bold mb-xs">Clear service boundaries</p>
                  <p className="font-body-sm text-body-sm">
                    Heutrix Labs provides workflow improvement, safe AI support, practice visibility builds and operational systems. We do **NOT** provide clinical advice, medical advice, legal advice, financial advice, regulatory advice, official audit services, NDIS registration readiness, or compliance gap assessments.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-lg">
              <div className="flex -space-x-3">
                <img alt="Team 1" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_FDpeGrj83O_E8dSV8puy049SMrnZP1KWY9CICQXfQpUmnaoJ1HKMvvk7nSMZQeTk2YWrZTmzqaZpb0XPur2m7CTWjJwqOE_6xunZFl0Zh3TJwB-Lnb4rfBoh0UYbl7t3KFi0cKoWJ7MX8Kr_UBTRocorXCLTcf5GpWMlCO1-h0zbUfOXsh0JiUGt1Knp3YXEOgQSiJg-wIc5-H6EGjPOMxrek2r3LQcHyFjXOpPAIv42riwpAYGjN5H0sm3BhZ0v9NkSFlqUw7Q4"/>
                <img alt="Team 2" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGknVEQFeApSJYPmla1zIIqpSm2EE4GXcMy4urTBFk8J5vwy4fxcFYfoxwDGVjfd2iaQ91KChi6zOBAsQ23gPDFN81G3xrb84SHl_vzxNwhPgGQR2e-1SzuLJbiVBj6Hf1dJGM_qls2-6XBAm-75CQxqUCmZvSZdfXHLgPJyCHEZDsPr51hWKj4q9pxIOAqWal0xqSl8NF5dMK7xxTvY7-qR6kfHofYULF1k3x6jOnLzujuT6erJVyRA7HgBcxb0glIOQWWH78XUn"/>
                <img alt="Team 3" className="w-12 h-12 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVbGk5V7d77WyI_yuJOm4CgSXeWX--jLXEPC9S9uxjX_CjzRk630OaMaoez2NtqR9wUWwllN38vlX24v0jxO0OTPuZOUMww3rEDEJgGvCU-bzTwhWWu-kHTGeYbd-rFHKRIbMjHvbkEgQFe_DCmvjmE7Jxf5XbFug5sSHGIo2LkYwbpNyToQRriSx2YFl3e8y-xxKp5Humq6Z2RPfimZ5KDr0QH1J6XN7TZzMWvaAhJ4BR-EtPSi1A9nzBZwWR92PFUho6BBLqaSVq"/>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">Trusted by Australian Practices</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}>
            <div className="relative">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="relative glass-card p-xl rounded-xxl border border-slate-200 shadow-xl overflow-hidden">
                <h4 className="font-headline-sm text-headline-sm mb-lg text-primary">The Heutrix Method</h4>
                <ul className="space-y-md">
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">1</div>
                    <p className="font-body-md text-body-md">Diagnostic: Finding the workflow gaps</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">2</div>
                    <p className="font-body-md text-body-md">Process: Uncovering manual clicks</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">3</div>
                    <p className="font-body-md text-body-md">Automation: Reducing repeated admin</p>
                  </li>
                  <li className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">4</div>
                    <p className="font-body-md text-body-md">Safe AI: Scaling with patient trust</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
