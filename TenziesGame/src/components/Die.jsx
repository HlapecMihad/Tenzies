export default function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59E391" : "white",
	};
	//console.log(props);
	return (
		<>
			<button
				aria-pressed={props.isHeld}
				aria-label={`Die with value ${props.value}, 
                ${props.isHeld ? "held" : "not held"}`}
				onClick={() => props.hold(props.id)}
				style={styles}
			>
				{props.value}
			</button>
		</>
	);
}
