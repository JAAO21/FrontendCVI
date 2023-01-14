import { useState } from 'react';
import {  usePDF } from '@react-pdf/renderer';
import QRCode from "react-qr-code";

import DocumentPdf from '../../../components/DocuemtPdf/DocumentPdf';


export const InfoSeller2 = ({ infoS, url }) => {

    const [generateQr, setGenerateQr] = useState(false);
    const [instance, update] = usePDF({
        document: <DocumentPdf
            firstName={infoS?.seller[0]?.firstName}
            firstLastName={infoS?.seller[0]?.firstLastName}
            nationality={infoS?.seller[0]?.nationality}
            identificationType={infoS?.seller[0]?.identificationType}
            identificationNumber={infoS?.seller[0]?.identificationNumber}
            birthDate={infoS?.seller[0]?.birthDate}
            age={infoS?.seller[0]?.age}
            gender={infoS?.seller[0]?.gender}
            location_seller={infoS?.seller[0]?.location_seller}
            product={infoS?.seller[0]?.product}
            img={url || ''}
        />
    })


    const GenerateQR = () => {
        const formData = new FormData();
        formData.append("file", instance.blob);
        formData.append("fileName", infoS?.seller[0]?.identificationNumber)

        
        fetch( `http://localhost:3500/api/images/upload`, {
            method: 'POST',
            body: formData
        })
            .then(data => data.json())
    }

    let genderSeller;
    if (infoS.seller[0].gender == 'female') {
        genderSeller = 'mujer';
    } else {
        genderSeller = 'hombre'
    }
    return (
        <div>
            <h2>Nombre: {infoS.seller[0].firstName} {infoS.seller[0].firstLastName}</h2>
            <img src={url} />

            <div className='containerDataInfoSeller'>
                <label>Nacionalidad: </label>
                <p>{infoS.seller[0].nationality}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Tipo de identificación: </label>
                <p>{infoS.seller[0].identificationType}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Numero de identificación: </label>
                <p>{infoS.seller[0].identificationNumber}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Genero: </label>
                <p>{genderSeller}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Edad: </label>
                <p>{infoS.seller[0].age}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>fecha de nacimiento: </label>
                <p>{infoS.seller[0].birthDate}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Ubicación: </label>
                <p>{infoS.seller[0].location_seller}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>producto: </label>
                <p>{infoS.seller[0].product}</p>
            </div>
            <button onClick={GenerateQR}>Descargar</button>
            {generateQr ? <QRCode value={'google.com'} /> : null}
        </div>
    )
}