import * as nut from '@nut-tree/nut-js';

class Handler {
  constructor() {

  }

  async mouseUp(numberOfPixels: number) {
    const { mouse, up } = nut;
    await mouse.move(up(numberOfPixels));
    console.log(`Moved ${numberOfPixels} pixels up`);
    return;
  }

  async mouseDown(numberOfPixels: number) {
    const { mouse, down } = nut;
    await mouse.move(down(numberOfPixels));
    console.log(`Moved ${numberOfPixels} pixels down`);
    return;
  }

  async mouseRight(numberOfPixels: number) {
    const { mouse, right } = nut;
    await mouse.move(right(numberOfPixels));
    console.log(`Moved ${numberOfPixels} pixels right`);
    return;
  }

  async mouseLeft(numberOfPixels: number) {
    const { mouse, left } = nut;
    await mouse.move(left(numberOfPixels));
    console.log(`Moved ${numberOfPixels} pixels left`);
    return;
  }

  mousePosition() {
    console.log('mouse position');
  }

  drawCircle() {
    console.log('draw circle');
  }

  drawSquare() {
    console.log('draw square');
  }

  drawRectangle() {
    console.log('draw rectangle');
  }

  printScreen() {
    console.log('print screen');
  }
}

const handler = new Handler();

export { handler }