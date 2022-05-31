import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();
dayjs.tz.setDefault("America/Sao_Paulo");
class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }
}

export { DayjsDateProvider };
