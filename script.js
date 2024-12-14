document.getElementById('image-upload').addEventListener('change', handleImageUpload);
document.getElementById('compression-ratio').addEventListener('input', updateCompression);
document.getElementById('download-button').addEventListener('click', downloadCompressedImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('original-image');
            img.src = e.target.result;
            document.getElementById('original-size').textContent = `原始大小: ${file.size / 1024} KB`;
            // 初始化压缩图片
            compressImage(img, 50);
        };
        reader.readAsDataURL(file);
    }
}

function updateCompression(event) {
    const ratio = event.target.value;
    const img = document.getElementById('original-image');
    compressImage(img, ratio);
}

function compressImage(img, ratio) {
    // 这里可以使用canvas进行图片压缩
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width * (ratio / 100);
    canvas.height = img.height * (ratio / 100);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const compressedDataUrl = canvas.toDataURL('image/jpeg', ratio / 100);
    const compressedImg = document.getElementById('compressed-image');
    compressedImg.src = compressedDataUrl;
    compressedImg.onload = function() {
        const compressedSize = Math.round(compressedDataUrl.length * (3 / 4) / 1024);
        document.getElementById('compressed-size').textContent = `压缩后大小: ${compressedSize} KB`;
    };
}

function downloadCompressedImage() {
    const link = document.createElement('a');
    link.href = document.getElementById('compressed-image').src;
    link.download = 'compressed-image.jpg';
    link.click();
} 