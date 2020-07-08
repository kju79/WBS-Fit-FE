import React, { useContext } from "react";

import { Link, useParams } from "react-router-dom";
import "../styles.css";
import Footer from "./Footer";
import MeContext from "../context/MeContext";

import Navbar from "../components/Navbar";

const Browse = () => {
  const me = useContext(MeContext);
  //   console.log(useParams());

  const { routineId } = useParams();

  console.log("routine id : ", routineId);
  console.log("me.exercises : ", me.wo_routine[0].exercises);

  const found = me.wo_routine.find((element) => element._id === routineId);

  console.log("found : ", found);

  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div
          id="blank"
          style={{ display: "flex", flexDirection: "column" }}
        ></div>

        <Link to={`/dashboard`}>
          <div
            className="container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>user : {me._id}</div>

            <div>routine id : {routineId}</div>

            <div
              style={{
                height: "20px",
              }}
            ></div>

            <div>workout name : {found.name}</div>

            <div style={{ height: "20px" }}></div>

            <div>exercises :</div>
            {found &&
              found.exercises.map((exercise) => (
                <>
                  <div key={exercise._id}>{exercise.name}</div>
                </>
              ))}
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
