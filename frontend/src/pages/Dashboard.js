import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { MapPin, AlertCircle } from "lucide-react"; 
import "./ReportNeed.css";

export default function Dashboard() {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNeeds();
  }, []);

  const fetchNeeds = async () => {
    try {
      const q = query(collection(db, "needs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNeeds(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'High': return 'urgency-high';
      case 'Medium': return 'urgency-medium';
      case 'Low': return 'urgency-low';
      default: return 'urgency-default';
    }
  };

  return (
    <div className="dashboard-wrapper animate-fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">All Needs</h2>
        <div className="glass-card live-indicator">
          <div className="pulse-dot"></div>
          Live Updates
        </div>
      </div>

      {loading ? (
        <p style={{ color: "var(--color-text-secondary)", textAlign: "center" }}>Loading needs...</p>
      ) : needs.length === 0 ? (
        <p style={{ color: "var(--color-text-secondary)", textAlign: "center" }}>No needs found in your community yet.</p>
      ) : (
        <div className="cards-grid">
          {needs.map((item) => (
            <div key={item.id} className="glass-card need-card">
              
              <div className="card-header">
                <h3 className="card-title">{item.title}</h3>
                <span className={`urgency-badge ${getUrgencyClass(item.urgency)}`}>
                  <AlertCircle size={12} />
                  {item.urgency}
                </span>
              </div>
              
              <p className="card-description">
                {item.description}
              </p>
              
              <div className="card-footer">
                <MapPin size={16} className="location-icon" />
                {item.location}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}