import fromImage from 'get-pixels';
import toImage from 'save-pixels';

import Matrix from './Matrix';
import cannyFilter from './cannyFilter';
import drawImage from './drawImage';

export default function processImage(image) {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    debugger;
    const matx = new Matrix(fromImage(reader.result));
    const processedMatx = cannyFilter(matx);
    const processedImage = toImage(processedMatx, 'jpg');
    drawImage(processedImage);
    return;
  };
  return;
}

