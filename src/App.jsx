import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import ServicesLead from './components/ServicesLead/ServicesLead';
import ServiceStepsScroll from './components/ServiceStepsScroll/ServiceStepsScroll';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-beige-light text-dark">
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <ServicesLead />
      <ServiceStepsScroll />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
