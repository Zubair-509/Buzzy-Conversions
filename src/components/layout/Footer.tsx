import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Instagram, Mail, Heart } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'PDF Tools', path: '/pdf-tools' },
        { name: 'Image Tools', path: '/image-tools' },
        { name: 'Video Tools', path: '/video-tools' },
        { name: 'Enhancement Tools', path: '/enhancement-tools' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter size={20} />, url: '#', name: 'Twitter' },
    { icon: <Facebook size={20} />, url: '#', name: 'Facebook' },
    { icon: <Instagram size={20} />, url: '#', name: 'Instagram' },
    { icon: <Mail size={20} />, url: '#', name: 'Email' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo size="lg" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Buzzy Conversions provides fast, secure, and high-quality file conversion tools for all your needs. Convert any file format online with ease.
            </p>
            <motion.div 
              className="flex mt-6 space-x-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                  aria-label={social.name}
                  variants={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.path}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center text-sm">
            &copy; {currentYear} Buzzy Conversions. All rights reserved. Made with 
            <Heart size={16} className="mx-1 text-red-500" fill="currentColor" /> by Buzzy Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;