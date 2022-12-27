import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, ButtonGroup, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
//import { Link } from 'react-router-dom'

export default function Supports() {

    const [supports, setSupports] = useState([]);
    const [rowRoleShow, setRowRoleShow] = useState([]);

    const [viewShow, setViewShow] = useState(false);
    const handleViewShow = () => {
        setViewShow(true);
    }
    const handleViewClose = () => {
        setViewShow(false);
    }

    //Add support
    const [viewAdd, setViewAdd] = useState(false);
    const handleAddShow = () => {
        setViewAdd(true);
    }
    const handleAddClose = () => {
        setViewAdd(false);
    }

    //Edit role
    // const [viewEdit, setViewEdit] = useState(false);
    // const handleEditShow = () => {
    //     setViewEdit(true);
    // }
    // const handleEditClose = () => {
    //     setViewEdit(false);
    // }

    //Delete support
    const [viewDelete, setViewDelete] = useState(false);
    const handleDeleteShow = () => {
        setViewDelete(true);
    }
    const handleDeleteClose = () => {
        setViewDelete(false);
    }

    const [supportCode, setSupportCode] = useState("");
    const [supportDesc, setSupportDesc] = useState("");
    const [supportId, setSupportId] = useState("");
    const [supportDelete, setSupportDelete] = useState(false);

    const credentials = { supportCode, supportDesc };


    const loadSupports = async () => {
        const result = await axios.get('http://localhost:4000/api/supports');
        setSupports(result.data);
        console.log(result.data);
    }

    // add support
    const handlePost = () => {
        const url = 'http://localhost:4000/api/saveSupport';
        axios.post(url, credentials);
        loadSupports();
        window.location.reload();
    }

    // edit support
    // const handleEdit = async (e) => {
    //     e.preventDefault();
    //     const url = "http://localhost:4000/api/updateSupport/" + supportId
    //     await axios.put(url, credentials).then((response) => {
    //         setRowRoleShow(response.data.data);
    //         console.log(response.data.data);
    //     });
    //     window.location.reload();
    // }    

    // delete support
    const handleDelete = () => {
        const url = `http://localhost:4000/api/deleteSupport/${supportId}`;
        axios.delete(url);
        loadSupports();
        window.location.reload();
    }

    useEffect(() => {
        loadSupports();
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button size='sm' variant='primary' onClick={() => { handleAddShow() }}>
                        <FontAwesomeIcon icon={faPlus} />
                        Ajouter nouveau support
                    </Button>
                </div>
            </div>

            <div className='row'>

                <Table striped bordered hover responsive size='sm'>
                    <thead>
                        <tr>
                            <th>Support code</th>
                            <th>Support description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supports.map((item) => (
                                <tr key={item.supportId}>
                                    <td>{item.supportCode}</td>
                                    <td>{item.supportDesc}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <ButtonGroup aria-label='Basic example'>
                                            <Button size='sm' variant='secondary' onClick={() => { handleViewShow(setRowRoleShow(item)) }}> <FontAwesomeIcon icon={faEye} /> </Button>
                                            <Button size='sm' variant='warning'>
                                                <Link to={`/support/updateSupport/${item.supportId}`}> <FontAwesomeIcon icon={faPenToSquare} /> </Link>
                                            </Button>
                                            <Button size='sm' variant='danger' onClick={() => { handleDeleteShow(setRowRoleShow(item), setSupportId(item.supportId), setSupportDelete(true)) }} > <FontAwesomeIcon icon={faTrash} /> </Button>
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
                                <strong>Code support : </strong>{rowRoleShow.supportCode}
                            </div>
                            <div className='form-group'>
                                <strong>Description : </strong>{rowRoleShow.supportDesc} 
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button size='sm' variant="secondary" onClick={handleViewClose}>fermer</Button>
                    </Modal.Footer>
                </Modal>
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
                                <strong>Code support : </strong>{rowRoleShow.supportCode}
                            </div>
                            <div className='form-group'>
                                <strong>Description : </strong>{rowRoleShow.supportDesc} 
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonGroup>
                            {
                                supportDelete && (
                                    <Button type='submit' size='sm' variant='danger' onClick={handleDelete}>Supprimerfj</Button>
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
                        <Modal.Title>Ajouter un nouveau role</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Support code :</label>
                                <input type="text" className='form-control' onChange={(e) => setSupportCode(e.target.value)} placeholder="entrer fonction titulaire" />
                            </div>
                            <div className='form-group'>
                                <label>Description :</label>
                                <input type="text" className='form-control' onChange={(e) => setSupportDesc(e.target.value)} placeholder="entrer description" />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonGroup>
                            <Button type='submit' size='sm' variant='primary' onClick={handlePost}>Enregistrer</Button>
                            <Button size='sm' variant="secondary" onClick={handleAddClose}>Close</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>
            </div>


        </div >
    )
}
