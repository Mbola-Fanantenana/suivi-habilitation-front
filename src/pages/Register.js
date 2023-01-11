import React, { useState } from 'react'
import { Button, ButtonGroup, Card, FloatingLabel, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    const isValidate = () => {
        let isProcced = true;
        let error = "champ vide dans :";

        if (id === null || id === '') {
            isProcced = false;
            error += " nom d'utilisatieur";
        }
        if (password === null || password === '') {
            isProcced = false;
            error += " mot de passe";
        }
        if (email === null || email === '') {
            isProcced = false;
            error += " adresse email";
        }
        if (role === null || role === '') {
            isProcced = false;
            error += " rôle";
        }

        if (!isProcced) {
            toast.warning(error);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isProcced = false;
                toast.warning('Adresse email invalide');
            }
        }

        return isProcced;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let obj = { id, password, email, role };
        if (isValidate()) {
            fetch("http://localhost:2000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(obj)
            }).then((res) => {
                toast.success('Authentification réussie');
                navigate('/login');
            }).catch((err) => {
                toast.error('Erreur');
            });
        }
    }

    return (
        <div className='offset-lg-3 col-lg-6'>
            <form className='container' onSubmit={handleSubmit}>
                <Card>
                    <Card.Header>
                        <Card.Title> <h4>Authentification</h4> </Card.Title>
                    </Card.Header>
                    <Card.Body>

                        <FloatingLabel controlId='nomUtil' label="Nom d'utilisateur" className='mb-3'>
                            <Form.Control value={id} onChange={e => setId(e.target.value)} placeholder="Nom d'utilisateur" />
                        </FloatingLabel>

                        <FloatingLabel controlId='mdp' label="Mot de passe" className='mb-3'>
                            <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
                        </FloatingLabel>

                        <FloatingLabel controlId='email' label="Adresse email" className='mb-3'>
                            <Form.Control value={id} onChange={e => setId(e.target.value)} placeholder="Adresse email" />
                        </FloatingLabel>

                        <FloatingLabel controlId='role' label="Nom d'utilisateur" className='mb-3'>
                            <Form.Control value={id} onChange={e => setId(e.target.value)} placeholder="Nom d'utilisateur" />
                        </FloatingLabel>

                        <div className='form-group'>
                            <label>Rôle :</label>
                            <select className='form-control' value={role} onChange={e => setRole(e.target.value)}>
                                <option>Administrateur</option>
                                <option>Utilisateur</option>
                            </select>
                        </div>

                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup>
                            <Button type='submit' size='sm' variant='success' >s'authentifier</Button>
                            <Button type='reset' size='sm' variant='secondary'>annuler</Button>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>
            </form>
        </div>
    )
}
