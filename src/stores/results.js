import { defineStore } from "pinia";
import * as api from "../api/api";

const SWIMMING_API_BASE_URL = "https://api.swimming.io";
let eventState_counter = 0;
let liveResults_counter = 0;

export const useResultStore = defineStore("results", {
  state: () => ({ liveResults: [], eventState: null }),
  getters: {
    getResults: (state) => state.liveResults,
    getEventState: (state) => state.eventState,
    getCompletedDistance: (state) => {
      let maxDistance = 0;

      state.liveResults.forEach((swimmer) => {
        if (swimmer && swimmer.distance > maxDistance) {
          maxDistance = swimmer.distance;
        }
      });
      return maxDistance;
    },
  },
  actions: {
    async fetchLiveResults() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "liveResults");

        this.liveResults = data.swimmers.map((swimmer) => {
          console.log(swimmer);
          if (swimmer == null) return null;
          else if (
            swimmer.state &&
            swimmer.state.length >= liveResults_counter
          ) {
            return {
              name: swimmer.name,
              lane: swimmer.lane,
              state: swimmer.state[liveResults_counter],
              time: swimmer.splitTime[liveResults_counter].time,
              distance: swimmer.splitTime[liveResults_counter].distance,
              place: swimmer.place[liveResults_counter],
            };
          }
        });

        liveResults_counter++;
      } catch (error) {
        throw error;
      }
    },
    async fetchEventState() {
      try {
        const data = await api.get(SWIMMING_API_BASE_URL, "liveResults");
        this.eventState = data.eventState[eventState_counter];
        eventState_counter++;
      } catch (error) {
        throw error;
      }
    },
  },
});
