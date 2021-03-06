class Timer {
    constructor(row, mins, secs, addTally) {
        this.tally;

        this.row = row;
        this.id = row.getAttribute("id");
        this.button = row.getElementsByClassName("go")[0];

        this.minutes = mins
        this.seconds = secs;
        this.resetMins = mins;
        this.resetSecs = secs;

        this.going = false;
        this.interval = null;
        this.done = 0;
        this.addTally = addTally;

        // Update document elements
        this.updateTime();
        
    }
    
    oneSecond() {
        if (this.going == true) {
            this.seconds -= 1;
            if (this.seconds < 0) {
                this.minutes -= 1;
                this.seconds = 59;
            }
        }
    }
    
    checkIfDone() {
        if (this.seconds == 0 && this.minutes == 0) {
            document.title = "Tomate: Done!";
            alert("Done!");
            document.title = "Tomate";

            clearInterval(this.interval);
            
            this.done += 1;
            this.going = false;
            this.button.removeAttribute("disabled");
            this.minutes = this.resetMins;
            this.seconds = this.resetSecs;
            this.updateTime();
            this.updateTally();
            
            anyTimerRunning = false;
        }
    }

    updateTally() {
        if (this.addTally == true){
            this.tally = document.getElementById("tally");
            this.rowNum = this.done - 1;
            if ((this.rowNum) % 4 == 0) {;
                doneContainer = document.createElement('div');
                doneContainer.setAttribute('class', 'doneContainer')
                this.tally.appendChild(doneContainer);
            }
            
            doneBlock = document.createElement('div');
            doneBlock.setAttribute('class', 'doneBlock');
            
            this.tally.children[Math.floor(this.rowNum / 4)].appendChild(doneBlock);
        }
    }
    
    updateTime() {
        this.row.getElementsByClassName("minutes")[0].innerHTML 
            = padShortNum(this.minutes);
        this.row.getElementsByClassName("seconds")[0].innerHTML 
            = padShortNum(this.seconds);
        if (this.going == true) {
            document.title = "Tomate: " + padShortNum(this.minutes) +
            ":" + padShortNum(this.seconds);
        }
    }
    
    runTimer() {
        if (this.going == true) {
            this.oneSecond();
            this.updateTime();
            this.checkIfDone();
        }
    }
}   
    
var doneContainer;
var doneBlock;

var anyTimerRunning = false;

var work = new Timer(document.getElementById("work"), 25, 0, true);
var brk = new Timer(document.getElementById("brk"), 5, 0, false);

function padShortNum(x) {
    if (x < 10) {
        return "0"+x;
    } else {
        return x;
    }
}

function startTimer(o) {
    if (anyTimerRunning == false){
        anyTimerRunning = true;
        
        o.going = true;
        o.button.setAttribute("disabled", true);
        o.interval = setInterval (
            function() {o.runTimer() }, 1000
        );
    }
    
}
