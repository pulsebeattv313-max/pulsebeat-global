import Link from "next/link";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { href: "/celebrities", label: "Celebrities" },
      { href: "/original-programming", label: "Original Programming" },
      { href: "/news-culture", label: "News & Culture" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Our Team" },
      { href: "/partners", label: "Partners" },
      { href: "/contact", label: "Contact" },
    ],
    support: [
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Get Help" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  };

  return (
    <footer className="bg-pb-gray-50 dark:bg-pb-gray-900 border-t border-pb-gray-200 dark:border-pb-gray-700">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <img src="/logo.svg" alt="Pulsebeat Global" className="w-full h-full" />
              </div>
              <span className="font-bold text-xl text-pb-gray-900 dark:text-pb-white">Pulsebeat Global</span>
            </Link>
            <p className="text-pb-gray-600 dark:text-pb-gray-400 mb-6 max-w-sm">
              Your premier destination for exclusive celebrity interviews, award-winning original programming, 
              and cultural content that celebrates the arts, entertainment, and human spirit.
            </p>
            <SocialIcons />
          </div>

          {/* Content Links */}
          <div>
            <h3 className="font-semibold text-pb-gray-900 dark:text-pb-white mb-4">Content</h3>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-pb-gray-600 dark:text-pb-gray-400 hover:text-pb-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-pb-gray-900 dark:text-pb-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-pb-gray-600 dark:text-pb-gray-400 hover:text-pb-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-pb-gray-900 dark:text-pb-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-pb-gray-600 dark:text-pb-gray-400 hover:text-pb-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-pb-gray-200 dark:border-pb-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pb-gray-500 dark:text-pb-gray-400 text-sm">
              © {currentYear} Pulsebeat Global. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-pb-gray-500 dark:text-pb-gray-400">
              <Link href="/privacy" className="hover:text-pb-gold transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-pb-gold transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-pb-gold transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}