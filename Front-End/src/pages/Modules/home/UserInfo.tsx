import '../../../style/Modules/Multifunctional/UserInfo.scss';

// 导入头像图片
import avater from '../../../assets/images/avater.png';

// 导入ant design mobile组件
import { SystemQRcodeOutline, LinkOutline, EditSOutline } from 'antd-mobile-icons';

// 导入ant design mobile
import { Divider } from 'antd-mobile'

// 导入组件
import ReturnBasebtn from '../../../components/Modules/base/returnBaseBtn';

function UserInfo() {
    const buttonConfig = {
        backgroundColor: 'rgba(0,0,0,.5)',
        goToUrlStr: '/home',
        iconColor: true,
    };
    return (
        <>
            <div className='userInfo'>
                <ReturnBasebtn
                    buttonConfig={buttonConfig}
                />
                <div className="background">
                    <img src="https://picsum.photos/1920/1080.webp" alt="" />
                    <div className="avater">
                        <img src={avater} alt="" />
                    </div>
                </div>
                <div className="qrCode">
                    <LinkOutline />
                    <SystemQRcodeOutline />
                </div>
                <div className="name">
                    <div className="username">
                        南秋SouthAki
                        <div className="inputInfo">
                            <EditSOutline />
                            修改信息
                        </div>
                    </div>
                    <div className="ipaddress">
                        IP属地:
                    </div>
                </div>
                <Divider />
                <div className="content"></div>
            </div>
        </>
    );
}

export default UserInfo;