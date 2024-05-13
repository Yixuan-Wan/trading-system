<template>
    <div class="content-container">
      <div class="content">
        <div class="step-container">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="Choose Order Type"></el-step>
            <el-step title="Create Order"></el-step>
            <el-step title="View Result"></el-step>
          </el-steps>
        </div>

        <div class="view-container">
          <router-view></router-view>
        </div>
      </div>
        
        
    </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      };
    },

    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      
    },
    beforeRouteUpdate(to,from,next) {
        console.log(to.name)
        if(to.name=='step2'){
          this.active = 1
        }else if(to.name=='step3'){
          this.active = 2
        }
        next()
        
      }
  }
</script>

<style scoped>
.content-container{
    background-color: #F5F6FA;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    width: 90%;
    height: 85%;
    /* background-color: greenyellow; */
    padding: 10px;
    border-radius: 10px;
}

.step-container{
  width: 90%;
  padding-bottom: 10px;
}

.view-container{
  width: 90%;
  height: 90%;
  margin-top: 20px;
  margin: auto;
}



</style>


