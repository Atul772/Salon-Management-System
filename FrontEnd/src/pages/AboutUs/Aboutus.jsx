import React from 'react';
import './Aboutus.css';
import Footer from '../Footer/Footer';
import Header from '../../components/Header/Header';
import hair from '../../assets/images/PaulMitchell.jpeg';
import color from '../../assets/images/GuyTang.jpeg';
import massage from '../../assets/images/TedGibson.jpeg';

const Aboutus = () => {
  return (
    <div className="aboutus-page">
      <Header />
      <div className="aboutus-banner">
        <div className="banner-content">
          <h1>About Our Salon</h1>
          <p>Excellence in beauty and wellness since 2005</p>
        </div>
      </div>
      
      <div className="aboutus-container">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to our Salon Management System. Founded in 2005, we started as a small neighborhood salon with a passion for beauty and customer satisfaction. Over the years, we've grown into a premier destination for all beauty and wellness needs.
          </p>
          <p>
            With years of experience in the beauty and wellness industry, our team understands the unique needs of every client and has developed specialized techniques and services to meet those needs. We aim to create a seamless experience for everyone who walks through our doors, ensuring they leave feeling refreshed, confident, and beautiful.
          </p>
        </section>
        
        <section className="mission-section">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower individuals through beauty and self-care. We believe everyone deserves to feel their best, and our dedicated team works tirelessly to make that happen for each client.
            </p>
            <p>
              We strive to provide exceptional quality in every service, using premium products and cutting-edge techniques. Through continuous training and education, our staff stays ahead of industry trends to bring you the latest in beauty innovations.
            </p>
          </div>
          <div className="mission-image"></div>
        </section>
        
        <section className="values-section">
          <h2>Why Choose Us?</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Expert Stylists</h3>
              <p>Our team consists of certified professionals with years of experience in their specialties.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Premium Products</h3>
              <p>We use only high-quality, sustainable products that deliver exceptional results.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Personalized Service</h3>
              <p>Every client receives a customized experience tailored to their unique needs and preferences.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✓</div>
              <h3>Relaxing Environment</h3>
              <p>Our salon provides a tranquil atmosphere where you can unwind and enjoy your treatment.</p>
            </div>
          </div>
        </section>
        
        <section className="team-section">
          <h2>Meet Our Experts</h2>
          <p className="team-intro">Our talented team of professionals is dedicated to providing you with the best beauty and wellness experience.</p>
          
          <div className="team-container">
            <div className="team-member">
              <div className="member-image">
                <img src={hair} alt="Paul Mitchell" />
              </div>
              <div className="member-info">
                <h3>Paul Mitchell</h3>
                <p className="member-title">Senior Hair Stylist</p>
                <p className="member-desc">With over 15 years of experience, Paul specializes in precision cuts and styling for all hair types.</p>
                <div className="member-specialties">
                  <span>Haircuts</span>
                  <span>Beard Trim</span>
                  <span>Shaving</span>
                </div>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src={color} alt="Guy Tang" />
              </div>
              <div className="member-info">
                <h3>Guy Tang</h3>
                <p className="member-title">Color Specialist</p>
                <p className="member-desc">Guy is renowned for his innovative color techniques and transformative hair treatments.</p>
                <div className="member-specialties">
                  <span>Shampoo</span>
                  <span>Hair Coloring</span>
                  <span>Waxing</span>
                </div>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src={massage} alt="Ted Gibson" />
              </div>
              <div className="member-info">
                <h3>Ted Gibson</h3>
                <p className="member-title">Wellness Therapist</p>
                <p className="member-desc">Ted brings a holistic approach to wellness, specializing in rejuvenating massage and facial treatments.</p>
                <div className="member-specialties">
                  <span>Facial</span>
                  <span>Face Massage</span>
                  <span>Body Massage</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
