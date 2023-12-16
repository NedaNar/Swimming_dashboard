<template>
  <v-app-bar app class="custom-app-bar" height="90" dense>
    <v-row class="top" align="center" style="height: 90px" no-gutters>
      <v-col cols="1">
        <v-img
          :src="competitionInfo.logoUrl"
          alt="Logo"
          max-height="55"
          max-width="110"
          class="mr-5"
        />
      </v-col>
      <v-col cols="8">
        <v-toolbar-title>{{ competitionInfo.title }}</v-toolbar-title>
      </v-col>
      <v-col cols="3">
        <div class="text-right-container">
          <p>
            <v-img :src="flagUrl" alt="Logo" class="japan-image" />
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
    };
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

.japan-image {
  height: 16px;
  width: 16px;
  margin-right: 16px;
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
