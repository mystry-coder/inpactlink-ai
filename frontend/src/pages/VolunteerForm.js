import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ReportNeed.css";

export default function VolunteerForm({ setPage }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ added

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !skills || !location || !contact) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "volunteers"), {
        name,
        skills,
        location,
        contact,
        createdAt: serverTimestamp(),
      });

      // ✅ show success message (instead of alert)
      setSuccess(true);

      // reset form
      setName("");
      setSkills("");
      setLocation("");
      setContact("");

      // ✅ optional redirect (same as NeedForm)
      setTimeout(() => {
        setPage("dashboard");
      }, 1000);

    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Volunteer Registration</h2>

      {/* ✅ success message */}
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          Volunteer registered successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="form">

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Skills</label>
        <input
          type="text"
          placeholder="e.g. Medical, Food Distribution"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Contact</label>
        <input
          type="text"
          placeholder="Phone or Email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Register"}
        </button>

      </form>
    </div>
  );
}