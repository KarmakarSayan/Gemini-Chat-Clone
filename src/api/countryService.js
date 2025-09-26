import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,idd';

export const getCountryCodes = async () => {
  try {
    const response = await axios.get(API_URL);
    const countries = response.data
      .filter(country => country.idd && country.idd.root)
      .map(country => ({
        name: country.name.common,
        code: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return countries;
  } catch (error) {
    console.error("Error fetching country codes:", error);
    throw error;
  }
};