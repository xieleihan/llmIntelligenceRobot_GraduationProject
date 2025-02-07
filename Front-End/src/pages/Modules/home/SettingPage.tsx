// 导入样式
import '../../../style/Modules/Multifunctional/SettingsPages.scss';

// 导入Ant Design Mobile组件
import { NavBar } from 'antd-mobile';

// 路由跳转
import { useNavigate } from "react-router-dom"

function SettingPage() {

    // 定义路由跳转
    const navigate = useNavigate();

    // 定义返回函数
    const back = () => {
        // console.log('返回');
        navigate('/home');
    }

    return (
        <>
            <div className="setting">
                <NavBar onBack={back}>设置</NavBar>
            </div>
        </>
    );
}

export default SettingPage;