import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Test from './components/Test';
import OnePet from './components/OnePet';
import PetEdit from './components/PetEdit';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {

  const [newPetToggle, setNewPetToggle] = useState(false)

  return (
<Router>
      <div className="App">
        <div className='bg-primary mb-3'>
          <h1 className='text-primary text-center bg-primary text-white p-2'>Adopt a Pet</h1>
          <div className='text-center pb-3'>
            <Link to={`/`} type="button" className=" btn btn-outline-light mx-2 shadow">Home</Link>
            <Link to={`/pets/new`} type="button" className=" btn btn-outline-warning mx-2 shadow">Add Pet</Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/">
            <PetList/>
          </Route>
          <Route exact path="/pets/new">
            <PetForm newPetToggle={newPetToggle} setNewPetToggle={setNewPetToggle}/>
          </Route>
          <Route exact path="/pets/:_id">
            <OnePet/>
          </Route>
          <Route exact path="/pets/edit/:_id">
            <PetEdit/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
