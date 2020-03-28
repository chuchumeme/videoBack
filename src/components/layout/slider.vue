<template>
  <div>
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>管理员管理
          </template>
          <MenuItem name="1-2"><router-link to="/dataShow">普通管理员管理</router-link></MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>用户管理
          </template>
          <MenuItem name="2-1"><router-link to="/user">用户管理</router-link></MenuItem>
          <MenuItem name="2-2"><router-link to="/order">订单管理</router-link></MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>图书管理
          </template>
          <MenuItem name="3-1"><router-link to="/book">图书管理</router-link></MenuItem>
          <MenuItem name="3-2"><router-link to="/category">类别管理</router-link></MenuItem>
          <MenuItem name="3-4"><router-link to="/collection">收藏管理</router-link></MenuItem>
          <MenuItem name="3-5"><router-link to="/wash">淘书管理</router-link></MenuItem>
          <MenuItem name="3-6"><router-link to="/comment">书评管理</router-link></MenuItem>
          <MenuItem name="3-7"><router-link to="/reverse">预定管理</router-link></MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>其他
          </template>
          <MenuItem name="4-1"><router-link to="/banner">banner管理</router-link></MenuItem>
          <MenuItem name="4-2"><router-link to="/local">地点管理</router-link></MenuItem>
        </Submenu>
      </Menu>
    </Sider>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
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