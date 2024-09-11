import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EditWorkoutForm({ show, onHide, workout, updateWorkout }) {
  const [workoutName, setWorkoutName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [duration, setDuration] = useState('');
  const [nameError, setNameError] = useState('');
  const [numericError, setNumericError] = useState('');

  useEffect(() => {
    if (workout) {
      setWorkoutName(workout.workoutName);
      setReps(workout.reps);
      setSets(workout.sets);
      setDuration(workout.duration);
    }
  }, [workout]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s]+$/.test(workoutName)) {
      setNameError('Workout Name must only contain alphabetic letters');
      return;
    }

    if (reps < 0 || sets < 0 || duration < 0) {
      setNumericError('Reps, Sets, and Duration must be non-negative numbers');
      return;
    }

    setNameError('');
    setNumericError('');

    updateWorkout({
      id: workout.id,
      workoutName,
      reps: parseInt(reps),
      sets: parseInt(sets),
      duration: parseInt(duration),
    });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Workout Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
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
              placeholder="Enter reps"
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
              placeholder="Enter sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="0"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Duration (Minutes):</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter duration in minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="0"  
              required
            />
          </Form.Group>
          {numericError && (
            <div className="text-danger mb-3">{numericError}</div>
          )}
          <Button variant="primary" type="submit" className="mt-3">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

EditWorkoutForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  workout: PropTypes.object,
  updateWorkout: PropTypes.func.isRequired,
};

export default EditWorkoutForm;
