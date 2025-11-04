import React from "react";
import Hero from "../../Components/Hero";
import CategorySlider from "../../Components/CategorySlider";
import SectionWithSlider from "../../Components/SectionWithSlider";
import WhyChooseUs from "../../Components/WhyChooseUs";

import FAQ from "../../Components/FAQ";

function Home() {
  return (
    <div className="bg-yellow-50">
      <Hero />
      <CategorySlider />
      <SectionWithSlider />
      <WhyChooseUs />
      <FAQ />
    </div>
  );
}

export default Home;
