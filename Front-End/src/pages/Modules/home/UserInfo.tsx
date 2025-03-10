import '../../../style/Modules/Multifunctional/UserInfo.scss';

// 导入头像图片
import avater from '../../../assets/images/avater.png';
import vip from '../../../assets/icon/VIP.svg'; // 导入VIP图标
import vipHeightLight from '../../../assets/icon/VIP-heightlight.svg'; // 导入VIP高亮图标

// 导入ant design mobile组件
import { SystemQRcodeOutline, LinkOutline, EditSOutline } from 'antd-mobile-icons';

// 导入ant design mobile
import { Divider, Popup, Modal } from 'antd-mobile'

// 导入组件
import ReturnBasebtn from '../../../components/Modules/base/returnBaseBtn';
import PersonalGithubInfo from '../../../components/Modules/UserInfo/PersonalGithubInfo';

// 导入React
import { useState,useEffect } from 'react';

// 使用React Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index';

// 导入请求
import { userinfo } from '../../../api/request';

function UserInfo() {
    // 定义React变量
    const [popBottomUp, setPopBottomUp] = useState(false); // 定义底部弹出框
    // const [popCenterUp, setPopCenterUp] = useState(false); // 定义中部弹出框
    const [useravater, setUseravater] = useState(avater); // 用户头像

    // 定义按钮配置
    const buttonConfig = {
        backgroundColor: 'rgba(0,0,0,.5)',
        goToUrlStr: '/home',
        iconColor: true,
    };

    const addressInfo = useSelector((state: RootState) => state.general.addressInfo); // 获取地址信息

    useEffect(() => {
        userinfo({
            username: sessionStorage.getItem('username'),
            isDelete: 0
        }).then((res) => {
            setUseravater(res.data[0].useravater);
        })
    },[])

    return (
        <>
            <div className='userInfo'>
                {/* 分享弹出框 */}
                <Popup
                    visible={popBottomUp}
                    onMaskClick={() => setPopBottomUp(false)}
                    onClose={() => setPopBottomUp(false)}
                    position='bottom'
                    showCloseButton
                    bodyStyle={{
                        height: '30dvh',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    }}
                ></Popup>
                
                <ReturnBasebtn
                    buttonConfig={buttonConfig}
                />
                <div className="background">
                    <img src="https://picsum.photos/1920/1080.webp" alt="" />
                    <div className="avater">
                        <div className="avaterBox">
                            <img className='avaterImg' src={useravater} alt="" />
                            <img className='vip' src={vipHeightLight} alt="" />
                        </div>
                    </div>
                </div>
                <div className="qrCode">
                    <LinkOutline onClick={
                        () => {
                            setPopBottomUp(true)
                        }
                    } />
                    <SystemQRcodeOutline
                        onClick={
                            () => {
                                {/* 二维码弹出框 */ }
                                // setPopCenterUp(true)
                                Modal.show({
                                    content: '',
                                    closeOnMaskClick: true,
                                    showCloseButton: true,
                                })
                            }
                        }
                    />
                </div>
                <div className="name">
                    <div className="username">
                        {sessionStorage.getItem('username')}
                        <div className="inputInfo">
                            <EditSOutline />
                            修改信息
                        </div>
                    </div>
                    <div className="ipaddress">
                        IP属地:<span>{addressInfo}</span>
                    </div>
                </div>
                <Divider />
                <div className="content">
                    <PersonalGithubInfo />
                </div>
            </div>
        </>
    );
}

export default UserInfo;