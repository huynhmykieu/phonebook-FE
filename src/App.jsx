import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import "./App.css";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterName, setNewFilterName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getPersons()
      .then((initialPerson) => {
        setPersons(initialPerson);
        console.log(initialPerson)
      })
      .catch((err) => console.log("Fail to get phonebook data", err));
  }, []);

  const onHandleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const onHandleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const onHandleChangeFilterName = (event) => {
    setNewFilterName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please fill in both name and number");
      return;
    }

    /** Update a person*/
    const existingPerson = persons.find((p) => p.name === newName);
    if (existingPerson) {
      const ok = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (ok) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === existingPerson.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            setErrorMessage({
              text: `${returnedPerson.name} and ${returnedPerson.number} are updated`,
              type: "success",
            });
            console.log("errorMessage", errorMessage);

            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((err) => {
            if (err.response?.status === 404) {
              setErrorMessage({
                text: `${existingPerson.name} không còn tồn tại trên server.`,
                type: "error",
              });

              // Cập nhật lại danh sách từ server
              personService.getPersons().then((updatedPersons) => {
                setPersons(updatedPersons);
              });
            } else {
              setErrorMessage({
                text: `Lỗi khi cập nhật thông tin: ${err.message}`,
                type: "error",
              });
            }

            setTimeout(() => setErrorMessage(null), 5000);
          });
      }
      return;
    }

    /** Create a new person*/
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .createPerson(newPerson)
      .then((returnPerson) => {
        setPersons([...persons, returnPerson]);
        setNewName("");
        setNewNumber("");
        setErrorMessage({
          text: `Added ${returnPerson.name}`,
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch(() => {
        setErrorMessage({
          text: `Fail to add a new person`,
          type: "error",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const filterPersons = persons.filter(
    (p) => p.name && p.name.toLowerCase().includes(newFilterName.toLowerCase())
  );

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    if (!personToDelete) return;

    const confirmDelete = confirm(`Delete ${personToDelete.name}?`);
    if (!confirmDelete) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .then(() => {
        setErrorMessage({
          text: `Deleted ${personToDelete.name}`,
          type: "success",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((err) => {
        setErrorMessage({
          text: `Information of ${personToDelete.name} has already been removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter onHandleChangeFilterName={onHandleChangeFilterName} />
      <h2>add a new</h2>
      <PersonForm
        onHandleChangeName={onHandleChangeName}
        onHandleChangeNumber={onHandleChangeNumber}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} deletePerson={deletePerson} />
    </>
  );
}

export default App;
