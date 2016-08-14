import processImage from './ImageProcessing/processImage';

function submitFile(event) {
  const fileList = document
    .getElementById('file-input')
    .files;

  if (fileList.length > 0) {
    processImage(fileList[0]);
  }

  event.stopPropagation();
  return false;
}

void function init() {
  document
    .getElementById('submit')
    .addEventListener('click', submitFile);
}();

