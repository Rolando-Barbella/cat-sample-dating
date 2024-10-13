import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


interface Cat {
  id: string;
  url: string;
  breeds?: { origin: string }[];
}

interface CardProps {
  cat: Cat;
  isNext?: boolean;
  onLike: () => void;
  onNope: () => void;
}

const Card: React.FC<CardProps> = ({ cat, isNext = true, onLike, onNope }) => {
  return (
    <View style={[styles.card, isNext ? styles.nextCard : null]}>
      <Image source={{ uri: cat.url }} style={styles.image} resizeMode={"cover"} testID="cat-image" />
      <View style={styles.infoContainer}>
        <View style={styles.breedInfo}>
          <Text style={styles.breedName}>{cat.id}</Text>
          <Text style={styles.country}>{'Cat Breed'}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity testID="nope-button" style={styles.actionButton} onPress={onNope}>
          <FontAwesome name="times" size={26} color="#FF5864" />
        </TouchableOpacity>
        <TouchableOpacity testID="like-button" style={styles.actionButton} onPress={onLike}>
          <FontAwesome name="heart" size={24} color="#6ad88e" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    top: '5%',
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH - 40,
    padding: 10,
    position: 'absolute',
    backgroundColor: 'white',
  },
  nextCard: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  breedInfo: {
    flex: 1,
  },
  breedName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  country: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 50,
    padding: 15,
    paddingTop: 0,
    justifyContent: 'center', alignItems: 'center'
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFF',
  },
});

export default Card;
