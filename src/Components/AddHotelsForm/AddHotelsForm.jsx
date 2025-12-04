import React, { useState } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddHotelsForm.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function AddHotelsForm() {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    about: "",
    time: "",
    category: "3 Star",
    features: [{ text: "Special Feature", images: [] }],
  });

  const handleFeatureChange = (index, value) => {
    const updated = [...hotel.features];
    updated[index].text = value;
    setHotel({ ...hotel, features: updated });
  };

  const addFeature = () => {
    setHotel({
      ...hotel,
      features: [...hotel.features, { text: "Special Feature", images: [] }],
    });
  };

  const handleImageUpload = (index, fileList) => {
    const files = Array.from(fileList);

    const previews = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));

    const updated = [...hotel.features];
    updated[index].images = previews;

    setHotel({ ...hotel, features: updated });
  };

  const handleSubmit = () => {
    const saved = JSON.parse(localStorage.getItem("hotels")) || [];
    saved.push(hotel);
    localStorage.setItem("hotels", JSON.stringify(saved));
    navigate("/admin/hotels");
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
        <div className="addHotelWrapper">
          <div className="addHotelLeft">
            <h2>List New Hotel</h2>

            <label>Hotel Name</label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
            />

            <label>Location</label>
            <input
              type="text"
              placeholder="Location"
              onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
            />

            <label>About</label>
            <input
              type="text"
              placeholder="About"
              onChange={(e) => setHotel({ ...hotel, about: e.target.value })}
            />

            <label>Time</label>
            <input
              type="time"
              onChange={(e) => setHotel({ ...hotel, time: e.target.value })}
            />

            <label>Hotel Category</label>
            <select
              onChange={(e) => setHotel({ ...hotel, category: e.target.value })}
            >
              <option>3 Star</option>
              <option>4 Star</option>
              <option>5 Star</option>
            </select>

            <label>Special Features</label>

            {hotel.features.map((f, index) => (
              <input
                key={index}
                type="text"
                value={f.text}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}

            <button className="addFeatureBtn" onClick={addFeature}>
              +
            </button>
          </div>

          <div className="addHotelRight">
            <h3>Media Upload</h3>
            <p>Upload images for each feature</p>

            {hotel.features.map((f, index) => (
              <div className="uploadBlock" key={index}>
                <label className="uploadBox">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(index, e.target.files)}
                  />

                  {f.images.length === 0 && (
                    <span className="uploadIcon">
                      <AiOutlineCloudUpload />
                    </span>
                  )}

                  {f.images.length > 0 && (
                    <div className="previewContainer">
                      {f.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.preview}
                          alt={`feature-${index}-${i}`}
                          className="previewThumb"
                        />
                      ))}
                    </div>
                  )}
                </label>
              </div>
            ))}

            <button className="submitHotelBtn" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHotelsForm;
