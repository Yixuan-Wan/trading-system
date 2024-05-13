<template>
    <div class="order-container">
        <div class="order-box">
            <h3>{{orderName}}</h3>
            <el-form :model="form" ref="marketOrderForm" label-width="120px">
            <el-form-item label="Type" v-if="hasType">
                <el-radio-group v-model="form.type">
                <el-radio label="0">Buy</el-radio>
                <el-radio label="1">Sell</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Broker">
                <el-select v-model="form.broker" placeholder="Select">
                  <el-option
                    v-for="broker in brokers"
                    :key="broker.brokerId"
                    :label="broker.name"
                    :value="broker.brokerId"
                  ></el-option>
               
                </el-select>
            </el-form-item>
            <el-form-item label="Order Id" v-if="hasDelete">
                <el-select v-model="deleteOrderId" placeholder="Select" >
                  <el-option
                    v-for="broker in brokers"
                    :key="broker.brokerId"
                    :label="broker.name"
                    :value="broker.brokerId"
                  ></el-option>
               
                </el-select>
            </el-form-item>
            <el-form-item label="Product" v-if="hasProduct">
                <el-select v-model="form.product" placeholder="Select">
                  <el-option
                    v-for="product in products"
                    :key="product.productId"
                    :label="product.productName"
                    :value="product.productId"
                  ></el-option>
               
                </el-select>
            </el-form-item>
            <el-form-item label="Quantity">
                <el-input v-model.number="form.quantity" type="number" :min="0" placeholder="Enter quantity" style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="Price" v-if="hasPrice">
                <el-input v-model.number="form.price" type="number" :min="0" placeholder="Enter price" style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="Confirmation">
                <el-checkbox v-model="form.confirmation">I confirm the trade is correct</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">Submit</el-button>
                <el-button @click="resetForm">Reset</el-button>
            </el-form-item>
            </el-form>
        </div>
        
    </div>

</template>

<script>


export default {
  data() {
    return {
      form: {
        type: "0",
        broker: "1",
        quantity: null,
        price: null,
        confirmation: false,
        product:""
      },
      brokers:[],
      products:[],
      orderName:"",
      hasPrice:true,
      orderAlgo:'',
      orderId:"",
      traderId:"",
      deleteOrderId:"",
      hasDelete: false,
      hasType:true,
      hasProduct:true,

    };
  },
  methods: {
    submitForm() {
      // 提交表单逻辑
      if(this.orderAlgo==0){
        this.CreateMarketOrder()
      }else if(this.orderAlgo==1){
        this.CreateLimitOrder()
      }
    },
    resetForm() {
      // 重置表单
      this.$refs.marketOrderForm.resetFields();
    },
    getBorkerList(){
      this.$axios.get('http://localhost:8080/broker/all')
        .then(response => {
          
          this.brokers = response.data.data;
          console.log(this.brokers)
        })
        .catch(error => {
          // 请求失败时处理错误
          console.error('Error fetching brokers:', error);
        });
    },
    getProductList(){
      this.$axios.get('http://localhost:8080/product/all')
      .then(response =>{
        this.products = response.data.data
      })
    },
    getOrderName(){
      this.orderAlgo = this.$route.query.orderType
      if(this.orderAlgo==0){
        this.orderName = "Market Order"
        this.hasPrice = false
      }else if(this.orderAlgo==1){
        this.orderName = "Limit Order"
      }else if(this.orderAlgo == 2){
        this.orderName = "Stop Order"
      }else if(this.orderAlgo == 3){
        this.orderName = "Cancel Order"
        this.hasDelete = true
        this.hasPrice = false
        this.hasType = false;
        this.hasProduct = false;
      }
    },
    CreateMarketOrder(){
      const marketOrder = {
        orderType: this.form.type,
        productId: this.form.product,
        brokerId: this.form.broker,
        quantity: this.form.quantity,
        remainQuantity: this.form.quantity,
        traderId: this.traderId
      }
      // console.log(marketOrder)
      this.$axios.post("http://localhost:8080/order/add/market",marketOrder)
      .then(response =>{
        // console.log(response);
        if(response.data.code == 200){
          this.orderId = response.data.data.orderId;
          this.$router.push('step3?orderType='+this.orderAlgo+"&orderId="+this.orderId);
        }
      })
    },
    CreateLimitOrder(){
      const limitOrder = {
        orderType: this.form.type,
        productId: this.form.product,
        brokerId: this.form.broker,
        price: this.form.price,
        quantity: this.form.quantity,
        remainQuantity: this.form.quantity,
        traderId: this.traderId
      }
      // console.log(limitOrder)
      this.$axios.post("http://localhost:8080/order/add/limit",limitOrder)
      .then(response =>{
        // console.log(response);
        if(response.data.code == 200){
          this.orderId = response.data.data.orderId;
          this.$router.push('step3?orderType='+this.orderAlgo+"&orderId="+this.orderId);
        }
      })
    },
    CreateCancelOrder(){
      const cancelOrder = {
        deleteOrderId: this.deleteOrderId,
        brokerId: this.form.broker,
        quantity: this.form.quantity,
      }
      // console.log(marketOrder)
      this.$axios.post("http://localhost:8080/order/add/cancel",cancelOrder)
      .then(response =>{
        if(response.data.code == 200){
          this.orderId = response.data.data.orderId;
          this.$router.push('step3?orderType='+this.orderAlgo+"&orderId="+this.orderId);
        }
      })
    },
  },
  mounted(){
    this.getBorkerList()
    this.getProductList()
    this.getOrderName()
    this.traderId = window.localStorage.getItem("traderId")
  }
};
</script>

<style scoped>
.order-container{
    width: 100%;
    height: 100%;
}

h3{
    text-align: start;
    padding: 10px 10px 10px 30px;
}

.order-box{
    width: 80%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    text-align: start;
    margin: auto;
}

.button-container{
  width: 90%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

</style>