import axios from 'axios';

const url = "https://api.covid19api.com";
const year = 2020;

export async function getConfirmedCasesByMonth(country, month) {
    try {
        let { startDate, endDate } = createIsoDates(month);
        
        const response = await axios.get(`${url}/country/${country}/status/confirmed`, { params: {from: startDate, to: endDate}})
        const data = response.data;
        const casesOnFirstDay = data[0].Cases;
        const casesOnLastDay = data[data.length - 1].Cases;
        const totalCases = casesOnLastDay - casesOnFirstDay;
        if (totalCases < 0) {
             return 0;
        }
        return totalCases;

    } catch(error) {
        throw new Error(`could not get confirmed cases for country ${country}`);
    }
}

export async function getAvailableCountries() {
    try {
        const response = await axios.get(`${url}/countries`);
        return response.data;
    } catch(error) {
        throw new Error(`Could not find any countries`);
    }
}

export default { getConfirmedCasesByMonth, getAvailableCountries };

function createIsoDates(month) {
    const zeroTime = str => `${str.split("T")[0]}T00:00:00`;
    let startDate = new Date(year, month, 1, 15, 0, 0, 0);
    startDate = zeroTime(startDate.toISOString());
    let endDate = new Date(year, month + 1, 1, 15, 0, 0, 0);
    endDate.setDate(endDate.getDate() - 1);
    endDate = zeroTime(endDate.toISOString());
    return { startDate, endDate };
}

