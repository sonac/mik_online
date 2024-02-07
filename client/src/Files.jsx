import { Link, useLoaderData } from "react-router-dom";
import "./App.css";

const fetchFiles = async (dir) => {
  console.log(dir);
  const res = await fetch(`/api/list-files/${dir}`);
  const data = await res.json();
  console.log(data);
  return data;
};

export const loader = async ({ params }) => {
  console.log(params.dir);
  const files = await fetchFiles(params.dir);
  return { files, dir: params.dir };
};

const pdfToPngFileName = (pdfFileName) => {
  return pdfFileName.replace(".pdf", ".png");
};

export default function Files() {
  const { files, dir } = useLoaderData();

  const pdfToUrl = (pdfFileName) => {
    const pdfPath = dir + "/" + pdfFileName;
    return `/api/pdf/${pdfPath}`;
  };

  return (
    <>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <div className="files-grid">
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
    </>
  );
}
