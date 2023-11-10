import { useContext, useState } from "react";

import { FaStar } from "react-icons/fa";
import authContext from "../../../store/authContext";
import BaseUrl from "../../../BaseUrl";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Review(props) {
  const [text, setText] = useState();
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const ctx = useContext(authContext);
  console.log(ctx);
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("adas", text, currentValue);
    const data = {
      author_id: ctx.user._id,
      author: ctx.user.fullName,
      rating: currentValue,
      text: text,
      brewery: props.brewery,
    };
    console.log(data);
    sendReview(data)
      .then((resData) => {
        ctx.setReviews(resData);
        ctx.setMessage({
          heading: "success",
          msg: `You given ${data.rating} rating. `,
        });
      })
      .catch((err) => {
        console.log(err.message);
        ctx.setMessage({ heading: "error", msg: err.message });
      });
  };

  const sendReview = async (data) => {
    const res = await fetch(BaseUrl + "review", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const Resdata = await res.json();
    if (!res.ok) {
      console.log(Resdata);
      throw new Error(Resdata.error);
    }
    if (Resdata) {
      return Resdata;
    }
  };

  return (
    <div style={styles.container}>
      <h2> Brewery Ratings </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={text}
        onChange={(e) => {
          e.preventDefault();
          setText(e.target.value);
        }}
      />

      <button onClick={onSubmitHandler} style={styles.button}>
        Submit
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default Review;
