import { defineStore } from "pinia";
import * as api from "../api/api";

const SWIMMING_API_BASE_URL = "https://api.swimming.io";

export const useResultStore = defineStore("results", {
  state: () => ({ liveResults: [], eventState: null }),
  getters: {
    getResults: (state) => state.liveResults,
    getEventState: (state) => state.eventState,
    getCompletedDistance: (state) => {
      let maxDistance = -Infinity;

      state.liveResults.forEach((swimmer) => {
        if (swimmer && swimmer.distance > maxDistance) {
          maxDistance = swimmer.distance;
        }
      });
      return maxDistance;
    },
  },
  actions: {
    async fetchLiveResults(second) {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "liveResults");
        this.eventState = data.eventState[second];

        this.liveResults = data.swimmers.map((swimmer) => {
          if (swimmer == null) return null;
          else if (swimmer.state && swimmer.state.length >= second) {
            return {
              name: swimmer.name,
              lane: swimmer.lane,
              state: swimmer.state[second],
              time: swimmer.splitTime[second].time,
              distance: swimmer.splitTime[second].distance,
              place: swimmer.place[second],
            };
          }
        });
      } catch (error) {
        throw error;
      }
    },
  },
});
