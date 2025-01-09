import React from 'react';
import './Aboutus.css';
import Footer from '../Footer/Footer';
import Header from '../../components/Header/Header';
import hair from '../../assets/images/PaulMitchell.jpeg';
import color from '../../assets/images/GuyTang.jpeg';
import massage from '../../assets/images/TedGibson.jpeg';

const Aboutus = () => {
  return (
    <div>
      <Header />
      <div className="aboutus-container">
        <h1>About Us</h1>
        <p>
          Welcome to our Salon. We are a professional and dedicated team committed to providing top-notch
          services to all our Customers.
          With years of experience in the beauty and wellness industry, our team understands the unique needs of people
         and has developed this system to simplify everyday tasks. We aim to create a seamless experience for
          both salon professionals and our clients, ensuring everyone gets the attention they deserve.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower salons with the tools they need to streamline operations, enhance customer
          satisfaction, and grow their business. By providing a user-friendly platform, we help salons focus more on
          what matters the most—delivering exceptional beauty services.
        </p>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Easy-to-use booking and scheduling system</li>
          <li>Comprehensive client management tools</li>
          <li>Customizable options for salons of all sizes</li>
          <li>24/7 customer support and training</li>
        </ul>
        <p>Thank you for choosing our Salon. We look forward to being part of your salon's success story!</p>
        <div  className="team-title">
         <h1>Our Team</h1>
         </div>
    
        <div className="team-container">
          <div className="team-member">
            <img src={hair} alt="Random 1" />
            <h3>Paul Mitchell </h3>
            <ul>
              <li>Haircuts</li>
              <li>Beard Trim</li>
              <li>Shaving</li>
            </ul>
          </div>
          <div className="team-member">
            <img src={color} alt="Random 2" />
            <h3>Guy Tang</h3>
            <ul>
              <li>Shampoo</li>
              <li>Hair Coloring</li>
              <li>Waxing</li>
            </ul>
          </div>
          <div className="team-member">
            <img src={massage} alt="Random 3" />
            <h3>Ted Gibson</h3>
            <ul>
              <li>Facial</li>
              <li>Face Massage</li>
              <li>Body Massage</li>
            </ul>
          </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
