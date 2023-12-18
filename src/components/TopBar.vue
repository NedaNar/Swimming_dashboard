<template>
  <v-app-bar app class="custom-app-bar" height="90" dense>
    <v-row class="top" align="center" style="height: 90px" no-gutters>
      <v-col cols="auto">
        <v-img
          :src="competitionInfo.logoUrl"
          alt="Logo"
          height="55"
          width="110"
          class="mr-5"
        />
      </v-col>
      <v-col cols="auto" v-if="isLargeScreen">
        <h2>{{ competitionInfo.title }}</h2>
      </v-col>
      <v-col v-if="isLargeScreen">
        <div class="text-right-container">
          <p>
            <v-img :src="flagUrl" alt="Logo" class="japan-image mr-5" />
          </p>

          <div class="text-right-content">
            <p class="font-weight-bold">
              {{ competitionInfo.countryCode }} {{ competitionInfo.location }}
            </p>
            <p :style="{ color: '#515151' }">
              {{
                competitionInfo.poolLength == 50
                  ? "Long course"
                  : "Short course"
              }}
              ({{ competitionInfo.poolLength }}m)
            </p>
          </div>
        </div>
      </v-col>
      <v-col v-if="!isLargeScreen">
        <v-row no-gutters>
          <h3 class="mb-1">{{ competitionInfo.title }}</h3>
        </v-row>
        <v-row no-gutters>
          <p>
            <v-img :src="flagUrl" alt="Logo" class="japan-image mr-2" />
          </p>
          <p class="font-weight-bold mr-2">
            {{ competitionInfo.countryCode }}
          </p>
          <p :style="{ color: '#515151' }">
            {{
              competitionInfo.poolLength == 50 ? "Long course" : "Short course"
            }}
            ({{ competitionInfo.poolLength }}m)
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { useInfoStore } from "@/stores/info";

export default {
  data() {
    return {
      infoStore: useInfoStore(),
      flagUrl: "",
      isLargeScreen: true,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 880;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  computed: {
    competitionInfo() {
      let info = this.infoStore.getCompetitionInfo;
      this.flagUrl = info.countryCode
        ? "https://www.worldaquatics.com/resources/v2.9.0/i/elements/flags/" +
          info.countryCode.toLowerCase() +
          ".png"
        : "";
      return info;
    },
  },
  created() {
    this.infoStore.fetchCompetitionInfo();
  },
};
</script>

<style>
.top {
  padding-left: 70px;
  padding-right: 56px;
}

@media (max-width: 1279px) {
  .top {
    padding-left: 24px;
    padding-right: 24px;
  }
}

.japan-image {
  height: 16px;
  width: 16px;
}

.text-right-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.text-right-content {
  display: flex;
  flex-direction: column;
}

.custom-app-bar {
  box-shadow: none !important;
  border-bottom: 1px solid #e0e2e3 !important;
  padding: 0% !important;
  margin-top: 0px !important;
  background-color: #f5f5f5 !important;
}
</style>
