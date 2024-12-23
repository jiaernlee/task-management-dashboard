import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, ListGroup, Card, Badge, Alert } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
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
      return <Badge bg="danger">Overdue</Badge>;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return (
        <Badge bg="info">{`${days} day${days > 1 ? "s" : ""} left`}</Badge>
      );
    } else if (hours > 0) {
      return (
        <Badge bg="warning">{`${hours} hour${
          hours > 1 ? "s" : ""
        } left`}</Badge>
      );
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return (
        <Badge bg="danger">{`${minutes} minute${
          minutes > 1 ? "s" : ""
        } left`}</Badge>
      );
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Task Management Dashboard</h2>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <GrAdd className="me-2" />
          Add Task
        </Button>
      </div>

      {priorities.map((p) => (
        <div key={p} className="mt-4">
          <h5>
            <Badge
              bg={
                p === "high" ? "danger" : p === "medium" ? "warning" : "success"
              }
              style={{ fontSize: "1.05rem", padding: "0.5rem 1rem" }}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)} Priority
            </Badge>
          </h5>
          <div className="task-list mt-3">
            {allTasks
              .filter((task) => task.priority === p)
              .map((task) => (
                <Card
                  key={task.id}
                  className="mb-3 shadow-sm"
                  style={{ opacity: task.completed ? 0.7 : 1 }}
                >
                  <Card.Body className="d-flex align-items-center justify-content-between">
                    <div>
                      <Card.Title className="mb-1">{task.name}</Card.Title>
                      <Card.Subtitle className="text-muted">
                        Due: {task.dueDate}
                      </Card.Subtitle>
                      {calculateDueTime(task.dueDate)}
                    </div>
                    <div className="task-actions d-flex gap-3">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleComplete(task.id)}
                      >
                        <GoCheck />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          setEditTask(task);
                          setShowEditModal(true);
                        }}
                      >
                        <CiEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        <GoX />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </div>
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
