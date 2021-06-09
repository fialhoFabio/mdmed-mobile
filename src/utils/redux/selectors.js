import {createSelector} from 'reselect';
// import {getDurationInMinutesFromExpedient, resolveHourExpedientSpots} from 'shared/main/utils/expedientHelper';
// import {parseLuxon} from '../luxon';

export const getObjectLength = createSelector(
  [(state, keyPath) => state.getIn(keyPath)],
  (value) => {
    return (value instanceof Object ? Object.keys(value).length : 0);
  },
);

export const getArrayLength = createSelector(
  [(state, keyPath) => state.getIn(keyPath)],
  (value) => {
    return (Array.isArray(value) ? value.length : 0);
  },
);

// export const appointmentIsSqueeze = createSelector(
//   [
//     (data) => data.initDateHour,
//     (data) => data.durationInMinutes,
//     (data) => data.state.weekDaysExpedientSpots, // reducer scheduler ou scheduling
//     (data) => data.state.customExpedientSpots, // reducer scheduler ou scheduling
//   ],
//   (initDateHour, selectedDurationInMinutes, weekDaysExpedientSpots, customExpedientSpots) => {
//     if (initDateHour && selectedDurationInMinutes && weekDaysExpedientSpots) {
//       const initDateHourLuxon = parseLuxon(initDateHour);
//       if (initDateHourLuxon) { // Se for inválido não pode considerar encaixe
//         const expedientDurationInMinutes = getDurationInMinutesFromExpedient(
//           initDateHourLuxon,
//           weekDaysExpedientSpots,
//           customExpedientSpots,
//         );
//         if (!expedientDurationInMinutes) return true;
//         return selectedDurationInMinutes != expedientDurationInMinutes;
//       }
//     }
//     return false;
//   },
// );

// export const dayHasExpedient = createSelector(
//   [
//     (data) => data.initDateHour,
//     (data) => data.state.weekDaysExpedientSpots,
//     (data) => data.state.customExpedientSpots,
//   ],
//   (initDateHour, weekDaysExpedientSpots, customExpedientSpots) => {
//     if (initDateHour && weekDaysExpedientSpots) {
//       const initDateHourLuxon = parseLuxon(initDateHour);
//       if (initDateHourLuxon) {
//         const hourExpedientSpots = resolveHourExpedientSpots(
//           initDateHourLuxon,
//           weekDaysExpedientSpots,
//           customExpedientSpots,
//         );
//         if (hourExpedientSpots) {
//           return Object.keys(hourExpedientSpots).length > 0;
//         }
//       }
//     }
//     return true;
//   },
// );

// export const getHourExpedientSpots = createSelector(
//   [
//     (data) => data.initDateHour,
//     (data) => data.state.weekDaysExpedientSpots,
//     (data) => data.state.customExpedientSpots,
//   ],
//   (initDateHour, weekDaysExpedientSpots, customExpedientSpots) => {
//     if (initDateHour && weekDaysExpedientSpots) {
//       const initDateHourLuxon = parseLuxon(initDateHour);
//       if (initDateHourLuxon) {
//         return resolveHourExpedientSpots(
//           initDateHourLuxon,
//           weekDaysExpedientSpots,
//           customExpedientSpots,
//         );
//       }
//     }
//     return true;
//   },
// );
