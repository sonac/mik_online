import { useEffect, useState } from "react";
import "./App.css";

const pdfToPngFileName = (pdfFileName) => {
  return pdfFileName.replace(".pdf", ".png");
};

export default function Files(props) {
  const [files, setFiles] = useState([]);

  const fetchFiles = async (dir) => {
    const res = await fetch(`/api/list-files/${dir}`);
    const data = await res.json();
    setFiles(data);
  };

  const pdfToUrl = (pdfFileName) => {
    const pdfPath = props.dir + "/" + pdfFileName;
    return `/api/pdf/${pdfPath}`;
  };

  useEffect(() => {
    fetchFiles(props.dir);
  }, []);

  return (
    <div className="files-grid">
      {" "}
      {/* This div acts as the grid container */}
      {files.map((file) => (
        <div className="file-container" key={file}>
          {" "}
          {/* Each file gets its own container */}
          <a href={pdfToUrl(file)} target="_blank" rel="noopener noreferrer">
            <img
              className="file"
              src={"/public/" + pdfToPngFileName(file)}
              alt="file"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
