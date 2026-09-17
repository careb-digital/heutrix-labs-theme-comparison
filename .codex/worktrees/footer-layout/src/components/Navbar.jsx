import React, { useEffect, useRef, useState } from 'react';
import { ctas, mainNav } from '../siteContent';
import BrandLogo from './BrandLogo';

const navIcons = {
  '/': 'home',
  '/services': 'settings',
  '/allied-health': 'medical_services',
  '/disability-providers': 'diversity_3',
  '/ai-guardrails': 'verified_user',
  '/resources': 'library_books',
  '/about': 'info',
  '/faq': 'help',
  '/case-studies': 'description'
};

export default function Navbar({ currentPath = '/' }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeDrawer = (restoreFocus = true) => {
    setDrawerOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => openButtonRef.current?.focus());
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    // The modal top layer makes the rest of the page inert.
    drawer.showModal();
    drawer.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      drawer.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer(true);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableItems = Array.from(
        drawerRef.current?.querySelectorAll('a[href], button:not([disabled])') || []
      );
      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem?.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
              ref={openButtonRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-sm text-primary lg:hidden"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                menu
              </span>
            </button>
            <a className="brand-home" href="/" aria-label="Heutrix home">
              <BrandLogo />
            </a>
          </div>

          <nav className="hidden items-center gap-md lg:flex xl:gap-lg" aria-label="Main navigation">
            {mainNav.map((item) => {
              const active = item.path === currentPath;
              return (
                <a
                  key={item.path}
                  className={`font-label-md text-label-md transition-colors ${
                    active ? 'border-b-2 border-secondary pb-1 text-secondary' : 'text-primary hover:text-secondary'
                  }`}
                  href={item.path}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              className="whitespace-nowrap rounded-xl theme-primary px-md py-sm font-label-md text-label-md text-on-primary shadow-sm transition-opacity hover:opacity-95 lg:px-lg"
              href={ctas.fitCall.href}
            >
              {ctas.fitCall.label}
            </a>
          </nav>
        </div>
      </header>

      <dialog
        id="mobile-navigation"
        ref={drawerRef}
        className="mobile-navigation bg-surface-container-lowest text-primary shadow-2xl"
        aria-label="Mobile navigation"
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          closeDrawer();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) closeDrawer();
        }}
      >
        <div className="mb-md flex items-center justify-between">
          <a className="brand-home" href="/" aria-label="Heutrix home" onClick={() => closeDrawer()}>
            <BrandLogo />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-sm text-primary"
            onClick={() => closeDrawer(true)}
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-xs" aria-label="Mobile navigation links">
          {mainNav.map((item) => {
            const active = item.path === currentPath;
            return (
              <a
                key={item.path}
                className={`flex items-center gap-md rounded-xl p-md transition-colors ${
                  active ? 'bg-secondary-container font-bold text-on-secondary-container' : 'text-primary hover:bg-surface-container-low'
                }`}
                href={item.path}
                aria-current={active ? 'page' : undefined}
                onClick={() => closeDrawer()}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  {navIcons[item.path]}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-outline-variant pt-lg">
          <a
            className="block rounded-xl theme-primary p-md text-center font-label-md text-on-primary"
            href={ctas.fitCall.href}
            onClick={() => closeDrawer()}
          >
            {ctas.fitCall.label}
          </a>
        </div>
      </dialog>
    </>
  );
}
