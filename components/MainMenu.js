const React = require("react");
const importJsx = require("import-jsx");
const SelectInput = require("ink-select-input").default;

const Title = importJsx("../elements/Title.js");
const { TITLE_COLOR } = require("../constants/Colors");
const { MAIN_TITLE } = require("../constants/Phrases");

const choices = require("../constants/mainChoices");

const MainMenu = ({ onSelect }) => {
	return (
		<React.Fragment>
			<Title text={MAIN_TITLE} color={TITLE_COLOR}/>
			<SelectInput items={choices} onSelect={onSelect} />
		</React.Fragment>
	);
};

module.exports = MainMenu;
