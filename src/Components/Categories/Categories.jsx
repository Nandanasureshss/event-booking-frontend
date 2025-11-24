import React from "react";
import "./Categories.css";

const categories = [
  {
    id: 1,
    title: "Music",
    image: "/assets/picture1.jpg",
  },
  {
    id: 2,
    title: "Festivals",
    image: "/assets/picture5.jpg",
  },
  {
    id: 3,
    title: "Sports",
    image: "/assets/picture6.jpg",
  },
  {
    id: 4,
    title: "Arts",
    image: "/assets/picture7.jpg",
  },
];

function Categories() {
  return (
    <section className="section">
      <div className="page-container">
        <div className="steps-header">
          <h2 className="section-title">Category</h2>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <img src={cat.image} alt={cat.title} />
              <div className="category-overlay">
                <span>{cat.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
