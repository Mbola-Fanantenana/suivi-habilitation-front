import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Profil() {

    const [profils, setProfils] = useState([]);

    const loadProfiles = async () => {
        const result = await axios.get("http://localhost:2000/user")
        setProfils(result.data);
        console.log(result.data);
    }

    const [id, setId] = useState("");

    const suppr = async () => {
        const url = `http://localhost:2000/user/${id}`
        await axios.delete(url);
        loadProfiles();
    }

    useEffect(() => {
        loadProfiles();
    }, [])

    return (
        <div>
            {
                profils.map((item) => (
                    <div className='col-md-4 mb-3'>
                        <Card>
                            <Card.Header>
                                <strong>{item.role}</strong>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text><strong>Nom d'utilisation : </strong>{item.id}</Card.Text>
                                <Card.Text><strong>Adresse email : </strong>{item.email}</Card.Text>
                                <Card.Text><strong>Mot de passe : </strong>{item.password}</Card.Text>

                                <Button size='sm' variant='danger' onClick={suppr}> Supprimer</Button>

                            </Card.Body>
                        </Card>
                    </div>
                ))
            }
        </div>
    )
}
