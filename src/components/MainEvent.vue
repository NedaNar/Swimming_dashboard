<template>
  <v-container :style="{ 'margin-top': '16px' }"
    ><v-row no-gutters align="center"
      ><v-col cols="1"></v-col>
      <v-col cols="5"
        ><v-row no-gutters
          ><p
            :style="{
              'font-size': '28px',
              color: '#004C72',
              'font-weight': 'bold',
            }"
          >
            {{ event }}
          </p></v-row
        ><v-row no-gutters
          ><p
            :style="{ 'font-size': '28px', color: '#515151' }"
            class="text-right"
          >
            {{ category }}
          </p></v-row
        ></v-col
      ><v-col cols="5"
        ><v-row no-gutters justify="end"
          ><p :style="{ 'font-size': '64px', 'line-height': '64px' }">
            {{ time }}
          </p></v-row
        ><v-row no-gutters justify="end"
          ><p
            :style="{ 'font-size': '28px', color: '#515151' }"
            class="text-right"
          >
            {{ completed }} m completed
          </p></v-row
        ></v-col
      ><v-col cols="1"></v-col></v-row
  ></v-container>
</template>

<script>
import { useResultStore } from "@/stores/results";

export default {
  data() {
    return {
      resultStore: useResultStore(),
      time: "00:00:00",
      completed: 50,
      event: "Women 100 Freestyle",
      category: "Finals",
      timerInterval: null,
    };
  },
  computed: {
    eventState() {
      return this.resultStore.getEventState;
    },
  },
  methods: {
    adjustTimer() {
      if (this.eventState == "starting") {
        this.startTimer();
      } else if (this.eventState == "finished") {
        this.stopTimer();
      }
    },
    startTimer() {
      let milliseconds = 0;
      this.timerInterval = setInterval(() => {
        milliseconds += 10;
        this.time = this.formatTime(milliseconds);
      }, 10);
    },
    stopTimer() {
      clearInterval(this.timerInterval);
      this.time = "00:00:00";
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
    eventState(newEventState) {
      this.adjustTimer();
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
};
</script>

<style></style>
