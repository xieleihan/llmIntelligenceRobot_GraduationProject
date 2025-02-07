// 导入图片
import visa from '../../../assets/icon/backIcon/visa.svg';
import mastercard from '../../../assets/icon/backIcon/mastercard.svg';
import AE from '../../../assets/icon/backIcon/ae.svg';
import unionPay from '../../../assets/icon/backIcon/unionPay.svg';
import discover from '../../../assets/icon/backIcon/discover-logo.svg';
import jcb from '../../../assets/icon/backIcon/jcb.svg';
import dinersClub from '../../../assets/icon/backIcon/diners-club.svg';
import applePay from '../../../assets/icon/backIcon/Applepay.svg';
import googlePay from '../../../assets/icon/backIcon/google-pay.svg';
import paypal from '../../../assets/icon/backIcon/paypal.svg';
import alipay from '../../../assets/icon/backIcon/alipay.svg';
import wechatPay from '../../../assets/icon/backIcon/WeChatPay.svg';
import yunPay from '../../../assets/icon/backIcon/yunPay.svg';
import alipayHK from '../../../assets/icon/backIcon/alipayhk.svg';
import boc from '../../../assets/icon/backIcon/boc.svg';
import hsoc from '../../../assets/icon/backIcon/hsoc.svg';
import st from '../../../assets/icon/backIcon/渣打.svg';

function PayFootercom() {
    // 底部左边图标区域
        const leftSvgList = [
            boc, hsoc, st
        ]
    
        // 底部右边图标区域
        const rightSvgList = [
            visa, mastercard, AE, unionPay, discover, jcb, dinersClub, applePay, googlePay, paypal, alipay, wechatPay, yunPay, alipayHK
        ]

    return (
        <>
            <footer className='footer'>
                <div className="imgBox">
                    <div className="left">
                        <div className="info">线下支付:</div>
                        <div className='imgSmallBox'>
                            {
                                leftSvgList.map((item, index) => {
                                    return (
                                        <img className='icon' src={item} alt="" key={index} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className='info'>支援线上付款方式:</div>
                        {
                            rightSvgList.map((item, index) => {
                                return (
                                    <img className='icon' src={item} alt="" key={index} />
                                )
                            })
                        }
                    </div>
                </div>
                <span className='copyright'>Copyright© 2025 SouthAki | 交易安全由卡巴斯基持续保障</span>
            </footer>
        </>
    )
}

export default PayFootercom;