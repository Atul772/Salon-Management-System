// Body.js
import React from 'react';
import './Body.css'; // Import the corresponding CSS for the body component
import salonImage from "../../assets/images/Saloon.jpg";
import Header from '../../components/Header/Header';
import Typed from 'typed.js';
import { useEffect } from 'react';
import Footer from '../Footer/Footer';

const Body = () => {

    useEffect(() => {
        const typed = new Typed(".welcome", {
            strings: ["Welcome to Our Salon...."],
            typeSpeed: 50,
            backSpeed: 20,
            backDelay: 400,
            loop: true
        });
        return () => {
            typed.destroy();
       };
    }, []);

    useEffect(() => {
        const typed = new Typed(".description", {
            strings: ["Your beauty is our passion...."],
            typeSpeed: 60,
            backSpeed: 20,
            backDelay: 400,
            loop: true
        });
        return () => {
            typed.destroy();
      };
        }, []);


    return (
      <>
      <Header/>
        <div className="body-container">
            <section className="hero-section">
                <img src={salonImage} alt="Salon" className="hero-image" />
                <div className="auth-section">
                    <h2><span className="welcome"></span></h2>
                    <p><span className="description"></span></p>
                </div>
            </section>
            <Footer/>
        </div>
      </>
    );
};

export default Body;