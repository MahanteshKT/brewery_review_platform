import React, { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Layout/Root";
import { useLocation } from "react-router-dom";
import classes from "./index.module.css";
import Review from "./../../../components/UI/Review/Review";
import authContext from "../../../store/authContext";
import { FaStar } from "react-icons/fa";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};
function index() {
  const location = useLocation();
  const brewery = location.state;
  const ctx = useContext(authContext);
  //   console.log(ctx.reviews.rev);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(
      ctx.reviews.reviews?.filter(
        (each) => each.brewery.name === brewery.name
      ) || ""
    );
  }, [ctx]);
  console.log(reviews);

  return (
    <Layout>
      <div className={classes.container}>
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
            state: <p>{brewery.state}</p>
          </h4>
          <h4>
            phone number: <h5>{brewery.phone}</h5>
          </h4>
          <h4>Rating: {4} out of 5</h4>
        </div>
        <div className={classes.reviews}>
          {!ctx.reviews.reviews.find(
            (each) =>
              each.author === ctx.user.fullName &&
              each.brewery.name === brewery.name
          ) && <Review brewery={brewery} />}
          {reviews && <h2>Reviews:</h2>}
          {reviews &&
            reviews.map((each) => {
              return (
                <div className={classes.review}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4>
                      <h4>Rating</h4>
                      {Array(5)
                        .fill(0)
                        .map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              size={20}
                              color={
                                each.rating > index
                                  ? colors.orange
                                  : colors.grey
                              }
                              style={{
                                marginRight: "0.1rem",
                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                      <p>{each.rating} out of 5</p>
                    </h4>

                    <h4>{each.author}</h4>
                  </div>
                  <div>
                    <br />
                    <h4>Comment:</h4>
                    <p>{each.text}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default index;
