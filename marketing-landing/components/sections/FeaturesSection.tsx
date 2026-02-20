'use client';

import { motion } from 'framer-motion';
import { Rocket, Bot, BarChart3, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Быстрый старт',
    description: 'Подключите Shopify за 5 минут. Без кода, без технических знаний.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Bot,
    title: 'AI-Ready из коробки',
    description: 'VISA TAP протокол настраивается автоматически. ChatGPT может покупать ваши товары. Основано на открытом стандарте от VISA.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: BarChart3,
    title: 'Единая аналитика',
    description: 'Все заказы в одном месте. Следите за продажами через Shopify и AI агентов.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Zap,
    title: 'Автоматизация',
    description: 'Синхронизация товаров, обработка заказов, уведомления - всё работает автоматически.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Ed25519 подписи, верификация агентов, защита от мошенничества.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    icon: Globe,
    title: 'Глобальный охват',
    description: 'Продавайте в Кыргызстане и по всему миру через одну платформу.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Всё что нужно для успешных продаж
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Полный набор инструментов для бизнеса в Кыргызстане и выхода на глобальные рынки
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="feature-card group"
            >
              <div className={`inline-flex p-4 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

