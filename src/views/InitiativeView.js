import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHome, FaPhone, FaMapMarkedAlt } from "react-icons/fa";
import { Map, Marker, TileLayer } from "react-leaflet";

/* Context */
import { useData } from "../context/data";

/* Styles */
import "../main.scss";
import "../styles/initiative.scss";

/* Svgs */
import CategorySvg from "../components/CategorySvg";

const InitiativeView = (props) => {
  const { id } = useParams();
  const { data } = useData();
  const [initiative, setInitiative] = useState(null);

  // Fetch initiative data
  useEffect(() => {
    /*fetch(`http://localhost:5000/initiative/${id}`, {
			crossDomain: true,
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => setInitiative(data));*/
    setInitiative(data.filter((init) => init._id === id)[0]);
  }, [id, setInitiative, data]);

  if (!!initiative) {
    let {
      name,
      category,
      hood,
      province,
      address,
      activities,
      contact_phones,
      emergency,
      specific_needs,
      donations,
      additional_notes,
      last_updated,
      geolocation,
    } = initiative;

    return (
      <div className={`main-wrapper${emergency ? " emergency" : ""}`}>
        <div className="name">
          <h3>{name}</h3>
          <CategorySvg category={category} emergency={emergency} />
        </div>

        <div className="details">
          <h4>Detalles</h4>

          {last_updated === "" ? null : (
            <p className="last-update">Última actualización: {last_updated}</p>
          )}

          {emergency ? (
            <p>
              <b>
                Esta iniciativa esta en{" "}
                <span className="emergency-notice">falta de recursos</span>.
              </b>
            </p>
          ) : null}

          <p>
            Tipo de iniciativa: <b>{category}</b>
          </p>
          <br />
          {address ? (
            <p>
              <FaMapMarkedAlt />
              {address}
            </p>
          ) : null}
          <p>
            <FaHome />
            {hood}, {province}
          </p>
          {contact_phones ? (
            <p>
              <FaPhone />
              {contact_phones.map((phone, index) => (
                <React.Fragment>
                  {index === 0 ? null : " - "}
                  {phone.number}
                  {!phone.person ? "" : ` (${phone.person})`}
                </React.Fragment>
              ))}
            </p>
          ) : null}
          {/*{specific_needs === "" ? null : (
            <p>Necesidades específicas: {specific_needs}</p>
          )}
          {additional_notes === "" ? null : (
            <p>Aclaraciones: {additional_notes}</p>
          )}*/}
        </div>
        <MapContainer geolocation={geolocation} />
        <Schedule activities={activities} />
      </div>
    );
  } else {
    return <div>Cargando...</div>;
  }
};

/* Local components */

const MapContainer = ({ geolocation }) => {
  let { latitude, longitude } = geolocation;

  return (
    <div className="map-wrapper">
      {latitude === "No corresponde" ||
      longitude === "No corresponde" ||
      latitude === "" ||
      longitude === "" ||
      !latitude ||
      !longitude ? (
        <p>Coordenadas no disponibles.</p>
      ) : (
        <Map center={[latitude, longitude]} zoom={15} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker key={0} position={[latitude, longitude]} onClick={() => {}} />
        </Map>
      )}
    </div>
  );
};

//

const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const Schedule = ({ activities }) => {
  return (
    <div className="schedule">
      <h4>Horarios</h4>
      <ScheduleTable activities={activities} />
    </div>
  );
};

const ScheduleTable = ({ activities }) => {
  return (
    <div className="schedule-table">
      <div></div>
      <p className="day">Domingo</p>
      <p className="day">Lunes</p>
      <p className="day">Martes</p>
      <p className="day">Miércoles</p>
      <p className="day">Jueves</p>
      <p className="day">Viernes</p>
      <p className="day">Sábado</p>

      {HOURS.map((hour, index) => (
        <div key={index} className={`row${index % 2 === 0 ? " row-even" : ""}`}>
          <p>{hour}</p>
          <div></div>
        </div>
      ))}

      <ScheduleTimings activities={activities} />
    </div>
  );
};

//

const ScheduleTimings = ({ activities }) => {
  const topOffsetFromStart = (start) => {
    // Row height is 25px. Offset is 30px.
    return `${30 + start * 25}px`;
  };

  const leftOffsetFromDay = (day) => {
    // Column width is 13%. Offset is 9%.
    return `${9 + DAYS.indexOf(day) * 13}%`;
  };

  const heightFromDuration = (duration) => {
    // One hour is 25px.
    return `${25 * duration}px`;
  };

  const dayDisplayFromDayCode = (code) => {
    return DAY_NAMES[DAYS.indexOf(code)];
  };

  const hourDisplayFromFloat = (f) => {
    let hours = Math.floor(f);
    let minutes = Math.floor(f - hours) * 60;
    hours = hours.toString();
    minutes = minutes.toString();
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <React.Fragment>
      {Object.entries(activities).map((dayActivities) => {
        let day = dayActivities[0];
        return dayActivities[1].map((activity, index) => (
          <div
            className="schedule-timing"
            key={`${day}-${index}`}
            style={{
              top: topOffsetFromStart(activity.start),
              left: leftOffsetFromDay(day),
              height: heightFromDuration(activity.duration),
            }}
          >
            <div className="schedule-timing-inner">
              <p>{dayDisplayFromDayCode(day)}</p>
              <p>
                {hourDisplayFromFloat(activity.start)} -{" "}
                {hourDisplayFromFloat(activity.start + activity.duration)}
              </p>
            </div>
          </div>
        ));
      })}
    </React.Fragment>
  );
};

export default InitiativeView;
