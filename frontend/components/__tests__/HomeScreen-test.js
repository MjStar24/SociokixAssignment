import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../app/(tabs)/index';

global.fetch = jest.fn();

describe('HomeScreen Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading skeletons initially', () => {
    const { getAllByTestId } = render(<HomeScreen />);
    const skeletons = getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should fetch and display categories', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }],
    });

    const { getByText, queryAllByTestId } = render(<HomeScreen />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/api/categories/');
      expect(getByText('Category1')).toBeTruthy();
      expect(getByText('Category2')).toBeTruthy();
      expect(queryAllByTestId('loading-skeleton').length).toBe(0);
    });
  });

  it('should fetch jobs for the selected category', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Category1' }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ title: 'Job1', location: 'Location1', salary: '1000', featured: true }],
      });

    const { getByText, queryByText } = render(<HomeScreen />);

    await waitFor(() => getByText('Category1'));

    fireEvent.press(getByText('Category1'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('category=Category1'));
      expect(getByText('Job1')).toBeTruthy();
      expect(queryByText('Loading jobs')).toBeNull();
    });
  });

  it('should render featured job cards correctly', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'Category1' }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ title: 'Job1', location: 'Location1', salary: '1000', featured: true }],
      });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => getByText('Category1'));
    fireEvent.press(getByText('Category1'));

    await waitFor(() => {
      expect(getByText('Job1')).toBeTruthy();
      expect(getByText('Featured')).toBeTruthy();
    });
  });

  it('should match snapshot for mobile responsiveness', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
