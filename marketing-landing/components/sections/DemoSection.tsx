'use client';

import { motion } from 'framer-motion';
import TerminalAnimation from '../TerminalAnimation';

export default function DemoSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Посмотрите как это работает
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Настройка платформы в реальном времени
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  );
}



