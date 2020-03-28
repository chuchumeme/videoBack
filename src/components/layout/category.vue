.<template>
  <div>
    <Button class="selectAll" @click="handleSelectAll(true)">选择全部</Button>
    <Button class="cancelSelect" @click="handleSelectAll(false)">取消全选</Button>
    <Button type="primary" @click="modal1 = true">添加</Button>
    <Modal v-model="modal1" title="添加类型" @on-ok="ok" @on-cancel="cancel">
      类型名称：<Input v-model="categoryName" placeholder="请输入类型名称" style="width: 300px" /><br><br>
    </Modal>
    <Modal v-model="modal2" title="修改类型" @on-ok="edit" @on-cancel="cancel">
      类型名称：<Input v-model="categoryName" placeholder="请输入类型名称" style="width: 300px" /><br><br>
    </Modal>
    <Modal v-model="modal3" title="是否要删除此条信息" @on-ok="deleteOne" @on-cancel="cancel">
    </Modal>
    <div style="margin-top:24px;">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      <div style="margin-top:24px;">
        <Page :total="total" show-total/>
      </div>
    </div>
  </div>
</template>

<script>
import { apiCategory } from '@/request/api';
import { apiAddCate } from '@/request/api';
import { apiEditCate } from '@/request/api';
import { apiDelCate } from '@/request/api';
export default {
  name: "",
  props: [""],
  inject:['reload'],
  data() {
    return {
      modal1: false,
      modal2:false,
      modal3:false,
      total: 0,
      categoryName:'',
      whatIndex:0,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "类型名",
          key: "categoryname",
          align: "center"
        },
        {
          title: "操作",
          key: "edit",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modal2 = true;
                      this.whatIndex = params.index;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.modal3 = true;
                      this.whatIndex = params.index;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
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
    onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiCategory({}).then(res => {
        // 获取数据成功后的其他操作
        that.total = res.length;
        that.data1 = res
      });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    ok() {
      let that = this;
      apiAddCate({
        categoryname:that.categoryName
      }).then(res => {
        console.log(res);
        that.reload();
      })
    },
    edit() {
      let that = this;
      apiEditCate({
        categoryid:that.data1[that.whatIndex].categoryid,
        categoryname:that.categoryName
      }).then(res => {
        console.log(res);
        that.reload();
      })
    },
    deleteOne(){
      let that = this;
      apiDelCate({
        categoryid:that.data1[that.whatIndex].categoryid,
      }).then(res => {
        console.log(res);
        that.reload();
      })
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>