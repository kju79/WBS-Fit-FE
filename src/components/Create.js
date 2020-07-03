import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "../styles.css";
import Footer from "./Footer";
import Spacer from "./Spacer";
import Navbar from "./Navbar";

const Create = ({ data }) => {
  const [equipmentData, setEquipmentData] = useState(null);
  const [workoutName, setWorkoutName] = useState(null);
  const [workoutType, setWorkoutType] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/equipment")
      .then((res) => res.json())
      .then((data) => setEquipmentData(data));
  }, []);

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
      redirect: window.location.replace("http://localhost:3000/dashboard"),
    };

    fetch("http://localhost:3002/api/workout/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
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
