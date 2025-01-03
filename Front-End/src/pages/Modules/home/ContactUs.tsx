import '../../../style/Modules/Multifunctional/ContactUs.scss';

// 导入ant design mobile组件
import { NavBar, Footer } from 'antd-mobile';

// 路由跳转
import { useNavigate } from "react-router-dom"

function ContactUs() {
    // 定义路由跳转
    const navigate = useNavigate();

    // 定义返回函数
    const back = () => {
        navigate('/home');
    }

    return (
        <>
            <div className="contactUs">
                <NavBar
                    className='navBar'
                    back='返回' onBack={back}>
                    联系我们
                </NavBar>
                <section className='content'></section>
                <Footer
                    className='footer'
                    content='Copyright© 2024 SouthAki, All rights reserved.'></Footer>
            </div>
        </>
    );
}

export default ContactUs;