export default function drawCanvas(imageURL) {
  const img = new Image();
  img.onload = () => {
    document
      .getElementById('processed-image')
      .appendChild(img);
  };
  img.src = imageURL;
}

