import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from "react-jss";
import defaultImage from '../../assets/defaultImage.svg';
import Modal from 'react-modal';

const useStyles = createUseStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        height: '100%',
        width: '100%',
    },
    button: {
        width: "150px",
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
    sortButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    },
    addButton: {
        width: "150px",
        margin: "15px 0",
        backgroundColor: "#B6BBC4",
        color: "#31304D",
        "&:hover": {
            backgroundColor: "#31304D",
            color: "#B6BBC4",
        },
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    childrenGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        padding: '1rem',
        width: '80%',
    },
    childCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#F0ECE5',
        borderRadius: '10px',
        boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        "&:hover": {
            transform: 'scale(1.05)',
            boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
        },
    },
    childImg: {
        width: '10vw',
        height: '10vw',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    searchBar: {
        width: '80%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: 'none',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        fontSize: '1rem',
        transition: 'box-shadow 0.3s ease',
        '&:focus': {
            outline: 'none',
            boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
        },
    },
    sortButton: {
        width: "200px",
        padding: "10px",
        margin: "10px 0",
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
    '@media (max-width: 768px)': {
        childrenGrid: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        },
        wrapper: {
            marginTop: '200px',
        },
        sortButtons: {
            flexDirection: 'column',
        }
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        maxHeight: '80vh',
        width: '80%',
        maxWidth: '600px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#31304D',
        color: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        overflowY: 'auto',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        '&:focus': {
            outline: 'none',
        },
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: '1px solid #ccc',
        paddingBottom: '1.2rem',
        marginBottom: '1rem',
    },
    modalTitle: {
        margin: 0,
        fontSize: '1.5rem',
    },
    modalCloseButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#ff4c4c',
        },
    },
    modalForm: {
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        width: '100%',
    },
    modalDetails: {
        flex: 1,
    },
    modalImage: {
        display: 'block',
        width: '150px',
        height: '150px',
        borderRadius: '10px',
        objectFit: 'cover',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
        },
        '@media (max-width: 768px)': {
            display: 'none',
        },
    },
    modalButton: {
        padding: '10px 20px',
        marginTop: '1rem',
        backgroundColor: '#B6BBC4',
        color: '#31304D',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
            backgroundColor: '#31304D',
            color: '#B6BBC4',
        },
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: '#B6BBC4',
        borderRadius: '10px',
        padding: '1rem',
        color: '#31304D',
    },
    detailsItem: {
        marginBottom: '0.5rem',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    detailsLabel: {
        fontWeight: 'bold',
    },
    uploadContainer: {
        width: '100%',
        backgroundColor: '#F0ECE5',
        borderRadius: '10px',
        padding: '1rem',
        marginTop: '1rem',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
});

interface Child {
    id: number;
    name: string;
    surname: string;
    dateOfBirth: string;
    placeOfBirth: string;
    dateOfAdmission: string;
    referralNumber: string;
    mother: string;
    father: string;
    legalGuardian: string;
    siblings: number;
    comments: string;
    image: string;
}

const serverUrl = 'http://localhost:8000';
const getImageUrl = (imageName: string) => `${serverUrl}/${imageName}`;

function calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dob > today) {
        return 0;
    }

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}

interface Props {
    onAddChild: () => void;
    refreshKey: number;
}

const ChildrenContent: React.FC<Props> = ({ onAddChild, refreshKey }) => {
    const classes = useStyles();
    const [children, setChildren] = useState<Child[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState(true);
    const [alphaSortOrder, setAlphaSortOrder] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);

    const openModal = (child: Child) => {
        setSelectedChild(child);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedChild(null);
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/addChild/')
            .then(response => {
                setChildren(response.data);
            })
            .catch(error => {
                console.error('Błąd pobierania listy dzieci:', error);
            });
    }, [refreshKey]);

    const handleSort = () => {
        const sortedChildren = [...children].sort((a, b) => {
            const ageA = calculateAge(a.dateOfBirth);
            const ageB = calculateAge(b.dateOfBirth);
            return sortOrder ? ageA - ageB : ageB - ageA;
        });
        setChildren(sortedChildren);
        setSortOrder(!sortOrder);
    };

    const filteredChildren = children.filter(child =>
        `${child.name} ${child.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAlphaSort = () => {
        const sortedChildren = [...children].sort((a, b) => {
            const surnameA = a.surname.toLowerCase();
            const surnameB = b.surname.toLowerCase();
            if (alphaSortOrder) {
                if (surnameA < surnameB) return -1;
                if (surnameA > surnameB) return 1;
                return 0;
            } else {
                if (surnameA > surnameB) return -1;
                if (surnameA < surnameB) return 1;
                return 0;
            }
        });
        setChildren(sortedChildren);
        setAlphaSortOrder(!alphaSortOrder);
    };

    const handleDateSort = () => {
        const sortedChildren = [...children].sort((a, b) => new Date(a.dateOfAdmission).getTime() - new Date(b.dateOfAdmission).getTime());
        setChildren(sortedChildren);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (selectedChild) {
            formData.append('title', `${selectedChild.name}${selectedChild.surname}`);
        }
        formData.append('content', "uploaded_file");

        console.log('FormData przed wysłaniem:', Array.from(formData.entries()));

        axios.post('http://localhost:8000/api/posts/', formData)
            .then(response => {
                console.log('Document uploaded successfully:', response.data);
                closeModal();
            })
            .catch(error => {
                console.error('Error uploading document:', error);
            });
    };

    return (
        <div className={classes.wrapper}>
            <h1>Lista dzieci</h1>
            <input
                type="text"
                placeholder="Szukaj po imieniu lub nazwisku"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                className={classes.searchBar}
            />
            <div className={classes.buttons}>
                <div className={classes.sortButtons}>
                    <button className={classes.sortButton} onClick={handleSort}>Sortuj po wieku</button>
                    <button className={classes.sortButton} onClick={handleAlphaSort}>Sortuj alfabetycznie</button>
                    <button className={classes.sortButton} onClick={handleDateSort}>Sortuj po dacie przyjęcia</button>
                </div>
                <div>
                    <button className={`${classes.button} ${classes.addButton}`} onClick={onAddChild}>Dodaj dziecko</button>
                </div>
            </div>
            <div className={classes.childrenGrid}>
                {filteredChildren.map(child => (
                    <div key={child.id} className={classes.childCard}>
                        <img className={classes.childImg} src={child.image ? getImageUrl(child.image) : defaultImage} alt={`${child.name} ${child.surname}`} />
                        <h2>{child.name} {child.surname}</h2>
                        <p>Wiek: {calculateAge(child.dateOfBirth)}</p>
                        <div className={classes.buttons}>
                            <button className={classes.button} onClick={() => openModal(child)}>Szczegóły</button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Details Modal"
                className={classes.modalContent}
                overlayClassName={classes.overlay}
            >
                <div className={classes.modalHeader}>
                    <h2 className={classes.modalTitle}>Szczegóły dziecka</h2>
                    <button onClick={closeModal} className={classes.modalCloseButton}>&times;</button>
                </div>
                {selectedChild && (
                    <div className={classes.modalForm}>
                        <img className={classes.modalImage} src={selectedChild.image ? getImageUrl(selectedChild.image) : defaultImage} alt={`${selectedChild.name} ${selectedChild.surname}`} />
                        <div className={classes.modalDetails}>
                            <div className={classes.detailsContainer}>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Imię:</span> {selectedChild.name}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Nazwisko:</span> {selectedChild.surname}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Data urodzenia:</span> {selectedChild.dateOfBirth}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Miejsce urodzenia:</span> {selectedChild.placeOfBirth}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Data przyjęcia:</span> {selectedChild.dateOfAdmission}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Numer skierowania:</span> {selectedChild.referralNumber}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Matka:</span> {selectedChild.mother}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Ojciec:</span> {selectedChild.father}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Opiekun prawny:</span> {selectedChild.legalGuardian}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Liczba rodzeństwa:</span> {selectedChild.siblings}</p>
                                <p className={classes.detailsItem}><span className={classes.detailsLabel}>Komentarze:</span> {selectedChild.comments}</p>
                            </div>
                            <div className={classes.uploadContainer}>
                                <form onSubmit={handleFormSubmit}>
                                    <input type="file" name="file" required className={classes.fileInput} />
                                    <button type="submit" className={classes.modalButton}>Dodaj dokument</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ChildrenContent;
