
    class Timer {
        constructor(row) {
            this.row = row;
            this.id = row.getAttribute("id");
            this.minutes = row.getElementsByClassName("minutes")[0]
                .innerHTML;
            this.seconds = row.getElementsByClassName("seconds")[0]
                .innerHTML;
            this.button = row.getElementsByClassName("go")[0]
            this.going = false;
            this.interval = null;
            
            // Make sure time is displayed correctly
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
                document.title = "Tomate"
                this.going = false;
                clearInterval(this.interval);
                this.button.removeAttribute("disabled");
                this.minutes = 25;
                this.seconds = 0;
                this.updateTime();
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
    
    var work = new Timer(document.getElementById("work"));
    
    function padShortNum(x) {
        if (x < 10) {
            return "0"+x;
        } else {
            return x;
        }
    }
    
    function startTimer(o) {
        o.going = true;
        o.button.setAttribute("disabled", true);
        o.interval = setInterval (
            function() {o.runTimer() }, 1000
        );
    }
