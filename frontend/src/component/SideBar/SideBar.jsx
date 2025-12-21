import { useState } from "react";
import { useUI } from "../../context/UIContext";
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
  const { isSideOpen, setSideOpen } = useUI();
  const [active, setActive] = useState("");

  const handleNavigate = (e) => {
    const { name } = e.currentTarget.dataset;
    setActive((prev) => name);
  };

  return (
    <aside
      className={`${styles.side_bar} ${isSideOpen ? styles.open : ""}`}
    >
      <Button
        data-name="control_pannel"
        className={`side_bar__button ${
          active == "control_pannel" ? "active" : ""
        } ${isSideOpen ? "" : "closed"}`}
        onClick={handleNavigate}
      >
        <ControlPannel />

        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          لوحه التحكم
        </p>
      </Button>

      <Button
        data-name="clients"
        className={`side_bar__button ${active == "clients" ? "active" : ""} ${
          isSideOpen ? "" : "closed"
        }`}
        onClick={handleNavigate}
      >
        <Clients />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          العملاء
        </p>
      </Button>

      <Button
        data-name="calendar"
        className={`side_bar__button ${active == "calendar" ? "active" : ""} ${
          isSideOpen ? "" : "closed"
        }`}
        onClick={handleNavigate}
      >
        <Calendar />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          الأجنده القضائيه
        </p>
      </Button>
      <Button
        data-name="encyclopedia"
        className={`side_bar__button ${
          active == "encyclopedia" ? "active" : ""
        } ${isSideOpen ? "" : "closed"}`}
        onClick={handleNavigate}
      >
        <Encyclopedia />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          الموسوعه الشامله
        </p>
      </Button>
      <Button
        data-name="pencil"
        className={`side_bar__button ${active == "pencil" ? "active" : ""} ${
          isSideOpen ? "" : "closed"
        }`}
        onClick={handleNavigate}
      >
        <Pencil />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          الموسوعه الشامله
        </p>
      </Button>
      <Button
        data-name="tools"
        className={`side_bar__button ${active == "tools" ? "active" : ""} ${
          isSideOpen ? "" : "closed"
        }`}
        onClick={handleNavigate}
      >
        <Tools />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          الأدوات
        </p>
      </Button>
      <Button
        data-name="news"
        className={`side_bar__button ${active == "news" ? "active" : ""} ${
          isSideOpen ? "" : "closed"
        }`}
        onClick={handleNavigate}
      >
        <News />
        <p
          className={`${styles.side_label} ${
            isSideOpen ? styles.open : styles.closed
          }`}
        >
          اخر الاخبار
        </p>
      </Button>
    </aside>
  );
}
