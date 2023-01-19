import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Form, Col, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function EditHabilitation() {

    let navigate = useNavigate();
    const [habilitation, setHabilitation] = useState({
        persCodeExp: "",
        roleFonction: "",
        foncInterim: "",
        etabCode: "",
        etabCodeSortant: "",
        typeHabCode: "",
        supportCode: "",
        habCaisse: "",
        habCaisseSortant: "",
        habDateDebut: "",
        habDateFin: "",
        statusDebut: true,
        statusFin: true
    })

    const { persCodeExp, roleFonction, foncInterim, etabCode, etabCodeSortant, typeHabCode, supportCode, habCaisse, habCaisseSortant, habDateDebut, habDateFin, statusDebut, statusFin } = habilitation;
    const { habId } = useParams();

    const validate = () => {
        let result = true;
        if (persCodeExp === '' || persCodeExp === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (roleFonction === '' || roleFonction === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (foncInterim === '' || foncInterim === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (etabCode === '' || etabCode === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (typeHabCode === '' || typeHabCode === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (supportCode === '' || supportCode === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (habCaisse === '' || habCaisse === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (habDateDebut === '' || habDateDebut === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (habDateFin === '' || habDateFin === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        return result;
    }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setHabilitation({
            ...habilitation,
            [name]: value
        })
    }

    const updateHabilitation = async (e) => {
        e.preventDefault();
        if (validate()) {
            await axios.put(`http://localhost:4000/api/updateHabilitation/${habId}`, habilitation);
            navigate("/habilitation");
            toast.success('Modification réussie')
        }
    }

    const loadHabilitation = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/habilitation/${habId}`);
            setHabilitation(result.data);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHabilitation();
    }, [])

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <div className='row'>
                <Card>
                    <Card.Header>
                        <h3>
                            <strong>Modification habilitation</strong>
                        </h3>
                    </Card.Header>

                    <Card.Body>
                        <Form onSubmit={updateHabilitation}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCode">
                                    <Form.Label>Code exploitant :</Form.Label>
                                    <Form.Control type="text" id="persCodeExp" name="persCodeExp" value={persCodeExp} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridFonc">
                                    <Form.Label>Fonction titulaire : </Form.Label>
                                    <Form.Control type="text" id="roleFonction" name="roleFonction" value={roleFonction} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridFoncInt">
                                    <Form.Label>Fonction intérim :</Form.Label>
                                    <Form.Control type="text" id="foncInterim" name="foncInterim" value={foncInterim} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Agence entrant : </Form.Label>
                                    <Form.Control type="text" id="etabCode" name="etabCode" value={etabCode} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Agence sortant : </Form.Label>
                                    <Form.Control type="text" id="etabCodeSortant" name="etabCodeSortant" value={etabCodeSortant} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCode">
                                    <Form.Label>Type d'habilitation :</Form.Label>
                                    <Form.Control type="text" id="typeHabCode" name="typeHabCode" value={typeHabCode} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Code de support : </Form.Label>
                                    <Form.Control type="text" id="supportCode" name="supportCode" value={supportCode} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Caisse entrant: </Form.Label>
                                    <Form.Control type="text" id="habCaisse" name="habCaisse" value={habCaisse} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Caisse sortant: </Form.Label>
                                    <Form.Control type="text" id="habCaisseSortant" name="habCaisse" value={habCaisseSortant} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCode">
                                    <Form.Label>Date début :</Form.Label>
                                    <Form.Control type="date" id="habDateDebut" name="habDateDebut" value={habDateDebut} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGrid">
                                    <Form.Label>Date fin : </Form.Label>
                                    <Form.Control type="date" id="habDateFin" name="habDateFin" value={habDateFin} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group as={Col} controlId="checkbox">
                                    <Form.Label>Status debut :</Form.Label>
                                    <Form.Check type="switch" defaultChecked={statusDebut} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="checkbox">
                                    <Form.Label>Status fin :</Form.Label>
                                    <Form.Check type="switch" defaultChecked={statusFin} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <ButtonGroup className='mt-3'>
                                <Button type='submit' variant='primary'>Valider</Button>
                                <Button variant='secondary'>
                                    <Link to={'/habilitation'}>
                                        retour
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
