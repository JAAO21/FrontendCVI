
import { Card } from 'antd';
import ListMenu from '../../../components/Menu/ListMenu.js'
import CaruselAnt from '../../../components/Carusel/Carusel.js';
import imgVendedor5 from '../../../assests/images/imgVendedor5.jpeg'
import Footer from '../../../components/Footer/Footer.js'
import Contact from '../../../pages/Public/Contact/Contact.js'

import './index.css'
const Dashboard = () => {
    const { Meta } = Card;

  

    return (
        <div >
            <div className='containerCarouselAnt'>
                <CaruselAnt />
            </div>
            <ListMenu  />

            <div className='containerTextImgSeller'>
                <div>
                    <h1>
                        ¿Que son los venderdores informales?
                    </h1>
                    <p>
                        Como su mismo nombre indica, este tipo de vendedor no tiene un lugar fijo de venta,
                        ya que se va desplazando de un lugar a otro buscando la mayor afluencia de público.
                    </p>
                </div>
                <div>
                    <Card
                        hoverable
                        style={{
                            width: 240,
                        }}
                        cover={<img alt="example" src={imgVendedor5} />}
                    >
                        <Meta title="Vendededor informal" />
                    </Card>
                </div>
            </div>
           
            <Contact />
            <Footer />
        </div>
    )
}

export default Dashboard;