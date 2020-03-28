<template>
<div id="content">
    <img class="img" src="http://i1.fuimg.com/678850/7a84eeceb66a906a.png" alt="">

    
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.adminname" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import { apiLogin } from "@/request/api";
import md5 from 'js-md5';
    export default {
        data () {
            return {
                formInline: {
                    adminname: '',
                    password: ''
                },
                ruleInline: {
                    adminname: [
                        { required: true, message: '请填写管理员名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码.', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                
                var that = this;
                this.$refs[name].validate((valid) => {
                    
                    if (valid) {
                        console.log(2);
                        apiLogin({
                            adminname: that.formInline.adminname,
                            password:md5(that.formInline.password)
                        }).then(res => {
                            console.log(res);
                            if(res.length != 0){
                                that.$Message.success('登陆成功!');
                                that.$router.push({
                                    name: 'layout',
                                    query: {
                                        adminname:that.formInline.adminname
                                    }
                                });
                            }else{
                                this.$Message.error('账号或密码错误!');
                            }
                        });
                        
                    } else {
                        this.$Message.error('账号或密码错误!');
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .ivu-input-group{
        width: 40%;
    }
    .ivu-form{
        position: relative;
    }
    .ivu-btn{
        margin-left: 17%;
    }
    .ivu-form-item{
        margin-left: 36%;
    }
    .img{
        position: relative;
        margin-top: 10%;
        left: 38%;
        width: 400px;
        height: 300px;
    }
</style>
