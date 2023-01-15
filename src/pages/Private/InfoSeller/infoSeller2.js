import { useState } from 'react';
import { usePDF } from '@react-pdf/renderer';
import QRCode from "react-qr-code";

import DocumentPdf from '../../../components/DocuemtPdf/DocumentPdf';
import QRCode from "react-qr-code";

export const InfoSeller2 = ({ seller, url }) => {

    const [generateQr, setGenerateQr] = useState(false);
    const [instance, update] = usePDF({
        document: <DocumentPdf
            firstName={seller.firstName}
            firstLastName={seller.firstLastName}
            nationality={seller.nationality}
            identificationType={seller.identificationType}
            identificationNumber={seller.identificationNumber}
            birthDate={seller.birthDate}
            age={seller.age}
            gender={seller.gender}
            location_seller={seller.location_seller}
            product={seller.product}
            img={url}
        />
    })


    const GenerateQR = (instance) => {
        const formData = new FormData();
        formData.append("file", instance?.blob);
        formData.append("fileName", seller?.identificationNumber)

        fetch(`http://localhost:3500/api/images/upload`, {
            method: 'POST',
            body: formData
        })
            .then(data => data.json())
    }

    let genderSeller;
    if (seller.gender == 'female') {
        genderSeller = 'mujer';
    } else {
        genderSeller = 'hombre'
    }
    return (
        <div>
            <h2>Nombre: {seller.firstName} {seller.firstLastName}</h2>
            <img src={url} />

            <div className='containerDataInfoSeller'>
                <label>Nacionalidad: </label>
                <p>{seller.nationality}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Tipo de identificación: </label>
                <p>{seller.identificationType}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Numero de identificación: </label>
                <p>{seller.identificationNumber}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Genero: </label>
                <p>{genderSeller}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Edad: </label>
                <p>{seller.age}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>fecha de nacimiento: </label>
                <p>{seller.birthDate}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>Ubicación: </label>
                <p>{seller.location_seller}</p>
            </div>

            <div className='containerDataInfoSeller'>
                <label>producto: </label>
                <p>{seller.product}</p>
            </div>

            {generateQr ? <QRCode value={'google.com'} /> : <button onClick={() => GenerateQR(instance)}>Descargar</button>}
        </div>
    )
}