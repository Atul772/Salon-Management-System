import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import haircut from "../../assets/images/Haircut.jpg"; 
import beardTrim from "../../assets/images/BeardTrim.jpg";
import shaving from "../../assets/images/Shaving.jpg";
import facial from "../../assets/images/Facial.jpg";
import waxing from "../../assets/images/Waxing.jpg";
import coloring from "../../assets/images/Shampoo&Coloring.jpg";
import headmassage from '../../assets/images/HeadMassage.jpg';
import bodymassage from '../../assets/images/BodyMassage.jpg';
import Footer from '../Footer/Footer';
import Header from '../../components/Header/Header';
import { FaClock, FaMoneyBillWave, FaArrowRight, FaStar } from 'react-icons/fa';

const Services = () => {
  // Service data with details
  const servicesList = [
    {
      id: 1,
      name: "Haircut",
      description: "Professional haircuts for all hair types",
      image: haircut,
      price: "₹500",
      duration: "30 min",
      rating: 4.8
    },
    {
      id: 2,
      name: "Beard Trim",
      description: "Expert beard trimming and shaping",
      image: beardTrim,
      price: "₹300",
      duration: "20 min",
      rating: 4.7
    },
    {
      id: 3,
      name: "Shaving",
      description: "Clean shave service with hot towel",
      image: shaving,
      price: "₹400",
      duration: "25 min",
      rating: 4.6
    },
    {
      id: 4,
      name: "Facial",
      description: "Rejuvenating facial treatment for glowing skin",
      image: facial,
      price: "₹700",
      duration: "40 min",
      rating: 4.9
    },
    {
      id: 5,
      name: "Hair Coloring",
      description: "Premium hair coloring with quality products",
      image: coloring,
      price: "₹1,500",
      duration: "60 min",
      rating: 4.8
    },
    {
      id: 6,
      name: "Waxing",
      description: "Gentle and effective waxing services",
      image: waxing,
      price: "₹800",
      duration: "45 min",
      rating: 4.5
    },
    {
      id: 7,
      name: "Body Massage",
      description: "Relaxing full body massage therapy",
      image: bodymassage,
      price: "₹1,200",
      duration: "60 min",
      rating: 4.9
    },
    {
      id: 8,
      name: "Head Massage",
      description: "Therapeutic head massage for stress relief",
      image: headmassage,
      price: "₹500",
      duration: "30 min",
      rating: 4.7
    }
  ];

  return (
    <>
      <Header />
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Our Premium Salon Services</h1>
          <p>Experience the best grooming and relaxation services with our skilled professionals</p>
          <Link to="/login" className="book-now-btn">
            Book Your Appointment <FaArrowRight />
          </Link>
        </div>
      </div>

      <div className="services-container">
        <div className="services-intro">
          <h2>Why Choose Our Services</h2>
          <p>At our salon, we pride ourselves on delivering exceptional service with premium products and skilled professionals. Every visit guarantees a refreshing experience tailored to your needs.</p>
        </div>

        <div className="services-grid">
          {servicesList.map(service => (
            <div className="service-card" key={service.id}>
              <div className="service-image">
                <img src={service.image} alt={service.name} />
                <div className="service-rating">
                  <FaStar /> {service.rating}
                </div>
              </div>
              <div className="service-content">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-details">
                  <span><FaClock /> {service.duration}</span>
                  <span><FaMoneyBillWave /> {service.price}</span>
                </div>
                <Link to="/login" className="service-btn">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <h2>Ready to Experience Our Services?</h2>
          <p>Sign in to book your appointment and enjoy our premium services</p>
          <Link to="/login" className="cta-btn">Sign In & Book Now</Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Services;
