<template>
  <context-holder />
  <div class="home">
    <!-- LOGO区域 -->
    <div class="logo">
      <a href="/">
        <img src="../../assets/image/payfxdf.png" alt="" />
      </a>
    </div>
    <!-- 订单信息, 左右布局，左侧为收货和订单信息，右侧为付款详情 -->
    <div class="oder_info">
      <div class="address_sales_info">
        <a-form
          ref="formAddressRef"
          labelAlign="left"
          :model="formState"
          name="address"
          autocomplete="off"
          class="demo-form-inline"
        >
          <div class="address_info" v-if="route.query.type !== 'syncorder'">
            <div class="address_title">确认收货信息</div>
            <div class="input_textarea">
              <div class="textarea-wrapper">
                <textarea
                  v-model="textareaVal"
                  placeholder="粘贴文本，智能识别收货信息"
                  class="custom-textarea"
                ></textarea>
                <div class="suffix" @click="getResolutionContent">
                  <span>快速识别</span>
                </div>
              </div>
            </div>
            <div class="adress_tishi">
              例：抖发网，13888888888，浙江省 杭州市 上城区 清江路138号，景园家苑，310016
            </div>
            <div class="form_row">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-form-item
                    label="收货人"
                    name="name"
                    :rules="[{ required: true, message: '请输入收货人名称' }]"
                    class="name-form-item"
                  >
                    <a-input v-model:value="formState.name" placeholder="请输入收货人名称" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="联系方式"
                    name="phone"
                    :rules="[{ required: true, message: '请输入收货人联系方式' }]"
                  >
                    <a-input v-model:value="formState.phone" placeholder="请输入收货人联系方式" />
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    label="收货地区"
                    name="selectedOptions"
                    :rules="[{ required: true, message: '请选择收货地区' }]"
                  >
                    <a-cascader
                      v-model:value="formState.selectedOptions"
                      :options="options"
                      expand-trigger="hover"
                      placeholder="请选择收货地区"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item
                    label="详细地址"
                    name="textarea"
                    :rules="[{ required: true, message: '请输入详细地址' }]"
                  >
                    <a-input v-model:value="formState.textarea" placeholder="请输入详细地址" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div class="sales_info">
            <div class="address_title">确认订单信息</div>

            <!-- 订单数量表格 -->
            <div class="table_info">
              <a-table :dataSource="tableData" :columns="tableColumns" bordered :pagination="false">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'detail'">
                    <div class="detail_box">
                      <img :src="record.productInfo.attrInfo.image" alt="" />
                      <div class="detail_box_right">
                        <div class="store_name">{{ record.productInfo.store_name }}</div>
                        <div class="keyword">货号：{{ record.productInfo.keyword }}</div>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="column.dataIndex === 'sku'">
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
                      <span
                        ><span style="color: #999999">颜色：</span>{{ getColor(record.productInfo.attrInfo.suk) }}</span
                      >
                      <span
                        ><span style="color: #999999">尺码：</span>{{ getSize(record.productInfo.attrInfo.suk) }}</span
                      >
                    </div>
                  </template>
                  <template v-else-if="column.dataIndex === 'xint'">
                    <a-select
                      style="width: 100%"
                      :options="[
                        { label: '是', value: '1' },
                        { label: '否', value: '2' }
                      ]"
                      v-model:value="record.xint"
                    />
                  </template>
                  <template v-else-if="column.dataIndex === 'price'">
                    <div
                      style="
                        height: 22px;
                        font-weight: 500;
                        font-size: 16px;
                        color: var(--red-color);
                        line-height: 22px;
                      "
                      >{{ parseFloat(record.productInfo.attrInfo.ot_price) * parseFloat(record.cart_num) }}</div
                    >
                  </template>
                </template>
              </a-table>
            </div>
            <div class="fuwuguanli">
              <div class="address_title">服务管理</div>
              <div style="margin-top: 20px">
                <a-row :gutter="8">
                  <a-col :span="24">
                    <a-form-item label="快递面单" name="username">
                      <Checkbox v-model="checkedVal" label="抖音面单" round />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="卡片" name="username">
                      <Radio
                        v-model="radioVal"
                        :options="[
                          { label: '无', value: '1' },
                          { label: '评价有理', value: '2' }
                        ]"
                        round
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="选择快递" name="username">
                      <a-cascader
                        v-model:value="formState.value"
                        :options="options"
                        expand-trigger="hover"
                        placeholder="请选择"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="质检" name="username">
                      <Radio
                        v-model="radioVal"
                        :options="[
                          { label: '无', value: '1' },
                          { label: '简单核对（每件0.3）', value: '2' },
                          { label: '高级质检（每件1.3）', value: '3' }
                        ]"
                        round
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="服务" name="username">
                      <Radio v-model="radioVal" :options="[{ label: '服务费用（¥0.00）', value: '1' }]" round />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item name="username" :colon="false">
                      <template #label>
                        <div class="shouhou">
                          <span>售后处理</span>
                          <a-popover
                            placement="right"
                            :overlayInnerStyle="{
                              width: '290px',
                              height: '120px',
                              background: '#33384D'
                            }"
                          >
                            <img src="../../assets/image/question.png" alt="" />
                            <template #content>
                              <div
                                style="
                                  width: 263px;
                                  height: 85px;
                                  font-weight: 400;
                                  font-size: 12px;
                                  color: #ffffff;
                                  line-height: 17px;
                                  text-wrap: wrap;
                                  display: flex;
                                  flex-direction: column;
                                "
                              >
                                <span>新塘售后(仅新塘货品)：</span>
                                <span>
                                  若选择需要售后服务，需向代发团队支付2元售后 费用（平台不收取任何费用）。若不需要售后服
                                  务，则无需支付该费用；但如果商品出现售后问 题，平台与代发团队概不负责。</span
                                >
                              </div>
                            </template>
                          </a-popover>
                        </div>
                      </template>
                      <Radio
                        v-model="radioVal"
                        :options="[
                          { label: '需要售后', value: '1' },
                          { label: '无需售后', value: '2' }
                        ]"
                        round
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item name="username" :colon="false">
                      <template #label>
                        <div class="shouhou">
                          <span>货物处理</span>
                          <a-popover
                            placement="right"
                            :overlayInnerStyle="{
                              width: '410px',
                              height: '40px',
                              background: '#33384D'
                            }"
                          >
                            <img src="../../assets/image/question.png" alt="" />
                            <template #content>
                              <div
                                style="
                                  font-weight: 400;
                                  font-size: 12px;
                                  color: #ffffff;
                                  line-height: 17px;
                                  text-wrap: nowrap;
                                "
                              >
                                <span>未拿到货的商品，自动进行退款处理，目前只对1个订单单个商品的生效</span>
                              </div>
                            </template>
                          </a-popover>
                        </div>
                      </template>
                      <Checkbox v-model="checkedVal" label="有货先发，无货退款" round />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item label="订单备注" name="username">
                      <a-input v-model:value="formState.username" placeholder="请输入订单备注内容" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </div>
            </div>
            <div class="xieyi">
              <Checkbox v-model="checkedVal" />
              <span
                >当前提交订单，即视为您已充分知悉、理解并同意<span>第三方代发团队服务协议</span>中关于代发服务的介绍。</span
              >
            </div>
          </div>
        </a-form>
      </div>
      <div class="pay_info">
        <!-- 付款详情头部 -->
        <div class="payment-header">
          <span class="title">付款详情</span>
          <span class="subtitle">共计1件商品</span>
        </div>

        <!-- 金额明细 -->
        <div class="amount-item">
          <span class="label">货品总金额：</span>
          <span class="value">65.00<span>元</span></span>
        </div>
        <div class="amount-item">
          <span class="label">质检金额：</span>
          <span class="value">1.3<span>元</span></span>
        </div>
        <div class="amount-item">
          <span class="label">运费总计：</span>
          <span class="value">2.99<span>元</span></span>
        </div>
        <div class="amount-item">
          <span class="label">服务：</span>
          <span class="value">1<span>元</span></span>
        </div>

        <!-- 支付方式 -->
        <div class="payment-methods">
          <div class="payment-wrapper">
            <div class="payment-row" @click="selectPayment('1')">
              <img v-if="selectedValue === '1'" class="checkmark" src="../../assets/image/checked.png" alt="" />
              <img
                v-else
                :class="{ 'is-checked': selectedValue === '1' }"
                src="../../assets/image/nochecked.png"
                alt=""
              />
              <img class="payment-icon" src="../../assets/image/qianbao.png" alt="" />
              <span class="payment-text"
                >钱包支付
                <span style=""> （钱包可用余额：¥{{ cashVal }}） </span>
              </span>
            </div>

            <div class="payment-row" @click="selectPayment('2')">
              <img v-if="selectedValue === '2'" class="checkmark" src="../../assets/image/checked.png" alt="" />
              <img
                v-else
                :class="{ 'is-checked': selectedValue === '2' }"
                src="../../assets/image/nochecked.png"
                alt=""
              />
              <img class="payment-icon" src="../../assets/image/zhifubao.png" alt="" />
              <span class="payment-text">支付宝</span>
            </div>

            <div class="payment-row" @click="selectPayment('3')">
              <img v-if="selectedValue === '3'" class="checkmark" src="../../assets/image/checked.png" alt="" />
              <img
                v-else
                :class="{ 'is-checked': selectedValue === '3' }"
                src="../../assets/image/nochecked.png"
                alt=""
              />
              <img class="payment-icon" src="../../assets/image/weixin.png" alt="" />
              <span class="payment-text">微信</span>
            </div>

            <div class="payment-row" @click="selectPayment('4')">
              <img v-if="selectedValue === '4'" class="checkmark" src="../../assets/image/checked.png" alt="" />
              <img
                v-else
                :class="{ 'is-checked': selectedValue === '4' }"
                src="../../assets/image/nochecked.png"
                alt=""
              />
              <img class="payment-icon" src="../../assets/image/yunshanfu.png" alt="" />
              <span class="payment-text">云闪付</span>
            </div>
          </div>
        </div>

        <div class="woshiyitiaoxian"></div>

        <!-- 底部按钮 -->
        <div class="bottom_btn">
          <div class="pay_jine">
            <div>实付金额：</div>
            <div>¥{{ totalPrice }}</div>
          </div>
          <div class="btn" @click="payOrderOpen = true">
            <span>立即付款</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 支付密码弹窗 -->
    <a-modal v-model:open="payOrderOpen" style="width: 32%">
      <template #title>
        <div class="payment-modal-title">
          <span class="payment-modal-title-text">订单付款</span>
        </div>
      </template>
      <div class="payment-content">
        <div class="payment-input-wrapper">
          <a-input ref="AInputCodeRef" v-model:value="payCode" :bordered="false" placeholder="请输入支付密码" />
        </div>

        <div class="payment-info-container">
          <div class="wallet-info">
            <div class="wallet-balance">钱包余额：¥{{ cashVal }}</div>
            <div class="refresh-button" @click="fetchCashInfo">刷新</div>
          </div>
          <div class="order-info">
            <div class="order-count">共2笔订单</div>
            <div class="payment-label">需支付：</div>
            <div class="payment-amount">¥52.00</div>
          </div>
        </div>
      </div>

      <div class="modal-spacer"></div>

      <template #footer>
        <div class="modal-footer">
          <div @click="handleSubmit" class="submit-button">
            <span class="submit-button-text">确认支付</span>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import type { FormInstance, TableColumnsType } from 'ant-design-vue'
import { regionData } from 'element-china-area-data'
import Checkbox from '@/components/checkbox/index.vue'
import Radio from '@/components/radio/index.vue'
import AddressParse, { Utils } from 'address-parse'
import { getUserInfo } from '@/api/user'
import { useGoodsCartsTableStore } from '@/stores/goodCartsTable'
import { debounce } from '@/utils/util'

const goodsCartsTableStore = useGoodsCartsTableStore() // 购物车数据

const adressValue = ref<any>([])
const AInputCodeRef = ref()
const payCode = ref<any>('') // 支付密码

const [messageApi, contextHolder] = message.useMessage()
const route = useRoute()

// 获取订单数据
onMounted(() => {})

const payOrderOpen = ref(false) //订单付款弹窗
const checkedVal = ref(false) //多选值
const radioVal = ref('') //单选值

const textareaVal = ref('') // 智能识别信息
const cashVal = ref(0) // 钱包余额

const options = ref(regionData) //// 省市区选择数据

// 支付方式，微信还是钱包支付宝等
const selectedValue = ref('1')
const selectPayment = (value: string) => {
  selectedValue.value = value
}

const tableColumns: TableColumnsType = [
  {
    title: '商品详情',
    dataIndex: 'detail',
    align: 'center',
    width: 300,
    fixed: 'left'
  },
  {
    title: '规格',
    dataIndex: 'sku',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '数量',
    dataIndex: 'cart_num',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '新塘售后',
    dataIndex: 'xint',
    align: 'center',
    width: 200
  },
  {
    title: '金额（元）',
    dataIndex: 'price',
    ellipsis: true,
    align: 'center'
  }
]

console.log(route, 'rout=========')
const tableData = ref<any>([]) // 表格数据

// 如果是从购物车跳转过来的，则从pinia中获取购物车数据
if (route.query.type && route.query.type === 'gwcjs') {
  tableData.value = goodsCartsTableStore.goodsCartsTable
} else if (route.query.type && route.query.type === 'direct') {
  tableData.value = goodsCartsTableStore.goodsCartsTable
} else if (route.query.type && route.query.type === 'syncorder') {
  tableData.value = goodsCartsTableStore.goodsCartsTable
}

const formAddressRef = ref<FormInstance>()
const formState = reactive<any>({
  name: '',
  phone: '',
  selectedOptions: [],
  textarea: ''
})

// 获取颜色
const getColor = (suk: string) => {
  return suk.split(',')[0]
}

// 获取尺码
const getSize = (suk: string) => {
  return suk.split(',')[1]
}

// 计算总价
const totalPrice = computed(() => {
  return tableData.value
    .reduce((total: number, item: { productInfo: { attrInfo: { ot_price: string } }; cart_num: string }) => {
      const price = parseFloat(item.productInfo.attrInfo.ot_price)
      const quantity = parseFloat(item.cart_num)
      return total + price * quantity
    }, 0)
    .toFixed(2)
})

// 智能识别地址
const getResolutionContent = () => {
  const [result] = AddressParse.parse(textareaVal.value, true)
  console.log(result, '智能识别地址')
  if (!result) {
    messageApi.warning('输入为空，请先输入内容')
    return
  }

  const {
    province = '', // 省
    city = '', // 城市
    area = '', // 区
    details = '', //详细地址
    mobile = '', //手机号码
    name = '' //姓名
  } = result
  const resultes = Utils.getAreaByAddress({ province, city, area })
  const [a, b, c] = Utils.getTargetAreaListByCode('province', resultes.code, true)
  adressValue.value = [a?.code.slice(0, 2) || '', b?.code.slice(0, 4) || '', c?.code.slice(0, 6) || '']
  formState.name = name
  formState.phone = mobile
  formState.textarea = details
  formState.selectedOptions = adressValue.value
}

// 获取用户信息，得到钱包余额
const fetchCashInfo = debounce(() => {
  getUserInfo().then((res: any) => {
    if (res.status == 200) {
      cashVal.value = res.data.now_money
    }
  })
}, 300)

// 立即付款
const handleSubmit = () => {
  AInputCodeRef.value.focus()
}

fetchCashInfo()
</script>

<style src="./PayOrder.scss" scoped></style>

<style scoped lang="scss">
// 修改表格列样式
:deep(.ant-table-cell) {
  vertical-align: middle;
}
.name-form-item {
  :deep(.ant-form-item-label) {
    padding-right: 16px;
  }
}
</style>
