import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import ScrollReveal from "@/components/home/ScrollReveal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
