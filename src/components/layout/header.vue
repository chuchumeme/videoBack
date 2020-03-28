.<template>
  <div>
    
  </div>
</template>

<script>

  export default {
    name:'',
    props:['adminname'],
    data () {
      return {
          editFlag:0,
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        editName:function(){
      this.editFlag = 1;
    },
    editPass:function(){
      this.editFlag = 2;
    },
    loginOut:function(){
      this.editFlag = 3;
    },
    },

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