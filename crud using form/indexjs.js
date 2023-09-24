var v1="userName";
var v2="age";
var v3="state";
var mn=document.getElementById("main");
function getData(){
        fetch("https://632d3df1519d17fb53ba4029.mockapi.io/users").then((response)=>{
            return response.json();
        }).then((data)=>{
        
            showdata(data);

            //code to delete a user
            const buttons = document.getElementsByClassName("delete");

            const buttonPressed = e => {
                //console.log(e.target.id[2]);  // Get ID of Clicked Element till end like dl2009 id is 2009
                var choice=confirm("Are you sure you wanna delte this row?") 
                if(choice)
                {
                    var it1=e.target.id;
                    const userTodelete="https://632d3df1519d17fb53ba4029.mockapi.io/users/"+it1.substring(2);
                    //console.log(userTodelete);
                    fetch(userTodelete,{
                        method:"DELETE",
                        headers:{
                            'Content-Type':'Application/json'
                        }
                    }).then((response)=>{
                        return response.json();
                    }).then((data)=>{
                        getData();
                    })
                }
                
            }

            for (let button of buttons) {
                button.addEventListener("click", buttonPressed);
            }

            //code to edit a user
           const edits = document.getElementsByClassName("edit");

            const edtPressed = e => {
                //console.log(e.target.id[1]);  // Get ID of Clicked Element
                var it2=e.target.id;
                //var iid="cl"+e.target.id[1];    //id of the row also id of the user which we have to update
                var iid="cl"+it2.substring(1);
                var did1=iid+"r1";               //id of name col of that row
                var did2=iid+"r2";              //id of age col of that row
                var did3=iid+"r3";              //id of state col of that row
                
                document.getElementById(iid).setAttribute("contenteditable","true");
                document.addEventListener("keypress", function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    document.getElementById(iid).setAttribute("contenteditable","false");
                    var nm=document.getElementById(did1).innerText;
                    var ag=document.getElementById(did2).innerText;
                    var st=document.getElementById(did3).innerText;
                    var dta={};
                    dta[v1]=nm;
                    dta[v2]=ag;
                    dta[v3]=st;
                    const userToUpdate="https://632d3df1519d17fb53ba4029.mockapi.io/users/"+it2.substring(1);
                    fetch(userToUpdate,{
                        method:"PUT",
                        headers:{
                            'Content-Type':'Application/json'
                        },
                        body:JSON.stringify(dta)
                    }).then((response)=>{
                        return response.json();
                    }).then((data)=>{
                        console.log(data);
                        getData();
                    })
                    
                }
            }); 
            }

            for (let edt of edits) {
                edt.addEventListener("click", edtPressed);
            }

        })
        } 


function showdata(allData)
{
    console.log("Show data is calling by default");
    //document.getElementById("main").innerHTML="";
    mn.innerHTML="";
    var tmpcd="<table><thead><tr><th>userName</th><th>age</th><th>State</th><th>Modify</th></tr></thead><tbody>";
    for(var i=0;i<allData.length;i++)
    {
       var rowclass="cl"+allData[i].id;
       var fnid1=rowclass+"r1";
       var fnid2=rowclass+"r2";
       var fnid3=rowclass+"r3";
       var dlclass="dl"+allData[i].id;
       var editbtnid="e"+allData[i].id;
       tmpcd+=`<tr id='${rowclass}' contenteditable="false"><td id="${fnid1}">${allData[i].userName}</td><td id="${fnid2}">${allData[i].age}</td><td id="${fnid3}">${allData[i].state}</td><td contenteditable="false"><button id="${editbtnid}" class="edit">edit</button><button id="${dlclass}" class="delete">delete</button></td></tr>`
    }
    tmpcd+="</tbody></table>";
    //document.getElementById("main").innerHTML=tmpcd;
    mn.innerHTML=tmpcd;

}


getData();
