import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary pt-xxl pb-xl px-lg border-t border-slate-700/80">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-lg mb-xxl">
          <div className="max-w-md">
            <span className="font-headline-sm text-headline-sm text-secondary-fixed font-bold block mb-md">Heutrix Labs</span>
            <p className="font-body-sm text-body-sm text-slate-300 mb-md">
              Heutrix Labs helps Australian health practices improve operational workflows through practical process improvement, automation, safe AI support, better visibility and maintainable systems.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xl">
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Company</p>
              <ul className="space-y-sm font-body-sm text-slate-300">
                <li><a className="hover:text-secondary-fixed transition-colors" href="#about">About</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#services">Services</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="font-label-md text-label-md text-white mb-md">Legal</p>
              <ul className="space-y-sm font-body-sm text-slate-300">
                <li><a className="hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#">Terms of Use</a></li>
                <li><a className="hover:text-secondary-fixed transition-colors" href="#">Website Disclaimer</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="font-label-md text-label-md text-white mb-md">Social</p>
              <div className="flex gap-md">
                <a className="w-10 h-10 rounded-full bg-white/10 border border-white/15 text-slate-200 flex items-center justify-center hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:border-secondary-fixed transition-all" href="#">
                  <span className="material-symbols-outlined text-[20px]" data-icon="share">share</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700/80 pt-lg flex flex-col gap-lg">
          <div className="p-lg bg-slate-800/60 border border-slate-700/60 rounded-xl">
            <p className="font-label-sm text-label-sm font-bold text-secondary-fixed mb-xs uppercase tracking-widest">Website Disclaimer</p>
            <p className="font-body-sm text-body-sm text-slate-300 leading-relaxed">
              Heutrix Labs provides workflow improvement, safe AI support, practice visibility builds and operational systems support. Heutrix Labs does not provide legal advice, financial advice, tax advice, employment advice, clinical advice, medical advice, regulatory advice, official audit services, NDIS registration readiness, audit readiness, evidence preparation, mock audit support, compliance gap assessments or assurance services.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-md">
            <p className="font-body-sm text-body-sm text-slate-400">© 2024 Heutrix Labs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
