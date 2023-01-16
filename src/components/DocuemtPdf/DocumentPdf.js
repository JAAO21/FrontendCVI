import { Document, Page, View, Image, Text } from '@react-pdf/renderer';

const DocumentPdf = ({ firstName,
    firstLastName,
    nationality,
    identificationType,
    identificationNumber,
    birthDate,
    age,
    gender,
    location_seller,
    product,
    pdf,
    qr,
    img }) => {

        
    return (
        <Document>
            <Page size="A4">
                <View style={{ display: 'flex', flexDirection: 'column',flexWrap:'wrap', alignContent:'center',justifyContent:'center',  alignItems: 'center'}}>
                    <Text style={{ fontWeight: 'heavy' }}>Carnet digital CVI</Text>
                    {img && <Image src={img} style={{ "height": "100px", "width": "150px" }} alt="no image" />}
                    
                        <Text style={{marginTop:'30px'}}><Text style={{ fontWeight: 'heavy', }}>Nombre: </Text>{firstName} {firstLastName}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>Nacionalidad:</Text> {nationality}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>{identificationType}:</Text> {identificationNumber}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>Edad:</Text> {age}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>Genero:</Text> {gender}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>Año de nacimiento:</Text> {birthDate}</Text>
                        <Text ><Text style={{ fontWeight: 'heavy' }}>Ubicación: </Text>  {location_seller}</Text>
                        <Text><Text style={{ fontWeight: 'heavy' }}>Producto: </Text> {product}</Text>
                        <Text style={{ fontWeight: 'heavy' }}>Vigencia 01-02-2022</Text>
                   
                </View>
            </Page>
        </Document >
    )
}

export default DocumentPdf;