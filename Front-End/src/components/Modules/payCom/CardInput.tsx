import '../../../style/Modules/Multifunctional/Modules/CardInput.scss'; // 导入样式

// 导入Ant Design Mobile组件
import { Input, Button } from 'antd-mobile';

// 导入React
import { useState } from 'react';

// 导入图片
import visa from '../../../assets/icon/backIcon/visa.svg';
import mastercard from '../../../assets/icon/backIcon/mastercard.svg';
import AE from '../../../assets/icon/backIcon/ae.svg';
import unionPay from '../../../assets/icon/backIcon/unionPay.svg';
import discover from '../../../assets/icon/backIcon/discover-logo.svg';
import jcb from '../../../assets/icon/backIcon/jcb.svg';
import dinersClub from '../../../assets/icon/backIcon/diners-club.svg';

function CardInput() {
    // 定义React变量
    const [cardNumber, setCardNumber] = useState(''); // 卡号
    const [validity, setValidity] = useState(''); // 有效期
    const [cvv, setCvv] = useState(''); // CVV
    const [cardType, setCardType] = useState(''); //卡片类型

    // 定义图片数组
    const imgList = [
        visa,mastercard,AE,unionPay,discover,jcb,dinersClub
    ]

    return (
        <>
            <div className="cardInput">
                <div className="imgBox">
                    {
                        imgList.map((item, index) => {
                            return (<img className='icon' src={item} alt={String(index)} />)
                        })
                    }
                </div>
                <div className="item">
                    <span className='itemtitle'>卡号:</span>
                    <Input
                        className='input'
                        type='number'
                        placeholder='请输入卡号'
                        maxLength={18}
                        onChange={(e) => {
                            setCardNumber(e)
                        }}
                    />
                </div>
                <div className="item">
                    <span className='itemtitle'>有效期:</span>
                    <Input
                        className='input'
                        type='number'
                        placeholder='MM/YY'
                        maxLength={5}
                        onChange={(e) => {
                            setValidity(e)
                        }}
                    />
                </div>
                <div className="item">
                    <span className='itemtitle'>CVV:</span>
                    <Input
                        className='input'
                        type='number'
                        placeholder='请输入CVV'
                        maxLength={4}
                        onChange={(e) => {
                            setCvv(e)
                        }}
                    />
                </div>
            </div>
            <Button className='pbtn' color='primary' onClick={() => {
                console.log(cardNumber,validity,cvv)
            }}>支付</Button>
        </>
    )
}

export default CardInput; // 导出CardInput组件