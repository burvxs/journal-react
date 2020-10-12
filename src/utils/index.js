import React from "react";
import TaskItem from "../components/TaskItem";
import { USER_TASKS_URL } from "../constants";
import axios from "axios";
import date from "date-and-time";

export const renderTasks = (tasks, callback = onDataFail) => {
  if (Array.isArray(tasks)) {
    const renderArray = tasks.map((item) => {
      return (
        <React.Fragment key={item.id}>
          <TaskItem
            priorityLevel={item["priority_level"]}
            userTask={item.task}
            solidifier={item.solidifier}
            isComplete={item.completed}
            id={item.id}
            key={item.id}
          />
        </React.Fragment>
      );
    });
    return renderArray;
  } else {
    callback();
  }
};

const onDataFail = () => {
  console.log("Tasks havent been retrieved from the server yet");
};

export const loadRequestedTasks = (
  request,
  setRequestedTasks,
  callback = null
) => {
  axios
    .get(USER_TASKS_URL, {
      params: request,
    })
    .then((res) => {
      if (checkAuth()) {
        setRequestedTasks([...res.data["requested_task_set"]]);
      }
      if (callback) {
        callback(res.data);
      }
    })
    .catch((err) => console.warn(err));
};

export const checkAuth = () => {
  if (localStorage.getItem("jwt") === "null") {
    return false;
  } else {
    return true;
  }
};

export const generateCurrentDateString = () => {
  const currentDate = new Date();
  const pattern = date.compile("MMM D YYYY");
  return date.format(currentDate, pattern);
};

export const isSunday = () => {
  const currentDate = new Date();
  if (currentDate.getDay() === 4) {
    return true;
  } else {
    return false;
  }
};

export const setDefaultHeaders = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "jwt"
  )}`;
};
