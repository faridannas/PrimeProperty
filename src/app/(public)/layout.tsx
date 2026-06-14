import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Layout ini hanya berlaku untuk halaman publik: /, /about, /contact
// Halaman /agent/* TIDAK menggunakan layout ini
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
