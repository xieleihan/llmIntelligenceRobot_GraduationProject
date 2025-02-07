// 导入样式
import '../../../style/Modules/Multifunctional/FilesPages.scss';

// 导入组件
import { NavBar, NoticeBar, WaterMark, Picker, Button, Toast, Dialog } from 'antd-mobile';

// 路由跳转
import { useNavigate } from "react-router-dom"

// 导入React
import { useState, useEffect } from "react";

// 导入Ant Design Mobile icon
import { DownlandOutline } from 'antd-mobile-icons'

// 导入文件类型数据
import { basicColumns } from './columns-data';

// 导入request请求
import { getFileUrl, getFileinfo } from '../../../api/request';

function FilePages() {
    // 定义文件列表(模拟)
    // const filesList = [
    //     {
    //         id: 1,
    //         filename: '这是文件名信息1',
    //         content: '# Hello Markdown\n\nThis is a **test** file.',
    //     },
    //     {
    //         id: 2,
    //         filename: '这是文件名信息2',
    //         content: '# Hello Markdown\n\nThis is a **test** file.',
    //     },
    //     {
    //         id: 3,
    //         filename: '这是文件名信息3',
    //         content: '# Hello Markdown\n\nThis is a **test** file.',
    //     }
    // ]

    // 获取当前时间戳变量
    const [timestamp,setTimestamp] = useState<number>(new Date().getTime());

    // 定义React变量
    const [visible, setVisible] = useState(false); // 是否显示选择器
    const [filesList, setFilesList] = useState<any[]>([]); // 文件列表
    const [value, setValue] = useState<string[]>(Array(filesList.length).fill("")); // 初始化数组
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null); // 记录当前操作的索引

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

    const updateFilesList = (newFiles: any[]) => {
        setFilesList(newFiles);
        setValue(Array(newFiles.length).fill(""));
    };

    useEffect(() => {
        setProps({ content: 'SouthAki' })

        // 获取文件信息
        getFileinfo({})
            .then((res) => {
                console.log('请求文件信息', res);
                setFilesList(res.data);
                updateFilesList(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [])

    const handleSelect = (index: number, selectedValue: string) => {
        const newValues = [...value]; // 复制数组
        newValues[index] = selectedValue; // 修改对应索引的值
        setValue(newValues); // 更新 state
    };

    return (
        <>
            <div className='filesPages'>
                <NavBar onBack={back}>情报文件</NavBar>
                <NoticeBar content={demoLongText} color='alert' />
                <div className="content">
                    {/* <div className="item">
                        <div className="left">
                            <div className="filename">这是文件名信息</div>
                            <div className="selectType">
                                <Button
                                    onClick={() => {
                                        setVisible(true)
                                        handleSelect(0, value[0])
                                    }}
                                >
                                    选择
                                </Button>
                                {
                                    value[0]==='' ? (
                                        <span>请选择</span>
                                    ) : (
                                            <span className='pick'>你当前选择了<span className='heightlight'>{value[0]}</span>格式的文件</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="right">
                            <DownlandOutline />
                        </div>
                    </div> */}
                    {filesList.map((item, index) => (
                        <div className="item" key={item.id}>
                            <div className="left">
                                <div className="filename">标题:{item.filename}</div>
                                <div className="selectType">
                                    <Button
                                        onClick={() => {
                                            setVisible(true)
                                            setVisibleIndex(index); // 记录当前选择的 item 索引
                                            handleSelect(index, value[index])
                                        }}
                                    >
                                        选择类型
                                    </Button>
                                    {
                                        value[index] === '' ? (
                                            <span className='pick'>请选择</span>
                                        ) : (
                                            <span className='pick'>你当前选择了<span className='heightlight'>{value[index]}</span>格式的文件</span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="right">
                                <DownlandOutline onClick={
                                    () => {
                                        // 当前点击的索引
                                        // console.log('当前点击的索引', index);
                                        // console.log(value[index])

                                        Dialog.confirm({
                                            content: '是否下载文件',
                                            title: '下载提示',
                                            onConfirm: () => {
                                                // 设置当前时间戳
                                                setTimestamp(new Date().getTime());

                                                // 请求下载文件
                                                getFileUrl(value[index], { filename: item.filename+"-" + timestamp, content: item.content })
                                                    .then((res) => {
                                                        // console.log('请求下载文件', res);
                                                        const str = JSON.stringify(res);
                                                        const obj = JSON.parse(str);
                                                        window.open(obj.url);
                                                    }).catch((err) => {
                                                        console.log(err.message);
                                                        Toast.show({
                                                            content: "请选择文件类型",
                                                            duration: 2000
                                                        })
                                                    })
                                            },
                                            onCancel: () => {
                                                Toast.show({
                                                    content: '取消下载',
                                                    duration: 2000
                                                })
                                            }
                                        })
                                    }
                                } />
                            </div>
                        </div>
                    ))}
                </div>
                <WaterMark {...props} />
            </div>
            <Picker
                columns={basicColumns}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                onConfirm={v => {
                    if (visibleIndex !== null) {
                        const newValues = [...value]; // 复制数组
                        newValues[visibleIndex] = String(v[0]) || ""; // 修改对应索引的值
                        setValue(newValues);
                    }
                    // console.log("这是选择器选择的值", v);
                }}
            />
        </>
    )
}

export default FilePages;