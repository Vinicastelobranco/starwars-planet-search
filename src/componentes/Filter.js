import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../Context/Context';

const allFilters = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const options = ['maior que', 'menor que', 'igual a'];

export default function Filter() {
  const { filterByNumericValues, setNumericFilters } = useContext(FilterContext);
  const [filters, setFilters] = useState(allFilters);
  const [filter, setFilter] = useState('');
  const [comparison, setComparison] = useState(options[0]);
  const [number, setNumber] = useState('0');

  useEffect(() => {
    if (filterByNumericValues.length === 0) {
      setFilter(allFilters[0]);
      return;
    }
    const selectedFilters = filterByNumericValues.map(({ column }) => column);
    const availableFilters = allFilters
      .filter((filterList) => (!selectedFilters.includes(filterList)));
    setFilters(availableFilters);
    setFilter(availableFilters[0]);
  }, [filterByNumericValues]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'filter': setFilter(value);
      break;
    case 'comparison': setComparison(value);
      break;
    default:
      setNumber(value);
      break;
    }
  };

  const handleFilterSubmit = () => {
    const newFilter = {
      column: filter,
      comparison,
      value: number,
    };
    setNumericFilters((prev) => [...prev, newFilter]);
    setComparison(options[0]);
    setNumber('0');
  };

  const handleRemoveFilter = (columnName) => {
    const removedFilter = filterByNumericValues
      .filter(({ column }) => (column !== columnName));
    setNumericFilters(removedFilter);
  };

  const removeFilters = () => {
    setNumericFilters([]);
  };

  return (
    <section>
      <select
        data-testid="column-filter"
        name="filter"
        value={ filter }
        onChange={ handleChange }
      >
        {filters.map((filterList) => (
          <option key={ filterList } value={ filterList }>{filterList}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
      >
        {options.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="number"
        value={ number }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterSubmit }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeFilters }
      >
        Remover Filtros
      </button>
      {filterByNumericValues && filterByNumericValues.map(
        ({ column, comparison: comp, value }) => (
          <div
            key={ column }
            data-testid="filter"
          >
            <span>{`${column} ${comp} ${value}`}</span>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(column) }
            >
              Remover
            </button>
          </div>
        ),
      )}
    </section>
  );
}
