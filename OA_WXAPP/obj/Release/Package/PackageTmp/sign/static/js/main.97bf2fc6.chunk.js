(this.webpackJsonpoa_wxapp=this.webpackJsonpoa_wxapp||[]).push([[0],{166:function(e,t,n){},175:function(e,t,n){},299:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(63),s=n(29),c=n.n(s),i=n(64),l=n(65),d=n(77),u=n(76),h=(n(166),n(167),n(22)),f=(n(59),n(26)),b=(n(132),n(87)),p=n(57),j=n.n(p),m=(n(117),n(31)),g=n(82),O=(n(171),n(129)),x=n(303),y=n(304),v=(n(175),n.p+"static/media/999.b9883ce8.png"),w=n(113),S=n.n(w);function C(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((function(a,r){("GET"===n?S.a.get(e,{params:t}):"POST"===n?S.a.post(e,t):S.a.post(e,t,{headers:{"content-type":"multipart/form-data"}})).then((function(e){a(e.data)})).catch((function(e){m.b.error("\u7f51\u7edc\u8bf7\u6c42\u51fa\u9519"+e.message)}))}))}var k=n(114),L=n.n(k),E="user_key_sign",D={saveUser:function(e){L.a.set(E,e)},getUser:function(){return L.a.get(E)||{}},removeUser:function(){L.a.remove(E)}},T=window.location.origin+"/",R=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",a=D.getUser();return e="/OA_WXAPP/"+e,t.append("OptUserCode",a.UserCode),C(T+e,t,n)},F={user:{}},_=n(10),A=O.a.Item,N=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).formRef=r.a.createRef(),e.handleSubmit=function(){var t=Object(g.a)(j.a.mark((function t(n){var a,r,o,s,c,i,l,d;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),a=e.formRef.current,r=a.getFieldsValue(!0),o=r.username,s=r.password,(c=new FormData).append("loginid",o),c.append("password",s),!a.getFieldsError().find((function(e){return e.errors.length>0}))){t.next=9;break}return t.abrupt("return");case 9:return t.next=11,R("Home/FrontWebLogin",c,"POST");case 11:if(0!==(i=t.sent).status){t.next=23;break}if(null!=i.data&&""!==i.data){t.next=16;break}return m.b.warn("\u8d26\u53f7\u6216\u5bc6\u7801\u9519\u8bef"),t.abrupt("return");case 16:m.b.success("\u767b\u5f55\u6210\u529f"),l=JSON.parse(i.data),F.user=l,D.saveUser(l),e.props.history.replace("/Admin"),t.next=24;break;case 23:1===i.status?m.b.error("\u8d26\u53f7\u5bc6\u7801\u9519\u8bef"):(m.b.error("\u767b\u5f55\u5931\u8d25"),d={CName:"\u6797\u709c",OAAccount:"100139"},F.user=d,D.saveUser(d),e.props.history.replace("/Page/admin"));case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(l.a)(n,[{key:"render",value:function(){var e=D.getUser();return e&&e.OAAccount?(F.user=e,Object(_.jsx)(h.a,{to:"/Admin"})):Object(_.jsxs)("div",{className:"login",children:[Object(_.jsxs)("div",{className:"login-header",children:[Object(_.jsx)("img",{src:v,alt:"logo",className:"Loginlogo"}),Object(_.jsx)("h1",{children:"\u5e38\u53d1\u901a\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u540e\u53f0\u7ba1\u7406\u7cfb\u7edf"})]}),Object(_.jsxs)("section",{className:"login-content",children:[Object(_.jsx)("h2",{children:"\u7528\u6237\u767b\u5f55"}),Object(_.jsxs)(O.a,{ref:this.formRef,onSubmitCapture:this.handleSubmit,children:[Object(_.jsx)(A,{name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d"},{pattern:/^[a-zA-Z0-9_]+$/,message:"\u7528\u6237\u540d\u5fc5\u987b\u662f\u6570\u5b57\u3001\u5b57\u6bcd\u3001\u4e0b\u5212\u7ebf\u3001"},{whitespace:!0,message:"\u8d26\u53f7\u4e0d\u80fd\u4e3a\u7a7a\u683c"}],children:Object(_.jsx)(b.a,{placeholder:"\u8d26\u53f7",prefix:Object(_.jsx)(x.a,{style:{color:"rgba(0,0,0,0.25)"}})})}),Object(_.jsx)(A,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801"},{pattern:/^[a-zA-Z0-9_@]+$/,message:"\u5bc6\u7801\u540d\u5fc5\u987b\u662f\u6570\u5b57\u3001\u5b57\u6bcd\u3001\u4e0b\u5212\u7ebf\u3001@\u7b26\u53f7"},{whitespace:!0,message:"\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\u683c"}],children:Object(_.jsx)(b.a.Password,{placeholder:"\u5bc6\u7801",prefix:Object(_.jsx)(y.a,{style:{color:"rgba(0,0,0,0.25)"}})})}),Object(_.jsx)(A,{children:Object(_.jsx)(f.a,{className:"login-button",type:"primary",htmlType:"submit",children:"\u767b\u5f55"})})]})]})]})}}]),n}(a.Component),I=Object(h.g)(N),U=(n(300),n(160)),K=n(41),Y=n(94),z=(n(283),n(131)),H=n(73),P=n.n(H),W=(n(285),n(128)),M=(n(152),n(56)),G=n(86),J=(n(286),n(130)),B=n(156),q=n.n(B),V=n(111),Z=n(157),$=n.n(Z),X=n(158),Q=n.n(X),ee=function(e){var t=new FormData;return Object.keys(e).forEach((function(n){if("object"===typeof e[n]){if(null!==e[n]&&void 0!==e[n]&&""!==e[n])for(var a=0;a<e[n].length;a++){var r="";a!==e[n].length-1?r+=e[n][a]+",":r+=e[n][a],t.append(n,r)}}else t.append(n,e[n])})),t},te=function(e,t){return{filterDropdown:function(n){var a=n.setSelectedKeys,r=n.selectedKeys,o=n.confirm;n.clearFilters;return Object(_.jsxs)("div",{style:{padding:8},children:[Object(_.jsx)(b.a,{ref:function(e){t.searchInput=e},placeholder:"\u8f93\u5165\u67e5\u8be2\u6761\u4ef6",value:r[0],onChange:function(n){return t.state.conditions[e]=n.target.value,a(n.target.value?[n.target.value]:[])},onPressEnter:function(){return t.handleSearch(r,o,e)},style:{width:188,marginBottom:8,display:"block"}}),Object(_.jsxs)(J.b,{children:[Object(_.jsx)(f.a,{type:"primary",onClick:function(){return t.handleChange()},icon:Object(_.jsx)(V.a,{}),size:"small",style:{width:90},children:"\u67e5\u8be2"}),Object(_.jsx)(f.a,{onClick:function(){t.state.conditions[e]="",t.handleChange()},size:"small",style:{width:90},children:"\u91cd\u7f6e"})]})]})},filterIcon:function(e){return Object(_.jsx)(V.a,{style:{color:e?"#1890ff":void 0}})},onFilterDropdownVisibleChange:function(e){e&&setTimeout((function(){return t.searchInput.select()}),100)},render:function(n){return t.state.searchedColumn===e?Object(_.jsx)(q.a,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[t.state.searchText],autoEscape:!0,textToHighlight:n?n.toString():""}):n}}},ne=function(e,t,n){return{filterDropdown:function(a){a.setSelectedKeys,a.selectedKeys,a.confirm,a.clearFilters;return Object(_.jsxs)("div",{style:{padding:8},children:[Object(_.jsx)(W.a,{style:{marginBottom:10},children:Object(_.jsx)(M.a.Group,{onChange:function(n){var a=t.state.conditions;t.setState({conditions:Object(K.a)(Object(K.a)({},a),{},Object(G.a)({},e,n))})},children:n.map((function(e){return Object(_.jsx)(M.a,{value:e.val,children:e.key},e.key)}))})}),Object(_.jsx)(W.a,{children:Object(_.jsxs)(J.b,{children:[Object(_.jsx)(f.a,{type:"default",size:"small",style:{width:90},onClick:function(){t.handleChange({},Object(G.a)({},e,[]),{})},children:"\u91cd\u7f6e"}),Object(_.jsx)(f.a,{type:"primary",size:"small",style:{width:90},onClick:function(){t.handleChange({},{},{})},children:"\u67e5\u8be2"})]})})]})}}};function ae(e,t,n){for(var a=new $.a,r=a.folder(n),o=function(n){var a=e[n],o=new Image;o.src=a,o.crossOrigin="*",o.onload=function(){r.file(t[n]+".png",function(e){var t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0,e.width,e.height);var n=e.src.substring(e.src.lastIndexOf(".")+1).toLowerCase();return t.toDataURL("image/"+n)}(o).substring(22),{base64:!0})}},s=0;s<e.length;s++)o(s);setTimeout((function(){a.generateAsync({type:"blob"}).then((function(e){Q.a.saveAs(e,"\u7b7e\u540d\u6587\u4ef6"+P()().format("YYYY-MM-DD HH:mm:ss")+".zip")}))}),3e3)}var re=function(e){return[Object(K.a)({title:"\u59d3\u540d",dataIndex:"lastname",key:"lastname",width:80,fixed:"left"},te("lastname",e)),Object(K.a)({title:"\u516c\u53f8",dataIndex:"subcompanyname",key:"subcompanyname",width:120,fixed:"left"},te("subcompanyname",e)),{title:"\u7b7e\u540d\u4e0a\u4f20\u65f6\u95f4",dataIndex:"FileTime",key:"FileTime",fixed:"left",width:80,render:function(e){return"0001-01-01T00:00:00"===e?"":P()(e).format("YYYY-MM-DD HH:ss:mm")}},Object(K.a)(Object(K.a)({title:"\u7b7e\u540d",dataIndex:"FileRoute",key:"FileRoute",width:80,fixed:"left"},ne("FileRoute",e,[{key:"\u5df2\u4e0a\u4f20",val:"download"},{key:"\u672a\u4e0a\u4f20",val:"downloadNot"}])),{},{render:function(e){return void 0===e||""===e||null===e?Object(_.jsx)(z.a,{color:"red",children:"\u672a\u4e0a\u4f20"}):Object(_.jsx)(z.a,{color:"green",children:"\u5df2\u4e0a\u4f20"})}})]},oe=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={Columns:[],filteredInfo:null,sortedInfo:null,selectedRowKeys:[],table_Loade:!1,dataSource:[],conditions:[]},e.onSelectChange=function(t){e.setState({selectedRowKeys:t})},e.handleChange=Object(g.a)(j.a.mark((function t(){var n,a,r,o,s,c=arguments;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:{page:1,pageSize:20},a=c.length>1&&void 0!==c[1]?c[1]:{},c.length>2&&void 0!==c[2]?c[2]:{},r=e.state.conditions,r=Object(K.a)(Object(K.a)(Object(K.a)({},n),r),a),o=ee(r),e.setState({table_Loade:!0}),t.next=9,R("Home/SearchSign",o,"POST");case 9:0===(s=t.sent).status?e.setState({dataSource:JSON.parse(s.data),table_Loade:!1}):(m.b.error("\u7f51\u7edc\u9519\u8bef"),e.setState({table_Loade:!1}));case 11:case"end":return t.stop()}}),t)}))),e.componentDidMount=function(){var t=F.user;t&&t.loginid||(t=D.getUser());var n=re(Object(Y.a)(e));e.setState({Columns:n}),e.handleChange()},e.onSelectDownLoad=function(t,n,a){var r=[];"SELECT_DownLoad"===n?t.forEach((function(e){""!==e[a]&&null!==e[a]&&r.push(e.WxOpenid)})):"SELECT_DownLoadNot"===n&&t.forEach((function(e){""!==e[a]&&null!==e[a]||r.push(e.WxOpenid)})),e.setState({selectedRowKeys:r})},e.DownLoadSign=Object(g.a)(j.a.mark((function t(){var n,a,r,o,s,c,i,l,d,u,h,f,b,p,g;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.state,a=n.dataSource,0!==(r=n.selectedRowKeys).length){t.next=4;break}return m.b.warn("\u8bf7\u9009\u62e9\u8981\u4e0b\u8f7d\u7684\u7b7e\u540d"),t.abrupt("return");case 4:if(void 0!==(o=a.filter((function(e){return void 0!==r.find((function(t){return e.WxOpenid===t}))&&null!==e.FileRoute&&""!==e.FileRoute})))&&0!==o.length){t.next=8;break}return m.b.warn("\u6ca1\u6709\u9009\u62e9\u5df2\u4e0a\u4f20\u7684\u6570\u636e"),t.abrupt("return");case 8:return s=o.map((function(e){return e.FileRoute})),c=o.map((function(e){return e.loginid})),i=o.map((function(e){return e.lastname})),l=s.join(","),d=c.join(","),u=i.join(","),(h=new FormData).append("Ftps",l),h.append("loginids",d),h.append("Names",u),t.next=20,R("Home/getSignUrl",h,"POST");case 20:if(0===(f=t.sent).status){for(b=f.data.split(","),p=[],g=0;g<i.length;g++)p.push(c[g]+"_"+i[g]);ae(b,p,"\u7b7e\u540d\u6587\u4ef6"+P()().format("YYYY-MM-dd HH:mm:ss")),m.b.success("\u6210\u529f")}else m.b.error("\u7f51\u7edc\u9519\u8bef");case 22:case"end":return t.stop()}}),t)}))),e}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.Columns,a=t.selectedRowKeys,r=t.dataSource,o=t.table_Loade,s=t.conditions,c=F.user;if(c&&c.loginid||(c=D.getUser()),!c||!c.loginid)return Object(_.jsx)(h.a,{to:"/Login"});var i={selectedRowKeys:a,columnWidth:15,onChange:this.onSelectChange,selections:[{key:"SELECT_ALL",text:"\u5168\u9009",onSelect:function(t){e.setState({selectedRowKeys:t})}},{key:"SELECT_DownLoad",text:"\u5168\u9009\u5df2\u4e0b\u8f7d",onSelect:function(t){e.onSelectDownLoad(r,"SELECT_DownLoad","FileRoute")}},{key:"SELECT_DownLoadNot",text:"\u5168\u9009\u672a\u4e0b\u8f7d",onSelect:function(t){e.onSelectDownLoad(r,"SELECT_DownLoadNot","FileRoute")}}]};return Object(_.jsxs)("div",{className:"main",children:[Object(_.jsxs)("div",{className:"toolArea",children:[Object(_.jsx)(f.a,{type:"primary",style:{marginRight:"2%"},onClick:function(){return e.DownLoadSign()},children:"\u4e0b\u8f7d\u7b7e\u540d"}),Object(_.jsxs)("p",{style:{textAlign:"left",fontSize:"22px"},children:["\u5f53\u524d\u67e5\u8be2\u6761\u4ef6:",""===s.lastname||void 0===s.lastname?"":"\u59d3\u540d:"+s.lastname+",",""===s.subcompanyname||void 0===s.subcompanyname?"":"\u516c\u53f8:"+s.subcompanyname+","]})]}),Object(_.jsx)(U.a,{rowSelection:i,bordered:!0,rowKey:"WxOpenid",sticky:!0,columns:n,loading:o,size:"middle",dataSource:r,pagination:!1,style:{width:"98%"}})]})}}]),n}(a.Component),se=Object(h.g)(oe),ce=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(_.jsx)(o.b,{children:Object(_.jsxs)(h.d,{children:[Object(_.jsx)(h.b,{path:"/Admin",component:se}),Object(_.jsx)(h.b,{path:"/Login",component:I}),Object(_.jsx)(h.a,{to:"/Login"})]})})}}]),n}(a.Component);c.a.render(Object(_.jsx)(o.a,{children:Object(_.jsx)(ce,{})}),document.getElementById("root"))}},[[299,1,2]]]);
//# sourceMappingURL=main.97bf2fc6.chunk.js.map