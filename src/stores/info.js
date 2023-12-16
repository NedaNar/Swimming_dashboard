import { defineStore } from "pinia";
import * as api from "../api/api";

const SWIMMING_API_BASE_URL = "https://api.swimming.io";

export const useInfoStore = defineStore("info", {
  state: () => ({
    swimmers: [],
    event: [
      { title: "" },
      { type: "" },
      { recordTime: [] },
      { recordDetails: "" },
    ],
    competitionInfo: [
      { logoUrl: "" },
      { title: "" },
      { countryCode: "" },
      { location: "" },
      { poolLength: 50 },
      { schedule: [] },
    ],
    countries: [],
  }),
  getters: {
    getSwimmers: (state) => state.swimmers,
    isSwimmer: (state) => (lane) => {
      return (
        state.swimmers.find((swimmer) => swimmer.lane == lane) == undefined
      );
    },
    getCompetitionInfo: (state) => state.competitionInfo,
    getNameByLane: (state) => (lane) => {
      const swimmer = state.swimmers.find((swimmer) => swimmer.lane == lane);
      return swimmer ? swimmer.name : "";
    },
    getFlagByLane: (state) => (lane) => {
      const swimmer = state.swimmers.find((swimmer) => swimmer.lane == lane);
      return swimmer ? swimmer.flag : "";
    },
    getEvent: (state) => state.event,
    getTopCountries: (state) => {
      const sortedCountries = [...state.countries].sort(
        (a, b) => b.medals - a.medals
      );
      return sortedCountries.slice(0, 5);
    },
    getStartingTime: (state) =>
      state.competitionInfo.schedule.find((ev) => ev.title == state.event.title)
        .time,
    getRecordInSeconds: (state) => {
      const [minutes, seconds, milliseconds] = state.event.recordTime
        .split(":")
        .map(Number);
      return minutes * 60 + seconds + milliseconds / 100;
    },
    getRecordSplitInSeconds: (state) => (index) => {
      const timeString = state.event.recordTime[index].time;

      const [minutes, seconds, milliseconds] = timeString
        .split(":")
        .map(Number);

      if (index != 0) {
        const previousSplitString =
          index == 0 ? null : state.event.recordTime[index - 1].time;
        const [prevMinutes, prevSeconds, prevMilliseconds] = previousSplitString
          .split(":")
          .map(Number);

        return (
          minutes * 60 +
          seconds +
          milliseconds / 100 -
          (prevMinutes * 60 + prevSeconds + prevMilliseconds / 100)
        );
      }
      return minutes * 60 + seconds + milliseconds / 100;
    },
  },
  actions: {
    async fetchSwimmers() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "event");
        this.swimmers = data.swimmers;
      } catch (error) {
        throw error;
      }
    },
    async fetchCompetitionInfo() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "competition");
        this.competitionInfo = data;
      } catch (error) {
        throw error;
      }
    },
    async fetchEvent() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "event");
        this.event = data.event;
      } catch (error) {
        throw error;
      }
    },
    async fetchCountries() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "countries");
        this.countries = data.countries;
      } catch (error) {
        throw error;
      }
    },
  },
});
