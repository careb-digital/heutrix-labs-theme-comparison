import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Problem() {
  const issues = [
    "Intake, referral or enquiry follow-up handled differently by different people",
    "Service agreements, staff onboarding or handovers managed through memory and repeated manual reminders",
    "Incident, complaint, risk or evidence tracking spread across spreadsheets",
    "Managers lacking visibility over what is waiting, overdue or stuck",
    "Reporting preparation that takes too long because information is scattered",
    "AI tools being used informally without clear rules for privacy, review or suitable use"
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <section className="bg-primary text-on-primary relative z-20" id="problem">
      
      {/* Intro */}
      <div className="py-xxl px-lg max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="max-w-4xl mb-xl">
          <h2 className="font-headline-md text-headline-md text-white mb-md drop-shadow-lg">Does this sound familiar?</h2>
          <p className="font-body-lg text-body-lg text-on-primary-fixed-variant">
            Even capable teams lose visibility when important work is spread across memory, inboxes, spreadsheets and manual reminders.
          </p>
        </motion.div>
      </div>

      {/* Scrollytelling List Section */}
      <div ref={containerRef} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen flex flex-col justify-center px-lg max-w-container-max mx-auto">
          
          <div className="grid md:grid-cols-12 gap-xl items-center">
            <div className="md:col-span-5">
              <h3 className="font-headline-lg text-headline-lg text-secondary-fixed mb-md">You may be dealing with:</h3>
              <p className="text-on-primary-fixed-variant font-body-md max-w-sm">
                Scroll to see common pressure points that create invisible friction in daily operations.
              </p>
            </div>
            
            <div className="md:col-span-7 relative h-[60vh] flex flex-col justify-center">
              {issues.map((issue, index) => {
                const start = index / issues.length;
                const end = start + (1 / issues.length);
                
                // Opacity peaks when in its scroll segment
                const opacity = useTransform(
                  smoothProgress, 
                  [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], 
                  [0, 1, 1, 0]
                );
                
                // Y offset comes from below and goes up
                const y = useTransform(
                  smoothProgress, 
                  [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)], 
                  [50, 0, 0, -50]
                );
                
                // Scale pops slightly
                const scale = useTransform(
                  smoothProgress,
                  [Math.max(0, start - 0.1), start, end, Math.min(1, end + 0.1)],
                  [0.9, 1, 1, 0.95]
                );

                return (
                  <motion.div 
                    key={index} 
                    style={{ opacity, y, scale }}
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-xl border border-white/20 shadow-2xl w-full flex items-start gap-lg transform-gpu">
                      <div className="w-12 h-12 rounded-full bg-secondary-fixed/20 text-secondary-fixed flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[24px]">adjust</span>
                      </div>
                      <p className="font-headline-sm text-headline-sm text-white pt-1">{issue}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Outro */}
      <div className="py-xxl px-lg max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }} className="max-w-4xl">
          <p className="font-body-lg text-body-lg text-white font-medium border-l-4 border-secondary pl-lg">
            Heutrix Labs helps turn these pressure points into clearer workflows, practical tracking systems, safer AI practices and better visibility for day-to-day decisions.
          </p>
        </motion.div>
      </div>

    </section>
  );
}
