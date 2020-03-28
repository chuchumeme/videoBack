<template>
  <div id>
    <Button class="selectAll" @click="handleSelectAll(true)">选择全部</Button>
    <Button class="cancelSelect" @click="handleSelectAll(false)">取消全选</Button>
    <Button type="primary" @click="modal1 = true">添加</Button>
    <Modal v-model="modal1" title="添加图书" @on-ok="ok" @on-cancel="cancel">
      图书名称：
      <Input v-model="bookName" placeholder="请输入图书名称" style="width: 300px"/>
      <br>
      <br>
      图书价格：
      <Input v-model="bookPrice" placeholder="请输入图书价格" style="width: 300px"/>
      <br>
      <br>
      图书照片：
      <br>
      <br>
      <Upload action="http://up.imgapi.com/" :data="toke" :on-success="getImgUrl">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
      <br>
      图书类型：
      <Select v-model="categoryName" style="width:200px" :label-in-value="true" @on-change="select">
        <Option v-for="item in cateList" :value="item.categoryid" :key="item.categoryid" >{{ item.categoryname }}</Option>
      </Select>
      <br>
      <br>
      图书简介：
      <br>
      <br>
      <Input v-model="comment" type="textarea" :rows="4" placeholder="请填写图书简介" />
    </Modal>
    <Modal v-model="modalDel" title="是否要删除此条信息" @on-ok="deleteOne" @on-cancel="cancel">
    </Modal>
    <Modal v-model="modalEdit" title="修改图书信息" @on-ok="edit" @on-cancel="cancel">
      图书名称：
      <Input v-model="bookName" placeholder="请输入图书名称" :value="bookName" style="width: 300px"/>
      <br>
      <br>
      图书价格：
      <Input v-model="bookPrice" placeholder="请输入图书价格" :value="bookPrice" style="width: 300px"/>
      <br>
      <br>
      图书照片：
      <br>
      <br>
      <Upload action="http://up.imgapi.com/" :data="toke" :on-success="getImgUrl">
        <Button icon="ios-cloud-upload-outline">上传图片</Button>
      </Upload>
      <img :src="imgurl" style="width:50px;height:50px;">
      <br>
      图书类型：
      <Select v-model="categoryName" style="width:200px" :label-in-value="true" @on-change="select" :placeholder="categoryname">
        <Option v-for="item in cateList" :value="item.categoryid" :key="item.categoryid" >{{ item.categoryname }}</Option>
      </Select>
      <br>
      <br>
      图书简介：
      <br>
      <br>
      <Input v-model="comment" type="textarea" :rows="4" placeholder="请填写图书简介" />
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
import { apiAddBook } from "@/request/api";
import { apiBook } from "@/request/api";
import { apiCategory } from "@/request/api";
import { apiDelBook } from "@/request/api";
import { apiEditBook } from "@/request/api";
export default {
  inject: ["reload"],
  data() {
    return {
      bookName: "",
      bookPrice: "",
      imgurl: "",
      modal1: false,
      total: 0,
      cateList:[],
      categoryName:'',
      categoryname:'',
      selectId:'',
      comment:'',
      whatIndex:0,
      modalDel:false,
      modalEdit:false,
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
          title: "书名",
          key: "bookname",
          align: "center"
        },
        {
          title: "价钱",
          key: "bookprice",
          align: "center"
        },
        {
          title: "图片",
          key: "bookimg",
          align: "center",
          render: (h, params) => {
            let imgurl = params.row.bookimg;
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
          title: "类型",
          key: "categoryname",
          align: "center"
        },
        {
          title: "简介",
          key: "comment",
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
                      this.modalEdit = true;
                      this.whatIndex = params.index;
                      this.bookName = this.data1[params.index].bookname;
                      this.bookPrice = this.data1[params.index].bookprice;
                      this.imgurl = this.data1[params.index].bookimg;
                      this.selectId = this.data1[params.index].categoryid;
                      this.categoryname = this.data1[params.index].categoryname;
                      this.comment = this.data1[params.index].comment;
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
      select(val){
          this.selectId = val.value;
          this.categoryname = val.label;
      },
    pageChange(response) {
      var that = this;
      // console.log(response);
      apiBook({}).then(res => {
        // 获取数据成功后的其他操作
        if (response == 1) {
          that.data1 = res.slice(0, 10);
        } else {
          that.data1 = res.slice((response - 1) * 10, response * 10);
        }
      });
    },
    getImgUrl(res) {
      this.imgurl = res.linkurl;
    },
    onSubmit() {
      return false;
    },
    submit() {
      document.getElementById("myFrom").submit();
    },
    uploadImg() {
      this.submit();
    },
    onload() {
      var that = this;
      // 调用api接口，并且提供了两个参数
      apiBook({}).then(res => {
        // 获取数据成功后的其他操作
        that.total = res.length;
        that.data1 = res.slice(0, 10);
      }),
        apiCategory({}).then(res => {
            that.cateList = res;
        });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    ok() {
      let that = this;
      apiAddBook({
        bookname: that.bookName,
        bookprice: that.bookPrice,
        bookimg: that.imgurl,
        categoryid:that.selectId,
        categoryname:that.categoryname,
        comment:that.comment
      }).then(res => {
        console.log(res);
        that.reload();
      });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    edit(){
      let that = this;
      apiEditBook({
        bookid:that.data1[that.whatIndex].bookid,
        bookname: that.bookName,
        bookprice: that.bookPrice,
        bookimg: that.imgurl,
        categoryid:that.selectId,
        categoryname:that.categoryname,
        comment:that.comment
      }).then(res => {
        console.log(res);
        that.reload();
      })
    },
    deleteOne(){
      let that = this;
      apiDelBook({
        bookid:that.data1[that.whatIndex].bookid,
      }).then(res => {
        console.log(res);
        that.reload();
      })
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
</style>