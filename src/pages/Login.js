import React, { useEffect, useState } from 'react'
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Background from '../layout/assets/img/izy.jpg';

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
        <div className='container'>
            <div className='row'>
                <div className='offset-lg-4 col-lg-6'>
                    <form className='container mt-4' onSubmit={isProccedLogin}>
                        <Card style={{ width: '25rem' }}>
                            <Card.Img variant='top' src={require('../layout/assets/img/logo.png')} height={200} />
                            <Card.Body className='mt-4'>
                                <h3><center>E-HABILITATION</center></h3>
                                <FloatingLabel controlId='pseudo' label="Nom d'utilisateur" className='mb-3 mt-3'>
                                    <Form.Control value={username} onChange={e => usernameUpdate(e.target.value)} placeholder="Nom d'utilisateur" />
                                </FloatingLabel>
                                <FloatingLabel controlId='mdp' label="Mot de passe" className='mb-3'>
                                    <Form.Control type='password' value={password} onChange={e => passwordUpdate(e.target.value)} placeholder="Mot de" />
                                </FloatingLabel>
                            </Card.Body>
                            <Card.Footer>
                                <Button type='submit' variant='primary' style={{ float: 'right' }} >se connecter</Button>
                                <Link to={'/register'} >Ajouter nouvel utilisateur ?</Link>
                            </Card.Footer>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )
}
