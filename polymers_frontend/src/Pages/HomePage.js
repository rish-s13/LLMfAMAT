import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <header className="HomePage-header">
        <h1>Welcome to the LLM For Advanced Materials Project</h1>
        <p style={{ fontSize: '1.5rem' }}>Generating new polymers from existing properties with a focus on sustainability</p>
      </header>
      <section className="HomePage-section HomePage-section-alt">
        <div className="HomePage-section-button">
          <Link to="/search" className="HomePage-link">Explore Search</Link>
        </div>
        <div className="HomePage-section-content">
          <h2>Search</h2>
          <p>Find and explore various polymer materials.</p>
        </div>
      </section>
      <section className="HomePage-section">
        <div className="HomePage-section-button">
          <Link to="/about" className="HomePage-link">Read About Us</Link>
        </div>
        <div className="HomePage-section-content">
          <h2>About</h2>
          <p>Learn more about our project and team.</p>
        </div>
      </section>
      <section className="HomePage-section HomePage-section-alt">
        <div className="HomePage-section-button">
          <Link to="/contact" className="HomePage-link">Contact Us</Link>
        </div>
        <div className="HomePage-section-content">
          <h2>Contact</h2>
          <p>Get in touch with us for more information or inquiries.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
