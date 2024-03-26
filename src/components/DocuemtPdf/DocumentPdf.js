import { Document, Page, View, Image, Text, LinearGradient } from '@react-pdf/renderer';
import moment from 'moment';
import cvilogo from '../../assests/logo/cvi.logo.jpg'

const DocumentPdf = (props) => {
    const { firstName,
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
        img } = props
    console.log("PROPS-----", props)
    return (
        <Document>
            <Page size="A4" style={{ justifyContent: 'center', padding: 20, backgroundColor: '#EEE', }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    padding: 10,
                    borderRadius: 10,

                }}>
                    <Image src={cvilogo} style={{ width: "160px" }} alt="no image" />
                    <Text style={{ fontWeight: "bold", fontSize: 30, marginVertical: 10 }}>Carnet digital CVI</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>{firstName} {firstLastName}</Text>
                    {img && <Image src={img} style={{ width: "280px", borderRadius: 10 }} alt="no image" />}
                    <View style={{ alignItems: 'flex-start', paddingTop: 10 }}>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000", fontWeight: 'bold' }}>Nacionalidad:</Text> {nationality}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>{identificationType}:</Text> {identificationNumber}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Edad:</Text> {age}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Genero:</Text> {gender == 'male' ? 'Masculino' : 'Femenino'}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Fecha de nacimiento:</Text> {moment(birthDate).format('YYYY-MM-DD')}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Ubicación: </Text>  {location_seller}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Producto: </Text> {product}</Text>
                        <Text style={{ marginBottom: 10, color: "#444" }}><Text style={{ color: "#000" }}>Vigencia: </Text> 01-02-2022</Text>
                    </View>
                </View>
            </Page>
        </Document >
    )
}

export default DocumentPdf;