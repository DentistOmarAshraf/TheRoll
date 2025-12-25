import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../layouts/Office/OfficeUIContext";
import styles from "./SideBar.module.css";
import Button from "../Button";
import ControlPannel from "../Icons/ControlPannel";
import Clients from "../Icons/Clients";
import Calendar from "../Icons/Calendar";
import Encyclopedia from "../Icons/Encyclopedia";
import Pencil from "../Icons/Pencil";
import Tools from "../Icons/Tools";
import News from "../Icons/News";

export default function SideBar() {
  const navigate = useNavigate();
  const { isSideOpen, setSideOpen } = useUI();
  const [active, setActive] = useState("");
  const [hover, setHover] = useState(false);

  const handleNavigate = (e) => {
    const { name, path } = e.currentTarget.dataset;
    setActive((prev) => name);
    navigate(path);
  };

  const handleMouseEnter = (e) => {
    if (!isSideOpen) setHover((prev) => true);
  };

  const handleMouseLeave = (e) => {
    setHover((prev) => false);
  };

  return (
    <div className={styles.side_bar_anchor}>
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles.side_bar} ${isSideOpen ? styles.open : ""} ${
          hover ? styles.overlap : ""
        }`}
      >
        <Button
          data-path="/office"
          data-name="office"
          className={`side_bar__button ${active == "office" ? "active" : ""} ${
            isSideOpen || hover ? "" : "closed"
          }`}
          onClick={handleNavigate}
        >
          <ControlPannel />

          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            لوحه التحكم
          </p>
        </Button>

        <Button
          data-name="clients"
          className={`side_bar__button ${active == "clients" ? "active" : ""} ${
            isSideOpen || hover ? "" : "closed"
          }`}
          onClick={handleNavigate}
        >
          <Clients />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            العملاء
          </p>
        </Button>

        <Button
          data-path="/office/calendar"
          data-name="calendar"
          className={`side_bar__button ${
            active == "calendar" ? "active" : ""
          } ${isSideOpen || hover ? "" : "closed"}`}
          onClick={handleNavigate}
        >
          <Calendar />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            الأجنده القضائيه
          </p>
        </Button>
        <Button
          data-name="encyclopedia"
          className={`side_bar__button ${
            active == "encyclopedia" ? "active" : ""
          } ${isSideOpen || hover ? "" : "closed"}`}
          onClick={handleNavigate}
        >
          <Encyclopedia />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            الموسوعه الشامله
          </p>
        </Button>
        <Button
          data-name="pencil"
          className={`side_bar__button ${active == "pencil" ? "active" : ""} ${
            isSideOpen || hover ? "" : "closed"
          }`}
          onClick={handleNavigate}
        >
          <Pencil />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            الموسوعه الشامله
          </p>
        </Button>
        <Button
          data-name="tools"
          className={`side_bar__button ${active == "tools" ? "active" : ""} ${
            isSideOpen || hover ? "" : "closed"
          }`}
          onClick={handleNavigate}
        >
          <Tools />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            الأدوات
          </p>
        </Button>
        <Button
          data-name="news"
          className={`side_bar__button ${active == "news" ? "active" : ""} ${
            isSideOpen || hover ? "" : "closed"
          }`}
          onClick={handleNavigate}
        >
          <News />
          <p
            className={`${styles.side_label} ${
              isSideOpen || hover ? styles.open : styles.closed
            }`}
          >
            اخر الاخبار
          </p>
        </Button>
      </aside>
    </div>
  );
}
