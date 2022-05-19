
const Pet = require("../models/pet.model");


module.exports.testRoutes = (req,res)=>{
    res.json({msg: "Routes working"});
}

module.exports.findAllPets = (req,res)=>{
    Pet.find()
        .then(allPets=>{
            res.json({results: allPets})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.createPet = (req,res)=>{
    //req.body represents form information
    Pet.create(req.body)
        .then(newlyCreatedPet=>{
            res.json({results: newlyCreatedPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.findOnePet = (req,res)=>{
    Pet.findOne({_id: req.params.id})
        .then(foundPet =>{
            res.json({results: foundPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.updatePet = (req,res)=>{
    Pet.findOneAndUpdate(
        {_id: req.params.id}, //specify which pet to update
        req.body, //specify the form information to update the pet with
        { new: true, runValidators: true }
    )
        .then(updatedPet=>{
            res.json({results: updatedPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}

module.exports.deletePet = (req,res)=>{
    Pet.deleteOne({_id: req.params.id})
        .then(deletedPet=>{
            res.json({results: deletedPet})
        })
        .catch(err=>{
            res.json({msg:"Something went wrong", error: err})
        })
}