<template>
  <v-app-bar v-show="showEventTopBar" app class="event-app-bar" height="48"
    ><v-row no-gutters align="center" class="event-bar">
      <v-col cols="auto" class="mr-4">
        <p style="font-size: 16px">
          {{ event.title }}
        </p>
      </v-col>
      <v-col>
        <p style="font-size: 18px; font-weight: 600">
          {{ time }}
        </p>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import { useResultStore } from "@/stores/results";
import { useInfoStore } from "@/stores/info";

export default {
  props: {
    isSmallScreen: {
      type: Boolean,
    },
    showEventTopBar: {
      type: Boolean,
      default: true,
    },
  },
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
      console.log(this.time);
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

<style>
.event-bar {
  padding: 8px 96px !important;
}

@media (max-width: 1279px) {
  .event-bar {
    padding: 8px 50px !important;
  }
}
.event-app-bar {
  padding: 0% !important;
  margin-top: 0px !important;
  background-color: #e0e2e3 !important;
}
</style>
