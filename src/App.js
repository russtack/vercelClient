import "./App.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Axios from "axios";

function App() {
  const [date, setDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rating, setRating] = useState("");
  const [report, setReport] = useState([]);
  const [showButton, setShowButton] = useState(false); // new state variable

  const addEmployee = () => {
    Axios.post(
      "mysql://unqggf4lhx1upw77:n3hBFQ8bfgFDKnd9nDg2@b5xxd3uqpvktfh0mg1ff-mysql.services.clever-cloud.com:3306/b5xxd3uqpvktfh0mg1ff/create",
      {
        date: date,
        firstname: firstName,
        lastname: lastName,
        rating: rating,
      }
    ).then(() => {
      console.log("success");
      alert("Employee Added!");
    });
  };

  const getReport = () => {
    Axios.get(
      "http://mysql://unqggf4lhx1upw77:n3hBFQ8bfgFDKnd9nDg2@b5xxd3uqpvktfh0mg1ff-mysql.services.clever-cloud.com:3306/b5xxd3uqpvktfh0mg1ff/report"
    ).then((res) => {
      setReport(res.data);
      setShowButton(true); // set showButton to true when report is retrieved
      console.log(res.data);
    });
  };

  return (
    <Container className="p-3">
      <div className="App">
        <div className="information">
          <h1 className="text-center">Employee Training Attendance</h1>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className="mb-2"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            className="mb-2"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="mb-2"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            min={1}
            max={5}
            className="mb-2"
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
          <Button className="mt-3" onClick={addEmployee}>
            Add Employee
          </Button>
          <div className="hr">--------------------------------------------</div>
        </div>

        <div className="information">
          <Button className="mt-3" onClick={getReport}>
            Retrieve report
          </Button>
          {report.map((val, key) => {
            return <div key={key}>{val.firstname}</div>;
          })}
          {showButton && ( // conditional rendering of new button
            <Button
              className="mt-3"
              onClick={() => alert("Report sent for approval")}
            >
              Send report for approval
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
