import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles.css";
import Footer from "./Footer";
import Spacer from "../components/Spacer";
import Navbar from "../components/Navbar";

const Browse = () => {
  const { workouttype } = useParams();
  //   console.log("component browse.js -> wo type : ", workouttype);

  const [browsedData, setBrowsedData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/api/browse/${workouttype}`)
      .then((res) => res.json())
      //   .then((res) => console.log("browsedata :", res));
      .then((data) => setBrowsedData(data));
  }, [workouttype]);

  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div
          id="blank"
          style={{ display: "flex", flexDirection: "collumn" }}
        ></div>
        {browsedData &&
          browsedData.map((item) => (
            <>
              <div>{workouttype}</div>
              <Spacer />
              <div>{item.name}</div>
              <div>{item.picture}</div>
              <div>{item._id}</div>
              <div>{item.description}</div>
              <div>{item.creator}</div>
            </>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Browse;
