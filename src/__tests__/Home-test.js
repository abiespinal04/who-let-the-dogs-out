import React from 'react';
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import Home from '../screen/Home';

const renderComponent = () => render(<Home />);
describe('<Home />', () => {
  afterEach(() => {
    cleanup();
  });

  test('Check if component renders', () => {
    const {getByText, getByPlaceholderText} = renderComponent();
    const whoLetTheDogsOutText = getByText('Who Let The Dogs Out?');
    expect(whoLetTheDogsOutText).toBeDefined();
    const searchBreedText = getByPlaceholderText('Search breed');
    expect(searchBreedText).toBeDefined();
  });

  test('Render a list of dogs breed', async () => {
    const {queryByTestId, getByTestId, getByText} = renderComponent();

    fireEvent.press(getByText('Who Let The Dogs Out?'));

    expect(queryByTestId('dog-breed-0')).toBeNull();

    await waitFor(() => {
      return queryByTestId('dog-breed-0');
    });

    expect(getByTestId('dog-breed-container-0'));
    expect(getByTestId('dog-breed-text-0'));
  });
});
