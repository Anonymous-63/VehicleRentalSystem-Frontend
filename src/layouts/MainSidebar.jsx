import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { getDataFromLocalStorage } from '../utils/storage';
import { webPages } from '../routes/pagesConfig';
import { JWT_TOKEN_PREFIX, USER_PREFIX } from '../utils/Constants';

const MainSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);
  const user = getDataFromLocalStorage(USER_PREFIX);
  const userRole = user ? user.role : null;
  // State to manage open keys
  const [openKeys, setOpenKeys] = useState([]);

  // Filter sidebar based on authentication
  const filterSidebar = webPages
    .map((webPage) => {
      if (webPage.children.length > 0) {
        // Filter children based on role
        let childPages = webPage.children.filter(
          (child) => child.roles.length === 0 || (userRole && child.roles.includes(userRole))
        );

        if (childPages.length > 0) {
          return { ...webPage, children: childPages };
        }
        return null;
      } else {
        // Check if parent page is accessible
        return webPage.roles.length === 0 || (userRole && webPage.roles.includes(userRole)) ? webPage : null;
      }
    })
    .filter((webPage) => webPage !== null);

  // Generate menu items
  const menuItems = filterSidebar.map((page) => ({
    key: `/${page.sidebar.route}`, // Ensure leading "/"
    label: page.sidebar.label,
    icon: page.sidebar.icon,
    children: page.children.length
      ? page.children.map((child) => ({
        key: `/${page.sidebar.route}/${child.sidebar.route}`, // Ensure leading "/"
        label: child.sidebar.label,
        icon: child.sidebar.icon,
      }))
      : null,
  }));

  // Find the parent key of the selected child route
  useEffect(() => {
    const selectedKey = location.pathname;
    const parentKey = menuItems.find((item) =>
      item.children?.some((child) => child.key === selectedKey)
    )?.key;

    if (parentKey) {
      setOpenKeys([parentKey]); // Open the parent menu if a child is selected
    }
  }, [location.pathname]);

  // Handle menu clicks
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  // Handle menu expand/collapse
  const handleOpenChange = (keys) => {
    setOpenKeys(keys); // Update open keys when user interacts
  };

  return (
    <Sider width={"20%"} breakpoint="lg" className='bg-transparent' collapsedWidth={0} trigger={null}>
      <Menu
        items={menuItems}
        className="h-full font-bold"
        onClick={handleMenuClick}
        theme='dark'
        mode="inline"
        selectedKeys={[location.pathname]} // ✅ Highlight the selected menu item
        openKeys={openKeys} // ✅ Ensure the parent opens when needed
        onOpenChange={handleOpenChange} // ✅ Allow manual opening/closing
      />
    </Sider>
  );
};



export default MainSidebar