import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const AddWorkoutForm = ({ addWorkout }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [duration, setDuration] = useState('');
  const [nameError, setNameError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Workout name must contain only alphabetic characters.');
      return;
    }
    setNameError('');
    const newWorkout = {
      id: Date.now(),
      workoutName: name,
      reps: parseInt(reps),
      sets: parseInt(sets),
      duration: parseInt(duration),
    };
    addWorkout(newWorkout);
    setName('');
    setReps('');
    setSets('');
    setDuration('');
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Workout
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!nameError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reps:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                min="0"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sets:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                min="0"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Duration (mins):</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="0"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Workout
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

AddWorkoutForm.propTypes = {
  addWorkout: PropTypes.func.isRequired,
};

export default AddWorkoutForm;
