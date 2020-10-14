(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8fe1"],{"56f0":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("d2-container",[a("template",{slot:"header"},[e._v("角色管理")]),a("el-button",{attrs:{type:"primary"},on:{click:e.showPanel}},[e._v("添加角色"),a("i",{staticClass:"el-icon-plus el-icon--right"})]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"table",staticClass:"d2-mt-15",staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{prop:"rolename",label:"角色名"}}),a("el-table-column",{attrs:{prop:"roledesc",label:"角色描述"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])}),a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t))])]}}])}),a("template",{slot:"empty"},[a("p",{staticClass:"m-noneData"},[e._v("没有数据")])])],2),a("el-dialog",{attrs:{title:"编辑角色",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-position":"left"}},[a("el-form-item",{attrs:{label:"角色名","label-width":"70px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.rolename,callback:function(t){e.$set(e.form,"rolename",t)},expression:"form.rolename"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.form.roledesc,callback:function(t){e.$set(e.form,"roledesc",t)},expression:"form.roledesc"}})],1),a("el-divider",[a("span",[e._v("角色权限")])]),a("el-form-item",[a("el-row",[a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("歌单创建最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.playlistMaxCount},model:{value:e.Rules.playlistCount,callback:function(t){e.$set(e.Rules,"playlistCount",t)},expression:"Rules.playlistCount"}})],1),a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("播放器创建最大值")]),a("el-input-number",{attrs:{min:1,max:3},model:{value:e.Rules.playerCount,callback:function(t){e.$set(e.Rules,"playerCount",t)},expression:"Rules.playerCount"}})],1)],1)],1),a("el-form-item",[a("el-row",[a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("歌曲最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.songlistMaxCount},model:{value:e.Rules.songlistCount,callback:function(t){e.$set(e.Rules,"songlistCount",t)},expression:"Rules.songlistCount"}})],1),a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("域名绑定最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.domainMaxCount},model:{value:e.Rules.domainCount,callback:function(t){e.$set(e.Rules,"domainCount",t)},expression:"Rules.domainCount"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"添加角色",visible:e.dialogFormVisible2},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[a("el-form",{ref:"addRule",attrs:{model:e.addForm,"label-position":"left"}},[a("el-form-item",{attrs:{label:"角色名","label-width":"70px"}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.addForm.rolename,callback:function(t){e.$set(e.addForm,"rolename",t)},expression:"addForm.rolename"}})],1),a("el-form-item",{attrs:{label:"角色描述"}},[a("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.addForm.roledesc,callback:function(t){e.$set(e.addForm,"roledesc",t)},expression:"addForm.roledesc"}})],1),a("el-divider",[a("span",[e._v("角色权限")])]),a("el-form-item",[a("el-row",[a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("歌单创建最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.playlistMaxCount},model:{value:e.addRules.playlistCount,callback:function(t){e.$set(e.addRules,"playlistCount",t)},expression:"addRules.playlistCount"}})],1),a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("播放器创建最大值")]),a("el-input-number",{attrs:{min:1,max:3},model:{value:e.addRules.playerCount,callback:function(t){e.$set(e.addRules,"playerCount",t)},expression:"addRules.playerCount"}})],1)],1)],1),a("el-form-item",[a("el-row",[a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("歌曲最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.songlistMaxCount},model:{value:e.addRules.songlistCount,callback:function(t){e.$set(e.addRules,"songlistCount",t)},expression:"addRules.songlistCount"}})],1),a("el-col",{staticClass:"d2-mt-10",attrs:{lg:12,flex:""}},[a("span",{staticClass:"prepend d2-mr-10"},[e._v("域名绑定最大值")]),a("el-input-number",{attrs:{min:1,max:e.commonRules.domainMaxCount},model:{value:e.addRules.domainCount,callback:function(t){e.$set(e.addRules,"domainCount",t)},expression:"addRules.domainCount"}})],1)],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addRule}},[e._v("确 定")])],1)],1),a("el-pagination",{attrs:{slot:"footer",background:"","page-sizes":[10,30,50,80,100],"page-count":e.pageCount,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.pageSizeChange,"current-change":e.pageChange},slot:"footer"})],2)},l=[],o=(a("4160"),a("b64b"),a("159b"),a("96cf"),a("1da1")),r={name:"user-role",watch:{dialogFormVisible2:function(e,t){var a=this;e||(Object.keys(this.addForm).forEach((function(e,t){a.addForm[e]=""})),Object.keys(this.addRules).forEach((function(e,t){a.addRules[e]=1})))}},computed:{pageCount:function(){return Math.ceil(this.count/this.pageSize)}},data:function(){return{form:{rolename:"",roledesc:""},Rules:{playerCount:1,playlistCount:1,songlistCount:1,domainCount:1},addForm:{rolename:"",roledesc:""},addRules:{playerCount:1,playlistCount:1,songlistCount:1,domainCount:1},tableData:[],tableLoading:!1,dialogFormVisible:!1,dialogFormVisible2:!1,formLabelWidth:"120px",commonRules:{},count:0,pageSize:10,currentPage:1}},created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.tableLoading=!0,t.next=3,e.list();case 3:return t.next=5,e.$api.SYS_ROLE_COMMON_RULES();case 5:a=t.sent,e.commonRules=a,e.tableLoading=!1;case 8:case"end":return t.stop()}}),t)})))()},methods:{pageSizeChange:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.pageSize=e,a.next=3,t.list(t.currentPage,t.pageCount);case 3:case"end":return a.stop()}}),a)})))()},pageChange:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.currentPage=e,a.next=3,t.list(t.currentPage,t.pageCount);case 3:case"end":return a.stop()}}),a)})))()},addRule:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.addForm,n=a.rolename,l=a.roledesc,t.next=3,e.$api.SYS_ROLE_ADD_RULES({rolename:n,roledesc:l,permissions:JSON.stringify(e.addRules)});case 3:return e.dialogFormVisible2=!1,t.next=6,e.list();case 6:case"end":return t.stop()}}),t)})))()},showPanel:function(){this.dialogFormVisible2=!0},list:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$api.SYS_ROLE_LIST();case 2:a=t.sent,e.tableData=a.data,e.count=a.count;case 5:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,l,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=JSON.stringify(e.Rules),n=e.form,l=n.rolename,o=n.roledesc,t.next=3,e.$api.SYS_ROLE_UPDATE_RULES({roledesc:o,rolename:l,permissions:a});case 3:return e.dialogFormVisible=!1,t.next=6,e.list();case 6:case"end":return t.stop()}}),t)})))()},handleEdit:function(e,t){this.dialogFormVisible=!0;var a=t.rolename,n=t.roledesc,l=t.permissions;this.form.rolename=a,this.form.roledesc=n,this.Rules=l?JSON.parse(l):{}},handleDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该角色, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a.$api.SYS_ROLE_DELETE_RULES(t.rolename);case 2:return e.next=4,a.list();case 4:case"end":return e.stop()}}),e)})))).catch((function(){a.$message({type:"info",message:"已取消删除"})}))}}},s=r,i=a("2877"),u=Object(i["a"])(s,n,l,!1,null,null,null);t["default"]=u.exports}}]);