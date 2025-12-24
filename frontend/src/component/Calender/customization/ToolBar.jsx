import Button from "../../Button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function ToolBar(props) {
  const {
    localizer: { messages },
    label,
    onNavigate,
    onView,
    view,
    views,
  } = props;

  // Navigation handlers
  const navigate = (action) => {
    onNavigate(action);
  };

  // View switch handler
  const changeView = (viewName) => {
    onView(viewName);
  };

  return (
    <div className="rbc-toolbar">
      {/* 1. NAVIGATION GROUP (Prev, Today, Next) */}
      <span className="rbc-btn-abs">
        <Button className={`rbc__toolbar__button`}>
          <Plus />
          اضافه
        </Button>
      </span>
      <span className="rbc-btn-group">
        <button type="button" onClick={() => navigate("PREV")}>
          {/* {messages.previous || "السابق"} */}
          <ChevronRight />
        </button>
        <button type="button" onClick={() => navigate("TODAY")}>
          {messages.today || "اليوم"}
        </button>
        <button type="button" onClick={() => navigate("NEXT")}>
          <ChevronLeft />
        </button>
      </span>

      {/* 2. DATE LABEL (The Title in the middle) */}
      <span className="rbc-toolbar-label">{label}</span>

      {/* 4. VIEW SWITCH GROUP (Month, Week, Day, etc.) */}
      <span className="rbc-btn-group">
        {views.map((viewName) => (
          <button
            key={viewName}
            type="button"
            className={view === viewName ? "rbc-active" : ""}
            onClick={() => changeView(viewName)}
          >
            {/* These labels come from your 'messages' prop */}
            {messages[viewName] || viewName}
          </button>
        ))}
      </span>
    </div>
  );
}
