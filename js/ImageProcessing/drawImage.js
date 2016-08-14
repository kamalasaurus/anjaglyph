export default function drawImage(imgData, width, height) {
  document
    .getElementById('processed-image')
    .getContext('2d')
    .putImageData(imgData, 0, 0, width, height);

  return;
}

