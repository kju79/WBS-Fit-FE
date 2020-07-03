import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// import './styles.css';

import Login from "./components/Login";
import Create from "./components/Create";
import Equipments from "./components/Equipments";
import Exercises from "./components/Exercises";
import Dashboard from "./components/Dashboard";
import Browse from "./components/Browse";
import MeContext from "./context/MeContext";
import Success from "./components/Success";
import { UtilContext } from "./context/UtilContext";

function App() {
  const serverURL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_PRODUCTION
      : process.env.REACT_APP_SERVER_DEVELOPMENT;

  const [trainingData, setTrainingData] = useState(null);
  const [chosenExData, setChosenExData] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch(`${serverURL}/user/me/5efca5151e086210185f4f2a`)
      .then((res) => res.json())
      .then((data) => setMe(data));
  }, [serverURL]);

  useEffect(() => {
    fetch(`${serverURL}/exercise`)
      .then((res) => res.json())
      .then((data) => setTrainingData(data));
  }, [serverURL]);

  console.log(process.env.REACT_APP_SERVER);

  return (
    <UtilContext.Provider value={serverURL}>
      <MeContext.Provider value={me}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create/:equipment/:muscle">
            <Exercises data={chosenExData} onChoose={setChosenExData} />
          </Route>
          <Route path="/x/:equipment">
            <Equipments trainingData={trainingData} />
          </Route>
          <Route path="/create">
            <Create data={chosenExData} />
          </Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" exact component={Login} />
          <Route path="/browse/:workouttype" component={Browse} />
          <Route path="/success" component={Success} />
        </Switch>
      </MeContext.Provider>
    </UtilContext.Provider>
  );
}

export default App;
