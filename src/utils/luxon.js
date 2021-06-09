import {DateTime, Info, Settings} from 'luxon';

Settings.defaultLocale = 'pt-BR';
// Settings.defaultZoneName = 'America/Sao_Paulo'; // Isso, nem faz sentido, tem que deixar acontecer automáticamente

const jsDate = new Date();
export const CURRENT_YEAR = jsDate.getFullYear();
export const MAX_VALID_YEAR = CURRENT_YEAR + 40;
export const MIN_VALID_YEAR = 1800;

export const MILLIS_IN_MINUTE = 60000;
export const MIN_VALID_MILLIS = 210946500000; // 1976-09-07 09:15:00 aleatório, basicamente pra identificar que veio um Date.now() de parâmetro

export function parseStringLuxon (value) {
  if (!value) return DateTime.fromJSDate(undefined); // Luxon inválido
  if (typeof value !== 'string') return DateTime.fromJSDate(undefined); // Luxon inválido
  if (!isNaN(value)) return DateTime.fromJSDate(undefined); // Luxon inválido não considerar número-string
  if (value === '24:00') return DateTime.fromJSDate(undefined); // Luxon inválido 24:00 é uma hora válida do dia seguinte, não considerar
  if (value.indexOf(' 24:00') !== -1) return DateTime.fromJSDate(undefined); // Luxon inválido 24:00 é uma hora válida do dia seguinte, não considerar) return DateTime.fromJSDate(undefined); // Luxon inválido 24:00 é uma hora válida do dia seguinte, não considerar. precisa do espaço por que é possível 23:24:00
  // Quando a data é anterior a 1914-01-01, o Postgres armazena o timezone diferente, incluindo com minutos e segundos
  // Não parece ter algo haver com o postgres, mas com o timezone, se usarmos o DateTime.DATETIME_SHORT_WITH_SECONDS
  // para formatar uma data antes de 1914, vai formatar com 28 segundos a menos ex: 31/12/1913 00:00:00 vira 30/12/1913 23:59:32
  // Exemplos:
  // 1914-01-01 12:00:00-03 salva como 1914-01-01 12:00:00-03
  // 1913-12-31 12:00:00-03 salva como 1913-12-31 11:53:32-03:06:28 (timezonado com 6min e 28s a menos)
  // O luxon não aceita o formato com segundos, então testamos o tamanho da string
  // Caso o timezone contenha minutos e segundos, corta os segundos fora
  // const resolvedValue = value.length === 28 ? value.substr(0, 25) : value;
  const resolvedValue = value.length === 28 ? value.substr(0, 25) : value;
  let valueLuxon = DateTime.fromISO(resolvedValue);
  if (!valueLuxon.isValid) {
    valueLuxon = DateTime.fromSQL(resolvedValue);
    if (!valueLuxon.isValid) {
      const formats = [
        'dd/MM/yyyy',
        'dd/MM/yyyy HH:mm',
        'dd/MM/yyyy HH:mm:ss',
      ];
      for (let i = 0; i < formats.length; i++) {
        const customValueLuxon = DateTime.fromFormat(resolvedValue, formats[i]);
        if (customValueLuxon.isValid) {
          valueLuxon = customValueLuxon;
          break;
        }
      }
    }
  }
  return valueLuxon; // Sempre retorna um objeto luxon que pode ser inválido
}

/**
 * @param {String|Number|Date|DateTime} value
 * @param {Number} minValidMillis para durantions não da pra usar o MIN_VALID_MILLIS, precisa ser 0
 * @returns {DateTime}
 */
export function parseAnyLuxon (value, minValidMillis = MIN_VALID_MILLIS) {
  // undefined, null, ''
  if (!value) return DateTime.fromJSDate(undefined); // Luxon inválido
  let valueLuxon;
  if (value instanceof DateTime) {
    valueLuxon = value;
  } else if (typeof value === 'number' && value >= minValidMillis) {
    valueLuxon = DateTime.fromMillis(value);
  } else if (value instanceof Date) {
    valueLuxon = DateTime.fromJSDate(value);
  } else {
    valueLuxon = parseStringLuxon(value);
  }
  return valueLuxon;
}

/**
 * https://moment.github.io/luxon/docs/manual/parsing.html
 * https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html#static-method-fromSQL
 *
 * @param {String|Number|Date|DateTime} value
 * @param {{
 *  year: Number|undefined,
 *  minute: Number|undefined,
 *  second: Number|undefined,
 *  hour: Number|undefined,
 *  day: Number|undefined,
 *  month: Number|undefined,
 *  weekday: Number|undefined
 * }} adjustments
 * @returns {DateTime}
 */
export function parseLuxon (value, adjustments = undefined) {
  const valueLuxon = parseAnyLuxon(value);
  if (valueLuxon.isValid) {
    return adjustments ? valueLuxon.set(adjustments) : valueLuxon;
  } else {
    // console.warn('parseLuxon() parâmetro value inexistente ou inválido', value);
    return null;
  }
}

export function parseHourLuxon (value) {
  if (typeof value !== 'string') return DateTime.fromJSDate(undefined); // Luxon inválido
  if (value === '24:00') return DateTime.fromJSDate(undefined); // Luxon inválido 24:00 é uma hora valida do dia seguinte, não considerar
  return DateTime.fromFormat(value, 'HH:mm');
}

export function parseDateLuxon (value) {
  if (typeof value !== 'string') return DateTime.fromJSDate(undefined); // Luxon inválido
  return DateTime.fromFormat(value, 'dd/MM/yyyy');
}

export function parseDateHourLuxon (value) {
  if (typeof value !== 'string') return DateTime.fromJSDate(undefined); // Luxon inválido
  if (value.indexOf('24:00') !== -1) return DateTime.fromJSDate(undefined); // Luxon inválido 24:00 é uma hora válida do dia seguinte, não considerar
  return DateTime.fromFormat(value, 'dd/MM/yyyy HH:mm');
}

/**
 * https://moment.github.io/luxon/docs/manual/formatting.html
 *
 * @param {String|Object} mask
 * @param {String|Number|Date|DateTime} value
 * @returns {String}
 */
export function format (mask, value) {
  if (!value) return value;
  const valueLuxon = parseAnyLuxon(value); // Para formatar não precisa se preocupar com o warning de data inválida
  // if (!valueLuxon.isValid) return typeof value === 'string' ? value : null;
  if (!valueLuxon.isValid) return null;
  return typeof mask === 'object' ? valueLuxon.toLocaleString(mask) : valueLuxon.toFormat(mask);
}

export function addDays (value, amount) {
  return parseLuxon(value).plus({days: amount});
}

export function addMinutes (value, amount) {
  return parseLuxon(value).plus({minutes: amount});
}

export function addMonths (value, amount) {
  return parseLuxon(value).plus({months: amount});
}

export function addWeeks (value, amount) {
  return parseLuxon(value).plus({weeks: amount});
}

export function addYears (value, amount) {
  return parseLuxon(value).plus({years: amount});
}

export function endOfDay (value) {
  return parseLuxon(value).endOf('day');
}

export function endOfMonth (value) {
  return parseLuxon(value).endOf('month');
}

export function endOfWeek (value) {
  return parseLuxon(value).endOf('week'); // Término da semana, domingo
}

export function formatDate (value) {
  return value ? format(DateTime.DATE_SHORT, value) : value;
}

export function formatDateHour (value) {
  return format(DateTime.DATETIME_SHORT, value);
}

export function formatDbDate (value) {
  // ISO 8601 format
  return format('yyyy-MM-dd', value);
}

export function formatDbDateHour (value) {
  // ISO 8601 format
  return format('yyyy-MM-dd HH:mm', value);
}

export function formatDbTimestamp (value) {
  // ISO 8601 format
  return format('yyyy-MM-dd HH:mm:ss', value);
}

export function formatHour (value) {
  return format(DateTime.TIME_24_SIMPLE, value);
}

/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getDayOfMonth (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.day : null;
}

// noinspection JSUnusedGlobalSymbols
/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getDayOfWeek (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.weekday : null; // 1 seg, 2 ter, 3 qua, 4 qui, 5 sex, 6 sab, 7 dom
}

/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getDayOfYear (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.ordinal : null;
}

/**
 * @param {String|Number|Date|DateTime} initValue
 * @param {String|Number|Date|DateTime} endValue
 * @returns {Number}
 */
export function getDiffInHours (initValue, endValue) {
  const luxonDuration = getLuxonDuration(initValue, endValue);
  return getDurationAsHours(luxonDuration);
}

/**
 * @param {String|Number|Date|DateTime} initValue
 * @param {String|Number|Date|DateTime} endValue
 * @returns {Number}
 */
export function getDiffInMillis (initValue, endValue) {
  const luxonDuration = getLuxonDuration(initValue, endValue);
  return getDurationAsMillis(luxonDuration);
}

/**
 * @param {String|Number|Date|DateTime} initValue
 * @param {String|Number|Date|DateTime} endValue
 * @returns {Number}
 */
export function getDiffInMinutes (initValue, endValue) {
  const luxonDuration = getLuxonDuration(initValue, endValue);
  return getDurationAsMinutes(luxonDuration);
}

/**
 * @param {String|Number|Date|DateTime} initValue
 * @param {String|Number|Date|DateTime} endValue
 * @returns {Number}
 */
export function getDiffInWeeks (initValue, endValue) {
  const luxonDuration = getLuxonDuration(initValue, endValue);
  return getDurationAsWeeks(luxonDuration);
}

/**
 * @param {String|Number|Date|DateTime} initValue
 * @param {String|Number|Date|DateTime} endValue
 * @returns {Number}
 */
export function getDiffInYears (initValue, endValue) {
  const luxonDuration = getLuxonDuration(initValue, endValue);
  return getDurationAsYears(luxonDuration);
}

/**
 * @param {Duration} luxonDuration
 * @returns {Number}
 */
export function getDurationAsHours (luxonDuration) {
  return luxonDuration.isValid ? parseInt(luxonDuration.as('hours')) : null;
}

/**
 * @param {Duration} luxonDuration
 * @returns {Number}
 */
export function getDurationAsMillis (luxonDuration) {
  return luxonDuration.isValid ? luxonDuration.as('milliseconds') : null;
}

/**
 * @param {Duration} luxonDuration
 * @returns {Number}
 */
export function getDurationAsMinutes (luxonDuration) {
  return luxonDuration.isValid ? parseInt(luxonDuration.as('minutes')) : null;
}

/**
 * @param {Duration} luxonDuration
 * @returns {Number}
 */
export function getDurationAsWeeks (luxonDuration) {
  return luxonDuration.isValid ? Math.ceil(luxonDuration.as('weeks')) : null; // Arredondado pra cima
}

/**
 * @param {Duration} luxonDuration
 * @returns {Number}
 */
export function getDurationAsYears (luxonDuration) {
  return luxonDuration.isValid ? parseInt(luxonDuration.as('years')) : null;
}

/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getHour (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.hour : null;
}

export function getLuxonDuration (initValue, endValue) {
  return parseAnyLuxon(endValue, 0).diff(parseAnyLuxon(initValue, 0), [
    'days',
    'hours',
    'minutes',
    'months',
    'seconds',
    'years',
  ]);
}

/**
 * Obtém cada parte de uma duração, por exemplo, uma duração de '2000-01-02 02:00:00' a '2021-01-01 03:30:30'
 * years: 20, months: 11, days: 30, hours: 1, minutes: 30, seconds, 30
 *
 * Diferente dos métodos getDurationAs* que retornam o total absoluto
 * years: 20, months: 252, days: 7660, hours: 183841, minutes: 11030490, seconds, 661829430
 */
export function getDurationParts (luxonDuration) {
  if (luxonDuration.isValid) {
    const {
      days,
      hours,
      minutes,
      months,
      seconds,
      years,
    } = luxonDuration;
    return {
      days,
      hours,
      minutes,
      months,
      seconds,
      years,
    };
  }
  return null;
}

export function getLuxonNow () {
  return DateTime.local();
}

export function getMillis (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.toMillis() : null;
}

export function getMinute (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.minute : null;
}

/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getMonth (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.month : null; // 1-12
}

export function getMonthLong (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.monthLong : null; // janeiro, fevereiro, ...
}

export function getWeek (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.weekNumber : null;
}

export function getWeekDayNames (formatFlag) {
  return Info.weekdaysFormat(formatFlag); // 0 seg, 1 ter, 2 qua, 3 qui, 4 sex, 5 sab, 6 dom
}

/**
 * @param {String|Number|Date|DateTime} value
 * @returns {Number}
 */
export function getYear (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.year : null;
}

export function isSameDay (value1, value2) {
  const value1Luxon = parseLuxon(value1);
  const value2Luxon = parseLuxon(value2);
  return value1Luxon && value2Luxon
    ? value1Luxon.startOf('day').equals(value2Luxon.startOf('day'))
    : value1Luxon === value2Luxon;
}

export function startOfDay (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.startOf('day') : null;
}

export function startOfMonth (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.startOf('month') : null;
}

export function startOfWeek (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.startOf('week') : null; // Começo da semana, segunda
}

export function startOfYear (value) {
  const valueLuxon = parseLuxon(value);
  return valueLuxon ? valueLuxon.startOf('year') : null;
}

export function getUtcOffset () {
  return getLuxonNow().offset;
}

export default DateTime;
