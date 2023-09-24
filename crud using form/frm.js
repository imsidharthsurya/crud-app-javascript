var v1="userName";
var v2="age";
var v3="state";

function postData(user){
        var url="https://632d3df1519d17fb53ba4029.mockapi.io/users";
        
        var params={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }
        fetch(url,params).then((response)=>{
            console.log("response",response);
            return response.json();
        }).then((data)=>{
            console.log(data)
        })
    }

    
// function callfun(e){
//         //alert("Call fn. called means subnit button got clicked");
//         e.preventDefault();
//         var dat={};
//         var userName=document.getElementById("naam").value;    
//         var age=document.getElementById("age").value;
//         var stat=document.getElementById("stat").value;
//         dat[v1]=userName;
//         dat[v2]=age;
//         dat[v3]=stat;
        
//         postData(dat);
//     }
    
document.getElementById("submit-form").addEventListener("click",(e)=>{
    // e.preventDefault();
    // alert(document.getElementById("naam").value)
    var dat={};
    var userName=document.getElementById("naam").value;    
    var age=document.getElementById("age").value;
    var stat=document.getElementById("stat").value;
    dat[v1]=userName;
    dat[v2]=age;
    dat[v3]=stat;
    
    postData(dat);
})


