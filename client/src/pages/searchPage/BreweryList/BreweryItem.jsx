import React from "react";
import classes from "./BreweryItem.module.css";
import { NavLink, useNavigate } from "react-router-dom";
function BreweryItem(props) {
  const brewery = props.result;
  //   const navigate = useNavigate();
  return (
    <div className={classes.each}>
      <h2>{brewery.name}</h2>

      <div>
        <h4>
          Brewery Type:<p>{brewery.brewery_type}</p>
        </h4>
        <h4>
          Address:<p>{brewery.address_1}</p>
        </h4>
        <h4>
          city: <h5>{brewery.city}</h5>
        </h4>
        <h4>
          state: <h5>{brewery.state}</h5>
        </h4>
        <h4>
          phone number: <h5>{brewery.phone}</h5>
        </h4>
        {/* <div className="rating">current rating</div> */}

        <NavLink to="/brewery-details" state={brewery}>
          Click here for more details
        </NavLink>
      </div>
    </div>
  );
}

export default BreweryItem;
