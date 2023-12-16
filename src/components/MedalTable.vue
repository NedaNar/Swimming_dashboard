<template>
  <v-container class="table-cont">
    <v-row class="header" no-gutters align="center">
      <v-img
        class="mr-4"
        max-width="24"
        src="./src/components/images/medal.png"
      />
      <div>
        <p :style="{ 'font-size': '16px' }" class="font-weight-bold">
          MEDAL TABLE
        </p>
        <p>Top 5 countries by total medals</p>
      </div>
    </v-row>

    <v-row
      no-gutters
      align="center"
      class="countryRow"
      v-for="country in topCountries"
      :key="country.name"
    >
      <v-col cols="1" class="mr-2">
        <v-img
          class="flag"
          :src="getFlagUrl(country.countryCode)"
          max-width="24"
        ></v-img>
      </v-col>
      <v-col cols="10">
        <v-row no-gutters>
          <p class="countryName" :style="{ 'line-height': '16px' }">
            {{ country.name }}
          </p></v-row
        >
        <v-row align="center" no-gutters>
          <v-col cols="11"
            ><v-progress-linear
              :max="topCountries[0].medals"
              rounded-bar
              :model-value="country.medals"
              height="12"
              bg-color="#E0E2E3"
              color="#004C72"
            ></v-progress-linear></v-col
          ><v-col cols="1"
            ><p class="text-right" :style="{ 'line-height': '14px' }">
              {{ country.medals }}
            </p></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useInfoStore } from "@/stores/info";

export default {
  data() {
    return {
      infoStore: useInfoStore(),
    };
  },
  created() {
    this.fetchCountries();
    setInterval(() => {
      this.fetchCountries();
    }, 1000);
  },
  computed: {
    topCountries() {
      return this.infoStore.getTopCountries;
    },
  },
  methods: {
    fetchCountries() {
      try {
        this.infoStore.fetchCountries();
      } catch (error) {
        alert("Error getting country info" + error);
      }
    },
    getFlagUrl(countryCode) {
      return (
        "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/" +
        countryCode.toLowerCase() +
        ".png"
      );
    },
  },
};
</script>

<style>
.table-cont {
  background-color: #e0e2e3;
  padding: 24px 32px 16px 32px !important;
}

.countryRow {
  margin-bottom: 16px !important;
}

.flag {
  max-width: 32px;
  max-height: 32px;
}
</style>
