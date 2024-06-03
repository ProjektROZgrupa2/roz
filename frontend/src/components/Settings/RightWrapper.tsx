import { createUseStyles } from "react-jss";
import img from "../../assets/changepwd.png";

const useStyle = createUseStyles({
  image: { 
    borderRadius: '10px',
    width: '100%',
    padding: '20px',
  },
  wrapper: {
    margin: '20px',
    '@media (max-width: 1024px)': {
        display: 'none',
        }
  }
});


const RightWrapper = () => {
  const classes = useStyle();
  return (
    <div className={classes.wrapper}>
        <img className={classes.image} src={img} alt="change password" />
    </div>
  );
};

export default RightWrapper;