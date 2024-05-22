<template>
    <div class="type-container">
    <div class="type-box">
        <div class="type" :class="{ 'selected': selectedType === 0 }" @click="selectType(0)">
            <div class="order-type">Market Order</div>
            <div class="order-detail">
                - Buy or sell a security at the current market price
                <br>
                - Buy executed immediately at the lowest ask price
                <br>
                - Guarantee an immediate fill, not guarantee price
            </div>
        </div>
        <div class="type" :class="{ 'selected': selectedType === 1 }" @click="selectType(1)">
            <div class="order-type">Limit Order</div>
            <div class="order-detail">
                - Buy or sell an instrument at price better than the market ask or bid price
                <br>
                - Guarantee a price, not guarantee execution
            </div>
        </div>
        <div class="type" :class="{ 'selected': selectedType === 2 }" @click="selectType(2)">
            <div class="order-type">Stop Order</div>
            <div class="order-detail">
                -- Buy or sell an instrument once the price of that instrument reaches a specified price
                <br>
                -- Limit loss if price is moving in opposite direction
            </div>
        </div>

        <div class="type-disabled">
            <div class="order-type">To Be Continued</div>
            <div class="order-detail">
                -- More Strategy is developing...
            </div>
        </div>
    </div>

    
    </div>
    
</template>

<script>
export default{
    data(){
        return{
            selectedType:-1,
        }
    },
    methods:{
        selectType(index){
            // this.selectedType = index
            if(index==0){
                this.$router.push("/trader/order-market")
            }else if(index==1){
                this.$router.push("/trader/order-limit")
            }else if(index==2){
                this.$router.push("/trader/order-stop")
            }
        },
        
    }
}

</script>


<style scoped>
.type-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #f5f6fa;
}
.type-box{
    width: 80%;
    height: 80%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

}

.type{
    width:35%;
    height: 40%;
    background-color: white;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: start;
    line-height: 32px;
}

.order-type{
    font-size: 18px;
    font-weight: bold;
}

.selected {
border: 1px solid #4880FF;
box-shadow: 0 0 10px #4880FF;
}

.button-container{
  width: 90%;
  /* background-color: antiquewhite; */
  margin: auto;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.type-disabled{
    background-color: #e9e9e9;
    width:35%;
    height: 40%;
    /* background-color: white; */
    border-radius: 10px;
    padding: 10px 20px;
    text-align: start;
    line-height: 32px;
}
</style>