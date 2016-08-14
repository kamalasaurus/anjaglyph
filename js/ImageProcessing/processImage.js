import Anjaglyph from './Anjaglyph';
import drawImage from './drawImage';

function extract(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const anaglyph = new Anjaglyph(imgData);

  drawImage(anaglyph, img.width, img.height);
  return;
}

function render(reader) {
  const img = new Image();
  img.onload = extract.bind(this, img);
  img.src = reader.result;
  return;
}

export default function processImage(file) {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = render.bind(this, reader);
  return;
}

