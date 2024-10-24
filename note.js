import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const animal = [
  {
    name: 'Olivia',
    gender: 'Female',
    yob: 2018,
    location: 'Hanoi',
    image: require('./assets/example.png'),
  },
  {
    name: 'Pedro',
    gender: 'Male',
    yob: 2017,
    location: 'Ho Chi Minh City',
    image: require('./assets/example.png'),
  },
  {
    name: 'Lily',
    gender: 'Female',
    yob: 2019,
    location: 'Da Nang',
    image: require('./assets/example.png'),
  },
  {
    name: 'Max',
    gender: 'Male',
    yob: 2016,
    location: 'Hai Phong',
    image: require('./assets/example.png'),
  },
  {
    name: 'Bella',
    gender: 'Female',
    yob: 2020,
    location: 'Can Tho',
    image: require('./assets/example.png'),
  },
  {
    name: 'Charlie',
    gender: 'Male',
    yob: 2015,
    location: 'Hue',
    image: require('./assets/example.png'),
  },
];

const imageMap = {
  'Cat': require('./assets/example.png'),
  'Dog': require('./assets/example.png'),
  'Rabbit': require('./assets/example.png'),
  'Bird': require('./assets/example.png'),
  'Fish': require('./assets/example.png'),
  'Others': require('./assets/example.png'), // Sửa lỗi chính tả từ 'Orthers' thành 'Others'
};

const animaltype = [
  { animaltype: 'Cat', image: 'Cat'},
  { animaltype: 'Dog', image: 'Dog'},
  { animaltype: 'Rabbit', image: 'Rabbit'},
  { animaltype: 'Bird', image: 'Bird'},
  { animaltype: 'Fish', image: 'Fish'},
  { animaltype: 'Others', image: 'Others'},
];

const bannerImages = [
  require('./assets/Banner1.jpg'),
  require('./assets/Banner2.jpg'),
  require('./assets/Banner3.jpg'),
];

export default function App() {

  useEffect(() => {
    // Fetch data từ MockAPI
    axios.get('https://6707f41d8e86a8d9e42d968b.mockapi.io/animal')
      .then(response => setAnimals(response.data))
      .catch(error => console.error(error));

    axios.get('https://6707f41d8e86a8d9e42d968b.mockapi.io/animaltype')
      .then(response => setAnimaltypes(response.data))
      .catch(error => console.error(error));
  }, []);

  const [currentBanner, setCurrentBanner] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [animaltypes, setAnimaltypes] = useState([]);

  const handleScroll = (event) => {
    const windowWidth = Dimensions.get('window').width;
    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentBanner(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>PET ADOPTION</Text>
        <View style={{ width: 28 }} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for pets"
        />
        <Icon 
          name="search" 
          size={20} 
          color="#ccc" 
          style={styles.searchIconRight} 
        />
      </View>
      
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll} 
          style={styles.banner}
        >
          {bannerImages.map((image, index) => (
            <Image
              key={index}
              // source={{uri: image }} dùng link ảnh
              source={image}
              style={styles.bannerImage}
            />
          ))}
        </ScrollView>
        
        {/* Adopt Now Button */}
        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.adoptButtonText}>Adopt Now</Text>
        </TouchableOpacity>
      </View>
      
      {/* Dots */}
      <View style={styles.dotsContainer}>
        {bannerImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentBanner === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
      
      {/* Categories và Show All */}
      <View style={styles.categoriesHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesScrollContainer}
        style={styles.categoriesScrollView}
      >
        {animaltypes.map((item, index) => (
          <View key={index} style={styles.categoryItem}>
            <Image
              source={imageMap[item.image]}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{item.animaltype}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Animal List */}
      <View style={styles.animalListContainer}>
        <FlatList
          data={animals}
          // showsVerticalScrollIndicator = {false}
          showsHorizontalScrollIndicator = {false}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          // numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.animalItem}>
              <Image
                // source={item.image}
                source={imageMap[item.image]}
                style={styles.animalImage}
              />
              <View style={styles.animalInfo}>
                <Text style={styles.animalName}>{item.name}</Text>
                <Text>Gender: {item.gender}</Text>
                <Text>YOB: {item.yob}</Text>
                <Text>Location: {item.location}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    flex: 0.05,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    flex: 0.1,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 35, 
    backgroundColor: '#f9f9f9',
  },
  searchIconRight: {
    position: 'absolute',
    right: 25,
    top: 10,
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 10,
    flex: 0.3,
  },
  banner: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  bannerImage: {
    width: Dimensions.get('window').width,
    height: 200,
    borderRadius: 10,
  },
  adoptButton: {
    position: "absolute",
    top: "50%",
    right: 20, 
    transform: [{ translateY: -20 }],
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  adoptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    flex: 0.05,
  },
  categoriesScrollView: {
    maxHeight: 120,
    marginBottom: 20,
  },
  categoriesScrollContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryText: {
    textAlign: 'center',
  },
  showAll: {
    color: '#ff6347',
    fontWeight: 'bold',
    marginRight: 10,
  },
  animalListContainer: {
    flex: 0.4,
    paddingHorizontal: 10,
  },
  animalItem: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column', 
    alignItems: 'flex-start',
  },
  animalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10, 
    marginBottom: 10,
    width: 200,
  },
  animalInfo: {
    alignSelf: 'flex-start',
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
