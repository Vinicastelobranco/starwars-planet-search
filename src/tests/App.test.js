import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import FilterProvider from '../Context/Provider';
import userEvent from '@testing-library/user-event';
import mockedPlanets from './mocks/mockedPlanets';

const filters = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const options = ['maior que', 'menor que', 'igual a'];

describe('Testa a aplicação', () => {

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () => Promise.resolve({ json: () => Promise.resolve({ results: mockedPlanets })
      })
    );

    render(
      <FilterProvider>
        <App />
      </FilterProvider>
    );

    await waitFor(() => expect(screen.getByTestId('name-filter')).toBeInTheDocument());
  });

  it('Verifica se todos os inputs são renderizados', () => {

    screen.getByTestId('name-filter');
    screen.getByTestId('column-filter');
    screen.getByTestId('comparison-filter');
    screen.getByTestId('value-filter');
    screen.getByTestId('button-filter');

  });

  it('Verifica se a tabela possui o número correto de colunas', () => {
    const tableHeader = screen.getByTestId('table-header');
    expect(tableHeader.childElementCount).toBe(13);
  });

  it('Verifica se os planetas são renderizados', async () => {
    await waitFor(() => expect(screen.getAllByTestId('planet-row')));

    screen.getByText('Tatooine');
    screen.getByText('Alderaan');

  });

  it('Verifica se os planetas são renderizados na ordem decrescente', async () => {
    await waitFor(() => expect(screen.getAllByTestId('planet-row')));

    const descInput = screen.getByTestId('column-sort-input-desc');
    const orderButton = screen.getByTestId('column-sort-button');

    userEvent.click(descInput);
    userEvent.click(orderButton);

    const sortedPlanets = [...mockedPlanets];
    sortedPlanets.sort((a, b) => {
      if (a['population'] === 'unknown') return 1;
      if (b['population'] === 'unknown') return -1;
      return b['population'] - a['population'];
    });

    const rows = screen.getAllByTestId('planet-row');
    sortedPlanets.forEach(({ name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, films, created, edited, url }, index) => {
      expect(rows[index].children[0].textContent).toBe(name);
      expect(rows[index].children[1].textContent).toBe(rotation_period);
      expect(rows[index].children[2].textContent).toBe(orbital_period);
      expect(rows[index].children[3].textContent).toBe(diameter);
      expect(rows[index].children[4].textContent).toBe(climate);
      expect(rows[index].children[5].textContent).toBe(gravity);
      expect(rows[index].children[6].textContent).toBe(terrain);
      expect(rows[index].children[7].textContent).toBe(surface_water);
      expect(rows[index].children[8].textContent).toBe(population);
      expect(rows[index].children[9].textContent).toBe(films.join('\n'));
      expect(rows[index].children[10].textContent).toBe(created);
      expect(rows[index].children[11].textContent).toBe(edited);
      expect(rows[index].children[12].textContent).toBe(url);
    });
  });

  it('Verifica se os planetas são filtrados corretamente', async () => {
    const searchInput = screen.getByTestId('name-filter');
    await waitFor(() => expect(screen.getAllByTestId('planet-row')));
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);

    userEvent.type(searchInput, 'tatooine');

    const filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(1);
  });

  it('Verifica se o filtro de "maior que" funciona corretamente', async () => {
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-row')));
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);

    userEvent.selectOptions(columnInput, filters[0]);
    userEvent.selectOptions(comparisonInput, options[0]);
    userEvent.type(valueInput, '200000');
    userEvent.click(filterButton);

    const filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(1);
  });

  it('Verifica se o filtro de "menor que" funciona corretamente', async () => {
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-row')));
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);

    userEvent.selectOptions(columnInput, filters[0]);
    userEvent.selectOptions(comparisonInput, options[1]);
    userEvent.type(valueInput, '2000');
    userEvent.click(filterButton);

    const filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(1);
  });

  it('Verifica se o filtro de "igual a" funciona corretamente', async () => {
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-row')));
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);

    userEvent.selectOptions(columnInput, filters[0]);
    userEvent.selectOptions(comparisonInput, options[2]);
    userEvent.type(valueInput, '1000');
    userEvent.click(filterButton);

    const filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(1);

  });

  it('Verifica se é possível aplicar filtros em cima de filtros', async () => {
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-row')));
    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);

    userEvent.selectOptions(columnInput, filters[0]);
    userEvent.selectOptions(comparisonInput, options[0]);
    userEvent.type(valueInput, '1000');
    userEvent.click(filterButton);

    let filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(2);

    let newColumnInput = screen.getByTestId('column-filter');
    expect(newColumnInput).toHaveLength(filters.length - 1);

    userEvent.selectOptions(columnInput, filters[1]);
    userEvent.selectOptions(comparisonInput, options[2]);
    userEvent.type(valueInput, '304');
    userEvent.click(filterButton);

    filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(1);

    newColumnInput = screen.getByTestId('column-filter');
    expect(newColumnInput).toHaveLength(filters.length - 2);
  });

  it('Verifica se é possível remover um filtro', async () => {
    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    await waitFor(() => expect(screen.getAllByTestId('planet-row')));

    userEvent.selectOptions(columnInput, filters[0]);
    userEvent.selectOptions(comparisonInput, options[0]);
    userEvent.type(valueInput, '1000');
    userEvent.click(filterButton);

    let filteredRows = screen.getAllByTestId('planet-row');
    expect(filteredRows).toHaveLength(2);

    let newColumnInput = screen.getByTestId('column-filter');
    expect(newColumnInput).toHaveLength(filters.length - 1);

    const filterRemove = screen.getByTestId('filter');
    userEvent.click(filterRemove.children[1]);

    const rows = screen.getAllByTestId('planet-row');
    expect(rows).toHaveLength(mockedPlanets.length);
  });
  
  
})


