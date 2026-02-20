'use client';

import { motion } from 'framer-motion';
import { UserPlus, Link2, Sparkles } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Регистрация',
    description: 'Создайте аккаунт за 2 минуты. Укажите название бизнеса и email.',
  },
  {
    number: '02',
    icon: Link2,
    title: 'Подключение Shopify',
    description: 'Введите URL вашего магазина. Мы автоматически синхронизируем товары.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Автонастройка VISA TAP',
    description: 'Генерируем ключи, регистрируем агента в <a href="https://github.com/visa/trusted-agent-protocol" target="_blank" rel="noopener noreferrer" className="text-[#0F6CBD] hover:underline font-semibold">VISA TAP протоколе</a>. Готово к продажам через AI!',
  },
];

export default function HowItWorks() {
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
            Как это работает
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Три простых шага до первых продаж через AI агентов
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500" 
                 style={{ width: '66%', left: '17%' }} />
            
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl blur-xl opacity-50" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                    <step.icon className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                
                <div className="text-6xl font-bold text-gray-200 mb-4">
                  {step.number}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: step.description }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

