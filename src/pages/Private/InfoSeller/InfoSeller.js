import { useState } from 'react';
import { Typography } from 'antd'
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import { InfoSeller2 } from './infoSeller2';

import ListMenu from '../../../components/Menu/ListMenu';
import Footer from '../../../components/Footer/Footer';
import useCVI from '../../../hooks/useCVI';

import './index.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography
const InfoSeller = () => {
    let { identificationNumber } = useParams();
    const [verPdf, SetVerPdf] = useState(false);
    const ViewPdf = () => {
        SetVerPdf(!verPdf);
    }


    const infoSImage = useCVI({ 'atribute': `api/images/findKey?key=image:${identificationNumber}` });
    let url;
    if (!url && infoSImage && Array.isArray(infoSImage?.find)) {
        url = infoSImage?.find[0]?.url
    }
    const infoS = useCVI({ 'atribute': `seller?identificationNumber=${identificationNumber}` });
    console.log("INFOS", infoS)
    return (
        <Layout className='layoutDashboard'>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"

                className="sidebarDashboard"
            >
                <div className="logo" />
                <ListMenu />
            </Sider>
            <Layout>
                <Header
                    className='headerLogin'
                    style={{
                        padding: 0,
                    }}
                />
                <Content >
                    {infoS?.sellers?.length > 0 && url && <InfoSeller2 seller={infoS.sellers[0]} url={url} />}
                </Content>
                <Footer />
            </Layout>
        </Layout>

    )
}

export default InfoSeller;