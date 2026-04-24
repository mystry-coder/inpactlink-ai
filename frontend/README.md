# 🌐 ImpactLink AI – Frontend

This is the **frontend module** of the ImpactLink AI project, built using **React.js** and integrated with **Firebase Firestore**.

---

## Overview

ImpactLink AI is a platform designed to **connect people in need with volunteers**.

The frontend provides:

* A simple interface to report needs
* Volunteer registration system
* Real-time dashboard to view submitted needs

---

##Tech Stack

* ⚛️ React.js
* 🔥 Firebase (Firestore)
* 🎨 CSS (Glassmorphism UI)
* 🎯 Lucide React (icons)

---

## 📄 Features

###1. Need Form

* Users can report needs
* Fields:

  * Title
  * Description
  * Location
  * Urgency
* Data stored in Firestore
* Success message + auto redirect

---

###2. Volunteer Registration

* Volunteers can register with:

  * Name
  * Skills
  * Location
  * Contact
* Data stored in Firestore

---

###3. Dashboard

* Displays all needs in real-time
* Sorted by latest entries
* Shows:

  * Title
  * Description
  * Location
  * Urgency level
* Clean card-based UI

---

###Navigation

* Simple page switching using React state
* Smooth user experience

---

## How to Run

```bash
cd frontend
npm install
npm start
```

---

##Project Structure

```text
frontend/
 ├── src/
 │   ├── pages/
 │   │   ├── NeedForm.js
 │   │   ├── VolunteerForm.js
 │   │   ├── Dashboard.js
 │   ├── App.js
 │   ├── firebase/
 │   └── styles/
 ├── public/
 ├── package.json
```

---

##Firebase Setup

Make sure Firebase config is added in:

```text
src/firebase/config.js
```

---

##Future Improvements

* 🤖 AI-based matching between needs and volunteers
* 📍 Location-based filtering
* 📊 Analytics dashboard
* 🔔 Notifications

---

## Contributor (Frontend)

**Gautam Kumar Rajak**

* React UI Development
* Firebase Integration
* UX & Styling

---

## 📌 Note

This is a **prototype frontend** built for rapid development and demonstration purposes.
