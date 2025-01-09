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

const Services = () => {
  return (
    <>
      <Header />
      <div className="services-container">
        <h1>Our Services</h1>

        <div className="services-grid">
          <div className="images">
            <div className="service-item">
              <Link to="/login">
                <img src={haircut} alt="Haircut" />
                <h2>Haircut</h2>
              </Link>
            </div>

            <div className="service-item">
              <Link to="/login">
                <img src={beardTrim} alt="Beard Trim" />
                <h2>Beard Trim</h2>
              </Link>
            </div>
          </div>

          <div className="images">
            <div className="service-item">
              <Link to="/login">
                <img src={shaving} alt="Shaving" />
                <h2>Shaving</h2>
              </Link>
            </div>

            <div className="service-item">
              <Link to="/login">
                <img src={facial} alt="Facial" />
                <h2>Facial</h2>
              </Link>
            </div>
          </div>

          <div className="images">
            <div className="service-item">
              <Link to="/login">
                <img src={coloring} alt="HairColoring" />
                <h2>Shampoo & Hair Coloring</h2>
              </Link>
            </div>

            <div className="service-item">
              <Link to="/login">
                <img src={waxing} alt="Waxing" />
                <h2>Waxing</h2>
              </Link>
            </div>
          </div>

          <div className="images">
            <div className="service-item">
              <Link to="/login">
                <img src={bodymassage} alt="Body Massage" />
                <h2>Body Massage</h2>
              </Link>
            </div>

            <div className="service-item">
              <Link to="/login">
                <img src={headmassage} alt="Head Massage" />
                <h2>Head Massage</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;
