import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Create = ({ trainingData }) => {
  
  const [isLoaded, setIsLoaded] = useState(false);  

  // console.log(trainingData);

  const equipment = [
    "barbell",
    "kettlebells",
    "body only",
    "machine",
    "cable",
    "medicine ball",
    "dumbbell",
    "curlbar",
    "exercise ball",
  ];

return (
    <>
      {trainingData && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Welcome, you've been routed</div>
          <div>Equipment is being loaded</div>
          <div>###</div>
          <div>{isLoaded ? "SUCCESSFULLY LOADED" : "STILL WAITING"}</div>
          <div>CREATE workout ( select equipment to move on )</div>
          <div>###</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {equipment.map((equipment) => (
              <div>
                <button>
                  <Link to={`/create/${equipment}`}>{equipment}</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Create;

// onClick={() => handleClick(equipment)}
