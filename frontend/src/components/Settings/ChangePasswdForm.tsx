import { useState } from "react";
import { createUseStyles } from "react-jss";
import { changePassword } from "../../services/UserService";

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    margin: '0 auto',
    '@media (max-width: 600px)': {
      width: '100%',
    },
    '@media (max-width: 1024px)': {
      gap: '1rem',
    }
  },
  label: {
    display: 'block',
    '@media (max-width: 1024px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    '@media (max-width: 1024px)': {
      width: '500px',
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      width: '300px',
      fontSize: '1rem',
    },
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    marginTop: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#31304D',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
    '@media (max-width: 1024px)': {
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    }
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
});

const ChangePasswdForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const classes = useStyles();

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => { 
    event.preventDefault();
    setErrorMessage(""); 
    setSuccessMessage(""); 
    if (newPassword !== confirmPassword) {
      setErrorMessage("Hasła nie są takie same.");
      return;
    }
    if (newPassword === oldPassword) {
      setErrorMessage("Stare i nowe hasło nie mogą być takie same.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage("Hasło nie spełnia wymagań. Musi zawierać co najmniej 8 znaków, w tym co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny (@, $, !, %, *, ?, &, _, -).");
      return;
    }
    const result = await changePassword(oldPassword, newPassword); 
    if (result.success) {
      setSuccessMessage("Hasło zostało pomyślnie zmienione!");
    } else {
      if (result.message === "Error while changing password") {
        setErrorMessage("Podano błędne stare hasło.");
      } else {
        setErrorMessage("Nie udało się zmienić hasła: " + result.message);
      }
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
        <label className={classes.label}>
          Potwierdź hasło:
        </label>
        <input className={classes.input} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        {successMessage && <p className={classes.success}>{successMessage}</p>}
        <button className={classes.button} type="submit">Zaktualizuj</button>
      </form>
    </div>
  );
};

export default ChangePasswdForm;