import React from 'react';

const ScoreBoard = () => {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setScore((score) => score + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{score}</div>;
};

export default ScoreBoard;
