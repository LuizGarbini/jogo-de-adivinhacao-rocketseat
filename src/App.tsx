import styles from "./app.module.css";

import { useEffect, useState } from "react";
import { type Challenge, WORDS } from "./utils/words";

import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Letter } from "./components/Letter";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { Tip } from "./components/Tip";

const ATTEMPTS_MARGIN = 5;

export function App() {
	const [score, setScore] = useState(0);
	const [letter, setLetter] = useState("");
	const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
	const [challenge, setChallenge] = useState<Challenge | null>(null);

	function handleRestartGame() {
		alert("Reiniciar o jogo!");
	}

	function startGame() {
		const index = Math.floor(Math.random() * WORDS.length);
		const randomWord = WORDS[index];

		setChallenge(randomWord);

		setScore(0);
		setLetter("");
		setLettersUsed([]);
	}

	function handleConfirm() {
		if (!challenge) {
			return;
		}

		if (!letter.trim()) {
			return alert("Digite uma letra!");
		}

		const value = letter.toUpperCase();
		const exist = lettersUsed.find(
			(used) => used.value.toUpperCase() === value,
		);

		if (exist) {
			return alert(`Você já utilizou a letra ${value}`);
		}

		const hits = challenge.word
			.toUpperCase()
			.split("")
			.filter((char) => char === value).length;

		const correct = hits > 0;
		const currentScore = score + hits;

		setLettersUsed((prevState) => [...prevState, { value, correct }]);
		setScore(currentScore);

		setLetter("");
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		startGame();
	}, []);

	if (!challenge) {
		return;
	}

	return (
		<div className={styles.container}>
			<main>
				<Header
					current={lettersUsed.length}
					max={challenge.word.length + ATTEMPTS_MARGIN}
					onRestart={handleRestartGame}
				/>
				<Tip tip={challenge.tip} />
				<div className={styles.word}>
					{challenge.word.split("").map((letter, index) => {
						const letterUsed = lettersUsed.find(
							(used) => used.value.toLocaleUpperCase() === letter.toUpperCase(),
						);

						return (
							<Letter
								value={letterUsed?.value}
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								color={letterUsed?.correct ? "correct" : "default"}
							/>
						);
					})}
				</div>

				<h4>Palpite</h4>

				<div className={styles.guess}>
					<Input
						autoFocus
						maxLength={1}
						placeholder="?"
						value={letter}
						onChange={(e) => {
							setLetter(e.target.value);
						}}
					/>
					<Button title="Confirmar" onClick={handleConfirm} />
				</div>

				<LettersUsed data={lettersUsed} />
			</main>
		</div>
	);
}

export default App;
