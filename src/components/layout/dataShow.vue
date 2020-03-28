<template>
  <div>
    <Button class="selectAll" @click="handleSelectAll(true)">选择全部</Button>
    <Button class="cancelSelect" @click="handleSelectAll(false)">取消全选</Button>
    <div style="margin-top:24px;">
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <div style="margin-top:24px;">
            <Page :total="total" show-total />
        </div>
    </div>
  </div>
</template>

<script>

import { apiAdmin } from '@/request/api';
  export default {
    props:[''],
    data () {
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '管理员',
                        key: 'adminname',
                        align: "center"
                    },
                    {
                        title: '管理员密码',
                        key: 'password',
                        align: "center"
                    },
                    {
                        title: '管理员身份',
                        key: 'authority',
                        align: "center",
                        render : (h,params) => {
                            let authority = params.row.authority;
                            if (authority===0){ return h('div','管理员') };
                            if (authority===1){ return h('div','管理员')};
                        }
                    },
                ],
                data1: []
            }
        },

    components: {},

    computed: {
        total(){
            return this.data1.length
        }
    },
    created(){
        this.onLoad();
    },
    beforeMount() {},

    mounted() {},

    methods: {
        handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `修改用户名`
            })
        },
        remove (index) {
            this.data1.splice(index, 1);
        },
        // 获取数据            
        onLoad() {
            var that = this;
            console.log(that.data1);
            // 调用api接口，并且提供了两个参数                
            apiAdmin({             
            }).then(res => {
                // 获取数据成功后的其他操作
                that.data1 = res;   
            })            
        }  
    },

    watch: {}

  }

</script>
<style scoped>
    .selectAll{
        background-color: blueviolet;
        color: white;
    }
</style>