

import { Table, Input, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, QrcodeOutlined } from '@ant-design/icons'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import QRCode from "react-qr-code";
import ModalAntd from '../../../components/Modal/Modal'
import GetCVI from '../../../services/getCVI';

import Logo from '../../../assests/logo/logoCvi.jpg';

import './index.css'
import { CSVLink } from 'react-csv';

const { Search } = Input;
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const SearchSeller = () => {
    const [cvi, setCVI] = useState();
    const [seller, setSeller] = useState()
    const [pdfUrl, setPdfUrl] = useState('');
    //const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const showModal = (data) => {
        setOpen(true)
        console.log(data?.id, 'vacio')

        GetCVI({ atribute: `api/images/findKey?key=${data?.identificationNumber}.pdf` }).then(data => {
            console.log(data.find[0].url)
            setPdfUrl(data.find[0].url)
        })



    };

    const hideModal = () => {
        setOpen(false);
    };

    const UpdateStateSeller = (data) => {
        const valueData = {
            id: data.id,
            state: false
        }

        fetch(`http://localhost:3500/seller/updateStateSellers`, {
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
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend']
        },
        {
            title: 'Apellido',
            dataIndex: 'firstLastName',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend']
        },
        {
            title: 'Nacionalidad',
            dataIndex: 'nationality',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend']
        },
        {
            title: 'Tipo de identificación',
            dataIndex: 'identificationType',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend']
        },
        {
            title: 'Numero de identificación',
            dataIndex: 'identificationNumber',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Edad',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Genero',
            dataIndex: 'gender',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Vendedor',
            dataIndex: 'type_seller',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Ubicación',
            dataIndex: 'location_seller',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortDirections: ['descend']
        },
        {
            title: 'Prodcuto',
            dataIndex: 'product',
            defaultSortOrder: 'descend',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name?.length - b.name?.length,
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
    console.log(cvi)

    const onSearch = (value) => {
        getData(`seller?identificationNumber=${value}`)
    }

    return (
        <div>
            <div className="containerImgSearchSeller">
                <img className="imgLogocontainerImgSearchSeller" src={Logo} />
            </div>
            <Search
                placeholder="# de identificación"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
            <div >
                <div><CSVLink
                    data={cvi?.sellers?.map((d, i) => ({ ...d, key: d.id })) || []}
                    onClick={() => {
                        console.log("clicked")
                    }}
                    
                >
                    Download me
                </CSVLink></div>

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
            </div>
        </div>
    )
}

export default SearchSeller;