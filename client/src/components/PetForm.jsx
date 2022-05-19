import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PetForm = (props) => {
    const history = useHistory();
    const[name, setName] = useState("")
    const[type, setType] = useState("")
    const[desc, setDesc] = useState("")
    const[skillOne, setSkillOne] = useState("")
    const[skillTwo, setSkillTwo] = useState("")
    const[skillThree, setSkillThree] = useState("")
    const[errors, setErrors] = useState({
        name : "",
        type : "",
        desc : "",
        duplicate: ""
    })

    const addPet = (e) =>{
        e.preventDefault()
        const skills = [skillOne,skillTwo,skillThree]
        let formInfo = {
            name,
            type,
            desc,
            skills
        }
        
        console.log(formInfo)

        axios.post('http://localhost:8000/api/pets', formInfo)
        .then(response =>{
            if(response.data.error){
                console.log(response)
                if (response.data.error.code == 11000){
                    setErrors({
                        duplicate : {
                            message:`${name} is already in our system, Please add a different pet.`
                        }
                    })
                } else{
                    setErrors(response.data.error.errors)
                
                }
                
            } else{
                setName("");
                props.setNewPetToggle(!props.newPetToggle)
                history.push("/")
            }
        })
        .catch(error => {console.log(error)})
    }
    return (
        <div>
            <div className="container">
            <h1 className='text-danger text-center w-75 mx-auto p-2'>{errors.duplicate?.message}</h1>
                <div className="w-50 mx-auto">
                
                    <h2>Create a new Pet!</h2>
                    <form onSubmit={addPet}>
                    <div className="form-group pb-2">
                        <label htmlFor="name">Name </label>
                        <input onChange={(e) => setName(e.target.value)}   type="text" className="form-control" id="name" value={name}/>
                        <p className='text-danger text-center w-50 mx-auto p-2'>{errors.name?.message}</p>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="type">type </label>
                        <input onChange={(e) => setType(e.target.value)}   type="text" className="form-control" id="type" value={type}/>
                        <p className='text-danger text-center w-50 mx-auto p-2'>{errors.type?.message}</p>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="desc">Description </label>
                        <input onChange={(e) => setDesc(e.target.value)}   type="text" className="form-control" id="desc" value={desc}/>
                        <p className='text-danger text-center w-50 mx-auto p-2'>{errors.desc?.message}</p>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="skillOne">Skill 1 </label>
                        <input onChange={(e) => setSkillOne(e.target.value)}   type="text" className="form-control" name="skillOne" id="skillOne" value={skillOne}/>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="skillTwo">Skill 2 </label>
                        <input onChange={(e) => setSkillTwo(e.target.value)}   type="text" className="form-control" name="skillTwo" id="skillTwo" value={skillTwo}/>
                    </div>
                    <div className="form-group pb-2">
                        <label htmlFor="skillThree">Skill 3 </label>
                        <input onChange={(e) => setSkillThree(e.target.value)}   type="text" className="form-control" name="skillThree" id="skillThree" value={skillThree}/>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 my-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PetForm;
