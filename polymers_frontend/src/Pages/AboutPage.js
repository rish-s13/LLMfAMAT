import React from 'react';
import '../CSS/AboutPage.css';

function AboutPage() {
  return (
    <div className="about">
      <h1 style={{ fontSize: '2em', textAlign: 'center' }}>About This Project</h1>
      <p>
        Our project is driven by the ambition to revolutionize materials science through the innovative use of a fine-tuned language model (LLM).
        By leveraging the power of modern AI techniques, we have developed a sophisticated platform capable of predicting and designing advanced materials with remarkable precision.
      </p>
      <p>
        Our approach involves meticulously analyzing vast datasets and extracting valuable insights to inform the creation of custom materials tailored to specific needs and requirements.
        From predicting mechanical properties to exploring novel chemical compositions, our platform empowers researchers and engineers to explore a vast landscape of possibilities.
      </p>
      <p>
        Our ultimate goal is to facilitate the discovery and development of cutting-edge materials that address pressing societal challenges, from enhancing sustainability in manufacturing processes to advancing renewable energy technologies.
        With a relentless focus on innovation and collaboration, we are committed to pushing the boundaries of materials science and unlocking new frontiers of discovery.
      </p>
      </div>
  );
}

export default AboutPage;
