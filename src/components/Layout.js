import React, { useState, useRef, useEffect } from "react";
import { userMenu, adminMenu } from "../Data/data.";
import { useNavigate, useParams, Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import CreateAppointments from "../components/MenuCompo/CreateAppointments";
import ShowAppointments from "../components/MenuCompo/ShowAppointments";

const Layout = () => {
  const user = useParams(); //params:to find wheather he is user or admin
  console.log(user.user);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const SidebarMenu =
    user?.user == "user" ? userMenu : user?.user == "admin" ? adminMenu : null;
  const [compo, setcompo] = useState(""); //compo,setcompo--the page which we click,setcompo-to which page should redirect
  console.log(compo);

  const Aboutref = useRef(null);

  const scrollToAbout = () => {
    Aboutref.current.scrollIntoView({
      behaviour: "smooth",
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/book/appointments"
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex">
        <div className="">
          <div className="">
            <div className="flex items-center justify-between bg-[#234a9f] text-white gap-4 p-4  w-screen">
              <div className="flex items-center space-x-3">
                <img
                  src="https://cdn1.vectorstock.com/i/1000x1000/39/30/doctor-appointment-concept-profile-men-vector-35193930.jpg "
                  className="w-10 h-10"
                />
                <h1>WebPath</h1>
              </div>
              <div className="flex items-center justify-center gap-4">
                {SidebarMenu?.map((menu) => {
                  return (
                    <>
                      <div
                        className="flex items-center space-x-1.5 cursor-pointer"
                        onClick={() => {
                          setcompo(menu.name);
                        }}
                      >
                        <h1
                          className=""
                          onClick={
                            menu.name === "About Us" ? scrollToAbout : null
                          }
                        >
                          {menu.name}
                        </h1>
                      </div>
                    </>
                  );
                })}
                <div
                  className="flex items-center space-x-1.5 text-white font-semibold"
                  onClick={handleLogout}
                >
                  <Link to="/login">
                    <h1 className="text-white">Logout</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        {compo === "Book Appointment" && user?.user == "user" ? (
          <CreateAppointments />
        ) : compo === "Users" && user?.user == "admin" ? (
          <ShowAppointments />
        ) : compo === "Appointments" && user?.user == "admin" ? (
          <ShowAppointments role={"userType"} />
        ) : user?.user == "admin" ? (
          <>
            <div className="px-48 space-y-4 pt-4">
              <h1 className="text-3xl font-semibold">Hello Doctor,</h1>
              <div className="flex gap-5 justify-center">
                <div>
                  <div className="max-w-sm  p-5 rounded-lg border-[1px] space-y-5 border-gray-300 shawdow-xl">
                    <img
                      src="https://img.freepik.com/free-vector/appointment-booking-with-calendar_52683-39831.jpg"
                      className="w-48 mx-auto"
                    />
                    <h1 className="text-lg font-bold">
                      Get Update About Your Appointments
                    </h1>
                    <p>
                      Hello Doctor, You have got new appointments in the
                      appointments page click the below button to check them.
                    </p>
                    <button
                      onClick={() => {
                        setcompo("Appointments");
                      }}
                      className="bg-blue-600 px-10 py-2 rounded-lg text-white font-semibold"
                    >
                      Check Appointment
                    </button>
                  </div>
                </div>
                <div>
                  <div className="max-w-sm p-5 rounded-lg border-[1px] space-y-5 border-gray-300 shawdow-xl">
                    <img
                      src="https://www.appsflyer.com/wp-content/uploads/2022/08/weekly-active-users-1.jpg"
                      className="w-96 "
                    />
                    <h1 className="text-lg font-bold">
                      See All Your Users With Their Appointments
                    </h1>
                    <p>
                      Hello Doctor, Check All Your Users By Clicking The Below
                      Button And Match Your Timings.
                    </p>
                    <button
                      onClick={() => {
                        setcompo("Users");
                      }}
                      className="bg-blue-600 px-10 py-2 rounded-lg text-white "
                    >
                      Check Users
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : user?.user == "user" ? (
          <>
            <div className="flex justify-around items-center mt-5">
              <div className="space-y-5">
                <h1 className="text-stone-800 font-bold text-5xl max-w-sm">
                  Your <span className="text-[#234a9f]">Health Care</span> is
                  Our Ambition
                </h1>
                <p className="text-stone-700 font-semibold">
                  We work to take care of your health and body.
                </p>
              </div>
              <div>
                <img
                  className="max-w-md"
                  src="https://images.pexels.com/photos/5998448/pexels-photo-5998448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                />
              </div>
            </div>
            <div className="flex justify-around items-center mt-20">
              <div>
                <img
                  className="max-w-md"
                  src="https://images.pexels.com/photos/7108398/pexels-photo-7108398.jpeg?auto=compress&cs=tinysrgb&w=600"
                />
              </div>
              <div className="space-y-5">
                <h1 className="text-stone-800 font-bold text-5xl max-w-sm">
                  Book <span className="text-[#234a9f]">Your Appointments</span>{" "}
                </h1>
                <p className="text-stone-700 font-semibold">
                  We work to take care of your health and body.
                </p>
                <button
                  className="bg-blue-600 px-14 py-2 rounded-lg text-white"
                  onClick={() => {
                    setcompo("Book");
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
            <div
              ref={Aboutref}
              className="flex justify-around items-center mt-20 space-y-6"
            >
              <div className="max-w-sm">
                <h1 className="text-stone-800 font-bold text-5xl ">
                  About <span className="text-[#234a9f]">Us</span>
                </h1>
                <p className=" text-stone-700 font-semibold">
                  We take care of your Healthy life. WebPath is an online doctor
                  appointment booking website where the patients can book
                  appointments to consult doctors.The patients can book
                  appointment Anywhere,Anytime with their doctor.After creating
                  an account,the user can book a slot or they can even cancel
                  that appointment
                </p>
              </div>
              <img
                src="http://landing.zytheme.com/kear/assets/images/features/about.jpg"
                className="max-w-sm"
              />
            </div>
          </>
        ) : null}
      </div>

      <footer className="bg-[#234a9f] h-[30vh] flex justify-between items-center px-10 mt-5">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn1.vectorstock.com/i/1000x1000/39/30/doctor-appointment-concept-profile-men-vector-35193930.jpg"
            className="w-10 h-10"
          />
          <h1 className="text-white font-bold">WebPath</h1>
        </div>

        <ul className="flex items-center space-x-6">
          {SidebarMenu?.map((menu) => (
            <li
              key={menu.name}
              className="cursor-pointer text-white font-semibold"
              onClick={() => setcompo(menu.name)}
            >
              <span
                onClick={
                  menu.name === "About Us"
                    ? scrollToAbout
                    : menu.name === "Home"
                    ? ScrollToTop
                    : null
                }
              >
                {menu.name}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-white text-center">
          <h1 className="font-bold text-lg">Contact Us</h1>
          <p>Email: support@webpath.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
