import './index.css';
import useCVI from '../../hooks/useCVI'
import { Link, useNavigate, } from 'react-router-dom';
import { Menu } from 'antd'
import userImage from '../../assests/images/back.jpg'
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ListMenu = () => {

  const menu = useCVI({ 'atribute': 'menu' });

  const navigate = useNavigate()

  const menuItems = menu?.row.length > 0 ? menu?.row.map(({ name, path }) => {
    return ({
      key: path,
      label: name
    })
  }) : []

  const [token, setToken] = useContext(AuthContext)

  const handleMenu = ({ key }) => {
    if (key === '/salir') {
      localStorage.clear()
      setToken()
      navigate('/')
    } else
      navigate(key)
  }

  return (
    <div>
      <div className='userInformation'>
        <img src={userImage} className='imgInformation' />
        <div className='userInformationPersonal'>
          <p className='userName'>Juan Montoya</p>
          <p className='userTypeIdentification'>111752631</p>
          <p className='userRol'>Admin</p>
        </div>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={menuItems}
        onClick={handleMenu}
      />
    </div>
  )
}

export default ListMenu;