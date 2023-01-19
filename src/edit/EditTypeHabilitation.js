import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, ButtonGroup, Card, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditTypeHabilitation() {

    let navigate = useNavigate();
    const [typeHabilitation, setTypeHabilitation] = useState({
        typeHabCode: "",
        typeHabDesc: ""
    })

    const { typeHabCode, typeHabDesc } = typeHabilitation;
    const { typeHabId } = useParams();

    const validate = () => {
        let result = true;
        if (typeHabCode === '' || typeHabCode === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (typeHabDesc === '' || typeHabDesc === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        return result;
    }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setTypeHabilitation({
            ...typeHabilitation,
            [name]: value
        })
    }

    const updateTypeHabilitation = async (e) => {
        e.preventDefault();
        if (validate()) {
            await axios.put(`http://localhost:4000/api/updateTypeHabilitation/${typeHabId}`, typeHabilitation);
            navigate("/typeHabilitation");
            toast.success('Modification réussie')
        }
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
                                    <ButtonGroup className='mt-3'>
                                        <Button type='submit' variant="primary">Valider</Button>
                                        <Button variant="secondary">
                                            <Link to={'/typeHabilitation'}>
                                                retour
                                            </Link>
                                        </Button>
                                    </ButtonGroup>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
