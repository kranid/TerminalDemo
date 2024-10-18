import { Howl, Howler } from "howler";
export class Player {
  constructor(speechEnabled) {
    this._speechEnabled =speechEnabled;
    this.touch = new Howl({
      src: ["sounds/touch.mp3"],
    });

    this.success = new Howl({
      src: ["sounds/success.mp3"],
    });
    this.error = new Howl({
      src: ["sounds/error.mp3"],
    });
    this._synth = window.speechSynthesis;
    this.lang = "ru-RU";
    this._synth.onvoiceschanged = () =>
      this._setVoice();


  }

  PlayTouch() {
    this.touch.play();
  }

  PlaySuccess(digit) {
    if (this._speechEnabled && digit != undefined) {
      this.SayMessage(digit)
    } else {
      this.success.play();
    }
  }

  PlayError() {
    this.error.play();
  }

  SayMessage(message) {
if (!this._speechEnabled)
return
    const utter = new SpeechSynthesisUtterance(message);
    utter.voice = this.voice;
    utter.lang = this.lang
    this._synth.speak(utter)
  }

  _setVoice() {
    const voices = this._synth.getVoices();
    this.voice = voices.find(v => v.lang.startsWith("ru"));
    console.log(`Number of voices: ${voices.length}`);
    if (this.voice) {
      console.log(`Selected voice: ${this.voice.name}`);

    } else {
      console.log(`Voice for language ${this.lang} not found`);
    }
  }
}