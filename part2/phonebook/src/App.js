import { useState, useEffect } from "react";
import personsServices from "./services/persons";

const Filter = ({ nameFilter, onChange }) => {
  return (
    <form>
      <div>
        filter shown with <input value={nameFilter} onChange={onChange} />
      </div>
    </form>
  );
};

const PersonForm = ({
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
  onClick,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onClick}>
          add
        </button>
      </div>
    </form>
  );
};

const Person = ({ person, onClick }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number} <button onClick={onClick}>delete</button>
    </div>
  );
};

const Persons = ({ personsToShow, handleDeletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          onClick={() => handleDeletePerson(person.id)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personsServices
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (
      persons.find((person) => newPerson.name === person.name) === undefined
    ) {
      personsServices
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        console.log("Confirmed");

        const id = persons.find((person) => newPerson.name === person.name).id;

        personsServices
          .update(id, newPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.name !== newPerson.name ? person : returnedPerson
              )
            )
          );
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNewFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personsServices
        .deleteObject(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        );
    }
  };

  const personsToShow =
    nameFilter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter)
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} onChange={handleNewFilter} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        onNameChange={handleNewName}
        newNumber={newNumber}
        onNumberChange={handleNewNumber}
        onClick={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
