export default class Anjaglyph {

  constructor(imgData) {
    const width = imgData.width;
    const xOffsets = [-50, 50];

    const compCh = this.channels(imgData.data)
      .map((channel, i) => {
        return this.offsetChannel(channel, xOffsets[i], width);
      })
      .reduce(this.composite, new Uint8ClampedArray(imgData.data));

    return compCh;
  }

  composite(compCh, colorChannel) {
    const colorOffset = ['red', 'green', 'blue', 'alpha'];
    const cOff = colorOffset.indexOf(colorChannel.channel);

    for (let i = 0; i < colorChannel.length; i += 1) {
      compCh[(i * 4) + cOff] += colorChannel[i];
    }

    return compCh;
  }

  offsetChannel(channel, xOffset, width) {
    const offChan = channel.map((val, idx, array) => {
      const row = Math.floor(idx / width);
      const xOff = idx + xOffset;

      const valid = [
        this.greaterThanFirstRowPixel,
        this.lessThanLastRowPixel,
      ].every((fn) => {
        return fn.call(this, idx, xOff, row, width);
      });

      return valid ? array[xOff] : 0;
    });
    offChan.channel = channel.channel;
    return offChan;
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

    // need to track index separately because we've made the channel
    // Buffers 1/4 the length, and the iterator index would correspond
    // to 4x the index otherwise
    let idx = 0;

    this.iterator(data, idx, (i, r, b) => {
      redCh[i] = r;
      blueCh[i] = b;
    });

    return [redCh, blueCh];
  }

  iterator(data, idx, collector) {
    for (let i = 0; i < data.length; i += 4) {
      collector(idx, data[i], data[i + 2]);
      idx += 1;
    }
    return;
  }

}

