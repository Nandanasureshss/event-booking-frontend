import React, { useState } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddEvent.css";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    eventCategory: "",
    seatingCategories: ["Category 1", "Category 2"],
    pricing: {},
    images: []
  });

  const handleSeatingChange = (index, value) => {
    const updated = [...formData.seatingCategories];
    updated[index] = value;

    setFormData({
      ...formData,
      seatingCategories: updated
    });
  };

  const addNewCategory = () => {
    setFormData({
      ...formData,
      seatingCategories: [...formData.seatingCategories, `Category ${formData.seatingCategories.length + 1}`]
    });
  };

  const handlePricingChange = (category, field, value) => {
    setFormData({
      ...formData,
      pricing: {
        ...formData.pricing,
        [category]: {
          ...formData.pricing[category],
          [field]: value
        }
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("events")) || [];
    saved.push(formData);
    localStorage.setItem("events", JSON.stringify(saved));

    navigate("/admin/events");
  };

  return (
    <div className="adminEventsPage">
      <div className="adminEventsHeader">
        <Topbar />
      </div>

      <div className="adminEventsSidebar">
        <AdminSidebar />
      </div>

      <div className="adminEventsContainer">
        <div className="addEventWrapper">

          <div className="addEventLeft">
            <h2>Add New Event</h2>

            <form onSubmit={handleSubmit}>
              <label>Event Name</label>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <label>Location</label>
              <input
                type="text"
                placeholder="Location"
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <label>Date</label>
              <input
                type="date"
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <label>Time</label>
              <input
                type="time"
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />

              <label>Event Category</label>
              <input
                type="text"
                placeholder="Music / Sports / Expo"
                onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
              />

              <label>Seating Categories</label>

              {formData.seatingCategories.map((cat, index) => (
                <input
                  key={index}
                  type="text"
                  value={cat}
                  onChange={(e) => handleSeatingChange(index, e.target.value)}
                />
              ))}

              <button type="button" className="addCategoryBtn" onClick={addNewCategory}>
                + Add Category
              </button>
            </form>
          </div>

          <div className="addEventRight">
            <h2>Price based on Seating Category</h2>

            {formData.seatingCategories.map((cat, index) => (
              <div className="priceBlock" key={index}>
                <label>{cat} Price</label>
                <input
                  type="number"
                  placeholder="$ 120.00"
                  onChange={(e) => handlePricingChange(cat, "price", e.target.value)}
                />

                <label>{cat} Tickets</label>
                <input
                  type="number"
                  placeholder="1200"
                  onChange={(e) => handlePricingChange(cat, "tickets", e.target.value)}
                />
              </div>
            ))}

            <label>Media Upload</label>
            <input type="file" multiple onChange={handleImageUpload} />

            <div className="imagePreview">
              {formData.images.map((img, i) => (
                <img key={i} src={URL.createObjectURL(img)} alt="" />
              ))}
            </div>

            <button className="addEventSubmitBtn" onClick={handleSubmit}>
              Add Event
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddEvent;
