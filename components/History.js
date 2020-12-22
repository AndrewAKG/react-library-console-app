const React = require("react");
const { useContext } = require("react");
const importJsx = require("import-jsx");

const { Text, Newline, Static } = require("ink");

const BookDetails = importJsx("./BookDetails.js");
const HistoryContext = require("../state/History");

const Title = importJsx("../elements/Title.js");

const {
	HISTORY_TITLE,
	HISTORY_SELECTED_VALUE,
	HISTORY_UN_SELECTED_VALUE,
} = require("../constants/Colors");

/**
 * History structure
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
								<Title text={event.title} color={HISTORY_TITLE} />
								{event.options.map((item, index) => (
									<Text
										color={
											item.value === event.selectedValue
												? HISTORY_SELECTED_VALUE
												: HISTORY_UN_SELECTED_VALUE
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
								<Title text={`[INFO] [${event.item.id}] ${event.item.title} book ${event.title}`} color={HISTORY_TITLE} />
								<Newline />
							</React.Fragment>
						);

					case "search":
						return (
							<React.Fragment key={event.id}>
								<Title text={event.title} color={HISTORY_TITLE} />
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
