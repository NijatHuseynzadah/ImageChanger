document.addEventListener('DOMContentLoaded', function () {
    const uploadInput = document.getElementById('uploadInput');
    const imageContainer = document.getElementById('imageContainer');

    uploadInput.addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const newImage = document.createElement('img');
        newImage.src = imageUrl;
        newImage.alt = 'New Image';

        const flipButton = document.createElement('button');
        flipButton.className = 'flipButton';
        flipButton.textContent = 'Перевернуть';
        flipButton.addEventListener('click', function () {
          newImage.classList.toggle('flipped');
        });

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'imageWrapper';
        imageWrapper.appendChild(newImage);
        imageWrapper.appendChild(flipButton);
        imageContainer.appendChild(imageWrapper);
      }
    });
  });

  function downloadImages() {
    const images = document.querySelectorAll('#imageContainer img');
    images.forEach((image, index) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (image.classList.contains('flipped')) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }

      context.drawImage(image, 0, 0);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `image${index + 1}.png`;
      link.click();
    });
  }