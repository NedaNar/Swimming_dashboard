<template>
  <v-container class="wr">
    <v-row class="header" no-gutters align="center">
      <v-img
        class="mr-4"
        max-width="24"
        src="./src/components/images/timer.png"
      />
      <div>
        <p :style="{ 'font-size': '16px' }" class="font-weight-bold">
          WORLD RECORD
        </p>
        <p>{{ event.title }}</p>
      </div>
    </v-row>
    <v-row no-gutters>
      <p :style="{ 'margin-left': '14px' }">
        <span
          v-if="event.recordTime"
          :style="{ 'font-size': '16px' }"
          class="font-weight-bold"
          >{{ event.recordTime[event.recordTime.length - 1].time }}</span
        >
        {{ event.recordDetails }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
import { useInfoStore } from "@/stores/info";

export default {
  data() {
    return {
      infoStore: useInfoStore(),
    };
  },
  computed: {
    event() {
      return this.infoStore.getEvent;
    },
  },
};
</script>

<style>
.wr {
  background-color: #d1e9f5;
  padding: 24px 32px 16px 32px !important;
}
</style>
