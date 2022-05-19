import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const PetList = (props) => {
    const [petList, setPetList] = useState([]);
    const [delToggle, setDelToggle] = useState(false)


    const deletePet = (_id) => {
        axios.delete(`http://localhost:8000/api/pets/${_id}`)
        .then(response => {
            console.log(response)
            setDelToggle(!delToggle)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
        .then(response => {
            console.log(response.data.results)
            const sorted = response.data.results.sort((a, b) => a.type.localeCompare(b.type))
            setPetList(sorted)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [delToggle, props.newPetToggle]);

    return (
        
    <div className='container d-flex justify-content-center'>
        <table className="table table-dark table-hover w-50 text-center shadow my-5">
            <thead >
                <tr className=' table-primary'>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
                <tbody>
            {petList.map( pet => {
                return(
                <tr key={pet._id}>
                    <td>
                        <Link to={`pets/${pet._id}`} type="button" className=" link-light">{pet.name}</Link>
                    </td>
                    <td>{pet.type}</td>
                    <td className=''>
                        <Link to={`pets/edit/${pet._id}`} type="button" className="btn btn-sm btn-outline-primary mx-3">Edit</Link>
                        <button onClick={(e) => deletePet(pet._id)} type="button" className="btn btn-sm btn-success mx-3">Adopt</button>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </table>
    </div>
    );
}

export default PetList;
