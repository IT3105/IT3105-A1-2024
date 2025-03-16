import { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function WorkoutGrid({ workouts, deleteWorkout, editWorkout }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(workouts.length / itemsPerPage);
  const currentWorkouts = workouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="workout-grid">
      <Row>
        {currentWorkouts.length === 0 ? (
          <Col className="text-center">
            <p>No workouts available.</p>
          </Col>
        ) : (
          currentWorkouts.map((workout) => (
            <Col key={workout.id} xs={12} sm={6} md={4} lg={4} className="mb-3">
              <Card className="workout-card">
                <Card.Body>
                  <Card.Title>{workout.workoutName}</Card.Title>
                  <Card.Text>
                    <strong>Reps:</strong> {workout.reps}<br />
                    <strong>Sets:</strong> {workout.sets}<br />
                    <strong>Duration:</strong> {workout.duration} min
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => editWorkout(workout.id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteWorkout(workout.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span className="mx-2">{currentPage}/{totalPages}</span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
}

WorkoutGrid.propTypes = {
  workouts: PropTypes.array.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired,
};

export default WorkoutGrid;
