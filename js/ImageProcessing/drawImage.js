export default function drawImage(imgArray, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(width, height);
  imgArray.forEach((val, i) => {
    imgData.data[i] = val;
    return;
  });
  ctx.putImageData(imgData, 0, 0);
  document
    .getElementById('processed-image')
    .appendChild(canvas);
  return;
}

