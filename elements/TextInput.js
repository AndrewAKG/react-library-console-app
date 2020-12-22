const React = require("react");

const { Text, Box } = require("ink");
const InkTextInput = require("ink-text-input").default;

const TextInput = ({ text, value, onChange, onSubmit }) => {
	return (
		<Box>
			<Box marginRight={1}>
				<Text>{text}:</Text>
			</Box>

			<InkTextInput
				value={value}
				onChange={onChange}
				onSubmit={onSubmit}
			/>
		</Box>
	);
};

module.exports = TextInput;
