import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        
        <Navbar />
        <main className="flex-grow w-full max-w-[1280px] mx-auto px-8 py-12">
          {children}
        </main>
        <Footer />

      </body>
    </html>
  );
}