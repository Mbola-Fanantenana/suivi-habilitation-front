import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Roles from './Roles';
import Supports from './Supports';
import Edit from '../edit/Edit'
import EditSupport from '../edit/EditSupport';
import Etablissement from './Etablissement';
import EditEtablissement from '../edit/EditEtablissement';
import TypeHabilitation from './TypeHabilitation';
import EditTypeHabilitation from '../edit/EditTypeHabilitation';
import Personnel from './Personnel';
import EditPersonnel from '../edit/EditPersonnel';
import Habilitation from './Habilitation';
import RapportFin from './RapportFin';
//import FormBar from './layout/FormBar';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Base() {
    return (
        <Router>
            <body>
                <header id="header" class="header fixed-top d-flex align-items-center">


                    <div class="d-flex align-items-center justify-content-between">
                        <Link to="/habilitation" class="logo d-flex align-items-center">
                            <span class="d-none d-lg-block">Habilitation</span>
                        </Link>
                        {/* <i class="bi bi-list toggle-sidebar-btn"></i> */}
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

                <main id="main" class="main">
                    <Routes>
                        <Route exact path='/' element={<Habilitation />} />
                        <Route exact path="/role" element={<Roles />} />
                        <Route exact path="/support" element={<Supports />} />
                        <Route exact path="/etablissement" element={<Etablissement />} />
                        <Route exact path="/typehabilitation" element={<TypeHabilitation />} />
                        <Route exact path="/personnel" element={<Personnel />} />
                        <Route exact path="/habilitation" element={<Habilitation />} />
                        <Route exact path="/rapportFin" element={<RapportFin />} />

                        {/* For edit */}
                        <Route exact path="/role/updateRole/:roleId" element={<Edit />} />
                        <Route exact path='/support/updateSupport/:supportId' element={<EditSupport />} />
                        <Route exact path='/etablissement/updateEtablissement/:etabId' element={<EditEtablissement />} />
                        <Route exact path='/typehabilitation/updateTypeHabilitation/:typeHabId' element={<EditTypeHabilitation />} />
                        <Route exact path='/personnel/updatePersonnel/:persId' element={<EditPersonnel />} />
                    </Routes>
                </main>
            </body>
        </Router>
    )
}
