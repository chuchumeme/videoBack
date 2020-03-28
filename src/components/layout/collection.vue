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
import { apiCollection } from "@/request/api";
  export default {
    name:'',
    inject: ["reload"],
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
          title: "收藏书名",
          key: "bookname",
          align: "center",
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

    },
      onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiCollection({}).then(res => {
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