import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import "./ReportNeed.css";

export default function Dashboard() {
  const [needs, setNeeds] = useState([]);

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
    }
  };

  return (
    <div className="dashboard">
      <h2>All Needs</h2>

      {needs.length === 0 ? (
        <p>No needs found</p>
      ) : (
        needs.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>📍 {item.location}</p>
            <p>Urgency: {item.urgency}</p>
          </div>
        ))
      )}
    </div>
  );
}

