import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "./theme";
import {
  HomeOutlined as HomeIcon,
  PeopleOutlined as PeopleIcon,
  ContactsOutlined as ContactsIcon,
  ReceiptOutlined as ReceiptIcon,
  PersonOutlined as PersonIcon,
  CalendarTodayOutlined as CalendarIcon,
  HelpOutlineOutlined as HelpIcon,
  BarChartOutlined as BarChartIcon,
  PieChartOutlineOutlined as PieChartIcon,
  TimelineOutlined as TimelineIcon,
  MenuOutlined as MenuIcon,
  MapOutlined as MapIcon,
  GolfCourse,
  OnlinePredictionOutlined,
} from "@mui/icons-material";

import profileImage from "../../../../public/client-3.webp";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useTheme } from "next-themes";
interface SidebarItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const theme = useTheme();

  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="text-black dark:text-white !text-[16px] !font-Poppins">
        {title}
      </Typography>
      <Link href={`/admin${to}`} />
    </MenuItem>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logOutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === "dark" ? "#111c43" : "#fff !important"}`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-menu-item": {
          color: `${theme! == "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
        }}
      >
        <Menu iconShape="square">
          <SidebarHeader>
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography
                    variant="h5"
                    className="text-black dark:text-white"
                  >
                    Elearning
                  </Typography>
                  <IconButton
                    className="text-black dark:text-white"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
          </SidebarHeader>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={user.avatar || profileImage}
                  height={40}
                  width={40}
                  alt="user profile"
                  className="mt-5 rounded-full border border-primary-500"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  className="!text-[14px] text-orange-400 dark:text-orange-400 capitalize !font-[400]"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h5"
                  className="!text-[14px] text-amber-900 dark:text-[#ffffffc1] capitalize !font-[400]"
                >
                  ~ {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Home Page"
              to="/"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-black dark:text-white"
              sx={{ m: "10px 0 5px 20px" }}
            >
              Data
            </Typography>
            <SidebarItem
              title="Create-Course"
              to="/create-course"
              icon={<OnlinePredictionOutlined/>}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Manage Team"
              to="/team"
              icon={<PeopleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              className="text-black dark:text-white"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <SidebarItem
              title="Profile Form"
              to="/form"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Calendar"
              to="/calendar"
              icon={<CalendarIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="FAQ Page"
              to="/faq"
              icon={<HelpIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              className="text-black dark:text-white"
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <SidebarItem
              title="Bar Chart"
              to="/bar"
              icon={<BarChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Pie Chart"
              to="/pie"
              icon={<PieChartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Line Chart"
              to="/line"
              icon={<TimelineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Geography Chart"
              to="/geography"
              icon={<MapIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
        <SidebarFooter></SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
