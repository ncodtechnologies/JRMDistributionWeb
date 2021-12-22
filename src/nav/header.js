export default function HeaderComp() {
  const logOut = () => {
    localStorage.removeItem("JRMDistribution");
    window.location.reload();
  };
  return (
    <header>
      <div class="container">
        <div class="logo">
          <img src="assets/images/logo-wh.svg" alt="" />
        </div>
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
                <span>Mahmoud Eisa</span>
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
      </div>
    </header>
  );
}
