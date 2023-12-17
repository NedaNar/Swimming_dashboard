<template>
  <v-container class="schedule-cont">
    <v-row no-gutters align="center">
      <v-img
        class="mr-4"
        max-width="24"
        src="./src/components/images/calendar.png"
      />
      <div>
        <p :style="{ 'font-size': '16px' }" class="font-weight-bold">
          SCHEDULE
        </p>
        <p>{{ formattedDate }}</p>
      </div>
    </v-row>

    <v-row>
      <v-table class="schedule-table" density="compact">
        <tbody>
          <tr v-for="event in schedule" :key="event">
            <td class="tableRow">
              <v-row no-gutters>
                <v-img
                  v-if="event.title == currentEvent"
                  class="now"
                  src="src/components/images/now.png"
                >
                </v-img>
                <p>
                  <span
                    v-if="event.state == 'ongoing'"
                    :style="{ fontWeight: 'bold' }"
                    >{{ event.title }} - {{ event.type }}</span
                  >
                  <span
                    v-else-if="event.state == 'finished'"
                    :style="{ color: '#515151' }"
                    >{{ event.time }} {{ event.title }} - {{ event.type }}</span
                  >
                  <span v-else
                    >{{ event.time }} {{ event.title }} - {{ event.type }}</span
                  >
                </p>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-row>
  </v-container>
</template>

<script>
import { useInfoStore } from "@/stores/info";

export default {
  data() {
    return {
      infoStore: useInfoStore(),
      formattedDate: "",
      currentEventFound: false,
      oldSchedule: [],
    };
  },
  created() {
    this.fetchCompetitionInfo();

    this.updateFormattedDate();
    setInterval(() => {
      this.updateFormattedDate();
    }, 1000 * 60 * 60);
  },
  computed: {
    currentEvent() {
      return this.infoStore.getEvent.title;
    },
    schedule() {
      const { schedule } = this.infoStore.getCompetitionInfo;

      if (!schedule || this.currentEventFound) {
        return this.oldSchedule;
      }

      const newSchedule = schedule.map((event) => {
        if (event.title === this.currentEvent) {
          this.currentEventFound = true;
          event.state = "ongoing";
        } else {
          event.state = this.currentEventFound ? "upcoming" : "finished";
        }

        return event;
      });

      this.oldSchedule = newSchedule;
      return newSchedule;
    },
  },
  watch: {
    currentEvent() {
      this.currentEventFound = false;
    },
  },
  methods: {
    fetchCompetitionInfo() {
      try {
        this.infoStore.fetchCompetitionInfo();
      } catch (error) {
        alert("We are having trouble getting event details" + error);
      }
    },
    fetchEvent() {
      try {
        this.infoStore.fetchEvent();
      } catch (error) {
        alert("We are having trouble getting event details" + error);
      }
    },
    updateFormattedDate() {
      const today = new Date();
      const options = { day: "2-digit", month: "short", year: "numeric" };
      this.formattedDate = today.toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style>
.schedule-cont {
  background-color: #8ac9e8;
  padding: 24px 32px 32px 32px !important;
}

.schedule-table {
  border-radius: 8px !important;
  width: 100% !important;
  padding: 0px 24px 0px 24px !important;
}

.now {
  max-width: 24px !important;
  margin-right: 8px;
}

.tableRow {
  padding: 12px 0px 8px 0px !important;
  margin: 0px !important;
}
</style>
