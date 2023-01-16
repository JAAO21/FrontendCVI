import { Carousel } from 'antd';

import imgVendedor1 from '../../assests/images/vendedorInformal1.jpg';
import imgVendedor2 from '../../assests/images/vendedorInformal2.jpeg';
import imgVendedor3 from '../../assests/images/vendedorInformal3.png';
import imgVendedor4 from '../../assests/images/vendedorInformal4.jpg';

import './index.css';

const CaruselAnt = () => (
    <Carousel autoplay className='CarouselAnt'>
        <div>
            <img src={imgVendedor1} />
        </div>
        <div>
            <img src={imgVendedor2} />
        </div>
        <div>
            <img src={imgVendedor3} />
        </div>
        <div>
            <img src={imgVendedor4} />
        </div>
    </Carousel>
);
export default CaruselAnt;