// 导入样式
import '../../../style/Modules/Multifunctional/FilesPages.scss';

// 导入组件
import { NavBar, NoticeBar, WaterMark, Picker, Button } from 'antd-mobile';

// 路由跳转
import { useNavigate } from "react-router-dom"

// 导入React
import { useState, useEffect } from "react";

// 导入Ant Design Mobile icon
import { DownlandOutline } from 'antd-mobile-icons'

import { basicColumns } from './columns-data'

function FilePages() {
    // 定义React变量
    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState<(string | null)[]>([''])

    // 定义路由跳转
    const navigate = useNavigate();

    // 定义返回函数
    const back = () => {
        // console.log('返回');
        navigate('/home');
    }

    // 定义长文本
    const demoLongText = '打造全世界人人都能受益的通用人工智能';

    const textProps = {
        content: 'Ant Design Mobile',
    }

    const [props, setProps] = useState<{ [key: string]: any }>(textProps)

    useEffect(() => {
        setProps({ content: 'SouthAki' })
    }, [])

    return (
        <>
            <div className='filesPages'>
                <NavBar onBack={back}>情报文件</NavBar>
                <NoticeBar content={demoLongText} color='alert' />
                <div className="content">
                    <div className="item">
                        <div className="left">
                            <div className="filename">这是文件名信息</div>
                            <div className="selectType">
                                <Button
                                    onClick={() => {
                                        setVisible(true)
                                    }}
                                >
                                    选择
                                </Button>
                                {
                                    value[0]==='' ? (
                                        <span>请选择</span>
                                    ) : (
                                            <span className='pick'>你当前选择了<span className='heightlight'>{value}</span>格式的文件</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="right">
                            <DownlandOutline />
                        </div>
                    </div>
                </div>
                <WaterMark {...props} />
            </div>
            <Picker
                columns={basicColumns}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                value={value}
                onConfirm={v => {
                    setValue(v as (string | null)[])
                    // console.log("这是选择器选择的值", v);
                }}
            />
        </>
    )
}

export default FilePages;