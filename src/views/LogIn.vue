<template>
    <div id="app">
        <div class="container">
            <div class="title">Welcome to Trading Center</div>
            <div class="subtitle">Login to Your Account</div>
            <div class="input-title">Email</div>
            <input type="text" placeholder="please enter your email" v-model="mail">
            <div class="input-title">Password</div>
            <input type="password"  placeholder="please enter your password" v-model="password">
            <button class="btn" @click="login">Login</button>
            <div class="register-link">Don’t have an account? <router-link to="/signup">Create Account</router-link></div>
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            mail:"",
            password:""
        }
    },
    methods: {
        login() {
            const data = {
                mail: this.mail,
                password: this.password
            };
            
            this.$axios.post('http://localhost:8080/trader/login',data)
            .then(response => {
                console.log(response)
                if(response.data.code==200){
                    window.sessionStorage.setItem("userName",response.data.data.userName);
                    window.sessionStorage.setItem("mail",response.data.data.mail);
                    window.sessionStorage.setItem("company",response.data.data.company);

                    if(response.data.data.userType=="0"){
                        window.sessionStorage.setItem("traderId",response.data.data.userId);
                        this.$router.push('trader')
                    }else{
                        window.sessionStorage.setItem("brokerId",response.data.data.userId);
                        this.$router.push('broker')
                    }
                    
                    
                   
                   
                }else{
                    this.$message.error('Username or password is incorrect');
                }
            })
            .catch(error => {
                console.log(error)
                this.loginResult = 'Login failed';
            });            

        }
    }
}

</script>

<style scoped>
    #app{
        height: 100vh;
        background-image: url('@/assets/background.png');
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        width: 28%;
        height: 70%;
        background-color: rgba(255, 255, 255);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        padding-top: 50px;
    }

    .title {
        font-size: 24px;
        margin: 10px;
    }
    .subtitle {
        font-size: 16px;
        margin: 20px;
        color: grey;
    }
    .input-title{
        margin-top: 20px;
        font-size: 14px;
        width: 85%;
        text-align: left;
    }
    input {
        width: 80%;
        padding: 10px;
        margin: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
    }
    .btn {
        width: 80%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        margin-top: 40px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .btn:hover {
        background-color: #0056b3;
    }
    .register-link {
        margin-top: 20px;
        font-size: 14px;
    }
    .register-link a {
        color: #007bff;
        text-decoration: none;
    }
    .register-link a:hover {
        text-decoration: underline;
    }
</style>