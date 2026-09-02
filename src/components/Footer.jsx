import React from 'react';
import { ctas, footerCopy, footerNav } from '../siteContent';

export default function Footer() {
  return (
    <footer className="border-t border-on-primary-fixed-variant bg-primary px-lg pb-xl pt-xxl text-on-primary">
      <div className="mx-auto max-w-container-max">
        <div className="mb-xxl grid gap-xl lg:grid-cols-[1fr_1.2fr_0.8fr]">
          <div className="max-w-md">
            <a className="mb-md block font-headline-sm text-headline-sm font-bold text-secondary-fixed" href="/">
              Heutrix Labs
            </a>
            <p className="font-body-sm text-body-sm text-inverse-on-surface">{footerCopy.summary}</p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-sm sm:grid-cols-2 md:grid-cols-3">
            {footerNav.map((item) => (
              <a key={item.path} className="font-body-sm text-body-sm text-inverse-on-surface transition-colors hover:text-white" href={item.path}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="rounded-xl border border-white/10 bg-white/5 p-lg">
            <p className="mb-md font-headline-sm text-headline-sm text-white">Bring one workflow that should not be this hard.</p>
            <a
              className="inline-flex w-full items-center justify-center rounded-xl bg-secondary-fixed px-lg py-md font-label-md text-on-secondary-fixed transition-opacity hover:opacity-95"
              href={ctas.fitCall.href}
            >
              Book a 20-minute fit call
            </a>
          </div>
        </div>

        <div className="border-t border-on-primary-fixed-variant pt-lg">
          <div className="mb-lg rounded-xl bg-on-primary-fixed-variant/10 p-lg">
            <p className="mb-xs font-label-sm text-label-sm font-bold uppercase text-secondary-fixed">Website disclaimer</p>
            <p className="font-body-sm text-body-sm text-inverse-on-surface">{footerCopy.boundary}</p>
          </div>
          <p className="font-body-sm text-body-sm text-inverse-on-surface">© 2026 Heutrix Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
