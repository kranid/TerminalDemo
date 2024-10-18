import { BrailleCell } from "./BrailleCell";
const LineType = {
  Undefined: -1,
  Point: 0,
  VerticalLine: 1,
  HorizontalLine: 2,
  LeftDiagonal: 4,
  RightDiagonal: 6,
};

const codeTable = {
  [new BrailleCell(LineType.Point).code]: 1,
  [new BrailleCell(LineType.VerticalLine).code]: 2,
  [new BrailleCell(LineType.HorizontalLine).code]: 3,
  [new BrailleCell(LineType.RightDiagonal).code]: 5,
  [new BrailleCell(LineType.LeftDiagonal).code]: 9,
  [new BrailleCell(LineType.VerticalLine, LineType.HorizontalLine).code]: 6,
  [new BrailleCell(LineType.VerticalLine, LineType.RightDiagonal).code]: 8,
  [new BrailleCell(LineType.LeftDiagonal, LineType.HorizontalLine).code]: 0,
  [new BrailleCell(LineType.HorizontalLine, LineType.RightDiagonal).code]: 4,
};

export class BrailleDigitRecognizer {
  recognizeDigit(points) {
    if (points.length == 1) {
      return 1;
    }
    if (points.length == 4) {
      /*  */ return 7;
    }
    points.sort((a, b) => this.comporator(a, b));
    const cell = new BrailleCell();
    for (let i = 1; i < points.length; i++) {
      const line = this.identifyLineType(points[0], points[i]);
      cell.addLine(line);
    }
    return codeTable[cell.code];
  }

  identifyLineType(point1, point2) {
    const angle = this.calculateAngle(point1, point2);
    switch (true) {
      case this.isVertical(angle):
        return LineType.VerticalLine;
      case this.isRightDiagonal(angle):
        return LineType.RightDiagonal;
      case this.isLeftDiagonal(angle):
        return LineType.LeftDiagonal;
      case this.isHorizontal(angle):
        return LineType.HorizontalLine;
      default:
        return LineType.Undefined;
    }
  }

  calculateAngle = (point1, point2) =>
    Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);

  isVertical = (angle) => Math.abs(angle) >= 70 && Math.abs(angle) <= 110;

  isHorizontal = (angle) =>
    (Math.abs(angle) >= 0 && Math.abs(angle) <= 20) ||
    (Math.abs(angle) >= 160 && Math.abs(angle) <= 180);

  isRightDiagonal = (angle, direct = 1) => angle > 20 && angle < 70;

  isLeftDiagonal = (angle) => angle > -70 && angle < -20;

  comporator(point1, point2) {
    const angle = this.calculateAngle(point1, point2);
    if (angle < 110 && angle > -70) return -1;
    else return 1;
  }
}
