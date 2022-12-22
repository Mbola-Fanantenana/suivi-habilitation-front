import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';


export default function TypeHabilitation() {

    const [typeHabilitations, setTypeHabilitations] = useState([]);
    const [rowTypeHabilitation, setRowTypeHabilitation] = useState([]);


    const [typeHabCode, setTypeHabCode] = useState("");
    const [typeHabDesc, setTypeHabDesc] = useState("");
    const typeHabInfo = { typeHabCode, typeHabDesc };

    //Add type habilitation
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    //detail type habilitation
    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    //for delete etablissement
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    //function add type habilitation
    const handlePost = async (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/api/saveTypeHabilitation"
        axios.post(url, typeHabInfo);
        loadTypeHabilitations();
        window.location.reload();
    }

    const [typeHabId, setTypeHabId] = useState("");
    const [deleteType, setDeleteType] = useState(false);

    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteTypeHabilitation/${typeHabId}`
        axios.delete(url);
        loadTypeHabilitations();
        window.location.reload();

    }
    //function get all type habilitation
    const loadTypeHabilitations = async () => {
        const result = await axios.get("http://localhost:4000/api/typehabilitations");
        setTypeHabilitations(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        loadTypeHabilitations();
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                        <FontAwesomeIcon icon={faPlus} />
                        Ajouter type habilitation
                    </Button>
                </div>
            </div>

            <div className='row'>

                <Table striped bordered hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th>Code type habilitation</th>
                            <th>Description </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeHabilitations.map((item) => (
                                <tr key={item.typeHabId}>
                                    <td>{item.typeHabCode}</td>
                                    <td>{item.typeHabDesc}</td>
                                    <td>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowTypeHabilitation(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                            <Button size='sm' variant='warning'>
                                                <Link to={`/typehabilitation/updateTypeHabilitation/${item.typeHabId}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                            </Button>
                                            <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowTypeHabilitation(item), setTypeHabId(item.typeHabId), setDeleteType(true)) }}> <FontAwesomeIcon icon={faTrash} /> </Button>
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
                                <input type="text" className='form-control' value={rowTypeHabilitation.typeHabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowTypeHabilitation.typeHabDesc} readOnly />
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
                        <Modal.Title>Ajouter etablissement</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Code type habilitation :</label>
                                <input type="text" className='form-control' onChange={(e) => setTypeHabCode(e.target.value)} placeholder="entrer code " required />
                            </div>
                            <div className='form-group'>
                                <label>Description type habilitation :</label>
                                <input type="text" className='form-control' onChange={(e) => setTypeHabDesc(e.target.value)} placeholder="entrer description" required />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button type='submit' size='sm' variant='success' onClick={handlePost}>Enregistrer</Button>
                        <Button size='sm' variant="secondary" onClick={handleAddClose}>fermer</Button>
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
                                <input type="text" className='form-control' value={rowTypeHabilitation.typeHabCode} readOnly />
                            </div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={rowTypeHabilitation.typeHabDesc} readOnly />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            deleteType && (
                                <Button size='sm' variant='danger' onClick={handleDelete}>Supprimer</Button>
                            )
                        }
                        <Button size='sm' variant="secondary" onClick={handleDeleteClose}>fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}
