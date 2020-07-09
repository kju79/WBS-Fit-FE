import React, { useEffect, useContext, useState } from "react";
import MeContext from "../context/MeContext";
// import "../styles.css";
import Footer from "./Footer";
import Spacer from "../components/Spacer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import browseBeginner from "../img/beginner.png";
import browseAdvanced from "../img/advanced.png";
import browseBeast from "../img/beast.png";

function Dashboard() {
  const [userRoutine, setUserRoutine] = useState("");
  const me = useContext(MeContext);

  const [top5Data, setTop5Data] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/api/workout/top5")
      .then((res) => res.json())
      // .then((res) => console.log("top5 data :", res))
      .then((data) => setTop5Data(data));
  }, []);

  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
  };

  return (
    <>
      <div id="wrapper">
        <Navbar />
        <div id="blank"></div>
        <div
          style={{
            display: "flex",
            width: "100%",

            justifyContent: "space-between",
          }}
        >
          <div
            className="dashTopic"
            style={{ fontSize: "18px", padding: "5px" }}
          >
            {me && me.first_name && (
              <>
                welcome back <span>{me.first_name}</span>
              </>
            )}
          </div>
          <div
            className="dashTopic"
            style={{ fontSize: "18px", padding: "5px" }}
          >
            {me && me.first_name && (
              <>
                last workout : <span>2 days ago</span>
              </>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "space-around" }}>
          <div
            className="containerA"
            style={{
              width: "195px",
              height: "160px",
              marginRight: "5px",
            }}
          >
            <div className="dashTopic">
              your <span>stats</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                {me && me.wo_routine && (
                  <>
                    <div className="dashStatsLifted">66.666 kg</div>
                    <div className="dashStats">lifted last session</div>
                    <div className="dashStatsLifted">13.337 kg</div>
                    <div className="dashStats">lifted since day zero</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className="containerA"
            style={{
              width: "195px",
              maxHeight: "160px",
              marginLeft: "5px",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
          >
            <div className="dashTopic">
              YOUR <span>ROUTINES</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "124px",
                overflow: "auto",
              }}
            >
              {me &&
                me.wo_routine &&
                me.wo_routine.map((routine) => (
                  <>
                    <div
                      className="userRoutinesMap"
                      style={{
                        borderBottom: "2px solid  #00a0e3",
                        borderTop: "2px solid  #00a0e3",
                      }}
                    >
                      <div className="userRoutinesImage">
                        <img src={routine.picture} alt="user routine" />
                      </div>
                      <div className="userRoutinesInfo">
                        <div className="userRoutinesName">{routine.name}</div>

                        <div className="userRoutinesSubline">
                          {routine.description}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <Spacer />
        <div className="container" style={{ height: "50px", width: "400px" }}>
          <Link to={`/create`}>
            <button id="dashboardButton">
              <span>create</span> your own <span>workout</span>
            </button>
          </Link>
        </div>
        <Spacer />
        <div style={{ display: "flex", flexDirection: "space-around" }}>
          <div
            className="containerA"
            style={{
              width: "195px",
              height: "220px",
              marginRight: "5px",
            }}
          >
            <div className="dashTopic">
              top <span>rated</span>
            </div>
            <Slider {...settings}>
              {top5Data &&
                top5Data.map((item) => (
                  <>
                    <div className="top5Image">
                      <img
                        style={{
                          // marginBottom: "3px",
                          padding: "0",
                          width: "195px",
                          height: "110px",
                          borderTop: "2px solid #00a0e3",
                          // borderBottom: "2px solid #00a0e3",
                        }}
                        src={item.picture}
                        key={item._id}
                        alt="top5image"
                      />
                    </div>
                    <div className="top5Name">{item.name}</div>
                    <div className="top5Ratings">
                      {item.numberOfRatings}
                      {item.numberOfRatings === 1 ? " rating" : " ratings"} |
                      average : {item.average}
                    </div>
                  </>
                ))}
            </Slider>
          </div>
          <div
            className="containerA"
            style={{
              width: "195px",
              height: "220px",
              marginLeft: "5px",
            }}
          >
            <div className="dashTopic">
              quick <span>shot</span>
            </div>
          </div>
        </div>
        <Spacer />
        <div className="containerA" style={{ width: "400px" }}>
          <div className="dashTopic">
            browse <span>community</span>
          </div>
          <div id="browseWorkoutsContainer">
            <div>
              <Link to={`/browse/beginner`}>
                <img src={browseBeginner} alt="beginner" />
              </Link>
            </div>
            <div>
              <Link to={`/browse/advanced`}>
                <img src={browseAdvanced} alt="advanced" />
              </Link>
            </div>
            <div>
              <Link to={`/browse/beast`}>
                <img src={browseBeast} alt="beast" />
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
