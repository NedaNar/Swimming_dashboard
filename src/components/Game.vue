<template>
  <v-container class="mainContainer mt-5"
    ><v-row no-gutters
      ><v-col cols="1"></v-col
      ><v-col cols="4" class="textColumn"
        ><v-row no-gutters
          ><p
            class="paragraph"
            :style="{
              'font-size': '28px',
              'font-weight': 'bold',
            }"
          >
            Test your reaction time!
          </p></v-row
        ><v-row no-gutters
          ><p class="paragraph">
            Every swimming race starts the same way: with the sound of a horn.
          </p></v-row
        ><v-row no-gutters
          ><p class="paragraph">
            Did you know that at high-level meets, there is a pad on the block
            that measures how long it takes for a swimmer's feet to leave it?
          </p></v-row
        ><v-row no-gutters
          ><p class="paragraph">
            Studies show that swimmers have an average reaction time of 0.7
            seconds.
          </p></v-row
        ><v-row no-gutters
          ><p :style="{ 'font-weight': 'bold' }">Can you beat that?</p></v-row
        ></v-col
      >

      <v-col cols="5">
        <v-container class="d-flex flex-column background-container">
          <v-container class="soundContainer" v-if="gameState != 'none'"
            ><v-row no-gutters align="center"
              ><v-col cols="1"
                ><v-img
                  src="./src/components/images/sound.png"
                  max-width="24"
                ></v-img></v-col
              ><v-col cols="11"
                ><p
                  :class="{ 'font-weight-bold': gameState === 'start' }"
                  class="ml-2"
                >
                  {{ soundText }}
                </p></v-col
              ></v-row
            ></v-container
          >
          <v-container class="mt-3 warning" v-if="gameState == 'takeYourMark'"
            ><v-row no-gutters align="center"
              ><v-col cols="1"
                ><v-img
                  src="./src/components/images/warning.png"
                  max-width="24"
                ></v-img></v-col
              ><v-col cols="11">
                <v-row no-gutters
                  ><p class="ml-2">
                    Do NOT release the button until you hear a horn.
                  </p></v-row
                >
                <v-row no-gutters>
                  <p class="ml-2 mt-1">
                    Any movement after the official says “take your mark” can be
                    considered a false start.
                  </p></v-row
                ></v-col
              ></v-row
            ></v-container
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="gameState != 'shortWhistles'"
            @click="nextStep"
            @mousedown="startTimer"
            prepend-icon="mdi-play"
            class="mainButton"
            ><template v-slot:prepend>
              <v-icon
                v-if="gameState == 'none'"
                color="white"
                class="play"
              ></v-icon> </template
            >{{ buttonText }}</v-btn
          >

          <v-overlay
            v-model="dialog"
            contained
            class="align-center justify-center"
          >
            <v-card class="dialog align-center justify-center">
              <v-card-title class="d-flex justify-end close">
                <v-img
                  :style="{ margin: auto }"
                  @click="dialog = false"
                  max-width="20"
                  src="./src/components/images/close.png"
                ></v-img>
              </v-card-title>
              <div style="text-align: center">
                <v-img
                  :src="dialogContent.imageSrc"
                  :max-width="dialogContent.width"
                  :style="{ margin: 'auto' }"
                  class="mb-4"
                ></v-img>
                <p class="dialogTitle">{{ dialogContent.title }}</p>
                <p>{{ dialogContent.paragraph }}</p>
              </div>
            </v-card>
          </v-overlay>
        </v-container></v-col
      ><v-col cols="2"></v-col></v-row
  ></v-container>
</template>

<script>
export default {
  data() {
    return {
      buttonText: "Start",
      soundText: "",
      gameState: "none",
      startTime: 0,
      elapsedTime: 0,
      hasStarted: false,
      dialog: false,
      dialogContent: {
        title: "",
        imageSrc: "",
        width: "",
        paragraph: "",
      },
      timerId: null,
    };
  },
  methods: {
    nextStep() {
      if (this.gameState == "none") {
        this.setLongWhistleState();
        return;
      }

      if (this.gameState == "longWhistle") {
        this.setTakeYourMarkState();
        return;
      }

      if (this.gameState == "takeYourMark" && this.hasStarted) {
        this.disqualify();
        return;
      }

      if (this.gameState == "start") {
        this.win();
      }
    },
    startTimer() {
      if (this.gameState != "takeYourMark") return;
      this.hasStarted = true;

      this.timerId = setTimeout(() => {
        this.startTime = Date.now();
        this.soundText = "*Horn*";
        this.gameState = "start";
      }, 1500);
    },
    setLongWhistleState() {
      this.soundText = "*Short whistles*";
      this.gameState = "shortWhistles";

      setTimeout(() => {
        this.soundText = "*Long whistle*";
        this.buttonText = "Get onto the block";
        this.gameState = "longWhistle";
      }, 1500);
    },
    setTakeYourMarkState() {
      this.soundText = "Take your mark!";
      this.buttonText = "Hold start position";
      this.gameState = "takeYourMark";
    },
    disqualify() {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

      this.openOverlay({
        title: "You were disqualified!",
        imageSrc: "./src/components/images/dsq.png",
        width: "128px",
        paragraph: "Don’t worry, you can always try again.",
      });
    },
    win() {
      this.elapsedTime = Date.now() - this.startTime;

      let paragraph;
      if (this.elapsedTime < 600)
        paragraph = "Good job! Your result is way better than average.";
      else if (this.elapsedTime >= 600 && this.elapsedTime <= 700)
        paragraph = "Nice! You have an average reaction time";
      else paragraph = "Your reaction is not your biggest strength :)";

      this.openOverlay({
        title: `Your reaction time - ${this.formatElapsedTime(
          this.elapsedTime
        )} s`,
        imageSrc: "./src/components/images/goblet.png",
        width: "86px",
        paragraph: paragraph,
      });
    },
    openOverlay(content) {
      this.gameState = "none";
      this.buttonText = "Start";

      this.dialogContent = content;
      this.dialog = true;
    },
    formatElapsedTime(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let remainingMilliseconds = Math.ceil((milliseconds % 1000) / 10);

      return `${seconds}.${remainingMilliseconds}`;
    },
  },
};
</script>

<style>
.close {
  margin: 0px !important;
}
.dialog {
  border-radius: 16px !important;
  background-color: #f5f5f5 !important;
  padding: 24px !important;
  max-width: 400px;
}
.dialogTitle {
  font-weight: bold;
  font-size: 24px;
}
.warning {
  background-color: #ffebf1;
  border-radius: 8px;
}
.soundContainer {
  border-radius: 8px;
  background-color: #f5f5f5;
  font-size: 20px !important;
  padding: 12px 16px !important;
}
.play {
  max-width: 24px;
}
.mainButton {
  border-radius: 32px !important;
  height: 54px !important;
  background-color: #004c72 !important;
  color: white !important;
  font-family: "Amiko" !important;
  font-size: 16px !important;
  font-weight: bold !important;
  padding: 12px 32px !important;
  text-transform: none !important;
  box-shadow: none !important;
}
.paragraph {
  margin-bottom: 16px;
}
.background-container {
  min-height: 328px;
  background-image: url("./src/components/images/bg.png");
  height: 100%;
  border-radius: 16px;
  align-items: center;
  padding: 24px 24px 16px 24px !important;
  position: relative;
}

.v-dialog__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.overlay-div {
  padding: 20px;
  border-radius: 8px;
  margin: 20px;
}

.textColumn {
  padding-right: 56px !important;
}
</style>
