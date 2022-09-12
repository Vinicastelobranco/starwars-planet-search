import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FilterProvider from './Context/Provider';

ReactDOM.render(
  <FilterProvider>
    <App />
  </FilterProvider>,
  document.getElementById('root'),
);
