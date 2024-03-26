import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import { Layout } from 'antd';
import Webcam from "react-webcam";
import MyButton from "../../components/Button/Button";
import moment from 'moment';
import ListMenu from '../Menu/ListMenu';
import Footer from '../Footer/Footer';
import {
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Typography, Card,InputNumber
} from 'antd';
import GetCVI from '../../services/getCVI';
import './index.css';

const { Title, } = Typography
const { Header, Content, Sider } = Layout;
const FormSeller = () => {

    const navigate = useNavigate();
    const { Item } = Form;
    const { Option } = Select;
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const webcamRef = React.useRef(null);
    const [sellerImage, setSellerImage] = useState();
    const [takePhoto, setTakePhoto] = useState(false);
    const [showPhoto, setShowPhoto] = useState(false);
    const [againtPhoto, setAgaintPhoto] = useState(false);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setSellerImage(imageSrc);
            setShowPhoto(!showPhoto)
            console.log(takePhoto)
            setTakePhoto(false)
            setAgaintPhoto(!againtPhoto)
        },
        [webcamRef]
    )

    const TakePhotoSeller = () => {
        setTakePhoto(!takePhoto)
        setShowPhoto(false)
    }

    const dowloadImage = () => saveAs(sellerImage, '../../../assests/images/imageprueba.png')

    const onFinish = (values) => {
        const { firstName, firstLastName, nationality, identificationType, identificationNumber, birthDate, gender, email, product } = values;
        const name_user = localStorage.getItem("name_user")


        const data = {
            firstName,
            firstLastName,
            nationality,
            identificationType,
            identificationNumber,
            birthDate: birthDate.$y + '-' + (birthDate.$M + 1) + '-' + birthDate.$D,
            age: moment().diff(birthDate.$d, 'years'),
            gender,
            type_seller: 'Vendedor informal',
            location_seller: 'Plaza la concordia',
            name_user,
            product,
            email
        }


        const createSeller = GetCVI({ 'atribute': 'seller', data });

        console.log("createSeller", createSeller)
        createSeller.then((success, err) => {
            if (err) alert(err)
            console.log("SUCCCE", success)
            if (success.status) {
                const title = "image:" + identificationNumber
                const key = identificationNumber;
                const url = sellerImage;
                const imageData = { title, key, url }

                const CreateImage = GetCVI({ 'atribute': 'api/images/uploadImages', data: imageData });
                CreateImage.then((success, err) => {
                    console.log('imagen enviada', success)
                    if (err) console.log(err)
                    if (success.status) {
                        console.log('enviando a ruta')
                        navigate(`/informacionVendedor/${identificationNumber}`);
                    }
                })
            }
        })

    };
    return (
        <>
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
                    <Content

                    >
                        <Title className="formTitle">Vendedor</Title>
                        <Card

                        >
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                onValuesChange={onFormLayoutChange}
                                onFinish={onFinish}
                                className="formFormSeller"
                            >
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Nombre" 
                                        name="firstName"  
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Input />
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Apellido" 
                                        name="firstLastName"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Input />
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Nacionalidad"
                                         name="nationality"
                                         rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="colombiana">Colombiana</Option>
                                                <Option value="venezolana">Venezolana</Option>
                                                <Option value="otro">otro</Option>
                                            </Select>
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Fecha nacimiento"
                                         name="birthDate"
                                         rules={[{
                                            required:true
                                        }]}
                                        >
                                            <DatePicker />
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Tipo de documento" 
                                        name="identificationType"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="cc">C.C</Option>
                                                <Option value="ce">C.E</Option>
                                            </Select>
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Numero de identificación" 
                                        name="identificationNumber"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <InputNumber />
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item label="correo"
                                         name="email"
                                         rules={[
                                                {
                                                  type: 'email',
                                                  required:true
                                                },
                                           
                                         ]} >
                                            <Input />
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Genero" 
                                        name="gender"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="male">Hombre</Option>
                                                <Option value="female">Mujer</Option>
                                                <Option value="other">Otro</Option>
                                            </Select>
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>
                                        <Item 
                                        label="Producto" 
                                        name="product"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="platano">Platano</Option>
                                                <Option value="piña">Piña</Option>
                                                <Option value="mango">Mango</Option>
                                                <Option value="leche_cabra">Leche de cabra</Option>
                                                <Option value="varios">Varios</Option>
                                            </Select>
                                        </Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Dirección de barrio/dirección"
                                         name="address"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Input />
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Estado civil" 
                                        name="stateCivil"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="soltero">Soltero</Option>
                                                <Option value="casado">Casado</Option>
                                                <Option value="Viudo">Viudo</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Estrato" 
                                        name="stratum"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="grupoa">Grupo A</Option>
                                                <Option value="grupob">Grupo B</Option>
                                                <Option value="grupoc">Grupo C</Option>
                                                <Option value="grupod">Grupo D</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Desplazamiento forzado"
                                         name="forcedDisplacement"
                                         rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="si">Si</Option>
                                                <Option value="no">No</Option>


                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Etnia" 
                                        name="etnia"
                                        rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="mestizo">Mestizo</Option>
                                                <Option value="blancos">Blancos</Option>
                                                <Option value="afroamericanos">Afroamericanos</Option>
                                                <Option value="indigenas">Indigenas</Option>
                                                <Option value="no">No</Option>
                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Resguardo"
                                         name="guard"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="yurayaco">yurayaco</Option>
                                                <Option value="putumayo">Putumayo</Option>
                                                <Option value="amazonas">Amazonas</Option>

                                                <Option value="no">No</Option>
                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Eps"
                                         name="eps"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="asmet_salud">Asmet salud</Option>
                                                <Option value="sanitas">Sanitas</Option>
                                                <Option value="nueva_eps">Nueva EPS</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Discapacidad"
                                         name="disability"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="visual">Visual</Option>
                                                <Option value="vocal">Vocal</Option>
                                                <Option value="motris">motrices</Option>
                                                <Option value="mentales">mentales</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Nivel edutcativo"
                                         name="educativeLevel"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="bachiller">Bachiller</Option>
                                                <Option value="primaria">Primaria</Option>
                                                <Option value="pregrado">Pregrado</Option>
                                                <Option value="postgrado">Postgrado</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Acceso a internet/computadora/celular"
                                         name="tecnologyAcces"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="si">Si</Option>
                                                <Option value="no">No</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Servicios publicos "
                                         name="publicsServices"
                                         rules={[{
                                            required:true
                                        }]}>
                                            <Select>
                                                <Option value="agua">Agua</Option>
                                                <Option value="gas">Gas</Option>
                                                <Option value="energia">Energia</Option>
                                                <Option value="internet">Internet</Option>
                                                <Option value="ninguno">Ninguno</Option>

                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Nucleo familiar "
                                         name="familyNucleus"
                                         rules={[{
                                            required:true
                                        }]}
                                        >
                                            <Select>
                                                <Option value="conyuge">Conyuge</Option>
                                                <Option value="hijos">Hijos </Option>
                                                <Option value="padres">Padres</Option>
                                                <Option value="ninguno">Ninguna de las anteriores</Option>


                                            </Select>
                                        </Item>

                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={6}>

                                        <Item 
                                        label="Numero Nucleo familiar " 
                                        name="numberFamilyNucleus"
                                        rules={[{
                                            required:true
                                        }]}>
                                            <InputNumber />

                                        </Item>

                                    </Col>
                                </Row>
                                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Col xs={24} sm={12} md={12} lg={12}>
                                        <div className="divTakePhoto">
                                            <Title level={3}>Foto</Title>
                                            {
                                                showPhoto ? (
                                                    <div><img src={sellerImage} alt="vendedor" onClick={dowloadImage} />
                                                        <div className="divButtonSeller">
                                                            <MyButton onClick={TakePhotoSeller} name={'Otra vez'} />
                                                            <MyButton name={'Enviar'} htmlType="submit" />
                                                        </div>

                                                    </div>) : (
                                                    <div className="divButtonSeller">
                                                        <MyButton onClick={TakePhotoSeller} name={'Tomar foto'} />
                                                    </div>
                                                )
                                            }
                                            {
                                                takePhoto ? (
                                                    <div className="divWebcamSeller">
                                                        <Webcam audio={false} height={350} ref={webcamRef} screenshotFormat="image/jpeg" width={350} />
                                                        <div className="divButtonSeller">
                                                            <MyButton onClick={capture} name={'Foto'} />
                                                        </div>
                                                    </div>
                                                ) : null
                                            }

                                        </div>
                                    </Col>
                                </Row>
                                <div className="divButtonSeller">

                                </div>
                            </Form>
                        </Card>


                    </Content>
                    <Footer />
                </Layout>
            </Layout>


        </>
    );
};
export default FormSeller;