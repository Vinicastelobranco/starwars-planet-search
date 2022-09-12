import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../Context/Context';

export default function Table() {
  const TEN = 10;
  const [planets, setPlanets] = useState([]);
  const { filterByName, filterByNumericValues } = useContext(FilterContext);
  const { name } = filterByName;
  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(endpoint);
      const data = await response.json();
      const { results } = data;
      const planetsData = results.map((planet) => ({
        name: planet.name,
        rotation_period: planet.rotation_period,
        orbital_period: planet.orbital_period,
        diameter: planet.diameter,
        climate: planet.climate,
        gravity: planet.gravity,
        terrain: planet.terrain,
        surface_water: planet.surface_water,
        population: planet.population,
        films: planet.films,
        created: planet.created,
        edited: planet.edited,
        url: planet.url,
      }));
      setPlanets(planetsData);
    };
    fetchPlanets();
  });

  const planetSearch = name.length > 0 ? planets
    .filter((planet) => (planet.name.toLowerCase().includes(name.toLowerCase())))
    : planets;

  let filteredPlanets = [...planetSearch];
  filterByNumericValues.forEach(({ column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      filteredPlanets = filteredPlanets
        .filter((planet) => (parseInt(planet[column], TEN) > parseInt(value, TEN)));
      break;
    case 'menor que': filteredPlanets
      .filter((planet) => parseInt(planet[column], TEN) < parseInt(value, TEN));
      break;
    default:
      filteredPlanets = filteredPlanets
        .filter((planet) => (parseInt(planet[column], TEN) === parseInt(value, TEN)));
      break;
    }
  });

  return (
    <table>
      <thead>
        <tr data-testid="table-header">
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet) => (
          <tr key={ planet.name } data-testid="planet-row">
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films.join('\n')}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td><a href={ planet.url }>{planet.url}</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
