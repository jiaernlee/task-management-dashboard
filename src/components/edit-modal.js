import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditModal = ({ show, onHide, task, onSave }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const priorities = ["high", "medium", "low"];

  const handleInputChange = (e) => {
    setUpdatedTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (updatedTask.name && updatedTask.priority && updatedTask.dueDate) {
      onSave(updatedTask);
      onHide();
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Task</Form.Label>
            <Form.Control
              name="name"
              placeholder="Task name"
              onChange={handleInputChange}
              value={updatedTask?.name || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              onChange={handleInputChange}
              value={updatedTask?.priority || ""}
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
              value={updatedTask?.dueDate || ""}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
