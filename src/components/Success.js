import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles.css";
import Footer from "./Footer";
// import Spacer from "../components/Spacer";
import Navbar from "../components/Navbar";
import { useUtils } from "../context/UtilContext";

const Browse = () => {
  const serverURL = useUtils();

  const { workouttype } = useParams();
  //   console.log("component browse.js -> wo type : ", workouttype);

  const [browsedData, setBrowsedData] = useState(null);

  useEffect(() => {
    fetch(`${serverURL}/browse/${workouttype}`)
      .then((res) => res.json())
      //   .then((res) => console.log("browsedata :", res));
      .then((data) => setBrowsedData(data));
  }, [workouttype, serverURL]);

  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div
          id="blank"
          style={{ display: "flex", flexDirection: "column" }}
        ></div>
        <Link to={`/dashboard`}>
          <div className="container">
            <div>workout successfully created</div>
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
