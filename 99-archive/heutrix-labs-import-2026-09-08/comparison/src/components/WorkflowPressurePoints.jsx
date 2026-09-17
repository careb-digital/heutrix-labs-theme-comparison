import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, useIsPresent, useReducedMotion} from 'framer-motion';
import {ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDot, Pause, Play} from 'lucide-react';
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


function CardContent({point, index, measuring = false}) {
  return <>
    <div className="pressure-card-label"><span>{String(index + 1).padStart(2, '0')} / {point.label}</span><CircleDot size={19} aria-hidden="true"/></div>
    <h3>{point.title}</h3>
    <div className="pressure-next-step"><span><Check size={16} aria-hidden="true"/> A clearer next step</span><p>{point.next}</p></div>
    {measuring ? <span className="pressure-action">{point.action}<ArrowUpRight size={17}/></span> : <a className="pressure-action" href={point.href}>{point.action}<ArrowUpRight size={17} aria-hidden="true"/></a>}
  </>;
}

function VisibleCard({index, reduceMotion}) {
  const present = useIsPresent();
  return <motion.article id="pressure-panel" className="pressure-card" aria-label={`${index + 1} of 6: ${pressurePoints[index].label}`} aria-hidden={!present} inert={!present}
    initial={{opacity: 0, y: reduceMotion ? 0 : 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: reduceMotion ? 0 : -8}}
    transition={{duration: reduceMotion ? 0 : .22}}>
    <CardContent point={pressurePoints[index]} index={index}/>
  </motion.article>;
}

export default function WorkflowPressurePoints() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const touchStart = useRef(null);
  const reduceMotion = useReducedMotion();
  const rotating = !paused && !hovered && !focused && inView && !reduceMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: .3});
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!rotating) return;
    const timer = setTimeout(() => setActive(index => (index + 1) % pressurePoints.length), 8000);
    return () => clearTimeout(timer);
  }, [active, rotating]);

  function select(index) {
    setPaused(true);
    setActive((index + pressurePoints.length) % pressurePoints.length);
  }

  return <section id="problem" ref={sectionRef} className="pressure-points" aria-labelledby="pressure-title">
    <div className="pressure-layout r-container">
      <div className="pressure-intro">
        <p className="pressure-eyebrow">The work between the systems</p>
        <h2 id="pressure-title">Does this <br/>sound familiar?</h2>
        <p className="pressure-lead">Even capable teams lose visibility when important work is spread across memory, inboxes, spreadsheets and manual reminders.</p>
        <a className="pressure-services" href="/services">Explore how Heutrix can help <ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
      <div className="pressure-carousel" role="region" aria-roledescription="carousel" aria-label="Workflow pressure points"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        <div className="pressure-stage" aria-live={rotating ? 'off' : 'polite'} aria-atomic="true"
          onTouchStart={event => { touchStart.current = {x: event.touches[0].clientX, y: event.touches[0].clientY}; }}
          onTouchEnd={event => {
            if (!touchStart.current) return;
            const dx = event.changedTouches[0].clientX - touchStart.current.x;
            const dy = event.changedTouches[0].clientY - touchStart.current.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1));
            touchStart.current = null;
          }}>
          {/* One shared grid cell reserves the tallest card's space at each width.
              These inert, invisible measurements prevent layout jumps. */}
          <div className="pressure-sizer" aria-hidden="true" inert>
            {pressurePoints.map((point, index) => <div className="pressure-measure-card" key={point.label}><CardContent point={point} index={index} measuring/></div>)}
          </div>
          <AnimatePresence mode="wait" initial={false}><VisibleCard key={active} index={active} reduceMotion={reduceMotion}/></AnimatePresence>
        </div>
        <div className="pressure-controls">
          <button type="button" className="pressure-arrow" aria-label="Previous pressure point" onClick={() => select(active - 1)}><ArrowLeft size={18} aria-hidden="true"/></button>
          <nav className="pressure-navigation" aria-label="Choose a pressure point">
            {pressurePoints.map((point, index) => <button key={point.label} type="button" aria-label={`${index + 1}. ${point.label}`} aria-current={active === index ? 'step' : undefined} aria-controls="pressure-panel" onClick={() => select(index)}><span/></button>)}
          </nav>
          <span className="pressure-count">{String(active + 1).padStart(2, '0')} / 06</span>
          <button type="button" className="pressure-arrow" aria-label="Next pressure point" onClick={() => select(active + 1)}><ArrowRight size={18} aria-hidden="true"/></button>
          {!reduceMotion && <button type="button" className="pressure-arrow pressure-play" aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} aria-hidden="true"/> : <Pause size={16} aria-hidden="true"/>}</button>}
        </div>
      </div>
    </div>
  </section>;
}
