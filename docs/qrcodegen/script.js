const qrContainer = document.getElementById("qrcode");

function generateQRCode(content, ec, res) {
    qrcodeInstance = new QRCode(qrContainer, {
        text: content,
        width: res,
        height: res,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : ec
    });
}

generateQRCode("https://example.com", QRCode.CorrectLevel.Q, 300);