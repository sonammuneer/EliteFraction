import React from 'react';
import './HowItWorks.css';

// Importing images directly from the correct path
import EncryptedData from '../../Image/HowItWorks/encrypted-data.PNG';
import FlexibleShareSale from '../../Image/HowItWorks/flexible-share-sale.PNG';
import TestedVehicles from '../../Image/HowItWorks/tested-vehicles.PNG';
import TransparentCosts from '../../Image/HowItWorks/transparent-costs.PNG';
import VehicleWarranty from '../../Image/HowItWorks/vehicle-warranty.PNG';
import VerifiedMembers from '../../Image/HowItWorks/verified-members.PNG';
import FractionalOwnershipComparison from '../../Image/HowItWorks/Fractional_Ownership_v.png';
import StepByStepGuide from '../../Image/HowItWorks/StepByStepGuide.png';
import BenefitsOfFractionalizing from '../../Image/HowItWorks/benefits.png';

const HowItWorks = () => {
    return (
        <div className="how-it-works-container">
            <h1 className="title">How It Works</h1>
            <p className="subtitle">Experience luxury car sharing with a seamless process that puts you in the driver's seat.</p>

            <section className="section">
                <h2>Company Values</h2>
                <p>We believe in making luxury accessible, sustainable, and economically viable for our community of co-owners.</p>
            </section>

            <section className="section">
                <h2>Step-by-Step Guide</h2>
                <div className="image-container">
                    <img src={StepByStepGuide} alt="Step-by-Step Guide" />
                </div>
            </section>

            <section className="section">
                <h2>Key Features</h2>
                <div className="horizontal-scroll-container">
                    {[{
                        img: TestedVehicles,
                        alt: 'Tested Vehicles',
                        text: 'Tested Vehicles'
                    }, {
                        img: VerifiedMembers,
                        alt: 'Verified Members',
                        text: 'Verified Members'
                    }, {
                        img: EncryptedData,
                        alt: 'Encrypted Data',
                        text: 'Encrypted Data'
                    }, {
                        img: VehicleWarranty,
                        alt: 'Vehicle Warranty',
                        text: 'Vehicle Warranty'
                    }, {
                        img: TransparentCosts,
                        alt: 'Transparent Costs',
                        text: 'Transparent Costs'
                    }, {
                        img: FlexibleShareSale,
                        alt: 'Flexible Share Sale',
                        text: 'Flexible Share Sale'
                    }].map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="variable-image-container">
                                <img src={feature.img} alt={feature.alt} />
                            </div>
                            <p>{feature.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <h2>Benefits of Fractionalizing</h2>
                <div className="image-container">
                    <img src={BenefitsOfFractionalizing} alt="Benefits of Fractionalizing" />
                </div>
            </section>

            <section className="section">
                <h2>Cost Breakdown</h2>
                <p>Understand the one-time and recurring fees, ROI expectations, and cost-saving benefits of fractional ownership.</p>
            </section>

            <section className="section">
                <h2>Legal & Compliance Details</h2>
                <p>All transactions are fully compliant with international laws, and our smart contracts ensure the security and transparency of your investment.</p>
            </section>

            <section className="section">
                <h2>Blockchain Integration & Smart Contracts</h2>
                <p>Our platform uses blockchain technology and smart contracts to provide secure, transparent, and automated management of ownership shares.</p>
            </section>

            <section className="section visual-aids">
                <h2>Visual Aids</h2>
                <p>Explore our infographics and videos to better understand the benefits of fractional ownership and how it can work for you.</p>
                <div className="visual-container">
                    <div className="image-container">
                        <img src={FractionalOwnershipComparison} alt="Fractional Ownership Comparison Chart" />
                    </div>
                    <video src="/videos/how-it-works.mp4" controls></video>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;