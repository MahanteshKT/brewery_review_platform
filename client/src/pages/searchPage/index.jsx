import React, { useState } from "react";
import Layout from "../../components/Layout/Root";
import Button from "../../components/UI/Button/Button";
import BreweryList from "./BreweryList/BreweryList";
import Card from "../../components/UI/Card/Card";
import classes from "./index.module.css";
const apiBase = {
  city: "https://api.openbrewerydb.org/breweries?by_city=",
  state: "https://api.openbrewerydb.org/breweries?by_state=",
  name: "https://api.openbrewerydb.org/breweries?by_name=",
};

function index() {
  const [searchBy, setSearchBy] = useState("city"); //Changes placeholder text for searchBy input
  const [query, setQuery] = useState("");
  const [breweries, setBreweries] = useState([]);

  function handleChange(e) {
    e.preventDefault();
    //   document.getElementById("inputDiv").classList.toggle("fadeOut");
    fetch(`${apiBase[searchBy]}${query}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setBreweries(result);
        setQuery("");
      });
    setQuery("");
  }

  return (
    <Layout>
      <div className={classes.container}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Search Breweries
        </h2>
        <Card className={classes.form}>
          <form id="inputDiv" onSubmit={handleChange}>
            <div id="radioButtons">
              <label>
                City
                <input
                  type="radio"
                  name="search"
                  value="city"
                  onChange={(ev) => setSearchBy(ev.target.value)}
                  checked={searchBy === "city"}
                />
              </label>
              &nbsp;
              <label>
                State
                <input
                  type="radio"
                  name="search"
                  value="state"
                  onChange={(ev) => setSearchBy(ev.target.value)}
                  checked={searchBy === "state"}
                />
              </label>
              &nbsp;
              <label>
                Name
                <input
                  type="radio"
                  name="search"
                  value="name"
                  onChange={(ev) => setSearchBy(ev.target.value)}
                  checked={searchBy === "name"}
                />
              </label>
            </div>
            <input
              id="searchBar"
              type="text"
              name="query"
              placeholder={`Search by ${searchBy}...`}
              onChange={(ev) => setQuery(ev.target.value)}
              value={query}
            />
            <Button>Search</Button>
          </form>
        </Card>
        <div className="breweryContainer">
          {!breweries ? (
            <h4>no search results</h4>
          ) : (
            <BreweryList breweries={breweries} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default index;
