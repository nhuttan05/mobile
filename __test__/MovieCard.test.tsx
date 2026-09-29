import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieCard, { Movie } from '../components/MovieCard';

const mockMovie: Movie = {
  id: '1',
  title: 'Inception',
  genre: 'Sci-Fi',
  year: 2010,
  rating: 8,
  poster: 'https://via.placeholder.com/150',
  isShowing: true,
};

describe('MovieCard Component Test', () => {
  test('Hiển thị đúng tên phim và điểm đánh giá đúng định dạng ⭐ 8.0', () => {
    const { getByText } = render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} />
    );

    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('⭐ 8.0')).toBeTruthy();
  });

  test('Layout row hiển thị thể loại; layout tile ẩn thể loại (null)', () => {
    const { getByText, queryByText, rerender } = render(
      <MovieCard movie={mockMovie} layout="row" onSelect={jest.fn()} />
    );
    expect(getByText('Sci-Fi • 2010')).toBeTruthy();

    rerender(<MovieCard movie={mockMovie} layout="tile" onSelect={jest.fn()} />);
    expect(queryByText('Sci-Fi • 2010')).toBeNull();
  });

  test('Khai báo isShowing: true hiển thị ✅, false hiển thị ❌', () => {
    const { getByText, rerender } = render(
      <MovieCard movie={mockMovie} onSelect={jest.fn()} />
    );
    expect(getByText('✅')).toBeTruthy();

    const mockHidden = { ...mockMovie, isShowing: false };
    rerender(<MovieCard movie={mockHidden} onSelect={jest.fn()} />);
    expect(getByText('❌')).toBeTruthy();
  });

  test('fireEvent.press gọi hàm onSelect 1 lần đúng tham số id', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <MovieCard movie={mockMovie} onSelect={onSelectMock} />
    );

    fireEvent.press(getByText('Inception'));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith('1');
  });
});