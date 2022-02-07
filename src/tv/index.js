'use strict';

let lambda;

go();

function go() {
  try { Rollbar.configure({ enabled: false }) } catch (e) { /**/ }

  try {
    initLambdaCredentials();
    lambda = new AWS.Lambda({
      region: 'us-east-1',
      apiVersion: '2015-03-31'
    });
  } catch (error) {
    console.error(`go(): not loading aws credentials: ${error}`);
  }

  const urlParams = loadURLParameters();
  window.addEventListener('resize', onResize);
  onResize();

  if (urlParams.gameid) {
    watchMovie(urlParams.gameid);
  } else {
    let introNode = `<h3>LarnTV: Select a game to watch below</h3>`;
    document.getElementById(`TV_LARN`).innerHTML = introNode;
    document.getElementById(`LARN_LIST`).innerHTML = `(loading)`;

    downloadRecordings(displayRecordings, MIN_FRAMES_TO_LIST);
  }
}



// copied & adapted from display.js
function onResize() {
  const testfont = `12px modern`;
  const testtext = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  const isBoldWider = getTextWidth(testtext, testfont, true) != getTextWidth(testtext, testfont, false);

  let canApplyStyle = style && !isBoldWider;

  let widthMultiple = 1.66;
  let fontFamily = `Courier New`;
  let spriteWidth = computeSpriteWidth();
  if (canApplyStyle) {
    widthMultiple = style.widthMultiple;
    fontFamily = style.fontFamily;
    document.body.style.letterSpacing = style.letterSpacing;
  }
  let fontSize = spriteWidth * widthMultiple;
  let font = `${fontSize}px ${fontFamily}`;
  document.body.style.font = font;

  // do this last for some reason
  if (canApplyStyle) document.body.style.lineHeight = `${spriteWidth * style.heightMultiple}px`;
}



// copied & adapted from display.js
function computeSpriteWidth() {
  let browserWidth = window.innerWidth;
  let browserHeight = window.innerHeight;

  let rawSpriteW = (browserWidth - 1) / (80 + 39);
  let rawSpriteH = (browserHeight - 100) / 24;

  let spriteWidth = Math.min(rawSpriteW, rawSpriteH / 2);
  spriteWidth *= 10;
  spriteWidth = Math.floor(spriteWidth);
  spriteWidth /= 10;
  spriteWidth = Math.max(3, spriteWidth);

  return spriteWidth;
}