.<template>
  <div id>
    <div style="margin-top:24px;">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      <div style="margin-top:24px;">
        <Page :total="total" @on-change="pageChange" show-total/>
      </div>
    </div>
  </div>
</template>

<script>
import { apiOrder } from "@/request/api";
  export default {
    name:'',
    props:[''],
    data () {
      return {
        total: 0,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "username",
          align: "center"
        },
        {
          title: "订单图书",
          key: "bookname",
          align: "center",
        },
        {
          title: "订单价格",
          key: "orderprice",
          align: "center",
        },
        {
          title: "订单状态",
          key: "orderstate",
          render : (h,params) => {
            let orderstate = params.row.orderstate;
            if (orderstate===0){ return h('div','未送达') };
            if (orderstate===1){ return h('div','已送达')};
          }
        },
      ],
      data1: []
      };
    },

    components: {},

    computed: {},
    created() {
      this.onload();
    },
    beforeMount() {},

    mounted() {},

    methods: {
      pageChange(response) {
      var that = this;
      // console.log(response);
    },
      onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiOrder({}).then(res => {
        // 获取数据成功后的其他操作
        that.total = res.length;
        that.data1 = res.slice(0, 10);
      })
    },
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>