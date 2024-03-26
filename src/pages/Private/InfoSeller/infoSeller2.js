import { useState } from 'react';
import { usePDF, PDFViewer } from '@react-pdf/renderer';
import { Card, Descriptions, Image, Row, Typography, Button, message } from 'antd'

import DocumentPdf from '../../../components/DocuemtPdf/DocumentPdf';
import QRCode from "react-qr-code";

const { Meta } = Card
const { Title } = Typography

export const InfoSeller2 = ({ seller, url }) => {
    const [generateQr, setGenerateQr] = useState(false);
    const [messageApi, contextHolder] = message.useMessage()
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

        fetch(`https://cvi.up.railway.app/api/images/upload`, {
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

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Archivo descargado correctamente!',
        });
    };

    return (
        <div>
            <Title style={{ textAlign: 'center' }}>Vendedor</Title><Row style={{ justifyContent: 'center', marginBottom: 20 }}>
                {contextHolder}
                <Card
                    style={{ width: 400, paddingLeft: 5, paddingRight: 5, paddingTop: 20 }}
                    hoverable
                    actions={[
                        <Button
                            onClick={() => {
                                GenerateQR(instance)
                                success()
                            }}
                            type="primary"
                            style={{ backgroundColor: '#10B759', fontWeight: 'bold' }}
                        >
                            Descargar
                        </Button>
                    ]}
                    cover={(<>
                        <Meta
                            description={(
                                <Descriptions
                                    title={<Title level={2}>{seller.firstName + " " + seller.firstLastName}</Title>}
                                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                                    labelStyle={{ fontWeight: 'bold' }}
                                >
                                    <Descriptions.Item> <Image
                                        width={380}
                                        src={url}
                                    /></Descriptions.Item>

                                    <Descriptions.Item label="Nacionalidad">{seller.nationality}</Descriptions.Item>
                                    <Descriptions.Item label="Tipo de identificación">{seller.identificationType}</Descriptions.Item>
                                    <Descriptions.Item label="Número de identificación">{seller.identificationNumber}</Descriptions.Item>
                                    <Descriptions.Item label="Género">{genderSeller}</Descriptions.Item>
                                    <Descriptions.Item label="Edad">{seller.age}</Descriptions.Item>
                                    <Descriptions.Item label="Fecha de nacimiento">{seller.birthDate}</Descriptions.Item>
                                    <Descriptions.Item label="Ubicación">{seller.location_seller}</Descriptions.Item>
                                    <Descriptions.Item label="Producto">{seller.product}</Descriptions.Item>
                                </Descriptions>
                            )}
                        />
                    </>
                    )}
                    bordered={true}
                >
                    {/* <Button

                        type="primary"
                        style={{ marginTop: '90px' }}
                    >

                    </Button>  */}
                </Card>
               {/*  <PDFViewer height={800}>
                    <DocumentPdf
                        firstName={seller?.firstName}
                        firstLastName={seller?.firstLastName}
                        nationality={seller?.nationality}
                        identificationType={seller?.identificationType}
                        identificationNumber={seller?.identificationNumber}
                        birthDate={seller?.birthDate}
                        age={seller?.age}
                        gender={seller?.gender}
                        location_seller={seller?.location_seller}
                        product={seller?.product}
                        img={url}
                    />
                </PDFViewer> */}
            </Row>
        </div>

    )
}