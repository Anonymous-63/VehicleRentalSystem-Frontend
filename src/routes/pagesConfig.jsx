import { FaCalendarCheck, FaCar, FaUsers } from "react-icons/fa6";
import { sidebar } from "../classes/sidebar";
import { webPage } from "../classes/webPage";
import ManageUser from "../pages/ManageUser";
import ManageVehicle from "../pages/ManageVehicle";
import ManageVehicleBrand from "../pages/ManageVehicleBrand";
import ManageVehicleModel from "../pages/ManageVehicleModel";
import ManageVehicleTrimLevel from "../pages/ManageVehicleTrimLevel";
import ManageVehicleType from "../pages/ManageVehicleType";
import Booking from "../pages/Booking";
import { MdOutlinePayment } from "react-icons/md";
import Payment from "../pages/Payment";

export const webPages = [];

const manageUser = new webPage(1, new sidebar(1, "Manage Users", <FaUsers />, "user", <ManageUser />), null, [], ["admin"]);

//Admin Pages
const vehicle = new webPage(2, new sidebar(2, "Vehicle", <FaCar />, "vehicles", null), null, [], ["admin"]);
const manageVehicle = new webPage(3, new sidebar(3, "Manage Vehicle", <FaCar />, "vehicle", <ManageVehicle />), null, [], ["admin"]);
const manageVehicleBrand = new webPage(4, new sidebar(4, "Manage Vehicle Brand", <FaCar />, "brand", <ManageVehicleBrand />), null, [], ["admin"]);
const manageVehicleModel = new webPage(5, new sidebar(5, "Manage Vehicle Model", <FaCar />, "model", <ManageVehicleModel />), null, [], ["admin"]);
const manageVehicleTrimLevel = new webPage(6, new sidebar(6, "Manage Vehicle Trim Level", <FaCar />, "trimLevel", <ManageVehicleTrimLevel />), null, [], ["admin"]);
const manageVehicleType = new webPage(7, new sidebar(7, "Manage Vehicle Type", <FaCar />, "type", <ManageVehicleType />), null, [], ["admin"]);
vehicle.children.push(manageVehicle, manageVehicleBrand, manageVehicleModel, manageVehicleTrimLevel, manageVehicleType);

const booking = new webPage(8, new sidebar(8, "Booking", <FaCalendarCheck />, "booking", <Booking />), null, [], ["admin", "user"])
const payment = new webPage(9, new sidebar(9, "Payment", <MdOutlinePayment />, "payment", <Payment />), null, [], ["admin"])

webPages.push(manageUser, vehicle, booking, payment);