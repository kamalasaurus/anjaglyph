import Anjaglypn from './Anjaglyph';
import drawImage from './drawImage';

export default function(img, canvas) {
  const inputCanvas = document.createElement('canvas');
  inputCanvas.width = img.width;
  inputCanvas.height = img.height;
  inputCanvas.style.marginTop = `-${img.height}px`;

  document
    .getElementById('processed-image')
    .appendChild(canvas);

  document
    .getElementById('processed-image')
    .appendChild(inputCanvas);
}

