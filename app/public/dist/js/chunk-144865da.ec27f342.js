(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-144865da"],{8902:function(t,e,a){},df27:function(t,e,a){"use strict";var l=a("8902"),n=a.n(l);n.a},f888:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-alert",{staticStyle:{"margin-bottom":"15px"},attrs:{title:"使用歌单ID或歌手ID直接导入歌曲到当前歌单，建议歌单内歌曲不超过100首\n如非必要，在基本设置选择歌单类型为调用，无需导入歌单即可加载歌单！",type:"success",closable:!1}}),a("el-select",{staticClass:"block-mb-15 w-50",attrs:{placeholder:"请选择平台"},model:{value:t.form.platformVal,callback:function(e){t.$set(t.form,"platformVal",e)},expression:"form.platformVal"}},t._l(t.form.platform,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("el-input",{staticClass:"d2-mt-15",attrs:{placeholder:"请输入歌单ID",clearable:""},model:{value:t.form.input,callback:function(e){t.$set(t.form,"input",e)},expression:"form.input"}},[a("template",{slot:"prepend"},[t._v("歌单ID")]),a("el-button",{staticClass:"m-hover m-btn",attrs:{slot:"append",icon:"el-icon-folder-add\n",type:"primary",loading:t.loading},on:{click:t.addplaylist},slot:"append"},[t._v("导入歌单")])],2)],1)},n=[],r=(a("96cf"),a("1da1")),o={name:"addPlayList",methods:{addplaylist:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,l,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.form.input&&t.form.platformVal){e.next=2;break}return e.abrupt("return",t.$message.warning("请选择参数"));case 2:return t.loading=!0,l=t.form,n=l.input,r=l.platformVal,e.prev=4,e.next=7,t.$api.SYS_PLAYLIST_LIST({platform:r,mode:"playlist",action:n});case 7:a=e.sent,e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](4),t.loading=!1;case 13:t.$emit("importplaylist",a),t.loading=!1;case 15:case"end":return e.stop()}}),e,null,[[4,10]])})))()}},data:function(){return{loading:!1,form:{input:"",platform:[{label:"网易云",value:"netease"}],platformVal:null}}}},i=o,s=(a("df27"),a("2877")),c=Object(s["a"])(i,l,n,!1,null,"69097de0",null);e["default"]=c.exports}}]);