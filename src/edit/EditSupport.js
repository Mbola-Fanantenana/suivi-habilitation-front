import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Card, Form, Row } from 'react-bootstrap';

export default function EditSupport() {

    let navigate = useNavigate();
    const [support, setSupport] = useState({
        supportCode: "",
        supportDesc: ""
    });

    const { supportCode, supportDesc } = support;
    const { supportId } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setSupport({
            ...support,
            [name]: value
        })
    }

    const updateSupport = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/updateSupport/${supportId}`, support);
        navigate("/support");
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
                                    <button type='submit' className="btn btn-primary m-3">Valider</button>
                                    <button className="btn btn-secondary">
                                        <Link to={'/support'}>
                                        </Link>
                                        retour
                                    </button>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
