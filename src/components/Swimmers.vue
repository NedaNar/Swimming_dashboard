<template>
  <v-container class="swimmers-cont">
    <v-row class="header" no-gutters align="center">
      <v-img
        class="mr-4"
        max-width="24"
        src="./src/components/images/swimmer.png"
      />
      <p :style="{ 'font-size': '16px' }" class="font-weight-bold">
        IN THIS EVENT
      </p>
    </v-row>
    <v-row>
      <v-carousel
        v-if="swimmers.length > 0"
        show-arrows
        class="mx-auto"
        height="296"
        hide-delimiters
      >
        <template v-slot:prev="{ props }">
          <v-img
            max-width="24"
            src="./src/components/images/prev.png"
            @click="props.onClick"
          ></v-img>
        </template>
        <template v-slot:next="{ props }"
          ><v-img
            max-width="24"
            src="./src/components/images/next.png"
            @click="props.onClick"
          ></v-img>
        </template>

        <v-carousel-item v-for="swimmer in swimmers" :key="swimmer.name">
          <v-card max-height="296" flat class="mx-auto">
            <v-img
              class="mx-auto"
              :src="swimmer.image"
              max-width="120px"
            ></v-img>

            <v-card-title> {{ swimmer.name }} </v-card-title>

            <v-card-text :style="{ 'font-size': '16rem' }">
              <v-row no-gutters class="mb-1">
                <v-col cols="7"
                  ><p :style="{ color: '#515151' }">Nationality</p></v-col
                >
                <v-col cols="5"
                  ><v-row no-gutters align="center">
                    <v-img
                      :src="swimmer.flag"
                      max-width="16"
                      class="mr-2"
                    ></v-img>
                    <p :style="{ color: '#000000' }">{{ swimmer.country }}</p>
                  </v-row></v-col
                >
              </v-row>
              <v-row no-gutters
                ><v-col cols="7"
                  ><p :style="{ color: '#515151' }">Date of birth</p></v-col
                >
                <v-col cols="5">
                  <p :style="{ color: '#000000' }">
                    {{ swimmer.date }}
                  </p>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="7">
                  <p :style="{ color: '#515151' }">Personal best</p></v-col
                >
                <v-col cols="5">
                  <p :style="{ color: '#000000' }">{{ swimmer.pb }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-carousel-item>
      </v-carousel>
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
    swimmers() {
      return this.infoStore.getSwimmers;
    },
  },
  created() {
    this.infoStore.fetchSwimmers();
  },
};
</script>

<style>
.swimmers-cont {
  padding: 0px !important;
  background-color: #e0e2e3;
  padding: 24px 40px 32px 40px !important;
}
.centered-content {
  display: flex;
  align-items: center;
}

.v-card {
  border-radius: 8px !important;
  max-width: 268px;
  background-color: #f5f5f5 !important;
  padding: 24px 24px 32px 24px !important;
}

.header {
  margin-bottom: 24px !important;
}

.v-card-title {
  font-size: 16px !important;
  font-weight: bold !important;
  padding: 0px !important;
  margin-top: 16px !important;
  margin-bottom: 8px !important;
}
.v-col {
  padding: 0px !important;
}
.v-card-text {
  font-size: 14px !important;
  padding: 0px !important;
}
</style>
