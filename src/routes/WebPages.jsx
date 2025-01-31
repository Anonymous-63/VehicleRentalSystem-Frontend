import { FaCar, FaUsers } from "react-icons/fa6";
import { sidebar } from "../classes/sidebar";
import { webPage } from "../classes/webPage";
import ManageUser from "../pages/ManageUser";
import ManageVehicle from "../pages/ManageVehicle";
import ManageVehicleBrand from "../pages/ManageVehicleBrand";
import { FaHome } from "react-icons/fa";
import HomePage from "../pages/HomePage";
import ManageVehicleModel from "../pages/ManageVehicleModel";
import ManageVehicleTrimLevel from "../pages/ManageVehicleTrimLevel";
import ManageVehicleType from "../pages/ManageVehicleType";

export const webPages = [];

//Admin Pages
const manageUser = new webPage(1, new sidebar(1, "Manage Users", <FaUsers />, "user", <ManageUser />), null, [], ["admin"]);

const vehicle = new webPage(2, new sidebar(2, "Vehicle", <FaCar />, "vehicles", null), null, [], ["admin", "user"]);
const manageVehicle = new webPage(3, new sidebar(3, "Manage Vehicle", <FaCar />, "vehicle", <ManageVehicle />), null, [], ["admin"]);
const manageVehicleBrand = new webPage(4, new sidebar(4, "Manage Vehicle Brand", <FaCar />, "brand", <ManageVehicleBrand />), null, [], ["admin"]);
const manageVehicleModel = new webPage(5, new sidebar(5, "Manage Vehicle Model", <FaCar />, "model", <ManageVehicleModel />), null, [], ["admin"]);
const manageVehicleTrimLevel = new webPage(6, new sidebar(6, "Manage Vehicle Trim Level", <FaCar />, "trimLevel", <ManageVehicleTrimLevel />), null, [], ["admin"]);
const manageVehicleType = new webPage(6, new sidebar(6, "Manage Vehicle Type", <FaCar />, "type", <ManageVehicleType />), null, [], ["admin"]);
vehicle.children.push(manageVehicle, manageVehicleBrand, manageVehicleModel, manageVehicleTrimLevel, manageVehicleType);

webPages.push(manageUser, vehicle);

