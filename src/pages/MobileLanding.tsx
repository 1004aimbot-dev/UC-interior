import React from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import Hero from '../components/home/Hero';
import ServiceStructure from '../components/home/ServiceStructure';
import ProcessFlow from '../components/home/ProcessFlow';
import Method from './Method';
import WorkCases from './WorkCases';
import About from './About';
import ConsultationPage from './Consultation';
import { Element } from 'react-scroll';

const MobileLanding: React.FC = () => {
    // Override min-height styles for mobile flow using a style block or specific class wrappers
    // Since existing components have inline styles, we might need a workaround or accept 100vh sections for now.
    // However, 100vh for each section on mobile is actually okay for "snap" feel, but might be too tall for content-light sections.
    // Let's try to wrap them and see.

    return (
        <MobileLayout>
            <Element name="hero" className="element">
                <Hero />
            </Element>

            <Element name="service" className="element">
                <ServiceStructure />
            </Element>

            {/* Method Section */}
            <Element name="method" className="element">
                {/* Method uses 100vh inline style. We might want to keep it or override if possible in future refactor */}
                <Method />
            </Element>

            {/* WorkCases Section */}
            <Element name="cases" className="element">
                <WorkCases />
            </Element>

            {/* Process Section */}
            <Element name="process" className="element">
                <ProcessFlow />
            </Element>

            {/* About Section */}
            <Element name="about" className="element">
                <About />
            </Element>

            {/* Contact Section */}
            <Element name="contact" className="element">
                <ConsultationPage />
            </Element>
        </MobileLayout>
    );
};

export default MobileLanding;
