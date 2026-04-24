import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ReportNeed.css";

export default function NeedForm({ setPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ added

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

      // ✅ show success message
      setSuccess(true);

      // reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setUrgency("");

      // ✅ redirect after 1 second
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
    <div style={styles.container}>
      <h2>Report a Need</h2>

      {/* ✅ success message */}
      {success && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          Need submitted successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label>Description</label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />

        <label>Location</label>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />

        <label>Urgency</label>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Urgency</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Submitting..." : "Submit Need"}
        </button>

      </form>
    </div>
  );
}


// Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "80px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};