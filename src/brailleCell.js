export class BrailleCell {
  constructor(...lines) {
    this.placeCounter = 1;
    this.code = 0;

    for (let line of lines) {
      this.addLine(line);
    }
  }

  addLine(line) {
    this.code += this.placeCounter * line;
    this.placeCounter *= 10;
  }
}
