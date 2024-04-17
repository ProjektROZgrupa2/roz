import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUseStyles } from "react-jss";
import defaultImage from '../../assets/defaultImage.svg';

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
    addButton: {
        width: "200px",
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
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
        borderRadius: '5px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
    },
    '@media (max-width: 768px)': {
        childrenGrid: {
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        },
        wrapper: {
            marginTop: '200px',
        },
    },
});


const ChildrenContent = ({ refreshKey, onAddChild }: { refreshKey: number, onAddChild: () => void }) => {
    const classes = useStyles();

    const [children, setChildren] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/addChild/')
        .then(response => {
            setChildren(response.data);
        })
        .catch(error => {
            console.error('Błąd pobierania listy dzieci:', error);
        });
    }, [refreshKey]);

    const handleDeleteChild = () => {
        //TODO
    };

    return (
        <div className={classes.wrapper}>
            <button className={`${classes.button} ${classes.addButton}`} onClick={onAddChild}>Dodaj dziecko</button>
            <h1>Lista dzieci</h1>
            <div className={classes.childrenGrid}>
                {children.map((child: any) => (
                    <div key={child.id} className={classes.childCard}>
                        <img src={child.image || defaultImage} alt={`${child.name} ${child.surname}`} />
                        <h2>{child.name} {child.surname}</h2>
                        <p>Wiek: {child.age}</p>
                        <div className={classes.buttons}>
                            <button className={classes.button}>Usuń</button>
                            <button className={classes.button}>Szczegóły</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChildrenContent;
