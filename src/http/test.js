export default class Polygon {
  constructor(x, y) {
    this.height = x
    this.width = y
  }

  static calcArea(x, y) {
    return x + y
  }
}
