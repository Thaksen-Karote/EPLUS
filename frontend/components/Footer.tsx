import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Certificates', href: '/certificates' },
      { label: 'Careers', href: '/careers' },
    ],
    Services: [
      { label: 'Industrial EPC', href: '/services#industrial-epc' },
      { label: 'MEPF Works', href: '/services#mepf' },
      { label: 'Civil & Infrastructure', href: '/services#civil-infrastructure' },
      { label: 'Interior Design', href: '/services#interior' },
    ],
    Support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/about#faq' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity cursor-pointer mb-2" aria-label="Engineering Plus — Home">
              <Image
                src="/EPLUS.svg"
                alt="Engineering Plus Logo"
                width={300}
                height={250}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Leading EPC solutions for STP, WTP, MEPF, and Interior works across India.
            </p>
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
              Copyright © 2025 Engineering Plus - All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
