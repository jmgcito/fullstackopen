import { useState } from "react";

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

const Person = ({ person }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}{" "}
    </div>
  );
};

const Persons = ({ personsToShow }) => {
  console.log(personsToShow);
  return (
    <div>
      {personsToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const isUniquePerson = (newPerson, persons) => {
    for (let person of persons) {
      if (person.name === newPerson.name) {
        return false;
      }
    }
    return true;
  };

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

    if (isUniquePerson(newPerson, persons)) {
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
    } else {
      window.alert(`${newName} is already added to the phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNewFilter = (e) => {
    setNameFilter(e.target.value);
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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
