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

    // 定义回调函数
    const handleToggleClick = (newState: boolean) => {
        // console.log("点击顶部newState", newState);
        // console.log("现在的isOpenMultifunctional", isOpenMultifunctional);
        setIsOpenMultifunctional(newState);
    };

    const handleToggleClickTwo = (newState: boolean) => {
        // console.log("点击侧边newState", newState);
        // console.log("现在的isOpenMultifunctional", isOpenMultifunctional);
        setTimeout(() => {
            setIsOpenMultifunctional(newState);
        },500)
    };

    // 返回的tsx
    return (
        <>
            <div className="home">
                <HometopCom
                    isTopOpen={isOpenMultifunctional}
                    onToggleClick={handleToggleClick}
                />
                <main className="container">
                    
                </main>
                <section className="bottom">
                    <div className="content">
                        <HomebottomCom />
                    </div>
                </section>
                <footer className='footer'>AI也会犯错,请核查重要内容.</footer>
                {
                    isOpenMultifunctional ? (
                        <MultifunctionalCom
                            isOpen={isOpenMultifunctional}
                            handleToggleClickTwo={handleToggleClickTwo}
                        />
                    ) : null
                }
            </div>
        </>
    );
}

export default HomeView;