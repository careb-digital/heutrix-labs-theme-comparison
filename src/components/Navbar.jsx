import React, { useEffect, useState } from 'react';
import { ctas, mainNav } from '../siteContent';

const navIcons = {
  '/': 'home',
  '/services': 'settings',
  '/workflow-transformation': 'account_tree',
  '/allied-health': 'medical_services',
  '/disability-providers': 'diversity_3',
  '/pricing': 'payments',
  '/safe-ai': 'verified_user',
  '/about': 'info',
  '/faq': 'help'
};

export default function Navbar({ currentPath = '/' }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b border-outline-variant bg-surface/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        id="main-header"
      >
        <div className="mx-auto flex h-[84px] max-w-container-max items-center justify-between gap-md px-lg">
          <div className="flex items-center gap-md">
            <button
              type="button"
              className="rounded-lg p-sm text-primary lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                menu
              </span>
            </button>
            <a className="font-headline-md text-headline-md font-bold tracking-tight text-primary" href="/">
              Heutrix Labs
            </a>
          </div>

          <nav className="hidden items-center gap-md lg:flex xl:gap-lg" aria-label="Main navigation">
            {mainNav.map((item) => {
              const active = item.path === currentPath;
              return (
                <a
                  key={item.path}
                  className={`font-label-md text-label-md transition-colors ${
                    active ? 'border-b-2 border-secondary pb-1 text-secondary' : 'text-on-surface-variant hover:text-secondary'
                  }`}
                  href={item.path}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              className="whitespace-nowrap rounded-xl bg-primary px-md py-sm font-label-md text-label-md text-on-primary shadow-sm transition-opacity hover:opacity-95 lg:px-lg"
              href={ctas.fitCall.href}
            >
              Book a 20-minute fit call
            </a>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-primary/20 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex w-[min(320px,86vw)] transform flex-col gap-md bg-surface-container-lowest p-md shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="mb-md flex items-center justify-between">
          <a className="font-headline-sm text-headline-sm font-bold text-primary" href="/" onClick={() => setDrawerOpen(false)}>
            Heutrix Labs
          </a>
          <button type="button" className="rounded-lg p-sm text-primary" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-xs">
          {mainNav.map((item) => {
            const active = item.path === currentPath;
            return (
              <a
                key={item.path}
                className={`flex items-center gap-md rounded-xl p-md transition-colors ${
                  active ? 'bg-secondary-container font-bold text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
                href={item.path}
                aria-current={active ? 'page' : undefined}
                onClick={() => setDrawerOpen(false)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {navIcons[item.path]}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto space-y-sm border-t border-outline-variant pt-lg">
          <a
            className="block rounded-xl bg-primary p-md text-center font-label-md text-on-primary"
            href={ctas.fitCall.href}
            onClick={() => setDrawerOpen(false)}
          >
            Book a 20-minute fit call
          </a>
          <a
            className="block rounded-xl bg-secondary-fixed-dim p-md text-center font-label-md text-on-secondary-fixed"
            href={ctas.pricing.href}
            onClick={() => setDrawerOpen(false)}
          >
            {ctas.pricing.label}
          </a>
        </div>
      </aside>
    </>
  );
}
