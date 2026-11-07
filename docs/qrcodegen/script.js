const qrContainer = document.getElementById('qrcode');

const contentE = document.getElementById('content');
const resE = document.getElementById('res');
const ecE = document.getElementById('ec');
const lightE = document.getElementById('light');
const darkE = document.getElementById('dark');

function generateCode() {

    qrContainer.replaceChildren();

    qrcodeInstance = new QRCode(qrContainer, {
        text: contentE.value,
        width: resE.value,
        height: resE.value,
        colorDark : darkE.value,
        colorLight : lightE.value,
        correctLevel : parseInt(ecE.value)
    });
}