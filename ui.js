"use strict";
const React = require("react");
const importJsx = require("import-jsx");

const { useState } = require("react");
const BigText = require("ink-big-text");

const History = importJsx("./components/History.js");
const Content = importJsx("./components/Content.js");

const App = () => {
	const [history, setHistory] = useState([]);

	return (
		<React.Fragment>
			{/* <BigText text="BOOKS MANAGER" /> */}
			<History history={history} />
			<Content history={history} setHistory={setHistory} />
		</React.Fragment>
	);
};

module.exports = App;
