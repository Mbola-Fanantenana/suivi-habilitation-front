import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, ButtonGroup, Card, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Edit() {

    let navigate = useNavigate();
    const [role, setRole] = useState({
        roleFonction: "",
        roleDesc: "",
    });

    const { roleFonction, roleDesc } = role;
    const { roleId } = useParams();

    const validate = () => {
        let result = true;
        if (roleFonction === '' || roleFonction === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        if (roleDesc === '' || roleDesc === null) {
            result = false;
            toast.warning('veuillez remplir les champs')
        }
        return result;
    }

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        setRole({
            ...role,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {            
            await axios.put(`http://localhost:4000/api/updateRole/${roleId}`, role);
            navigate("/role");
            toast.success('Modification réussie');
        }
    }

    const loadRoles = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/role/${roleId}`);
            setRole(result.data)
            console.log(result.data)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <Card>
                    <Card.Header>
                        <h3>Modification role</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Row className='mb-3'>
                                <Form.Group>
                                    <Form.Label>Fonction titulaire :</Form.Label>
                                    <select className="form-control"
                                        id="roleFonction"
                                        name="roleFonction"
                                        value={roleFonction}
                                        onChange={handleChange}>
                                        <option>...</option>
                                        <option>chef agence</option>
                                        <option>ccl</option>
                                        <option>adjoint</option>
                                        <option>the dodo</option>
                                    </select>
                                </Form.Group>
                                <Form.Group controlId='formGridAgence'>
                                    <Form.Label>
                                        Description :
                                    </Form.Label>
                                    <Form.Control
                                        type={"text"}
                                        id="roleDesc"
                                        name="roleDesc"
                                        value={roleDesc}
                                        onChange={handleChange}
                                    />
                                    <ButtonGroup className='mt-3'>
                                        <Button type='submit' variant="primary">Valider</Button>
                                        <Button variant="secondary">
                                            <Link to={'/role'}>
                                            </Link>
                                            retour
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