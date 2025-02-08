// 导入样式
import '../../../style/Modules/Multifunctional/Modules/PayPal.scss';

// 导入Paypal @paypal/react-paypal-js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPal() {
    // 定义PayPal配置
    const initialOptions = {
        clientId: "test",
        currency: "USD",
        intent: "capture",
    };

    return (
        <>
            <div className="paypal">
                <PayPalScriptProvider deferLoading={true} options={initialOptions}>
                    <PayPalButtons style={{ layout: "horizontal" }} />
                </PayPalScriptProvider>
            </div>
        </>
    )
}

export default PayPal;