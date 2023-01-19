import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, ButtonGroup, Card, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EditSupport() {

    let navigate = useNavigate();
    const [support, setSupport] = useState({
        supportCode: "",
        supportDesc: ""
    });

    const { supportCode, supportDesc } = support;
    const { supportId } = useParams();

    const validate = () => {
        let result = true;
        if (supportCode === '' || supportCode === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (supportDesc === '' || supportDesc === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        return result;
    }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setSupport({
            ...support,
            [name]: value
        })
    }

    const updateSupport = async (e) => {
        e.preventDefault();
        if (validate()) {
            await axios.put(`http://localhost:4000/api/updateSupport/${supportId}`, support);
            navigate("/support");
            toast.success('Modification réussie')
        }
    }

    const loadSupports = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/support/${supportId}`);
            setSupport(result.data)
            console.log(result.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadSupports();
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
                            <strong>Modification support</strong>
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={updateSupport}>
                            <Row className='mb-3'>
                                <Form.Group>
                                    <Form.Label>Code support :</Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        id="supportCode"
                                        name="supportCode"
                                        value={supportCode}
                                        onChange={handleChange}
                                    /> 
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        support Description :
                                    </Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        id="supportDesc"
                                        name="supportDesc"
                                        value={supportDesc}
                                        onChange={handleChange}
                                    />
                                    <ButtonGroup className='mt-3'>
                                        <Button type='submit' variant="primary">Valider</Button>
                                        <Button variant="secondary">
                                            <Link to={'/support'}>
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
