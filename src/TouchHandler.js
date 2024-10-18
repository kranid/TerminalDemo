import { BrailleDigitRecognizer } from "./brailleDigitRecognizer";
export class TouchHandler {
  constructor(player, resultElement) {
    this.resultElement = resultElement;
    this.player = player;
    this._errorMessage ="Ошибка! Не удалось распознать комбинацию точек.";
    this._period = 1000;
    this._points = [];
  }

  Handle(event) {
    event.preventDefault();
    this.resetTimer();
    this.player.PlayTouch();
    const point = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    this._points.push(point);
    this._timerId = this.startTimer();
  }

  startTimer = () => setTimeout(() => this.convertPoints(), this._period);

  resetTimer = () => clearTimeout(this._timerId);

  convertPoints() {
    const digitRecognizer = new BrailleDigitRecognizer();
    const myPoints =[
    {x:0, y:1},
    {x:1,y:0},
    {x: 0,y:0}    
    ];
    const digit = digitRecognizer.recognizeDigit(this._points);
    if (digit < 0 || digit === undefined) {
      this.player.PlayError();
      this.showResult(this._errorMessage);
    } else {
      this.player.PlaySuccess(digit);
      this.showResult(digit);
    }
    this._points = [];
  }

  showResult(message) {
    this.resultElement.innerText = message;
  }
}
