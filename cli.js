#!/usr/bin/env node
'use strict';
const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const App = importJsx('./app');

const cli = meow(`
	Usage
	  $ react-library-console-app

	Options
		--name  Your name

	Examples
	  $ react-library-console-app --name=Jane
	  Hello, Jane
`);

render(React.createElement(App, cli.flags));
