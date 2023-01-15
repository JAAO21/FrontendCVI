import { useState } from 'react';


import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";


import useCVI from '../../../hooks/useCVI';

import './index.css';
import { InfoSeller2 } from './infoSeller2';
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
            <div className='containerInfoSellerData'>
                {infoS?.seller?.length > 0 && <InfoSeller2 seller={infoS.seller[0]} url={url} />}
            </div>

        </div>
    )
}

export default InfoSeller;