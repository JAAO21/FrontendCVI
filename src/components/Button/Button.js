import { Button } from 'antd';

const MyButton = ({ onClick, name, styleButton, htmlType }) => {

    return (
        <Button type="primary" size={'large'} onClick={onClick} htmlType={htmlType} className={styleButton}>
            {name}
        </Button>
    )
}

export default MyButton;