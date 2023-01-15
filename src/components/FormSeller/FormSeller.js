import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import moment from 'moment';

import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Card
} from 'antd';

import GetCVI from '../../services/getCVI';

import MyButton from '../Button/Button';

import './index.css';

const FormSeller = ({ imageSeller }) => {
    const navigate = useNavigate();
    const { Item } = Form;
    const { Option } = Select;
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    let dateNow = new Date();
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
            location_seller: 'Plaza la concordia',
            name_user,
            product,
            email
        }

        console.log(data)
        const createSeller = GetCVI({ 'atribute': 'seller', data });

        createSeller.then((succes, err) => {
            if (err) alert(err)
            if (succes.status) {
                const title = "image:" + identificationNumber
                const key = identificationNumber;
                const url = imageSeller;
                const imageData = { title, key, url }

                const CreateImage = GetCVI({ 'atribute': 'api/images/uploadImages', data: imageData });
                CreateImage.then((succes, err) => {
                    console.log('imagen enviada', succes)
                    if (err) console.log(err)
                    if (succes.status) {
                        console.log('enviando a ruta')
                        navigate(`/informacionVendedor/${identificationNumber}`);
                    }
                })
            }
        })

    };
    return (
        <Card
            title="Vendedor"
            bordered={false}
            style={{
                width: 800,
            }}>
            <Form
                labelCol={{
                    span: 20,
                }}
                wrapperCol={{
                    span: 35,
                }}
                layout="vertical"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
                className="formFormSeller"
            >

                <Item label="Nombre" name="firstName">
                    <Input />
                </Item>

                <Item label="Apellido" name="firstLastName">
                    <Input />
                </Item>

                <Item label="Nacionalidad" name="nationality">
                    <Select>
                        <Option value="colombiana">Colombiana</Option>
                        <Option value="venezolana">Venezolana</Option>
                        <Option value="otro">otro</Option>
                    </Select>
                </Item>

                <Item label="Fecha nacimiento" name="birthDate">
                    <DatePicker />
                </Item>

                <Item label="Tipo de documento" name="identificationType">
                    <Select>
                        <Option value="cc">C.C</Option>
                        <Option value="ce">C.E</Option>
                    </Select>
                </Item>

                <Item label="Numero de identificación" name="identificationNumber">
                    <Input />
                </Item>

                <Item label="correo" name="email">
                    <Input />
                </Item>

                <Item label="Genero" name="gender">
                    <Select>
                        <Option value="male">Hombre</Option>
                        <Option value="female">Mujer</Option>
                        <Option value="other">Otro</Option>
                    </Select>
                </Item>

                <Item label="Producto" name="product">
                    <Select>
                        <Option value="platano">Platano</Option>
                        <Option value="piña">Piña</Option>
                        <Option value="mango">Mango</Option>
                        <Option value="leche_cabra">Leche de cabra</Option>
                        <Option value="varios">Varios</Option>
                    </Select>
                </Item>
                <div>
                    <MyButton name={'Enviar'} />
                </div>
            </Form>
        </Card>
    );
};
export default FormSeller;