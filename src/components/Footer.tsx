import { Instagram, MapPin, Phone, Clock } from 'lucide-react';
import Cloud from './Cloud';
import Bee from './Bee';

const Footer = () => {
  const navLinks = [
    { name: 'Главная', href: '/', active: true },
    { name: 'О нас', href: '#about' },
    { name: 'Направления', href: '#directions' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Тренажеры', href: '#trainers' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <footer className="relative bg-cloud pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <Cloud size="md" className="absolute top-4 right-10 opacity-50 hidden lg:block" />
      <Cloud size="sm" className="absolute top-20 right-1/4 opacity-40 hidden lg:block" />
      <Bee className="absolute right-20 bottom-20 w-16 h-12 opacity-60 animate-float hidden lg:block" />
      
      <div className="container mx-auto px-4">
        {/* Top border */}
        <div className="border-t border-border mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo Column */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-sun-orange tracking-wide uppercase block">
                Детский центр современных знаний
              </span>
              <span className="text-3xl font-black text-sun-yellow tracking-tight">
                «ЛУЧИК»
              </span>
            </div>
            <Bee className="w-20 h-16 opacity-80" />
          </div>
          
          {/* Navigation Column */}
          <div>
            <div className="mb-4 px-4 py-2 bg-sky-light/50 rounded-full inline-block">
              <span className="text-text-navy font-semibold">📋 Главная</span>
            </div>
            <nav className="space-y-3 mt-4">
              {navLinks.filter(l => !l.active).slice(0, 3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-muted-custom hover:text-text-navy transition-colors"
                >
                  • {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          {/* More Links Column */}
          <div className="md:pt-12">
            <nav className="space-y-3">
              {navLinks.filter(l => !l.active).slice(3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-muted-custom hover:text-text-navy transition-colors"
                >
                  • {link.name}
                </a>
              ))}
            </nav>
            <Cloud size="sm" className="mt-8 opacity-60" />
          </div>
          
          {/* Contact Column */}
          <div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-text-muted-custom mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-dark font-medium">Замковая, 4</p>
                  <a href="tel:+375445523267" className="text-text-muted-custom hover:text-text-navy">
                    +37544 552-32-67
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-text-muted-custom mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-dark font-medium">Кооперативная, 36</p>
                  <a href="tel:+375298667663" className="text-text-muted-custom hover:text-text-navy">
                    +37529 866-76-63
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-text-muted-custom mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-text-muted-custom">Пн-Пт с 9.00 до 20.00</p>
                  <p className="text-text-muted-custom">Сб, Вс с 10.00 до 18.00</p>
                </div>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center text-cloud hover:scale-110 transition-transform"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-sky-blue flex items-center justify-center text-cloud hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.57 4 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.472 2.27 4.64 2.846 4.64.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.14-3.574 2.14-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-sun-orange flex items-center justify-center text-cloud hover:scale-110 transition-transform"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 16.481c-.225.564-.928 1.031-1.567 1.169-.439.093-1.012.168-2.942-.632-2.472-1.023-4.062-3.538-4.185-3.702-.123-.164-.997-1.328-.997-2.531 0-1.204.632-1.796.856-2.04.224-.245.489-.306.652-.306.164 0 .327.002.47.009.151.007.354-.058.553.422.203.494.693 1.69.754 1.812.061.123.102.266.02.429-.082.164-.123.266-.245.409-.123.143-.259.32-.37.429-.122.123-.25.256-.107.502.143.245.636 1.05 1.366 1.7.94.837 1.734 1.097 1.979 1.22.245.123.388.102.531-.061.143-.164.612-.714.775-.959.163-.245.327-.204.551-.123.224.082 1.418.669 1.661.791.245.123.408.184.469.286.061.102.061.592-.163 1.156z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-12 pt-6 text-center">
          <p className="text-text-muted-custom text-sm">
            © 2024 Детский центр «Лучик». Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
