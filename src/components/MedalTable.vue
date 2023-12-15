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
      v-for="country in topMedalCountries"
      :key="country.counry"
    >
      <v-col cols="1" class="mr-2">
        <v-img class="flag" :src="country.flag" max-width="24"></v-img>
      </v-col>
      <v-col cols="10">
        <v-row no-gutters>
          <p class="countryName" :style="{ 'line-height': '16px' }">
            {{ country.counry }}
          </p></v-row
        >
        <v-row align="center" no-gutters>
          <v-col cols="11"
            ><v-progress-linear
              :max="maxMedals"
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
export default {
  data() {
    return {
      topMedalCountries: [
        {
          counry: "United States of America",
          flag: "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/usa.png",
          medals: 34,
        },
        {
          counry: "Australia",
          flag: "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/aus.png",
          medals: 20,
        },
        {
          counry: "China",
          flag: "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/chn.png",
          medals: 18,
        },
        {
          counry: "Japan",
          flag: "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/jpn.png",
          medals: 11,
        },
        {
          counry: "Great Britain",
          flag: "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/gbr.png",
          medals: 8,
        },
      ],
      maxMedals: 0,
    };
  },
  mounted() {
    this.maxMedals = Math.max(
      ...this.topMedalCountries.map((country) => country.medals)
    );
    this.maxMedals += this.maxMedals / 10;
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
