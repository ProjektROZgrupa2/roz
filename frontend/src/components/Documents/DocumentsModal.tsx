import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileImage,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  documentsModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "1rem",
    padding: "3rem",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #31304D",
    backgroundColor: "rgba(247, 223, 146, 0.8)",
    borderRadius: "2rem",
    width: "50%",
    height: "50%",
    marginTop: "3rem",
  },
  catalogFiles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    width: "100%",
  },
  fileList: {
    listStyle: "none",
    padding: "0",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    border: "1px solid #31304D",
    fontSize: "1.2rem",
  },
  icon: {
    marginRight: "0.5rem",
  },
});

type DocumentsModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  folder: string;
};

interface File {
  file: string;
  id: string;
}

const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onRequestClose,
  folder,
}) => {
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (folder) {
      setIsLoading(true);
      axios
        .get(`http://localhost:8000/api/child-files/?child_name=${folder}`)
        .then((response) => {
          setFiles(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching files: ", error);
          setIsLoading(false);
        });
    }
  }, [folder]);

  const splitName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FontAwesomeIcon icon={faFilePdf} className={classes.icon} />;
      case "doc":
      case "docx":
        return <FontAwesomeIcon icon={faFileWord} className={classes.icon} />;
      case "xls":
      case "xlsx":
        return <FontAwesomeIcon icon={faFileExcel} className={classes.icon} />;
      case "jpg":
      case "jpeg":
      case "png":
        return <FontAwesomeIcon icon={faFileImage} className={classes.icon} />;
      default:
        return <FontAwesomeIcon icon={faFileAlt} className={classes.icon} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.documentsModal}
      contentLabel="Documents Modal"
    >
      {isLoading ? (
        <p>Ładowanie plików...</p>
      ) : (
        <div className={classes.catalogFiles}>
          <h2>Pliki dla {splitName(folder)}</h2>
          <ul className={classes.fileList}>
            {files.map((file, index) => (
              <li key={index} className={classes.fileItem}>
                <a
                  href={`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getFileIcon(file.file)}
                  {file.file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default DocumentsModal;
