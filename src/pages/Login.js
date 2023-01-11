import React, { useEffect, useState } from 'react'
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {

    const [username, usernameUpdate] = useState('');
    const [password, passwordUpdate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const isProccedLogin = (e) => { 
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:2000/user/" + username).then((res) => {
                return res.json();
            }).then((reponse) => {
                console.log(reponse);
                if (Object.keys(reponse).length === 0) {
                    toast.error('nom utilisateur invalide')
                } else {
                    if (reponse.password === password) {
                        toast.success('Vous êtes connectés');
                        sessionStorage.setItem('username', username);
                        navigate('/habilitation');
                    } else {
                        toast.error('mot de passe invalide');
                    }
                }
            }).catch((err) => {
                toast.error('Erreur de connexion');
            })
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('champ nom utilisateur vide');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('champ mot de passe vide');
        }
        return result;
    }

    return (
        <div className='row'>
            <div className='offset-lg-3 col-lg-6'>
                <form className='container' onSubmit={isProccedLogin}>
                    <Card>
                        <Card.Header>
                            <Card.Title><h4>Login</h4></Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <FloatingLabel controlId='pseudo' label="Nom d'utilisateur" className='mb-3'>
                                <Form.Control  value={username} onChange={e => usernameUpdate(e.target.value)} placeholder="Nom d'utilisateur" />
                            </FloatingLabel>
                            <FloatingLabel controlId='mdp' label="Mot de passe" className='mb-3'>
                                <Form.Control type='password' value={password} onChange={e => passwordUpdate(e.target.value)} placeholder="Mot de" />
                            </FloatingLabel>
                            {/* <div className='form-group'>
                                <label>Nom d'utilisateur :</label>
                                <input value={username} onChange={e => usernameUpdate(e.target.value)} className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label>Mot de passe :</label>
                                <input type='password' value={password} onChange={e => passwordUpdate(e.target.value)} className='form-control' />
                            </div> */}
                        </Card.Body>
                        <Card.Footer>
                            <Button type='submit' variant='success' style={{ float: 'right' }} >se connecter</Button>
                            <Link to={'/register'} >Ajouter nouvel utilisateur ?</Link>
                        </Card.Footer>
                    </Card>
                </form>
            </div>
        </div>
    )
}
