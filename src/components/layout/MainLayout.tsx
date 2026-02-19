import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ChatWidget from '../chat/ChatWidget';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </div>
  );
}
