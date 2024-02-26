import { DateTime } from "luxon";
import { ParsedComponents } from "chrono-node";

interface PropsType {
  targetDate: ParsedComponents["knownValues"];
  targetTimeZone: string;
}
export const convertTimeZone = ({
  targetDate,
  targetTimeZone,
}: PropsType): DateTime<true> | DateTime<false> => {
  const resultDate = DateTime.now().setZone(targetTimeZone).set({
    hour: targetDate.hour,
    minute: targetDate.minute,
    second: 0,
    millisecond: targetDate.millisecond,
    day: targetDate.day,
    month: targetDate.month,
    year: targetDate.year,
  });

  return resultDate;
};
