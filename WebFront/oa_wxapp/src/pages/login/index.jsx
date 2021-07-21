import React, { Component } from 'react'
import {Redirect,withRouter} from 'react-router-dom'
import {Form,Input,Button,message} from 'antd'
import {UserOutlined,LockOutlined} from '@ant-design/icons'
import './login.less'
import logo from '../../assets/images/999.png';
import { Request } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
const Item = Form.Item;
class login extends Component {
    formRef = React.createRef();
    handleSubmit = async  (event)=>{
        event.preventDefault();
        const form = this.formRef.current;
        const {username,password} = form.getFieldsValue(true);
        var formData = new FormData();
        formData.append("loginid",username);
        formData.append("password",password);
        const error = form.getFieldsError();
        if(error.find(item=>item.errors.length>0)){
            return;
        }
        //{status:0,data:user}
        const result = await Request('Home/FrontWebLogin',formData,'POST');
        if(result.status===0){//登录成功
            if(result.data==null || result.data===""){
                message.warn("账号或密码错误");
                return;
            }
            message.success("登录成功");
            //保存user
            var user = JSON.parse(result.data);
            //const user = result.data.G_UserM[0];
            //user.Roles = user.Roles.replaceAll('#','');
            memoryUtils.user = user;//将当前登录用户保存到内存中
            //保存到本地
            storageUtils.saveUser(user);
            this.props.history.replace('/Admin');
        }else if(result.status===1){//没有找到账号密码
            message.error("账号密码错误");
        }else{
            message.error("登录失败");
            //测试
            const user = {CName:'林炜',OAAccount:'100139'}
            memoryUtils.user = user;//将当前登录用户保存到内存中
            storageUtils.saveUser(user);
            this.props.history.replace('/Page/admin');
        }
    }
    render() {
        const user = storageUtils.getUser();
        if(user && user.OAAccount){
            memoryUtils.user = user;//将当前登录用户保存到内存中
            return <Redirect to='/Admin' />
        }
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo" className="Loginlogo"></img>
                    <h1>常发通微信小程序后台管理系统</h1>
                </div>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form  ref={this.formRef} onSubmitCapture={this.handleSubmit}>
                        <Item name="username" rules={[
                            {required:true,message:'请输入用户名'},
                            {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是数字、字母、下划线、' },
                            {whitespace:true,message:'账号不能为空格'}
                        ]} >
                            <Input placeholder="账号" prefix={<UserOutlined style={{color:'rgba(0,0,0,0.25)'}}></UserOutlined>} />
                        </Item>
                        <Item name="password" rules={[
                            {required:true,message:'请输入密码'},
                            {pattern:/^[a-zA-Z0-9_@]+$/,message:'密码名必须是数字、字母、下划线、@符号' },
                            {whitespace:true,message:'密码不能为空格'}
                        ]} >
                            <Input.Password placeholder="密码" prefix={<LockOutlined style={{color:'rgba(0,0,0,0.25)'}} />} />
                        </Item>
                        <Item>
                            <Button className="login-button" type="primary" htmlType="submit">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default withRouter(login);