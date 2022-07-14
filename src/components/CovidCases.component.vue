<template>
    <div class="container">
        <h2>Confirmed cases in 2020</h2>
        <br />
        <div v-if="this.error" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        <div class="row">
        <div class="col-xs-12 col-md-3 col-md-offset-2">
            <form @submit.prevent="submit">
                <label for="countrySelect" class="form-label">Country:</label>
                <select required class="form-select" v-model="selectedCountry" id="countrySelect">
                    <option disabled value="">Select Country</option>
                    <option v-for="country in countryOptions" v-bind:key="country" :value="country">{{
                            country.Country
                    }} </option>
                </select>
                <br />
                <label for="monthSelect" class="form-label">Month:</label>
                <select required class="form-select" v-model="selectedMonth" id="monthSelect">
                    <option disabled value="">Select Month</option>
                    <option v-for="(month, index) in monthOptions" v-bind:key="month" :value="index">{{ month }}
                    </option>
                </select>
                <br />
                <input type="submit" class="btn btn-primary" value="Search" />
            </form>
        </div>

        <div class="col" v-if="submitted">
            <h4>Results for {{ selectedCountry.Country}}</h4>
            <p><span>Confirmed cases: </span> {{ confirmedCases }}</p>
            <p><span>Total population: </span> {{population}}</p>
            <p><span>Percentage of population: </span> {{ percentage }}%</p>
        </div>
        </div>
    </div>
</template>
<script>
import getPopulationByCountryName from '../services/countryService';
import * as covidService from '../services/covidService';
export default {
    name: "CovidCasesComponent",
    data() {
        return {
            monthOptions: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
            countryOptions: [],
            selectedCountry: "",
            selectedMonth: "",
            population: "",
            confirmedCases: "",
            percentage: "",
            vaccines: [],
            submitted: false,
            error: "",
        }
    },
    methods: {
        getCountries: async function () {
            const response = await covidService.getAvailableCountries();
            response.sort((a, b) => {
                let fa = a.Country.toLowerCase(), 
                    fb = b.Country.toLowerCase();
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
            response.forEach(countryObject => {
                this.countryOptions.push(countryObject)
            });
        },
        calculatePercentage: function () {
            this.percentage = Math.round(((this.confirmedCases / this.population) * 100) * 1000) / 1000;
        },
        submit: async function () {
            try {
            this.confirmedCases = await covidService.getConfirmedCasesByMonth(this.selectedCountry.Slug, this.selectedMonth);

            this.population = await getPopulationByCountryName(this.selectedCountry.Country);
            this.calculatePercentage();
            this.submitted = true;
            }
            catch (error) {
                this.error = error;
                console.log(error)
                this.submitted = false;
            }
        }
    },
    beforeMount() {
        this.getCountries();
    }

}
</script>
<style scoped>
.container {
    margin: 1rem;
}
</style>