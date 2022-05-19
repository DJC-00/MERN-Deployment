import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PetEdit = () => {

    const history = useHistory();
    const {_id} = useParams();
    const [petInfo, setPetInfo] = useState({})
    const[errors, setErrors] = useState({
        name : "",
    })

    const formChange = (e) =>{
        if (e.target.name != 'skills'){
        setPetInfo({
            ...petInfo,
            [e.target.name] : e.target.value,
        })
        console.log(e.target)
    } else{
        let skillsCopy = petInfo.skills
        console.log(skillsCopy)
        skillsCopy[e.target.id] = e.target.value
        setPetInfo({
            ...petInfo
        })
    }
    
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/${_id}`, petInfo)
        .then(response => {
            if(response.data.error){
                setErrors(response.data.error.errors)   
            } else{
                history.push(`/pets/${_id}`)
            }
        })
        .catch()
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${_id}`)
        .then(response =>{
            setPetInfo(response.data.results)
            console.log(petInfo)
        })
        .catch(error => {console.log(error)})
    }, []);

    console.log(petInfo)

    
    return (
            <div>
                <div className="container">
                    <div className="w-50 mx-auto">
                        <h2 className='text-center'>Edit Pet {_id}</h2>
                        {petInfo ? 
                            <form onSubmit={submitHandler}>
                            <div className="form-group pb-2">
                                <label htmlFor="name">Name </label>
                                <input onChange={formChange}   type="text" className="form-control" name="name" id="name" value={petInfo.name}/>
                                <p className='text-danger text-center w-50 mx-auto p-2'>{errors.name?.message}</p>
                            </div>
                            <div className="form-group pb-2">
                                <label htmlFor="type">type </label>
                                <input onChange={formChange}   type="text" className="form-control" name="type" id="type" value={petInfo.type}/>
                                <p className='text-danger text-center w-50 mx-auto p-2'>{errors.type?.message}</p>
                            </div>
                            <div className="form-group pb-2">
                                <label htmlFor="desc">Description </label>
                                <input onChange={formChange}   type="text" className="form-control" name="desc" id="desc" value={petInfo.desc}/>
                                <p className='text-danger text-center w-50 mx-auto p-2'>{errors.desc?.message}</p>
                            </div>
                            {petInfo.skills?.map((skill, index) => {
                                return(
                                <div key={index} className="form-group pb-2">
                                    <label htmlFor="skillOne">Skill {index + 1}  </label>
                                    <input onChange={formChange}   type="text" className="form-control" name="skills" id={index} value={petInfo.skills[index]}/>
                                </div>
                                )
                            })}

                            <button type="submit" className="btn btn-primary mt-4 my-2">Submit</button>
                            <Link to={`/`} type="button" className=" btn btn-outline-danger ms-2 mt-4 my-2 shadow">Cancel</Link>
                            </form>
                        :
                            <div>
                                <div className='text-center border-danger border-2 border p-3'>
                                    <h2>❌ Pet ID not found ❌</h2>
                                    <h3> Would you like to add that pet to the list?</h3>
                                </div>
                                    <div className="d-flex justify-content-center pt-3">
                                        <Link to={`/pets/new`} type="button" className=" btn btn-outline-dark mx-2 shadow">Add Pet</Link>
                                        <Link to={`/`} type="button" className=" btn btn-outline-danger mx-2 shadow">Cancel</Link>
                                    </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );

    }

export default PetEdit;
