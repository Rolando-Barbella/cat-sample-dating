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

    // Check if the cat's ID is displayed
    expect(getByText('cat123')).toBeTruthy();
    // Check if the 'Cat Breed' text is displayed
    expect(getByText('Cat Breed')).toBeTruthy();
    // Check if the image is displayed
    expect(getByTestId('cat-image')).toBeTruthy();
  });

  it('should call onLike when the like button is pressed', () => {
    const { getByTestId } = render(
      <Card cat={mockCat} onLike={onLikeMock} onNope={onNopeMock} />
    );

    // Simulate pressing the like button
    const likeButton = getByTestId('like-button');
    fireEvent.press(likeButton);

    // Ensure the onLike function is called
    expect(onLikeMock).toHaveBeenCalled();
  });

  it('should call onNope when the nope button is pressed', () => {
    const { getByTestId } = render(
      <Card cat={mockCat} onLike={onLikeMock} onNope={onNopeMock} />
    );

    // Simulate pressing the nope button
    const nopeButton = getByTestId('nope-button');
    fireEvent.press(nopeButton);

    // Ensure the onNope function is called
    expect(onNopeMock).toHaveBeenCalled();
  });
});
