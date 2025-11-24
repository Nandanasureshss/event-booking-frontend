import React from "react";
import "./Steps.css";

const steps = [
  {
    id: 1,
    title: "Find your Event",
    description: "Search and discover events matching your interest & mood.",
    icon: "/assets/logo1.jpg",
  },
  {
    id: 2,
    title: "Book Tickets & Hotel",
    description: "Choose seats, add hotel stay and complete secure payment.",
    icon: "/assets/logo2.jpg",
  },
  {
    id: 3,
    title: "Confirm & Enjoy",
    description: "Receive instant confirmation and enjoy your experience.",
    icon: "/assets/logo3.jpg",
  },
];

function Steps() {
  return (
    <section className="section steps-section">
      <div className="page-container">
        <div className="steps-header">
          <h2 className="section-title">Book your Event in 3 easy steps</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.id} className="step-card">
              <div className="step-icon-wrap">
                <img src={step.icon} alt={step.title} />
              </div>
              <h3 className="titlestepshomepage">{step.title}</h3>
              <p className="parastephomepage"> {step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Steps;
