export const ARROW_DOWN = 40;
export const ARROW_UP = 38;
export const BACKSPACE = 8;
export const COMMA = 188;
export const DEAD_KEY = 229;
export const DELETE = 8;
export const ENTER = 13;
export const ESC = 27;
export const SPACEBAR = 32;
export const TAB = 9;
export const V = 86;
export const C = 67;
export const A = 65;

export function isCommandKey (e, params) {
  // e.metaKey  /* ? */
  // e.ctrlKey  /* ctrl+? */
  // e.altKey   /* alt+? */
  // e.shiftKey /* shift+? */
  const commandKeys = [
    8, /* backspace */
    9, /* tab */
    13, /* enter */
    16, /* shift */
    17, /* ctrl */
    18, /* alt */
    20, /* caps lock */
    27, /* esc */
    33, /* page up */
    34, /* page down */
    35, /* end */
    36, /* home */
    37, /* left arrow */
    38, /* up arrow */
    39, /* right arrow */
    40, /* down arrow */
    45, /* insert */
    46, /* delete */
    112, /* F1 */
    113, /* F2 */
    114, /* F3 */
    115, /* F4 */
    116, /* F5 */
    117, /* F6 */
    118, /* F7 */
    119, /* F8 */
    120, /* F9 */
    121, /* F10 */
    122, /* F11 */
    123];
  if (params && params.exceptKeys) {
    const exceptKeysLength = params.exceptKeys.length;
    for (let i = 0; i < exceptKeysLength; i++) {
      commandKeys.splice(commandKeys.indexOf(params.exceptKeys[i]), 1);
    }
  }
  // http://stackoverflow.com/questions/1444477/keycode-and-charcode  e.keyCode, e.charCode, e.which
  // não colocar as propriedades especiais aqui (metaKey, ctrlKey, ...), estas testar diretamente
  return commandKeys.indexOf(e.keyCode) > -1;
}
