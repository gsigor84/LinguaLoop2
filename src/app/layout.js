import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'LinguaLoop',
  description: 'A modern, multilingual SaaS experience powered by AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
