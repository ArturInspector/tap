'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Возможности', href: '#features' },
  { name: 'Как это работает', href: '#how-it-works' },
  { name: 'Цены', href: '#pricing' },
  { name: 'Документация', href: '#' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className={
                isScrolled
                  ? 'text-[#0F6CBD]'
                  : 'text-white drop-shadow-lg'
              }
            >
              TAP
            </span>
            <span
              className={
                isScrolled
                  ? 'text-[#2B579A]'
                  : 'text-white/90 drop-shadow-lg'
              }
            >
              Platform
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-[#4A5568] hover:text-[#0F6CBD]'
                    : 'text-white/90 hover:text-white drop-shadow-md'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-[#4A5568] hover:text-[#0F6CBD]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Войти
            </a>
            <motion.a
              href="#"
              className="px-6 py-2.5 bg-[#0F6CBD] text-white font-semibold rounded-lg hover:bg-[#2B579A] transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Начать
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-[#4A5568] hover:bg-[#F5F7FA]'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E5E7EB]"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#4A5568] hover:text-[#0F6CBD] font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
                <a
                  href="#"
                  className="block text-[#4A5568] hover:text-[#0F6CBD] font-medium transition-colors"
                >
                  Войти
                </a>
                <a
                  href="#"
                  className="block w-full px-6 py-3 bg-[#0F6CBD] text-white font-semibold rounded-lg hover:bg-[#2B579A] transition-all duration-200 text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    Начать
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

