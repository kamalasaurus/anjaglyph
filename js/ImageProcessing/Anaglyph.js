export default class Anjaglyph {

  constructor(imgData) {
    const width = imgData.width;
    const xOffsets = [-10, 10];

    const compCh = this.channels(imgData.data)
      .map((channel, i) => {
        return this.offsetChannel(channel, xOffsets[i], width);
      })
      .reduce(this.composite, new Uint8ClampedArray(imgData.data));

    return compCh;
  }

  composite(compCh, colorChannel) {
    const colorOffset = ['red', 'green', 'blue', 'alpha'];
    const cOff = colorOffset[colorChannel.channel];
    for (let i = 0; i < compCh.length; i += 4) {
      compCh[i + cOff] += colorChannel[i];
    }
    return compCh;
  }

  offsetChannel(channel, xOffset, width) {
    return channel.map((val, i, array) => {
      const row = Math.floor(i / width);
      const xOff = i + xOffset;

      const valid = [
        this.greaterThanFirstRowPixel,
        this.lessThanLastRowPixel,
      ].every((fn) => {
        return fn.call(this, i, xOff, row, width);
      });

      return valid ? array[xOff] : 0;
    });
  }

  greaterThanFirstRowPixel(index, offset, row, width) {
    return [index, offset].every((pixel) => pixel >= (row * width));
  }

  lessThanLastRowPixel(index, offset, row, width) {
    return [index, offset].every((pixel) => pixel < ((row + 1) * width));
  }

  channels(data) {
    const redCh = new Uint8ClampedArray(data.length / 4);
    redCh.channel = 'red';
    const blueCh = new Uint8ClampedArray(data.length / 4);
    blueCh.channel = 'blue';

    this.iterator(data, (i, r, b) => {
      redCh[i] = r;
      blueCh[i] = b;
    });

    return [redCh, blueCh];
  }

  iterator(data, collector) {
    for (let i = 0; i < data.length; i += 4) {
      collector(i, data[i], data[i + 2]);
    }
    return;
  }

}

