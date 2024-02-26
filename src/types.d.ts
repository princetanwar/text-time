import { ParsedComponents } from "chrono-node";
import { DateTime } from "luxon";

export type parsedDateType = (DateTime<true> | DateTime<false>) | null;

//  extend chrono-node type
declare module "chrono-node" {
  interface ParsedComponents extends ParsedComponents {
    knownValues: {
      day: number;
      hour: number;
      meridiem: number;
      millisecond: number;
      minute: number;
      month: number;
      second: number;
      timezoneOffset: number;
      year: number;
    };
  }
}
