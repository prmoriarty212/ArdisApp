import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const fetchData = async () => {
  try {
    const lastFetchTimestamp = await AsyncStorage.getItem('lastFetchTimestamp');
    const now = moment();

    // Check if data is already in cache and was fetched today
    if (
      lastFetchTimestamp &&
      now.isSame(moment(lastFetchTimestamp), 'day')
    ) {
      const cachedData = await AsyncStorage.getItem('productData');
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    }

    // Fetch the data and store it in AsyncStorage
    const response = await fetch('https://www.ardis.dp.ua/api/product.json');
    const data = await response.json();
    await AsyncStorage.setItem('productData', JSON.stringify(data));
    await AsyncStorage.setItem('lastFetchTimestamp', now.toISOString());
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;
