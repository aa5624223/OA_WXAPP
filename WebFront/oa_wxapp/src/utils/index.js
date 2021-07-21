import {Input,Space,Button, Checkbox,Row} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
//批量下载文件
import JSZip from 'jszip'
import FileSaver from 'file-saver'

import moment from 'moment'
//将Json对象转为formData
export const ConvertFomrData = (jsons) => {
    let formData1 = new FormData();
    Object.keys(jsons).forEach((key) => {
      if (typeof jsons[key] === "object") {
        if (jsons[key] !== null &&jsons[key] !== undefined &&jsons[key] !== "") {
            for(let i=0;i<jsons[key].length;i++){
                let str = "";
                if(i!==jsons[key].length-1){
                  str += jsons[key][i]+",";
                }else{
                  str += jsons[key][i];
                }
                formData1.append(key,str);
            }
        }
      } else {
        formData1.append(key, jsons[key]);
      }
    });
    return formData1;
  };

export const getColumnSearchProps = (dataIndex,_this)=>({
    filterDropdown:({setSelectedKeys,selectedKeys,confirm,clearFilters })=>(
        <div style={{padding:8}}>
            <Input
            ref={node => {
                _this.searchInput = node;
            }}
            placeholder={`输入查询条件`}
            value = {selectedKeys[0]}
            onChange={e => {
                _this.state.conditions[dataIndex] = e.target.value;
                return setSelectedKeys(e.target.value ? [e.target.value] : [])
            }}
            onPressEnter={() => _this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                type="primary"
                onClick={() => _this.handleChange()}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
                >查询</Button>
                <Button
                onClick={() => {
                    _this.state.conditions[dataIndex] = "";
                    _this.handleChange()
                    }
                }
                size="small"
                style={{ width: 90 }}
                >重置</Button>
            </Space>
        </div>
    ),
    filterIcon:filtered =><SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    
    onFilterDropdownVisibleChange:visible =>{
        if (visible) {
            setTimeout(() => _this.searchInput.select(), 100);
          }
    },
    render:text=>
        _this.state.searchedColumn === dataIndex ?(
            <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[_this.state.searchText]}
      autoEscape
      textToHighlight={text ? text.toString() : ''}
    />
    ):(
        text
    )
})
/**
 * 调用这个方法的组件必须有
 * handleChange方法 用于查询数据
 * state.conditions 用于增设条件
 * @param {*} dataIndex 
 * @param {*} _this 
 * @param {*} Options 
 */
export const getColumnSelectProps = (dataIndex,_this,Options)=>({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        return (<div style={{padding:8}}>
            <Row style={{marginBottom:10}}>
                <Checkbox.Group onChange={(val)=>{
                    let conditions = _this.state.conditions;
                    _this.setState({
                        conditions:{...conditions,[dataIndex]:val}
                    })
                }}>
                    {Options.map(item=> <Checkbox value={item.val} key={item.key}>{item.key}</Checkbox>)}
                </Checkbox.Group>
            </Row>
            <Row>
                <Space>
                    <Button type="default" size="small" style={{width:90}} onClick={()=>{
                        //let arr = Options.map(item=>item.val)
                        _this.handleChange({},{[dataIndex]:[]},{})
                    }} >重置</Button>
                    <Button type="primary" size="small" style={{width:90}}  onClick={()=>{
                        
                        _this.handleChange({},{},{})
                    }} >查询</Button>
                </Space>
            </Row>
        </div>)
    }
})

export function toZip(imgSrcList,FileNames,fileName) {
	let zip = new JSZip();//实例化一个压缩文件对象
	let imgFolder = zip.folder(fileName); //新建一个图片文件夹用来存放图片，参数为文件名
	for(let i=0;i<imgSrcList.length;i++){
		let src = imgSrcList[i];
		let tempImage = new Image();
		tempImage.src = src;
		tempImage.crossOrigin = "*";
		tempImage.onload = ()=> {
            //imgFolder.file((i+1)+'.png', getBase64Image(tempImage).substring(22), { base64: true })
            imgFolder.file(FileNames[i]+'.png', getBase64Image(tempImage).substring(22), { base64: true })
		}
	}
	setTimeout(()=>{
		zip.generateAsync({ type: 'blob' }).then( function(content) {
			FileSaver.saveAs(content, '签名文件'+ moment().format('YYYY-MM-DD HH:mm:ss') +'.zip')
		})
	},3000)
}
 
function getBase64Image(img) {
	let canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
	let dataURL = canvas.toDataURL("image/"+ext);
	return dataURL;
}