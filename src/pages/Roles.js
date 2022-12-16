import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Modal, Table } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    //Edit role
    // const [viewEdit, setViewEdit] = useState(false);
    // const handleEditShow = () => {
    //     setViewEdit(true);
    // }
    // const handleEditClose = () => {
    //     setViewEdit(false);
    // }

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
    const [roleLieu, setRoleLieu] = useState("");
    const [roleId, setRoleId] = useState("");
    const [roleDelete, setRoleDelete] = useState(false);

    const credentials = { roleFonction, roleLieu };

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
    }

    // const handleEdit = async (e) => {
    //     e.preventDefault();
    //     const url = `http://localhost:4000/api/updateRole/${roleId}`;
    //     await axios.put(url, credentials);
    //     window.location.reload();
    // }

    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteRole/${roleId}`;
        axios.delete(url);
        loadRoles();
        window.location.reload();
    }

    useEffect(() => {
        loadRoles();
    }, []);

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='mt-5- mb-4'>
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
                                    <td>{item.roleLieu}</td>
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
                                <input type="text" className='form-control' value={rowRoleShow.roleFonction} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowRoleShow.roleLieu} readOnly />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            roleDelete && (
                                <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Supprimer role</Button>
                            )
                        }
                        <Button variant="secondary" onClick={handleDeleteClose}>Close</Button>
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
                                <input type="text" className='form-control' value={rowRoleShow.roleFonction} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowRoleShow.roleLieu} readOnly />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleViewClose}>Close</Button>
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
                        <Modal.Title>Ajouter un nouveau role</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Fonction titulaire :</label>
                                <input type="text" className='form-control' onChange={(e) => setRoleFonction(e.target.value)} placeholder="entrer fonction titulaire" />
                            </div>
                            <div className='form-group'>
                                <label>Description :</label>
                                <input type="text" className='form-control' onChange={(e) => setRoleLieu(e.target.value)} placeholder="entrer description" />
                            </div>
                            <Button type='submit' className='btn btn-succes mt-4' onClick={handlePost}>Enregistrer</Button>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAddClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal for edit */}
            {/* <div className='model-box-view'>
                <Modal
                    show={viewEdit}
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier role</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Fonction titulaire :</label>
                                <input type="text" className='form-control' onChange={(e) => setRoleFonction(e.target.value)} defaultValue={rowRoleShow.roleFonction} placeholder="entrer fonction titulaire" />
                            </div>
                            <div className='form-group'>
                                <label>Description :</label>
                                <input type="text" className='form-control' onChange={(e) => setRoleLieu(e.target.value)} defaultValue={rowRoleShow.roleLieu} placeholder="entrer description" />
                            </div>
                            <Button type='submit' className='btn btn-secondary mt-4' onClick={handleEdit}>Enregistrer</Button>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div> */}
        </div>
    )
}
