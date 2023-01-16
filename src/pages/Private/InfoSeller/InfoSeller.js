import { useState } from 'react';
import { Typography } from 'antd'

import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";


import useCVI from '../../../hooks/useCVI';

import './index.css';
import { InfoSeller2 } from './infoSeller2';


const { Title } = Typography
const InfoSeller = () => {
    let { identificationNumber } = useParams();
    const [verPdf, SetVerPdf] = useState(false);
    const ViewPdf = () => {
        SetVerPdf(!verPdf);
    }


    const infoSImage = useCVI({ 'atribute': `api/images/findKey?key=image:${identificationNumber}` });
    let url;
    if (!Array.isArray(infoSImage)) {
        url = infoSImage?.find[0].url
    }
    const infoS = useCVI({ 'atribute': `seller?identificationNumber=${identificationNumber}` });
    console.log("INFOS", infoS)
    return (
        <div>
            <Title className="formTitle">Vendedor</Title>
            {infoS?.sellers?.length > 0 && <InfoSeller2 seller={infoS.sellers[0]} url={url} />}
        </div>
    )
}

export default InfoSeller;