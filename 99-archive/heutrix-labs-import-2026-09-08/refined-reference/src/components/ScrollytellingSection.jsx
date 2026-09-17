import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Settings, FileSpreadsheet, Bot, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ScrollytellingSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform values for "Chaos" to "Order" transition
  const chaosOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const chaosScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const orderOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const orderScale = useTransform(scrollYProgress, [0.4, 0.8], [0.8, 1]);

  return (
    <section id="problem" ref={containerRef} className="py-24 bg-background-soft min-h-[150vh] relative">
      <div className="sticky top-1/4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Narrative Side */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-slate-navy">From Chaos to Control</h2>
          <div className="space-y-12">
            <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.3]) }}>
              <h3 className="text-xl font-bold text-slate-charcoal mb-2">The Messy Reality</h3>
              <p className="text-slate-600">Spreadsheets are hard to maintain, manual processes are broken, and unregulated AI tools create more confusion than they solve.</p>
            </motion.div>
            
            <motion.div style={{ opacity: useTransform(scrollYProgress, [0.3, 0.6], [0.3, 1]) }}>
              <h3 className="text-xl font-bold text-slate-charcoal mb-2">The Missing Link</h3>
              <p className="text-slate-600">What you need isn't more software. It's a system. A structured way to funnel inputs into predictable outputs.</p>
            </motion.div>

            <motion.div style={{ opacity: useTransform(scrollYProgress, [0.6, 0.9], [0.3, 1]) }}>
              <h3 className="text-xl font-bold text-tech-teal mb-2">The Heutrix Solution</h3>
              <p className="text-slate-600">We transition your scattered tools into a practical, linear timeline with locked-down rules and automated efficiency.</p>
            </motion.div>
          </div>
        </div>

        {/* Visual Engine Side */}
        <div className="relative h-[400px]">
          
          {/* Chaos State */}
          <motion.div 
            style={{ opacity: chaosOpacity, scale: chaosScale }}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative w-full max-w-sm h-64">
              <motion.div 
                className="absolute top-0 left-0 bg-white p-4 shadow-lg rounded transform -rotate-6 border border-red-200"
                animate={{ rotate: [-6, -2, -6] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <FileSpreadsheet className="text-red-500 w-8 h-8 mb-2" />
                <div className="w-24 h-2 bg-slate-200 rounded" />
              </motion.div>
              
              <motion.div 
                className="absolute top-12 right-0 bg-white p-4 shadow-lg rounded transform rotate-12 border border-orange-200"
                animate={{ rotate: [12, 8, 12] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Bot className="text-orange-500 w-8 h-8 mb-2" />
                <div className="w-20 h-2 bg-slate-200 rounded" />
              </motion.div>

              <motion.div 
                className="absolute bottom-4 left-1/4 bg-white p-4 shadow-lg rounded transform -rotate-12 border border-yellow-200"
                animate={{ rotate: [-12, -15, -12] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <Settings className="text-yellow-500 w-8 h-8 mb-2" />
                <div className="w-16 h-2 bg-slate-200 rounded" />
              </motion.div>
            </div>
          </motion.div>

          {/* Order State */}
          <motion.div 
            style={{ opacity: orderOpacity, scale: orderScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-tech-mint/30 w-full max-w-md">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-tech-mint/20 rounded-full flex items-center justify-center text-tech-teal font-bold">1</div>
                <div className="flex-1 h-2 bg-tech-mint rounded" />
                <div className="w-10 h-10 bg-tech-teal/20 rounded-full flex items-center justify-center text-tech-teal font-bold">2</div>
                <div className="flex-1 h-2 bg-tech-teal rounded" />
                <div className="w-10 h-10 bg-slate-navy rounded-full flex items-center justify-center text-white"><CheckCircle2 size={20} /></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-700">
                  <CheckCircle2 size={16} className="text-tech-mint" />
                  <span>Data Ingestion Rules</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <CheckCircle2 size={16} className="text-tech-mint" />
                  <span>Automated Processing</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-700">
                  <CheckCircle2 size={16} className="text-tech-mint" />
                  <span>Clean Output Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
