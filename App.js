"use strict";
const React = require("react");
const importJsx = require("import-jsx");

const { useReducer } = require("react");

// const CliBigText = importJsx("./elements/CliBigText.js");
const History = importJsx("./components/History.js");
const Content = importJsx("./components/Content.js");

const HistoryContext = require("./state/History");

// history reducer
const historyReducer = (state, newEvent) => {
	return [...state, newEvent];
};

const App = () => {
	const [history, setHistory] = useReducer(historyReducer, []);

	return (
		<>
			<HistoryContext.Provider value={{ history, setHistory }}>
				{/* <CliBigText items={["BOOKS MANAGER"]} /> */}
				<History />
				<Content />
			</HistoryContext.Provider>
		</>
	);
};

module.exports = App;
