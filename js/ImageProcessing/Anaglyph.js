export default class Anjaglyph {

  constructor(imgData) {
    let compCh = new Uint8ClampedArray(imgData.data);

    const width = imgData.width;

    // need to have a nested array of offsets by plane
    // realistically, will have two planes, flat bg and
    // a foreground that is drawn in b/w and offset
    const xOffsets = [ -10, 10 ];

    const [ redCh, blueCh ] = this.channels(imgData);

    [ redCh, blueCh ]
      .map((channel, i) => {
        return this.offsetChannel(channel, xOffsets[i], width);
      })
      .forEach((channel) => this.composite(compCh, channel));

    return compCh;
  }

  composite(compCh, colorChannel) {
    loop: for (let i = 0; i < compCh.length; i += 4) {
      channelType: switch (colorChannel.channel) {
        case 'red':
          compCh[i] += colorChannel[i];
          break channelType;
        case 'blue':
          compCh[i + 2] += colorChannel[i];
          break channelType;
        default:
          break channelType;
      }
    }
    return;
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
    return [ index, offset ].every((pixel) => pixel >= (row * width));
  }

  lessThanLastRowPixel(index, offset, row, width) {
    return [ index, offset ].every((pixel) => pixel < ((row + 1) * width));
  }

  channels(imgData) {
    let redCh = new Uint8ClampedArray(imgData.data.length / 4);
        redCh['channel'] = 'red';
    let blueCh = new Uint8ClampedArray(imgData.data.length / 4);
        blucCh['channel'] = 'blue';

    this.iterator(imgData, (i, r, g, b, a) => {
      redCh[i] = r;
      blueCh[i] = b;
    });

    return [ redCh, blueCh ];
  }

  iterator(imgData, collector) {
    for (let i = 0; i < imgData.data.length; i += 4){
      collector(i, imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]);
    }
    return;
  }

}

