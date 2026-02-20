'use client';

import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

const links = {
  product: [
    { name: 'Возможности', href: '#features' },
    { name: 'Цены', href: '#pricing' },
    { name: 'Документация', href: '#' },
    { name: 'API', href: '#' },
  ],
  company: [
    { name: 'О нас', href: '#' },
    { name: 'Блог', href: '#' },
    { name: 'Карьера', href: '#' },
    { name: 'Контакты', href: '#' },
  ],
  legal: [
    { name: 'Конфиденциальность', href: '#' },
    { name: 'Условия', href: '#' },
    { name: 'Лицензия', href: '#' },
  ],
};

const socials = [
  { icon: Github, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Mail, href: 'mailto:hello@tapplatform.com' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              TAP Platform
            </h3>
            <p className="text-gray-400 mb-4">
              Единая платформа для продаж через Shopify и AI агентов в Центральной Азии
            </p>
            <a
              href="https://github.com/visa/trusted-agent-protocol"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
            >
              <Github className="w-4 h-4" />
              VISA TAP Protocol
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Компания</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Правовая информация</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-center">
            © 2024 TAP Platform. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

