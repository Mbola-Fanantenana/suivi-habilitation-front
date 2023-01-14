import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Modal, ButtonGroup, Table, FloatingLabel, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import Base from './Base';

export default function Etablissement() {
    const [etablissements, setEtablissement] = useState([]);
    const [rowEtab, setRowEtab] = useState([]);

    //For details
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    const [etabCode, setEtabCode] = useState("");
    const [etabDesc, setEtabDesc] = useState("");
    const etabInfo = { etabCode, etabDesc };
    //Add etablissement
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    //for delete etablissement
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    //function add etablissement
    const handlePost = () => {
        const url = "http://localhost:4000/api/saveEtablissement"
        axios.post(url, etabInfo);
        loadEtablissement();
        window.location.reload();
    }

    const [etabId, setEtabId] = useState("");
    const [etablissementDelete, setEtablissementDelete] = useState(false);

    const [search, setSearch] = useState('');
    console.log(search);
    //function get all etablissements
    const loadEtablissement = async () => {
        const result = await axios.get("http://localhost:4000/api/etablissements");
        setEtablissement(result.data);
        console.log(result.data);
    }

    //function delete etablissements
    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteEtablissement/${etabId}`
        axios.delete(url);
        loadEtablissement();
        window.location.reload();
    }

    useEffect(() => {
        loadEtablissement();
        document.title = "Etablissement | Habilitation";
    }, [])

    return (
        <body>
            <NavBar />
            <Base />
            <main id="main" class="classe">
                <div className='container'>
                    <div className='row'>
                        <div className='mt-5 mb-4'>
                            <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                                <FontAwesomeIcon icon={faPlus} />
                                Ajouter etablissement
                            </Button>
                        </div>
                        <div className='form-group'>
                            <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder="rechercher etablissement" />
                        </div>
                    </div>
                    <br />
                    <div className='row'>
                        <Table striped bordered hover responsive size='sm'>
                            <thead>
                                <tr>
                                    <th> Code établissement</th>
                                    <th>Emplacement</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    etablissements.filter((item) => {
                                        return search.toLowerCase() === ''
                                            ? item
                                            : item.etabCode.toLowerCase().includes(search);
                                    }).map((item) => (
                                        <tr key={item.etabId}>
                                            <td>{item.etabCode}</td>
                                            <td>{item.etabDesc}</td>
                                            <td>
                                                <ButtonGroup aria-label='Basic example'>
                                                    <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowEtab(item)) }}>  <FontAwesomeIcon icon={faEye} /></Button>
                                                    <Button size='sm' variant='warning'>
                                                        <Link to={`/etablissement/updateEtablissement/${item.etabId}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                                    </Button>
                                                    <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowEtab(item), setEtabId(item.etabId), setEtablissementDelete(true)) }}> <FontAwesomeIcon icon={faTrash} /> </Button>
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
                                        <strong>Code établissement : </strong> {rowEtab.etabCode}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Emplacement : </strong>{rowEtab.etabDesc}
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button size='sm' variant="secondary" onClick={handleViewClose}>fermer</Button>
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
                                <Modal.Title>Details</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <h4>Vouler vous vraiment supprimer ?</h4>
                                    <div className='form-group'>
                                        <strong>Code établissement: </strong> {rowEtab.etabCode}
                                    </div>
                                    <div className='form-group'>
                                        <strong>Emplacement : </strong>{rowEtab.etabDesc}
                                    </div>
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <ButtonGroup>
                                    {
                                        etablissementDelete && (
                                            <Button size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                                        )
                                    }
                                    <Button size='sm' variant="secondary" onClick={handleDeleteClose}>fermer</Button>
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
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Ajouter etablissement</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <div>
                                    <Form.Label>Code etablissement :</Form.Label>
                                    <FloatingLabel controlId='toto' label='Code etablissement' className='mb-3'>
                                        <Form.Control type='text' onChange={(e) => setEtabCode(e.target.value)} placeholder='Code etablissement' />
                                    </FloatingLabel>

                                    <Form.Label>Emplacement :</Form.Label>
                                    <FloatingLabel controlId='toto' label='Emplacement' className='mb-3'>
                                        <Form.Control type='text' onChange={(e) => setEtabDesc(e.target.value)} placeholder='Emplacement' />
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
