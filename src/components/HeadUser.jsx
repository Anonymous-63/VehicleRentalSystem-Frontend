import { Avatar, Dropdown, Space } from 'antd'
import React from 'react'
import { FaChevronDown, FaDownload, FaHeartPulse, FaLock, FaRightFromBracket, FaUser, FaUserLarge } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';

const HeadUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userMenu = [
        {
            key: "logout",
            label: "Logout",
            icon: <FaRightFromBracket />
        },
    ];
    return (
        <Dropdown menu={{ items: userMenu }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar size={'default'} icon={<FaUser />} className='bg-green-400'></Avatar>
                    <span className='font-bold'>{user.name}</span>
                    <FaChevronDown />
                </Space>
            </a>
        </Dropdown>
    )
}

export default HeadUser