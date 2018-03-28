import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import Counter from './components/Counter';
import counter from './reducers';

const store = createStore(counter);
const rootEl = document.getElementById('root');

const render = () => ReactDom.render(
  <Counter
  value={store.getState()}
  onIncrement={() => store.dispatch({type: 'INCREMENT'})}
  onDecrement={() => store.dispatch({type: 'DECREMENT'})}
  />,
  rootEl
);

render();
store.subscribe(render);
