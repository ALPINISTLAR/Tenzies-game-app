import React, { useEffect, useRef, useState } from "react";
import Die from "./Die";
import {
	getAllDice,
	getRandomDiceObj,
} from "./diceHelpers";

function DiceBoard() {
	const [diceArr, setDiceArr] = useState(() =>
		getAllDice()
	);

	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {

		let firstValue = diceArr[0].number;
		const allValues = diceArr.every(
			(dice) => dice.number === firstValue
		);
		const allHeldTrue = diceArr.every(
			(dice) => dice.isHeld
		);

		if (allValues && allHeldTrue) {
			setTenzies(true);
		}
	}, [diceArr]);

	function selectDice(id) {
		setDiceArr((oldArr) => {
			return oldArr.map((dice) =>
				dice.id === id
					? { ...dice, isHeld: !dice.isHeld }
					: dice
			);
		});
	}

	function rollDice() {
		if (tenzies) {
			setDiceArr(getAllDice());
			setTenzies(false);
		}

		setDiceArr((oldArr) => {
			return oldArr.map((dice) =>
				dice.isHeld ? dice : getRandomDiceObj()
			);
		});
	}

	let diceElements = diceArr.map((dice) => (
		<Die
			key={dice.id}
			value={dice.number}
			isHeld={dice.isHeld}
			selectDice={() => selectDice(dice.id)}

		/>
	));

	return (
		<>
			<article className="tenzies">
				{diceElements}
			</article>
			<button
				onClick={rollDice}
				className="btn-roll btn"
			>
				{tenzies ? "New Game" : "Roll"}
			</button>
			{tenzies && (
				<>
				</>
			)}
		</>
	);
}

export default DiceBoard;