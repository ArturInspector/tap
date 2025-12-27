'use client';

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 49,
    description: 'Для малого бизнеса',
    features: [
      'До 1000 товаров',
      'Shopify интеграция',
      'VISA TAP протокол',
      'Базовая аналитика',
      'Email поддержка',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: 149,
    description: 'Для растущего бизнеса',
    features: [
      'Неограниченно товаров',
      'Shopify + Amazon',
      'VISA TAP протокол',
      'Продвинутая аналитика',
      'Приоритетная поддержка',
      'Кастомные интеграции',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'Для крупного бизнеса',
    features: [
      'Всё из Professional',
      'Выделенный менеджер',
      'SLA 99.99%',
      'Кастомная разработка',
      'On-premise опция',
      'Белый лейбл',
    ],
    popular: false,
  },
];

export default function PricingSection() {
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
            Прозрачные цены
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите план под ваши задачи. Без скрытых комиссий. Идеально для бизнеса в Центральной Азии.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg ${
                plan.popular ? 'ring-2 ring-blue-600 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Популярный
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  {plan.price ? (
                    <>
                      <span className="text-5xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600">/месяц</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      Custom
                    </span>
                  )}
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.price ? 'Выбрать план' : 'Связаться'}
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-gray-600"
        >
          Все планы включают 14 дней бесплатного пробного периода
        </motion.p>
      </div>
    </section>
  );
}

