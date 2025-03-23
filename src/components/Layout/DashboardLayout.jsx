import Topbar from "../Shared/Topbar";

// import logo from "/images/logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import user from "../../../public/images/dashboard-logo/user.svg";
import business from "../../../public/images/dashboard-logo/business.svg";
import service from "../../../public/images/dashboard-logo/beauty.svg";
import income from "../../../public/images/dashboard-logo/income.svg";
// import policyScreen from "../../../public/images/dashboard-logo/policyScreen.svg";
import setting from "../../../public/images/dashboard-logo/setting.svg";
import profile from "../../../public/images/dashboard-logo/profile.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";

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
      icon: <img src={dashboardLogo} alt="dashboard" width={20} />,
      label: <NavLink to="dashboard">Dashboard</NavLink>,
    },
    {
      key: "properties",
      icon: <img src={business} alt="properties" width={20} />,
      label: <NavLink to="properties">Properties</NavLink>,
    },
    {
      key: "users",
      label: <span className="text-base-color">Users</span>,
      icon: <img src={user} alt="user" width={16} height={16} />,
      children: [
        {
          key: "landlord",
          icon: <span>&#8226;</span>,
          label: <NavLink to="users/landlord">Landlord</NavLink>,
        },
        {
          key: "tenant",
          icon: <span>&#8226;</span>,
          label: <NavLink to="users/tenant">Tenant</NavLink>,
        },
      ],
    },

    {
      key: "announcement",
      icon: <img src={service} alt="income" width={16} height={16} />,
      label: <NavLink to="announcement">Announcement</NavLink>,
    },
    {
      key: "terms-and-condition",
      icon: <img src={income} alt="income" width={16} height={16} />,
      label: <NavLink to="terms-and-condition">Terms and Condition</NavLink>,
    },

    {
      key: "privacy-policy",
      icon: <img src={setting} alt="dashboard" width={16} height={16} />,
      label: <NavLink to="privacy-policy">Privacy Policy</NavLink>,
    },
    {
      key: "about-us",
      icon: <img src={profile} alt="dashboard" width={16} height={16} />,
      label: <NavLink to="about-us">About Us</NavLink>,
    },
    {
      key: "change-password",
      icon: <img src={profile} alt="dashboard" width={16} height={16} />,
      label: <NavLink to="change-password">Change Password</NavLink>,
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
      icon: (
        <img
          src={logout}
          alt="dashboard"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div>
          <NavLink onClick={handleLogout} to="/signin">
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
            background: "#007BFF",
            // boxShadow: "0px 0px 5px #00000040",
            // position: "sticky",

            height: "100vh",
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
              background: "#007BFF",
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
