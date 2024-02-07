import { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

export default function App() {
  const [dirs, setDirs] = useState([]);

  const fetchDirs = async () => {
    const res = await fetch("/api/dirs");
    const data = await res.json();
    setDirs(data);
  };

  return (
    <>
      <Link to="/dirs">
        <h1>Read MIK Online</h1>
      </Link>
    </>
  );
}
