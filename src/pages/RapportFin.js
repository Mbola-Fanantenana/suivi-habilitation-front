import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='form-group mb-4'>
                    <input type='text' className='form-control' onChange={(e) => setSearch(e.target.value)} placeholder='rechercher ...' />
                </div>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
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
                    </table>
                </div>
            </div>
        </div>
    )
}
