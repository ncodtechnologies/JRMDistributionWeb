import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderComp({ activeMenuIndex }) {
  const logOut = () => {
    localStorage.removeItem("JRMDistribution");
    localStorage.removeItem("JRMDistributionUser");
    localStorage.removeItem("JRMDistributionRoles");
    window.location.href = "/";
  };
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("JRMDistributionUser"));
  } catch (e) {}

  const roles = localStorage.getItem("JRMDistributionRoles") || "";

  const partnerMenus = [
    {
      label: "Partners",
      path: "/partners",
    },
    {
      label: "Deal Registration",
      path: "/deals",
    },
    {
      label: "Customers",
      path: "/partners",
    },
    {
      label: "Warranty",
      path: "/partners",
    },
  ];

  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    if (roles.includes("ADMIN")) setMenuItems([...partnerMenus]);
  }, [roles]);

  return (
    <header>
      <div class="container">
        <div class="logo">
          <img src="assets/images/logo-wh.svg" alt="" />
        </div>
        <div class="headermenu">
          <ul>
            {menuItems?.map((menu, index) => {
              return (
                <li>
                  <Link
                    to={menu.path}
                    class={activeMenuIndex == index && "active"}
                  >
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {roles != "" && (
          <div class="headproperties">
            <div class="search">
              <div class="search-container">
                <input
                  class="search expandright"
                  id="searchright"
                  type="search"
                  name="q"
                  placeholder="Search"
                />
                <label class="button searchbutton" for="searchright">
                  <span class="mglass">
                    {" "}
                    <i class="fas fa-search"></i>
                  </span>
                </label>
              </div>
            </div>
            <div class="notification">
              <a href="">
                <i class="far fa-bell"></i>
              </a>
            </div>
            <div class="avatar">
              <button
                type="button"
                id="dropdown"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="dtls">
                  <img src="assets/images/avatar.jpg" alt="" />
                  <span>{user?.name}</span>
                  <i class="fas fa-caret-down"></i>
                </div>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdown">
                <a class="dropdown-item" href="#">
                  Profile
                </a>
                <a class="dropdown-item" href="#">
                  Setting
                </a>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logOut();
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
