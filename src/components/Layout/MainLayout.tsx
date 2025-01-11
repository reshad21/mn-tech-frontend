import { Outlet } from "react-router";
import Container from "../Ui/Container";
import Navber from "../Ui/Navber";

const MainLayout = () => {
  return (
    <>
      <Container>
        <Navber />
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
