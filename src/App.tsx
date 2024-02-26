/* eslint-disable jsx-a11y/aria-role */
import * as chrono from "chrono-node";
import { DateTime } from "luxon";
import { useState } from "react";
import "./App.css";
import { parsedDateType } from "./types";
import { allTimezones } from "./utils/data";
import { convertTimeZone } from "./utils/functions";

function App() {
  const [dateText, setDateText] = useState("");
  const [userSelectedTimeZone, setUserSelectedTimeZone] =
    useState("Asia/Calcutta");

  const [parsedDate, setParsedDate] = useState<{
    start: parsedDateType;
    end: parsedDateType;
  }>({ start: null, end: null });

  const handleCreateDate = () => {
    if (!dateText.trim()) {
      setParsedDate({
        start: null,
        end: null,
      });
      return;
    }
    // pass relative date of the timezone
    const parseResult = chrono.parse(
      dateText.trim(),
      new Date(
        DateTime.now()
          .setZone(userSelectedTimeZone)
          .toISO({ includeOffset: false }) as string
      )
    );
    if (!parseResult[0]) {
      setParsedDate({
        start: null,
        end: null,
      });
      return;
    }
    setParsedDate({
      start:
        convertTimeZone({
          targetDate: parseResult[0].start.knownValues,
          targetTimeZone: userSelectedTimeZone,
        }) || null,
      end: parseResult[0].end
        ? convertTimeZone({
            targetDate: parseResult[0].end.knownValues,
            targetTimeZone: userSelectedTimeZone,
          })
        : null,
    });
  };

  return (
    <div className="parent">
      <div>
        <input
          className="date-text"
          name="date-text"
          type="text"
          value={dateText}
          onChange={(e) => {
            setDateText(e.target.value);
          }}
          placeholder="enter the date text"
        />
        <select
          className="user-selected-timezone"
          name="user-selected-timezone"
          value={userSelectedTimeZone}
          onChange={(e) => {
            setUserSelectedTimeZone(e.target.value);
          }}
        >
          {allTimezones.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <div>
          <button
            className="submit-btn"
            name="submit-btn"
            onClick={handleCreateDate}
          >
            create
          </button>
        </div>
      </div>
      <div>
        <p role="result" className={`${parsedDate.start ? "result" : ""}`}>
          {/* 2024-02-25 05:30:00 PM (+05:30) */}
          {parsedDate.start &&
            parsedDate.start.toFormat("yyyy-LL-dd hh:mm:ss a (ZZ)")}{" "}
          {parsedDate.end &&
            ` - ${parsedDate.end?.toFormat("yyyy-LL-dd hh:mm:ss a (ZZ)")}`}{" "}
        </p>
      </div>
    </div>
  );
}

export default App;
