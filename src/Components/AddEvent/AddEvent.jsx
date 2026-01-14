import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddEvent.css";
import axios from "../../api/axios";

const EVENT_CATEGORIES = [
  "Music",
  "Dance Show",
  "Stage Show",
  "Comedy Show",
  "DJ Night",
  "Theatre"
];

function AddEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    eventCategory: "",
    isPopular: false,
    ticketType: "online",
    seatingCategories: [],
    images: []
  });

  const addNewCategory = () => {
    setFormData({
      ...formData,
      seatingCategories: [
        ...formData.seatingCategories,
        {
          name: `Category ${formData.seatingCategories.length + 1}`,
          price: "",
          purchasePrice: "",
          tickets: "",
          ticketPdf: null
        }
      ]
    });
  };

  const handleCategoryChange = (index, field, value) => {
    const updated = [...formData.seatingCategories];
    updated[index][field] = value;
    setFormData({ ...formData, seatingCategories: updated });
  };

  const handlePdfUpload = (index, file) => {
    const updated = [...formData.seatingCategories];
    updated[index].ticketPdf = file;
    setFormData({ ...formData, seatingCategories: updated });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("eventName", formData.title);
    payload.append("location", formData.location);
    payload.append("date", formData.date);
    payload.append("time", formData.time);
    payload.append("eventCategory", formData.eventCategory);
    payload.append("isPopular", formData.isPopular);
    payload.append("ticketType", formData.ticketType);

    payload.append(
      "seatingCategories",
      JSON.stringify(
        formData.seatingCategories.map(({ ticketPdf, ...rest }) => rest)
      )
    );

    formData.seatingCategories.forEach((cat, index) => {
      if (cat.ticketPdf) {
        payload.append(`ticketPdf_${index}`, cat.ticketPdf);
      }
    });

    formData.images.forEach((img) => payload.append("mediaFiles", img));

   const res = await axios.post(
  "/api/events/add-event",
  payload,
  { headers: { "Content-Type": "multipart/form-data" } }
);


    if (res.data.success) navigate("/admin/events");
  };

  return (
    <div className="adminEventsPage">
      <div className="adminEventsHeader"><Topbar /></div>
      <div className="adminEventsSidebar"><AdminSidebar /></div>

      <div className="adminEventsContainer">
        <div className="addEventWrapper">

          <div className="addEventLeft">
            <h2>Add New Event</h2>

            <form onSubmit={handleSubmit}>
              <label>Event Name</label>
              <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

              <label>Location</label>
              <input onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

              <label>Date</label>
              <input type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />

              <label>Time</label>
              <input type="time" onChange={(e) => setFormData({ ...formData, time: e.target.value })} />

              <label>Event Category</label>
              <select
                value={formData.eventCategory}
                onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
              >
                <option value="">Select</option>
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label>Mark as Popular</label>
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              />

              <label>Ticket Type</label>
              <div className="ticketTypeToggle">
                <label>
                  <input
                    type="radio"
                    value="online"
                    checked={formData.ticketType === "online"}
                    onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
                  />
                  Online Ticket
                </label>

                <label>
                  <input
                    type="radio"
                    value="pdf"
                    checked={formData.ticketType === "pdf"}
                    onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
                  />
                  PDF Ticket
                </label>
              </div>

              {formData.seatingCategories.length > 0 && (
                <div className="categoryTabs">
                  {formData.seatingCategories.map((cat, index) => (
                    <div key={index} className="categoryTab">
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}

              <button type="button" className="addCategoryBtn" onClick={addNewCategory}>
                + Add Category
              </button>
            </form>
          </div>

          <div className="addEventRight">
            <h2>Price based on Seating Category</h2>

            {formData.seatingCategories.map((cat, index) => (
              <div className="priceBlock" key={index}>
                <h4>{cat.name}</h4>

                <label>Category Price</label>
                <input type="number" onChange={(e) => handleCategoryChange(index, "price", e.target.value)} />

                <label>Purchase Price</label>
                <input type="number" onChange={(e) => handleCategoryChange(index, "purchasePrice", e.target.value)} />

                <label>Tickets Available</label>
                <input type="number" onChange={(e) => handleCategoryChange(index, "tickets", e.target.value)} />

                {formData.ticketType === "pdf" && (
                  <>
                    <label>Upload {cat.name} Ticket PDF</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handlePdfUpload(index, e.target.files[0])}
                    />
                  </>
                )}
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
