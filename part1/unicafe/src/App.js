import { useState } from "react";

const Title = (props) => {
  const { text } = props;
  return <h1>{text}</h1>;
};

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = (props) => {
  const { statistics } = props;

  // conditional render for no feedback
  if (statistics.all === 0) {
    return <p>No feedback given</p>;
  }

  const statComponents = [];

  for (let stat in statistics) {
    statComponents.push(
      <StatisticLine attribute={stat} key={stat} value={statistics[stat]} />
    );
  }

  return (
    <table>
      <tbody>{statComponents}</tbody>
    </table>
  );
};

const StatisticLine = (props) => {
  const { attribute, value } = props;
  return (
    <tr>
      <td>{attribute}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementOption = (option, setOption) => {
    setOption(option + 1);
  };

  const all = good + neutral + bad;
  const average = (good + -bad) / all;
  const positive = good / all;

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  };

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={() => incrementOption(good, setGood)} text="good" />
      <Button
        onClick={() => incrementOption(neutral, setNeutral)}
        text="neutral"
      />
      <Button onClick={() => incrementOption(bad, setBad)} text="bad" />
      <Title text="statistics" />
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
