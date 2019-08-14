/*
用户登陆的路由组件
 */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'

import { saveUser } from '../../utils/storageUtils'
import { reqLogin } from '../../api'
import './login.less'
import logo from './images/logo.png'
import memoryUtils from '../../utils/memoryUtils'

const Item = Form.Item

 class Login extends Component {
  handleSubmit = e => {
    // 阻止事件默认行为(提交表单)
    e.preventDefault()

  // 进行表单的统一校验
  this.props.form.validateFields(async (err, values) => {
    if (!err) { // 校验成功
      // alert('校验成功, 发送登陆的ajax请求')
      // try {} catch (error) {}
      const result = await reqLogin(values)
      if (result.status===0) { // 登陆请求成功
        // 得到user
        const user = result.data
        // 保存user
        // 保存到local
        // localStorage.setItem('user_key', JSON.stringify(user))
        saveUser(user)
        // 保存到内存
        memoryUtils.user = user

        // 跳转到admin  location/match/history
        this.props.history.replace('/')
      } else { // 登陆请求失败
        message.error(result.msg)
      }
    }
  })
  }


  //密码验证
  validatePwd=(rules,value,callback)=>{
    value = value.trim()
    if(!value){
      callback('密码必须输入')
    }else if (value.length<4){
      callback('密码必须大于四位')
    }else if (value.length > 12){
      callback('密码必须小于十二位')
    }else if (!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('重新输入符合规格的密码')
    }else{
      callback()
    }
  }
  render () {

      // 如果当前用户已经登陆, 自动跳转到admin
    if (memoryUtils.user._id) {
      return <Redirect to="/"></Redirect>
    }

    const getFieldDecorator = this.props.form.getFieldDecorator
    return (
      <div className="login">
          <div className = "login-header">
              <img src={logo} alt="logo"/>
              <h2>后台管理系统</h2>
          </div>
          <div className="login-content">
              <h1>登陆界面</h1>  
              <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>

              {
                getFieldDecorator('username', { //配置对象: 属性名是一些特定名称   options
                  initialValue: 'admin',//设置默认
                  rules:// 配置用户
                   [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    {  min:4 ,message:'最小输入四位'},
                    {  max:12 ,message:'最大输入12位'},
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '',//设置默认
                  rules: [ // 自定义密码验证
                    { validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登  陆
              </Button>
            </Form.Item>
          </Form>
          </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(Login)   // 组件名: 'Form(Login)'

export default WrappedLoginForm