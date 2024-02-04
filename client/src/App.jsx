import { useState, useEffect } from "react";
import Dirs from "./Dirs";
import "./App.css";

export default function App() {
  const [dirs, setDirs] = useState([]);

  const fetchDirs = async () => {
    const res = await fetch("/api/dirs");
    const data = await res.json();
    setDirs(data);
  };

  return (
    <>
      {dirs.length === 0 ? (
        <div>
          <div onClick={fetchDirs}>
            <h1 className="readMik">Read MIK Online</h1>
          </div>
        </div>
      ) : (
        <Dirs dirs={dirs} />
      )}
    </>
  );
}
