<template>
  <v-container class="mainContainer mt-5">
    <audio id="shortAudio" src="./src/components/sounds/short.mp3"></audio>
    <audio id="longAudio" src="./src/components/sounds/long.mp3"></audio>
    <audio id="marksAudio" src="./src/components/sounds/marks.mp3"></audio>
    <audio id="hornAudio" src="./src/components/sounds/horn.mp3"></audio>

    <v-row no-gutters
      ><v-col
        :cols="!isSmallScreen ? auto : 12"
        :class="{ 'pr-5': !isSmallScreen }"
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
            Every swimming race starts the same way - with the sound of a horn.
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

      <v-col :cols="!isSmallScreen ? auto : 12">
        <v-container class="d-flex flex-column background-container">
          <v-container class="soundContainer"
            ><v-row no-gutters align="center"
              ><v-col cols="auto"
                ><v-img
                  :src="
                    gameState == 'none'
                      ? './src/components/images/sound.png'
                      : './src/components/images/wave.png'
                  "
                  width="20"
                  class="mr-3"
                ></v-img></v-col
              ><v-col cols="auto"
                ><p
                  :class="{
                    'font-weight-bold': gameState == 'start',
                  }"
                  style="font-size: 14px"
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
                <p class="ml-2">
                  <span style="font-weight: bold"
                    >Hold the button until you hear the horn.</span
                  >
                  <br />
                  Any movement after this signal can be considered a false
                  start.
                </p></v-col
              ></v-row
            ></v-container
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="gameState != 'shortWhistles'"
            @click="nextStep"
            @mousedown="startTimer"
            class="mainButton"
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
                  class="mb-2"
                ></v-img>
                <p class="dialogTitle">{{ dialogContent.title }}</p>
                <p>{{ dialogContent.paragraph }}</p>
              </div>
            </v-card>
          </v-overlay>
        </v-container></v-col
      ></v-row
    ></v-container
  >
</template>

<script>
export default {
  props: {
    isSmallScreen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonText: "Start",
      soundText: "Sound ON for optimal experience",
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
        this.playAudio("hornAudio");
        setTimeout(() => {
          this.soundText = "Horn";
          this.gameState = "start";
        }, 200);
      }, 2500);
    },
    setLongWhistleState() {
      this.playAudio("shortAudio");
      this.soundText = "Short whistles";
      this.gameState = "shortWhistles";

      setTimeout(() => {
        this.playAudio("longAudio");
        this.soundText = "Long whistle";
        this.buttonText = "Get onto the block";
        this.gameState = "longWhistle";
      }, 2000);
    },
    setTakeYourMarkState() {
      this.playAudio("marksAudio");
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
        width: "240px",
        paragraph: "Don’t worry, you can always try again.",
      });
    },
    win() {
      this.elapsedTime = Date.now() - this.startTime;

      let paragraph;
      if (this.elapsedTime < 600)
        paragraph = "Wow! Your reaction time is amazing!";
      else if (this.elapsedTime >= 600 && this.elapsedTime <= 700)
        paragraph = "Nice! You have an average reaction time";
      else paragraph = "Good job, but there's always room for improvement!";

      this.openOverlay({
        title: `Reaction time - ${this.formatElapsedTime(this.elapsedTime)} s`,
        imageSrc: "./src/components/images/win.png",
        width: "240px",
        paragraph: paragraph,
      });
    },
    openOverlay(content) {
      this.gameState = "none";
      this.soundText = "Sound ON for optimal experience";
      this.buttonText = "Start";

      this.dialogContent = content;
      this.dialog = true;
    },
    formatElapsedTime(milliseconds) {
      let seconds = Math.floor(milliseconds / 1000);
      let remainingMilliseconds = Math.ceil((milliseconds % 1000) / 10);

      return `${seconds}.${remainingMilliseconds}`;
    },
    playAudio(name) {
      var audioElement = document.getElementById(name);
      audioElement.play();
    },
  },
};
</script>

<style>
.mainContainer {
  width: 1000px !important;
}
.close {
  margin: 0px !important;
}
.dialog {
  border-radius: 16px !important;
  background-color: #f5f5f5 !important;
  padding: 16px 36px !important;
  max-width: 480px;
}
.dialogTitle {
  font-weight: bold;
  font-size: 24px;
}
.warning {
  background-color: rgba(245, 245, 245, 0.9);
  border-radius: 4px;
}
.soundContainer {
  border-radius: 4px;
  background-color: rgba(245, 245, 245, 0.9);
  font-size: 16px !important;
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
  min-width: 200px !important;
}
.paragraph {
  margin-bottom: 16px;
}
.background-container {
  width: 480px !important;
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
</style>
