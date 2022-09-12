import React, { useContext } from 'react';
import FilterContext from '../Context/Context';

export default function TextFilter() {
  const { setName } = useContext(FilterContext);

  const handleChange = ({ target: { value } }) => setName(value);

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ handleChange }
      placeholder="Pesquise por um planeta"
    />
  );
}
