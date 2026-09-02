import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ApprovedFaqPage, ApprovedHomePage, WorkflowTransformationPage } from './components/ApprovedOfferPages';
import {
  aiGuidanceRows,
  alliedHealthContent,
  beforeAfterExamples,
  beliefs,
  bestFit,
  capabilities,
  ctas,
  disabilityContent,
  faqs,
  homePainPoints,
  homeServices,
  notFor,
  priceFactors,
  pricingExclusions,
  pricingRows,
  privacyProjectChecks,
  privacySensitiveItems,
  routes,
  safeAiHelps,
  safeAiIncluded,
  services,
  suitableAiUses,
  typicalProjects,
  unsuitableAiUses,
  whoWeHelp
} from './siteContent';

const routeMap = new Map(routes.map((route) => [route.path, route]));
const knownPaths = new Set(routes.map((route) => route.path));
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
};

function readLocation() {
  return {
    path: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash
  };
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function getMeta(path) {
  return routeMap.get(path) || routeMap.get('/');
}

function setMeta(page) {
  document.title = page.seoTitle;
  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement('meta');
    description.setAttribute('name', 'description');
    document.head.appendChild(description);
  }
  description.setAttribute('content', page.metaDescription);
}

function App() {
  const [location, setLocation] = useState(readLocation);
  const mainRef = useRef(null);
  const page = getMeta(location.path);

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (!anchor) return;

      const url = new URL(anchor.href);
      const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      const isSameOrigin = url.origin === window.location.origin;
      const path = normalizePath(url.pathname);

      if (isModifiedClick || anchor.target || !isSameOrigin || !knownPaths.has(path)) return;

      event.preventDefault();
      const nextUrl = `${path}${url.search}${url.hash}`;
      if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
        window.history.pushState({}, '', nextUrl);
      }
      setLocation(readLocation());
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    setMeta(page);
  }, [page]);

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0 });
    mainRef.current?.focus({ preventScroll: true });
  }, [location.path, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-surface font-body-lg text-on-surface antialiased selection:bg-secondary/30 selection:text-primary">
      <Navbar currentPath={location.path} />
      <main ref={mainRef} tabIndex="-1" className="outline-none">
        <PageRenderer path={location.path} search={location.search} />
      </main>
      <Footer />
    </div>
  );
}

function PageRenderer({ path, search }) {
  switch (path) {
    case '/services':
      return <ServicesPage />;
    case '/workflow-transformation':
      return <WorkflowTransformationPage />;
    case '/allied-health':
      return <AudiencePage content={alliedHealthContent} />;
    case '/disability-providers':
      return <AudiencePage content={disabilityContent} />;
    case '/pricing':
      return <PricingPage />;
    case '/safe-ai':
      return <SafeAiPage />;
    case '/about':
      return <AboutPage />;
    case '/faq':
      return <ApprovedFaqPage />;
    case '/contact':
      return <ContactPage search={search} />;
    case '/privacy-and-data-handling':
      return <PrivacyPage />;
    case '/terms-of-use':
      return <TermsPage />;
    case '/website-disclaimer':
      return <DisclaimerPage />;
    default:
      return <ApprovedHomePage />;
  }
}

function ButtonLink({ href, children, variant = 'primary', icon = 'arrow_forward', className = '' }) {
  const styles = {
    primary: 'bg-primary text-on-primary border-primary shadow-md hover:opacity-95',
    secondary: 'bg-white text-primary border-primary hover:bg-primary hover:text-on-primary',
    mint: 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed shadow-md hover:opacity-95',
    quiet: 'bg-surface-container-low text-primary border-outline-variant hover:border-primary'
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-sm rounded-xl border px-lg py-md font-headline-sm text-[18px] leading-6 transition-colors ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon ? (
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </a>
  );
}

function Section({ children, className = '', id }) {
  return (
    <section id={id} className={`px-lg py-xxl ${className}`}>
      <motion.div
        className="mx-auto max-w-container-max"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, children, className = '', inverse = false }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      {eyebrow ? (
        <p className={`mb-sm font-label-md text-label-md uppercase ${inverse ? 'text-secondary-fixed' : 'text-secondary'}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mb-md font-display-lg text-display-lg-mobile md:text-display-lg ${inverse ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {children ? (
        <div className={`space-y-md font-body-lg text-body-lg ${inverse ? 'text-inverse-on-surface' : 'text-on-surface-variant'}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PageHero({ eyebrow, title, children, actions, compact = false }) {
  return (
    <motion.section
      className={`px-lg ${compact ? 'pb-xl pt-[132px]' : 'pb-xxl pt-[144px]'} bg-surface`}
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <motion.div className="max-w-4xl" variants={stagger} initial="hidden" animate="show">
          {eyebrow ? (
            <motion.p variants={fadeUp} className="mb-md inline-flex rounded-[999px] border border-secondary/20 bg-secondary-container px-md py-xs font-label-sm text-label-sm uppercase text-on-secondary-container">
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            {title}
          </motion.h1>
          <motion.div variants={fadeUp} className="space-y-md font-body-lg text-body-lg text-on-surface-variant">{children}</motion.div>
          {actions ? <motion.div variants={fadeUp} className="mt-xl flex flex-col gap-md sm:flex-row sm:flex-wrap">{actions}</motion.div> : null}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.12 }}>
          <BoundaryCard />
        </motion.div>
      </div>
    </motion.section>
  );
}

function BoundaryCard() {
  return (
    <aside className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
      <div className="mb-md flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
        <span className="material-symbols-outlined" aria-hidden="true">
          verified_user
        </span>
      </div>
      <p className="mb-sm font-headline-sm text-headline-sm text-primary">Practical implementation partner</p>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Workflow, automation, dashboard and safe AI support for internal operations. Legal, clinical, audit,
        registration and regulatory responsibilities remain with the client.
      </p>
    </aside>
  );
}

function BulletList({ items, columns = false, tone = 'default' }) {
  const icon = tone === 'boundary' ? 'block' : 'check';
  const iconColor = tone === 'boundary' ? 'text-error' : 'text-secondary';

  return (
    <ul className={`grid gap-sm ${columns ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-sm font-body-md text-body-md text-on-surface-variant">
          <span className={`material-symbols-outlined mt-[2px] text-[18px] ${iconColor}`} aria-hidden="true">
            {icon}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({ icon, title, children, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-xl border border-outline-variant bg-white p-lg shadow-sm transition-shadow hover:shadow-lg ${className}`}
    >
      {icon ? (
        <div className="mb-md flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container text-primary">
          <span className="material-symbols-outlined" aria-hidden="true">
            {icon}
          </span>
        </div>
      ) : null}
      <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">{title}</h3>
      <div className="font-body-md text-body-md text-on-surface-variant">{children}</div>
    </motion.div>
  );
}

function ResponsiveRows({ columns, rows, emphasisLast = false }) {
  return (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm">
      <div
        className="responsive-table-header hidden gap-md bg-primary px-lg py-md font-label-md text-label-md uppercase text-white md:grid"
        style={{ '--row-columns': columns.map((column) => column.width || '1fr').join(' ') }}
      >
        {columns.map((column) => (
          <span key={column.label} className={column.align === 'right' ? 'text-right' : ''}>
            {column.label}
          </span>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={row.join('|')}
          className="responsive-table-row grid grid-cols-1 gap-md border-t border-outline-variant px-lg py-lg md:gap-md md:py-md"
          style={{ '--row-columns': columns.map((column) => column.width || '1fr').join(' ') }}
        >
          {row.map((cell, index) => (
            <div key={`${cell}-${index}`} className={columns[index].align === 'right' ? 'md:text-right' : ''}>
              <p className="mb-xs font-label-sm text-label-sm uppercase text-on-surface-variant md:hidden">{columns[index].label}</p>
              <p
                className={
                  index === 0 || (emphasisLast && index === row.length - 1)
                    ? 'font-headline-sm text-headline-sm text-primary'
                    : 'font-body-md text-body-md text-on-surface-variant'
                }
              >
                {cell}
              </p>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <motion.section className="relative overflow-hidden px-lg pb-xxl pt-[144px]" variants={fadeIn} initial="hidden" animate="show">
        <div className="mx-auto grid max-w-container-max gap-xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div className="max-w-3xl" variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="mb-md inline-flex max-w-full whitespace-normal rounded-[999px] border border-secondary/20 bg-secondary-container px-md py-xs font-label-sm text-label-sm uppercase text-on-secondary-container">
              Workflow systems for care-related service providers
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-md break-words font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Practical workflow systems for allied health practices and disability support providers.
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs helps Australian care-related service providers clean up messy admin, scattered
              spreadsheets, manual follow-up, reporting gaps and unsafe AI use.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
              We map how the work actually happens, then build practical improvements such as workflow trackers,
              dashboards, automations, handover systems, evidence registers and safe AI rules.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row sm:flex-wrap">
              <ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>
              <ButtonLink href={ctas.services.href} variant="secondary" icon={null}>
                {ctas.services.label}
              </ButtonLink>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-md max-w-2xl font-body-sm text-body-sm text-on-surface-variant">
              For practice managers, provider owners and operational leads who need clearer workflows, better
              visibility and safer use of technology without disrupting service delivery.
            </motion.p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.22 }}>
            <DashboardPreview />
          </motion.div>
        </div>
      </motion.section>

      <Section id="workflow-pressure" className="bg-primary text-on-primary">
        <SectionIntro
          title="Does this sound familiar?"
          className="mb-xl"
          inverse
        >
          <p>
            Even capable teams lose visibility when important work is spread across memory, inboxes, spreadsheets and
            manual reminders.
          </p>
        </SectionIntro>
        <h3 className="mb-lg font-headline-md text-headline-md text-secondary-fixed">You may be dealing with:</h3>
        <motion.div className="grid gap-md md:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          {homePainPoints.map((item) => (
            <motion.div key={item} variants={fadeUp} className="rounded-xl border border-white/15 bg-white/10 p-lg shadow-sm backdrop-blur-sm">
              <div className="mb-sm flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-fixed/20 text-secondary-fixed">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary-fixed" aria-hidden="true" />
              </div>
              <p className="font-body-md text-body-md text-white">{item}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-xl max-w-4xl border-l-4 border-secondary-fixed pl-lg font-body-lg text-body-lg text-inverse-on-surface">
          Heutrix Labs helps turn these pressure points into clearer workflows, practical tracking systems, safer AI
          practices and better visibility for day-to-day decisions.
        </p>
      </Section>

      <Section id="home-services" className="bg-surface">
        <SectionIntro title="Practical ways we can help." className="mx-auto mb-xl text-center">
          <p>
            Start with one of the clearest entry points. These services are designed to help allied health practices
            and disability support providers understand what to improve, fix one defined workflow, or see operational
            work more clearly.
          </p>
        </SectionIntro>
        <motion.div className="grid gap-lg md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          {homeServices.map((service) => (
            <ServiceSummaryCard key={service.title} service={service} />
          ))}
        </motion.div>
        <motion.p variants={fadeUp} className="mx-auto mt-xl max-w-3xl text-center font-body-lg text-body-lg text-on-surface-variant">
          Need Safe AI Setup or a tailored internal workflow system?{' '}
          <a href={ctas.allServices.href} className="font-headline-sm text-primary underline decoration-secondary underline-offset-4">
            {ctas.allServices.label}
          </a>
          .
        </motion.p>
      </Section>

      <DiagnosticMethodSection />

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro title="What Heutrix Labs does">
            <p>
              Heutrix Labs helps care-related service providers improve the internal systems that sit around client
              care and service delivery. We are not here to replace your core practice, client or case management
              software.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={capabilities} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Make your organisation easier to run without compromising trust.">
            <p>
              Allied health practices and disability support providers do not need technology for its own sake. They
              need systems that support the people already doing the work.
            </p>
            <p>
              As services grow, the operational work around client care and service delivery can become harder to
              coordinate. Enquiries need follow-up. Referrals need tracking. Documents need to be collected. Staff need
              clear handovers. Managers need to know what is happening without chasing updates.
            </p>
            <p>
              Heutrix Labs starts by understanding how your work actually happens, then recommends practical
              improvements that are safe, maintainable and useful in daily operations.
            </p>
          </SectionIntro>
          <div className="space-y-lg">
            <InfoCard icon="groups" title="Who we help">
              <BulletList items={whoWeHelp} />
            </InfoCard>
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Before and after examples" className="mb-xl" />
        <div className="grid gap-lg md:grid-cols-2">
          {beforeAfterExamples.map((example) => (
            <InfoCard key={example.title} icon="sync_alt" title={example.title}>
              <p className="mb-sm">
                <strong className="text-primary">Before:</strong> {example.before}
              </p>
              <p>
                <strong className="text-primary">After:</strong> {example.after}
              </p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <HomeFitCallSection />
    </>
  );
}

function HomeFitCallSection() {
  return (
    <Section id="book-fit-call" className="bg-surface">
      <div className="grid gap-xxl lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p variants={fadeUp} className="mb-sm font-label-md text-label-md uppercase text-secondary">
            Next step
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            Book a free fit call.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
            We will discuss the workflow or operational issue, what is currently difficult to manage and whether
            Heutrix Labs is the right fit to help. The purpose of this call is to decide the best next step.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-lg rounded-xl border border-secondary/20 bg-secondary-container/30 p-lg">
            <p className="mb-xs font-label-md text-label-md text-primary">Privacy note before submitting</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Please do not include patient, client, clinical, Medicare, NDIS, diagnostic or other sensitive information
              in this form.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          <ContactForm search="" submitLabel="Request fit call" />
        </motion.div>
      </div>
    </Section>
  );
}

function DiagnosticMethodSection() {
  const methodSteps = [
    ['1', 'Diagnostics', 'Understanding core problems and finding workflow gaps.'],
    ['2', 'Triage', 'Pinpoint and prioritise crucial bottlenecks.'],
    ['3', 'Automation', 'Automate and reduce repeated admin.'],
    ['4', 'Handover', 'Guidance with your new solution.']
  ];

  const providerTypes = ['AH', 'DS', 'SP'];

  return (
    <Section className="bg-surface-container-low overflow-hidden">
      <div className="grid gap-xxl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.p variants={fadeUp} className="mb-sm font-label-md text-label-md uppercase text-secondary">
            Workflow first
          </motion.p>
          <motion.h2 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
            We diagnose before we build.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
            Good operational improvement starts with understanding the workflow. Before recommending a system,
            dashboard, automation or AI-supported workflow, we look at what triggers the process, who is involved, where
            work gets stuck, and what risks need to be controlled. Then we recommend the simplest useful solution.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row sm:items-center">
            <div className="flex -space-x-3" aria-hidden="true">
              {providerTypes.map((label) => (
                <span
                  key={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-primary font-label-md text-label-md text-on-primary shadow-sm"
                >
                  {label}
                </span>
              ))}
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">Built for Australian care-related providers</span>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <div className="glass-card rounded-xl border border-outline-variant bg-white/90 p-xl shadow-xl">
            <h3 className="mb-lg font-headline-sm text-headline-sm text-primary">The Heutrix Method</h3>
            <div className="space-y-md">
              {methodSteps.map(([number, title, copy]) => (
                <div key={title} className="grid grid-cols-[auto_1fr] gap-md rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-container font-label-md text-label-md text-on-secondary-container">
                    {number}
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-primary">{title}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function DashboardPreview() {
  const rows = [
    ['Referral tracker', 'Owner set', 'Next action due'],
    ['Onboarding checklist', 'In review', 'Two tasks open'],
    ['Reporting preparation', 'Inputs received', 'Manager review']
  ];

  return (
    <div className="rounded-xl border border-outline-variant bg-white p-md shadow-xl">
      <div className="rounded-lg border border-outline-variant bg-surface-container-low p-md">
        <div className="mb-md flex items-center justify-between gap-md">
          <div>
            <p className="font-label-md text-label-md uppercase text-secondary">Operations dashboard</p>
            <p className="font-headline-sm text-headline-sm text-primary">Work that needs attention</p>
          </div>
          <span className="rounded-[999px] bg-secondary-container px-md py-xs font-label-sm text-label-sm text-on-secondary-container">
            Provider view
          </span>
        </div>
        <div className="grid gap-md sm:grid-cols-3">
          {['Waiting', 'Overdue', 'Needs review'].map((label, index) => (
            <div key={label} className="rounded-lg border border-outline-variant bg-white p-md">
              <p className="font-label-sm text-label-sm uppercase text-on-surface-variant">{label}</p>
              <p className="mt-xs font-display-lg text-[28px] leading-9 text-primary">{index + 2}</p>
            </div>
          ))}
        </div>
        <div className="mt-md overflow-hidden rounded-lg border border-outline-variant bg-white">
          {rows.map(([name, status, action]) => (
            <div key={name} className="grid gap-sm border-t border-outline-variant px-md py-md first:border-t-0 sm:grid-cols-[1.1fr_0.8fr_1fr]">
              <p className="font-body-md text-body-md text-primary">{name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{status}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{action}</p>
            </div>
          ))}
        </div>
        <div className="mt-md rounded-lg bg-primary p-md text-on-primary">
          <p className="font-label-md text-label-md text-secondary-fixed">Workflow first. Technology second.</p>
          <p className="mt-xs font-body-sm text-body-sm text-inverse-on-surface">
            Built around ownership, handover, privacy and realistic maintenance.
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceSummaryCard({ service }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="glass-card flex h-full flex-col rounded-xl border border-outline-variant bg-white/90 p-xl shadow-sm"
    >
      <div className="mb-md flex h-14 w-14 items-center justify-center rounded-full bg-surface-container text-primary transition-transform">
        <span className="material-symbols-outlined" aria-hidden="true">
          {service.icon}
        </span>
      </div>
      <h3 className="mb-xs font-headline-sm text-headline-sm text-primary">{service.title}</h3>
      <p className="mb-sm font-label-md text-label-md text-primary">{service.lead}</p>
      <p className="mb-lg font-body-md text-body-md text-on-surface-variant">{service.description}</p>
      <ButtonLink href={service.cta.href} variant="quiet" icon="chevron_right" className="mt-auto w-full">
        {service.cta.label}
      </ButtonLink>
    </motion.div>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Practical workflow services built around a clear operational outcome."
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
      >
        <p>
          Heutrix Labs helps allied health practices, disability support providers and selected care-related service
          providers improve the internal systems that support daily operations.
        </p>
        <p>
          Each engagement starts with the workflow, the people who use it and the outcome that needs to improve. The
          solution may be a clearer process, tracker, dashboard, automation, lightweight internal system or Safe AI setup.
        </p>
        <p>
          Start with a Workflow Diagnostic when the priority is unclear. When the workflow and desired outcome are
          already well-defined, we can scope the most suitable implementation service directly.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Our services" className="mb-xl" />
        <div className="space-y-xl">
          {services.map((service) => (
            <DetailedService key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <CtaSection
        title="Choose the smallest useful next step."
        body="Share a general description of the workflow, who uses it and what is difficult to see or manage. We can then discuss the most practical starting point."
      />
    </>
  );
}

function serviceAnchor(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function AudiencePage({ content }) {
  return (
    <>
      <PageHero title={content.title} actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}>
        {content.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHero>

      {content.audienceItems ? (
        <Section>
          <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionIntro title={content.audienceTitle}>
              <p>{content.audienceIntro}</p>
            </SectionIntro>
            <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
              <BulletList items={content.audienceItems} columns />
            </div>
          </div>
        </Section>
      ) : null}

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title={content.problemsTitle}>
            <p>{content.problemsLead}</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={content.problems} columns />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title={content.improvementsTitle}>
            <p>{content.improvementsLead || 'Heutrix Labs focuses on practical workflow support that can be used in day-to-day operations and handed over clearly.'}</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={content.improvements} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title={content.examplesTitle || content.exampleTitle} className="mb-xl" />
        <div className="grid gap-lg lg:grid-cols-3">
          {(content.examples || [
            { title: content.exampleTitle, before: content.exampleBefore, after: content.exampleAfter }
          ]).map((example) => (
            <InfoCard key={example.title} icon="sync_alt" title={example.title}>
              <p className="mb-sm">
                <strong className="text-primary">Before:</strong> {example.before}
              </p>
              <p>
                <strong className="text-primary">After:</strong> {example.after}
              </p>
            </InfoCard>
          ))}
          <InfoCard icon="start" title="Suitable starting points">
            <BulletList items={content.startingPoints} />
            {content.startingNote ? <p className="mt-md">{content.startingNote}</p> : null}
          </InfoCard>
        </div>
      </Section>

      <Section>
        <InfoCard icon="rule" title="Boundary note">
          <p>{content.boundary}</p>
        </InfoCard>
      </Section>

      <CtaSection title={content.finalTitle} body="" />
    </>
  );
}

function DetailedService({ service }) {
  return (
    <motion.article
      id={serviceAnchor(service.title)}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm"
    >
      <div className="grid gap-lg lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
            <span className="material-symbols-outlined" aria-hidden="true">
              {service.icon}
            </span>
          </div>
          <h2 className="mb-sm font-headline-md text-headline-md text-primary">{service.title}</h2>
          <p className="mb-md font-headline-sm text-headline-sm text-primary">{service.lead}</p>
          <p className="font-body-md text-body-md text-on-surface-variant">{service.intro}</p>
          {service.note ? (
            <p className="mt-md rounded-lg border border-secondary/20 bg-secondary-container/30 p-md font-body-sm text-body-sm text-on-surface-variant">
              {service.note}
            </p>
          ) : null}
          <div className="mt-lg">
            <ButtonLink href={service.cta.href} variant="quiet" icon="chevron_right">
              {service.cta.label}
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-md md:grid-cols-2">
          {service.sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-outline-variant bg-surface-container-lowest p-md">
              <h3 className="mb-md font-headline-sm text-headline-sm text-primary">{section.title}</h3>
              <BulletList items={section.items} tone={section.tone} />
            </div>
          ))}
          <div className="rounded-lg border border-secondary/20 bg-secondary-container/30 p-md md:col-span-2">
            <h3 className="mb-sm font-headline-sm text-headline-sm text-primary">Outcome</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{service.outcome}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        title="Pricing"
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
        compact
      >
        <p>Indicative starting prices for practical, bounded workflow improvement projects.</p>
        <p>
          Prices below exclude GST. Final pricing depends on scope, workflow clarity, data access, integrations, user
          roles, testing, documentation, handover and privacy or governance requirements. Deliverables, assumptions and
          timing are confirmed in writing before paid work begins.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Indicative starting prices" className="mb-xl">
          <p>These figures are starting points, not fixed quotes. A final quote is based on an agreed scope.</p>
        </SectionIntro>
        <ResponsiveRows
          columns={[
            { label: 'Service', width: '1fr' },
            { label: 'Starting from', width: '0.75fr', align: 'right' },
            { label: 'Best for', width: '1.35fr' }
          ]}
          rows={pricingRows}
        />
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What affects price?">
            <p>Scope increases when more people, systems, data sources, controls or review cycles need to be considered.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={priceFactors} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Choosing a practical first project" className="mb-xl">
          <p>A useful first project is narrow enough to implement and important enough to reduce recurring friction.</p>
        </SectionIntro>
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {typicalProjects.map(([title, copy]) => (
            <InfoCard key={title} title={title}>
              <p>{copy}</p>
            </InfoCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What is not included">
            <p>The starting prices do not include the following services or outcomes.</p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={pricingExclusions} columns tone="boundary" />
          </div>
        </div>
      </Section>

      <CtaSection
        title="Need help defining a realistic first scope?"
        body="Book a free fit call and share the workflow, people involved, current tools and desired outcome. Please keep the initial description general and non-sensitive."
        showPricing={false}
      />
    </>
  );
}

function SafeAiPage() {
  return (
    <>
      <PageHero
        title="Safe AI Setup for responsible day-to-day use."
        actions={<ButtonLink href={ctas.ai.href}>{ctas.ai.label}</ButtonLink>}
      >
        <p>
          Commercially available AI tools can support internal admin, drafting and workflow guidance. They can also create
          privacy, quality, security and accountability risks when staff use them without approved boundaries.
        </p>
        <p>
          Heutrix Labs helps organisations turn general AI concerns into clear use cases, information rules, human review
          responsibilities and practical staff guidance.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="What Safe AI Setup helps with">
            <p>
              The goal is a usable internal position: what staff may do, what they must not do, what requires approval and
              who remains accountable for the final output.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={safeAiHelps} columns />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-lg lg:grid-cols-2">
          <InfoCard icon="check_circle" title="Suitable AI use cases">
            <p className="mb-md">Depending on the information, tool and review process, AI may assist with:</p>
            <BulletList items={suitableAiUses} />
            <p className="mt-md">
              Suitability must be assessed for the specific purpose, information, tool, user and review process.
            </p>
          </InfoCard>
          <InfoCard icon="block" title="Unsuitable AI use cases">
            <p className="mb-md">AI should not be used to remove qualified judgement or accountable human decisions.</p>
            <BulletList items={unsuitableAiUses} tone="boundary" />
          </InfoCard>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Example AI use positions" className="mb-xl">
          <p>These examples are starting positions only. Each organisation should approve its own tools and use cases.</p>
        </SectionIntro>
        <ResponsiveRows
          columns={[
            { label: 'AI use type', width: '1.2fr' },
            { label: 'Position', width: '0.8fr' }
          ]}
          rows={aiGuidanceRows}
          emphasisLast
        />
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Privacy and sensitive information">
            <p>
              Personal information entered into an AI product remains subject to the organisation's privacy and data
              handling responsibilities. Publicly available AI tools should not receive personal or sensitive information.
            </p>
            <p>
              Any proposed AI use involving personal information needs a documented, organisation-approved process
              covering necessity, tool suitability, access, storage, retention, permissions and accountable human review.
            </p>
          </SectionIntro>
          <InfoCard icon="rule" title="What is included">
            <BulletList items={safeAiIncluded} columns />
            <p className="mt-md">Safe AI Setup provides operational guidance and does not replace legal, privacy, clinical or professional advice.</p>
          </InfoCard>
        </div>
      </Section>

      <CtaSection title="Set clear AI rules before staff start relying on AI at work." body="" cta={ctas.ai} />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        title="About Heutrix Labs"
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
      >
        <p>
          Heutrix Labs is a practical workflow implementation partner for service providers that have outgrown informal
          admin, scattered spreadsheets and person-dependent handovers.
        </p>
        <p>
          We work primarily with Australian allied health practices, disability support providers and selected
          care-related service operators that want a bounded improvement their team can understand and maintain.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Built for practical operators, not technology hype">
          <p>
            Many organisations do not need another large platform. They need clearer ownership, consistent status
            definitions, fewer duplicated steps, better handovers and reliable visibility over important work.
          </p>
          <p>
            We map how the work actually happens, identify the smallest useful improvement, build within agreed
            constraints and document what the team needs to operate after handover.
          </p>
        </SectionIntro>
      </Section>

      <Section>
        <div className="grid gap-lg lg:grid-cols-3">
          <InfoCard icon="task_alt" title="What we believe">
            <BulletList items={beliefs} />
          </InfoCard>
          <InfoCard icon="groups" title="Who we work best with">
            <BulletList items={bestFit} />
          </InfoCard>
          <InfoCard icon="rule" title="What we do not provide">
            <BulletList items={notFor} tone="boundary" />
          </InfoCard>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <div className="rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
          <div className="max-w-4xl">
            <p className="mb-sm font-label-md text-label-md uppercase text-secondary">Relationship boundary</p>
            <h2 className="mb-md font-headline-md text-headline-md text-primary">
              Relationship with Heutrix Assurance
            </h2>
            <p className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs and Heutrix Assurance are commercially connected and operate as separate service lines.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Work commissioned from Heutrix Labs is operational workflow support. It does not provide NDIS registration
              readiness, mock audits, audit certification, legal advice, clinical advice or regulatory approval.
            </p>
          </div>
        </div>
      </Section>

      <CtaSection title="Want to make one workflow clearer?" body="" />
    </>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHero title="Frequently asked questions" compact>
        <p>
          Practical answers about scope, timing, existing tools, pricing, handover, privacy, Safe AI and the limits of
          Heutrix Labs services.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl space-y-md">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={faq.question} className="rounded-xl border border-outline-variant bg-white shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-md p-lg text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-headline-sm text-headline-sm text-primary">{faq.question}</span>
                  <span className="material-symbols-outlined text-primary" aria-hidden="true">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen ? (
                  <div className="border-t border-outline-variant px-lg pb-lg pt-md">
                    <p className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</p>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Section>

      <CtaSection
        title="Have a workflow question not covered here?"
        body="Use the contact form with a general description of the workflow, who uses it and the outcome you want to improve. Do not include personal or sensitive information."
      />
    </>
  );
}

function ContactPage({ search }) {
  return (
    <>
      <PageHero title="Contact Heutrix Labs" compact>
        <p>
          Share a general description of the workflow, tracking, dashboard or Safe AI issue you want to improve. Helpful
          context includes who uses the process, where work gets stuck and what a better outcome would look like.
        </p>
        <p>
          Please do not include patient, client, clinical, Medicare, NDIS, diagnostic or other sensitive
          information in this form.
        </p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-lg">
            <InfoCard icon="privacy_tip" title="Privacy note before submitting">
              <p>
                Please do not include patient, client, clinical, Medicare, NDIS, diagnostic or other sensitive
                information in this form.
              </p>
            </InfoCard>
            <InfoCard icon="checklist" title="Helpful details to include">
              <BulletList
                items={[
                  'The workflow or admin task causing the most friction',
                  'The roles or teams involved',
                  'The tools currently used',
                  'What is difficult to track, hand over or report',
                  'The practical outcome you want to improve'
                ]}
              />
            </InfoCard>
            <InfoCard icon="mail" title="Email">
              <p>hello@heutrixlabs.com</p>
            </InfoCard>
          </div>
          <ContactForm search={search} />
        </div>
      </Section>
    </>
  );
}

function ContactForm({ search, submitLabel = 'Send enquiry' }) {
  const [submitted, setSubmitted] = useState(false);
  const defaultHelp = useMemo(() => {
    const params = new URLSearchParams(search);
    const service = params.get('service');
    if (service === 'heutrix-diagnostics') return 'Heutrix Diagnostics';
    if (service === 'heutrix-workflow-transformation') return 'Heutrix Workflow Transformation';
    if (service === 'heutrix-ai-guardrails') return 'Heutrix AI Guardrails';
    if (service === 'workflow-diagnostic') return 'Workflow Diagnostic';
    if (service === 'workflow-automation-sprint') return 'Workflow Automation Sprint';
    if (service === 'operations-dashboard-build') return 'Operations Dashboard Build';
    if (service === 'safe-ai-setup') return 'Safe AI Setup';
    if (service === 'tailored-internal-workflow-system') return 'Tailored Internal Workflow System';
    if (service === 'regulated-provider-workflow-tools') return 'Regulated Provider Workflow Tools';
    return 'Not sure yet';
  }, [search]);
  const defaultNext = useMemo(() => {
    const next = new URLSearchParams(search).get('next');
    if (next === 'workflow-demonstration') return 'View the workflow demonstration';
    return 'Book a 20-minute workflow fit call';
  }, [search]);

  if (submitted) {
    return (
      <div className="rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
        <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
          <span className="material-symbols-outlined" aria-hidden="true">
            mark_email_read
          </span>
        </div>
        <h2 className="mb-md font-headline-md text-headline-md text-primary">Thank you for contacting Heutrix Labs.</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          We have received your enquiry and will review whether it appears to be within scope. Please do not send
          patient, participant, client, clinical, Medicare, NDIS, diagnostic or other sensitive information unless a
          secure process has been agreed.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-outline-variant bg-white p-lg shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-md md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Practice or organisation name" name="organisation" required />
        <Field label="Role" name="role" required />
      </div>

      <div className="mt-md grid gap-md md:grid-cols-2">
        <SelectField
          label="What would you like help with?"
          name="help"
          defaultValue={defaultHelp}
          options={[
            'Heutrix Diagnostics',
            'Heutrix Workflow Transformation',
            'Heutrix AI Guardrails',
            'Not sure yet'
          ]}
        />
        <SelectField
          label="Preferred next step"
          name="nextStep"
          defaultValue={defaultNext}
          options={[
            'Book a 20-minute workflow fit call',
            'View the workflow demonstration',
            'Explore Heutrix Diagnostics',
            'Transform a workflow',
            'Put AI guardrails in place'
          ]}
        />
      </div>

      <div className="mt-md">
        <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="min-h-32 w-full resize-y rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          placeholder="Briefly describe the workflow, admin issue or operational problem. Please do not include patient, participant, client, clinical, Medicare, NDIS, diagnostic or sensitive information."
        />
      </div>

      <button
        type="submit"
        className="mt-lg inline-flex w-full items-center justify-center gap-sm rounded-xl bg-primary px-lg py-md font-headline-sm text-[18px] leading-6 text-on-primary shadow-md transition-opacity hover:opacity-95"
      >
        {submitLabel}
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
          send
        </span>
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
      />
    </div>
  );
}

function SelectField({ label, name, options, defaultValue }) {
  return (
    <div>
      <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy and data handling" compact>
        <p>
          Heutrix Labs works with care-related service providers where privacy, confidentiality and careful information
          handling are part of everyday operations.
        </p>
        <p>
          Our project approach starts with data minimisation: use the least information needed, prefer de-identified or
          sample data where practical, define access and storage boundaries, and agree review and retention steps.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Information we ask you not to send through public forms">
            <p>
              Do not send the following through website forms, initial email enquiries or other unsecured channels. A
              general description of the workflow is enough to begin a conversation.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={privacySensitiveItems} columns tone="boundary" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="How we approach workflow projects">
            <p>
              Before using live information, we clarify the purpose, minimum data required, approved tools, user access,
              review responsibilities and what happens to project data after handover.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={privacyProjectChecks} columns />
          </div>
        </div>
      </Section>

      <Section className="bg-surface-container-low">
        <div className="grid gap-lg lg:grid-cols-2">
          <InfoCard icon="smart_toy" title="AI and sensitive information">
            <p>
              Do not enter personal or sensitive information into publicly available AI tools. Any proposed AI use
              involving personal information needs organisation-level due diligence and an approved process.
            </p>
            <p className="mt-md">
              The process should address purpose, necessity, tool suitability, access, storage, retention, permissions
              and accountable human review.
            </p>
          </InfoCard>
          <InfoCard icon="fact_check" title="Client responsibility">
            <p>
              Each client remains responsible for determining its privacy obligations and approving collection, use,
              disclosure, access, storage, retention and tool-use decisions within its organisation.
            </p>
          </InfoCard>
        </div>
      </Section>
    </>
  );
}

function TermsPage() {
  return (
    <>
      <PageHero title="Terms of use" compact>
        <p>These terms apply to use of the Heutrix Labs website and its general service information.</p>
        <p>
          Website content is general in nature. It is not a project scope, service agreement or advice tailored to your
          organisation, and it should not be treated as legal, clinical, privacy, employment, regulatory or audit advice.
        </p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="grid gap-lg md:grid-cols-2">
          <InfoCard icon="rule" title="Service boundary">
            <p className="mb-md">Heutrix Labs provides workflow, automation, dashboard and safe AI support.</p>
            <BulletList
              tone="boundary"
              items={[
                'Legal advice',
                'Clinical advice',
                'Regulatory approval',
                'Official audit certification',
                'NDIS registration readiness',
                'Mock audits',
                'Promised compliance outcomes'
              ]}
            />
          </InfoCard>
          <InfoCard icon="article" title="Website information">
            <p>
              We aim to keep website information useful and current, but content may change and may not cover every
              situation. Seek appropriately qualified advice before making legal, clinical, privacy, employment,
              regulatory or compliance decisions.
            </p>
          </InfoCard>
          <InfoCard icon="person_check" title="Client responsibility">
            <p>
              Clients remain responsible for reviewing, approving and maintaining their workflows, systems, policies,
              procedures, privacy controls, professional obligations and regulatory requirements.
            </p>
          </InfoCard>
          <InfoCard icon="contract" title="Project scopes and terms">
            <p>
              A service engagement begins only when both parties agree to a written scope or other engagement terms.
              Those documents define the deliverables, assumptions, responsibilities, timing, fees and project-specific
              terms and take precedence over general website content.
            </p>
          </InfoCard>
        </div>
      </Section>
    </>
  );
}

function DisclaimerPage() {
  return (
    <>
      <PageHero title="Website disclaimer" compact>
        <p>
          This website describes practical workflow, automation, dashboard and Safe AI support for allied health
          practices, disability support providers and selected care-related service providers.
        </p>
      </PageHero>
      <Section className="bg-surface-container-low">
        <div className="mx-auto max-w-4xl rounded-xl border border-outline-variant bg-white p-xl shadow-sm">
          <h2 className="mb-md font-headline-md text-headline-md text-primary">Service boundaries</h2>
          <p className="mb-md font-body-lg text-body-lg text-on-surface-variant">
            Heutrix Labs does not provide audit certification, legal advice, clinical advice, privacy advice, regulatory
            approval, NDIS registration readiness or mock audits.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Operational tools may support a client's processes but do not verify compliance or remove the client's
            responsibility to obtain suitable advice and to review, approve, apply and maintain its own processes.
          </p>
          <div className="mt-lg grid gap-md md:grid-cols-2">
            <InfoCard icon="smart_toy" title="AI disclaimer">
              <p>
                Safe AI Setup focuses on internal operating rules, approved use cases, information boundaries and human
                review for appropriate admin and workflow-support activities.
              </p>
              <p className="mt-md">
                AI outputs can be incomplete, inaccurate or unsuitable for context. A qualified and accountable person
                must review any output before it is used, and AI must not replace clinical judgement or professional,
                legal, safety or regulatory responsibility.
              </p>
            </InfoCard>
            <InfoCard icon="lock" title="Privacy disclaimer">
              <p>
                Personal or sensitive information should not be entered into publicly available AI tools or shared
                through public forms and unsecured channels.
              </p>
              <p className="mt-md">
                Clients remain responsible for determining their privacy obligations and approving collection, use,
                disclosure, access, storage, retention and data-handling decisions.
              </p>
            </InfoCard>
          </div>
        </div>
      </Section>
    </>
  );
}

function CtaSection({ title, body, cta = ctas.fitCall, showPricing = true }) {
  return (
    <Section className="bg-primary text-on-primary">
      <motion.div className="grid gap-lg lg:grid-cols-[1fr_auto] lg:items-center" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-3xl">
          <motion.h2 variants={fadeUp} className="mb-md font-display-lg text-display-lg-mobile text-white md:text-display-lg">{title}</motion.h2>
          {body ? <motion.p variants={fadeUp} className="font-body-lg text-body-lg text-inverse-on-surface">{body}</motion.p> : null}
        </div>
        <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row lg:flex-col">
          <ButtonLink href={cta.href} variant="mint">
            {cta.label}
          </ButtonLink>
          {showPricing ? (
            <ButtonLink href={ctas.pricing.href} variant="secondary" icon={null}>
              {ctas.pricing.label}
            </ButtonLink>
          ) : null}
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default App;
