import { useState } from 'react';
import { PDFViewer, PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

import DocumentPdf from '../../../components/DocuemtPdf/DocumentPdf';
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
        url = infoSImage.find[0].url
    }
    const infoS = useCVI({ 'atribute': `seller?identificationNumber=${identificationNumber}` });

    return (
        <div>
            <div className='containerInfoSellerData'>
                {!Array.isArray(infoS) && <InfoSeller2 infoS={infoS} url={url} />}
            </div>

            <div>
                <button onClick={ViewPdf}>Ver pdf</button>


            </div>
        </div>
    )
}

export default InfoSeller;