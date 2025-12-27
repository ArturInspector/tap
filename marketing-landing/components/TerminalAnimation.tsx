'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { text: '$ agent-platform init', delay: 0, type: 'command' },
  { text: 'Initializing TAP Platform...', delay: 800, type: 'output' },
  { text: 'Connecting to Shopify...', delay: 1600, type: 'output' },
  { text: '✓ Shopify connected: mystore.myshopify.com', delay: 2800, type: 'success' },
  { text: '✓ Syncing 127 products...', delay: 3600, type: 'success' },
  { text: 'Generating TAP keys (Ed25519)...', delay: 4400, type: 'output' },
  { text: '✓ Public key: Ed25519:Abc123...xyz789', delay: 5600, type: 'success' },
  { text: '✓ Agent registered in Agent Registry', delay: 6400, type: 'success' },
  { text: '', delay: 7200, type: 'output' },
  { text: '🎉 Ready to sell through AI agents!', delay: 7600, type: 'celebration' },
  { text: '', delay: 8200, type: 'output' },
  { text: 'Dashboard: http://localhost:3001', delay: 8600, type: 'info' },
];

export default function TerminalAnimation() {
  const [lines, setLines] = useState<typeof commands>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    commands.forEach((command, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, command]);
        if (index === commands.length - 1) {
          setIsComplete(true);
        }
      }, command.delay);
    });
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'celebration': return 'text-yellow-400';
      case 'info': return 'text-cyan-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="bg-gray-950 rounded-xl p-8 font-mono text-sm shadow-2xl border border-gray-800 overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 ml-4">terminal</span>
      </div>
      
      {/* Terminal content */}
      <div className="min-h-[300px]">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 ${getLineColor(line.type)}`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Blinking cursor */}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-green-400 text-lg"
          >
            ▊
          </motion.span>
        )}
      </div>
    </div>
  );
}



