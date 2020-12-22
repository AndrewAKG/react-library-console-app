const React = require("react");
const { useContext } = require("react");
const importJsx = require("import-jsx");

const { Text, Newline, Static } = require("ink");

const BookDetails = importJsx("./BookDetails.js");
const HistoryContext = require("../state/History");

/**
 * History Json structure
 * {
 * 		id: unique event id
 *    type: select | details_view | info | search
 *    title: action title
 *    options: select options if type is select || []
 *    item: item to view if type is details_view or info
 *    selectedValue: selected value if type is select
 * 		searchKey: keyword if type is search
 * }
 */

const History = () => {
	const { history } = useContext(HistoryContext);

	return (
		<Static items={history}>
			{(event) => {
				switch (event.type) {
					case "select":
						return (
							<React.Fragment key={event.id}>
								<Text color="cyan">{event.title}</Text>
								{event.options.map((item, index) => (
									<Text
										color={
											item.value === event.selectedValue ? "green" : "gray"
										}
										key={index}
									>
										{item.label}
									</Text>
								))}
								<Newline />
							</React.Fragment>
						);

					case "details_view":
						return (
							<React.Fragment key={event.id}>
								<BookDetails book={event.item} />
								<Newline />
							</React.Fragment>
						);

					case "info":
						return (
							<React.Fragment key={event.id}>
								<Text color="cyan">{`[INFO] [${event.item.id}] ${event.item.title} book ${event.title}`}</Text>
								<Newline />
							</React.Fragment>
						);

					case "search":
						return (
							<React.Fragment key={event.id}>
								<Text color="cyan">{event.title}</Text>
								<Text>Search: {event.searchKey}</Text>
								<Newline />
							</React.Fragment>
						);

					default:
						return null;
				}
			}}
		</Static>
	);
};

module.exports = React.memo(History);
