import { useEffect, useState, type JSX } from "react";
import "./App.css";

// @ts-ignore
import Grid from "./components/Grid.jsx";
// @ts-ignore
import Controls from "./components/Controls.jsx";
// @ts-ignore
import { fetchPuzzle } from "./fetch-puzzle.js";


type Board = (number | null)[][];

function App(): JSX.Element {
  // board[0][0] = 1
  const [board, setBoard] = useState<Board | null>(null);

  // puzzle[0][0] = 1
  const [puzzle, setPuzzle] = useState<Board | null>(null);

  const [solution, setSolution] = useState<Board | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // [row, col]
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [greenCount, setGreenCount] = useState(0);

  useEffect(() => {
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    });
  }, []);

  const handleCheck = () => {
    if (!board || !solution) return;

    const flatBoard = board.flat() as (number | null)[];
    const flatSolution = solution.flat() as (number | null)[];

    if (flatBoard.every((cell, i) => cell === flatSolution[i])) {
      setStatus("Correct!");

      let count = 0;
      const totalCells = 81;
      const interval = setInterval(() => {
        count++;
        setGreenCount(count);
        if (count === totalCells) clearInterval(interval);
      }, 30);
    } else {
      setStatus("Incorrect, try again.");
      setGreenCount(0);
    }
  };

  const handleReset = () => {
    if (!puzzle) return;
    setBoard(puzzle.map((row) => [...row]));
    setStatus("");
    setSelected(null);
    setGreenCount(0);
  };

  const handleNewPuzzle = () => {
    setGreenCount(0);
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
    });
  };

  const handleInput = (rIdx: number, cIdx: number, value: string) => {
    if (value === "" || (value >= "1" && value <= "9")) {
      setBoard((prev) =>
        (prev as Board).map((row, r) =>
          row.map((cell, c) => {
            if (r === rIdx && c === cIdx) {
              return value === "" ? null : parseInt(value, 10);
            }
            return cell;
          })
        )
      );
    }
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sudoku</h1>
      <Grid
        board={board}
        handleInput={handleInput}
        puzzle={puzzle}
        selected={selected}
        setSelected={setSelected}
        greenCount={greenCount}
      />
      <Controls
        handleCheck={handleCheck}
        handleReset={handleReset}
        handleNewPuzzle={handleNewPuzzle}
      />
      {status && <div className="status">{status}</div>}
    </div>
  );
}

export default App;
