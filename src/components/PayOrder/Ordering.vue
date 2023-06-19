<template>
  <div id="app">
    <!-- 填写的表单 -->

    <el-form :model="shopForm" ref="shopForm" label-width="100px" :rules="formRule" style="width: 400px;margin:80px auto auto;">
      <el-form-item label="省/市/区" prop="fromDistrict">
      <el-cascader
          size="large"
          :options="options"
          v-model="shopForm.fromDistrict"
          @change="addressChange"
          class="selectItems">
      </el-cascader>
        </el-form-item>

      <el-form-item label="选择门店" prop="fromShopId">
        <el-select v-model="shopForm.fromShopId" placeholder="请选择" @change="shopChange()" class="selectItems">
          <el-option v-for="shop in this.shops" :key="shop.id" :label="shop.name" :value="shop.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="柜型" prop="fromShopId">
        <el-select v-model="shopForm.fromShopId" placeholder="请选择" @change="$forceUpdate()" class="selectItems">
          <el-option v-for="locker in this.lockers" :key="locker.id" :label="locker.name" :value="locker.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="存件时间" prop="fromTime">
        <el-col :span="24">
          <el-form-item prop="date">
            <el-date-picker v-model="shopForm.fromTime" type="datetime" placeholder="选择日期时间" align="right"
                            :picker-options="pickerOptions" class="selectItems">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>


      <el-form-item label="取件时间" prop="toTime">
        <el-col :span="24">
          <el-form-item prop="date">
            <el-date-picker v-model="shopForm.toTime" type="datetime" placeholder="选择日期时间" align="right"
                            class="selectItems" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>


    </el-form>

<!--        <el-dialog :title="agreement.name" :visible.sync="dialogVisible" width="60%">-->
<!--          <span v-html="agreement.text"></span>-->
<!--          <span slot="footer" class="dialog-footer">-->
<!--            &lt;!&ndash; <el-button @click="dialogVisible = false">取 消</el-button> &ndash;&gt;-->
<!--            <el-button type="primary" @click="dialogVisible = false">知道了</el-button>-->
<!--          </span>-->
<!--        </el-dialog>-->

  </div>
</template>

<script>
import { regionData,CodeToText } from 'element-china-area-data'
export default {
  name: "Ordering",
  data() {
    return {
      //查询结果暂存
      options: regionData,
      selectedOptions: [],
      shops: [],
      lockers:[],
      shopForm: {
        fromDistrict:'',
        fromShopId: -1,
        lockerId :-1,
        fromTime: "",
        toTime: "",
      },
      dialogVisible: false,
      checked: false,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '明天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      //表单校验
      formRule: {
        fromDistrict: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }],
        fromShopId: [{
          required: true,
          message: '请选择门店',
          trigger: 'blur'
        }],
        lockerId: [{
          required: true,
          message: '请选择寄存柜型号',
          trigger: 'blur'
        }],
        fromTime: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        toTime: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }]
      }

    } //data return end
  }, //dateEnd
  methods: {
    //处理区变化，通过@change绑定事件
    addressChange(arr) {
      //清空已有选择（防止网络请求失败）
      this.shops = [];
      this.getShop(arr[2]);
      this.shopForm.fromShopId = '';
      console.log(arr);
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    shopChange(nowShopId) {
      this.lockers = [];
      this.getLocker(nowShopId);
      this.shopForm.fromShopId = '';
    },
    //通过区获取门店
    getShop(district) {
      if (district == undefined) return
      this.$axios({
        method: "POST",
        url: "api/shop/shop/getShopByCityId" + district,
        data: {
          districtName: district
        }
      }).then(res => {
        if (res.data.success) {
          this.shops = res.data.obj;
        } else {
          this.$notify.error({
            title: '操作失败',
            message: res.data.msg
          });
        }
      }).catch(err => {
        console.error(err);
      }); //axios end
    },
    //通过门店获取寄存柜型号
    getLocker(shopId) {
      if (shopId == undefined) return
      this.$axios({
        method: "POST",
        url: "api/shop/shop/getShopByCityId" + shopId,
        data: {
          shopID: shopId
        }
      }).then(res => {
        if (res.data.success) {
          this.lockers = res.data.obj;
        } else {
          this.$notify.error({
            title: '操作失败',
            message: res.data.msg
          });
        }
      }).catch(err => {
        console.error(err);
      }); //axios end
    },


//将表单传回父组件Home
    sendToParent() {
      this.$emit('sendback', this.shopForm);
    },
    //校验
    validCheck() {
      this.$refs['shopForm'].validate((valid) => {
        if (valid) {
          console.log("输入有错误");
          this.$emit('sendNote', "error", "请确认选择的门店和日期是否正确");
        }
      });
    }, //endValidCheck

  }, //method
  async created() {
    //从父组件读取表单
    this.shopForm = Object.assign({}, this.homeForm);
    //截停连续的请求，防止无授权时多次弹窗
    if (getResult.status != 200) {
      console.log("用户未登录或网络请求失败，暂停请求");
      return;
    }
    //如果表单已经选择了区，则查询区内门店
    if (typeof(this.shopForm.fromDistrict) == "string") {
      this.getShop(this.shopForm.fromDistrict);
    }
    if (typeof(this.shopForm.fromShopId) == "number") {
      this.getLocker(this.shopForm.fromShopId);
    }


  },
  props: ['homeForm'],
  watch: {

  }, //watchEnd
  beforeDestroy() {
    this.sendToParent();
    this.validCheck();
  },
  updated() {
    this.sendToParent();
  }
} //export end
</script>

<style>
</style>
