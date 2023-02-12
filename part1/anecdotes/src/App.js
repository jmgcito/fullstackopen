import { useState } from "react";

const Anecdotes = (props) => {
  const { anecdotes, selected } = props;
  return <div>{anecdotes[selected]}</div>;
};

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Votes = (props) => {
  const { points, selected } = props;
  const votes = points[selected];

  let voteOrVotes = "votes";
  if (votes < 2) {
    voteOrVotes = "vote";
  }

  return (
    <p>
      has {votes} {voteOrVotes}
    </p>
  );
};

const Title = (props) => {
  const { text } = props;
  return <h1>{text}</h1>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const setRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    return setSelected(random);
  };

  // initial state is an array the length of the anecdotes array filled with 0s
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const incrementVotes = (selected) => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  };

  const topAnecdote = points.indexOf(Math.max(...points));

  return (
    <div>
      <Title text={"Anecdote of the day"} />
      <Anecdotes anecdotes={anecdotes} selected={selected} />
      <Votes points={points} selected={selected} />
      <Button onClick={() => incrementVotes(selected)} text="vote" />
      <Button onClick={setRandom} text="next anecdote" />
      <Title text={"Anecdote with most votes"} />
      <Anecdotes anecdotes={anecdotes} selected={topAnecdote} />
    </div>
  );
};

export default App;
