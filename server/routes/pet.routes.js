// thing.router.js
const PetCtrl= require('../controllers/pet.controller');

module.exports = (app)=>{
    // Get
    app.get("/api/hello", PetCtrl.testRoutes);
    app.get("/api/pets", PetCtrl.findAllPets);
    app.get("/api/pets/:id", PetCtrl.findOnePet);

    // Post
    app.post("/api/pets", PetCtrl.createPet);
    
    // Put
    app.put("/api/pets/:id", PetCtrl.updatePet);

    // Delete
    app.delete("/api/pets/:id", PetCtrl.deletePet);
}