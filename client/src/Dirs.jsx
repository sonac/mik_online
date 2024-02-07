import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dirs() {
  const [dirs, setDirs] = useState([]);

  const fetchDirs = async () => {
    const res = await fetch("/api/dirs");
    const data = await res.json();
    setDirs(data);
  };

  useEffect(() => {
    fetchDirs();
  }, []);

  return (
    <>
      {dirs.map((dir) => (
        <div key={dir}>
          <Link to={`/files/${dir}`}>
            <img className="folder" src="/public/folder.svg" alt="folder" />
            <h1>{dir}</h1>
          </Link>
        </div>
      ))}
    </>
  );
}
