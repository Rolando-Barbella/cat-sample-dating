import React from 'react';
import { Animated, Text,StyleSheet, Dimensions, PanResponderInstance } from 'react-native';
import Card from './Card';
import { Cat } from './Card';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface CardContainerProps {
  cats: Cat[];
  currentIndex: number;
  rotateAndTranslate: object;
  likeOpacity: Animated.AnimatedInterpolation<number>;
  nopeOpacity: Animated.AnimatedInterpolation<number>;
  nextCardOpacity: Animated.AnimatedInterpolation<number>;
  nextCardScale: Animated.AnimatedInterpolation<number>;
  panResponder: PanResponderInstance;
  handleSwipe: (direction: number) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
  cats,
  currentIndex,
  rotateAndTranslate,
  likeOpacity,
  nopeOpacity,
  nextCardOpacity,
  nextCardScale,
  panResponder,
  handleSwipe,
}) => {
  return (
    <>
      {cats.map((cat, index) => {
        if (index < currentIndex) {
          return null;
        } else if (index === currentIndex) {
          return (
            <Animated.View
              key={cat.id}
              style={[rotateAndTranslate, styles.animatedCard]}
              {...panResponder.panHandlers}
            >
              <Animated.View style={[styles.likeTextContainer, { opacity: likeOpacity }]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.nopeTextContainer, { opacity: nopeOpacity }]}>
                <Text style={styles.nopeText}>NOPE</Text>
              </Animated.View>
              <Card 
                cat={cat} 
                onLike={() => handleSwipe(1)} 
                onNope={() => handleSwipe(-1)}
              />
            </Animated.View>
          );
        } else if (index === currentIndex + 1) {
          return (
            <Animated.View
              key={cat.id}
              style={[{
                opacity: nextCardOpacity,
                transform: [{ scale: nextCardScale }],
              }, styles.animatedCard]}
            >
              <Card 
                cat={cat} 
                isNext 
                onLike={() => {}} 
                onNope={() => {}}
              />
            </Animated.View>
          );
        } else {
          return null;
        }
      }).reverse()}
    </>
  );
};

const styles = StyleSheet.create({
  animatedCard: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH - 40,
    padding: 10,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  likeTextContainer: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1000,
  },
  likeText: {
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
  nopeTextContainer: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000,
  },
  nopeText: {
    borderWidth: 1,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '800',
    padding: 10,
  },
});

export default CardContainer;