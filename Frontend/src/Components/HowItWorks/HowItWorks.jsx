import React, { useState } from 'react';
import './HowItWorks.css';

// Importing images
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
    const [selectedOptions, setSelectedOptions] = useState({
        car: true,
        yacht: false,
        med: false
    });

    const [carCost, setCarCost] = useState(300000);
    const [carOwners, setCarOwners] = useState(5);
    const [yachtCost, setYachtCost] = useState(4000000);
    const [yachtOwners, setYachtOwners] = useState(8);
    const [medCost, setMedCost] = useState(1200000);
    const [medOwners, setMedOwners] = useState(4);

    // Fixed estimated costs
    const carMaint = 5000, yachtMaint = 25000, medMaint = 15000;
    const carStorage = 2000, yachtStorage = 30000, medStorage = 5000;
    const carIns = 3500, yachtIns = 40000, medIns = 10000;
    const carMgmt = 2500, yachtMgmt = 20000, medMgmt = 7500;

    // Calculate per owner costs
    const calcPerOwner = (cost, owners) => owners > 0 ? (cost / owners).toFixed(2) : "N/A";

    const handleCheckboxChange = (option) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [option]: !prevState[option]
        }));
    };

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
                <h2>Cost Breakdown</h2>
                <p>Understand the one-time and recurring fees, ROI expectations, and cost-saving benefits of fractional ownership.</p>

                {/* ✅ Checkboxes */}
                <div className="checkbox-container">
                    {['car', 'yacht', 'med'].map((type) => (
                        <label key={type}>
                            <input 
                                type="checkbox" 
                                checked={selectedOptions[type]} 
                                onChange={() => handleCheckboxChange(type)} 
                            />
                            {type === 'car' ? "Luxury Car" : type === 'yacht' ? "Yacht" : "Medical Equipment"}
                        </label>
                    ))}
                </div>
                {/* ✅ Dynamic Input Boxes for Updating Cost & Owners */}
                <div className="cost-inputs">
                    {selectedOptions.car && (
                        <div>
                            <label>Luxury Car Cost ($): </label>
                            <input type="number" value={carCost} onChange={(e) => setCarCost(Number(e.target.value))} />
                            <label> Owners: </label>
                            <input type="number" value={carOwners} onChange={(e) => setCarOwners(Number(e.target.value))} />
                        </div>
                    )}
                    {selectedOptions.yacht && (
                        <div>
                            <label>Yacht Cost ($): </label>
                            <input type="number" value={yachtCost} onChange={(e) => setYachtCost(Number(e.target.value))} />
                            <label> Owners: </label>
                            <input type="number" value={yachtOwners} onChange={(e) => setYachtOwners(Number(e.target.value))} />
                        </div>
                    )}
                    {selectedOptions.med && (
                        <div>
                            <label>Medical Equipment Cost ($): </label>
                            <input type="number" value={medCost} onChange={(e) => setMedCost(Number(e.target.value))} />
                            <label> Owners: </label>
                            <input type="number" value={medOwners} onChange={(e) => setMedOwners(Number(e.target.value))} />
                        </div>
                    )}
                </div>

                {/* ✅ Cost Breakdown Table (Full Cost Details) */}
                <table className="cost-breakdown-table">
                    <thead>
                        <tr>
                            <th>Expense Type</th>
                            {selectedOptions.car && <th>Luxury Car</th>}
                            {selectedOptions.yacht && <th>Yacht</th>}
                            {selectedOptions.med && <th>Medical Equipment</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Acquisition Cost</td>
                            {selectedOptions.car && <td>${calcPerOwner(carCost, carOwners)}</td>}
                            {selectedOptions.yacht && <td>${calcPerOwner(yachtCost, yachtOwners)}</td>}
                            {selectedOptions.med && <td>${calcPerOwner(medCost, medOwners)}</td>}
                        </tr>
                        <tr>
                            <td>Maintenance & Upkeep</td>
                            {selectedOptions.car && <td>${calcPerOwner(carMaint, carOwners)}</td>}
                            {selectedOptions.yacht && <td>${calcPerOwner(yachtMaint, yachtOwners)}</td>}
                            {selectedOptions.med && <td>${calcPerOwner(medMaint, medOwners)}</td>}
                        </tr>
                        <tr>
                            <td>Storage & Logistics</td>
                            {selectedOptions.car && <td>${calcPerOwner(carStorage, carOwners)}</td>}
                            {selectedOptions.yacht && <td>${calcPerOwner(yachtStorage, yachtOwners)}</td>}
                            {selectedOptions.med && <td>${calcPerOwner(medStorage, medOwners)}</td>}
                        </tr>
                        <tr>
                            <td>Insurance</td>
                            {selectedOptions.car && <td>${calcPerOwner(carIns, carOwners)}</td>}
                            {selectedOptions.yacht && <td>${calcPerOwner(yachtIns, yachtOwners)}</td>}
                            {selectedOptions.med && <td>${calcPerOwner(medIns, medOwners)}</td>}
                        </tr>
                        <tr>
                            <td>Management Fees</td>
                            {selectedOptions.car && <td>${calcPerOwner(carMgmt, carOwners)}</td>}
                            {selectedOptions.yacht && <td>${calcPerOwner(yachtMgmt, yachtOwners)}</td>}
                            {selectedOptions.med && <td>${calcPerOwner(medMgmt, medOwners)}</td>}
                        </tr>
                        <tr>
                            <td><b>Total Annual Cost</b></td>
                            {selectedOptions.car && <td><b>${calcPerOwner(carMaint + carStorage + carIns + carMgmt, carOwners)}</b></td>}
                            {selectedOptions.yacht && <td><b>${calcPerOwner(yachtMaint + yachtStorage + yachtIns + yachtMgmt, yachtOwners)}</b></td>}
                            {selectedOptions.med && <td><b>${calcPerOwner(medMaint + medStorage + medIns + medMgmt, medOwners)}</b></td>}
                        </tr>
                    </tbody>
                </table>

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
                <p>Explore our infographics and videos to better understand the benefits of fractional ownership.</p>
                
                <div className="visual-container">
                    <div className="image-container">
                        <img src={FractionalOwnershipComparison} alt="Fractional Ownership Comparison Chart" />
                    </div>
                    
                    <div className="video-container">
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/ctF4sk67anA" 
                            title="Fractional Ownership Explainer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
