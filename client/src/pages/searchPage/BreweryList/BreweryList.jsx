import React from "react";
import Card from "../../../components/UI/Card/Card";
import classes from "./BreweryList.module.css";
import BreweryItem from "./BreweryItem";
function BreweryList(props) {
  console.log(props);
  return (
    <Card className={classes.breweryList}>
      {props.breweries &&
        props.breweries.map((brewery, index) => (
          <BreweryItem key={index} result={brewery} />
        ))}
    </Card>
  );
}

export default BreweryList;
