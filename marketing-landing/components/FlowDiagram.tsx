'use client';

import { motion } from 'framer-motion';

export default function FlowDiagram() {
  return (
    <div className="relative py-12 max-w-6xl mx-auto">
      <svg className="w-full h-64" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
        {/* Shopify */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <rect x="20" y="75" width="140" height="60" rx="12" fill="#0F6CBD" />
          <text x="90" y="110" fill="white" textAnchor="middle" fontSize="18" fontWeight="bold">
            Shopify
          </text>
        </motion.g>
        
        {/* Arrow 1 */}
        <motion.line
          x1="160" y1="105" x2="280" y2="105"
          stroke="#667eea" strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <motion.polygon
          points="280,105 270,100 270,110"
          fill="#667eea"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        />
        
        {/* Animated dots flowing */}
        <motion.circle
          cx="0" cy="105" r="5" fill="#667eea"
          animate={{ cx: [160, 280] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />
        
        {/* Platform */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <rect x="280" y="75" width="160" height="60" rx="12" fill="#764ba2" />
          <text x="360" y="110" fill="white" textAnchor="middle" fontSize="18" fontWeight="bold">
            Platform API
          </text>
        </motion.g>
        
        {/* Arrow 2 */}
        <motion.line
          x1="440" y1="105" x2="560" y2="105"
          stroke="#667eea" strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
        <motion.polygon
          points="560,105 550,100 550,110"
          fill="#667eea"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        />
        
        <motion.circle
          cx="0" cy="105" r="5" fill="#667eea"
          animate={{ cx: [440, 560] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
        />
        
        {/* TAP */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <rect x="560" y="75" width="120" height="60" rx="12" fill="#10B981" />
          <text x="620" y="110" fill="white" textAnchor="middle" fontSize="18" fontWeight="bold">
            TAP
          </text>
        </motion.g>
        
        {/* Arrow 3 */}
        <motion.line
          x1="680" y1="105" x2="800" y2="105"
          stroke="#667eea" strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        />
        <motion.polygon
          points="800,105 790,100 790,110"
          fill="#667eea"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
        />
        
        <motion.circle
          cx="0" cy="105" r="5" fill="#667eea"
          animate={{ cx: [680, 800] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1 }}
        />
        
        {/* AI Agents */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <rect x="800" y="75" width="150" height="60" rx="12" fill="#F59E0B" />
          <text x="875" y="110" fill="white" textAnchor="middle" fontSize="18" fontWeight="bold">
            AI Agents
          </text>
        </motion.g>
      </svg>
      
      {/* Labels */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="flex justify-between mt-4 text-sm text-gray-600 px-8"
      >
        <span>Ваш магазин</span>
        <span>Единая платформа</span>
        <span>Протокол</span>
        <span>ChatGPT и др.</span>
      </motion.div>
    </div>
  );
}





