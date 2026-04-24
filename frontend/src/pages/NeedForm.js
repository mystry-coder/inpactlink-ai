import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle } from "lucide-react"; 

export default function NeedForm({ setPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !description || !location || !urgency) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "needs"), {
        title,
        description,
        location,
        urgency,
        createdAt: serverTimestamp(),
      });

      // show success message
      setSuccess(true);

      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setUrgency("");

      // redirect after 1.5 seconds
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
          <h2 className="form-title">Report a Need</h2>
          <p className="form-subtitle">Help us make a difference in your community</p>
        </div>

        {/* success message */}
        {success && (
          <div className="success-message">
            <CheckCircle size={20} />
            <p>Need submitted successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-body">
          
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="E.g., Winter Coats for Shelter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              placeholder="Describe the need in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input textarea-input"
              rows="4"
            />
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="City, Neighborhood, or Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="glass-input"
            />
          </div>

          <div className="input-group">
            <label>Urgency</label>
            <div className="select-wrapper">
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="glass-input select-input"
              >
                <option value="">Select Urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div className="select-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Need"}
          </button>

        </form>
      </div>
    </div>
  );
}