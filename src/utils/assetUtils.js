// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js
export function imagePath(assetName) {
  return `${process.env.PUBLIC_URL}/images/${assetName}`;
}

export function detectMobile() {
  let mobRegex = new RegExp(['/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|',
      'PlayBook|BB10|Opera Mini|\bCrMo|Opera Mobi/i'].join(''));
  if (navigator.userAgent.match(mobRegex)) {
    return true;
  }

  return false;
}

