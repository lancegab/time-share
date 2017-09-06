var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");

function generateRandom(max){
    //Generate random numbers
    return Math.floor((Math.random() * max) + 1);
}

function Resource(id){
    //Resource class
    this.id = id;
    this.userQueue = [];
}

function User(id){
    //User class
    this.id = id;
    this.timeLeft = 0;
}

//Array initialization for resources and users
var resources = [];
var users = [];

//Generate number of resources and users
var resourceNum = generateRandom(30);
var userNum = generateRandom(30);

//Adds new resources to the resource array
for(i = 0; i < resourceNum; i++){
    resources.push(new Resource(i+1));
}
//Adds new users to the users array
for(j = 0; j < userNum; j++){
    users.push(new User(j+1));
}

//Assigns resource for each user
for(k = 0; k < userNum; k++){
    var randomResource = generateRandom(resourceNum) - 1;
    var time = generateRandom(30);

    users[k].timeLeft = time; //sets time for user to use resource

    resources[randomResource].userQueue.push(users[k]); //adds user to the waitlist of the resource
}

function renderUI(){
    //function to render user interface to canvas
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,760);
    context.fillStyle = "#bbb";
    context.font = "30px Arial";
    context.fillText("Resources - " + resourceNum, 10, 40);
    context.fillText("Users - " + userNum, 250, 40);

    context.font = "15px Arial";
    for(p = 0; p < resourceNum; p++){
        context.fillText("Resource " + resources[p].id, 10, 80+(p*20));
        for(q = 0; q < resources[p].userQueue.length; q++){
            if(q == 0){
                context.fillStyle = "#00AA00";
            } else {
                context.fillStyle = "#AAAA00";
            }
            context.fillText("User " + resources[p].userQueue[q].id + " (" + resources[p].userQueue[q].timeLeft + ")", 10 * 15 * (q+1), 80+(p*20));
        }
        context.fillStyle = "#bbb";
    }
}

function main(){
    //main loop, keeps track of users per resources
    for(n = 0; n < resourceNum; n++){
        if(resources[n].userQueue.length > 0){
            if(resources[n].userQueue[0].timeLeft == 0){
                resources[n].userQueue.shift(); //switches the use of resource to a new user
            } else {
                resources[n].userQueue[0].timeLeft--; //continues the countdown for the use of resource
            }
        }
    }
    renderUI();
}

setInterval(main,1000);
