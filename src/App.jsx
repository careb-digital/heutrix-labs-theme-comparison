import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Checklist from './components/Checklist';
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
  privacyProjectChecks,
  privacySensitiveItems,
  resources,
  routes,
  aiGuardrailsHelps,
  aiGuardrailsIncluded,
  services,
  suitableAiUses,
  unsuitableAiUses,
  whoWeHelp
} from './siteContent';

const routeMap = new Map(routes.map((route) => [route.path, route]));
const knownPaths = new Set(routes.map((route) => route.path));
const legacyRedirects = new Map([
  ['/pricing', '/services#how-engagements-are-agreed'],
  ['/safe-ai', '/ai-guardrails']
]);
const notFoundMeta = {
  seoTitle: 'Page Not Found | Heutrix Labs',
  metaDescription: 'The requested Heutrix Labs page could not be found.'
};
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
  const originalPath = normalizePath(window.location.pathname);
  const redirectTarget = legacyRedirects.get(originalPath);
  if (redirectTarget) {
    window.history.replaceState({}, '', redirectTarget);
  }

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
  return routeMap.get(path) || notFoundMeta;
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
    case '/allied-health':
      return <AudiencePage content={alliedHealthContent} featuredResource={resources[0]} />;
    case '/disability-providers':
      return <AudiencePage content={disabilityContent} featuredResource={resources[1]} />;
    case '/ai-guardrails':
      return <AiGuardrailsPage />;
    case '/about':
      return <AboutPage />;
    case '/faq':
      return <FaqPage />;
    case '/resources':
      return <ResourcesPage />;
    case '/contact':
      return <ContactPage search={search} />;
    case '/privacy-and-data-handling':
      return <PrivacyPage />;
    case '/terms-of-use':
      return <TermsPage />;
    case '/website-disclaimer':
      return <DisclaimerPage />;
    default:
      return path === '/' ? <HomePage /> : <NotFoundPage />;
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
        Heutrix Diagnostics, Workflow Transformation and AI Guardrails support internal operations. Legal, clinical,
        audit, registration and regulatory responsibilities remain with the client.
      </p>
    </aside>
  );
}

function BulletList({ items, columns = false, tone = 'default' }) {
  const icon = tone === 'boundary' ? 'block' : 'check';
  const iconColor = tone === 'boundary' ? 'text-error' : tone === 'inverse' ? 'text-secondary-fixed' : 'text-secondary';
  const textColor = tone === 'inverse' ? 'text-inverse-on-surface' : 'text-on-surface-variant';

  return (
    <ul className={`grid gap-sm ${columns ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <li key={item} className={`flex gap-sm font-body-md text-body-md ${textColor}`}>
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

function DownloadLink({ href, resourceId, format, children, variant = 'primary' }) {
  const styles =
    variant === 'primary'
      ? 'border-primary bg-primary text-on-primary hover:opacity-95'
      : 'border-primary bg-white text-primary hover:bg-primary hover:text-on-primary';

  return (
    <a
      className={`inline-flex items-center justify-center gap-sm rounded-xl border px-md py-sm font-label-md text-label-md transition-colors ${styles}`}
      href={href}
      download
      data-resource-id={resourceId}
      data-resource-format={format}
    >
      <span>{children}</span>
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {format === 'pdf' ? 'picture_as_pdf' : 'table_view'}
      </span>
    </a>
  );
}

function ResourceCard({ resource }) {
  return (
    <motion.article
      id={resource.id}
      variants={fadeUp}
      className="flex scroll-mt-[112px] flex-col rounded-xl border border-outline-variant bg-white p-lg shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="mb-md flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
        <span className="material-symbols-outlined" aria-hidden="true">{resource.icon}</span>
      </div>
      <p className="mb-sm font-label-sm text-label-sm uppercase text-secondary">{resource.audience}</p>
      <h2 className="mb-md font-headline-md text-headline-md text-primary">{resource.title}</h2>
      <p className="mb-md font-body-md text-body-md text-on-surface-variant">{resource.summary}</p>
      <div className="mb-lg rounded-lg border-l-4 border-secondary bg-surface-container-low p-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant"><strong>Useful result:</strong> {resource.outcome}</p>
      </div>
      <div className="mb-lg flex flex-col gap-sm sm:flex-row sm:flex-wrap">
        <DownloadLink href={resource.guideHref} resourceId={resource.id} format="pdf">
          PDF guide
        </DownloadLink>
        <DownloadLink href={resource.workbookHref} resourceId={resource.id} format="xlsx" variant="secondary">
          Workbook
        </DownloadLink>
      </div>
      <p className="mt-auto border-t border-outline-variant pt-md font-body-sm text-body-sm text-on-surface-variant">
        {resource.bridge}
      </p>
    </motion.article>
  );
}

function FeaturedResource({ resource, eyebrow = 'Free, ungated starter resource' }) {
  return (
    <Section className="bg-surface-container-low">
      <div className="grid gap-xl lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <SectionIntro eyebrow={eyebrow} title="Work through the problem before you request a call.">
          <p>
            Use general, synthetic or appropriately de-identified information only. A resource result is not tailored
            advice, an organisational approval, a client outcome or permission for Heutrix to contact you.
          </p>
          <p>
            The complete guide and workbook are available without an email address.
          </p>
        </SectionIntro>
        <ResourceCard resource={resource} />
      </div>
    </Section>
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
              Workflow improvement for Australian disability support providers
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-md break-words font-display-lg text-display-lg-mobile text-primary md:text-display-lg">
              Fix the operational workflow your team keeps chasing.
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Heutrix Labs helps disability support providers—and selected allied health practices—turn one
              high-friction intake, referral, reporting, evidence or document workflow into a clearer, tested way of working.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
              Start with Heutrix Diagnostics when the right problem is unclear, Heutrix Workflow Transformation when
              one workflow is ready to improve, or Heutrix AI Guardrails when workplace AI needs practical boundaries.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col gap-md sm:flex-row sm:flex-wrap">
              <ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>
              <ButtonLink href={ctas.services.href} variant="secondary" icon={null}>
                {ctas.services.label}
              </ButtonLink>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-md max-w-2xl font-body-sm text-body-sm text-on-surface-variant">
              Bring a general, non-sensitive description to a 20-minute, no-obligation workflow fit call. Heutrix
              responds within two business days.
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
          The aim is one tested operating improvement with clear ownership, visible status and next action, practical
          guidance and a maintainable handover.
        </p>
      </Section>

      <Checklist />

      <Section id="home-services" className="bg-surface">
        <SectionIntro title="Practical ways we can help." className="mx-auto mb-xl text-center">
          <p>
            Three focused products help disability support providers—and selected allied health practices—decide what
            to improve, transform one defined workflow or put responsible AI boundaries in place.
          </p>
        </SectionIntro>
        <motion.div className="grid gap-lg md:grid-cols-2 xl:grid-cols-3" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }}>
          {homeServices.map((service) => (
            <ServiceSummaryCard key={service.title} service={service} />
          ))}
        </motion.div>
      </Section>

      <Section className="bg-primary text-on-primary">
        <div className="grid gap-xl lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro title="Heutrix Workflow Transformation" inverse>
            <p className="font-label-md uppercase text-secondary-fixed">Primary implementation product</p>
            <p>
              In a typical 2–4 week engagement, once scope, access and decision-makers are ready, Heutrix maps,
              redesigns, configures or builds, tests and hands over one agreed non-clinical workflow.
            </p>
            <p>
              The implementation may include a clearer process, form, checklist, tracker, register, management view,
              reminder path, automation or lightweight internal tool. These are delivery mechanisms within Workflow
              Transformation, not separate products.
            </p>
            <ButtonLink href={ctas.workflow.href} variant="mint">
              {ctas.workflow.label}
            </ButtonLink>
          </SectionIntro>
          <div className="grid gap-md md:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/10 p-lg">
              <h3 className="mb-md font-headline-sm text-headline-sm text-white">What the engagement can include</h3>
              <BulletList
                tone="inverse"
                items={[
                  'Baseline and current-state workflow map',
                  'Approved future-state design',
                  'Written acceptance criteria and test plan',
                  'Configuration or build in approved systems',
                  'Synthetic or de-identified testing first where practical',
                  'User acceptance and agreed refinements',
                  'Staff guidance, administrator documentation and training',
                  'Client-controlled access where agreed, limitations and handover'
                ]}
              />
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-lg">
              <h3 className="mb-md font-headline-sm text-headline-sm text-white">What Heutrix needs from the client</h3>
              <BulletList
                tone="inverse"
                items={[
                  'One accountable workflow owner and one decision-maker',
                  'Relevant staff for a 60–90-minute workshop',
                  'Timely, lawful access to approved systems and materials',
                  'Two focused review checkpoints',
                  'User testing, training and final acceptance',
                  'Internal approvals where privacy, security, legal, clinical, procurement or vendors require them'
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <DiagnosticMethodSection />

      <Section className="bg-surface-container-low">
        <div className="grid gap-xl lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionIntro title="What Heutrix Labs does">
            <p>
              Heutrix helps improve the non-clinical workflows around service delivery. Forms, trackers, registers,
              management views and automation may sit within Workflow Transformation; they are not separate products.
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
              Disability support providers and allied health practices do not need technology for its own sake. They
              need one important workflow to support the people already doing the work.
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
            <SectionIntro title="Illustrative workflow examples" className="mb-xl">
              <p>Hypothetical examples only—not client results or promised outcomes.</p>
            </SectionIntro>
        <div className="grid gap-lg md:grid-cols-2">
          {beforeAfterExamples.map((example) => (
            <InfoCard key={example.title} icon="sync_alt" title={example.title}>
              <p className="mb-sm">
                <strong className="text-primary">Current-state pattern:</strong> {example.before}
              </p>
              <p>
                <strong className="text-primary">Possible future-state pattern:</strong> {example.after}
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
            Bring one workflow that should not be this hard.
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
            In a 20-minute, no-obligation workflow fit call, we will understand the problem, assess whether Heutrix is
            the right fit and agree the smallest useful next step. This is not unpaid workflow design.
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
          <ContactForm search="" submitLabel="Request my 20-minute call" />
        </motion.div>
      </div>
    </Section>
  );
}

function DiagnosticMethodSection() {
  const methodSteps = [
    ['1', 'Map', 'Agree the workflow boundary and document how the work actually runs.'],
    ['2', 'Design', 'Define ownership, status, next action, controls and acceptance tests.'],
    ['3', 'Build', 'Configure the smallest useful improvement in approved systems.'],
    ['4', 'Prove', 'Test with synthetic or de-identified information first where practical, then run user acceptance.'],
    ['5', 'Hand over', 'Train the team and document access, administration, maintenance and known limitations.']
  ];

  const providerTypes = ['DS', 'OP', 'AH'];

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
            <span className="font-label-md text-label-md text-on-surface-variant">Disability providers first; allied health where the workflow fits</span>
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
        title="Diagnose the right problem, transform one bounded workflow, or put practical AI guardrails in place."
        actions={<ButtonLink href={ctas.fitCall.href}>{ctas.fitCall.label}</ButtonLink>}
      >
        <p>
          Heutrix helps Australian disability support providers—and selected allied health practices—improve one
          recurring non-clinical workflow at a time.
        </p>
        <p>
          Heutrix Diagnostics identifies and prioritises the right problem. Heutrix Workflow Transformation redesigns
          and implements one bounded workflow. Heutrix AI Guardrails gives staff practical boundaries for responsible AI use.
        </p>
        <p>
          Choose the product that matches the decision in front of you, or bring the problem to a 20-minute,
          no-obligation workflow fit call. You do not need to select a product first.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Three products" className="mb-xl" />
        <div className="space-y-xl">
          {services.map((service) => (
            <DetailedService key={service.title} service={service} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Free, ungated starter resources" title="Work through the problem first." className="mb-xl">
          <p>
            Use the resource that matches the decision in front of you. Each complete guide and workbook is available
            without an email address and uses general, synthetic or appropriately de-identified information only.
          </p>
        </SectionIntro>
        <div className="grid gap-lg lg:grid-cols-3">
          {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </div>
      </Section>

      <Section id="how-engagements-are-agreed" className="scroll-mt-[112px] bg-surface-container-low">
        <SectionIntro title="How engagements are agreed">
          <p>
            Every paid engagement is agreed in writing before work begins. The written scope identifies deliverables,
            client responsibilities, assumptions, dependencies, exclusions, timing, acceptance criteria, third-party
            costs, change triggers and the applicable fee.
          </p>
        </SectionIntro>
      </Section>

      <CtaSection
        title="Choose the smallest useful next step."
        body="Share a general, non-sensitive description of one workflow, who uses it and what is difficult to track, hand over or report. We will assess the smallest useful next step."
      />
    </>
  );
}

function serviceAnchor(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function AudiencePage({ content, featuredResource }) {
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
        <SectionIntro title={content.examplesTitle || content.exampleTitle} className="mb-xl">
          <p>Illustrative current and possible future states only—not client results or promised outcomes.</p>
        </SectionIntro>
        <div className="grid gap-lg lg:grid-cols-3">
          {(content.examples || [
            { title: content.exampleTitle, before: content.exampleBefore, after: content.exampleAfter }
          ]).map((example) => (
            <InfoCard key={example.title} icon="sync_alt" title={example.title}>
              <p className="mb-sm">
                <strong className="text-primary">Current-state pattern:</strong> {example.before}
              </p>
              <p>
                <strong className="text-primary">Possible future-state pattern:</strong> {example.after}
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

      <FeaturedResource resource={featuredResource} />

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

function AiGuardrailsPage() {
  return (
    <>
      <PageHero
        title="Heutrix AI Guardrails for responsible day-to-day use."
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
          <SectionIntro title="What Heutrix AI Guardrails helps with">
            <p>
              The goal is a usable internal position: what staff may do, what they must not do, what requires approval and
              who remains accountable for the final output.
            </p>
          </SectionIntro>
          <div className="rounded-xl border border-outline-variant bg-white p-lg shadow-sm">
            <BulletList items={aiGuardrailsHelps} columns />
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
            <BulletList items={aiGuardrailsIncluded} columns />
            <p className="mt-md">Heutrix AI Guardrails provides operational guidance and does not replace legal, privacy, clinical or professional advice.</p>
          </InfoCard>
        </div>
      </Section>

      <FeaturedResource resource={resources[2]} />

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
          Heutrix is a practical workflow improvement and implementation business. We help Australian disability
          support providers—and selected allied health practices—improve one bounded non-clinical workflow at a time.
        </p>
        <p>
          The work starts with how a recurring process actually runs: what triggers it, who owns each step, where
          status or handover becomes unclear, what information is involved and what a useful result would look like.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Workflow first. Technology second.">
          <p>
            Many organisations do not need another large platform. They need clearer ownership, consistent status
            definitions, fewer duplicated steps, better handovers and reliable visibility over important work.
          </p>
          <p>
            We map how the work actually happens, define the result and acceptance criteria, use the smallest useful
            intervention, test the agreed functions and document what the team needs to operate after handover.
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
            <p className="mb-sm font-label-md text-label-md uppercase text-secondary">Verification boundary</p>
            <h2 className="mb-md font-headline-md text-headline-md text-primary">
              Trust and company information is still being verified.
            </h2>
            <p className="mb-md font-body-lg text-body-lg text-on-surface-variant">
              Founder biographies, team roles, legal entity details, insurance statements, service-area wording and
              the relationship between “Heutrix” and “Heutrix Labs” require owner verification and approval.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Until that work is complete, this page makes no unsupported founder, credential, client, insurance or
              company-identity claims.
            </p>
          </div>
        </div>
      </Section>

      <FeaturedResource resource={resources[0]} eyebrow="Self-guided starting point" />

      <CtaSection title="Want to make one workflow clearer?" body="" />
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Free, ungated starter resources"
        title="Work through the problem before you buy anything."
        actions={(
          <DownloadLink
            href={resources[0].guideHref}
            resourceId={resources[0].id}
            format="pdf"
          >
            Download the workflow scorecard
          </DownloadLink>
        )}
      >
        <p>
          These practical resources help Australian disability support providers—and selected allied health practices—
          prioritise one workflow, make enquiry-to-service-start work visible or put first AI-use boundaries in place.
        </p>
        <p>
          You can download the complete guides and working files without submitting an email address. Each resource is
          useful on its own and explains when a template is no longer enough.
        </p>
      </PageHero>

      <Section className="bg-surface-container-low">
        <SectionIntro title="Choose the resource that matches the decision." className="mb-xl">
          <p>
            Start with the operational problem. Do not choose a technology or Heutrix product before the workflow,
            information boundary and accountable owner are clear enough.
          </p>
        </SectionIntro>
        <motion.div
          className="grid gap-lg lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
        </motion.div>
      </Section>

      <Section>
        <div className="grid gap-lg lg:grid-cols-3">
          <InfoCard icon="no_accounts" title="No email gate">
            <p>
              Downloads are provided directly. If you later request a fit call, that separate request follows the lead
              and privacy process described on the contact page.
            </p>
          </InfoCard>
          <InfoCard icon="privacy_tip" title="Use safe example information">
            <p>
              Use general, synthetic or appropriately de-identified examples. Do not enter participant, patient, worker,
              clinical, credential or other personal or sensitive information into these files or an unapproved system.
            </p>
          </InfoCard>
          <InfoCard icon="rule" title="General operational resources">
            <p>
              The guides and workbooks are starter templates, not legal, privacy, clinical, employment, audit,
              registration, regulatory or compliance advice or assurance.
            </p>
          </InfoCard>
        </div>
      </Section>

      <CtaSection
        title="Found one workflow worth discussing?"
        body="Bring a high-level, non-sensitive description to a 20-minute, no-obligation workflow fit call. The outcome may be Diagnostics, Workflow Transformation, AI Guardrails, more evidence gathering or no project."
        cta={{ label: 'Discuss what you found', href: '/contact?source=resources' }}
      />
    </>
  );
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <PageHero title="Frequently asked questions" compact>
        <p>
          Practical answers about Heutrix Diagnostics, Workflow Transformation, AI Guardrails, timing, resources, privacy and the
          limits of Heutrix Labs services.
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

      <FeaturedResource resource={resources[0]} eyebrow="Not ready for a call?" />

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
      <PageHero title="See where Heutrix can help" compact>
        <p>
          Bring one workflow that should not be this hard. In a 20-minute, no-obligation workflow fit call, we will
          understand one operational problem, assess whether Heutrix is the right fit and agree the smallest useful next step.
        </p>
        <p>
          You do not need a process map, technical brief, screenshots or proposed solution. A general,
          non-sensitive description is enough.
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
            <InfoCard icon="schedule" title="What happens next">
              <p>
                Heutrix responds within two business days with scheduling details, one concise high-level question or
                an honest no-fit response. The call itself is a fit assessment, not unpaid workflow design.
              </p>
            </InfoCard>
          </div>
          <ContactForm search={search} />
        </div>
      </Section>
    </>
  );
}

function ContactForm({ search, submitLabel = 'Request my 20-minute call' }) {
  const [submitError, setSubmitError] = useState(false);
  const sourceParams = new URLSearchParams(search);
  const sourceContext = sourceParams.get('service') || sourceParams.get('source') || '';
  const fromResource = Boolean(sourceParams.get('source'));

  return (
    <form
      className="rounded-xl border border-outline-variant bg-white p-lg shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitError(true);
      }}
    >
      {sourceContext ? <input type="hidden" name="sourceContext" value={sourceContext} /> : null}
      <div className="grid gap-md md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Organisation" name="organisation" required />
        <SelectField
          label="Sector"
          name="sector"
          defaultValue=""
          options={['', 'Disability support provider', 'Allied health practice', 'Other']}
        />
      </div>

      <div className="mt-md grid gap-md md:grid-cols-2">
        <SelectField
          label="Which best describes your role?"
          name="role"
          defaultValue=""
          options={[
            '',
            'Owner or chief executive',
            'Operations or general manager',
            'Workflow owner or team lead',
            'Practitioner or frontline staff',
            'Technology or data role',
            'Adviser or referral partner',
            'Other'
          ]}
        />
        <SelectField
          label="How many people or roles regularly touch this workflow?"
          name="workflowPeople"
          defaultValue=""
          options={['', '1', '2–3', '4–6', '7+', 'Not sure']}
        />
      </div>

      <div className="mt-md">
        <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor="message">
          Which one problem should we discuss?
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="min-h-32 w-full resize-y rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
          placeholder="Briefly describe what starts the work, which roles are involved, where it becomes difficult to track, hand over or report, and what a useful improvement would change. Do not include personal or sensitive information."
        />
      </div>

      {fromResource ? (
        <div className="mt-md">
          <label className="mb-xs block px-xs font-label-md text-label-md text-primary" htmlFor="resourceObservation">
            What did the resource help you notice? — optional
          </label>
          <textarea
            id="resourceObservation"
            name="resourceObservation"
            className="min-h-24 w-full resize-y rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            placeholder="Share a high-level conclusion only. Do not include scores, completed workbook content, records or sensitive information."
          />
        </div>
      ) : null}

      <div className="mt-md grid gap-md md:grid-cols-2">
        <Field label="Tools or systems involved at a high level — optional" name="tools" />
        <SelectField
          label="When would this need to improve?"
          name="timing"
          defaultValue=""
          options={['', 'Within 1–3 months', 'Within 3–6 months', 'Later than 6 months', 'Exploring or no date']}
        />
        <SelectField
          label="What is the decision context?"
          name="decisionContext"
          defaultValue=""
          options={[
            '',
            'I can approve a paid next step',
            'I will recommend it to a decision-maker',
            'A decision-maker is already involved',
            'We are exploring only',
            'Not sure'
          ]}
        />
      </div>

      <div className="mt-md space-y-md rounded-lg border border-outline-variant bg-surface-container-low p-md">
        <label className="flex items-start gap-sm font-body-sm text-body-sm text-on-surface-variant">
          <input className="mt-1 h-4 w-4" type="checkbox" name="noSensitiveInformation" required />
          <span>
            I confirm that I have not included patient, participant, client, clinical, Medicare, NDIS, credential,
            worker-sensitive or other personal or sensitive information.
          </span>
        </label>
        <label className="flex items-start gap-sm font-body-sm text-body-sm text-on-surface-variant">
          <input className="mt-1 h-4 w-4" type="checkbox" name="contactPermission" required />
          <span>I agree that Heutrix Labs may contact me about this request and its direct follow-up.</span>
        </label>
      </div>

      {submitError ? (
        <div className="mt-md rounded-lg border border-error/30 bg-error-container p-md" role="alert" aria-live="polite">
          <p className="font-body-sm text-body-sm text-on-error-container">
            This request was not sent because the online lead path is not yet connected. No receipt has been recorded.
            Please do not send sensitive information through another channel unless Heutrix confirms an appropriate process.
          </p>
        </div>
      ) : null}

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
        required
        className="w-full rounded-lg border border-outline-variant bg-white p-md font-body-md text-body-md outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
      >
        {options.map((option) => (
          <option key={option || 'placeholder'} value={option} disabled={option === ''}>
            {option || 'Select an option'}
          </option>
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
          Heutrix works with disability support providers and allied health practices where privacy, confidentiality
          and careful information handling are part of everyday operations.
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
        <div className="grid gap-lg lg:grid-cols-3">
          <InfoCard icon="contact_page" title="Information for the workflow fit call">
            <p>
              The initial request needs only a general description of the operational problem, roles involved, tools
              used at a high level and desired result. It is used to assess fit, arrange the call and provide direct follow-up.
            </p>
            <p className="mt-md">
              The live collection notice must identify the actual receiving entity, lead destination, access and
              retention arrangements before the form is published.
            </p>
          </InfoCard>
          <InfoCard icon="download" title="Resource downloads">
            <p>
              The complete public resources are available without an email address. A download is not contact
              permission. If you separately request a fit call from the resources page, the request may record that
              high-level source context as part of the approved lead record.
            </p>
            <p className="mt-md">
              Do not upload or send a completed workbook. Use general, synthetic or appropriately de-identified
              information in your working copy.
            </p>
          </InfoCard>
          <InfoCard icon="admin_panel_settings" title="Project controls">
            <p>
              Any project using real client information requires an approved process for purpose, access, storage,
              transfer, retention, deletion, incidents and access removal. These arrangements are confirmed before real
              client information is accepted.
            </p>
          </InfoCard>
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
            <p className="mb-md">Heutrix Labs provides Diagnostics, Workflow Transformation and AI Guardrails.</p>
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
          <InfoCard icon="schedule" title="Workflow fit call">
            <p>
              “See where Heutrix can help” is a 20-minute, no-obligation fit call. It is not a consulting workshop,
              technical design session or tailored professional advice, and it does not create an engagement.
            </p>
            <p className="mt-md">
              A request is not a confirmed booking, and a website submission is received only when the lead destination
              confirms successful delivery.
            </p>
          </InfoCard>
          <InfoCard icon="download" title="Downloads and templates">
            <p>
              Downloadable guides, scorecards, trackers and templates are general starter resources. They are not
              tailored advice, organisational approval, a project scope or a promise of a particular result.
            </p>
            <p className="mt-md">
              Use a separate working copy with general, synthetic or appropriately de-identified information. Do not
              enter personal, sensitive, clinical, credential or confidential information into an unapproved system.
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
          <InfoCard icon="gavel" title="Legal status">
            <p>
              This website terms copy remains subject to verification of the business particulars, legal review and
              owner approval. It must not be represented as an approved legal instrument until that review is recorded.
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
          This website describes Heutrix Diagnostics, Heutrix Workflow Transformation and Heutrix AI Guardrails for
          Australian disability support providers and selected allied health practices.
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
            <InfoCard icon="visibility" title="Illustrative examples">
              <p>
                Workflow views, before/after patterns, sample handovers and synthetic demonstrations are illustrative
                unless expressly identified as verified client evidence. They do not promise the same fields, system,
                timing or outcome.
              </p>
            </InfoCard>
            <InfoCard icon="download" title="Resources and templates">
              <p>
                Downloadable resources are general operational starting points. A score, status or screening result is
                not a client outcome, approved workflow, business case, service-readiness decision, approved AI use or
                assurance of compliance.
              </p>
            </InfoCard>
            <InfoCard icon="payments" title="Engagement terms and third-party systems">
              <p>
                Website descriptions are not quotes or project scopes. Paid work begins only after the deliverables,
                responsibilities, assumptions, dependencies, exclusions, timing, third-party costs, acceptance criteria,
                change triggers and applicable fee are agreed in writing. Naming a product or platform does not guarantee
                Heutrix capability, native integration, availability or third-party performance.
              </p>
            </InfoCard>
            <InfoCard icon="smart_toy" title="AI disclaimer">
              <p>
                Heutrix AI Guardrails focuses on internal operating rules, approved use cases, information boundaries
                and human review for appropriate admin and workflow-support activities.
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
            <InfoCard icon="gavel" title="Legal status">
              <p>
                This disclaimer remains subject to verification of the business particulars, legal review and owner
                approval. It must not be represented as an approved legal notice until that review is recorded.
              </p>
            </InfoCard>
          </div>
        </div>
      </Section>
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <PageHero
        eyebrow="Page not found"
        title="That page is not part of the current Heutrix site."
        actions={(
          <>
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/services" variant="secondary" icon={null}>View the three products</ButtonLink>
          </>
        )}
        compact
      >
        <p>Use the current navigation to explore Heutrix services, free resources or the workflow fit-call request.</p>
      </PageHero>
    </>
  );
}

function CtaSection({ title, body, cta = ctas.fitCall }) {
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
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default App;
