import '../style/home.scss';
import { useState } from 'react';

// 导入组件
import HometopCom from '../components/HomeTopcom'; // 顶部组件
import HomebottomCom from '../components/HomeBottomCom'; // 底部组件
import MultifunctionalCom from '../components/MultifunctionalCom'; // 侧边栏组件
import HomeNoinput from '../components/Modules/HomeNoinput'; // 当我输入框从未输入的时候展示的提示组件
import HomeYesinput from '../components/Modules/HomeYesinput'; // 当输入框发送第一次消息后展示的组件

interface arrayItem{
    type: string,
    content: string
}

function HomeView() {
    // 定义React变量
    // const [inputSendMessage, setInputSendMessage] = useState(''); // 输入框内容
    const [isOpenMultifunctional, setIsOpenMultifunctional] = useState(false); // 是否打开多功能按钮
    const [dataArray, setDataArray] = useState<arrayItem[]>([]); // 数据数组

    // 定义回调函数
    // 顶部的回调函数
    const handleToggleClick = (newState: boolean) => {
        // console.log("点击顶部newState", newState);
        // console.log("现在的isOpenMultifunctional", isOpenMultifunctional);
        setIsOpenMultifunctional(newState);
    };

    // 侧边栏的回调函数
    const handleToggleClickTwo = (newState: boolean) => {
        // console.log("点击侧边newState", newState);
        // console.log("现在的isOpenMultifunctional", isOpenMultifunctional);
        setTimeout(() => {
            setIsOpenMultifunctional(newState);
        },500)
    };

    // 底部的回调函数
    const handleToggleClickThree = (newState:arrayItem) => {
        // console.log("点击底部newState", newState);
        setDataArray(prevDataArray => [...prevDataArray, newState]);
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
                    {
                        dataArray.length === 0 ? (
                            <HomeNoinput />
                        ) : (
                                <HomeYesinput
                                    dataArray={dataArray}
                                />
                        )
                    }
                </main>
                <section className="bottom">
                    <div className="content">
                        <HomebottomCom
                            handleClickThree={handleToggleClickThree}
                        />
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