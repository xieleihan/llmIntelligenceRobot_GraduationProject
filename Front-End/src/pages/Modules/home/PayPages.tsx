// 导入样式
import '../../../style/Modules/Multifunctional/PayPages.scss';

// 导入Ant Design Mobile组件
import { NavBar } from 'antd-mobile';

// 路由跳转
import { useNavigate } from "react-router-dom"

// 导入组件
import PayMaincom from '../../../components/Modules/payCom/PayMaincom';
import PayFootercom from '../../../components/Modules/payCom/PayFootercom';
import PayHeadercom from '../../../components/Modules/payCom/PayHeadercom';

// 导入React
import { useState } from 'react';

function PayPages() {
    // 定义React变量
    const [is,setIs] = useState(false);

    // 定义路由跳转
    const navigate = useNavigate();

    // 定义返回函数
    const back = () => {
        // console.log('返回');
        navigate('/home');
    }

    // 定义回调函数
    const callback = (value: boolean) => {
        setIs(value);
        // console.log(value);
    }

    return (
        <>
            <div className="pay">
                <NavBar className='navbar' onBack={back}>支付</NavBar>
                <div className="container">
                    <PayHeadercom callback={callback} />
                    <main className='main'>
                        <PayMaincom callbackMsg={is} />
                    </main>
                    <PayFootercom />
                </div>
            </div>
        </>
    )
}

export default PayPages;