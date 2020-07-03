import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// import "../styles.css";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";

const Exercises = ({ onChoose, data }) => {
  const { equipment, muscle } = useParams();

  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3002/api/exercise/${equipment}/${muscle}`)
      .then((res) => res.json())
      .then((data) => setExerciseData([...data]));
  }, [equipment, muscle]);

  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div id="blank"></div>

        <div className="topic">
          create <span>workout</span>
        </div>

        <div className="container">
          <div id="chosenEquipment">{equipment}</div>
          <div id="chosenMusclegroup">{muscle}</div>
          {exerciseData &&
            exerciseData.map((exercise) => (
              <div id="showExercise" key={exercise._id}>
                <div
                  style={{ width: "55px", height: "55px", marginRight: "5px" }}
                >
                  <img
                    src={exercise.avatar}
                    alt="exercise"
                    style={{
                      display: "flex",
                      AlignSelf: "center",
                      width: "55px",
                      height: "55px",
                      borderRadius: "15px",
                      border: "2px solid #262626",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center", //horizontal
                    color: "#fff",
                    width: "275px",
                  }}
                >
                  {/* {exercise._id}
                  <br /> */}
                  {exercise.name}
                </div>
                <div>
                  <button
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "10px 0px",
                      marginLeft: "5px",
                      backgroundColor: "#898989",
                      color: "#262626",
                    }}
                    onClick={() => onChoose([...data, exercise])}
                  >
                    <Link to={`/create`}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Exercises;
