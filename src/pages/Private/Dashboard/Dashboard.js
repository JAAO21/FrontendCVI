

import { Button, Layout } from 'antd';
import { useNavigate } from "react-router-dom";

import Footer from '../../../components/Footer/Footer.js';
import CaruselAnt from '../../../components/Carusel/Carusel.js';
import Contact from '../../../pages/Public/Contact/Contact.js'
import MyButton from '../../../components/Button/Button.js';
import './index.css'


const { Header, Content } = Layout;
const Dashboard = () => {
    const navigate = useNavigate();
    const sendLogin =()=>{
        
        navigate('/');
    }
    return (
        <Layout className='layoutDashboard'>
          
            <Layout>
                <Header
                    className='headerLogin'
                    style={{
                        padding: 0,

                    }}
                    
                > 
                <div className='containerbtnLoginDashboard'>
                    <MyButton name={'Login'}  htmlType="submit" onClick={sendLogin}/>
                </div>
                </Header>
                <Content

                >
                    <CaruselAnt />
                    <div className='containerTextImgSeller'>

                        <p className='ptextTitleDashboard'>
                            ¿Que son los venderdores informales?
                        </p>
                        <p className='pTextDasboard'>
                            Como su mismo nombre indica, este tipo de vendedor no tiene un lugar fijo de venta,
                            ya que se va desplazando de un lugar a otro buscando la mayor afluencia de público.
                        </p>

                    </div>

                    <Contact />
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};
export default Dashboard;




