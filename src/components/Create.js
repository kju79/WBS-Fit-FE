import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import "../styles.css";
import Footer from "./Footer";
import Spacer from "./Spacer";
import Navbar from "./Navbar";
import { useUtils } from "../context/UtilContext";

const Create = ({ data }) => {
  const serverURL = useUtils();
  const history = useHistory();

  const [equipmentData, setEquipmentData] = useState(null);
  const [workoutName, setWorkoutName] = useState(null);
  const [workoutType, setWorkoutType] = useState(null);

  useEffect(() => {
    fetch(`${serverURL}/equipment`)
      .then((res) => res.json())
      .then((data) => setEquipmentData(data));
  }, [serverURL]);

  const printValues = (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // console.log("outta printvalues : ", workoutName);
    // console.log("outta printvalues : ", workoutType);
    // console.log("outta printvalues : ", data);
    const selectedExercises = [];
    data.forEach((item) => selectedExercises.push(item._id));
    console.log(selectedExercises);

    const raw = JSON.stringify({
      name: `${workoutName}`,
      picture: "http://www.mischgeburten.net/picture.png",
      description: "Just a workout",
      wo_type: workoutType,
      exercises: selectedExercises,
      ratings: "0",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      // redirect: window.location.replace(`${serverURL}/dashboard`),
    };

    fetch(`${serverURL}/workout/add`, requestOptions)
      .then(() => history.push("/success"))
      // .then(() => history.push("/dashboard"))
      .catch((error) => console.log("error", error));
  };

  console.log(data);
  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div id="blank"></div>
        <div className="topic">
          create <span>workout</span>
        </div>

        <div className="container">
          {equipmentData &&
            equipmentData.map((equipment) => (
              <div key={equipment}>
                <button>
                  <Link to={`/x/${equipment}`}>{equipment}</Link>
                </button>
              </div>
            ))}
        </div>
        {data && (
          <>
            <Spacer />

            <div className="topic">
              chosen <span>exercise</span>
            </div>

            <div className="container" style={{ flexDirection: "column" }}>
              {data.map((item) => (
                <>
                  <div key={item._id}>{item.name}</div>
                </>
              ))}
            </div>
            <Spacer />
            <form onSubmit={printValues}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "space-between",
                  alignItems: "center",

                  justifyContent: "flex-start",
                  width: "380px",
                }}
              >
                <div
                  style={{
                    paddingRight: "10px",
                  }}
                >
                  give it a name
                </div>

                <div>
                  <input
                    id="nameWorkout"
                    name="nameWorkout"
                    onChange={(event) => setWorkoutName(event.target.value)}
                    type="text"
                    placeholder="put name here"
                  />
                </div>
              </div>
              <div id="checkboxes">
                <input
                  type="checkbox"
                  value="beginner"
                  name="beginner"
                  onChange={(event) => setWorkoutType(event.target.value)}
                />
                <span>beginner</span>
                <input
                  type="checkbox"
                  value="advanced"
                  name="advanced"
                  onChange={(event) => setWorkoutType(event.target.value)}
                />
                <span>advanced</span>
                <input
                  type="checkbox"
                  value="beast"
                  name="beast"
                  onChange={(event) => setWorkoutType(event.target.value)}
                />
                <span>beast</span>
              </div>
              <div>
                <button id="saveButton">save workout</button>
              </div>
            </form>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Create;
