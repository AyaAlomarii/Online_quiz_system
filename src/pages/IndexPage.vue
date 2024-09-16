<template>
  <q-page class="q-pa-md">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="countries.length > 0">
        <q-card
          v-for="country in countries"
          :key="country.cca3"
          class="q-mb-md country-card"
        >
          <q-card-section>
            <div class="row no-wrap items-center">
              <q-img
                :src="country.flag"
                alt="flag"
                width="50px"
                class="q-mr-md"
              />
              <div>
                <router-link
                  :to="{
                    name: 'CountryDetails',
                    query: { name: country.name.common },
                  }"
                  ><h2>{{ country.name.common }}</h2></router-link
                >
                <p>
                  <strong>Official Name:</strong> {{ country.name.official }}
                </p>
                <p>
                  <strong>Capital:</strong>
                  {{ country.capital ? country.capital.join(', ') : 'N/A' }}
                </p>
                <p><strong>Population:</strong> {{ country.population }}</p>
                <p><strong>Area:</strong> {{ country.area }} sq km</p>
                <q-img class="col-5" :src="country.flags.png" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-else>No countries found.</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CountriesFun from 'src/functions/CountriesFun';
import Country from '@/models/Country';

const countries = ref<Country[]>([]);
const loading = ref(true);

const fetchCountries = async () => {
  try {
    const countriesFuncTwo = new CountriesFun();
    const response = await countriesFuncTwo.executeAsync();
    countries.value = response as Country[];
    console.log('Fetched countries:', countries.value);
  } catch (error) {
    console.error('Failed to fetch countries:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCountries();
});
</script>
