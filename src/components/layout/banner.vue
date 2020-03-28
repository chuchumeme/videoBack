.<template>
  <div>
    <Button class="selectAll" @click="handleSelectAll(true)">选择全部</Button>
    <Button class="cancelSelect" @click="handleSelectAll(false)">取消全选</Button>
    <Button type="primary" @click="modal1 = true">添加</Button>
    <Modal v-model="modal1" title="添加banner" @on-ok="ok" @on-cancel="cancel">
      <Upload action="http://up.imgapi.com/" :data="toke" :on-success="getImgUrl">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
    </Modal>
    <Modal v-model="modal2" title="修改banner" @on-ok="edit" @on-cancel="cancel">
      <Upload action="http://up.imgapi.com/" :data="toke" :on-success="getImgUrl">
        <Button icon="ios-cloud-upload-outline">修改图片</Button>
      </Upload>
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
import {apiBanner} from '@/request/api';
import {apiAddBanner} from '@/request/api';
import {apiEditBanner} from '@/request/api';
import {apiDelBanner} from '@/request/api';
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
      whatIndex:0,
      toke: {
        Token:
          "c19edb9c32d65493c1f9c052915bb7c41ba30625:TfYAqJ54JvVRAP610VRVHJ362YI=:eyJkZWFkbGluZSI6MTU1MTUxNjc3NSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNjc4ODUwIiwiYWlkIjoiMTU1ODk1NSIsImZyb20iOiJmaWxlIn0="
      },
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "banner图",
          key: "bannerimg",
          align: "center",
          render: (h, params) => {
            let imgurl = params.row.bannerimg;
            return h("img", {
                style: {
                  width: "150px",
                  height: "100px",
                },
                attrs: {
                  src: imgurl
                }
              });
          }
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
                      this.imgurl = this.data1[params.index].bannerimg;
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
    getImgUrl(res) {
      this.imgurl = res.linkurl;
    },
    onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiBanner({}).then((res) => {
        console.log(res);
        that.total = res.length;
        that.data1 = res
      })
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    ok() {
      let that = this;
      apiAddBanner({
        bannerimg:that.imgurl
      }).then((result) => {
        console.log(result);
        that.reload();
      })
    },
    edit() {
      let that = this;
      apiEditBanner({
        bannerid:that.data1[that.whatIndex].bannerid,
        bannerimg:that.imgurl
      }).then((res) => {
        console.log(res);
        that.reload();
      })
    },
    deleteOne(){
      let that = this;
      apiDelBanner({
        bannerid:that.data1[that.whatIndex].bannerid
      }).then((res) => {
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