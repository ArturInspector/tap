'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const metrics = [
  {
    value: 5,
    suffix: ' минут',
    label: 'на настройку',
    description: 'От регистрации до первых продаж',
  },
  {
    value: 50,
    suffix: '+',
    label: 'мерчантов',
    description: 'из Центральной Азии уже используют платформу',
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'uptime',
    description: 'надежность и доступность',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'поддержка',
    description: 'всегда на связи',
  },
];

export default function MetricsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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
            Цифры говорят сами за себя
          </h2>
        </motion.div>
        
        <div ref={ref} className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center p-6"
            >
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {inView && (
                  <CountUp
                    end={metric.value}
                    duration={2}
                    decimals={metric.value % 1 !== 0 ? 1 : 0}
                    suffix={metric.suffix}
                  />
                )}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                {metric.label}
              </div>
              <div className="text-gray-600">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

