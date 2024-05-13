<template>
<div class="order-container">
    <div class="order-box">
        <div class="result-box">Result : {{res}} ({{ detail }})</div>
        <div class="result-box">Related Transcations:</div>
        <div class="table-box">
            <el-table
                :data="tableData"
                height="300"
                style="margin: auto; width: 96%; margin-top: 10px;">

                <!-- <el-table-column
                    prop="transactionId"
                    label="transaction Id"
                >
                </el-table-column> -->
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
        </div>
        <div class="button-box">
            <el-button type="primary" >Confirm</el-button>
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
            detail:""
        }
    },
    methods:{
        getMarketResult(){
            this.$axios.get("http://localhost:8080/order/result/market?orderId="+this.orderId)
            .then(response => {
                console.log(response)
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
                // this.tableData = response.data.data
                this.res = response.data.data.res
                this.detail = response.data.data.detail
                this.tableData = response.data.data.list
            })
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
            console.log(this.orderId)
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