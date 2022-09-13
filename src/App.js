import React from 'react';
import './App.css';
import Filter from './componentes/Filter';
import OrderOption from './componentes/OrderOption';
import Table from './componentes/Table';
import TextFilter from './componentes/TextFilter';

function App() {
  return (
    <div>
      <TextFilter />
      <Filter />
      <OrderOption />
      <Table />
    </div>
  );
}

export default App;
