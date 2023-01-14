import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import NavBar from './NavBar';
import Base from './Base';

export default function RapportFin() {

    const [viewHabilitations, setViewHabilitations] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);

    const loadViewHabilitation = async () => {
        const result = await axios.get("http://localhost:4000/api/vHabilitations");
        console.log(result.data);
        setViewHabilitations(result.data);
    }

    useEffect(() => {
        loadViewHabilitation();
        document.title = "Rapport fin | Hablitation";
    }, [])

    return (
        <body>
            <NavBar />
            <Base />
            <main id='main' class='main'>
                <div className='container'>
                    <div className='row'>
                        <div className='form-group mb-4'>
                            <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher ...' />
                        </div>
                        <div className='table-responsive'>
                            <Table striped bordered hover responsive size='sm'>
                                <thead>
                                    <tr>
                                        <th>Code etablissement</th>
                                        <th>Code exploitant</th>
                                        <th>Fonction titulaire</th>
                                        <th>Fonction intérimaire</th>
                                        <th>Date fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewHabilitations.filter((item) => {
                                            return search.toLowerCase() === ''
                                                ? item
                                                : item.persCodeExp.toLowerCase().includes(search);
                                        }).map((item) => (
                                            <tr>
                                                <td>{item.etabCode}</td>
                                                <td>{item.persCodeExp}</td>
                                                <td>{item.roleFonction}</td>
                                                <td>{item.foncInterim}</td>
                                                <td>{item.habDateFin}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    )
}
