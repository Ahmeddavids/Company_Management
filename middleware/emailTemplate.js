exports.signUpTemplate = () => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Verifybody{
        width: 100%;
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #ffffff;
    }
    .Verifybody2{
        width: 40%;
     height: 80%;
     display: flex;
     align-items: center;
     justify-content: center;
     /* background: #4b1cce; */
     box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
     flex-direction:column;
    }
     .Text{
        width: 100%;
     height: 40%;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #1c7ece;
     &  main{
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   & img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
   }
     }
     .Text2{
        width: 100%;
     height: 60%;
     display: flex;
     align-items: center;
   flex-direction: column;
   gap: 40px;
     justify-content: center;
     background: #ffffff;

     & h2{
        font-size: 30px;

        
     }
     & p{
        font-size: 20px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
     }

     }
     
   .Text3{
    width: 100%;
     height: 20%;
     display: flex;
     justify-content: center;
     gap: 10px;
     & span{
        width: 50px;
        border: 1px solid #D8DADC;
        border-radius: 5px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
     }
   }
.Text4{
    width: 100%;
    height: 10%;
    /* background: red; */
    display: flex;
    /* align-items: center; */
    justify-content: center;
}
@media screen and (max-width:768px) {
    body{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Verifybody{
        width: 100%;
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #ffffff;
    }
    .Verifybody2{
        width: 90%;
     height: 90%;
     display: flex;
     align-items: center;
     justify-content: center;
     /* background: #4b1cce; */
     box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
     flex-direction:column;
     border-radius: 10px;
    }
     .Text{
        width: 100%;
     height: 40%;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #1c7ece;
     border-radius: 10px;
     &  main{
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   & img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
   }
     }
     .Text2{
        width: 100%;
     height: 60%;
     display: flex;
     align-items: center;
   flex-direction: column;
   gap: 40px;
     justify-content: center;
     background: #ffffff;

     & h2{
        font-size: 20px;

        
     }
     & p{
        font-size: 14px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
     }

     }
     
   .Text3{
    width: 100%;
     height: 20%;
     display: flex;
     justify-content: center;
     gap: 10px;
     & span{
        width: 30px;
        border: 1px solid #D8DADC;
        border-radius: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
     }
   }
.Text4{
    width: 100%;
    height: 10%;
    /* background: red; */
    display: flex;
    font-size: 10px;
    /* align-items: center; */
    justify-content: center;
}
}
@media screen and (max-width:320px){
    body{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .Verifybody{
        width: 100%;
     height: 100vh;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #ffffff;
    }
    .Verifybody2{
        width: 40%;
     height: 90%;
     display: flex;
     align-items: center;
     justify-content: center;
     /* background: #4b1cce; */
     box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
     flex-direction:column;
     border-radius: 10px;
    }
     .Text{
        width: 100%;
     height: 40%;
     display: flex;
     align-items: center;
     justify-content: center;
     background: #1c7ece;
     border-radius: 10px;
     &  main{
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
   }
   & img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
   }
     }
     .Text2{
        width: 100%;
     height: 60%;
     display: flex;
     align-items: center;
   flex-direction: column;
   gap: 40px;
     justify-content: center;
     background: #ffffff;

     & h2{
        font-size: 15px;
        text-align: center;

        
     }
     & p{
        font-size: 10px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
     }

     }
     
   .Text3{
    width: 100%;
     height: 20%;
     display: flex;
     justify-content: center;
     gap: 10px;
     & span{
        width: 20px;
        border: 1px solid #D8DADC;
        border-radius: 5px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
     }
   }
.Text4{
    width: 100%;
    height: 10%;
  
    display: flex;
    font-size: 8px;
    
    justify-content: center;
}
}
</style>
<body>
    <div class="Verifybody">
     <div class="Verifybody2">
    <div class="Text">
        <main>
            <img src="https://th.bing.com/th/id/R.736276670c68a8d4d4f00b5ecc62ed05?rik=DdfljkxR7tSefQ&pid=ImgRaw&r=0" alt="">
        </main>
    </div>
    <div class="Text2">
        <h2>Here is Your One Time Password
            <br />
            <p>to Verify that you are a New User </p>
        </h2>
    </div>
    <div class="Text3">
        ${otp}
    </div>
    <div class="Text4">
    <h4>This code expaires in <span style="color: red;">10ms</span></h4>
    </div>
     </div>
    </div>
</body>
</html>`
}