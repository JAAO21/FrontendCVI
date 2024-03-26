import { Carousel } from 'antd';


import imgVendedor1 from '../../assests/images/back.jpg';
import imgVendedor2 from '../../assests/images/back.jpg';
import imgVendedor3 from '../../assests/images/back.jpg';
import imgVendedor4 from '../../assests/images/back.jpg';

import './index.css';

const contentStyle = {
    height: '160px',
    with:'100px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

const CaruselAnt = () => {

    return (
        <Carousel autoplay className='CarouselAnt'>
        <div>
          <img className='imgCarouselAnt' src={imgVendedor1} />
        </div>
        <div>
        <img className='imgCarouselAnt' src={imgVendedor1} />
        </div>
        <div>
        <img className='imgCarouselAnt' src={imgVendedor1} />
        </div>
        <div>
        <img className='imgCarouselAnt' src={imgVendedor1} />
        </div>
      </Carousel>
)
    
};
export default CaruselAnt;