import { Layout, Row } from 'antd';


import { Table, Input, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, QrcodeOutlined, ArrowDownOutlined } from '@ant-design/icons'
import QRCode from "react-qr-code";
import ModalAntd from '../../../components/Modal/Modal'
import GetCVI from '../../../services/getCVI';
import ListMenu from '../../../components/Menu/ListMenu.js'
import Footer from '../../../components/Footer/Footer.js'

import './index.css'
import { CSVLink } from 'react-csv';

const { Header, Content, Sider } = Layout;
const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const SearchSeller = () => {
    const [cvi, setCVI] = useState();
    const [seller, setSeller] = useState()
    const [pdfUrl, setPdfUrl] = useState('');
    const [count, Setcount] = useState()
    //const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const showModal = (data) => {
        setOpen(true)
        
        GetCVI({ atribute: `api/images/findKey?key=${data?.identificationNumber}.pdf` }).then(data => {
            /* console.log(data.find[0].url) */
            console.log(data, 'vacio')
            setPdfUrl(data.find[0].url)
        })
    };

    GetCVI({ atribute: `seller/count` }).then(data => {
        
        Setcount(data.row[0].countRows)

    })


    const hideModal = () => {
        setOpen(false);
    };

    const UpdateStateSeller = (data) => {
        const valueData = {
            id: data.id,
            state: false
        }

        fetch(`https://cvi.up.railway.app/seller/updateStateSellers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueData)
        })
            .then(data => {
                getData('seller/allSellers')
                return data.json()
            })

    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'firstName',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.firstName?.length - b.firstName?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Apellido',
            dataIndex: 'firstLastName',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.firstLastName?.length - b.firstLastName?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Nacionalidad',
            dataIndex: 'nationality',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.nationality?.length - b.nationality?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Tipo de identificación',
            dataIndex: 'identificationType',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.identificationType?.length - b.identificationType?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Numero de identificación',
            dataIndex: 'identificationNumber',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a?.identificationNumber - b?.identificationNumber
        },
        {
            title: 'Edad',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a?.age - b?.age
        },
        {
            title: 'Genero',
            dataIndex: 'gender',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.gender?.length - b.gender?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Vendedor',
            dataIndex: 'type_seller',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.type_seller?.length - b.type_seller?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Ubicación',
            dataIndex: 'location_seller',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.location_seller?.length - b.location_seller?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Prodcuto',
            dataIndex: 'product',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.product?.length - b.product?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Acciones',
            key: '_',
            dataIndex: '_',
            render: (_, data) => (
                <>
                    <Button
                        type="primary"
                        shape="circle"
                        onClick={() => setSeller(data)}
                        icon={<EditOutlined />}
                    />
                    <Button
                        type="primary"
                        danger
                        shape="circle"
                        onClick={() => UpdateStateSeller(data)}
                        icon={<DeleteOutlined />}
                    />
                    <Button
                        type="primary"
                        danger
                        shape="circle"
                        onClick={() => showModal(data)}
                        icon={<QrcodeOutlined />}
                    />
                </>
            ),
        }, ,

    ];

    const getData = (atribute) => {
        GetCVI({ atribute }).then(data => {
            setCVI(data);
        });
    }

    useEffect(() => {
        !cvi?.sellers?.length && getData('seller/allSellers')
    }, [setCVI])

    const onSearch = (value) => {
        value === '' ? getData('seller/allSellers')
            :
            getData(`seller?identificationNumber=${value}`)
    }

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0" className="sidebarDashboard">
                <div className="logo" />
                <ListMenu />
            </Sider>
            <Layout>
                <Header className='headerLogin' style={{ padding: 0 }} />
                <Content style={{ padding: 5 }}>
                    <Row style={{ display: 'flex', flexDirection: 'row', marginBottom: 20, alignItems: 'flex-end' }}>
                        <div style={{ flexGrow: 1, marginLeft: 15 }}>
                            <Search
                                placeholder="# de identificación"
                                onSearch={onSearch}

                                allowClear
                                style={{
                                    width: 200
                                }}
                            />
                        </div>
                        <div className='cantRegistSearch'>
                            <p>Registros</p>
                            <div className='cantRegistrosSearchSeller'>
                                <p className='cantRegistSearchP'>{count}</p>
                            </div>
                        </div>
                        <div className='containerbtnDowlandCsv'>
                            <p>Descargar csv</p>
                            <CSVLink
                                data={cvi?.sellers?.map((d, i) => ({ ...d, key: d.id })) || []}
                                onClick={() => {
                                    console.log("clicked")
                                }}
                            >
                                <Button
                                    type="primary"
                                    shape="default"
                                    icon={<ArrowDownOutlined style={{ fontSize: '37px', color: '#ffffff' }} />}
                                    className="btnDowlandCsv"
                                />
                            </CSVLink>
                        </div>

                    </Row>

                    <Table
                        columns={columns}
                        id="tableSellers"
                        dataSource={cvi?.sellers?.map((d, i) => ({ ...d, key: d.id }))}
                        onChange={onChange} scroll={{ x: 1300 }}

                    />

                    <ModalAntd
                        seller={seller}
                        setSeller={setSeller}
                        callback={() => getData('seller/allSellers')}
                    />
                    <Modal
                        title="Modal"
                        open={open}
                        onOk={hideModal}
                        onCancel={hideModal}
                        okText="ok"
                        cancelText="cancel"
                    >

                        <QRCode value={pdfUrl} />
                    </Modal>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};



export default SearchSeller;