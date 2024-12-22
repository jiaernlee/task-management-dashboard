import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { GrAdd } from "react-icons/gr";
import { ListGroup, Button } from "react-bootstrap";
import { GoCheck, GoX } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import AddModal from "./components/add-modal";
import EditModal from "./components/edit-modal";

function App() {
  const [editTask, setEditTask] = useState(null);
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const priorities = ["high", "medium", "low"];

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }, [allTasks]);

  const handleComplete = (id) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setAllTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddTask = (task) => {
    setAllTasks((prev) => [
      ...prev,
      { ...task, id: uuidv4(), completed: false },
    ]);
  };

  const handleEditTask = (updatedTask) => {
    setAllTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const calculateDueTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) {
      return "Overdue";
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} left`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
    }
  };

  return (
    <div className="p-3">
      <h2>Task Management Dashboard</h2>
      <div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add Task <GrAdd />
        </Button>
      </div>

      {priorities.map((p) => (
        <div key={p} className="mt-5">
          <h6>{p} priority</h6>
          <ListGroup as="ul" variant="flush">
            {allTasks
              .filter((task) => task.priority === p)
              .map((task) => (
                <ListGroup.Item
                  as="li"
                  key={task.id}
                  className="gap-5 d-flex align-items-center"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    opacity: task.completed ? 0.7 : 1,
                  }}
                >
                  <div>
                    <strong>{task.name}</strong>
                    <br />
                    <small>Due: {task.dueDate}</small>
                    <br />
                    <small style={{ color: "red" }}>
                      {calculateDueTime(task.dueDate)}
                    </small>
                  </div>
                  <div>
                    <GoCheck onClick={() => handleComplete(task.id)} />
                    <GoX onClick={() => handleDelete(task.id)} />
                    <CiEdit
                      onClick={() => {
                        setEditTask(task);
                        setShowEditModal(true);
                      }}
                    />
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
      ))}

      <AddModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddTask}
      />
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        task={editTask}
        onSave={handleEditTask}
      />
    </div>
  );
}

export default App;
