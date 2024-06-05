import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";

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
});

type DocumentsModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const DocumentsModal: React.FC<DocumentsModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const classes = useStyles();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.documentsModal}
      contentLabel="Documents Modal"
    >
      <h1>Documents Modal</h1>
    </Modal>
  );
};

export default DocumentsModal;
