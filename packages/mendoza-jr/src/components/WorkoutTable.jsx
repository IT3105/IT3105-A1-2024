import { useState } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './WorkoutTable.css'; 

function WorkoutTable({ workouts, deleteWorkout, editWorkout }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(workouts.length / itemsPerPage);

  const currentWorkouts = workouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rowsToDisplay = [...currentWorkouts, ...Array(itemsPerPage - currentWorkouts.length).fill(null)];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="workout-table-container">
      <Row>
        <Col>
          <Table striped bordered hover className="workout-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Duration (min)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rowsToDisplay.map((workout, index) => (
                <tr key={index}>
                  {workout ? (
                    <>
                      <td>{workout.workoutName}</td>
                      <td>{workout.reps}</td>
                      <td>{workout.sets}</td>
                      <td>{workout.duration}</td>
                      <td>
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
                      </td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
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

WorkoutTable.propTypes = {
  workouts: PropTypes.array.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
  editWorkout: PropTypes.func.isRequired,
};

export default WorkoutTable;
