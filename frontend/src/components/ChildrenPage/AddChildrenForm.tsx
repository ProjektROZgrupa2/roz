import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputField from "./InputField";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const useStyles = createUseStyles({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
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
  cancelBtn: {
    backgroundColor: "#ff3333",
    "&:hover": {
      backgroundColor: "#ff1a1a",
    },
  },
  h2: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
  },
  messageBox: {
    display: "flex",
    background: "#F0ECE5",
    border: "2px solid #31304D",
    borderRadius: "1rem",
    width: "clamp(300px, 80%, 600px)",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontSize: "1.5rem",
  },
  messageModal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
  "@media (max-width: 768px)": {
    form: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

const customModalStyles = {
  content: {
    background: "#F0ECE5",
    border: "2px solid #31304D",
    fontFamily: "Arial, sans-serif",
    borderRadius: "2rem",
    width: "clamp(300px, 80%, 600px)",
    margin: "0 auto",
    scrollbarWidth: "thin" as "thin",
    scrollbarColor: "#31304D #F0ECE5",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "2000",
  },
};

const MessageModal = ({
  isOpen,
  message,
  isSuccess,
  onClose,
}: {
  isOpen: boolean;
  message: string;
  isSuccess: boolean;
  onClose: () => void;
}) => {
  const classes = useStyles();
  const successStyle = { backgroundColor: "#228B22" };
  const failureStyle = { backgroundColor: "#ff3333" };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classes.messageModal}
    >
      <div
        className={classes.messageBox}
        style={isSuccess ? successStyle : failureStyle}
      >
        {message}
      </div>
    </Modal>
  );
};

const AddChildrenForm = ({
  isOpen,
  onClose,
  onChildAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onChildAdded: () => void;
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });
  const [page, setPage] = useState(1);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: any) => {
    if (!isValid) {
      setMessage("Formularz jest nieprawidłowo wypełniony");
      setIsSuccess(false);
      setMessageModalOpen(true);
      return;
    }

    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const response = await axios.post(
        "http://localhost:8000/api/addChild/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleClose();
      onChildAdded();
      setMessage("Dziecko zostało dodane");
      setIsSuccess(true);
      setMessageModalOpen(true);
    } catch (error) {
      handleClose();
      setMessage(
        (error as any).response.data.message || "Nie udało się dodać dziecka"
      );
      setIsSuccess(false);
      setMessageModalOpen(true);
    }
  };

  const handleClose = () => {
    reset();
    setPage(1);
    onClose();
  };

  const onNextPage = () => {
    setPage(2);
  };

  const onPrevPage = () => {
    setPage(1);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customModalStyles}
      >
        <h2 className={classes.h2}>Dodaj Dziecko</h2>
        <form
          id="addChildForm"
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
        >
          {page === 1 && (
            <>
              <InputField
                label="Imię"
                register={register("name", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.name}
                errorMessage={
                  (errors.name?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Nazwisko"
                register={register("surname", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.surname}
                errorMessage={
                  (errors.surname?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Data urodzenia"
                register={register("dateOfBirth", {
                  required: true,
                  pattern: /^\d{4}-\d{2}-\d{2}$/,
                })}
                error={!!errors.dateOfBirth}
                errorMessage={
                  (errors.dateOfBirth?.message as string) ||
                  "Podaj poprawną datę (yyyy-mm-dd)"
                }
                type="date"
              />
              <InputField
                label="Miejsce urodzenia"
                register={register("placeOfBirth", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.placeOfBirth}
                errorMessage={
                  (errors.placeOfBirth?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Data przyjęcia"
                register={register("dateOfAdmission", {
                  required: true,
                  pattern: /^\d{4}-\d{2}-\d{2}$/,
                })}
                error={!!errors.dateOfAdmission}
                errorMessage={
                  (errors.dateOfAdmission?.message as string) ||
                  "Podaj poprawną datę (yyyy-mm-dd)"
                }
                type="date"
              />
              <InputField
                label="Numer skierowania"
                register={register("referralNumber", {
                  required: true,
                  maxLength: 30,
                })}
                error={!!errors.referralNumber}
                errorMessage={
                  (errors.referralNumber?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 30 znaków)"
                }
                type="text"
              />
              <button
                type="button"
                className={`${classes.button} ${classes.cancelBtn}`}
                onClick={handleClose}
              >
                Anuluj
              </button>
              <div className={classes.buttonsContainer}>
                <FaArrowAltCircleLeft
                  onClick={onPrevPage}
                  size={30}
                  style={{ cursor: "pointer" }}
                />
                <p style={{ fontWeight: "bold" }}>{page}/2</p>
                <FaArrowAltCircleRight
                  onClick={onNextPage}
                  size={30}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </>
          )}
          {page === 2 && (
            <>
              <InputField
                label="Matka"
                register={register("mother", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.mother}
                errorMessage={
                  (errors.mother?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Ojciec"
                register={register("father", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.father}
                errorMessage={
                  (errors.father?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Opiekun prawny"
                register={register("legalGuardian", {
                  required: true,
                  maxLength: 50,
                })}
                error={!!errors.legalGuardian}
                errorMessage={
                  (errors.legalGuardian?.message as string) ||
                  "Podaj poprawne dane (maksymalnie 50 znaków)"
                }
                type="text"
              />
              <InputField
                label="Rodzeństwo"
                register={register("siblings", {
                  required: true,
                  pattern: /^\d+$/,
                  max: 20,
                  min: 0,
                })}
                error={!!errors.siblings}
                errorMessage={
                  (errors.siblings?.message as string) ||
                  "Podaj poprawną liczbę rodzeństwa"
                }
                type="number"
              />
              <InputField
                label="Uwagi"
                register={register("comments", {
                  required: false,
                  maxLength: 200,
                })}
                error={!!errors.comments}
                errorMessage={
                  (errors.comments?.message as string) ||
                  "Podaj maksymalnie 200 znaków"
                }
                type="textarea"
              />
              <InputField
                label="Zdjęcie"
                register={register("image", {
                  required: false,
                  validate: (value) => {
                    if (!value[0]) return true;

                    const acceptedFormats = ["image/jpeg", "image/png"];
                    const file = value[0];

                    if (!acceptedFormats.includes(file.type)) {
                      return false;
                    }

                    return true;
                  },
                })}
                error={!!errors.image}
                errorMessage="Niepoprawny format pliku (dozwolone: jpg, png)"
                type="file"
              />
              <div className={classes.buttonsContainer}>
                <button
                  type="button"
                  className={`${classes.button} ${classes.cancelBtn}`}
                  onClick={handleClose}
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  form="addChildForm"
                  className={classes.button}
                >
                  Dodaj
                </button>
              </div>
              <div className={classes.buttonsContainer}>
                <FaArrowAltCircleLeft
                  onClick={onPrevPage}
                  size={30}
                  style={{ cursor: "pointer" }}
                />
                <p style={{ fontWeight: "bold" }}>{page}/2</p>
                <FaArrowAltCircleRight
                  onClick={onNextPage}
                  size={30}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </>
          )}
        </form>
      </Modal>

      <MessageModal
        isOpen={isMessageModalOpen}
        message={message}
        isSuccess={isSuccess}
        onClose={() => setMessageModalOpen(false)}
      />
    </>
  );
};

export default AddChildrenForm;
