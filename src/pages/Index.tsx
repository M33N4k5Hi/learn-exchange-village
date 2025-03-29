
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import FeaturedSkills from "../components/FeaturedSkills";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategoryList />
        <FeaturedSkills />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
