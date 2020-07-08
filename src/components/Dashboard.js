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
import { useUtils } from "../context/UtilContext";

function Dashboard() {
  const me = useContext(MeContext);
  const serverURL = useUtils();

  const [top5Data, setTop5Data] = useState(null);

  useEffect(() => {
    fetch(`${serverURL}/workout/top5`)
      .then((res) => res.json())
      // .then((res) => console.log("top5 data :", res))
      .then((data) => setTop5Data(data));
  }, [serverURL, me]);

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
              width: "170px",
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
              width: "170px",
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
                me.wo_routine.map((routine, i) => (
                  <>
                    <Link key={i} to={`/me/routine/${routine._id}`}>
                      <div
                        className="userRoutinesMap"
                        key={`userRoutinesMap${i}`}
                        style={{
                          borderBottom: "2px solid  #00a0e3",
                          borderTop: "2px solid  #00a0e3",
                        }}
                      >
                        <div
                          className="userRoutinesImage"
                          key={`userRoutinesImage${i}`}
                          style={{ marginRight: "10px" }}
                        >
                          <img
                            key={`image-${i}`}
                            src={routine.picture}
                            alt={routine.name}
                          />
                        </div>
                        <div
                          className="userRoutinesInfo"
                          key={`userRoutinesInfo${i}`}
                        >
                          <div
                            className="userRoutinesName"
                            key={`userRoutinesName${i}`}
                          >
                            {routine.name}
                          </div>

                          <div
                            className="userRoutinesSubline"
                            key={`userRoutinesSubline${i}`}
                            style={{ color: "#fff", fontSize: "14px" }}
                          >
                            {routine.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </div>
        <Spacer />
        <div className="container" style={{ height: "50px", width: "350px" }}>
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
              width: "170px",
              height: "220px",
              marginRight: "5px",
            }}
          >
            <div className="dashTopic">
              top <span>rated</span>
            </div>
            <Slider {...settings}>
              {top5Data &&
                top5Data.map((item, i) => (
                  <>
                    <div key={`top5Image${i}`} className="top5Image">
                      <img
                        style={{
                          // marginBottom: "3px",
                          padding: "0",
                          width: "170px",
                          height: "110px",
                          borderTop: "2px solid #00a0e3",
                          // borderBottom: "2px solid #00a0e3",
                        }}
                        src={item.picture}
                        key={item._id}
                        alt={item.name}
                      />
                    </div>
                    <div key={`top5Name${i}`} className="top5Name">
                      {item.name}
                    </div>
                    <div key={`top5Ratings${i}`} className="top5Ratings">
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
              width: "170px",
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
        <div className="containerA" style={{ width: "350px" }}>
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
