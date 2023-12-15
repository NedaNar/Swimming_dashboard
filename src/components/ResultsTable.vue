<template>
  <v-container class="mb-5">
    <v-row no-gutters
      ><v-col cols="1"></v-col>
      <v-col cols="10"><v-divider></v-divider></v-col>
      <v-col cols="1"></v-col
    ></v-row>
    <v-row no-gutters style="height: 32px"
      ><v-col cols="1"></v-col>
      <v-col cols="1" class="d-flex align-center ml-1">Lane</v-col>
      <v-col cols="7"></v-col>
      <v-col cols="1" class="d-flex justify-center align-center">Time</v-col>
      <v-col cols="1" class="d-flex justify-center align-center">Place</v-col>
      <v-col cols="1"></v-col
    ></v-row>
    <v-row no-gutters
      ><v-col cols="1"></v-col>
      <v-col cols="10"><v-divider></v-divider></v-col>
      <v-col cols="1"></v-col
    ></v-row>
    <v-row no-gutters class="mt-1">
      <v-col cols="1"></v-col>
      <v-col style="flex: 0 0 60px">
        <v-table class="table ml-2">
          <tbody>
            <tr v-for="lane in lanes" :key="lane" class="table-row">
              <td class="table-cell text-left">{{ lane }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col style="flex: 0 0 682px">
        <SwimmingPool />
      </v-col>
      <v-col cols="1">
        <v-table class="table">
          <tbody>
            <tr v-for="result in results" :key="result" class="table-row">
              <td class="table-cell">
                {{
                  result != null
                    ? result.time != null && result.distance == distance
                      ? result.time
                      : "-"
                    : ""
                }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="1">
        <v-table class="table">
          <tbody>
            <tr v-for="result in results" :key="result" class="table-row">
              <td class="table-cell">
                {{
                  result != null
                    ? result.place != null && result.distance == distance
                      ? result.place
                      : "-"
                    : ""
                }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="1"></v-col> </v-row
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
      console.log(this.distance);
      return this.resultStore.getResults;
    },
  },
};
</script>

<style>
.table {
  width: 100%;
}
.table-row {
  background-color: #f5f5f5;
}
.table-cell {
  font-size: 16px;
  color: black;
  text-align: center;
  border: none !important;
  padding: 0px !important;
  height: 48px !important;
}
</style>
