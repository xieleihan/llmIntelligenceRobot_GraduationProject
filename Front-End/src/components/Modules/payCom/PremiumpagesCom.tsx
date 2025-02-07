// 导入样式
import '../../../style/Modules/Multifunctional/Modules/PremiumPagescom.scss';

// 导入选择数据
import { basicColumns } from './colmns-data';

// 导入Ant Design Mobile组件
import { Picker, Button } from 'antd-mobile';

// 导入React
import { useState } from 'react';

// 导入组件
import CardInput from './CardInput.tsx';
import ApplePay from './ApplePay.tsx';
import GooglePay from './GooglePay.tsx';
import PayPal from './PayPal.tsx';
import AliPay from './AliPay.tsx';
import WechatPay from './WechatPay.tsx';
import UnionPay from './UnionPay.tsx';
import AlipayHk from './AlipayHk.tsx';

function PremiumpagesCom() {
    // 定义React变量
    const [visible, setVisible] = useState(false); // 是否显示选择器
    const [value, setValue] = useState<(string | null)[]>([]); // 选择器的值
    const [str, setStr] = useState('未选择'); // 选择器的值
    
    const renderContent = () => {
        switch (value[0]) {
            case 'card':
                return <CardInput />;
            case 'ap':
                return <ApplePay />;
            case 'gp':
                return <GooglePay />;
            case 'pp':
                return <PayPal />;
            case 'ali':
                return <AliPay />;
            case 'wx':
                return <WechatPay />;
            case 'up':
                return <UnionPay />;
            case 'alihk':
                return <AlipayHk />;
        }
    }

    return (
        <>
            <div className="premiumPagesCom">
                <div className="select">
                    <span className='ctitle'>付款方式:</span>
                    <Button
                        onClick={() => {
                            setVisible(true)
                        }}
                        className='btn'
                    >
                        选择
                    </Button>
                    <span>{str}</span>

                    <Picker
                        columns={basicColumns}
                        visible={visible}
                        onClose={() => {
                            setVisible(false)
                        }}
                        value={value}
                        onConfirm={v => {
                            setValue(v as (string | null)[]);
                            // 选中的索引
                            // console.log(v,basicColumns);
                            const cacheIndex = basicColumns[0].findIndex((item) => item.value === v[0]);
                            // 设置值
                            setStr(basicColumns[0][cacheIndex].label);
                        }}
                    />
                </div>
                <div className="pages">
                    <div className="pages-content">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PremiumpagesCom;