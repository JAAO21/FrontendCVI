import React from "react";
import { Input, Card, Form } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import GetCVI from "../../../services/getCVI";
import MyButton from '../../../components/Button/Button.js'
import "./index.css";
const { Item } = Form;
const Contact = () => {
  const { TextArea } = Input;
  const onFinish = (value) => {
    console.log(value)
    GetCVI({ atribute: 'api/nodemailer/sendMessage', data: value })
  }
  return (
    <div className="contacContainer">
      <Card
        title="Conctactenos ahora mismo!"
        className="cardContact"
        style={{ width: 300,margin: 15 }}
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
          className='formContact'
        >
          <Item label="Nombre" name="name" >
            <Input size="large" prefix={<UserOutlined  />} />
          </Item>

          <Item label="Email" name="email"  >
            <Input size="large" prefix={<MailOutlined  />} />
          </Item>
          <Item label="Celular" name="phone" >
            <Input size="large" prefix={<PhoneOutlined />} />
          </Item>
          <Item name="textData" >
            <Input.TextArea size="large" />
          </Item>
          <div className="containerBtnContact">
            <MyButton name={'Enviar'}  htmlType="submit" />
          </div>
        </Form>

      </Card>
    </div>
  );
};

export default Contact;