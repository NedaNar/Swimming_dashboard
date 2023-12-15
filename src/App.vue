<script>
import TopBar from "./components/TopBar.vue";
import Swimmers from "./components/Swimmers.vue";
import WorldRecord from "./components/WorldRecord.vue";
import Schedule from "./components/Schedule.vue";
import MedalTable from "./components/MedalTable.vue";
import MainEvent from "./components/MainEvent.vue";
import ResultsTable from "./components/ResultsTable.vue";
import Game from "./components/Game.vue";
import { useResultStore } from "@/stores/results";
import { useInfoStore } from "@/stores/info";

export default {
  components: {
    TopBar,
    Swimmers,
    WorldRecord,
    Schedule,
    MedalTable,
    MainEvent,
    ResultsTable,
    Game,
  },
  data() {
    return {
      resultStore: useResultStore(),
      infoStore: useInfoStore(),
      currentSecond: 0,
    };
  },
  created() {
    this.fetchEvent();
    this.fetchResults();
    setInterval(this.fetchResults, 1000);
  },
  methods: {
    fetchResults() {
      try {
        this.resultStore.fetchLiveResults(this.currentSecond);
        this.currentSecond += 1;
      } catch (error) {
        alert("We are having trouble getting live results" + error);
      }
    },
    fetchEvent() {
      try {
        this.infoStore.fetchEvent();
      } catch (error) {
        alert("We are having trouble getting event details" + error);
      }
    },
  },
};
</script>

<template>
  <v-app>
    <TopBar />
    <v-container class="main" fluid>
      <v-row no-gutters>
        <v-col cols="9">
          <v-row no-gutters> <MainEvent /></v-row>
          <v-row no-gutters> <ResultsTable /></v-row>
          <v-row no-gutters> <Game /></v-row>
        </v-col>
        <v-col cols="3">
          <Swimmers />
          <WorldRecord />
          <Schedule />
          <MedalTable /></v-col
      ></v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.v-col {
  padding: 0px !important;
}
.main {
  background-color: #f5f5f5;
  margin-top: 91px;
  padding: 0px !important;
}

.gray-text {
  color: red !important;
}
</style>
