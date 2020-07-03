import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const mySet = new Set();
const array = [];

const Equipments = ({ trainingData }) => {
  const [filteredData, setFilteredData] = useState(null);

  const { equipment } = useParams();
  //   console.log("tr : ", trainingData);
  //   console.log("eq : ", equipment);

  if (trainingData) {
    const filtered = trainingData.filter(
      (exercise) => exercise.equipment === `${equipment}`
    );

    filtered.map((item) => {
      //   console.log("mg: ", array.indexOf(item.musclegroup[0]));
      //   console.log("mg: ", item.musclegroup[0]);

      if (array.indexOf(item.musclegroup[0]) === -1) {
        array.push(item.musclegroup[0]);
      }
    });
    // filtered.map((item) => mySet.add(item.musclegroup));
  }

  console.log("arr :", array);
  console.log(mySet.entries());
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>Welcome, you've been routed</div>
      <div>Musclegroups are loaded</div>
      <div>###</div>
      {/* <div>{isLoaded ? "SUCCESSFULLY LOADED" : "STILL WAITING"}</div> */}
      <div>CREATE workout ( select muscle to move on )</div>
      <div>###</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {array.map((muscle) => (
          <div>
            <button>
              <Link to={`/create/${equipment}/${muscle}`}>{muscle}</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipments;
