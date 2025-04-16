import  { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-grow pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;