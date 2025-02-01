import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { useNavigate } from 'react-router';
import { getDataFromLocalStorage } from '../utils/storage';
import { webPages } from '../routes/pagesConfig';
import { JWT_TOKEN_PREFIX } from '../utils/Constants';

const MainSidebar = (props) => {
  const token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);

  const navigate = useNavigate();
  const filterSidebar = webPages.map(webPage => {
    if (webPage.children.length > 0) {
      let childPages = webPage.children.filter(childPage => {
        if (token) {
          return childPage;
        }
      });
      if (childPages.length > 0) {
        let page = { ...webPage }
        page.children = childPages;
        return page;
      } else {
        return;
      }
    } else {
      if (token) {
        return webPage;
      }
    }
  }).filter(webPage => webPage != undefined);

  const menuItems = filterSidebar.map((page) => ({
    key: page.sidebar.route,
    label: page.sidebar.label,
    icon: page.sidebar.icon,
    children: page.children.length
      ? page.children.map((child) => ({
        key: `${page.sidebar.route}/${child.sidebar.route}`,
        label: child.sidebar.label,
        icon: child.sidebar.icon,
      }))
      : null,
  }));

  const handleMenuClick = ({ key }) => {
    navigate(`${key}`);
  }


  return (
    <Sider theme='dark' width={"15%"} breakpoint='lg' collapsedWidth={0} trigger={null}>
      <Menu items={menuItems} className='h-full' theme='dark' onClick={handleMenuClick} mode='inline' >
      </Menu>
    </Sider>
  )
}

export default MainSidebar