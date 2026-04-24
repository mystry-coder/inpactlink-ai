import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle } from "lucide-react"; // Ensure lucide-react is installed
import "./ReportNeed.css";

export default function VolunteerForm({ setPage }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

      // show success message
      setSuccess(true);

      // reset form
      setName("");
      setSkills("");
      setLocation("");
      setContact("");

      // redirect after 1.5 seconds so they can see the success message
      setTimeout(() => {
        setPage("dashboard");
      }, 1500);

    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper animate-fade-in">
      <div className="glass-card form-container">
        
        <div className="form-header">
          <h2 className="form-title">Volunteer Registration</h2>
          <p className="form-subtitle">Join our network and start making an impact</p>
        </div>

        {/* success message */}
        {success && (
          <div className="success-message">
            <CheckCircle size={20} />
            <p>Volunteer registered successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-body">

          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="input-group">
            <label>Skills</label>
            <input
              type="text"
              placeholder="e.g. Medical, Food Distribution"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="City or Area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="input-group">
            <label>Contact</label>
            <input
              type="text"
              placeholder="Phone or Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="glass-input"
            />
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>

        </form>
      </div>
    </div>
  );
}