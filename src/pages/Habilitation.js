import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Card, Modal, Table, Form, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus, faCheck, faList, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ChartPie from './Statistique/ChartPie';
import ChartBar from './Statistique/ChartBar';
import { format } from "date-fns";
import { toast } from 'react-toastify';
import NavBar from './NavBar';
import Base from './Base';

export default function Habilitation() {

    const [habilitations, setHabilitations] = useState([]);
    const [rowHabilitation, setRowHabilitation] = useState([]);
    const [vtotal, setVtotal] = useState([]);
    const [encours, setEncours] = useState([]);
    const [termine, setTermine] = useState([]);
    const [currentDate, setCurrentDate] = useState([]);

    const [deleteHabilitation, setDeleteHabilitation] = useState(false);
    const [habId, setHabId] = useState("");

    const [persCodeExp, setPersCodeExp] = useState("");
    const [roleFonction, setRoleFonction] = useState("");
    const [foncInterim, setFoncInterim] = useState("");
    const [etabCode, setEtabCode] = useState("");
    const [etabCodeSortant, setEtabCodeSortant] = useState("");
    const [typeHabCode, setTypeHabCode] = useState("");
    const [supportCode, setSupportCode] = useState("");
    const [habCaisse, setHabCaisse] = useState("");
    const [habCaisseSortant, setHabCaisseSortant] = ("");
    const [habDateDebut, setHabDateBebut] = useState("");
    const [habDateFin, setHabDateFin] = useState("");
    const [statusDebut, setStatusDebut] = useState(true);
    const [statusFin, setStatusFin] = useState(true)

    const habilitationInfo = { persCodeExp, roleFonction, foncInterim, etabCode, etabCodeSortant, typeHabCode, supportCode, habCaisse, habCaisseSortant, habDateDebut, habDateFin, statusDebut, statusFin };

    //details habilitations
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    //for delete habilitations
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    //Add personnel
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    //fonciton add habilitations
    const handlePost = async (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/api/saveHabilitation";
        await axios.post(url, habilitationInfo);
        loadHabilitations();
        window.location.reload();
    }

    const [search, setSearch] = useState('');
    console.log(search);
    //function get all habilitations
    const loadHabilitations = async () => {
        const result = await axios.get("http://localhost:4000/api/habilitations");
        setHabilitations(result.data);
        console.log(result.data);
    }

    const loadVtotal = async () => {
        const result = await axios.get("http://localhost:4000/api/vtotal");
        setVtotal(result.data);
        console.log(result.data);
    }

    const loadEncours = async () => {
        const result = await axios.get("http://localhost:4000/api/encours");
        setEncours(result.data);
        console.log(result.data);
    }

    const loadTermine = async () => {
        const result = await axios.get("http://localhost:4000/api/termine");
        setTermine(result.data);
        console.log(result.data);
    }

    const currentDateTime = async () => {
        const result = await axios.get("http://localhost:4000/api/currentDate");
        setCurrentDate(result.data);
        //console.log(result.data);
        if (currentDate == habDateFin) {
            toast.success("Une habilitation vient de terminée !!!!");
        }
    }

    // function delete habilitation
    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteHabilitation/${habId}`
        axios.delete(url);
        loadHabilitations();
        window.location.reload();
    }

    const navigate = useNavigate();

    useEffect(() => {
        loadHabilitations();
        loadVtotal();
        loadEncours();
        loadTermine();
        currentDateTime();
        let username = sessionStorage.getItem('username');
        if (username === '' || username === null) {
            navigate('/login');
        }
        document.title = "Habilitation";
    }, [])

    // const date = new Date().toLocaleDateString();
    // console.log(date); // 6/17/2022
    // if (date == habDateFin) {
    //     toast.success("terminé");
    // }

    return (
        <body>
            <NavBar />
            <Base />
            <main id='main' class='main'>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-4'>
                            <Card>
                                <Card.Header>
                                    <FontAwesomeIcon icon={faList} /> Total habilitation :
                                </Card.Header>
                                <Card.Body>
                                    {
                                        vtotal.map((val) => (
                                            <h2 style={{ float: 'right', color: '#0B5ED7' }}>{val.total}</h2>
                                        ))
                                    }
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-4'>
                            <Card>
                                <Card.Header>
                                    <FontAwesomeIcon icon={faSpinner} /> Habilitation en cours :
                                </Card.Header>
                                <Card.Body>
                                    {
                                        encours.map((en) => (
                                            <h2 style={{ float: 'right', color: '#0B5ED7' }}>{en.encours}</h2>
                                        ))
                                    }
                                </Card.Body>
                            </Card>
                        </div>

                        <div className='col-md-4'>
                            <Card>
                                <Card.Header>
                                    <FontAwesomeIcon icon={faCheck} /> Habilitation terminé :
                                </Card.Header>
                                <Card.Body>
                                    {
                                        termine.map((fini) => (
                                            <h2 style={{ float: 'right', color: '#0B5ED7' }}>{fini.termine}</h2>
                                        ))
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className='card-title' style={{ color: '#798eb3' }}>Agence</h5>
                                    <ChartPie />
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h5 className="card-title" style={{ color: '#798eb3' }}>Agent</h5>
                                    <ChartBar />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='mb-4 mt-2'>
                            <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                                <FontAwesomeIcon icon={faPlus} />
                                Ajouter habilitation
                            </Button>
                        </div>

                        <div className='form-group mb-4'>
                            <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher ...' />
                        </div>
                    </div>


                    <div className='row'>
                        <Table striped bordered hover responsive size='sm'>
                            <thead>
                                <tr>
                                    <th>Code Exp</th>
                                    <th>Fonction titulaire</th>
                                    <th>Fonction interim</th>
                                    <th>Agence entrant</th>
                                    <th>Agence sortant</th>
                                    <th>Type habilitation</th>
                                    <th>Support</th>
                                    <th>Caisse entrant</th>
                                    <th>Caisse sortant</th>
                                    <th>Date début</th>
                                    <th>Date fin</th>
                                    <th>Statut début</th>
                                    <th>Statut fin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    habilitations.filter((item) => {
                                        return search.toLowerCase() === ''
                                            ? item
                                            : item.persCodeExp.toLowerCase().includes(search);
                                    }).map((item) => (
                                        <tr key={item.habId}>
                                            <td>{item.persCodeExp}</td>
                                            <td>{item.roleFonction}</td>
                                            <td>{item.foncInterim}</td>
                                            <td>{item.etabCode}</td>
                                            <td>{item.etabCodeSortant}</td>
                                            <td>{item.typeHabCode}</td>
                                            <td>{item.supportCode}</td>
                                            <td>{item.habCaisse}</td>
                                            <td>{item.habCaisseSortant}</td>
                                            <td>{format(new Date(item.habDateDebut), 'dd/MM/yyyy')}</td>
                                            <td>{format(new Date(item.habDateFin), 'dd/MM/yyyy')}</td>
                                            <td>
                                                <Form.Check type="switch" id="custom" checked={item.statusDebut} />
                                            </td>
                                            <td>
                                                <Form.Check type="switch" id="custom" checked={item.statusFin} />
                                            </td>
                                            <td>
                                                <ButtonGroup aria-label='Basic example'>
                                                    <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowHabilitation(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                                    <Button size='sm' variant='warning'>
                                                        <Link to={`/habilitation/updateHabilitation/${item.habId}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </Link>
                                                    </Button>
                                                    <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowHabilitation(item), setHabId(item.habId), setDeleteHabilitation(true)) }}> <FontAwesomeIcon icon={faTrash} /> </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
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
                                        <strong>Code exploitant             :</strong> {rowHabilitation.persCodeExp}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Fonction titulaire          :</strong> {rowHabilitation.roleFonction}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Fonction interimaire        :</strong> {rowHabilitation.foncInterim}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Agence entrant              :</strong> {rowHabilitation.etabCode}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Agence sortant              :</strong> {rowHabilitation.etabCodeSortant}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Code de type d'habilitation :</strong> {rowHabilitation.typeHabCode}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Code de support             :</strong> {rowHabilitation.supportCode}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Caisse entrant              :</strong> {rowHabilitation.habCaisse}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Caisse sortant              :</strong> {rowHabilitation.habCaisseSortant}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Date début                  :</strong> {rowHabilitation.habDateDebut}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Date fin                    :</strong> {rowHabilitation.habDateFin}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Statut début                :</strong> <Form.Check type="switch" id="custom" checked={rowHabilitation.statusDebut} />
                                    </div>
                                    <div className='form-group'>
                                        <strong>Status fin                  :</strong> <Form.Check type="switch" id="custom" checked={rowHabilitation.statusFin} />
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleViewClose}>Close</Button>
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
                                    <h5>Vouler vous vraiment supprimer ?</h5>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <ButtonGroup>
                                    {
                                        deleteHabilitation && (
                                            <Button size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                                        )
                                    }
                                    <Button size='sm' onClick={handleDeleteClose} variant="secondary">Annuler</Button>
                                </ButtonGroup>
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
                                <Modal.Title>Ajouter Habilitation</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridCode">
                                            <Form.Label>Code exploitant :</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setPersCodeExp(e.target.value)} placeholder="code exploitant " />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridFonc">
                                            <Form.Label>Fonction titulaire : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setRoleFonction(e.target.value)} placeholder="fonction titulaire" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridFoncInt">
                                            <Form.Label>Fonction intérim :</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setFoncInterim(e.target.value)} placeholder="fonction intérimaire" />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Agence entrant : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setEtabCode(e.target.value)} placeholder="code agence entrant" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Agence sortant : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setEtabCodeSortant(e.target.value)} placeholder="code agence sortant" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridCode">
                                            <Form.Label>Type d'habilitation :</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setTypeHabCode(e.target.value)} placeholder="code type habilitation" />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Code de support : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setSupportCode(e.target.value)} placeholder="code support" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Caisse entrant : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setHabCaisse(e.target.value)} placeholder="caisse entrant" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Caisse sortant : </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setHabCaisseSortant(e.target.value)} placeholder="caisse entrant" />
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                    </Row>
                                    <Row className='mb-3'>
                                        <Form.Group as={Col} controlId="formGridCode">
                                            <Form.Label>Date début :</Form.Label>
                                            <Form.Control type="date" onChange={(e) => setHabDateBebut(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGrid">
                                            <Form.Label>Date fin : </Form.Label>
                                            <Form.Control type="date" onChange={(e) => setHabDateFin(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="checkbox">
                                            <Form.Label>Status debut :</Form.Label>
                                            <Form.Check type="switch" defaultChecked={statusDebut} onChange={() => setStatusDebut(!statusDebut)} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="checkbox">
                                            <Form.Label>Status fin :</Form.Label>
                                            <Form.Check type="switch" defaultChecked={statusFin} onChange={() => setStatusFin(!statusFin)} />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <ButtonGroup>
                                    <Button type='submit' size='sm' variant='success' onClick={handlePost} >Enregistrer</Button>
                                    <Button size='sm' variant='secondary' onClick={handleAddClose} >fermer</Button>
                                </ButtonGroup>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </main>
        </body>
    )
}
