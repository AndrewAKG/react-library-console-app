const React = require("react");
const importJsx = require("import-jsx");

const uuid = require("react-uuid");
const { Text, Newline } = require("ink");

const BookDetails = importJsx("./BookDetails.js");

/**
 * History Json structure
 * {
 *    type: select | details_view | info
 *    title: action title
 *    options: select options if type is select || []
 *    item: item to view if type is details_view
 *    selectedValue: selected value if type is select
 * }
 */

const History = ({ history }) => {
	return (
		<React.Fragment>
			{history.map((event) => {
				switch (event.type) {
					case "select":
						return (
							<React.Fragment key={uuid()}>
								<Text key={uuid()} color="cyan">{event.title}</Text>
								{event.options.map((item) => (
									<Text
										key={uuid()}
										color={
											item.value === event.selectedValue ? "green" : "gray"
										}
									>
										{item.label}
									</Text>
								))}
								<Newline />
							</React.Fragment>
						);

					case "details_view":
						return (
							<React.Fragment key={uuid()}>
								<BookDetails book={event.item} />
								<Newline />
							</React.Fragment>
						);

					case "info":
						return (
							<React.Fragment key={uuid()}>
								<Text color="cyan">{`[INFO] [${event.item.id}] ${event.item.title} book ${event.title}`}</Text>
								<Newline />
							</React.Fragment>
						)

					default:
						return null;
				}
			})}
		</React.Fragment>
	);
};

module.exports = React.memo(History);
