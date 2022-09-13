import React, { useContext, useState } from 'react';
import FilterContext from '../Context/Context';

const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function OrderOption() {
  const { order, setOrder } = useContext(FilterContext);
  const [column, setColumn] = useState(order.column);
  const [sort, setSort] = useState(order.sort);

  const handleInput = ({ target: { value } }) => setSort(value);
  const handleColumn = ({ target: { value } }) => setColumn(value);

  const handleSortButton = () => setOrder({ column, sort });

  return (
    <section>
      <select
        data-testid="column-sort"
        value={ column }
        onChange={ handleColumn }
      >
        {columns.map((columnsList) => (
          <option
            key={ columnsList }
            value={ columnsList }
          >
            {columnsList}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="asc">
          <input
            type="radio"
            value="ASC"
            id="asc"
            name="order"
            checked={ sort === 'ASC' }
            onChange={ handleInput }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            value="DESC"
            id="desc"
            name="order"
            checked={ sort === 'DESC' }
            onChange={ handleInput }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSortButton }
      >
        Ordenar
      </button>
    </section>
  );
}
