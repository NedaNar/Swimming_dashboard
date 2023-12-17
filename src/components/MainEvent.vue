<template>
  <v-container :style="{ 'margin-top': '16px' }"
    ><v-row no-gutters align="center"
      ><v-col cols="1"></v-col>
      <v-col cols="5">
        <v-row no-gutters>
          <p
            :style="{
              'font-size': '28px',
              color: '#004C72',
              'font-weight': 'bold',
            }"
          >
            {{ event.title }}
          </p>
        </v-row>
        <v-row no-gutters>
          <p
            :style="{ 'font-size': '28px', color: '#515151' }"
            class="text-right"
          >
            {{ event.type }}
          </p>
        </v-row> </v-col
      ><v-col cols="5">
        <v-row no-gutters justify="end">
          <p :style="{ 'font-size': '64px', 'line-height': '64px' }">
            {{ time }}
          </p>
        </v-row>
        <v-row no-gutters justify="end">
          <p
            :style="{ 'font-size': '28px', color: '#515151' }"
            class="text-right"
          >
            <span v-if="eventState == 'preparing'"
              >Starting at {{ start }}</span
            >
            <span v-else-if="eventState == 'finished' || eventState == null"
              >Event finished</span
            >
            <span v-else>{{ completedDistance }} m completed</span>
          </p>
        </v-row> </v-col
      ><v-col cols="1"></v-col></v-row
  ></v-container>
</template>

<script>
import { useResultStore } from "@/stores/results";
import { useInfoStore } from "@/stores/info";

export default {
  data() {
    return {
      resultStore: useResultStore(),
      infoStore: useInfoStore(),
      time: "00:00:00",
      timerInterval: null,
      startTime: 0,
    };
  },
  computed: {
    eventState() {
      return this.resultStore.getEventState;
    },
    completedDistance() {
      return this.resultStore.getCompletedDistance;
    },
    event() {
      return this.infoStore.getEvent;
    },
    start() {
      return this.infoStore.getStartingTime;
    },
  },
  created() {
    this.fetchEvent();

    this.fetchEventState();
    setInterval(() => {
      this.fetchEventState();
    }, 1000);
  },
  methods: {
    fetchEvent() {
      try {
        this.infoStore.fetchEvent();
      } catch (error) {
        alert("We are having trouble getting event details" + error);
      }
    },
    fetchEventState() {
      try {
        this.resultStore.fetchEventState();
      } catch (error) {
        alert("We are having trouble getting event details" + error);
      }
    },
    adjustTimer() {
      if (this.eventState == "starting") {
        this.startTime = performance.now();
        this.startTimer();
      } else if (this.eventState == "finished") {
        this.stopTimer();
      }
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.updateTimer();
      }, 10);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.time = "00:00:00";
    },
    updateTimer() {
      const elapsedMilliseconds = performance.now() - this.startTime;
      this.time = this.formatTime(elapsedMilliseconds);
    },
    formatTime(milliseconds) {
      const minutes = Math.floor(milliseconds / (60 * 1000));
      const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
      const ms = Math.round((milliseconds % 1000) / 10); // Rounded to two digits

      const formattedTime = [
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
        String(ms).padStart(2, "0"),
      ].join(":");

      return formattedTime;
    },
  },
  watch: {
    eventState() {
      this.adjustTimer();
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
};
</script>

<style></style>
