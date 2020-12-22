const React = require("react");
const importJsx = require("import-jsx");

const SelectInput = require("ink-select-input").default;

const Title = importJsx("../elements/Title");
const { LIST_VIEW_TITLE, LIST_EDIT_TITLE } = require("../constants/Phrases");
const { TITLE_COLOR } = require("../constants/Colors");

const BooksList = ({ items, onSelect, edit }) => {
	return (
		<React.Fragment>
			<Title text={edit ? LIST_EDIT_TITLE: LIST_VIEW_TITLE} color={TITLE_COLOR} />
			<SelectInput items={items} onSelect={onSelect} />
		</React.Fragment>
	);
};

module.exports = BooksList;
