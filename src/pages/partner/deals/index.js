import axios from "axios";
import { useEffect, useState } from "react";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { PARTNER_URL } from "../../../urls/apiUrls";

export default function Deals() {
  useScript("assets/js/custom/deals.js");

  const [newDealOpen, setNewDealOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const token = localStorage.getItem("JRMDistribution");


  const loadDeals = () => {
    console.log("details")
    axios
      .post(
        PARTNER_URL.GET_DEALS,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        console.log(response);
        console.log("response")
      })
      .catch(function (error) {
        console.log(error);
        console.log("errorr")
      });
  };

  useEffect(() => {
    loadDeals();
  }, []);

  return (
    <>
      <HeaderComp />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <a href="">Dashboard</a>
            <span>Deal Registeration</span>
          </div>
          <div class="title">
            <h3>DEAL REGISTERATION</h3>
            <button
              class="btn-border"
              onClick={(e) => {
                e.preventDefault();
                setNewDealOpen(true);
                window.openNewDeal();
              }}
              id="newdeal"
            >
              <i class="fas fa-plus"></i>New Deal
            </button>
          </div>
          <div class="searchwrap">
            <div class="searchblk">
              <input type="text" placeholder="Search" />
              <button class="btn-filter">
                <img src="assets/images/icons/filter.png" alt="" />
              </button>
            </div>
            <button class="btn-primary">Search</button>
          </div>
          <div class="tabledeal">
            <table class="fold-table">
              <tbody>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status pending">Pending</div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status pending">Pending</div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status approved">Approved</div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status approved">Approved</div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status rejected">Rejected</div>
                    <div class="info">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting.
                    </div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr class="view">
                  <td></td>
                  <td>
                    <span>Deal No</span>
                    <p>#5216511454</p>
                  </td>
                  <td>
                    <span>Customer Name</span>
                    <p>Customer Name</p>
                  </td>
                  <td>
                    <span>Contact Person</span>
                    <p>Ahmed Mostafa</p>
                  </td>
                  <td>
                    <span>Mobile No.</span>
                    <p>9876543210</p>
                  </td>
                  <td>
                    <span>Purchase date</span>
                    <p>01/05/2021</p>
                  </td>
                  <td>
                    <span>Expected Revenue</span>
                    <p>60,000</p>
                  </td>
                  <td>
                    <div class="status rejected">Rejected</div>
                    <div class="info">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting.
                    </div>
                  </td>
                </tr>
                <tr class="fold">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>
                          <span>Product</span>
                          <p>SL2100</p>
                        </td>
                        <td>
                          <span>Qty</span>
                          <p>10</p>
                        </td>
                        <td>
                          <span>Capacity</span>
                          <p>3/8</p>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer>
        <div class="container">
          <div class="dtls">
            <img src="assets/images/logo-wh.svg" alt="" />
            <p>
              Our Technological stack allows for your business to be future
              ready
            </p>
            <ul>
              <li>
                <a href="">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="subscribe">
            <strong>Stay up to date with the latest news!</strong>
            <form action="">
              <input type="text" placeholder="Enter Your Email" />
              <input type="submit" value="subscribe" />
            </form>
          </div>
          <div class="footnav">
            <ul>
              <li>
                <a href="">Home</a>
                <a href="">Mobility</a>
                <a href="">Resources</a>
              </li>
              <li>
                <a href="">SL2100 Communications System</a>
                <a href="">Phones</a>
                <a href="">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          <p class="copyright">Copyrights JRM for Communications 2021</p>
        </div>
      </footer>
      {newDealOpen && (
        <section id="newdealwrap">
          <div class="newdealform">
            <a href="javascript:void(0)" class="close">
              <i class="fas fa-times"></i>
            </a>
            {!showSuccess ? (
              <div class="dealnew">
                <h3>NEW DEAL REGISTERATION</h3>
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Company Name<span>*</span>{" "}
                    </label>
                    <label class="ar">
                      اسم الشركة<span>*</span>
                    </label>
                  </div>
                  <input type="text" />
                </div>

                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Contact Person<span>*</span>
                    </label>
                    <label class="ar">
                      اسم الشخص<span>*</span>
                    </label>
                  </div>
                  <input type="text" />
                </div>

                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Email<span>*</span>
                    </label>
                    <label class="ar">
                      البريد الالكتروني<span>*</span>
                    </label>
                  </div>
                  <input type="text" />
                </div>

                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Mobile No.<span>*</span>
                    </label>
                    <label class="ar">
                      رقم الموبيل<span>*</span>
                    </label>
                  </div>
                  <input type="text" />
                </div>

                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Expected Revenue<span>*</span>
                    </label>
                    <label class="ar">
                      العائد المالي المتوقع<span>*</span>
                    </label>
                  </div>
                  <input type="text" />
                </div>

                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Products<span>*</span>
                    </label>
                    <label class="ar pad55">
                      المنتجات<span>*</span>
                    </label>
                  </div>
                  <div class="prodinput">
                    <div class="select-menu js-select-menu" id="unique-id">
                      <input
                        class="menu-state js-menu-state"
                        id="unique-id-menu-state"
                        type="checkbox"
                      />
                      <label
                        class="select-label js-select-label"
                        data-default-label="Select Product"
                        data-label="Select Product"
                        for="unique-id-menu-state"
                      >
                        <div class="arrow">
                          <i class="fas fa-plus"></i>
                        </div>
                      </label>
                      <ul class="menu js-select-options">
                        <li class="menu-item filter">
                          <input
                            class="js-filter-input"
                            type="text"
                            placeholder="Search"
                          />
                        </li>
                        <li
                          class="js-filterable"
                          data-filter-criteria="product 1"
                        >
                          <label class="menu-item">
                            <input
                              class="checkbox js-option"
                              type="radio"
                              name="selprod"
                              value="product 1"
                            />
                            <div class="choice-input"></div>
                            <span>product 1</span>
                          </label>
                        </li>
                        <li
                          class="js-filterable"
                          data-filter-criteria="product 2"
                        >
                          <label class="menu-item">
                            <input
                              class="checkbox js-option"
                              type="radio"
                              name="selprod"
                              value="product 2"
                            />
                            <div class="choice-input"></div>
                            <span>product 2</span>
                          </label>
                        </li>
                        <li
                          class="js-filterable"
                          data-filter-criteria="product 3"
                        >
                          <label class="menu-item">
                            <input
                              class="checkbox js-option"
                              type="radio"
                              name="selprod"
                              value="product 3"
                            />
                            <div class="choice-input"></div>
                            <span>product 3</span>
                          </label>
                        </li>
                        <li
                          class="js-filterable"
                          data-filter-criteria="product 4"
                        >
                          <label class="menu-item">
                            <input
                              class="checkbox js-option"
                              type="radio"
                              name="selprod"
                              value="product 4"
                            />
                            <div class="choice-input"></div>
                            <span>product 4</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <input
                    type="submit"
                    class="btn-primary"
                    onClick={() => setShowSuccess(true)}
                    value="SUBMIT"
                  />
                </div>
              </div>
            ) : (
              <div class="dealsuccess">
                <div class="dtls">
                  <img src="assets/images/icons/checked.png" alt="" />
                  <p>
                    Your deal has been submitted successfully <br />
                    Our team will contact you shortly
                  </p>
                  <button>Done</button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
