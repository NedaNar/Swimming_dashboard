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
  </div>

  <v-dialog v-model="dialog" width="auto">
    <v-container class="dialog-border">
      <v-row justify="end" no-gutters>
        <v-img
          @click="dialog = false"
          max-width="20"
          src="./src/components/images/close.png"
        ></v-img>
      </v-row>
      <v-row no-gutters>
        <v-card max-width="640px" class="dialog-card" flat>
          <v-card-title class="text-center"
            >{{ event.title }} - {{ event.type }}</v-card-title
          >
          <v-card-text>
            <v-table>
              <thead class="header-row">
                <tr class="table-row">
                  <th class="header-cell text-left">Place</th>
                  <th class="header-cell text-left">Country</th>
                  <th class="header-cell text-left">Name</th>
                  <th class="header-cell text-left"></th>
                  <th class="header-cell text-left">Time</th>
                  <th class="header-cell text-left">Medal</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="result in finalResults"
                  :key="result.name"
                  class="table-row"
                >
                  <td class="table-cell">{{ result.place }}</td>
                  <td class="table-cell">
                    <img
                      class="dialog-flag"
                      :src="infoStore.getFlagByName(result.name)"
                    />
                  </td>
                  <td class="table-cell text-left pr-4">{{ result.name }}</td>
                  <td class="table-cell text-left pl-4 pr-4"></td>
                  <td class="table-cell text-left pl-4">{{ result.time }}</td>
                  <td class="table-cell pt-1">
                    <img
                      v-if="result.place == 1"
                      class="dialog-medal"
                      src="./images/Gold.png"
                      alt="Gold"
                    />
                    <img
                      class="dialog-medal"
                      v-else-if="result.place == 2"
                      src="./images/Silver.png"
                      alt="Silver"
                    />
                    <img
                      class="dialog-medal"
                      v-else-if="result.place == 3"
                      src="./images/Bronze.png"
                      alt="Bronze"
                    />
                  </td>
                </tr>
                <v-divider></v-divider>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-dialog>
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
      dialog: false,
      dialogContent: {
        title: "hey",
        imageSrc: "",
        width: "",
        paragraph: "",
      },
    };
  },
  created() {
    this.fetchResults();
    setInterval(this.fetchResults, 1000);
  },
  computed: {
    event() {
      return this.infoStore.getEvent;
    },
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
    finalResults() {
      return this.infoStore.getFinalResults;
    },
  },
  methods: {
    fetchFinalResults() {
      try {
        this.infoStore.fetchFinalResults();
      } catch (error) {
        alert("We are having trouble getting live results" + error);
      }
    },
    fetchResults() {
      if (
        this.eventState == "preparing" ||
        this.eventState == "finished" ||
        this.eventState == null
      )
        return;
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
      } else if (newState == "finished") {
        this.dialog = true;
        this.fetchFinalResults();
      }
    },
  },
};
</script>

<style scoped>
.dialog-medal {
  height: 24px;
  width: 24px;
}
.dialog-flag {
  height: 16px;
  width: 16px;
}
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
.dialog-border {
  border-radius: 16px !important;
  background-color: #f5f5f5 !important;
  padding: 16px !important;
}
.dialog-card {
  padding: 0px 36px 16px 36px !important;
}
.header-row {
  height: 36px !important;
}
</style>
