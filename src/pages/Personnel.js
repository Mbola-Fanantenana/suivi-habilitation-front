import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Personnel() {

    const [personnels, setPersonnels] = useState([]);
    const [rowPersonnel, setRowPersonnel] = useState([]);

    const [persCodeExp, setPersCodeExp] = useState("");
    const [persNom, setPersNom] = useState("");
    const [persPrenom, setPersPrenom] = useState("");
    const [persLogin, setPersLogin] = useState("");
    const [persMat, setPersMat] = useState("");
    const [persCIN, setPersCIN] = useState("");
    const [persNumTel, setPersNumTel] = useState("");
    const [persEmail, setPersEmail] = useState("");
    const [persId, setPersId] = useState("");
    // const [roleId, setRolesId] = useState("");
    const { roleId } = useParams();
    const [deletePersonnel, setDeletePersonnel] = useState(false);

    const personnelInfo = { persCodeExp, persNom, persPrenom, persLogin, persMat, persCIN, persNumTel, persEmail, roleId };

    //detail personnel
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }
    //Add personnel
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    //for delete personnel
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    //function add personnel
    const handlePost = async (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/api/savePersonnel";
        await axios.post(url, personnelInfo);
        loadPersonnels();
        window.location.reload();
    }

    //function delete personnel
    const handleDelete = () => {
        const url = `http://localhost:4000/api/deletePersonnel/${persId}`
        axios.delete(url);
        loadPersonnels();
        window.location.reload();
    }

    //function get all personnel
    const loadPersonnels = async () => {
        const result = await axios.get("http://localhost:4000/api/personnels");
        setPersonnels(result.data);
        console.log(result.data);
    }

    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);

    const loadRoles = async () => {
        const result = await axios.get("http://localhost:4000/api/roles");
        setRoles(result.data);
        console.log(result.data);
    }

    const hangleChange = (event) => {
        setRoles(event.target.value);
    }

    useEffect(() => {
        loadPersonnels();
        loadRoles();
    }, [])

    return (

        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                        <FontAwesomeIcon icon={faPlus} />
                        Ajouter personnel
                    </Button>
                </div>
                <div className='form-group'>
                    <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher ...' />
                </div>
            </div>
            <br />

            <Table striped bordered hover responsive size='sm'>
                <thead>
                    <tr>
                        <th>Code exploitant</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Login</th>
                        <th>Matricule</th>
                        <th>CIN</th>
                        <th>Numero telephone</th>
                        <th>Email</th>
                        <th>Fonction titulaire</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        personnels.filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.persLogin.toLowerCase().includes(search);
                        }).map((item) => (
                            <tr key={item.persId}>
                                <td>{item.persCodeExp}</td>
                                <td>{item.persNom}</td>
                                <td>{item.persPrenom}</td>
                                <td>{item.persLogin}</td>
                                <td>{item.persMat}</td>
                                <td>{item.persCIN}</td>
                                <td>{item.persNumTel}</td>
                                <td>{item.persEmail}</td>
                                <td>{item.roleId}</td>
                                <td>
                                    <ButtonGroup aria-label='Basic example'>
                                        <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowPersonnel(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                        <Button size='sm' variant='warning'>
                                            <Link to={`/personnel/updatePersonnel/${item.persId}`}>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Link>
                                        </Button>
                                        <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowPersonnel(item), setPersId(item.persId), setDeletePersonnel(true)) }}> <FontAwesomeIcon icon={faTrash} /> </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>


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
                                <input type="text" className='form-control' value={rowPersonnel.persCodeExp} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persNom} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persPrenom} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persLogin} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persMat} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persCIN} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persNumTel} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persEmail} readOnly />
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
                        <Modal.Title>Ajouter etablissement</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCode">
                                    <Form.Label>Code exploitant :</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersCodeExp(e.target.value)} placeholder="entrer code " />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridNom">
                                    <Form.Label>Nom : </Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersNom(e.target.value)} placeholder="entrer nom" />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} controlId="formGridPrenom">
                                    <Form.Label>Prénom : </Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersPrenom(e.target.value)} placeholder="entrer prénom" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <label>Fonction titulaire :</label>
                                    <select className='form-control'>
                                        {
                                            roles.map((item) => (
                                                <option onChange={hangleChange}>{item.roleFonction}</option>
                                            ))
                                        }
                                    </select>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridLogin">
                                    <Form.Label>Login :</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersLogin(e.target.value)} placeholder="entrer login" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridMat">
                                    <Form.Label>Numéro matricule :</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersMat(e.target.value)} placeholder="entrer numéro matricule" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCIN">
                                    <Form.Label>Numéro CIN :</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersCIN(e.target.value)} placeholder="entrer numéro CIN" />
                                </Form.Group>
                                <Form.Group as={Col} constrolId="formGridEmail">
                                    <Form.Label>Adresse mail :</Form.Label>
                                    <Form.Control type="email" className='form-control' onChange={(e) => setPersEmail(e.target.value)} placeholder="entrer adresse email" />
                                </Form.Group>
                            </Row>

                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="+261" disabled />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridNum">
                                    <Form.Label>Numéro téléphone :</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setPersNumTel(e.target.value)} placeholder="entrer numéro téléphone" />
                                </Form.Group>
                            </Row>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' className='btn btn-succes mt-4' onClick={handlePost}>Enregistrer</Button>
                        {/* <Button variant="secondary" onClick={handleAddClose}>Close</Button> */}
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal for details */}
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
                            <h3>Vouler vous vraiment supprimer l'agent portant le code : {rowPersonnel.persCodeExp} ?</h3>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persCodeExp} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persNom} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persPrenom} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persLogin} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persMat} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persCIN} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persNumTel} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowPersonnel.persEmail} readOnly />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            deletePersonnel && (
                                <Button size='sm' variant='btn btn-danger mt-4' onClick={handleDelete}>Supprimer</Button>
                            )
                        }
                        <Button variant="secondary" onClick={handleDeleteClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}
