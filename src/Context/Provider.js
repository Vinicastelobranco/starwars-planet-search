import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './Context';

export default function FilterProvider({ children }) {
  const [name, setName] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const contextValue = {
    filterByName: { name },
    setName,
    filterByNumericValues: numericFilters,
    setNumericFilters,
    order,
    setOrder,
  };

  return (
    <FilterContext.Provider value={ contextValue }>
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
