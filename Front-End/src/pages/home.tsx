import '../style/home.scss';
import { useState } from 'react';

// 导入组件
import HometopCom from '../components/HomeTopcom';
import HomebottomCom from '../components/HomeBottomCom';
import MultifunctionalCom from '../components/MultifunctionalCom';

function HomeView() {
    // 定义React变量
    const [inputSendMessage, setInputSendMessage] = useState(''); // 输入框内容
    const [isOpenMultifunctional, setIsOpenMultifunctional] = useState(false); // 是否打开多功能按钮

    const handleToggleClick = (newState:boolean) => {
        setIsOpenMultifunctional(newState);
    };


    return (
        <>
            <div className="home">
                <HometopCom onToggleClick={handleToggleClick} />
                <main className="container"></main>
                <section className="bottom">
                    <div className="content">
                        <HomebottomCom />
                    </div>
                </section>
                <footer className='footer'>AI也会犯错,请核查重要内容.</footer>
                {
                    isOpenMultifunctional ? (
                        <MultifunctionalCom />
                    ) : null
                }
            </div>
        </>
    );
}

export default HomeView;