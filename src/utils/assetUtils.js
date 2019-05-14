import { isServer } from "./utilities";

// We can use "process.env.VAR_NAME" on both the server and the client.
// See config/env.js and server/indexHtml.js
export function imagePath(assetName) {
  return `https://d2ac09n5vmchb0.cloudfront.net/react-app/images/${assetName}`;
}

export function detectMobile() {
  let mobRegex = new RegExp(['/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|',
      'PlayBook|BB10|Opera Mini|\bCrMo|Opera Mobi/i'].join(''));
  if (!isServer && navigator.userAgent.match(mobRegex)) {
    return true;
  }

  return false;
}

