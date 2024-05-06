import { useState } from "react";
import { createUseStyles } from "react-jss";
import { changePassword } from "../../services/UserService";

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    maxWidth: '300px',
    margin: '0 auto',
  },
  label: {
    display: 'block',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.5rem',
    marginTop: '1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#31304D',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    
  },
});

const ChangePasswdForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const classes = useStyles();

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => { 
    event.preventDefault();
    const result = await changePassword(oldPassword, newPassword); 
    if (result.success) {
      console.log("Password updated successfully");
    } else {
      console.log("Failed to update password:", result.message);
    }
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          Stare hasło:
        </label>
        <input className={classes.input} type="password" value={oldPassword} onChange={handleOldPasswordChange} />
        <label className={classes.label}>
          Nowe hasło:
        </label>
        <input className={classes.input} type="password" value={newPassword} onChange={handleNewPasswordChange} />
        <button className={classes.button} type="submit">Zaktualizuj</button>
      </form>
    </div>
  );
};

export default ChangePasswdForm;