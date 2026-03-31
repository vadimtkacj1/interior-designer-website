import Navbar from './components/Navbar/Navbar';
import VideoIntro from './components/VideoIntro/VideoIntro';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import ServicesLead from './components/ServicesLead/ServicesLead';
import ServiceStepsScroll from './components/ServiceStepsScroll/ServiceStepsScroll';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhatsAppWidget from './components/WhatsAppWidget/WhatsAppWidget';
import Partners from './components/Partners/Partners';

function App() {
  return (
    <div className="min-h-screen bg-beige-light text-dark">
      <WhatsAppWidget />
      <Navbar />
      <VideoIntro />
      <div className="relative z-10">
        <Partners />
        <Gallery />
        <About />
        <ServicesLead />
        <ServiceStepsScroll />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
