import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Form, Row } from 'react-bootstrap';

export default function EditTypeHabilitation() {

    let navigate = useNavigate();
    const [typeHabilitation, setTypeHabilitation] = useState({
        typeHabCode: "",
        typeHabDesc: ""
    })

    const { typeHabCode, typeHabDesc } = typeHabilitation;
    const { typeHabId } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setTypeHabilitation({
            ...typeHabilitation,
            [name]: value
        })
    }

    const updateTypeHabilitation = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/updateTypeHabilitation/${typeHabId}`, typeHabilitation);
        navigate("/typeHabilitation");
    }

    const loadTypeHabilitation = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/typehabilitation/${typeHabId}`);
            setTypeHabilitation(result.data);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadTypeHabilitation();
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
                        <h3>
                            <strong>Modification type habilitation</strong>
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={updateTypeHabilitation}>
                            <Row className='mb-3'>
                                <Form.Group>
                                    <Form.Label>Code type habilitation :</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        className="form-control"
                                        id="typeHabCode"
                                        name="typeHabCode"
                                        value={typeHabCode}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Description :
                                    </Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        className="form-control"
                                        id="typeHabDesc"
                                        name="typeHabDesc"
                                        value={typeHabDesc}
                                        onChange={handleChange}
                                    />
                                    <button type='submit' className="btn btn-primary m-3">Valider</button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
