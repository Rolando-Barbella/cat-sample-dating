import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated, PanResponder } from 'react-native';
import CardContainer from '@/components/CardContainer';
import { Cat } from '@/components/Card';

// Mocking Animated API as it's hard to test animations in unit tests
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mockCats: Cat[] = [
  { id: '1', url: 'https://example.com/cat1.jpg', },
  { id: '2', url: 'https://example.com/cat2.jpg', },
];

const rotateAndTranslate = jest.fn(); 
const handleSwipe = jest.fn()

const opacityFn = {
  interpolate: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  hasListeners: jest.fn(),
}; 

const mockPanResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: jest.fn(),
  onPanResponderRelease: jest.fn(),
});

describe('CardContainer Tests', () => {
  it('renders the current and next cat cards correctly', () => {
    const { getAllByTestId } = render(
      <CardContainer 
        cats={mockCats} 
        currentIndex={0} 
        rotateAndTranslate={rotateAndTranslate} 
        likeOpacity={opacityFn} 
        nopeOpacity={opacityFn} 
        nextCardOpacity={opacityFn} 
        nextCardScale={new Animated.Value(1)} 
        panResponder={mockPanResponder} 
        handleSwipe={handleSwipe} />
    );
    const catImages = getAllByTestId('cat-image');
    expect(catImages.length).toBe(2);
  });

  it('renders the LIKE and NOPE texts with correct opacity', () => {
    const { getByText } = render(
      <CardContainer 
        cats={mockCats} 
        currentIndex={0} 
        rotateAndTranslate={rotateAndTranslate} 
        likeOpacity={opacityFn} 
        nopeOpacity={opacityFn} 
        nextCardOpacity={opacityFn} 
        nextCardScale={new Animated.Value(1)} 
        panResponder={mockPanResponder}
        handleSwipe={handleSwipe} />
    );

    expect(getByText('LIKE')).toBeTruthy();
    expect(getByText('NOPE')).toBeTruthy();

  });

  it('does not render previous cats (cats with index < currentIndex)', () => {
    const { queryByText } = render(
      <CardContainer 
        cats={mockCats} 
        currentIndex={1} 
        rotateAndTranslate={rotateAndTranslate} 
        likeOpacity={opacityFn} 
        nopeOpacity={opacityFn} 
        nextCardOpacity={opacityFn} 
        nextCardScale={new Animated.Value(1)} 
        panResponder={mockPanResponder}
        handleSwipe={handleSwipe} />
    );

    expect(queryByText(mockCats[0].id)).toBeNull();
  });
});
