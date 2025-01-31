import { FaCar, FaUsers } from "react-icons/fa6";
import { sidebar } from "../classes/sidebar";
import { webPage } from "../classes/webPage";
import ManageUser from "../pages/ManageUser";
import ManageVehicle from "../pages/ManageVehicle";
import ManageVehicleBrand from "../pages/ManageVehicleBrand";
import { FaHome } from "react-icons/fa";
import HomePage from "../pages/HomePage";

export const webPages = [];

//Admin Pages
const manageUser = new webPage(1, new sidebar(1, "Manage Users", <FaUsers />, "user", <ManageUser />), null, [], ["admin"]);
const manageVehicle = new webPage(2, new sidebar(2, "Manage Vehicle", <FaCar />, "vehicle", <ManageVehicle />), null, [], ["admin"]);
const manageVehicleBrand = new webPage(3, new sidebar(3, "Manage Vehicle Brand", <FaCar />, "brand", <ManageVehicleBrand />), null, [], ["admin"]);

webPages.push(manageUser, manageVehicle, manageVehicleBrand);

