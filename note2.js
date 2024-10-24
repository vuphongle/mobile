import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const bannerImages = [
  require('./assets/Banner1.jpg'),
  require('./assets/Banner2.jpg'),
  require('./assets/Banner3.jpg'),
];

export default function App() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const handleScroll = (event) => {
    const windowWidth = Dimensions.get('window').width;
    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentBanner(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={28} />
        <Text style={styles.title}>PET ADOPTION</Text>
        <View />
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for pets"
        />
        <Icon
          name="search"
          size={20}
          color="#ccc"
          style={styles.searchIcon}
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
              source={image}
              style={styles.bannerImage}
            />
          ))}
        </ScrollView>

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

      <View style={styles.categoryContainer}>
        {/* Các mục danh mục */}
        <View style={styles.categoryItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Cat</Text>
        </View>

        <View style={styles.categoryItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Dog</Text>
        </View>

        <View style={styles.categoryItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Rabbit</Text>
        </View>
      </View>

      {/* Animal List - Điền thủ công từng mục */}
      <ScrollView contentContainerStyle={styles.animalListContainer}>
        {/* Mục động vật 1 */}
        <View style={styles.animalItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.animalImage}
          />
          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>Olivia</Text>
            <Text>Gender: Female</Text>
            <Text>YOB: 2018</Text>
            <Text>Location: Hanoi</Text>
          </View>
        </View>

        {/* Mục động vật 2 */}
        <View style={styles.animalItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.animalImage}
          />
          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>Max</Text>
            <Text>Gender: Male</Text>
            <Text>YOB: 2017</Text>
            <Text>Location: Ho Chi Minh</Text>
          </View>
        </View>

        {/* Mục động vật 3 */}
        <View style={styles.animalItem}>
          <Image
            source={require('./assets/example.png')}
            style={styles.animalImage}
          />
          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>Bella</Text>
            <Text>Gender: Female</Text>
            <Text>YOB: 2019</Text>
            <Text>Location: Da Nang</Text>
          </View>
        </View>

        {/* Thêm các mục động vật khác theo cách tương tự */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: '#ecf0f1',
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
  searchIcon: {
    position: 'absolute',
    right: 25,
    top: 10,
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {},
  bannerImage: {
    width: Dimensions.get('window').width,
    height: 200,
    borderRadius: 10,
  },
  adoptButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  adoptButtonText: {
    textAlign: 'center',
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
    // flex: 0.05, // Bạn có thể loại bỏ hoặc điều chỉnh nếu cần
  },
  showAll: {
    color: '#ff6347',
    fontWeight: 'bold',
    marginRight: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  animalListContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  animalItem: {
    width: (Dimensions.get('window').width / 2) - 20, // Hai cột với khoảng cách
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
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
