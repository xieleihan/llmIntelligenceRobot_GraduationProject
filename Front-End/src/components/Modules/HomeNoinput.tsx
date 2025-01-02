// 导入图标文件
import logo from "../../assets/icon/peacock_flat.png";
import github from '../../assets/icon/github-heightlight.svg';

// 导入样式文件
import '../../style/Modules/HomeNoinput.scss';

// 导入ant design mobile组件
import { Popover } from "antd-mobile";
import { CloseOutline } from 'antd-mobile-icons'

// 导入React
import { useState } from "react";

function HomeNoinput() {
    // 定义React变量
    const [isOpenPopver, setIsOpenPopver] = useState(false); // 是否打开气泡框

    return (
        <>
            <div className="homeNoinput">
                <div className="content-noinputdisplay">
                    <img className="img-nid" src={logo} alt="" />
                    <p className="title">
                        我是
                        <Popover
                            content={
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img style={{
                                        marginRight: '10px'
                                    }} src={github} alt="" />
                                    <div style={{
                                        marginRight: '10px'
                                    }}>
                                        点我去到
                                        <br/>
                                        南秋SouthAki的Github
                                    </div>
                                    <div
                                        onClick={() => {
                                            setIsOpenPopver(false)
                                        }}
                                    >
                                        <CloseOutline />
                                    </div>
                                </div>
                            }
                            placement='top-start'
                            mode='dark'
                            visible={isOpenPopver}
                        >
                            <span
                                className="devPeople"
                                onClick={() => {
                                    setIsOpenPopver(true)
                                }}
                            >
                                南秋SouthAki
                            </span>
                        </Popover>
                        开发的智能助手,很高兴见到你!🎉🎉🎉
                    </p>
                    <p className="desc">我具体能帮你跟踪GitHub开源项目的具体情况,并且生成一份总结,发到你邮箱等许多操作,快来试试吧!</p>
                </div>
            </div>
        </>
    );
}

export default HomeNoinput;