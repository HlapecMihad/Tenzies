import { useState, useRef, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
	const [dice, setDice] = useState(() => generateAllNewDice());
	const { width, height } = useWindowSize();
	const buttonRef = useRef(null);

	function generateAllNewDice() {
		return new Array(10).fill(0).map(() => ({
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		}));
	}

	function rollDice() {
		if (gameWon === true) {
			setDice(() => generateAllNewDice());
		} else {
			setDice((oldDice) =>
				oldDice.map((die) =>
					die.isHeld === true
						? die
						: { ...die, value: Math.ceil(Math.random() * 6) }
				)
			);
		}
	}

	// if the id is the same as the id from the dice, then isHeld is changed from false to true or from true to false
	//made by getting the dice array and then mapping the array and changin isHeld based on the id
	/*function hold(id) {
		setDice((prevDice) => {
			return prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			});
		});
	} */

	function hold(id) {
		setDice((oldDice) =>
			oldDice.map((die) =>
				die.id === id ? { ...die, isHeld: !die.isHeld } : die
			)
		);
	}

	const gameWon =
		dice.every((die) => die.isHeld) &&
		dice.every((die) => die.value === dice[0].value);

	useEffect(() => {
		if (gameWon) {
			buttonRef.current.focus();
		}
	}, [gameWon]);

	const mapDice = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			hold={hold}
			id={die.id}
		/>
	));

	return (
		<>
			{gameWon ? <Confetti width={width} height={height} /> : null}
			<div aria-live="polite" className="sr-only">
				{gameWon && (
					<p>Congratulations! You won! Press "New Game" to start again.</p>
				)}
			</div>
			<main>
				<h1 className="title">Tenzies</h1>
				<p className="instructions">
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
				<div className="die-container">{mapDice}</div>
				<button ref={buttonRef} className="roll-button" onClick={rollDice}>
					{gameWon ? "New game" : "Roll"}
				</button>
			</main>
		</>
	);
}

export default App;
