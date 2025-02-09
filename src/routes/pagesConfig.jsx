import { FaCalendarCheck, FaCar, FaPhoneVolume, FaUsers } from "react-icons/fa6";
import { sidebar } from "../classes/sidebar";
import { webPage } from "../classes/webPage";
import ManageUser from "../pages/ManageUser";
import ManageVehicleBrand from "../pages/ManageVehicleBrand";
import ManageVehicleModel from "../pages/ManageVehicleModel";
import Booking from "../pages/Booking";
import { MdOutlinePayment } from "react-icons/md";
import Payment from "../pages/Payment";
import ManageVehicleType from "../pages/ManageVehicleType";
import ManageVehicle from "../pages/ManageVehicle";
import ShowVehicles from "../pages/ShowVehicles";
import { FaHome } from "react-icons/fa";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

export const webPages = [];

const home = new webPage(0, new sidebar(0, "Home", <FaHome />, "home", <HomePage />), null, [], ["admin", "user"]);
const about = new webPage(11, new sidebar(11, "About Us", <FaUsers />, "about", <AboutUs />), null, [], ["admin", "user"]);
const contact = new webPage(12, new sidebar(12, "Contact Us", <FaPhoneVolume />, "contact", <ContactUs />), null, [], ["admin", "user"]);


const manageUser = new webPage(1, new sidebar(1, "Manage Users", <FaUsers />, "user", <ManageUser />), null, [], ["admin"]);

//Admin Pages
const vehicle = new webPage(2, new sidebar(2, "Vehicle", <FaCar />, "vehicles", null), null, [], ["admin"]);
const manageVehicle = new webPage(3, new sidebar(3, "Vehicle", <FaCar />, "vehicle", <ManageVehicle />), null, [], ["admin"]);
const manageVehicleBrand = new webPage(4, new sidebar(4, "Vehicle Brand", <FaCar />, "brand", <ManageVehicleBrand />), null, [], ["admin"]);
const manageVehicleModel = new webPage(5, new sidebar(5, "Vehicle Model", <FaCar />, "model", <ManageVehicleModel />), null, [], ["admin"]);
const manageVehicleType = new webPage(7, new sidebar(7, "Vehicle Type", <FaCar />, "type", <ManageVehicleType />), null, [], ["admin"]);
vehicle.children.push(manageVehicleBrand, manageVehicleModel, manageVehicleType, manageVehicle);

const booking = new webPage(8, new sidebar(8, "Booking", <FaCalendarCheck />, "booking", <Booking />), null, [], ["admin", "user"])
const payment = new webPage(9, new sidebar(9, "Payment", <MdOutlinePayment />, "payment", <Payment />), null, [], ["admin", "user"])

const showVehicles = new webPage(10, new sidebar(10, "Vehicles", <FaCar />, "showVehicles", <ShowVehicles />), null, [], ["admin", "user"]);

webPages.push(home, showVehicles, booking, payment, manageUser, vehicle, about, contact);