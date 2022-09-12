import React from 'react';
import './App.css';
import Filter from './componentes/Filter';
import Table from './componentes/Table';
import TextFilter from './componentes/TextFilter';

function App() {
  return (
    <div>
      <TextFilter />
      <Filter />
      <Table />
    </div>
  );
}

export default App;
