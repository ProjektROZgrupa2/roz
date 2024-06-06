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
    fontWeight: "bold",
    color: "rgba(0, 0, 0)",
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
  file: string;
  folder: string;
}

const CatalogList = () => {
  const classes = useStyles();
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false);
  const [selectedCatalog, setSelectedCatalog] = useState("");

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/files/");
        const uniqueFolders = Array.from(
          new Set(response.data.map((catalog: Catalog) => catalog.folder))
        ).map((folder) => {
          return response.data.find(
            (catalog: Catalog) => catalog.folder === folder
          )!;
        });
        setCatalogs(uniqueFolders);
      } catch (error) {
        console.error("Error fetching catalogs:", error);
      }
    };

    fetchCatalogs();
  }, []);

  const showDocumentsModal = (folder: string) => {
    setSelectedCatalog(folder);
    setIsDocumentsModalOpen(true);
  };

  const hideDocumentsModal = () => {
    setIsDocumentsModalOpen(false);
  };

  const sortAlphabetically = () => {
    setCatalogs((prevCatalogs) =>
      [...prevCatalogs].sort((a, b) => a.folder.localeCompare(b.folder))
    );
  };

  const filteredCatalogs = catalogs.filter((catalog) =>
    catalog.folder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const splitName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

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
        <button className={classes.sortButton} onClick={sortAlphabetically}>
          Sortuj alfabetycznie
        </button>
      </div>
      <DocumentsModal
        isOpen={isDocumentsModalOpen}
        onRequestClose={hideDocumentsModal}
        folder={selectedCatalog}
      />
      <div className={classes.catalogsGrid}>
        {filteredCatalogs.map((catalog, index) => (
          <div
            key={index}
            className={classes.catalogCard}
            onClick={() => showDocumentsModal(catalog.folder)}
          >
            <div className={classes.catalogName}>
              {splitName(catalog.folder)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;
