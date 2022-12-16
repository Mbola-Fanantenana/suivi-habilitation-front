import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Form, Row } from 'react-bootstrap';

export default function EditEtablissement() {

    let navigate = useNavigate();
    const [etablissement, setEtablissement] = useState({
        etabCode: "",
        etabDesc: ""
    })

    const { etabCode, etabDesc } = etablissement;
    const { etabId } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setEtablissement({
            ...etablissement,
            [name]: value
        })
    }

    const updateEtablissement = async (e) => {
        e.preventDefault();
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
                        <Form onSubmit={updateEtablissement}>
                            <Row className='mb-3'> 
                            <Form.Group controlId="formGridCode">
                                <Form.Label>Code etablissement :</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    id="etabCode"
                                    name="etabCode"
                                    value={etabCode}
                                    onChange={handleChange}
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
                                />
                                <button type='submit' className="btn btn-primary m-3">Enregistrer</button>
                            </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
