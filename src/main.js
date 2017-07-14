import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute  } from 'react-router';
import EntryItemContainer from './container/EntryItemContainer'
import EntryItem from './components/master/EntryItem'

import GridListItem from './components/master/GridListItem'

ReactDOM.render(
 <Router history={hashHistory}>
   <Route path='/' component={EntryItemContainer} />
 </Router>, document.getElementById('app')
);
