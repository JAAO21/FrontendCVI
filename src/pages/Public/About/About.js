import React from 'react'
import { Typography, Card } from 'antd'

import './index.css'

const About = props => {
  const { Title } = Typography;
  const { Meta } = Card;
  return (
    <div className="containerAbout">
      <div className="containerTitleP">
        <Title>CVI</Title>
        <p className="pAbout">
          Torito es una una aplicación que te permitirá
          llevar todo el ambiente de su negocio y rentabilidad
          a la erá tecnologica.
        </p>
      </div>
      <div className="">
        <div className="containerTitleP2Text">
          <Title>Devs</Title>

          <p className="pDevsAbout">
            Los desarrolladores que participaron en elaboración
            de este proyecto tanto en el frontend y backend.
          </p>
        </div>
        <div className="containerimgDevsAbout">
          <Card
            hoverable
            style={{ width: 240,marginRight:60}}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Dev " description="Dev frontend" />
          </Card>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Dev" description="Dev backend" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About;