import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGlobe } from 'react-icons/fa';
import { COMING_SOON_PATH } from '@/lib/routes';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Careers', href: '/careers' },
    ],
    Services: [
      { label: 'STP Solutions', href: '/services#industrial-epc' },
      { label: 'WTP Solutions', href: '/services#industrial-epc' },
      { label: 'MEP Works', href: '/services#mep' },
      { label: 'Interior Solutions', href: '/services#interior' },
    ],
    Support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: COMING_SOON_PATH },
      { label: 'Documentation', href: COMING_SOON_PATH },
      { label: 'Blog', href: COMING_SOON_PATH },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-0">
              <div className="w-100 h-50 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg"><Image
                        src="/EPLUS.svg"
                        alt="Engineering Plus Logo"
                        width={300}
                        height={250}
                        className="object-contain"
                      /></span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Leading EPC solutions for STP, WTP, MEP, and Interior works across India.
            </p>
            <div className="flex gap-4 mt-4">

              {/* FACEBOOK */}
              <Link href={COMING_SOON_PATH} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-gray-500 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300" aria-label="Facebook — coming soon">
                <FaFacebookF className="w-4 h-4" />
              </Link>
              
              {/* TWITTER (X) */}
              <Link href={COMING_SOON_PATH} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-gray-500 hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-300" aria-label="X (Twitter) — coming soon">
                <FaTwitter className="w-4 h-4" />
              </Link>
              
              {/* LINKEDIN */}
              <Link href={COMING_SOON_PATH} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-gray-500 hover:bg-[var(--color-tertiary)] hover:text-white transition-all duration-300" aria-label="LinkedIn — coming soon">
                <FaLinkedinIn className="w-4 h-4" />
              </Link>

              {/* WEBSITE */}
              <a href="https://www.engineeringplus.co.in" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-gray-500 hover:bg-[var(--color-quaternary)] hover:text-white transition-all duration-300">
                <FaGlobe className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-lg mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={`${section}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Engineering Plus. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href={COMING_SOON_PATH} className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href={COMING_SOON_PATH} className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href={COMING_SOON_PATH} className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
