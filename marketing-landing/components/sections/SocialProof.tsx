'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  { name: 'Shopify', width: 120, height: 40 },
  { name: 'Amazon', width: 100, height: 40 },
  { name: 'ChatGPT', width: 120, height: 40 },
  { name: 'Visa TAP', width: 100, height: 40 },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-8 text-sm uppercase tracking-wide font-medium">
            Интегрируемся с ведущими платформами
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {logos.map((logo, index) => {
              const isVisaTap = logo.name === 'Visa TAP';
              return (
                <motion.a
                  key={logo.name}
                  href={isVisaTap ? 'https://github.com/visa/trusted-agent-protocol' : '#'}
                  target={isVisaTap ? '_blank' : undefined}
                  rel={isVisaTap ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.6, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                >
                  {/* Placeholder - replace with actual logos */}
                  <div className={`px-6 py-3 bg-gray-100 rounded-lg font-bold text-gray-800 ${isVisaTap ? 'hover:bg-blue-50 hover:text-blue-600' : ''}`}>
                    {logo.name}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

