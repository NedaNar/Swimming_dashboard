<template>
  <div style="position: relative">
    <div class="pool-sheet overlap">
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
    </div>
    <div
      v-if="isRecordVisible"
      :style="{ marginLeft: recordMargin }"
      class="overlap"
    >
      <div class="line-green"></div>
      <p :style="{ marginLeft: '-10px' }" class="text-green">WR</p>
    </div>
  </div>
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
      isRecordVisible: false,
      recordPosition: 0,
      recordMargin: "0px",
      movingDirection: 1,
      splitIndex: 0,
    };
  },
  created() {
    this.fetchResults();
    setInterval(this.fetchResults, 1000);
  },
  computed: {
    eventState() {
      return this.resultStore.getEventState;
    },
    swimmers() {
      return this.infoStore.getSwimmers;
    },
    results() {
      return this.resultStore.getResults;
    },
    recordInSeconds() {
      return this.infoStore.getRecordInSeconds;
    },
  },
  methods: {
    fetchResults() {
      if (this.eventState == "preparing") return;
      try {
        this.resultStore.fetchLiveResults();
      } catch (error) {
        alert("We are having trouble getting live results" + error);
      }
    },
    updatePositions() {
      this.updateRecordPosition();

      this.results.forEach((result) => {
        if (result) {
          this.positions[result.lane] = (result.state * 650) / 50 + "px";
        }
      });
    },
    updateRecordPosition() {
      if (!this.isRecordVisible) return;

      let split = this.infoStore.getRecordSplitInSeconds(this.splitIndex);
      this.recordPosition += (this.movingDirection * 681) / split;
      if (this.recordPosition > 681) {
        this.recordPosition = 681;
        this.movingDirection *= -1;
        this.splitIndex++;

        if (this.splitIndex == this.infoStore.getEvent.recordTime.length) {
          setTimeout(() => {
            this.isRecordVisible = false;
          }, 500);
        }
      }

      if (this.recordPosition < 0) {
        this.recordPosition = 0;
        this.movingDirection *= -1;
        this.splitIndex++;

        if (this.splitIndex == this.infoStore.getEvent.recordTime.length) {
          setTimeout(() => {
            this.isRecordVisible = false;
          }, 500);
        }
      }

      this.recordMargin = this.recordPosition + "px";
    },
  },
  watch: {
    results() {
      this.updatePositions();
    },
    eventState(newState) {
      if (newState == "starting") {
        this.isRecordVisible = true;
      }
    },
  },
};
</script>

<style scoped>
.line-green {
  transform: translateX(-50%);
  background-color: #064700;
  width: 3px;
  height: 480px;
}
.text-green {
  color: #064700 !important;
  font-weight: bold;
}
.pool-sheet {
  background-color: #8ac9e8;
  border-radius: 16px;
  height: 480px;
  width: 682px;
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
