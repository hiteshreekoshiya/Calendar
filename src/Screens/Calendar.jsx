import React, { useState } from "react";
import moment from "moment";
import "moment-timezone";
import "./calendar.css";
import Checkbox from "@material-ui/core/Checkbox";

const Calendar = () => {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC+0");
  const [currentDate, setCurrentDate] = useState(moment().tz(selectedTimezone));

  const startDate = moment(currentDate).tz(selectedTimezone).startOf("week");
  const endDate = moment(currentDate).tz(selectedTimezone).endOf("week");

  const dates = [];
  let date = startDate;
  while (date <= endDate) {
    if (date.day() !== 0 && date.day() !== 6) {
      dates.push(moment(date).tz(selectedTimezone));
    }
    date = moment(date).tz(selectedTimezone).add(1, "days");
  }

  const times = [];
  for (let i = 8; i < 24; i++) {
    times.push(`${i}:00`);
    times.push(`${i}:30`);
  }

  const handlePrevWeek = () => {
    setCurrentDate(
      moment(currentDate).tz(selectedTimezone).subtract(1, "week")
    );
  };

  const handleNextWeek = () => {
    setCurrentDate(moment(currentDate).tz(selectedTimezone).add(1, "week"));
  };

  const handleTimezoneChange = (event) => {
    setSelectedTimezone(event.target.value);
  };

  return (
    <div className="main-div">
      <div className="center-items">
        <span
          onClick={handlePrevWeek}
          style={{ color: "blue", cursor: "pointer" }}
        >
          ← Previous Week
        </span>

        <p>{moment().tz(selectedTimezone).format("MMM, DD YYYY, h:mm A")}</p>

        <span
          onClick={handleNextWeek}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Next Week →
        </span>
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>Timezone:</p>
        <select
          value={selectedTimezone}
          onChange={handleTimezoneChange}
          className="select-timezone"
        >
          <option value="UTC+0">UTC+0</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>

      <table className="table">
        <tbody>
          {dates.map((date) => {
            const isPast = moment(date)
              .tz(selectedTimezone)
              .isBefore(moment().tz(selectedTimezone), "day");
            return (
              <tr key={date.format("YYYY-MM-DD")}>
                <td className="first-td">
                  <span style={{ color: "red" }}>{date.format("ddd")}</span>
                  <p>{date.format("MM/DD")}</p>
                </td>

                <td className="second-td">
                  <div className="table-div">
                    {isPast && <span style={{ marginLeft: "10px" }}>Past</span>}
                    {!isPast &&
                      times.map((time) => (
                        <div
                          key={`${date.format("YYYY-MM-DD")}-${time}`}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Checkbox style={{ color: "#70B2EF" }} />
                          <p style={{ fontSize: "15px" }}>
                            {moment()
                              .tz(selectedTimezone)
                              .startOf("day")
                              .add(time, "hours")
                              .format("hh:mm A")}
                          </p>
                        </div>
                      ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
