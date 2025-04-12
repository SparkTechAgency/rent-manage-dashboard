import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
// import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
// import user from "../../../public/images/dashboard-logo/user.svg";
// import business from "../../../public/images/dashboard-logo/business.svg";
// import service from "../../../public/images/dashboard-logo/beauty.svg";
// import income from "../../../public/images/dashboard-logo/income.svg";
// import policyScreen from "../../../public/images/dashboard-logo/policyScreen.svg";
// import setting from "../../../public/images/dashboard-logo/setting.svg";
// import profile from "../../../public/images/dashboard-logo/profile.svg";
// import logout from "../../../public/images/dashboard-logo/logout.svg";

import { MdOutlineDashboard } from "react-icons/md";
import { BsFillHousesFill } from "react-icons/bs";
// import { FaUsers } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { VscTerminalUbuntu } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { BsInfoCircleFill } from "react-icons/bs";
import { TbPasswordUser } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";
import { FaBuildingUser } from "react-icons/fa6";
import { FaUserTag } from "react-icons/fa";

import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { AllImages } from "../../../public/images/AllImages";

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/signin", { replace: true });
  };

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: <MdOutlineDashboard size={25} />,
      label: (
        <NavLink className="font-semibold" to="dashboard">
          Dashboard
        </NavLink>
      ),
    },
    {
      key: "properties",
      icon: <BsFillHousesFill size={25} backgroundColor="white" />,
      label: (
        <NavLink className="font-semibold" to="properties">
          Properties
        </NavLink>
      ),
    },
    {
      key: "landlord",
      icon: <FaBuildingUser size={25} backgroundColor="white" />,
      label: (
        <NavLink className="font-semibold" to="landlord">
          Landlord
        </NavLink>
      ),
    },
    {
      key: "tenant",
      icon: <FaUserTag size={25} backgroundColor="white" />,
      label: (
        <NavLink className="font-semibold" to="tenant">
          Tenant
        </NavLink>
      ),
    },
    // {
    //   key: "users",
    //   label: <span className="text-white font-semibold">Users</span>,
    //   icon: <FaUsers size={25} />,
    //   children: [],
    // },

    {
      key: "announcement",
      icon: <GrAnnounce size={25} />,
      label: (
        <NavLink className="font-semibold" to="announcement">
          Announcement
        </NavLink>
      ),
    },
    {
      key: "terms-and-condition",
      icon: <VscTerminalUbuntu size={25} />,
      label: (
        <NavLink className="font-semibold" to="terms-and-condition">
          Terms and Condition
        </NavLink>
      ),
    },

    {
      key: "privacy-policy",
      icon: <SiGnuprivacyguard size={25} />,
      label: (
        <NavLink className="font-semibold" to="privacy-policy">
          Privacy Policy
        </NavLink>
      ),
    },
    {
      key: "about-us",
      icon: <BsInfoCircleFill size={25} />,
      label: (
        <NavLink className="font-semibold" to="about-us">
          About Us
        </NavLink>
      ),
    },
    {
      key: "change-password",
      icon: <TbPasswordUser size={25} />,
      label: (
        <NavLink className="font-semibold" to="change-password">
          Change Password
        </NavLink>
      ),
    },
    // {
    //   key: "settings",
    //   label: <span className="text-base-color"> Settings</span>,
    //   icon: <img src={setting} alt="dashboard" width={16} height={16} />,
    //   children: [
    //     {
    //       key: "change-password",
    //       icon: <span>&#8226;</span>,
    //       label: (
    //         <NavLink to="settings/change-password">Change Password</NavLink>
    //       ),
    //     },
    //     {
    //       key: "about-us",
    //       icon: <span>&#8226;</span>,
    //       label: <NavLink to="about-us">About Us</NavLink>,
    //     },
    //     {
    //       key: "terms-of-service",
    //       icon: <span>&#8226;</span>,
    //       label: <NavLink to="terms-of-service">Terms & Condition</NavLink>,
    //     },
    //     {
    //       key: "privacy-policy",
    //       icon: <span>&#8226;</span>,
    //       label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
    //     },
    //   ],
    // },
    {
      key: "logout",
      icon: <VscSignOut size={25} />,
      label: (
        <div>
          <NavLink
            className="font-semibold"
            onClick={handleLogout}
            to="/signin"
          >
            Logout
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen !bg-white ">
      <Layout className="!relative !bg-white">
        <Sider
          width={270}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#222021",
            // boxShadow: "0px 0px 5px #00000040",
            // position: "sticky",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              width={150}
              height={150}
              className="my-7 mx-auto"
            />
          </Link>

          <ConfigProvider
            theme={{
              token: {
                colorBgBase: "#FFC0D3",
                colorInfo: "#FFC0D3",
              },
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={pathSegment}
              style={{
                backgroundColor: "transparent",
                border: "none",
                paddingLeft: "6px",
                paddingRight: "6px",
              }}
              items={adminMenuItems}
            />
          </ConfigProvider>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#222021",
              position: "sticky",
              top: 0,
              zIndex: 99999,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-white px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
