import React, { useState, useEffect } from "react";
import axios from "axios";
import { CATEGORY_INDEX_URL, CATEGORY_CREATE_URL } from "../constants";

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("");

  const fetchCategories = () => {
    axios
      .get(CATEGORY_INDEX_URL)
      .then((res) => {
        setCategories(res.data["user_categories"]);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleItemClick = (e) => {
    props.history.push(`/category_sub_list/${e.target.id}`);
  };

  const renderList = () => {
    if (Array.isArray(categories)) {
      return categories.map((c) => {
        return (
          <li onClick={handleItemClick} id={c.id} key={c.id}>
            {c.title}
          </li>
        );
      });
    }
  };
  const submitCategory = (e) => {
    if (e.keyCode === 13) {
      axios
        .post(CATEGORY_CREATE_URL, {
          title: categoryText,
        })
        .then((res) => {
          setCategories([...categories, res.data]);
        });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="categoryList">
      <h3>Categories</h3>
      <ul>
        <li>
          <input
            type="text"
            onKeyDown={submitCategory}
            onChange={(e) => setCategoryText(e.target.value)}
            placeholder="Create a category"
          />
        </li>
        {renderList()}
      </ul>
    </div>
  );
};

export default CategoryList;
