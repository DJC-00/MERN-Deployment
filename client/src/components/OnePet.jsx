import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OnePet = () => {

    const {_id} = useParams();
    const history = useHistory();
    const [onePet, setOnePet] = useState({})

    const deletePet = () => {
        axios.delete(`http://localhost:8000/api/pets/${_id}`)
        .then(response => {
            console.log(response)
            history.push("/")
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${_id}`)
        .then(response => 
            setOnePet(response.data.results))
        .catch(error => console.log(error))
    },[_id])

    console.log(onePet.skills)
    return (
        <div className='container mx-auto'>      
        <div className='d-flex justify-content-center'>
            <div className="card w-50 text-white bg-primary mt-5 shadow">
                <img className="card-img-top" src="holder.js/100x180/" alt=""/>
                <div className="card-body">
                    <h4 className="card-title py-3 border-1 border-bottom border-top text-center">{onePet.name}</h4>
                    <h3 className=' card-text text-center'>Type:</h3>
                    <p className=' card-text text-center'>{onePet.type}</p>
                    <h3 className=' card-text text-center'>Description:</h3>
                    <p className=' card-text text-center'>{onePet.desc}</p>
                    <h3 className='text-center'>Skills:</h3>
                    <div className="d-flex justify-content-center gap-3">
                    {onePet.skills ? 
                    
                    onePet.skills.filter(skill => skill != "").map(skill => {
                        return(<p>{skill}</p>)
                    })
                    : 
                    <p>No Skills Listed</p>}

                    </div>
                </div>

            </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3 pt-2">
            <button onClick={deletePet} type="button" class="btn btn-success">Adopt {onePet.name}</button>
            <Link to={`/`}type="button" className="btn btn-outline-primary">Home</Link>
        </div>
                
    </div>
    );
}

export default OnePet;

