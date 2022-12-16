import React from 'react'
import { Link } from 'react-router-dom';
import './sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faCity, faFile, faRoute, faStreetView, faUsersGear } from '@fortawesome/free-solid-svg-icons'


export default function Sidebar() {
    return (
        <div>
            <div className="sidenav">
                <span>
                    <Link className="nav" to="/habilitation">
                        <p>Habilitation</p>
                    </Link>
                </span>
                <a href="#home">
                    <Link className="nav-link" to="/role"><FontAwesomeIcon icon={faUsersGear} /> Role</Link>
                </a>
                <a href="#news">
                    <Link className="nav-link" to="/support"><FontAwesomeIcon icon={faFile} /> Support</Link>
                </a>
                <a href="#contact">
                    <Link className="nav-link" to="/etablissement"><FontAwesomeIcon icon={faCity} /> Etablissement</Link>
                </a>
                <a href="#about">
                    <Link className="nav-link" to="/typehabilitation"><FontAwesomeIcon icon={faStreetView} /> Type habilitation</Link>
                </a>
                <a href='#personnel'>
                    <Link className="nav-link" to="/personnel"><FontAwesomeIcon icon={faAddressCard} /> Personnel</Link>
                </a>
                <a href='#habilitation'>
                    <Link className="nav-link" to="/habilitation"><FontAwesomeIcon icon={faRoute} /> Habilitation</Link>
                </a>
                <a href='#rapport'>
                    <Link className="nav-link" to="/rapportFin"><FontAwesomeIcon icon={faRoute} /> Rapport fin</Link>
                </a>
            </div>
            <div className="content">

            </div>
        </div>
    )
}

