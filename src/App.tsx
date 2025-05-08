import styles from "./app.module.css";

import { Header } from "./components/Header";
import { Letter } from "./components/Letter";
import { Tip } from "./components/Tip";

function App() {
	function handleRestartGame() {
		alert("Reiniciar o jogo!");
	}

	return (
		<div className={styles.container}>
			<main>
				<Header current={5} max={10} onRestart={handleRestartGame} />
				<Tip tip="Uma das linguaguens de programação mais utilizadas" />
				<Letter value="L" />
			</main>
		</div>
	);
}

export default App;
