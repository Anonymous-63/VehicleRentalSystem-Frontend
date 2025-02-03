import { Avatar, Button, Dropdown, Space } from 'antd'
import React from 'react'
import { FaChevronDown, FaRightFromBracket, FaUser } from 'react-icons/fa6';
import { USER_PREFIX } from '../utils/Constants';
import { getDataFromLocalStorage, removeValueFromLocalStorage } from '../utils/storage';
import { useDispatch } from 'react-redux';
import { removeToken, removeUser } from '../store/features/userSlice';
import { useNavigate } from 'react-router';
import { IoChevronDown } from 'react-icons/io5';
import { errorNotif } from './CustomNotification';

const HeadUser = () => {
    const user = getDataFromLocalStorage(USER_PREFIX);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            dispatch(removeToken());
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            errorNotif(error.message);
        }
    }

    const userMenu = [
        {
            key: "logout",
            label: "Logout",
            icon: <FaRightFromBracket />,
            onClick: handleLogout
        },
    ];
    return (
        <>
            <Dropdown menu={{ items: userMenu }}>
                <Button type='default' color='purple' variant='filled' icon={<FaUser />} className='capitalize font-bold' >
                    <Space>
                        {user.name}
                        <IoChevronDown />
                    </Space>
                </Button>
            </Dropdown>
        </>
    )
}

export default HeadUser