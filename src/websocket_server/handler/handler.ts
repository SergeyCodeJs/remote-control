import * as nut from '@nut-tree/nut-js';
import { Duplex } from 'stream';

class Handler {
  constructor() {

  }

  async mouseUp(numberOfPixels: number, stream: Duplex) {
    const { mouse, up } = nut;
    await mouse.move(up(numberOfPixels));
    stream.write(`Moved ${numberOfPixels} pixels up`)
    console.log(`Moved ${numberOfPixels} pixels up`);
    return;
  }

  async mouseDown(numberOfPixels: number, stream: Duplex) {
    const { mouse, down } = nut;
    await mouse.move(down(numberOfPixels));
    stream.write(`Moved ${numberOfPixels} pixels down`)
    console.log(`Moved ${numberOfPixels} pixels down`);
    return;
  }

  async mouseRight(numberOfPixels: number, stream: Duplex) {
    const { mouse, right } = nut;
    await mouse.move(right(numberOfPixels));
    stream.write(`Moved ${numberOfPixels} pixels right`)
    console.log(`Moved ${numberOfPixels} pixels right`);
    return;
  }

  async mouseLeft(numberOfPixels: number, stream: Duplex) {
    const { mouse, left } = nut;
    await mouse.move(left(numberOfPixels));
    stream.write(`Moved ${numberOfPixels} pixels left`);
    console.log(`Moved ${numberOfPixels} pixels left`);
    return;
  }

  async mousePosition(_: number, stream: Duplex) {
    const { mouse } = nut;
    const position = await mouse.getPosition();
    stream.write(`Mouse position is x: ${position.x}, y: ${position.y}`);
    console.log(`Mouse position is x: ${position.x}, y: ${position.y}`);
    return;
  }

  async drawCircle(radius: number, stream: Duplex) {
  const { mouse, Button, straightTo, Point } = nut;
  const center = await mouse.getPosition();
  const speed = 0.01;

  await mouse.pressButton(Button.LEFT);

  for (let i = 0; i <= 2 * Math.PI; i += speed * Math.PI) {
    const moveX = center.x + radius - radius * Math.cos(i);
    const moveY = center.y - radius * Math.sin(i);
    await mouse.move(straightTo(new Point(moveX, moveY)));
  }

  await mouse.releaseButton(Button.LEFT);
  stream.write('Draw circle');
  console.log('Draw circle');
  return;
  }

  async drawSquare(width: number, stream: Duplex) {
    const { mouse, Button, right, down, left, up } = nut;
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(width));
    await mouse.move(down(width));
    await mouse.move(left(width));
    await mouse.move(up(width));
    await mouse.releaseButton(Button.LEFT);
    stream.write(`Draw square`);
    console.log(`Draw square`);
    return
  }

  async drawRectangle(width: number, stream: Duplex, args: any) {
    const { mouse, Button, right, down, left, up } = nut;
    const height = +args[1];
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(width));
    await mouse.move(down(height));
    await mouse.move(left(width));
    await mouse.move(up(height));
    await mouse.releaseButton(Button.LEFT);
    stream.write(`Draw rectangle`);
    console.log(`Draw rectangle`);
    return
  }

  printScreen() {
    console.log('print screen');
  }
}

const handler = new Handler();

export { handler }