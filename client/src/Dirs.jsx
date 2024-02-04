import React, { useState } from "react";
import Files from "./Files";

export default function Dirs(props) {
  const [showFiles, setShowFiles] = useState(false);

  const handleClick = () => {
    setShowFiles(!showFiles);
  };

  return (
    <>
      {props.dirs.map((dir) => {
        return (
          <div key={dir}>
            {showFiles ? (
              <Files dir={dir} />
            ) : (
              <div onClick={handleClick}>
                <img className="folder" src="/public/folder.svg" alt="folder" />
                <h1>{dir}</h1>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
