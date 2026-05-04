interface SectionWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: 'white' | 'gray' | 'dark';
  id?: string;
}

export default function SectionWrapper({
  title,
  subtitle,
  children,
  bgColor = 'white',
  id,
}: SectionWrapperProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <section id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 md:py-24`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
            bgColor === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${
              bgColor === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </section>
  );
}
