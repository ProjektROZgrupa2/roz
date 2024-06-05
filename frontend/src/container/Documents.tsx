import { createUseStyles } from "react-jss";
import Navbar from "../components/DefaultPageTemplate/Navbar";
import CatalogList from "../components/Documents/CatalogList";

const useStyle = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
    gap: "1rem",
    width: "100%",
    backgroundColor: "#F0ECE5",
    paddingTop: "100px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5rem",
    height: "100%",
    width: "100%",
  },
});

const Documents = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Navbar />
        <CatalogList />
      </div>
    </div>
  );
};

export default Documents;
