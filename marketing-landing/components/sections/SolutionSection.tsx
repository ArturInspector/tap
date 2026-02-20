'use client';

import { motion } from 'framer-motion';
import FlowDiagram from '../FlowDiagram';

export default function SolutionSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Единая платформа для всех каналов продаж
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Подключите ваш Shopify за 5 минут и автоматически получите доступ к AI агентам через <a href="https://github.com/visa/trusted-agent-protocol" target="_blank" rel="noopener noreferrer" className="text-[#0F6CBD] hover:text-[#2B579A] underline font-semibold">VISA TAP протокол</a>. Идеально для бизнеса в Центральной Азии.
          </p>
        </motion.div>
        
        <FlowDiagram />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            Наша платформа автоматически синхронизирует товары, обрабатывает заказы
            и предоставляет единую аналитику по всем каналам продаж
          </p>
        </motion.div>
      </div>
    </section>
  );
}

