import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./RollCalendar.css";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ar";
import { ToolBar } from "./customization";

dayjs.extend(updateLocale);

dayjs.updateLocale("ar", {
  weekStart: 6, // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  weekdays: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  // 2. Short names (This is what usually shows in the calendar header)
  weekdaysShort: [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  // 3. Min names (Used on small mobile screens)
  weekdaysMin: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
});

dayjs.locale("ar");

const localizer = dayjsLocalizer(dayjs);

const myArabicMessages = {
  today: "اليوم",
  previous: "السابق",
  next: "التالي",
  month: "شهر",
  week: "أسبوع",
  day: "يوم",
  agenda: "جدول أعمال",
};

const someEvent = {
  taskName: "تحربه",
  startDate: new Date(2025, 11, 23, 12, 0),
  endDate: new Date(2025, 11, 23, 12, 0),
};

export default function RollCalendar() {
  return (
    <div className="calendar_container">
      <Calendar
        localizer={localizer}
        events={[someEvent]}
        messages={myArabicMessages}
        rtl={true}
        culture="ar"
        titleAccessor={"taskName"}
        startAccessor={"startDate"}
        endAccessor={"endDate"}
        components={{
          toolbar: ToolBar,
        }}
      />
    </div>
  );
}
