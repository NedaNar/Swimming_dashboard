<template>
  <v-app-bar app class="custom-app-bar" height="90" dense>
    <v-row class="top" align="center" style="height: 90px" no-gutters>
      <v-col cols="1">
        <v-img
          src="./src/components/images/Championships_logo.png"
          alt="Logo"
          max-height="55"
          max-width="110"
          class="mr-5"
        />
      </v-col>
      <v-col cols="8">
        <v-toolbar-title
          >World Aquatics Championships - Fukuoka 2023</v-toolbar-title
        ></v-col
      >
      <v-col cols="3">
        <div class="text-right-container">
          <p>
            <v-img
              src="./src/components/images/Japan.png"
              alt="Logo"
              class="japan-image"
            />
          </p>

          <div class="text-right-content">
            <p class="font-weight-bold">JPN Japan Fukuoka</p>
            <p :style="{ color: '#515151' }">Long Course (50 m)</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.top {
  padding-left: 70px;
  padding-right: 56px;
}

.japan-image {
  height: 16px;
  width: 16px;
  margin-right: 16px;
}

.text-right-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.text-right-content {
  display: flex;
  flex-direction: column;
}

.custom-app-bar {
  box-shadow: none !important;
  border-bottom: 1px solid #e0e2e3 !important;
  padding: 0% !important;
  margin-top: 0px !important;
  background-color: #f5f5f5 !important;
}
</style>
