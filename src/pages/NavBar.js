import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import '../layout/assets/vendor/bootstrap/css/bootstrap.min.css';
// import '../layout/assets/vendor/bootstrap-icons/bootstrap-icons.css';
// import '../layout/assets/vendor/boxicons/css/boxicons.min.css';
// import '../layout/assets/vendor/quill/quill.snow.css';
// import '../layout/assets/vendor/quill/quill.bubble.css';
// import '../layout/assets/vendor/remixicon/remixicon.css';
// import '../layout/assets/vendor/simple-datatables/style.css';
// import '../layout/assets/css/style.css';

// import '../layout/assets/vendor/apexcharts/apexcharts.min.js';
// import '../layout/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
// import '../layout/assets/vendor/chart.js/chart.min.js';
// import '../layout/assets/vendor/echarts/echarts.min.js';
// import '../layout/assets/vendor/quill/quill.min.js';
// import '../layout/assets/vendor/simple-datatables/simple-datatables.js';
// import '../layout/assets/vendor/tinymce/tinymce.min.js';
// import '../layout/assets/vendor/php-email-form/validate.js';

// import '../layout/assets/js/main.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
    return (

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
                                    <Link to='/login'>
                                        <span>Déconnexion</span>
                                    </Link>
                                </Link>
                            </li>

                        </ul>
                    </li>

                </ul>
            </nav>

        </header>
    )
}
