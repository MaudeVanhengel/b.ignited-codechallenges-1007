import axios from 'axios';
const url = "https://restcountries.com/v3.1/name"

const getPopulationByCountryName = async function(countryName) {
    try {
    const response = await axios.get(`${url}/${countryName}`);
    return response.data[0].population;
    } catch(error) {
        throw new Error(`Couldn't get population of ${countryName}`)
    }
}

export default getPopulationByCountryName;



