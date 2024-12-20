import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GrAdd } from "react-icons/gr";
import { ListGroup } from "react-bootstrap";
import { GoArrowDown, GoArrowUp, GoCheck, GoX } from "react-icons/go";

function App() {
  const priorities = ["high", "medium", "low"];

  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ name: "", priority: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  const inputHandler = (e) => {
    e.preventDefault();
    setNewTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addTask = () => {
    let task = { ...newTask, completed: false, id: uuidv4() };
    setAllTasks((prev) => [...prev, task]);
    setNewTask({ name: "", priority: "" });
  };

  const handleComplete = (id) => {
    allTasks.forEach((task) => {
      if (task.id === id) {
        const idx = allTasks.indexOf(task);
        const newAllTasks = [...allTasks];
        if (newAllTasks[idx].completed) newAllTasks[idx].completed = false;
        else newAllTasks[idx].completed = true;
        setAllTasks(newAllTasks);
      }
    });
  };

  const handleMoveUp = (id) => {
    allTasks.forEach((task) => {
      if (task.id === id) {
        const idx = allTasks.indexOf(task);
        const newAllTasks = [...allTasks];
        if (task.priority === "medium") {
          newAllTasks[idx].priority = "high";
        } else if (task.priority === "low") {
          newAllTasks[idx].priority = "medium";
        }
        setAllTasks(newAllTasks);
      }
    });
  };

  const handleMoveDown = (id) => {
    allTasks.forEach((task) => {
      if (task.id === id) {
        const idx = allTasks.indexOf(task);
        const newAllTasks = [...allTasks];
        if (task.priority === "high") {
          newAllTasks[idx].priority = "medium";
        } else if (task.priority === "medium") {
          newAllTasks[idx].priority = "low";
        }
        setAllTasks(newAllTasks);
      }
    });
  };

  const handleDelete = (id) => {
    const newAllTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(newAllTasks);
  };

  console.log(localStorage.getItem("tasks"));

  return (
    <div className="p-3">
      <h2>Task Management Dashboard</h2>
      <div className="d-flex gap-2 align-items-center">
        <input name="name" onChange={inputHandler} value={newTask.name} />
        <select
          name="priority"
          onChange={inputHandler}
          value={newTask.priority}
        >
          <option value="">Select</option>
          {priorities.map((priority) => {
            return (
              <option value={priority} key={priority}>
                {priority}
              </option>
            );
          })}
        </select>
        <GrAdd color="black" onClick={addTask} />
      </div>

      {priorities.map((p) => {
        return (
          <div key={p} className="mt-5">
            <h6>{p} priority</h6>
            <ListGroup as="ul" variant="flush">
              {allTasks
                .filter((task) => task.priority === p)
                .map((task) => (
                  <ListGroup.Item
                    as="li"
                    key={task.id}
                    className="gap-3 d-flex"
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      opacity: task.completed ? 0.7 : 1,
                    }}
                  >
                    {task.name}
                    <div>
                      <GoCheck onClick={() => handleComplete(task.id)} />
                      <GoArrowUp
                        onClick={() => !task.completed && handleMoveUp(task.id)}
                        disabled={task.priority === "high" || task.completed}
                        style={{
                          opacity: task.priority === "high" ? 0.5 : 1,
                        }}
                      />
                      <GoArrowDown
                        onClick={() =>
                          !task.completed && handleMoveDown(task.id)
                        }
                        disabled={task.priority === "low" || task.completed}
                        style={{
                          opacity: task.priority === "low" ? 0.5 : 1,
                        }}
                      />
                      <GoX onClick={() => handleDelete(task.id)} />
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
}

export default App;
