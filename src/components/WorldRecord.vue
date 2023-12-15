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
        <p>Woman 100 freestyle</p>
      </div>
    </v-row>
    <v-row no-gutters>
      <p class="time-text">
        <span :style="{ 'font-size': '16px' }" class="font-weight-bold"
          >{{ worldRecord.time }}
        </span>
        {{ worldRecord.person }}, {{ worldRecord.year }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      worldRecord: null,
    };
  },
  created() {
    this.worldRecord = {
      time: "00.51.71",
      person: "Sarah Sjöström",
      year: "2015",
    };
  },
};
</script>

<style>
.wr {
  background-color: #d1e9f5;
  padding: 24px 32px 16px 32px !important;
}

.time-text {
  margin-left: 40px;
}
</style>
