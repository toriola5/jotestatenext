import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Faqs from "@/components/home/Faqs";
import Blog from "@/components/home/Blog";
import Review from "@/components/home/Review";
import Contact from "@/components/home/Contact";
import Testimonial from "@/components/home/Testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <FeaturedProperties />
      <Testimonial />
      <hr className="max-w-7xl mx-auto border-gray-200" />
      <Blog />
      <Faqs />
      <hr className="max-w-7xl mx-auto border-gray-200" />
      <Review />
      <Contact />
    </>
  );
}
