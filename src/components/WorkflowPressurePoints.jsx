import {useEffect, useRef, useState} from 'react';
import {useReducedMotion} from 'framer-motion';
import {ArrowDown, ArrowUp, ArrowUpRight, Check, CircleDot} from 'lucide-react';
import './workflow-pressure-points.css';

const pressurePoints = [
  {
    label: 'Intake & follow-up',
    title: 'Intake, referral or enquiry follow-up handled differently by different people',
    next: 'Make the owner, next action and due date visible from the first enquiry to the service-start decision.',
    href: '/resources/enquiry-to-service-start-starter-kit',
    action: 'Try the intake visibility tool',
  },
  {
    label: 'Onboarding & handovers',
    title: 'Service agreements, staff onboarding or handovers managed through memory and repeated reminders',
    next: 'Define what “ready” means, who checks it and when the next person takes over.',
    href: '/case-studies/quickbooks-onboarding-and-access',
    action: 'Explore an onboarding example',
  },
  {
    label: 'Tracking & follow-through',
    title: 'Incident, complaint, risk or evidence tracking spread across spreadsheets',
    next: 'Give each follow-up an owner, a due date and a review step, with a clear path for exceptions.',
    href: '/case-studies/incident-actions-and-closure',
    action: 'Explore a follow-through example',
  },
  {
    label: 'Operational visibility',
    title: 'Managers lacking visibility over what is waiting, overdue or stuck',
    next: 'Start with one recurring bottleneck. Identify the missing information and the decision it needs to support.',
    href: '/resources/workflow-bottleneck-scorecard',
    action: 'Find your workflow bottleneck',
  },
  {
    label: 'Reporting preparation',
    title: 'Reporting preparation that takes too long because information is scattered',
    next: 'Agree the source inputs, review steps and exception checks before building another report.',
    href: '/case-studies/power-bi-invoice-reconciliation',
    action: 'Explore a reporting example',
  },
  {
    label: 'AI use & human review',
    title: 'AI tools being used informally without clear rules for privacy, review or suitable use',
    next: 'Check the proposed task, information boundaries and accountable human review before using AI in the workflow.',
    href: '/resources/ai-guardrails-staff-starter-pack',
    action: 'Try the AI Guardrails tool',
  },
];

export default function WorkflowPressurePoints() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollTargetRef = useRef(null);
  const selectionTimerRef = useRef(null);
  const refreshRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Measure the cards themselves, so selection still follows reading position
  // after resizing, font loading, or a change in copy length.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current?.getBoundingClientRect();
      if (!section || section.bottom < 100 || section.top > innerHeight) return;
      const readingLine = innerHeight / 2;
      const target = scrollTargetRef.current;
      if (target) {
        const rect = cardsRef.current[target.index]?.getBoundingClientRect();
        if (rect && Math.abs(rect.top + rect.height / 2 - readingLine) > 8 && performance.now() < target.until) return;
        scrollTargetRef.current = null;
      }
      let closest = 0;
      let distance = Infinity;
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + rect.height / 2 - readingLine);
        if (nextDistance < distance) { closest = index; distance = nextDistance; }
      });
      setActive(closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    refreshRef.current = schedule;
    const release = () => { scrollTargetRef.current = null; clearTimeout(selectionTimerRef.current); schedule(); };
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    window.addEventListener('wheel', release, {passive: true});
    window.addEventListener('touchstart', release, {passive: true});
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(selectionTimerRef.current);
      refreshRef.current = null;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
    };
  }, []);

  function select(index, moveFocus = false) {
    const next = Math.max(0, Math.min(pressurePoints.length - 1, index));
    setActive(next);
    scrollTargetRef.current = {index: next, until: performance.now() + 2000};
    clearTimeout(selectionTimerRef.current);
    selectionTimerRef.current = setTimeout(() => {
      scrollTargetRef.current = null;
      refreshRef.current?.();
    }, 2050);
    const card = cardsRef.current[next];
    if (moveFocus) card?.querySelector('button')?.focus({preventScroll: true});
    if (card) {
      const rect = card.getBoundingClientRect();
      window.scrollTo({top: window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2, behavior: reduceMotion ? 'instant' : 'smooth'});
    }
  }

  return (
    <section id="problem" ref={sectionRef} className="pressure-points" aria-labelledby="pressure-title">
      <div className="pressure-layout r-container">
        <div className="pressure-intro">
          <p className="pressure-eyebrow">The work between the systems</p>
          <h2 id="pressure-title">Does this<br/>sound familiar?</h2>
          <p className="pressure-lead">Even capable teams lose visibility when important work is spread across memory, inboxes, spreadsheets and manual reminders.</p>
          <p className="pressure-instruction">Scroll through the pressure points, or choose one to explore.</p>
          <nav className="pressure-navigation" aria-label="Explore workflow pressure points">
            {pressurePoints.map((point, index) => (
              <button key={point.label} type="button" aria-label={`${index + 1}. ${point.label}`} aria-current={active === index ? 'step' : undefined} aria-controls={`pressure-${index}`} onClick={() => select(index, true)}>
                {String(index + 1).padStart(2, '0')}
              </button>
            ))}
          </nav>
          <div className="pressure-progress" aria-hidden="true"><span style={{width: `${((active + 1) / pressurePoints.length) * 100}%`}}/></div>
          <div className="pressure-position">
            <span><strong>{String(active + 1).padStart(2, '0')}</strong> / 06</span>
            <span>{pressurePoints[active].label}</span>
          </div>
          <div className="pressure-arrows">
            <button type="button" aria-label="Previous pressure point" disabled={active === 0} onClick={() => select(active - 1, true)}><ArrowUp size={18} aria-hidden="true"/></button>
            <button type="button" aria-label="Next pressure point" disabled={active === pressurePoints.length - 1} onClick={() => select(active + 1, true)}><ArrowDown size={18} aria-hidden="true"/></button>
            <span>One workflow is a good place to start.</span>
          </div>
          <a className="pressure-skip" href="#pressure-next" onClick={() => { scrollTargetRef.current = null; }}>Skip to the next section <ArrowDown size={15} aria-hidden="true"/></a>
        </div>

        <ol className="pressure-list">
          {pressurePoints.map((point, index) => (
            <li key={point.label} id={`pressure-${index}`} ref={node => { cardsRef.current[index] = node; }} className={`pressure-card${active === index ? ' is-active' : ''}`}>
              <div className="pressure-card-label"><span>{String(index + 1).padStart(2, '0')} / {point.label}</span><CircleDot size={19} aria-hidden="true"/></div>
              <h3><button type="button" aria-pressed={active === index} onClick={() => select(index)}>{point.title}</button></h3>
              <div className="pressure-next-step"><span><Check size={16} aria-hidden="true"/> A clearer next step</span><p>{point.next}</p></div>
              <a href={point.href}>{point.action}<ArrowUpRight size={17} aria-hidden="true"/></a>
            </li>
          ))}
        </ol>
      </div>
      <div className="pressure-outro r-container" id="pressure-next" tabIndex="-1">
        <p>Start with the workflow. Agree a useful next step.</p>
        <a href="/services">Explore how Heutrix can help <ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
    </section>
  );
}
