import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import smileFolder from "../../assets/folder-smile.png";
import DocumentsModal from "./DocumentsModal";

Modal.setAppElement("#root");

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    height: "100%",
    width: "100%",
    marginTop: "2rem",
  },
  button: {
    width: "100px",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#31304D",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:hover": {
      backgroundColor: "#161A30",
    },
  },
  menuButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  catalogsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    justifyItems: "center",
    gap: "1rem",
    padding: "1rem",
    width: "100%",
  },
  catalogCard: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    textAlign: "center",
    transition: "transform 0.3s ease",
    backgroundImage: `url(${smileFolder})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100px",
    width: "100px",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  catalogName: {
    position: "absolute",
    bottom: "-0.5rem",
    backgroundColor: "rgba(247, 223, 146, 0.8)",
    padding: "0.3rem",
    borderRadius: "5px",
    inlineSize: "max-content",
  },
  searchBar: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    fontSize: "1rem",
    transition: "box-shadow 0.3s ease",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  sortButton: {
    width: "200px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#31304D",
    color: "white",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:hover": {
      backgroundColor: "#161A30",
    },
  },
});

interface Catalog {
  id: number;
  name: string;
  description: string;
}

const CatalogList = () => {
  const classes = useStyles();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("/api/children/");
        setCatalogs(response.data);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
  }, []);

  const showDocumentsModal = () => {
    setIsDocumentsModalOpen(true);
  };

  const hideDocumentsModal = () => {
    setIsDocumentsModalOpen(false);
  };

  const filteredCatalogs = catalogs.filter((catalog) =>
    catalog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.wrapper}>
      <h1>Lista dokumentów</h1>
      <div className={classes.menuButtons}>
        <input
          type="text"
          placeholder="Szukaj po nazwie"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className={classes.searchBar}
        />
        <button className={classes.sortButton}>Sortuj alfabetycznie</button>
        <button className={classes.sortButton}>Sortuj po dacie</button>
        {/* <button className={`${classes.button} ${classes.addButton}`} onClick={onAddChild}>+</button>                 */}
      </div>
      <DocumentsModal
        isOpen={isDocumentsModalOpen}
        onRequestClose={hideDocumentsModal}
      />
      <div className={classes.catalogsGrid}>
        {filteredCatalogs.map((catalog) => (
          <div
            key={catalog.id}
            className={classes.catalogCard}
            onClick={showDocumentsModal}
          >
            <div className={classes.catalogName}>{catalog.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
