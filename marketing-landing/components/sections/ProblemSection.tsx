'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const problems = [
  {
    icon: '⚙️',
    title: 'Сложная настройка',
    description: 'Недели на интеграцию с Shopify и Amazon',
  },
  {
    icon: '🤖',
    title: 'Нет AI интеграции',
    description: 'AI агенты не могут покупать ваши товары',
  },
  {
    icon: '📊',
    title: 'Ручное управление',
    description: 'Нет единой панели управления заказами',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Выход на рынки Центральной Азии и глобальные рынки не должен быть сложным
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Традиционные платформы требуют технических знаний и много времени. Мерчанты из Казахстана, Узбекистана и других стран региона сталкиваются с барьерами при выходе на международные рынки.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="absolute -top-4 -right-4 bg-red-500 rounded-full p-2">
                <X className="w-6 h-6" />
              </div>
              
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

