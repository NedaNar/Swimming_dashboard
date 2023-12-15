import { defineStore } from "pinia";
import * as api from "../api/api";

const SWIMMING_API_BASE_URL = "https://api.swimming.io";

export const useInfoStore = defineStore("info", {
  state: () => ({
    swimmers: [],
    eventName: "",
    eventType: "",
    record: "",
    recordDetails: "",
  }),
  getters: {
    getSwimmers: (state) => state.swimmers,
    isSwimmer: (state) => (lane) => {
      return (
        state.swimmers.find((swimmer) => swimmer.lane == lane) == undefined
      );
    },
    getNameByLane: (state) => (lane) => {
      const swimmer = state.swimmers.find((swimmer) => swimmer.lane == lane);
      return swimmer ? swimmer.name : "";
    },
    getFlagByLane: (state) => (lane) => {
      const swimmer = state.swimmers.find((swimmer) => swimmer.lane == lane);
      return swimmer ? swimmer.flag : "";
    },
  },
  actions: {
    async fetchEvent() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "event");
        this.swimmers = data.swimmers;
        this.eventName = data.eventName;
        this.eventType = data.eventType;
        this.record = data.record;
        this.recordDetails = data.recordDetails;
      } catch (error) {
        throw error;
      }
    },
  },
});
