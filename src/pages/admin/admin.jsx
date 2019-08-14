import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
//引入布局组件
import { Layout } from 'antd'


import memoryUtils from '../../utils/memoryUtils'
import LeftNav from "../../components/left-nav";
import Header from "../../components/header";

const {  Footer, Sider, Content } = Layout;

/* 
后台管理路由组件
*/
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user
    
    // 如果当前用户没有登陆, 自动跳转到login
    if (!user._id) {
      // 在render()中自动跳转
      return <Redirect to="/login" />
      // 在事件回调函数中自动跳转: history.push()
    }

    return (
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin:10 ,background:'white' }}>Content</Content>
          <Footer style={{textAlign:'center', color:'#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
