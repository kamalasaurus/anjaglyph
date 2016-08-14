import Anjaglyph from './Anjaglyph';
import drawImage from './drawImage';

export default function processImage(file) {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = render.bind(this, reader);
  return;
}

function render(reader) {
  const img = new Image();
  img.onload = extract.bind(this, img);
  img.src = reader.result;
  return;
}

function extract(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const anaglyph = new Anjaglyph(imgData);

  drawImage(anaglyph, imgData.width, imgData.height);
  return;
}

