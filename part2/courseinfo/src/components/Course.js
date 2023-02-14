const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const { id, name, parts } = course;
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div key={id}>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

export default Course;
