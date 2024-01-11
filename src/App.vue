<script>
import TopBar from "./components/TopBar.vue";
import EventTopBar from "./components/EventTopBar.vue";
import Swimmers from "./components/Swimmers.vue";
import WorldRecord from "./components/WorldRecord.vue";
import Schedule from "./components/Schedule.vue";
import MedalTable from "./components/MedalTable.vue";
import MainEvent from "./components/MainEvent.vue";
import ResultsTable from "./components/ResultsTable.vue";
import Game from "./components/Game.vue";

export default {
  components: {
    TopBar,
    EventTopBar,
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
      isLargeScreen: true,
      isMediumScreen: false,
      isSmallScreen: false,
      showEventTopBar: false,
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    checkScreenSize() {
      this.isLargeScreen = window.innerWidth >= 1280;
      this.isMediumScreen =
        window.innerWidth >= 700 && window.innerWidth < 1280;
      this.isSmallScreen = window.innerWidth < 700;
    },
    handleScroll() {
      this.showEventTopBar = window.scrollY > 100;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<template>
  <v-app>
    <TopBar />
    <EventTopBar :showEventTopBar="showEventTopBar" />
    <v-container fluid class="main" v-if="isLargeScreen">
      <v-row no-gutters>
        <v-col cols="9">
          <v-container>
            <v-row no-gutters>
              <MainEvent :isSmallScreen="isSmallScreen"
            /></v-row>
            <v-row no-gutters>
              <ResultsTable justify="center" align="center"
            /></v-row>
            <v-row no-gutters> <Game :isSmallScreen="isSmallScreen" /></v-row
          ></v-container>
        </v-col>
        <v-col cols="3">
          <Swimmers />
          <WorldRecord />
          <Schedule />
          <MedalTable /></v-col
      ></v-row>
    </v-container>
    <v-container fluid class="main" v-if="!isLargeScreen">
      <v-row no-gutters>
        <v-col cols="12">
          <v-row no-gutters>
            <MainEvent :isSmallScreen="isSmallScreen" />
          </v-row>
          <v-row no-gutters>
            <ResultsTable justify="center" align="center" />
          </v-row>
          <v-row no-gutters>
            <Game :isSmallScreen="isSmallScreen" />
          </v-row>
        </v-col>

        <v-col
          :cols="isMediumScreen ? 6 : 12"
          style="background-color: #e0e2e3"
        >
          <Swimmers />
        </v-col>
        <v-col
          :cols="isMediumScreen ? 6 : 12"
          style="background-color: #8ac9e8"
        >
          <Schedule />
        </v-col>

        <v-col
          :cols="isMediumScreen ? 6 : 12"
          style="background-color: #d1e9f5"
        >
          <WorldRecord />
        </v-col>
        <v-col :cols="isMediumScreen ? 6 : 12">
          <MedalTable />
        </v-col>
      </v-row>
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
  width: 100%;
}
</style>
