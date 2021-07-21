import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//引入配置
import { SignList_Columns } from "../../config/table-columns"
//api
import { Request } from '../../api'
//引入工具类
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {ConvertFomrData,toZip} from '../../utils'
import moment from 'moment'
import { Table, Button,message} from "antd";

class admin extends Component {
  state = {
    Columns: [],
    filteredInfo:null,
    sortedInfo:null,
    selectedRowKeys:[],
    table_Loade:false,
    dataSource:[],
    conditions:[]
  };
  //选择
  onSelectChange = selectedRowKeys =>{
    this.setState({ selectedRowKeys });
  }
  //查询
  handleChange  = async (pagination={page:1,pageSize:20}, filters={}, sorter={})=>{
    let {conditions} = this.state;
    conditions = {...pagination,...conditions,...filters}
    let formData = ConvertFomrData(conditions);
    this.setState({
      table_Loade:true
    })
    const result = await Request('Home/SearchSign',formData,'POST');
    if(result.status===0){//成功
      this.setState({
        dataSource:JSON.parse(result.data),
        table_Loade:false
      })
    }else{
      message.error("网络错误");
      this.setState({
        table_Loade:false
      })
    }
  }
  componentDidMount = () => {
    //判断用户
    let user = memoryUtils.user;
    if (!user || !user.loginid) {
      user = storageUtils.getUser();
    }
    let Columns = SignList_Columns(this);
    //设置数据
    this.setState({
        Columns: Columns,
    });
    this.handleChange();
  };
  //全选已上传的行
  onSelectDownLoad = (record,opt,key)=>{
    let newSelects = [];
    if(opt === "SELECT_DownLoad"){
        record.forEach(item=>{
            if(item[key]!=="" && item[key]!==null){
                newSelects.push(item.WxOpenid);
            }
        })
    }else if(opt==="SELECT_DownLoadNot"){
        record.forEach(item=>{
            if(item[key]==="" || item[key]===null){
                newSelects.push(item.WxOpenid);
            }
        })
    }
    this.setState({selectedRowKeys:newSelects})
  }
  DownLoadSign = async () => {
    //DownLoadSign
    //selectedRowKeys
    const {dataSource,selectedRowKeys} = this.state;
    if(selectedRowKeys.length===0){
      message.warn("请选择要下载的签名");
      return;
    }
    let filtersData = dataSource.filter((item)=>{
      if(selectedRowKeys.find(item2=>item.WxOpenid===item2)!==undefined){
        if(item.FileRoute!==null && item.FileRoute !==""){
          return true;
        }
      }
      return false;
    })
    if(filtersData===undefined || filtersData.length===0){
      message.warn("没有选择已上传的数据");
      return;
    }
    let DownUrls = filtersData.map(item=>{
      return item.FileRoute;
    })
    let loginids = filtersData.map(item=>{
      return item.loginid;
    })
    let Names = filtersData.map(item=>{
      return item.lastname;
    })
    let new_DownUrls = DownUrls.join(',');
    let new_loginids = loginids.join(',');
    let new_Names = Names.join(',');
    let formData = new FormData();
    formData.append("Ftps",new_DownUrls);
    formData.append("loginids",new_loginids);
    formData.append("Names",new_Names);
    const result = await Request('Home/getSignUrl',formData,'POST');
    if(result.status===0){
      //msg
      let urls =  result.data.split(',');
      let FileNames = [];
      for(let i=0;i<Names.length;i++){
        FileNames.push(loginids[i]+"_"+Names[i]);
      }
      toZip(urls,FileNames,"签名文件"+moment().format("YYYY-MM-dd HH:mm:ss"));
      message.success("成功");
    }else{
      message.error("网络错误");
    }
  };
  render() {
    const { Columns,selectedRowKeys,dataSource,table_Loade,conditions} = this.state;
    //获取用户信息
    let user = memoryUtils.user;
    //const {menuList} = this.state;
    if (!user || !user.loginid) {
      user = storageUtils.getUser();
    }
    if (!user || !user.loginid) {
      return <Redirect to="/Login" />;
    }
    //多选
    const rowSelection = {
        selectedRowKeys,
        columnWidth:15,
        onChange: this.onSelectChange,
        selections:[
            {
                key:'SELECT_ALL',
                text: '全选',
                onSelect:changableRowKeys=>{
                    this.setState({selectedRowKeys:changableRowKeys});
                }
            },
            {
                key: 'SELECT_DownLoad',
                text: '全选已下载',
                onSelect: changableRowKeys => {
                    this.onSelectDownLoad(dataSource,"SELECT_DownLoad","FileRoute");
                }
            },
            {
                key: 'SELECT_DownLoadNot',
                text: '全选未下载',
                onSelect: changableRowKeys => {
                    this.onSelectDownLoad(dataSource,"SELECT_DownLoadNot","FileRoute");
                }
            }
        ]
    }
    return (
      
      <div className="main">
        <div className="toolArea">
          
          <Button type="primary" style={{marginRight:'2%'}} onClick={() => this.DownLoadSign()}>
            下载签名
          </Button>
          <p style={{ textAlign: "left", fontSize: "22px" }}>当前查询条件:
            {(conditions.lastname===''||conditions.lastname===undefined)?'':'姓名:'+conditions.lastname+','}
            {(conditions.subcompanyname===''||conditions.subcompanyname===undefined)?'':'公司:'+conditions.subcompanyname+','}
          </p>
        </div>
        <Table
        rowSelection = {rowSelection}
          bordered
          rowKey="WxOpenid"
          sticky={true}
          columns={Columns}
          loading = {table_Loade}
          size="middle"
          dataSource={dataSource}
          pagination = {false}
          style={{width:'98%'}}
        ></Table>
      </div>
    );
  }
}
export default withRouter(admin);
