import { Outlet } from "react-router-dom";
import InfoHeader from "../../component/InfoHeader/InfoHeader";
import SideBar from "../../component/SideBar/SideBar";
import Header from "../../component/Header/Header";
import OfficeUIContext from "./OfficeUIContext";
import OfficeGridContainer from "./OfficeGridContainer";

export default function OfficeLayout() {
  return (
    <OfficeUIContext>
      <OfficeGridContainer>
        <InfoHeader />
        <Header />
        <SideBar />
        <Outlet /> {/** Here where fetures be added */}
      </OfficeGridContainer>
    </OfficeUIContext>
  );
}
