<template>
<div class="order-container">
    <div class="order-box">
        <div class="result-box">Result : {{res}} ({{ detail }})</div>
        <div class="result-box" v-show="!isCancel">Related Transcations:</div>
        <div class="result-box" v-show="isCancel">Related Order:</div>
        <div class="table-box">
            <el-table
                v-show="!isCancel"
                :data="tableData"
                height="300"
                style="margin: auto; width: 96%; margin-top: 10px;">
                <el-table-column
                    prop="brokerName"
                    label="Broker"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="productName"
                    label="Product"
                    width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="Period"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Qty"
                    width="100">
                </el-table-column>

                <el-table-column label="Initiator">
                    <el-table-column
                    prop="trader1Name"
                    label="Trader"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="trader1Company"
                    label="Company"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="side1"
                    label="Side"
                    width="100">
                    </el-table-column>
                </el-table-column>

                <el-table-column label="Completion">
                    <el-table-column
                    prop="trader2Name"
                    label="Trader"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="trader2Company"
                    label="Company"
                    width="100">
                    </el-table-column>

                    <el-table-column
                    prop="side2"
                    label="Side"
                    width="100">
                    </el-table-column>
                </el-table-column>
                
            </el-table>

            <el-table
                v-show="isCancel"
                :data="orderData"
                style="margin: auto; width: 96%; margin-top: 10px;"
                >
                <el-table-column
                    prop="orderId"
                    label="Order Id"
                >
                </el-table-column>
                <el-table-column
                    prop="brokerId"
                    label="Broker Id"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="productId"
                    label="Product Id"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Qty"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="remainQuantity"
                    label="Remain Qty"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="Price"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="Create Time"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="Update Time"
                    width="160">
                </el-table-column>
                
                
            </el-table>
        </div>
        <div class="button-box">
            <el-button type="primary" @click="goBack()" >Confirm</el-button>
        </div>
    </div>
</div>
</template>

<script>


export default{
    data(){
        return{
            tableData:[],
            orderId:"",
            orderAlgo:"",
            res:"",
            detail:"",
            orderData:[],
            isCancel:false
        }
    },
    methods:{
        getMarketResult(){
            this.$axios.get("http://localhost:8080/order/result/market?orderId="+this.orderId)
            .then(response => {
                // console.log(response)
                // this.tableData = response.data.data
                this.res = response.data.data.res
                this.detail = response.data.data.detail
                this.tableData = response.data.data.list
            })
        },
        getLimitResult(){
            this.$axios.get("http://localhost:8080/order/result/limit?orderId="+this.orderId)
            .then(response => {
                console.log(response)    
                this.res = response.data.data.res
                this.detail = response.data.data.detail
                this.tableData = response.data.data.list
                console.log(this.tableData)
            })
        },
        getCancelResult(){
            this.$axios.get("http://localhost:8080/order/result/cancel?orderId="+this.orderId)
            .then(response => {
                
                // console.log(response)
                this.res = response.data.data.res
                this.detail = response.data.data.detail
                this.orderData = response.data.data.orderList

            })
        },
        goBack(){
            this.$router.push('/trader/create/')
        }
        
    },
    mounted(){
        this.orderAlgo = this.$route.query.orderType
        this.orderId = this.$route.query.orderId
        if(this.orderAlgo==0){
            this.getMarketResult()
        }else if(this.orderAlgo==1){
            this.getLimitResult()
        }else if(this.orderAlgo==3){
            this.isCancel = true;
            this.getCancelResult()
        }
        
    }
}
</script>

<style scoped>
.order-container{
    width: 100%;
    height: 100%;
    /* background-color: antiquewhite; */
}


.order-box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    text-align: start;
    margin: auto;
}
.result-box{
    width: 95%;
    /* background-color: antiquewhite; */
    margin: auto;
    padding-top: 10px;
    margin-bottom: 10px;
}

.button-box{
    width: 95%;
    padding: 20px;
    margin: auto;
    /* background-color: aliceblue; */
    text-align: center;
}
</style>