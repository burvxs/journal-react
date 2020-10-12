import React, { useState } from "react";
import { REVIEW_CREATE_URL } from "../constants";
import axios from "axios";

const WeeklyReview = (props) => {
  const [review, setReview] = useState("");

  const handleTextArea = (e) => {
    e.preventDefault();
    setReview(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(REVIEW_CREATE_URL, {
        daily_review: review,
      })
      .then((res) => {
        console.log(res);
        props.history.push("/D2D");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea name="review" rows="8" cols="60" onChange={handleTextArea} />
        <button type="submit">Submit Review!</button>
      </form>
    </div>
  );
};

export default WeeklyReview;
