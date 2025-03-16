import { useState } from 'react';
import { Container, Button, Row, Col, Pagination } from 'react-bootstrap';
import WorkoutGrid from './components/WorkoutGrid';
import WorkoutTable from './components/WorkoutTable';
import AddWorkoutForm from './components/AddWorkoutForm';
import EditWorkoutForm from './components/EditWorkoutForm';
import './App.css'; 

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editWorkoutData, setEditWorkoutData] = useState(null);
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 10; 

  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const editWorkout = (id) => {
    const workoutToEdit = workouts.find((workout) => workout.id === id);
    setEditWorkoutData(workoutToEdit);
    setShowEditModal(true);
  };

  const updateWorkout = (updatedWorkout) => {
    setWorkouts(workouts.map((workout) =>
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    ));
    setShowEditModal(false);
  };

  const handleViewToggle = () => {
    setView(view === 'grid' ? 'table' : 'grid');
  };

  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = workouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const totalPages = Math.ceil(workouts.length / workoutsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <h1>Fitness Routine Tracker</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-center">
          <Button onClick={handleViewToggle} className="me-2">
            Toggle View
          </Button>
          <AddWorkoutForm addWorkout={addWorkout} />
        </Col>
      </Row>
      <Row>
        <Col>
          {currentWorkouts.length === 0 ? (
            <p className="no-workouts-message">No workouts available.</p>
          ) : view === 'grid' ? (
            <WorkoutGrid
              workouts={currentWorkouts}
              deleteWorkout={deleteWorkout}
              editWorkout={editWorkout}
            />
          ) : (
            <WorkoutTable
              workouts={currentWorkouts}
              deleteWorkout={deleteWorkout}
              editWorkout={editWorkout}
            />
          )}
        </Col>
      </Row>
      {workouts.length > workoutsPerPage && (
        <Row>
          <Col className="text-center">
            <Pagination>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}
      {showEditModal && (
        <EditWorkoutForm
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          workout={editWorkoutData}
          updateWorkout={updateWorkout}
        />
      )}
    </Container>
  );
}

export default App;
