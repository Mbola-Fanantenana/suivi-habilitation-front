import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Form, Row, Col } from 'react-bootstrap';

export default function EditPersonnel() {

    let navigate = useNavigate();
    const [personnel, setPersonnel] = useState({
        persCodeExp: "",
        persNom: "",
        persPrenom: "",
        persLogin: "",
        persMat: "",
        persCIN: "",
        persNumTel: "",
        persEmail: ""
    })

    const { persCodeExp, persNom, persPrenom, persLogin, persMat, persCIN, persNumTel, persEmail } = personnel;
    const { persId } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setPersonnel({
            ...personnel,
            [name]: value
        })
    }

    //function edit personnel
    const updatePersonnel = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/updatePersonnel/${persId}`, personnel);
        navigate("/personnel");
    }

    const loadPersonnel = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/personnel/${persId}`);
            setPersonnel(result.data);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadPersonnel();
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
                            <strong>Modification personnel</strong>
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={updatePersonnel}>
                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label>Code exploitant :</Form.Label>
                                    <Form.Control
                                        type={"text"} id="persCodeExp" name="persCodeExp" value={persCodeExp} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label> Nom : </Form.Label>
                                    <Form.Control type={"text"} id="persNom" name="persNom" value={persNom} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label> Prénom : </Form.Label>
                                    <Form.Control type={"text"} id="persPrenom" name="persPrenom" value={persPrenom} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label> Login : </Form.Label>
                                    <Form.Control type={"text"} id="persLogin" name="persLogin" value={persLogin} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label> Numéro matricule : </Form.Label>
                                    <Form.Control type={"text"} id="persMat" name="persMat" value={persMat} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label> Numéro CIN : </Form.Label>
                                    <Form.Control type={"text"} id="persCIN" name="persCIN" value={persCIN} onChange={handleChange} />
                                </Form.Group>
                            </Row>

                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label> Numéro téléphone : </Form.Label>
                                    <Form.Control type={"text"} id="persNumTel" name="persNumTel" value={persNumTel} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label> Adresse mail : </Form.Label>
                                    <Form.Control type={"email"} id="persEmail" name="persEmail" value={persEmail} onChange={handleChange} />
                                </Form.Group>
                            </Row>
                            <button type='submit' className="btn btn-primary">Valider</button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
