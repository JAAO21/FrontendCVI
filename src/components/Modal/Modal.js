
import { useState } from 'react';
import {
    Modal as ModalAntd,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import MyButton from '../Button/Button'
import moment from 'moment'

const { Item } = Form;
const { Option } = Select;
const Modal = ({ seller, setSeller, callback }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        const { firstName, firstLastName, nationality, identificationType, identificationNumber, birthDate, gender, email, product } = values;
        console.log(values)
        const data = {
            firstName,
            firstLastName,
            nationality,
            identificationType,
            identificationNumber,
            birthDate: moment(birthDate).format('YYYY-MM-DD hh:mm:ss').toString(),
            age: moment().diff(birthDate.$d, 'years'),
            gender,
            product,
            email
        }

        console.log("DATA", data)

        fetch(`https://cvi.up.railway.app/seller/${seller.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                callback()
                return data.json()
            })


        handleOk();
    }
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSeller()
        }, 2000);
    };

    const handleCancel = () => {
        setSeller()
    };
    return (
        <div>
            {seller && <ModalAntd
                open={seller != undefined}
                title="Title"
                footer={null}
                onCancel={handleCancel}
            >
                <Form
                    labelCol={{
                        span: 20,
                    }}
                    wrapperCol={{
                        span: 35,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    className=""
                >

                    <Item label="Nombre" name="firstName" initialValue={seller.firstName}>
                        <Input />
                    </Item>

                    <Item label="Apellido" name="firstLastName" initialValue={seller.firstLastName}>
                        <Input />
                    </Item>

                    <Item label="Nacionalidad" name="nationality" initialValue={seller.nationality}>
                        <Select>
                            <Option value="colombiana">Colombiana</Option>
                            <Option value="venezolana">Venezolana</Option>
                            <Option value="otro">otro</Option>
                        </Select>
                    </Item>

                    <Item label="Fecha nacimiento" name="birthDate" initialValue={moment(seller.birthDate)}>
                        <DatePicker />
                    </Item>

                    <Item label="Tipo de documento" name="identificationType" initialValue={seller.identificationType}>
                        <Select>
                            <Option value="cc">C.C</Option>
                            <Option value="ce">C.E</Option>
                        </Select>
                    </Item>

                    <Item label="Numero de identificación" name="identificationNumber" initialValue={seller.identificationNumber}>
                        <Input />
                    </Item>

                    <Item label="correo" name="email" initialValue={seller.email}>
                        <Input />
                    </Item>

                    <Item label="Genero" name="gender" initialValue={seller.gender}>
                        <Select>
                            <Option value="male">Hombre</Option>
                            <Option value="female">Mujer</Option>
                            <Option value="other">Otro</Option>
                        </Select>
                    </Item>

                    <Item label="Producto" name="product" initialValue={seller.product}>
                        <Select>
                            <Option value="platano">Platano</Option>
                            <Option value="piña">Piña</Option>
                            <Option value="mango">Mango</Option>
                            <Option value="leche_cabra">Leche de cabra</Option>
                            <Option value="varios">Varios</Option>
                        </Select>
                    </Item>
                    <div>
                        <MyButton name={'Cancelar'} onClick={handleCancel} />
                        <MyButton name={'Enviar'} htmlType="submit" />
                    </div>
                </Form>
            </ModalAntd>
            }
        </div >
    )
}

export default Modal