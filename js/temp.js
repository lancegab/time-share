//
// function init(){
//     var users[];
//     var resources[];
// }
//
// function generateRandom(){
//     return Math.random();
// }
//
// function generateUsers(){
//
// }

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

//objects
function Resource(name){
    this.number = name;//represents the "1" in :resource 1" (starts with 1-30)
    this.isUsed = false;//if true, resource is being used by some user. thus, other users cant use it"
}

function User(name){
    this.number =  name;//represents the "1" in :user 1" (starts with 1-30)
    this.resourceUsed = [];//an array that stores into a queue the resources thats going to be used
    this.timeUsed = [];//the counter for each resource stored(resourceUsed[0] has timeUsed[0] as the counter, counts down to 0)
    this.isActive = false;//if true, it will trigger the countdown of timeUsed. if not, it displays "Waiting");

    this.queueResource = function(name, duration){//adds resource "name" and time "duration" to the queue
        var temp = this.resourceUsed.length;
        console.log(this.resourceUsed);
        for(trav = 0; trav<temp; trav++){//checks if added resource already exist in the queue
            console.log(name,this.resourceUsed[trav]);
            if(name == this.resourceUsed[trav]){
                console.log("It already exist");
                //if it exists, sends a true value which will be used by the caller to call the queueResource again
                return true;
            }
        }
        //if it doesnt exist, it will be added to the array
        this.resourceUsed.push(name);
        this.timeUsed.push(duration);
        console.log("Success");
        return false;
    }
}
function Randomizer(max){//Generates a random number from 1 to max
    var temp = Math.floor((Math.random() * max) + 1);
    return temp;
}
//initialization
//resource initialization
var resources = [];
var temp = Randomizer(30);
for(i = 0; i < temp; i++){//creates 1-30 number of resource with names resource 1, resource 2...r, where r is generated number
    resources.push(new Resource(i+1));
}
//users initialization
var users = [];
var temp2 = Randomizer(30);
for(i = 0; i < temp2; i++){//creates 1-30 number of resource with names user 1, user 2...t, where t is generated number
    users.push(new User(i+1));
}
for(ctr = 0; ctr < temp2; ctr++){
    var usingRes = Randomizer(temp);//for each user, creates a random number of resources and duration
    for(x = 0; x<usingRes; x++){
        do{
            var temp3 = Randomizer(temp);
            var temp4 = Randomizer(30);
            var answer = users[ctr].queueResource(temp3, temp4);
        }while(answer);//if random resource already exists, generate another one
    }
}
//main loop
function Time(){
    //logic
    for(c = 0; c<temp2; c++){
        if(users[c].resourceUsed.length > 0){//if there are still resources in queue, continue checking
            if(resources[(users[c].resourceUsed[0])-1].isUsed == false){//if the users own resource queue is up, and the resource it is named from is not Used
                users[c].isActive = true;//...make the user active
                resources[(users[c].resourceUsed[0])-1].isUsed = true;//and set the resources to used
                if(users[c].timeUsed[0]> 0){//if timer is not et 0, countdown continues
                    users[c].timeUsed[0]--;
                }
                else{//if 0 is reached, pop both resourceUsed and timeUsed, then proceed to next queue
                    users[c].resourceUsed.shift();
                    users[c].timeUsed.shift();
                }
            }else{//if users queued resource is still used, set user to not active(waiting...)
                users[c].isActive = false;
            }
        }
        else//if no resources are queued, the user is officially done
            users[c].isActive = false;
    }

    //UI
    context.fillStyle = "#000";
    context.fillRect(0,0,500,700);
    context.fillStyle = "#bbb";
    context.font = "30px Calibri";
    //Header UI
    context.fillText("Resources(" + temp + ")" ,10,40);
    context.fillText("Users(" + temp2 + ")" ,250,40);
    //resources area
    context.font = "15px Calibri";
    for(r = 0; r<temp; r++){
        context.fillText("resource " + resources[r].number,10,60+(r*20));
        if(resources[r].isUsed){//if resource is used
            context.fillStyle = "#ff3333";//...make it RED
            context.fillText("Status: Used",100,60+(r*20));
        }
        else{//if resource is not used
            context.fillStyle = "#33ff33";//...green is good
            context.fillText("Status: Free",100,60+(r*20));
        }
        context.fillStyle = "#bbb";//the color reset to color of "resource <no>" to white
    }
    //users area
    context.font = "15px Calibri";
    for(r = 0; r<temp2; r++){
        context.fillText("resource " + users[r].number,250,60+(r*20));
        if(users[r].isActive && users[r].resourceUsed.length > 0 ){//if user is active
            context.fillStyle = "#ff3333";//...make it red and show the timer
            context.fillText("Status: Using " + users[r].resourceUsed[0] + " (" + users[r].timeUsed[0] + ")",350,60+(r*20));
        }
        else if(users[r].resourceUsed.length > 0){//if user is not active but still has some resources in queue
            context.fillStyle = "#ffff33";//...make it yellow
            context.fillText("Status: Waiting for "+users[r].resourceUsed[0] ,350,60+(r*20));
        }
        else{//if user is not active and has no resources left to process
            context.fillStyle = "#3333ff";//...make it blue
            context.fillText("Status: Done",350,60+(r*20));
        }
        context.fillStyle = "#bbb";//the color reset to color of "user <no>" to white
    }

    for(r = 0; r<temp; r++){//resets the isUsed of resource to false, some sort of refresh
        resources[r].isUsed = false;
    }
}
//the main loop
setInterval(Time, 500);//function Time is called per 500ms
