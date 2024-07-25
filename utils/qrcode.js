const QRCode = require('qrcode');

exports.generateQRCode = async (data) => {
  try {
    const url = await QRCode.toDataURL(data, { errorCorrectionLevel: 'Q'});
    return url;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};