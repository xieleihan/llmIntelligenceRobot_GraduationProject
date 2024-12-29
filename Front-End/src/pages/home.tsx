import '../style/home.scss';
import { useState } from 'react';

// 导入组件
import HometopCom from '../components/HomeTopcom';
import HomebottomCom from '../components/HomeBottomCom';

function HomeView() {
    // 定义React变量
    const [inputSendMessage, setInputSendMessage] = useState(''); // 输入框内容


    return (
        <>
            <div className="home">
                <HometopCom />
                <main className="container"></main>
                <section className="bottom">
                    <div className="content">
                        <HomebottomCom />
                    </div>
                </section>
                <footer className='footer'>AI也会犯错,请核查重要内容.</footer>
            </div>
        </>
    );
}

export default HomeView;