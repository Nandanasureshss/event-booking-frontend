import React, { useState } from "react";
import Topbar from "../../pages/Topbar/Topbar";
import AdminSidebar from "../../pages/AdminSidebar/AdminSidebar";
import "./AddHotelsForm.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function AddHotelsForm() {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    about: "",
    features: [
      { text: "Deluxe", price: "", rooms: "", images: [] }
    ]
  });

  const handleFeatureChange = (index, field, value) => {
    const updated = [...hotel.features];
    updated[index][field] = value;
    setHotel({ ...hotel, features: updated });
  };

  const addFeature = () => {
    setHotel({
      ...hotel,
      features: [
        ...hotel.features,
        { text: "Room Type", price: "", rooms: "", images: [] }
      ]
    });
  };

  const handleImageUpload = (index, fileList) => {
    const files = Array.from(fileList);
    const updated = [...hotel.features];
    updated[index].images = files;
    setHotel({ ...hotel, features: updated });
  };

  const handleSubmit = async () => {
    try {
      const roomCategories = hotel.features.map((f) => ({
        name: f.text,
        price: Number(f.price),
        roomsAvailable: Number(f.rooms)
      }));

      const formData = new FormData();
      formData.append("hotelName", hotel.name);
      formData.append("location", hotel.location);
      formData.append("description", hotel.about);
      formData.append("roomCategories", JSON.stringify(roomCategories));

      hotel.features.forEach((f) => {
        f.images.forEach((img) => {
          formData.append("mediaFiles", img);
        });
      });

     const res = await axios.post(
  "/api/hotels/add-hotel",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);

      if (res.data.success) {
        navigate("/admin/hotels");
      }

    } catch (error) {
      console.error("Hotel creation failed:", error);
      alert("Failed to add hotel");
    }
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

          {/* LEFT */}
          <div className="addHotelLeft">
            <h2>List New Hotel</h2>

            <label>Hotel Name</label>
            <input
              type="text"
              onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
            />

            <label>Location</label>
            <input
              type="text"
              onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
            />

            <label>Description</label>
            <input
              type="text"
              onChange={(e) => setHotel({ ...hotel, about: e.target.value })}
            />

            <label>Room Categories</label>

            {hotel.features.map((f, index) => (
              <div key={index} className="roomCategoryBlock">
                <input
                  type="text"
                  placeholder="Room Type"
                  value={f.text}
                  onChange={(e) =>
                    handleFeatureChange(index, "text", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={f.price}
                  onChange={(e) =>
                    handleFeatureChange(index, "price", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Rooms Available"
                  value={f.rooms}
                  onChange={(e) =>
                    handleFeatureChange(index, "rooms", e.target.value)
                  }
                />
              </div>
            ))}

            <button className="addFeatureBtn" onClick={addFeature}>
              + Add Room Category
            </button>
          </div>

          {/* RIGHT */}
          <div className="addHotelRight">
            <h3>Media Upload</h3>

            {hotel.features.map((f, index) => (
              <div className="uploadBlock" key={index}>
                <label className="uploadBox">
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleImageUpload(index, e.target.files)
                    }
                  />

                  {f.images.length === 0 ? (
                    <span className="uploadIcon">
                      <AiOutlineCloudUpload />
                    </span>
                  ) : (
                    <div className="previewContainer">
                      {f.images.map((img, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(img)}
                          className="previewThumb"
                          alt=""
                        />
                      ))}
                    </div>
                  )}
                </label>
              </div>
            ))}

            <button className="submitHotelBtn" onClick={handleSubmit}>
              Add Hotel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddHotelsForm;
