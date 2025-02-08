// 导入样式
import '../../../style/Modules/Multifunctional/Modules/ApplePay.scss';
// 导入图片
import apple from '../../../assets/icon/apple-fill.svg';
import appleHeightlight from '../../../assets/icon/apple-fill-heightlight.svg';

// 导入Ant design mobile组件
import { Button,Input } from 'antd-mobile';

function ApplePay() {
    return (
        <>
            <div className="applepay">
                <div className="top">
                    <img className='icon' src={apple} alt="" />
                    <span>Apple Pay</span>
                </div>
                <section className='main'>
                    <div className="item">
                        <span>账号:</span>
                        <Input className='input' placeholder="请输入账号" />
                    </div>
                    <Button className='btn'>
                        <img src={appleHeightlight} alt="" />
                        Pay
                    </Button>
                </section>
            </div>
        </>
    );
}

export default ApplePay;