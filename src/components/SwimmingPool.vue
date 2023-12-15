<template>
  <v-sheet class="pool-sheet" height="480" tile width="682px">
    <v-container>
      <template v-for="lane in 10" :key="lane">
        <v-row class="row" no-gutters align="center">
          <p class="name overlap">{{ infoStore.getNameByLane(lane - 1) }}</p>
          <img
            v-if="!infoStore.isSwimmer(lane - 1)"
            :src="infoStore.getFlagByLane(lane - 1)"
            :style="{ marginLeft: positions[lane - 1] }"
            class="flag-icon overlap"
          />
        </v-row>
        <v-row no-gutters v-if="lane != 10">
          <v-col cols="1" class="line-red"></v-col>
          <v-col cols="10" class="line-col"></v-col>
          <v-col cols="1" class="line-red"></v-col>
        </v-row>
      </template>
    </v-container>
  </v-sheet>
</template>

<script>
import { useInfoStore } from "@/stores/info";
import { useResultStore } from "@/stores/results";

export default {
  data() {
    return {
      infoStore: useInfoStore(),
      resultStore: useResultStore(),
      positions: [...Array(10).fill("0px")],
    };
  },
  computed: {
    swimmers() {
      return this.infoStore.getSwimmers;
    },
    results() {
      return this.resultStore.getResults;
    },
  },
  methods: {
    updatePositions() {
      this.results.forEach((result) => {
        if (result) {
          this.positions[result.lane] = (result.state * 650) / 50 + "px";
        }
      });
    },
  },
  watch: {
    results() {
      this.updatePositions();
    },
  },
};
</script>

<style scoped>
.pool-sheet {
  background-color: #8ac9e8;
  border-radius: 16px;
}
.row {
  height: 46px;
}
.name {
  margin-left: 42px;
  position: absolute;
}
.overlap {
  position: absolute;
}
.flag-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid black;
}
.line-col {
  background-color: #f5f5f5;
  height: 2px;
}

.line-red {
  background-color: #bc8a99;
  height: 2px;
}

.v-container {
  padding: 0px !important;
}
</style>
