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
          TODAY'S SCHEDULE
        </p>
        <p>01 Nov 2023</p>
      </div>
    </v-row>

    <v-row>
      <v-table class="schedule-table" density="compact">
        <tbody>
          <tr v-for="event in events" :key="event.name">
            <td class="tableRow">
              <v-row no-gutters>
                <v-img
                  v-if="event.state == 'current'"
                  class="now"
                  src="src/components/images/now.png"
                >
                </v-img>
                <p :style="getEventTextStyle(event)">{{ event.name }}</p>
              </v-row>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  created() {
    this.events = [
      { name: "Men 800 Freestyle", state: "finished" },
      { name: "Woman 200 Medley", state: "finished" },
      { name: "Men 50 Breastroke", state: "finished" },
      { name: "Woman 100 Freestyle", state: "current" },
      { name: "Men 400 Freestyle", state: "scheduled" },
    ];
  },
  methods: {
    getEventTextStyle(event) {
      if (event.state === "current") {
        return { fontWeight: "bold" };
      } else if (event.state === "finished") {
        return { color: "#515151" };
      }
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
  margin: 8px 40px 0px 40px !important;
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
