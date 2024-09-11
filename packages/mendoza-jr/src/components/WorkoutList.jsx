import { Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

function WorkoutList({ workouts, deleteWorkout, editWorkout, view }) {
  return (
    <Row>
      {workouts.length === 0 ? (
        <Col className="text-center">
          <p>No workouts available</p>
        </Col>
      ) : (
        workouts.map((workout) => (
          <Col xs={12} md={view === 'grid' ? 4 : 12} key={workout.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{workout.workoutName}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Reps: {workout.reps}</ListGroup.Item>
                  <ListGroup.Item>Sets: {workout.sets}</ListGroup.Item>
                  <ListGroup.Item>Duration: {workout.duration}</ListGroup.Item>
                </ListGroup>
                <Button 
                  variant="warning" 
                  className="mt-2 me-2"
                  onClick={() => editWorkout(workout.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  className="mt-2"
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
  );
}

WorkoutList.propTypes = {
  workouts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    workoutName: PropTypes.string.isRequired,
    reps: PropTypes.number.isRequired,
    sets: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  })).isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired,
  view: PropTypes.oneOf(['grid', 'table']).isRequired,
};

export default WorkoutList;
