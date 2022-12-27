import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Card, Form, Row } from 'react-bootstrap';

export default function EditEtablissement() {

    let navigate = useNavigate();
    const [etablissement, setEtablissement] = useState({
        etabCode: "",
        etabDesc: ""
    })

    const { etabCode, etabDesc } = etablissement;
    const { etabId } = useParams();
    const [validated, setValidated] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setEtablissement({
            ...etablissement,
            [name]: value
        })
    }

    const updateEtablissement = async (e) => {

        e.preventDefault();
        setValidated(true);
        await axios.put(`http://localhost:4000/api/updateEtablissement/${etabId}`, etablissement);
        navigate("/etablissement");
    }

    const loadEtablissements = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/etablissement/${etabId}`);
            setEtablissement(result.data);
            console.log(result.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadEtablissements();
    }, [])

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <div className='row'>
                <Card>
                    <Card.Header>
                        <h3><strong>Modification etablissement</strong></h3>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={updateEtablissement}>
                            <Row className='mb-3'>
                                <Form.Group controlId="formGridCode">
                                    <Form.Label>Code etablissement :</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        id="etabCode"
                                        name="etabCode"
                                        value={etabCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridDesc">
                                    <Form.Label>
                                        Description :
                                    </Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        id="etabDesc"
                                        name="etabDesc"
                                        value={etabDesc}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button type='submit' size='sm' variant="primary">Enregistrer</Button>
                                    <Button size='sm' variant="secondary">
                                        <Link to={'/etablissement'}>
                                        </Link>
                                        retour
                                    </Button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
