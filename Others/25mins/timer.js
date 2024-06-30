/* Unit of Time 300000
            1 seconds = 1000
            1 minutes = 60000
            1 hour = 3600000
        */
class TimerEnty {
    contentElement = "content";
    indicatorElement = "tmIndicator";

    constructor(minutes, btnId) {
        this.minutes = minutes;
        this.btnId = btnId;

        this.OnClick = () => {

            let timeStopIndicator = document.getElementById(this.indicatorElement);
            timeStopIndicator.style.backgroundColor = "green";

            document.getElementById(this.btnId).onclick = this.timerStarts.bind(this);
        }
    }

    timerStarts() {
        setTimeout(() => {
            this.addDiv();
        }, this.minutes * 60000);
    }
    addDiv() {
        let timeStopIndicator = document.getElementById(this.indicatorElement);
        timeStopIndicator.style.backgroundColor = "red";

        let contentDiv = document.getElementById(this.contentElement);
        let divBox = document.createElement("div");

        divBox.className = "simpleBox";
        divBox.innerHTML = "" + Math.random();
        divBox.onclick = () => { divBox.remove(); };
        contentDiv.appendChild(divBox);

        console.log("hello");

    }
}

const fiveMns = new TimerEnty(5, "five"); 123
fiveMns.OnClick();

setInterval();

const twentyFiveMns = new TimerEnty(25, "twentyFive");
fiveMns.OnClick();