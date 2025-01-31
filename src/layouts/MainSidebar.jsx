import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import { webPages } from '../routes/WebPages';
import { useNavigate } from 'react-router';

const MainSidebar = (props) => {

  const navigate = useNavigate();
  const filterSidebar = webPages.map(webPage => {
    if (webPage.children.length > 0) {
      let childPages = webPage.children.filter(childPage => {
        if (true) {
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
      if (true) {
        return webPage;
      } else {
        return;
      }
    }
  }).filter(webPage => webPage != undefined);

  const menuItems = filterSidebar.map((page) => ({
    key: page.sidebar.route,
    label: page.sidebar.label,
    icon: page.sidebar.icon,
    children: page.children.length
      ? page.children.map((child) => ({
        key: child.sidebar.key,
        label: child.sidebar.label,
        icon: child.sidebar.icon,
      }))
      : null,
  }));

  const handleMenuClick = ({ key }) => {
    navigate(key);
  }


  return (
    <Sider width={"15%"} breakpoint='lg' collapsedWidth={0} trigger={null}>
      <Menu items={menuItems} className='h-full bg-primary' theme='dark' onClick={handleMenuClick} >
      </Menu>
    </Sider>
  )
}

export default MainSidebar