"use client";
import React, { useContext, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLocalStorage } from "../../api/localStorage";
import { useRouter } from "next/navigation";
import { LoginRegisterController } from "../../controller/login_register_controller/LoginRegister";
import AppContext from "../../context/AppContext";

export default function SignUp() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    retypePassword: "",
    street: "",
    unitNo: "",
    postalCode: "",
    housingType: 1,
    halalBox: false,
    role: 0,
  });
  const [textError, setTextError] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    street: "",
    unitNo: "",
    postalCode: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRetypePassword, setIsShowRetypePassword] = useState(false);
  const router = useRouter();
  const regax = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$";

  const onChangeInfo = (text, value) => {
    const data = { ...userData };
    data[text] = value;
    setUserData(data);
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickRegister = async () => {
    if (userData.password != userData.retypePassword) {
      toast.warn("Password and Retype Password must be the same!", {
        position: "top-right",
      });
    } else if (userData.email == "") {
      toast.warn("Please fill Email!", {
        position: "top-right",
      });
    } else if (userData.userName == "") {
      toast.warn("Please fill User Name!", {
        position: "top-right",
      });
    } else if (userData.password == "") {
      toast.warn("Please fill password!", {
        position: "top-right",
      });
    } else if (userData.retypePassword == "") {
      toast.warn("Please fill Retype password!", {
        position: "top-right",
      });
    } else if (userData.mobile == "") {
      toast.warn("Please fill mobile number!", {
        position: "top-right",
      });
    } else if (userData.street == "") {
      toast.warn("Please fill street!", {
        position: "top-right",
      });
    } else if (userData.unitNo == "") {
      toast.warn("Please fill Unit no!", {
        position: "top-right",
      });
    } else if (userData.postalCode == "") {
      toast.warn("Please fill postal code!", {
        position: "top-right",
      });
    }

    // else if (!regax.test(userData.password)) {
    //   toast.warn(
    //     "Password should be eight characters. Password mush contain one uppercase, one lowercase and one number!",
    //     {
    //       position: "top-right",
    //     }
    //   );
    // }
    else {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${parseInt(
          userData.postalCode
        )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
        { method: "GET" }
      );
      const data = response.json();
      data.then(async (res) => {
        if (res.results.length > 0) {
          LoginRegisterController.registerAccount(
            {
              userName: userData.userName,
              email: userData.email,
              mobile: userData.mobile,
              password: userData.password,
              street: userData.street,
              unitNo: userData.unitNo,
              postalCode: userData.postalCode,
              housingType: userData.housingType,
              halalBox: userData.halalBox,
              role: 0,
            },
            (data) => {
              setLocalStorage("id", data.id);
              setLocalStorage("password", data.password);
              setLocalStorage("userName", data.userName);
              const oldUser = { ...userInfo };
              oldUser.userId = data.id;
              setUserInfo(oldUser);
              try {
                fetch("https://ecoAPIt.achieversprofile.com/api/Email/send", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json;",
                  },
                  body: JSON.stringify({
                    toEmail: `${data.email}`,
                    subject: "Eco2Balance Email verification",
                    body: `<html><body><p>Email Verification Code is <b>${data.verificationCode}</b> </p></body></html>`,
                    isHtml: true,
                  }),
                })
                  .then(async (response) => {
                    if (response.ok) {
                      return response.text();
                    } else {
                      toast.error("Something went wrong!");
                    }
                  })
                  .then((res) => {
                    toast.success(res, { position: "top-right" });
                    router.push(
                      "/login/verification" +
                        "?" +
                        createQueryString("id", data.id)
                    );
                  })
                  .catch((err) => console.log("email error =====>", err));
              } catch (err) {
                console.error(err);
                toast.error("Something went wrond!");
              }
            }
          );
          // await fetch(
          //   "https://ecoAPIt.achieversprofile.com/api/AccountItems/signup",
          //   {
          //     method: "POST",
          //     // mode: "no-cors",
          //     headers: {
          //       "Content-Type": "application/json;",
          //       Accept: "application/json",
          //       // 'Content-Type': 'application/x-www-form-urlencoded',
          //     },
          //     body: JSON.stringify({
          //       userName: userData.userName,
          //       email: userData.email,
          //       mobile: userData.mobile,
          //       password: userData.password,
          //       street: userData.street,
          //       unitNo: userData.unitNo,
          //       postalCode: userData.postalCode,
          //       housingType: userData.housingType,
          //       halalBox: userData.halalBox,
          //       role: 0,
          //     }),
          //   }
          // )
          //   .then((res) => {
          //     var data = res.json();
          //     return data;
          //   })
          //   .then(async (data) => {
          //     SetCookies("id", data.id);
          //     try {
          //       await fetch(
          //         "https://ecoAPIt.achieversprofile.com/api/Email/send",
          //         {
          //           method: "POST",
          //           headers: {
          //             "Content-Type": "application/json;",
          //           },
          //           body: JSON.stringify({
          //             toEmail: "arkar@achieversprofile.com",
          //             subject: "Eco2Balance Email verification",
          //             body: `<html><body><p>Email Verification Code is <b>1234</b> </p></body></html>`,
          //             isHtml: true,
          //           }),
          //         }
          //       )
          //         .then(async (response) => {
          //           if (response.ok) {
          //             return response.text();
          //           } else {
          //             toast.error("Something went wrong!");
          //           }
          //         })
          //         .then((res) => {
          //           toast.success(res, { position: "top-right" });
          //         })
          //         .catch((err) => console.log("email error =====>", err));
          //     } catch (err) {
          //       console.error(err);
          //       toast.error("Something went wrond!");
          //     }
          //   })
          //   .catch((error) => {
          //     toast.error(error);
          //   });
        } else {
          toast.warn(
            "Postal Code is invalid. Please change to actual postal code!"
          );
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <ToastContainer />
      <div className="mt-5 mx-auto" style={{ width: "90%" }}>
        <h1>Register</h1>
        <p style={{ color: "#717171" }}>
          Please fill in this form to register.
        </p>
        <hr />
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="username" class="form-label">
              User Name:
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Username"
              value={userData.userName}
              onChange={(e) => onChangeInfo("userName", e.target.value)}
            />
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="email" class="form-label">
              Email address:
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              value={userData.email}
              onChange={(e) => onChangeInfo("email", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="mobile" class="form-label">
              Mobile No:
            </label>
            <input
              type="text"
              class="form-control"
              id="mobile"
              placeholder="Your Mobile No."
              value={userData.mobile}
              onChange={(e) => onChangeInfo("mobile", e.target.value)}
            />
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="postalCode" class="form-label">
              Postal Code:{" "}
              <span style={{ fontSize: 10 }}>{"{eg. 123456}"}</span>
            </label>
            <input
              type="number"
              class="form-control"
              id="postalCode"
              placeholder="Your Postal Code"
              value={userData.postalCode}
              onChange={(e) => onChangeInfo("postalCode", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="street" class="form-label">
              Street:
            </label>
            <input
              type="text"
              class="form-control"
              id="street"
              placeholder="Street"
              value={userData.street}
              onChange={(e) => onChangeInfo("street", e.target.value)}
            />
          </div>
          <div
            className="col-md-6 col-12 px-3 mx-auto"
            style={{ paddingTop: 10 }}
          >
            <label for="unitNumber" class="form-label">
              Unit Number:{" "}
              <span style={{ fontSize: 10 }}>
                {
                  "(Accepted format: #01-123 & only one account is allowed per household)"
                }
              </span>
            </label>
            <input
              type="text"
              class="form-control"
              id="unitNumber"
              placeholder="Unit number"
              value={userData.unitNo}
              onChange={(e) => onChangeInfo("unitNo", e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
              <label for="password" class="form-label">
                Password {"(8 characters minimum)"}:
              </label>
              <div class="input-group">
                <input
                  type={isShowPassword ? "text" : "password"}
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) => onChangeInfo("password", e.target.value)}
                />
                <span
                  class="input-group-text"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  <i
                    class={isShowPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    id="togglePassword"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
              <label for="retypePassword" class="form-label">
                Retype Password:
              </label>
              <div class="input-group">
                <input
                  type={isShowRetypePassword ? "text" : "password"}
                  class="form-control"
                  id="retypePassword"
                  placeholder="Retype password"
                  value={userData.retypePassword}
                  onChange={(e) =>
                    onChangeInfo("retypePassword", e.target.value)
                  }
                />
                <span
                  class="input-group-text"
                  onClick={() => setIsShowRetypePassword(!isShowRetypePassword)}
                >
                  <i
                    class={
                      isShowRetypePassword ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                    id="togglePassword"
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
              <label>Type of housing:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="public"
                  checked={userData.housingType == 1 ? true : false}
                  onClick={() => onChangeInfo("housingType", 1)}
                />
                <label class="form-check-label" for="public">
                  Public Housing {"(HOB flats)"}
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="private"
                  checked={userData.housingType == 2 ? true : false}
                  onClick={() => onChangeInfo("housingType", 2)}
                />
                <label class="form-check-label" for="private">
                  Private Condominiums / Apartments
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="landed"
                  checked={userData.housingType == 3 ? true : false}
                  onClick={() => onChangeInfo("housingType", 3)}
                />
                <label class="form-check-label" for="landed">
                  Landed Housing
                </label>
              </div>
            </div>
            <div className="col-12 px-1 mx-auto" style={{ paddingTop: 10 }}>
              <label>Food Waste Collection Box Type:</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="halal"
                  checked={userData.halalBox == true ? true : false}
                  onClick={() => onChangeInfo("halalBox", true)}
                />
                <label class="form-check-label" for="halal">
                  Halal
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault1"
                  id="nonHalal"
                  checked={userData.halalBox == false ? true : false}
                  onClick={() => onChangeInfo("halalBox", false)}
                />
                <label class="form-check-label" for="nonHalal">
                  Non Halal
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-11" style={{ marginLeft: "5%", marginTop: 30 }}> */}
        <div class="form-check mt-3">
          <input class="form-check-input" type="checkbox" value="" id="terms" />
          <label class="form-check-label" for="terms">
            By creating an account you agreed to Eco2Blance Terms and Condition
            & Privacy Policy
          </label>
        </div>
        {/* </div> */}
        <button
          type="button"
          class="btn btn-success btn-lg"
          style={{ width: "100%", marginTop: 30, backgroundColor: "green" }}
          onClick={onClickRegister}
        >
          Register
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary btn-lg"
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: "#F1F1F1",
            borderColor: "#F1F1F1",
          }}
          onClick={() => router.push("/login")}
        >
          <span style={{ fontSize: 14, color: "#04BADE" }}>
            Already have account?
          </span>
        </button>

        {/* <div className="col-11 col-md-6 mx-auto mt-5">
          <button
            className="btn btn-success"
            onClick={onClickRegister}
            style={{ width: "100%" }}
          >
            Register
          </button>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
