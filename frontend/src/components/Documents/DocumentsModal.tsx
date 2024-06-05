import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import axios from "axios";

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
    width: "80%",
    height: "80%",
    marginTop: "3rem",
  },
  fileList: {
    listStyle: "none",
    padding: "0",
  },
  fileItem: {
    padding: "0.5rem 0",
    borderBottom: "1px solid #ccc",
  },
});

type DocumentsModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  folder: string;
};

const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onRequestClose,
  folder,
}) => {
  const classes = useStyles();
  const [files, setFiles] = useState<{ file: any }[]>([]);

  useEffect(() => {
    if (folder) {
      axios
        .get(`/api/child-files/?child_name=${folder}`)
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.log("Error fetching files: ", error);
        });
    }
  }, [folder]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.documentsModal}
      contentLabel="Documents Modal"
    >
      <h2>Pliki dla {folder}</h2>
      <ul className={classes.fileList}>
        {files.map((file, index) => (
          <li key={index} className={classes.fileItem}>
            {file.file}
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default DocumentsModal;
