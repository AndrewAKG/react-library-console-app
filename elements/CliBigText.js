const React = require("react");

const { Static } = require("ink");
const BigText = require("ink-big-text");

const CliBigText = ({ items }) => {
	return (
		<Static items={items}>
			{(item, index) => <BigText text={item} key={index} />}
		</Static>
	);
};

module.exports = CliBigText;
