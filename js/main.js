var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");

function generateRandom(max){
    //Generate random numbers
    return Math.floor((Math.random() * max) + 1);
}

function Resource(id){
    //Resource class
    this.id = id;
    this.active = false;
    this.userQueue = [];
}

function User(id){
    //User class
    this.id = id;
    this.timeQueue = [];
    this.resourceQueue = [];
    //Returns true if the num is in the resourceQueue(duplicate value).
    this.uses = function(num){
        for(i = 0; i < this.resourceQueue.length; i++){
            if(num == this.resourceQueue[i]){
                return true;
            }
        }
        return false;
    }
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
    var resourcesToUse = generateRandom(resourceNum);

    for(l = 0; l < resourcesToUse; l++){

        //checks if the user already queued the current resource and generates a new one if true
        do{
            var randomResource = generateRandom(resourceNum) - 1;
        } while(users[k].uses(randomResource))

        var time = generateRandom(30);

        users[k].timeQueue.push(time);
        users[k].resourceQueue.push(randomResource);

        if(l == 0){
            resources[randomResource].userQueue.push(users[k]); //adds user to the waitlist of the resource
        }
    }
}

function renderUI(){
    //function to render user interface to canvas
    context.fillStyle = "#000";
    context.fillRect(0,0,1500,760);
    context.fillStyle = "#FFF";
    context.font = "30px Arial";
    context.fillText("Resources - " + resourceNum, 10, 40);
    context.fillText("Users - " + userNum, 250, 40);

    context.font = "15px Arial";
    for(p = 0; p < resourceNum; p++){

        if(resources[p].isActive == true){
            context.fillStyle = "#0000FF";
        } else {
            context.fillStyle = "#FF0000";
        }
        context.fillText("Resource " + resources[p].id, 10, 80+(p*20));

        for(q = 0; q < resources[p].userQueue.length; q++){
            if(q == 0){
                context.fillStyle = "#00AA00";
            } else {
                context.fillStyle = "#AAAA00";
            }

            context.fillText("User " + resources[p].userQueue[q].id, 10 * 15 * (q+1), 80+(p*20));
            context.fillText("(" + resources[p].userQueue[q].timeQueue[0] + ")", 10 * 15 * (q+1) + 60, 80+(p*20));
        }
    }
}

function main(){
    //main loop, keeps track of users per resources
    for(n = 0; n < resourceNum; n++){
        //if there are users using the current resource
        if(resources[n].userQueue.length > 0){
            resources[n].isActive = true;
            //if user is done using the current resouce
            if(resources[n].userQueue[0].timeQueue[0] == 0){
                resources[n].userQueue[0].resourceQueue.shift(); //pops the current resource that the user is using
                resources[n].userQueue[0].timeQueue.shift(); //pops the current time that the user is using

                //if user still has another resource to use
                if(resources[n].userQueue[0].resourceQueue.length > 0){
                        resources[resources[n].userQueue[0].resourceQueue[0]].userQueue.push(resources[n].userQueue[0]); //user lines up to another resource
                }

                resources[n].userQueue.shift(); //switches the use of resource to a new user
            } else {
                resources[n].userQueue[0].timeQueue[0]--; //continues the countdown for the use of resource
            }
        } else {
            resources[n].isActive = false;
        }
    }
    renderUI();
}

setInterval(main,1000);
