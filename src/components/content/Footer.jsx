import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { name: "À propos", href: "#" },
      { name: "Services", href: "#" },
      { name: "Projets", href: "#" },
      { name: "Blog", href: "#" }
    ],

    contact: [
      { name: "mahasaroadvin@gmail.com", href: "mailto:mahasaroadvin@gmail.com" },
      { name: "+261 32 61 675 99", href: "tel:+261326167599" },
      { name: "Toliara, MADAGASCAR", href: "#" }
    ]
  };

const socialLinks = [
  { name: "LinkedIn", icon: <FaLinkedin />, href: "https://www.linkedin.com/in/advin-mahasaro-674686290/", color: "hover:text-blue-600" },
  { name: "GitHub", icon: <FaGithub />, href: "https://github.com/Peter08-bit", color: "hover:text-gray-900" },
  { name: "Twitter", icon: <FaTwitter />, href: "#", color: "hover:text-blue-400" },
  { name: "Instagram", icon: <FaInstagram />, href: "#", color: "hover:text-pink-600" }
];

  return (
    <footer className="bg-gradient-to-b from-BLACK to-GRAY border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <img 
                src="/AM.png" 
                alt="Advin MAHASARO Logo" 
                className="w-16 h-auto"
              />
            </div>
            <p className="text-gray-600 text-sm text-center md:text-left">
              Solutions digitales innovantes pour votre réussite professionnelle.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-500 transition-colors duration-200 ${social.color}`}
                  aria-label={social.name}
                >
                  <span className="text-xl flex items-center justify-center">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-green-900 mb-4">Entreprise</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-green-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}


        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center">
              © {currentYear} Advin MAHASARO. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 text-xs transition-colors">
                Accessibilité
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 text-xs transition-colors">
                Plan du site
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;