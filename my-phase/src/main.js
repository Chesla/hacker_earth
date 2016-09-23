
import Counter from './Counter';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {indigoA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
// document.addEventListener('DOMContentLoaded', function() {
//   ReactDOM.render(
//     React.createElement(Counter),
//     document.getElementById('mount')
//   );
// });

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: indigoA200,
    	primary2Color: indigoA200,
	},
});
// ReactDOM.render((
//   <App />,
//   document.getElementById('mount')
// ));
document.addEventListener('DOMContentLoaded', function() {
ReactDOM.render((
	<MuiThemeProvider muiTheme={muiTheme}>
		<Counter/>
	</MuiThemeProvider>
), document.getElementById('mount'));
});