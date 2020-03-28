<template>
  <div id>
    <Button class="selectAll" @click="handleSelectAll(true)">选择全部</Button>
    <Button class="cancelSelect" @click="handleSelectAll(false)">取消全选</Button>
    <Modal v-model="modalDel" title="是否要删除此条信息" @on-ok="deleteOne" @on-cancel="cancel">
    </Modal>
    <div style="margin-top:24px;">
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      <div style="margin-top:24px;">
        <Page :total="total" @on-change="pageChange" show-total/>
      </div>
    </div>
  </div>
</template>

<script>
import { apiWash } from '@/request/api';
import { apiDelWash } from '@/request/api';
export default {
  inject: ["reload"],
  data() {
    return {
      whatIndex:0,
      modalDel:false,
      total:0,
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "淘语",
          key: "washintro",
          align: "center"
        },
        {
          title: "淘状态",
          key: "washstate",
          render : (h,params) => {
            let washstate = params.row.washstate;
            if (washstate===0){ return h('div','未淘到') };
            if (washstate===1){ return h('div','已淘到')};
          }
        },
        {
          title: "淘书人",
          key: "username",
          align: "center",
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
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.modalDel = true;
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
    pageChange(response) {
      var that = this;
      // console.log(response);
      apiWash({}).then(res => {
        // 获取数据成功后的其他操作
        if (response == 1) {
          that.data1 = res.slice(0, 10);
        } else {
          that.data1 = res.slice((response - 1) * 10, response * 10);
        }
      });
    },
    onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiWash({}).then(res => {
        // 获取数据成功后的其他操作
        that.total = res.length;
        that.data1 = res.slice(0, 10);
      })
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    deleteOne(){
      let that = this;
      apiDelWash({
        washid:that.data1[that.whatIndex].washid
      }).then(res => {
        that.reload();
      })
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>