import React from 'react'
import { Link } from "react-router-dom";

import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/quill/quill.snow.css';
import './assets/vendor/quill/quill.bubble.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/simple-datatables/style.css';
import './assets/css/style.css';

import './assets/vendor/apexcharts/apexcharts.min.js';
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import './assets/vendor/chart.js/chart.min.js';
import './assets/vendor/echarts/echarts.min.js';
import './assets/vendor/quill/quill.min.js';
import './assets/vendor/simple-datatables/simple-datatables.js';
import './assets/vendor/tinymce/tinymce.min.js';
import './assets/vendor/php-email-form/validate.js';

import './assets/js/main.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function FormBar() {
    return (
        <html>
            <body>

                <header id="header" class="header fixed-top d-flex align-items-center">

                    <div class="d-flex align-items-center justify-content-between">
                        <Link to="/habilitation" class="logo d-flex align-items-center">
                            <span class="d-none d-lg-block">Habilitation</span>
                        </Link>
                        <i class="bi bi-list toggle-sidebar-btn"></i>
                    </div>

                    <nav class="header-nav ms-auto">
                        <ul class="d-flex align-items-center">

                            <li class="nav-item dropdown pe-3">

                                <Link class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                    <span class="d-none d-md-block dropdown-toggle ps-2">Admin <FontAwesomeIcon icon={faUser} /></span>
                                </Link>

                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

                                    <li class="dropdown-header">
                                        <h6>Admin</h6>
                                        <span>gérer habilitation</span>
                                    </li>

                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>

                                    <li>
                                        <Link class="dropdown-item d-flex align-items-center" href="users-profile.html">
                                            <i class="bi bi-person"></i>
                                            <span>Profil</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>

                                    <li>
                                        <Link class="dropdown-item d-flex align-items-center" href="#">
                                            <i class="bi bi-box-arrow-right"></i>
                                            <span>Déconnexion</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>

                        </ul>
                    </nav>

                </header>


                <aside id="sidebar" class="sidebar">

                    <ul class="sidebar-nav" id="sidebar-nav">

                        <li class="nav-item">
                            <Link class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                                <i class="bi bi-journal-text"></i><span>Données de base</span><i class="bi bi-chevron-down ms-auto"></i>
                            </Link>
                            <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                                <li>
                                    <Link to="/role">
                                        <i class="bi bi-circle"></i><span>Fonction</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/typeHabilitation">
                                        <i class="bi bi-circle"></i><span>Type d'habilitation</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/support">
                                        <i class="bi bi-circle"></i><span>Support</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/etablissement">
                                        <i class="bi bi-circle"></i><span>Etablissement</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link collapsed" to="/habilitation">
                                <i class="bi bi-grid"></i>
                                <span>Habilitation</span>
                            </Link>
                        </li>

                        <li class="nav-heading">Autres pages</li>

                        <li class="nav-item">
                            <Link class="nav-link collapsed" to="/personnel">
                                <i class="bi bi-person"></i>
                                <span>Personnel</span>
                            </Link>
                        </li>

                        <li class="nav-item">
                            <Link class="nav-link collapsed" to="/rapportFin">
                                <i class="bi bi-question-circle"></i>
                                <span>Rapport fin</span>
                            </Link>
                        </li>

                    </ul>

                </aside>

            </body>
        </html>
    )
}


