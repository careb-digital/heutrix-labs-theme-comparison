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
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const stickyOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 1, 0]);

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
      <div ref={containerRef} className="py-xl relative">
        <div className="px-lg max-w-container-max mx-auto">
          
          <div className="relative">
            <motion.div style={{ opacity: stickyOpacity }} className="sticky top-20 md:top-1/3 z-10 md:w-5/12 bg-primary/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none py-4 -mx-lg px-lg md:mx-0 md:px-0 md:py-0 border-b border-white/10 md:border-none">
              <h3 className="font-headline-lg text-headline-lg text-secondary-fixed mb-md">You may be dealing with:</h3>
              <p className="text-on-primary-fixed-variant font-body-md max-w-sm">
                These common pressure points create invisible friction in daily operations.
              </p>
            </motion.div>
            
            <div className="md:w-7/12 md:ml-auto flex flex-col gap-lg py-[10vh] md:py-[20vh] mt-8 md:mt-0">
              {issues.map((issue, index) => {
                const start = index / issues.length;
                const end = (index + 1) / issues.length;
                
                // Highlight the active item based on scroll progress
                const opacity = useTransform(
                  smoothProgress, 
                  [Math.max(0, start - 0.1), start + 0.05, end - 0.05, Math.min(1, end + 0.1)], 
                  [0.3, 1, 1, 0.3]
                );
                
                const scale = useTransform(
                  smoothProgress,
                  [Math.max(0, start - 0.1), start + 0.05, end - 0.05, Math.min(1, end + 0.1)],
                  [0.95, 1, 1, 0.95]
                );

                return (
                  <motion.div 
                    key={index} 
                    style={{ opacity, scale }}
                    className="origin-left"
                  >
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-xl border border-white/20 shadow-lg w-full flex items-start gap-lg transition-colors">
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
