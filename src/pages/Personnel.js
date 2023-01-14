import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Card, Col, Form, FloatingLabel, Modal, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import Base from './Base';

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

    const [roleId, setRolesId] = useState("");
    //const { roleId } = useParams();
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


    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);

    const loadRoles = async () => {
        const result = await axios.get("http://localhost:4000/api/roles");
        setRoles(result.data);
        console.log(result.data);
    }

    const hangleChange = (event) => {
        setRolesId(event.target.value);
    }
    //function get all personnel
    const loadPersonnels = async () => {
        const result = await axios.get("http://localhost:4000/api/personnels");
        setPersonnels(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        loadPersonnels();
        loadRoles();
        document.title = "Personnel | Habilitation";
    }, [])

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
                                Ajouter personnel
                            </Button>
                        </div>
                        <div className='form-group mb-4'>
                            <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher ...' />
                        </div>

                        <br />


                        {/* Card personnels */}
                        {
                            personnels.filter((item) => {
                                return search.toLowerCase() === ''
                                    ? item
                                    : item.persLogin.toLowerCase().includes(search);
                            }).map((item) => (

                                <div className='col-md-4 mb-3'>
                                    <Card style={{ height: '100%' }}>
                                        <Card.Header>
                                            <strong>Code exploitant : {item.persCodeExp}</strong>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text><strong>Nom : </strong>{item.persNom}</Card.Text>
                                            <Card.Text><strong>Prenom : </strong>{item.persPrenom}</Card.Text>
                                            <Card.Text><strong>Pseudo : </strong>{item.persLogin}</Card.Text>
                                            <Card.Text><strong>Matricule : </strong>{item.persMat}</Card.Text>
                                            <Card.Text><strong>CIN : </strong>{item.persCIN}</Card.Text>
                                            <Card.Text><strong>Téléphone : </strong>{item.persNumTel}</Card.Text>
                                            <Card.Text><strong>Email : </strong>{item.persEmail}</Card.Text>
                                            <Card.Text><strong>Fonction : </strong>{item.roleId}</Card.Text>
                                            <strong> Action :</strong>
                                            <ButtonGroup aria-label='Basic example' style={{ float: 'right' }}>
                                                <Button size='md' variant='warning'>
                                                    <Link to={`/personnel/updatePersonnel/${item.persId}`}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </Link>
                                                </Button>
                                                <Button size='md' variant='danger'
                                                    onClick={() => { handleDeleteShow(setRowPersonnel(item), setPersId(item.persId), setDeletePersonnel(true)) }}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </Card.Body>
                                    </Card>
                                </div>

                            ))
                        }


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
                                            <strong>Code exploitant : </strong> {rowPersonnel.persCodeExp}
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
                                size='lg'
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Ajouter Personnel</Modal.Title>
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
                                                <Form.Label>Fonction titulaire :</Form.Label>
                                                <Form.Select className='form-control'>
                                                    {
                                                        roles.map((item) => (
                                                            <option value={item} key={item} onChange={e => setRolesId(e.target.value)} >{item.roleId}</option>
                                                        ))
                                                    }
                                                </Form.Select>
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
                                                <Form.Control type="text" onChange={(e) => setPersCIN(e.target.value)} maxLength="12" placeholder="entrer numéro CIN" />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="formGridNum">
                                                <Form.Label>Numéro téléphone :</Form.Label>
                                                <Form.Control type="text" onChange={(e) => setPersNumTel(e.target.value)} placeholder="entrer numéro téléphone" />
                                            </Form.Group>
                                        </Row>

                                        <Row className='mb-3'>
                                            <Form.Group as={Col} constrolId="formGridEmail">
                                                <Form.Label>Adresse mail :</Form.Label>
                                                <Form.Control type="email" className='form-control' onChange={(e) => setPersEmail(e.target.value)} placeholder="entrer adresse email" />
                                            </Form.Group>
                                        </Row>

                                    </Form>
                                </Modal.Body>

                                <Modal.Footer>
                                    <ButtonGroup>
                                        <Button type='submit' size='sm' variant='success' onClick={handlePost}>Enregistrer</Button>
                                        <Button size='sm' variant="secondary" onClick={handleAddClose}>fermer</Button>
                                    </ButtonGroup>
                                </Modal.Footer>
                            </Modal>
                        </div>

                        {/* Modal for delete */}
                        <div className='model-box-view'>
                            <Modal
                                show={viewDelete}
                                onHide={handleDeleteClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Suppression</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div>
                                        <h5>Vouler vous vraiment supprimer l'agent portant le code : {rowPersonnel.persCodeExp} ?</h5>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <ButtonGroup>
                                        {
                                            deletePersonnel && (
                                                <Button size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                                            )
                                        }
                                        <Button size='sm' variant="secondary" onClick={handleDeleteClose}>Annuler</Button>
                                    </ButtonGroup>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}
