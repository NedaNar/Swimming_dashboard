<template>
  <v-container height="auto" :style="{ 'max-width': '1020px' }">
    <v-table class="pool-table">
      <thead class="header-row">
        <tr class="table-row">
          <th class="header-cell text-center">Lane</th>
          <th class="header-cell text-left"></th>
          <th class="header-cell text-center">Time</th>
          <th class="header-cell text-center">Place</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lane, index) in lanes" :key="index" class="table-row">
          <td class="table-cell text-center no-borders">
            {{ lanes[index] }}
          </td>
          <td
            class="table-cell text-left no-borders"
            :style="{
              'vertical-align': 'top',
              'min-width': '680px',
              width: '680px',
            }"
          >
            <swimming-pool v-if="index == 0" />
          </td>
          <td class="table-cell text-center no-borders">
            {{
              results[index] != null &&
              results[index].time != null &&
              results[index].distance == distance
                ? results[index].time
                : "-"
            }}
          </td>
          <td class="table-cell text-center no-borders">
            {{
              results[index] != null &&
              results[index].place != null &&
              results[index].distance == distance
                ? results[index].place
                : "-"
            }}
          </td>
        </tr>
        <tr>
          <td class="table-cell text-center no-borders"></td>
          <td class="table-cell text-left no-borders"></td>
          <td class="table-cell text-center no-borders"></td>
          <td class="table-cell text-center no-borders"></td>
        </tr>
      </tbody> </v-table
  ></v-container>
</template>

<script>
import { useResultStore } from "@/stores/results";
import SwimmingPool from "./SwimmingPool.vue";

export default {
  components: {
    SwimmingPool,
  },
  data() {
    return {
      resultStore: useResultStore(),
      lanes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      currentSecond: 0,
      times: [],
      places: [],
      distance: 0,
    };
  },
  created() {},
  methods: {},
  computed: {
    results() {
      this.distance = this.resultStore.getCompletedDistance;
      return this.resultStore.getResults;
    },
  },
};
</script>

<style>
.table-row {
  background-color: #f5f5f5;
  height: 48px !important;
}
.table-cell {
  font-size: 16px;
  color: black;
  text-align: center;
  height: 48px !important;
}
.no-borders {
  padding: 0px !important;
  border-bottom: none !important;
}
.pool-table {
  background-color: #f5f5f5 !important;
  width: 1000px !important;
}
</style>
