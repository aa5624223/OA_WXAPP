import {Tag} from 'antd'
import moment from 'moment'
import { getColumnSearchProps,getColumnSelectProps} from "../utils";
export const SignList_Columns = (_this) => {
  //let filteredInfo = _this.state.filteredInfo;
  //let sortedInfo = _this.state.sortedInfo;
  //filteredInfo = filteredInfo || {};
  //sortedInfo = sortedInfo || {};
  return [
    {
      title:"工号",
      dataIndex:"loginid",
      key: "lastname",
      width: 80,
      fixed: "left",
      ...getColumnSearchProps('loginid',_this),
    },
    {
      title: "姓名",
      dataIndex: "lastname",
      key: "lastname",
      width: 80,
      fixed: "left",
      ...getColumnSearchProps('lastname',_this),
    },
    {
      title:'公司',
      dataIndex: "subcompanyname",
      key: "subcompanyname",
      width: 120,
      fixed: "left",
      ...getColumnSearchProps('subcompanyname',_this),
    },
    {
      title: "签名上传时间",
      dataIndex: "FileTime",
      key: "FileTime",
      fixed: "left",
      width: 80,
      render:(val)=>{
        if(val ==="0001-01-01T00:00:00"){
          return ""
        }else{
          return moment(val).format("YYYY-MM-DD HH:ss:mm");
        }
      }
    },
    {
      title: "签名",
      dataIndex: "FileRoute",
      key: "FileRoute",
      width: 80,
      fixed: "left",
      ...getColumnSelectProps('FileRoute',_this,[{key:'已上传',val:'download'},{key:'未上传',val:'downloadNot'}]),
      render: (val) => {
        if (val === undefined || val === "" || val === null) {
          return <Tag color="red">未上传</Tag>
        } else {
          return <Tag color="green">已上传</Tag>
        }
      },
    },
  ];
};
