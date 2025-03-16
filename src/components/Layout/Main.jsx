import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    // <ConfigProvider>
    <div>
      <Outlet />
    </div>
    // </ConfigProvider>
  );
};

export default Main;
