import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddModal = ({ show, onHide, onSave }) => {
  const [task, setTask] = useState({ name: "", priority: "", dueDate: "" });

  const priorities = ["high", "medium", "low"];

  const handleInputChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (task.name && task.priority && task.dueDate) {
      onSave(task);
      setTask({ name: "", priority: "", dueDate: "" });
      onHide();
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task</Form.Label>
            <Form.Control
              name="name"
              placeholder="Task name"
              onChange={handleInputChange}
              value={task.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              onChange={handleInputChange}
              value={task.priority}
            >
              <option value="">Select Priority</option>
              {priorities.map((priority) => (
                <option value={priority} key={priority}>
                  {priority}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              onChange={handleInputChange}
              value={task.dueDate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
