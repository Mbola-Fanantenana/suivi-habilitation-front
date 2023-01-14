import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Modal, Table, FloatingLabel, Form } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import NavBar from './NavBar';
import Base from './Base';

export default function Roles() {

    const [roles, setRoles] = useState([]);
    const [rowRoleShow, setRowRoleShow] = useState([]);
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    //Delete role
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    //Add new role
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    const [roleFonction, setRoleFonction] = useState("");
    const [roleDesc, setRoleDesc] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roleDelete, setRoleDelete] = useState(false);


    const credentials = { roleFonction, roleDesc };

    const loadRoles = async () => {
        const result = await axios.get('http://localhost:4000/api/roles');
        setRoles(result.data);
        console.log(result.data);
    }
    //Add function
    const handlePost = () => {
        const url = 'http://localhost:4000/api/saveRole';
        axios.post(url, credentials);
        loadRoles();
        window.location.reload();
        toast.success('Ajout fonction réussie');
    }

    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteRole/${roleId}`;
        axios.delete(url);
        loadRoles();
        toast.success('suppression réussie');
        window.location.reload();

    }

    useEffect(() => {
        loadRoles();
        document.title = "Fonction | Habilitation";
    }, []);

    return (
        <body>
            <NavBar />
            <Base />
            <main id='main' class='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='mt-5 mb-4'>
                            <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                                <FontAwesomeIcon icon={faPlus} />
                                Ajouter nouveau role
                            </Button>
                        </div>
                    </div>

                    <div className='row'>
                        <Table striped bordered hover responsive size='sm'>
                            <thead>
                                <tr>
                                    <th>Fonction titulaire</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roles.map((item) => (
                                        <tr key={item.roleId}>
                                            <td>{item.roleFonction}</td>
                                            <td>{item.roleDesc}</td>
                                            <td style={{ minWidth: 190 }}>
                                                <ButtonGroup aria-label='Basic example'>
                                                    <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowRoleShow(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                                    <Button size='sm' variant='warning'>
                                                        <Link to={`/role/updateRole/${item.roleId}`} > <FontAwesomeIcon icon={faPenToSquare} /> </Link>
                                                    </Button>
                                                    <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowRoleShow(item), setRoleId(item.roleId), setRoleDelete(true)) }} > <FontAwesomeIcon icon={faTrash} /> </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>


                    {/* Modal supprimer */}
                    <div className='model-box-view'>
                        <Modal
                            show={viewDelete}
                            onHide={handleDeleteClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Détails</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <h4>Vouler vous vraiment supprimer ?</h4>
                                    <div className='form-group'>
                                        <strong>Fonction : </strong>{rowRoleShow.roleFonction}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Description : </strong>{rowRoleShow.roleDesc}
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <ButtonGroup>
                                    {
                                        roleDelete && (
                                            <Button type='submit' size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                                        )
                                    }
                                    <Button size='sm' variant="secondary" onClick={handleDeleteClose}>fermer</Button>
                                </ButtonGroup>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    {/* Modal for details */}
                    <div className='model-box-view'>
                        <Modal
                            show={viewShow}
                            onHide={handleViewClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Détails</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <div className='form-group'>
                                        <strong>Fonction : </strong>{rowRoleShow.roleFonction}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Description : </strong>{rowRoleShow.roleDesc}
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button size='sm' variant="secondary" onClick={handleViewClose}>fermer</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    {/* Modal for add */}
                    <div className='model-box-view'>
                        <Modal
                            show={viewAdd}
                            onHide={handleAddClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Ajouter un nouveau rôle</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <Form.Label>Fonction titulaire :</Form.Label>
                                    <FloatingLabel controlId='toto' label='Fonction titulaire' className='mb-3'>
                                        <Form.Control type='text' onChange={(e) => setRoleFonction(e.target.value)} placeholder='Fonction titulaire' />
                                    </FloatingLabel>
                                    <Form.Label>Description :</Form.Label>
                                    <FloatingLabel controlId='toto' label='Description fonction' className='mb-3'>
                                        <Form.Control type='text' onChange={(e) => setRoleDesc(e.target.value)} placeholder='Description fonction' />
                                    </FloatingLabel>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <ButtonGroup>
                                    <Button type='submit' size='sm' variant='success' onClick={handlePost}>Enregistrer</Button>
                                    <Button size='sm' variant="secondary" onClick={handleAddClose}>fermer</Button>
                                </ButtonGroup>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>
            </main>
        </body>
    )
}
