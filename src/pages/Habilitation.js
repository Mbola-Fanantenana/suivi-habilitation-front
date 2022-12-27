import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Card, Modal, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus, faCheck, faList, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Habilitation() {

    const [habilitations, setHabilitations] = useState([]);
    const [rowHabilitation, setRowHabilitation] = useState([]);
    const [vtotal, setVtotal] = useState([]);
    const [encours, setEncours] = useState([]);
    const [termine, setTermine] = useState([]);

    const [deleteHabilitation, setDeleteHabilitation] = useState(false);
    const [habId, setHabId] = useState("");

    //details habilitations
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    //for delete personnel
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
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

    const handleDelete = () => {
        const url = `http://localhost:4000/api/habilitation/${habId}`
        axios.delete(url);
        loadHabilitations();
        console.log();
    }

    useEffect(() => {
        loadHabilitations();
        loadVtotal();
        loadEncours();
        loadTermine();
    }, [])

    return (
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
                                    <h2 style={{ float: 'right' }}>{val.total}</h2>
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
                                    <h2 style={{ float: 'right' }}>{en.encours}</h2>
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
                                    <h2 style={{ float: 'right' }}>{fini.termine}</h2>
                                ))
                            }
                        </Card.Body>
                    </Card>
                </div>

                <div className='mb-4'>
                    <Button size='sm' variant='primary'>
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
                            <th>Fonction interimaire</th>
                            <th>Type habilitation</th>
                            <th>Support</th>
                            <th>Caisse</th>
                            <th>Code agence</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Statut fin</th>
                            <th>Statut début</th>
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
                                    <td>{item.typeHabCode}</td>
                                    <td>{item.supportCode}</td>
                                    <td>{item.habCaisse}</td>
                                    <td>{item.etabCode}</td>
                                    <td>{item.habDateDebut}</td>
                                    <td>{item.habDateFin}</td>
                                    <td>{item.statusDebut}</td>
                                    <td>
                                        {item.statusFin}
                                    </td>
                                    <td>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowHabilitation(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                            <Button size='sm' variant='warning'> <FontAwesomeIcon icon={faPenToSquare} /> </Button>
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
                                <input type="text" className='form-control' value={rowHabilitation.persCodeExp} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.roleFonction} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.foncInterim} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.typeHabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.supportCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habCaisse} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.etabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habDateDebut} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habDateFin} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.statusDebut} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.statusFin} readOnly />
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
                        <Modal.Title>Détails</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <h3>Vouler vous vraiment supprimer ?</h3>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.persCodeExp} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.roleFonction} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.foncInterim} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.typeHabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.supportCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habCaisse} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.etabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habDateDebut} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.habDateFin} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.statusDebut} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowHabilitation.statusFin} readOnly />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            deleteHabilitation && (
                                <Button size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                            )
                        }
                        <Button variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>



        </div>
    )
}
