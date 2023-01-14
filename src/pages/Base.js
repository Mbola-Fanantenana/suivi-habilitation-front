import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import '../layout/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../layout/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../layout/assets/vendor/boxicons/css/boxicons.min.css';
import '../layout/assets/vendor/quill/quill.snow.css';
import '../layout/assets/vendor/quill/quill.bubble.css';
import '../layout/assets/vendor/remixicon/remixicon.css';
import '../layout/assets/vendor/simple-datatables/style.css';
import '../layout/assets/css/style.css';

import '../layout/assets/vendor/apexcharts/apexcharts.min.js';
import '../layout/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../layout/assets/vendor/chart.js/chart.min.js';
import '../layout/assets/vendor/echarts/echarts.min.js';
import '../layout/assets/vendor/quill/quill.min.js';
import '../layout/assets/vendor/simple-datatables/simple-datatables.js';
import '../layout/assets/vendor/tinymce/tinymce.min.js';
import '../layout/assets/vendor/php-email-form/validate.js';

import '../layout/assets/js/main.js';


export default function Base() {
    return (

        <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">
                <li class="nav-item">
                    <Link class="nav-link collapsed" to="/habilitation">
                        <i class="bi bi-grid"></i>
                        <span>Habilitation</span>
                    </Link>
                </li>

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


                {/* <li class="nav-heading">Autres pages</li> */}

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

    )
}
