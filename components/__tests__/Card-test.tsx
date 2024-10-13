import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card from '@/components/Card';

describe('Card Component', () => {
  const mockCat = {
    id: 'cat123',
    url: 'https://example.com/cat.jpg',
  };

  const onLikeMock = jest.fn(); 
  const onNopeMock = jest.fn();

  it('should render the Card component correctly', () => {
    const { getByText, getByTestId } = render(
      <Card cat={mockCat} onLike={onLikeMock} onNope={onNopeMock} />
    );
    expect(getByText('cat123')).toBeTruthy();
    expect(getByText('Cat Breed')).toBeTruthy();
    expect(getByTestId('cat-image')).toBeTruthy();
  });

  it('should call onLike when the like button is pressed', () => {
    const { getByTestId } = render(
      <Card cat={mockCat} onLike={onLikeMock} onNope={onNopeMock} />
    );

    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);
    expect(onLikeMock).toHaveBeenCalled();
  });

  it('should call onNope when the nope button is pressed', () => {
    const { getByTestId } = render(
      <Card cat={mockCat} onLike={onLikeMock} onNope={onNopeMock} />
    );

    const nopeButton = getByTestId('nope-button');
    fireEvent.press(nopeButton);

    expect(onNopeMock).toHaveBeenCalled();
  });
});
