import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, PanResponder, ActivityIndicator} from 'react-native';
import {Cat} from '@/components/Card';
import CardContainer from '@/components/CardContainer';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';
const CAT_VOTE_API_URL = 'https://api.thecatapi.com/v1/votes';

const CatTinder = () => {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const position = useRef(new Animated.ValueXY()).current;

  const fetchCats = async () => {
    try {
      const response = await fetch(CAT_API_URL);
      const data = await response.json();
      setCats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cats:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const catsRef = useRef([]); // Create a ref to store cats

  useEffect(() => {
    catsRef.current = cats;
  }, [cats]);

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const rotateAndTranslate = {
    transform: [{
      rotate: rotate
    },
    ...position.getTranslateTransform()
    ]
  };

  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  });

  const submitVote = async (imageId: string, voteValue: number) => {
    const votePayload = {
      image_id: imageId,
      value: voteValue,
      sub_id: 'your-unique-user-id',
    };

    try {
      const response = await fetch(CAT_VOTE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'DEMO-API-KEY',
        },
        body: JSON.stringify(votePayload),
      });

      if (response.ok) {
        console.log('GOOD', await response.text());
      }

      if (!response.ok) {
        console.warn('Error submitting vote:', await response.text());
      }
    } catch (error) {
      console.warn('Error submitting vote:', error);
    }
  };

  const handleSwipe = (direction: number) => {
    const currentCat: Cat = catsRef.current[currentIndex]; // Access cats via ref
    if (!currentCat) {
      console.warn('No more cats to vote on!');
      return;
    }
    // Determine the vote value based on the swipe direction
    const voteValue = direction === 1 ? 1 : -1;


    submitVote(currentCat.id, voteValue);

    Animated.spring(position, {
      toValue: { x: direction * SCREEN_WIDTH, y: 0 },
      useNativeDriver: true,
      restSpeedThreshold: 100,
      restDisplacementThreshold: 40
    }).start(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 120) {
          handleSwipe(1);
        } else if (gestureState.dx < -120) {
          handleSwipe(-1);
        } else {  
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 4,
            useNativeDriver: true,
          }).start();
        }
      }
    })
  ).current;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CardContainer 
        cats={cats} 
        currentIndex={currentIndex} 
        rotateAndTranslate={rotateAndTranslate} 
        likeOpacity={likeOpacity} 
        nopeOpacity={nopeOpacity} 
        nextCardOpacity={nextCardOpacity} 
        nextCardScale={nextCardScale} 
        panResponder={panResponder} 
        handleSwipe={handleSwipe} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CatTinder;

