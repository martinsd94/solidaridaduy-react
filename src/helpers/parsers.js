import { randomString } from "./randomString";

export function parseApiLocations(rawData) {
  const provinces = rawData.result.values;
  let result = {};
  for (let i = 2; i < provinces.length; i++) {
    result[provinces[i][0]] = [];
    for (let j = 1; j < provinces[i].length; j++) {
      if (provinces[i][j].toLowerCase() !== "no corresponde")
        result[provinces[i][0]].push(provinces[i][j]);
    }
  }
  return result;
}

export function parseApiData(rawData) {
  const labels = rawData.result.values.shift();
  const indices = {
    name: labels.indexOf("Organización"),
    address: labels.indexOf("Dirección"),
    province: labels.indexOf("Departamento"),
    hood: labels.indexOf("Barrio/Localidad"),
    category: labels.indexOf("Actividad/es"),
    contact_phones: labels.indexOf("Número de contacto"),
    latitude: labels.indexOf("Coordenada Latitud"),
    longitude: labels.indexOf("Coordenada Longitud"),
    emergency: labels.indexOf("¿Emergencia?"),
    activities: labels.indexOf("Horarios (NUEVO)"),
    donations: labels.indexOf("Donaciones"),
    specific_needs: labels.indexOf("Necesidades específicas"),
    additional_notes: labels.indexOf("Aclaraciones Adicionales"),
    last_updated: labels.indexOf("Fecha de Ùltima Actualización"),
    /* Add and parse:
      - facebook
      - instagram
      - twitter??
      - email
      - bank account
    */
  };

  //

  const initiatives = rawData.result.values.map((ini, index) => ({
    _id: randomString(18, "aA#"),
    name: ini[indices.name],
    address: ini[indices.address],
    province: ini[indices.province],
    hood: ini[indices.hood] === "No corresponde" ? "" : ini[indices.hood],
    category: ini[indices.category],
    contact_phones: parseContactPhones(ini[indices.contact_phones]),
    geolocation: {
      latitude: ini[indices.latitude],
      longitude: ini[indices.longitude],
    },
    emergency: ini[indices.emergency] === "Si" ? true : false,
    activities: parseActivities(ini[indices.activities]),
    specific_needs: ini[indices.specific_needs],
    donations: ini[indices.donations],
    additional_notes: ini[indices.additional_notes],
    last_updated: ini[indices.last_updated],
  }));

  return initiatives;
}

//

function parseContactPhones(s) {
  const p = s.split(",");
  let aux;
  let phones = [];

  if (s === "" || !s) {
    return null;
  }

  for (var i = 0; i < p.length; i++) {
    if (p[i].indexOf("(") > -1) {
      aux = p[i].split(")");
      phones.push({
        person: aux[0].split("(")[1],
        number: aux[1],
      });
    } else {
      phones.push({
        person: null,
        number: p[i],
      });
    }
  }

  return phones;
}

// ------------------------------------------------------------

function parseActivities(s) {
  let aux, activities;
  let parsedActivities = {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  };

  if (!s) {
    // Empty schedule data (null or undefined)
    return parsedActivities;
  } else {
    const rawActivities = s.split(",");
    for (var i = 0; i < rawActivities.length; i++) {
      //  - Different schedules can be chained by using ','. For example: (LUN)15:00-16:00,(MAR)15:00-16:00
      aux = rawActivities[i];

      if (aux === "") {
        // Empty schedule data (empty string, should not happen)
        return parsedActivities;
      } else {
        // Split different schedules
        activities = aux.split(",");

        for (var j = 0; j < activities.length; j++) {
          parsedActivities = parseSingleScheduleData(
            activities[j],
            parsedActivities
          );
        }
      }
    }

    return parsedActivities;
  }
}

//

function parseSingleScheduleData(s, cumulativeSchedule) {
  // 's' will be in the form '(LUN-MIE)15:00-16:00'
  // There are some use cases for the syntax of "s":
  //  - Schedule info might not be available, in which case, this value will be empty
  //  - For a single day, use (LUN)15:00-16:00
  //  - For a day span, use (LUN-MIE)15:00-16:00
  //  - For an activity that has no finishing time, use (LUN)15:00
  //  - For a day with no timing info, use (LUN)

  // Avoid passing by reference, although in this case, it wouldn't really matter.
  let scheduleCopy = { ...cumulativeSchedule };

  // First things first - check if the expression follows the rules mentioned above:
  // TODO: Create regex, maybe
  if (s.indexOf(")") === -1) {
    return scheduleCopy;
  }

  let days, hours;
  let aux = s.split(")");
  aux[0] = aux[0].slice(1);

  if (aux[1] === "" || !aux) {
    // No timing information - in that case, use entire day
    days = parseDaySpan(aux[0]);
    hours = [0, 24];
  } else {
    days = parseDaySpan(aux[0]);
    hours = parseHourSpan(aux[1]);
  }

  for (var i = 0; i < days.length; i++) {
    scheduleCopy[getDayKey(days[i])].push({
      start: hours[0],
      duration: hours[1] - hours[0],
    });
  }

  return scheduleCopy;
}

const DAYS = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
const DAYS_KEYS = {
  DOM: "sun",
  LUN: "mon",
  MAR: "tue",
  MIE: "wed",
  JUE: "thu",
  VIE: "fri",
  SAB: "sat",
};
function getDayKey(day) {
  return DAYS_KEYS[day];
}

function parseDaySpan(d) {
  const days = d.split("-");
  if (days.length === 1) {
    return days;
  } else {
    // TODO: Add case where the starting day is "greater than" the ending day
    let aux = [];
    // Account for the case where start > end index
    const sInd = DAYS.indexOf(days[0]);
    if (DAYS.indexOf(days[1]) < sInd) {
      const eInd = DAYS.indexOf(days[1]) + DAYS.length;
      for (var i = sInd; i < eInd + 1; i++) {
        if (i > DAYS.length - 1) {
          aux.push(DAYS[i - DAYS.length]);
        } else {
          aux.push(DAYS[i]);
        }
      }
    } else {
      const eInd = DAYS.indexOf(days[1]);
      for (var j = sInd; j < eInd + 1; j++) {
        aux.push(DAYS[j]);
      }
    }
    return aux;
  }
}

function parseHourSpan(h) {
  const hours = h.split("-");
  if (hours.length === 1) {
    // Timing might or might not have an end
    // (This sounds like a deep existential affirmation, but it only refers to when an activity ends)
    return [parseHourToInt(hours[0]), 24];
  } else {
    return [parseHourToInt(hours[0]), parseHourToInt(hours[1])];
  }
}

function parseHourToInt(h) {
  const hour = h.split(":");
  return parseInt(hour[0]) + parseInt(hour[1]) / 60;
}

// Some examples for debugging.

//var a = "LUN-SAB";
//console.log(parseDaySpan(a));

//var b = "LUN";
//console.log(parseDaySpan(b));

// -----------------------------

//var c = "15:00-17:00";
//console.log(parseHourSpan(c));

//var d = "17:00";
//console.log(parseHourSpan(d));

//var e = "17:30-16:15";
//console.log(parseHourSpan(e));
