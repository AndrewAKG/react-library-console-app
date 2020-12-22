"use strict";
const React = require("react");
const importJsx = require("import-jsx");

const { useReducer } = require("react");
const BigText = require("ink-big-text");

const History = importJsx("./components/History.js");
const Content = importJsx("./components/Content.js");

const HistoryContext = require("./state/History");

const historyReducer = (state, newEvent) => {
  return [...state, newEvent];
}

const App = () => {
  const [history, setHistory] = useReducer(historyReducer, []);

	return (
		<HistoryContext.Provider value={{ history, setHistory }}>
			{/* <BigText text="BOOKS MANAGER" /> */}
			<History />
			<Content />
		</HistoryContext.Provider>
	);
};

module.exports = App;
