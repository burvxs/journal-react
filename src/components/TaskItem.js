import React, {useState, useEffect} from 'react';
import {TASK_UPDATE_URL} from '../constants'
import axios from 'axios';

const TaskItem = (props) => {
    const [isComplete, setIsComplete] = useState(props.isComplete);
    const [onCompleteClass, setOnCompleteClass] = useState();
    const [task, setTask] = useState(props.userTask);
    const [priorityLevel, setPriorityLevel] = useState(props.priorityLevel);
    const [solidifier, setSolidifier] = useState(props.solidifier);
    const [isTaskEditing, setIsTaskEditing] = useState(false);
    const [isSolidifierEditing, setIsSolidifierEditing] = useState(false);
    const [isPriorityEditing, setIsPriorityEditing] = useState(false);

    const handleCompletion = (e) => {
        setIsComplete(!isComplete);
        !isComplete 
        ? setOnCompleteClass("completed")
        : setOnCompleteClass('');

        axios.patch(`${TASK_UPDATE_URL}/${props.id}`, {
            "is_complete" : JSON.stringify(!isComplete)
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))
        console.log(isComplete);
    }
    
    useEffect(() => {
        props.isComplete
        ? setOnCompleteClass("completed")
        : setOnCompleteClass("");
    }, [props.isComplete]);

    const changeSolidifierEditMode = () => {
      setIsSolidifierEditing(!isSolidifierEditing)
    }

    const changePriorityEditMode = () => {
      setIsPriorityEditing(!isPriorityEditing);
    };

    const changeTaskEditMode = () => {
      setIsTaskEditing(!isTaskEditing);
    }

    const handleTaskEditMode = (e) => {
      if(e.keyCode === 13){
        changeTaskEditMode();
      }
    }

    const handlePriorityEditMode = (e) => {
      if (e.keyCode === 13) {
        changePriorityEditMode();
      }
    };

    const handleSolidifierEditMode = (e) => {
      if (e.keyCode === 13) {
        changeSolidifierEditMode();
      }
    };

    const updatePriority = (e) => {
      const priority = e.target.value;
        axios.patch(`${TASK_UPDATE_URL}/${props.id}`, {
          priority: priority,
        })
        .then((res) => {
          setPriorityLevel(res.data["priority_level"]);
        })
        .catch((err) => console.warn(err));
    };

    const updateSolidifier = (e) => {
        let solidifier = e.target.value;
        console.log(solidifier);
        axios.patch(`${TASK_UPDATE_URL}/${props.id}`, {
          "solidifier" : solidifier
        })
        .then((res) => {
          setSolidifier(res.data["solidifier"])
          console.log("SETTING THE WHY? ", res.data)
        })
        .catch((err) => console.warn(err));
    }

    const updateTask = (e) => {
      let userTask = e.target.value
        axios.patch(`${TASK_UPDATE_URL}/${props.id}`, {
          "task" : userTask
        })
        .then((res) => {
            setTask(res.data.task);
          console.log("SETTING TASK ", res.data)
        })
        .catch((err) => console.warn(err))
    }

    const renderSingleTask = () => {
      if(isTaskEditing){
        return (
          <input
            type="text"
            className={`${onCompleteClass} `}
            onChange={updateTask}
            autoFocus
            onKeyDown={handleTaskEditMode}
            onDoubleClick={changeTaskEditMode}
            defaultValue={task}
          />
        );
      }else{
        return <p className={`${onCompleteClass} item`} onDoubleClick={changeTaskEditMode}>{task}</p>
      }
    }

    const renderSolidifier = () => {
      if(isSolidifierEditing){
          return (
            <input
              type="text"
              className={`${onCompleteClass} `}
              onChange={updateSolidifier}
              autoFocus
              onKeyDown={handleSolidifierEditMode}
              onDoubleClick={changeSolidifierEditMode}
              defaultValue={solidifier}
            />
        );
      }else{
        return <p className={`${onCompleteClass} item`} onDoubleClick={changeSolidifierEditMode}>{solidifier}</p>
      }
    }

    const renderPriorityLevel = () => {
      if (isPriorityEditing) {
        return (
          <input
            type="text"
            className={`${onCompleteClass}`}
            onChange={updatePriority}
            autoFocus
            onKeyDown={handlePriorityEditMode}
            onDoubleClick={changePriorityEditMode}
            defaultValue={priorityLevel}
          />
        );
      } else {
        return (
          <p
            className={`${onCompleteClass}`}
            onDoubleClick={changePriorityEditMode}
          >
            {priorityLevel}
          </p>
        );
      }
    };

    return (
      <div className="itemWrapper">
        <input
          type="checkbox"
          checked={isComplete || false}
          onChange={handleCompletion}
          className={`${onCompleteClass} `}
        />
        {renderSingleTask()}
        {renderSolidifier()}
        {renderPriorityLevel()}
      </div>
    );
}

export default TaskItem;
