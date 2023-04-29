import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const SwiperComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.ardis.dp.ua/api/image-feed.json')
      .then(response => response.json())
      .then(data => {
        const updatedImages = data.sliderImages.map(image => ({
          ...image,
          uri: `${image.uri}?${Date.now()}`, // добавляем временную метку к URI изображения
        }));
        setImages(updatedImages);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const renderImages = () => {
    return images.map((image, index) => (
      <View key={index} style={styles.imageContainer}>
        <Image
          source={{ uri: image.uri }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
    ));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.swiperContainer}>
      <Swiper
        autoplay
        autoplayTimeout={5}
        paginationStyle={styles.paginationStyle}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        loop
      >
        {renderImages()}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: width / 2,
    marginTop: 8,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  paginationStyle: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: 'black',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
});

export default SwiperComponent;
