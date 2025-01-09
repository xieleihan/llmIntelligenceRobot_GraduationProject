import { useState, useEffect } from "react";
import './App.scss';
import logo from "./assets/icon/peacock_flat.png";

// 路由跳转
import { Outlet, useNavigate } from "react-router-dom";

// 导入请求
import { getUserIp } from "./api/request";

// 使用React Redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/index';
import { setIpInfo } from './store/generalStore';

function App() {
  const [isStartPage, setIsStartPage] = useState(false); // 控制启动页显示与隐藏
  const [isFunctionPage, setIsFunctionPage] = useState(true); // 控制功能页显示与隐藏
  const [userData, setUserData] = useState(false); // 存储子组件传递的用户数据

  // 初始化Redux
  const dispatch = useDispatch<AppDispatch>();
  const ipInfo = useSelector((state: RootState) => state.general.ipInfo);

  // 初始化导航
  const navigate = useNavigate();

  // 回调函数，用于接收子组件传递的数据
  const handleDataFromChild = (data:boolean) => {
    console.log("从子组件接收到的数据:", data);
    setUserData(data); // 更新父组件的状态
    setIsFunctionPage(userData); // 控制功能页显示与隐藏
  };

  useEffect(() => {
    // 获取用户IP地址
    getUserIp({}).then(res => {
      let str = JSON.stringify(res);
      let obj = JSON.parse(str);
      let address = obj.adcode.o
      console.warn('当前用户访问的IP地址信息:', obj.ipinfo.text);
      console.log('当前用户位置信息:', address);
      // 更新Redux
      dispatch(setIpInfo(obj.ipinfo.text));
      // 我查看是否写入
      console.log('Redux中的IP地址信息:', ipInfo);
    }).catch(err => {
      console.log('获取用户IP地址失败:', err);
    });
    const timer = setTimeout(() => {
      setIsStartPage(true);
    }, 4200)

    return () => {
      clearTimeout(timer); // 清理定时器，防止组件卸载后继续更新状态
    }
  }, [])

  return (
    <>
      <div className="App">
        {
          isStartPage ? (
            isFunctionPage ? (
              <>
                <header>
                  <img src={logo} alt="" />
                  <span>SouthAki の Intelligence Robot</span>
                  <p className="info">探索未知之境</p>
                </header>
                <main>
                  <button onClick={() => {
                    console.log('跳转到登录页面')
                    setIsFunctionPage(false)
                    navigate('/login')
                  }} className="btn">登录</button>
                  <button onClick={() => {
                    console.log('跳转到注册页面')
                    setIsFunctionPage(false)
                    navigate('/register')
                  }} className="btn">注册</button>
                </main>
                <footer>
                  <p>Copyright© 2024 SouthAki,All rights reserved.</p>
                </footer>
              </>
            ) : (
                // 从子组件获取数据
                <Outlet context={{ handleDataFromChild }} />
            )
          ) : (
            <>
              <div className="startPage">
                <div className="itemBox">
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="item"></div>
                  <div className="item"></div>
                </div>
                <p className="title">载入系统中...</p>
              </div>
            </>)
        }
      </div>
    </>
  )
}

export default App
