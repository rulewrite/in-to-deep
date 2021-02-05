import React from 'react';

const ScoreBoard = ({ isBreak }: { isBreak: boolean }) => {
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (isBreak) {
      return () => {};
    }

    const id = setInterval(() => {
      setScore((score) => score + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isBreak]);

  return <div>{score}</div>;
};

export default ScoreBoard;
