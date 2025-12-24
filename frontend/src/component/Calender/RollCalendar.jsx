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
// const formats = {
//   timeGutterFormat: (date, culture, localizer) =>
//     localizer.format(date, "h A", culture), // 'A' turns into صباحاً/مساءً

//   eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
//     localizer.format(start, "h A", culture) +
//     " - " +
//     localizer.format(end, "h A", culture),
// };

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
  date: "تاريخ",
  time: "الوقت",
  event: "الحدث",
  allDay: "طوال اليوم",
  noEventsInRange: "لا توجد أحداث في هذه الفترة",
};

const someEvent = {
  taskName: "قضيه عبدالله السعيد اسمها طويل شويه",
  startDate: new Date(2025, 11, 24, 12, 0),
  endDate: new Date(2025, 11, 24, 14, 0),
  priorty: "high",
};

const otherEvent = {
  taskName: "تحربه",
  startDate: new Date(2025, 11, 24, 12, 0),
  endDate: new Date(2025, 11, 24, 12, 0),
  priorty: "middle",
};

const thrd = {
  taskName: "تحربه",
  startDate: new Date(2025, 11, 24, 12, 0),
  endDate: new Date(2025, 11, 24, 12, 0),
  priorty: "normal",
};

const frth = {
  taskName: "تحربه",
  startDate: new Date(2025, 11, 24, 12, 0),
  endDate: new Date(2025, 11, 24, 12, 0),
  priorty: "normal",
};

const eventStyleGetter = (event) => {
  return { className: `event-priority-${event.priorty}` };
};

export default function RollCalendar() {
  return (
    <div className="calendar_container">
      <Calendar
        localizer={localizer}
        // formats={formats}
        events={[someEvent, otherEvent, thrd]}
        eventPropGetter={eventStyleGetter}
        messages={myArabicMessages}
        rtl={true}
        culture="ar"
        titleAccessor={"taskName"}
        startAccessor={"startDate"}
        endAccessor={"endDate"}
        components={{
          toolbar: ToolBar,
        }}
        // dayLayoutAlgorithm="compact"
      />
    </div>
  );
}
