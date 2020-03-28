<template>
  <div id="layout">
    <slider-v></slider-v>
    <Layout :style="{marginLeft: '200px'}">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <div class="adminName">
            <Dropdown>
            <a style="color:#2d8cf0" href="javascript:void(0)">{{adminname}}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <!-- <DropdownItem name="editName" @click.native="editName">更改昵称</DropdownItem>
                <DropdownItem name="editPass" @click.native="editPass">更改密码</DropdownItem> -->
                <DropdownItem name="loginOut" @click.native="loginOut">退出登录</DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </div>
      </Header>
      <Modal
        v-if="editFlag === 1"
        v-model="editName"
        
        title="修改昵称">
        输入昵称:<Input v-model="adminname" placeholder="输入昵称" style="width: 300px" />
    </Modal>
    <Modal
        v-if="editFlag === 2"
        v-model="editPass"
        title="修改密码">
        输入新密码:<Input v-model="password" placeholder="输入密码" style="width: 300px" />
    </Modal>
    <Modal
        v-if="editFlag === 3"
        v-model="loginOut"
        title="退出登录"
        @on-ok="loginout" @on-cancel="cancel"
    >
    </Modal>
      <Content :style="{padding: '0 16px 16px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <!-- <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem> -->
        </Breadcrumb>
        <Card>
          <div>
            <router-view v-if="isReloadAlive"></router-view>
          </div>
        </Card>
      </Content>
    </Layout>
    
  </div>
</template>

<script>
import slider from './slider'
export default {
  name: "layout",
  provide() {
   return {
    reload: this.reload
   }
 },
  data() {
    return {
        isReloadAlive : true,
        adminname:'',
        editFlag:0,
        password:''
    };
  },
  created(){
    this.getRouteData();
  },
  components:{
    'slider-v':slider,
  },
  methods:{
    reload() {
 this.isReloadAlive = false;
 this.$nextTick(function(){
 this.isReloadAlive = true;
 })
 },
    getRouteData(){
      this.adminname = this.$route.query.adminname;
      console.log(this.$route.query.adminname);
    },
    editName:function(){
      this.editFlag = 1;
    },
    editPass:function(){
      this.editFlag = 2;
    },
    loginOut:function(){
      this.editFlag = 3;
    },
  }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.adminName{
    text-align: right;
    font-size: 18px;
}
</style>