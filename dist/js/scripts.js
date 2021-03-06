var 
startingElements = {},
timerArray = []
;

ready(initializePage);

function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function initializePage(){

	startingElements.globalActionsWrapper = document.querySelectorAll('.global-actions-wrapper')[0];
	startingElements.adderWrapper = document.querySelectorAll('.adder-wrapper')[0];
	startingElements.timerWrapper = document.querySelectorAll('.timer-wrapper')[0];

	// create the global actions block
	var globalActionsBlock = globalActionsClass();
	globalActionsBlock.updateDOM(startingElements.globalActionsWrapper);

	// create the adder
	var addBlock = adderClass();
	addBlock.updateDOM(startingElements.adderWrapper);

}

function globalActionsClass(){
	var
		globalActionsContainer,
		pauseAll = function(e){
			// loop through all the timers
			for(let i in timerArray){
				// call the pause method
				timerArray[i].pauseCounter();
			}
		},
		playAll = function(e){
			// loop through all the timers
			for(let i in timerArray){
				// call the play method
				timerArray[i].startCounter();
			}
		},
		resetAll = function(e){
			// loop through all the timers
			for(let i in timerArray){
				// call the reset method
				timerArray[i].resetCounter();
			}
		},
		removeAll = function(e){
			for(let i in timerArray){
				timerArray[i].addClassToTimer("timer--disappear");
			}
			setTimeout(() => {
				timerArray = [];
				// I'd prefer not to use innerHTML in general, but I can't think of a better way to do this
				startingElements.timerWrapper.innerHTML = "";
			}, 450);
		},
		newObj = {
			'updateDOM': function(target){
				// Global Actions container
				globalActionsContainer = document.createElement("div");
				globalActionsContainer.classList.add("global-actions");

				// pause button
				pauseAllButton = document.createElement("button");
				pauseAllButton.classList.add("global-actions__button");
				pauseAllButton.innerText = "Pause All";
				pauseAllButton.addEventListener("click", pauseAll);			
				globalActionsContainer.appendChild(pauseAllButton);

				// pause icon
				pauseIcon = document.createElement("i");
				pauseIcon.classList.add("fas", "fa-pause-circle", "global-actions__icon");
				pauseAllButton.prepend(pauseIcon);

				// play button
				playAllButton = document.createElement("button");
				playAllButton.classList.add("global-actions__button");
				playAllButton.innerText = "Play All";
				playAllButton.addEventListener("click", playAll);			
				globalActionsContainer.appendChild(playAllButton);

				// play icon
				playIcon = document.createElement("i");
				playIcon.classList.add("fas", "fa-play-circle", "global-actions__icon");
				playAllButton.prepend(playIcon);				
				
				// reset button
				resetAllButton = document.createElement("button");
				resetAllButton.classList.add("global-actions__button");
				resetAllButton.innerText = "Reset All";
				resetAllButton.addEventListener("click", resetAll);			
				globalActionsContainer.appendChild(resetAllButton);

				// reset icon
				resetIcon = document.createElement("i");
				resetIcon.classList.add("fas", "fa-undo-alt", "global-actions__icon");
				resetAllButton.prepend(resetIcon);						
				
				// remove button
				removeAllButton = document.createElement("button");
				removeAllButton.classList.add("global-actions__button");
				removeAllButton.innerText = "Remove All";
				removeAllButton.addEventListener("click", removeAll);			
				globalActionsContainer.appendChild(removeAllButton);	
				
				// remove icon
				removeIcon = document.createElement("i");
				removeIcon.classList.add("fas", "fa-trash-alt", "global-actions__icon");
				removeAllButton.prepend(removeIcon);					

				// print to DOM
				target.appendChild(globalActionsContainer);
			}
		}
	;	
	return newObj;	
}

function adderClass(){
	var
		adderContainer,
		timerAddButton,
		timerNameField,
		thisTimer,
		createNewTimer = function(e){
			thisTimer = timerClass();
			thisTimer.createTimer(startingElements.timerWrapper, timerNameField.value);
			timerArray.push(thisTimer);
			timerNameField.value = "";
		},
		createNewTimerAndStart = function(e){
			createNewTimer(e);
			thisTimer.startCounter(e);
		},
		newObj = {
			'updateDOM': function(target){
				// adder container
				adderContainer = document.createElement("div");
				adderContainer.classList.add("adder");
				
				// name textfield
				timerNameField = document.createElement("input");
				timerNameField.type = "textfield";
				timerNameField.name = "adder__textfield";
				timerNameField.classList.add("adder__textfield");
				timerNameField.placeholder = "Timer Name";
				timerNameField.addEventListener("keydown", e => {
					if(e.code === "Enter" || e.code === "NumpadEnter"){
						createNewTimerAndStart();
					}
				});

				adderContainer.appendChild(timerNameField);

				// add button
				timerAddButton = document.createElement("button");
				timerAddButton.classList.add("adder__button");
				timerAddButton.innerText = "Add";
				timerAddButton.addEventListener("click", createNewTimer);			
				adderContainer.appendChild(timerAddButton);

				// add and start button
				timerAddAndStartButton = document.createElement("button");
				timerAddAndStartButton.classList.add("adder__button", "adder__button--start");
				timerAddAndStartButton.innerText = "Add and Start";
				timerAddAndStartButton.addEventListener("click", createNewTimerAndStart);			
				adderContainer.appendChild(timerAddAndStartButton);	

				// add icon
				addIcon = document.createElement("i");
				addIcon.classList.add("fas", "fa-plus-circle", "adder__icon");
				timerAddAndStartButton.prepend(addIcon);

				// print to DOM
				target.appendChild(adderContainer);
			}
		}
	;	
	return newObj;	
}

function timerClass() {
	
	var
		timerContainer,
		startPauseButton,
		resetButton,
		removeButton,
		displayDiv,
		counter,
		nameTitle,
		removeTimer = function(){

		},
		toggleStartPause = function(){
			if(counter.getRunning() === true){
				newObj.pauseCounter();
			} else {
				newObj.startCounter();
			}			
		},
		newObj = {
			'createTimer': function(target, name){

				name = name || `timer-${timerArray.length}`;

				// timer container
				timerContainer = document.createElement("div");
				timerContainer.classList.add("timer", "timer--appear");
				timerContainer.id = name;

				// name				
				nameTitle = document.createElement("input");
				nameTitle.type = "textfield";
				nameTitle.name = "timer__textfield";
				nameTitle.classList.add("timer__name");
				nameTitle.value = name;
				timerContainer.append(nameTitle);

				// button container
				buttonContainer = document.createElement("div");
				buttonContainer.classList.add("timer__button-container");
				timerContainer.append(buttonContainer);

				// start/pause button
				startPauseButton = document.createElement("button");
				startPauseButton.innerText = "start";
				startPauseButton.classList.add("timer__button");
				buttonContainer.append(startPauseButton);

				// reset button				
				resetButton = document.createElement("button");
				resetButton.innerText = "reset";
				resetButton.classList.add("timer__button");
				buttonContainer.append(resetButton);

				// remove button
				removeButton = document.createElement("button");
				removeButton.innerText = "remove";
				removeButton.classList.add("timer__button");
				removeButton.addEventListener("click", () => {	
					this.addClassToTimer("timer--disappear");
					setTimeout(()=>{
						// remove and delete timer
						timerContainer.remove();
						// remove it from the array
						for (let i in timerArray){
							if(timerArray[i] === newObj){
								timerArray.splice(i,1);
							}
						}
					}, 450);
				});
				buttonContainer.append(removeButton);

				// display
				displayDiv = document.createElement("div");
				displayDiv.classList.add("timer__display");
				timerContainer.append(displayDiv);

				// increment Hours
				incrementHoursButton = document.createElement("button");
				incrementHoursButton.innerHTML = "<i class=\"fas fa-caret-up\"></i>";
				incrementHoursButton.classList.add("timer__set-time");
				displayDiv.append(incrementHoursButton);

				// increment Minutes
				incrementMinutesButton = document.createElement("button");
				incrementMinutesButton.innerHTML = "<i class=\"fas fa-caret-up\"></i>";
				incrementMinutesButton.classList.add("timer__set-time");
				displayDiv.append(incrementMinutesButton);
				
				// increment Seconds
				incrementSecondsButton = document.createElement("button");
				incrementSecondsButton.innerHTML = "<i class=\"fas fa-caret-up\"></i>";
				incrementSecondsButton.classList.add("timer__set-time");
				displayDiv.append(incrementSecondsButton);
				
				// hoursDisplay
				hoursDisplayDiv = document.createElement("div");
				hoursDisplayDiv.classList.add("timer__display-time", "timer__hoursDisplay");
				displayDiv.append(hoursDisplayDiv);
				
				// minutesDisplay
				minutesDisplayDiv = document.createElement("div");
				minutesDisplayDiv.classList.add("timer__display-time", "timer__minutesDisplay");
				displayDiv.append(minutesDisplayDiv);
				
				// secondsDisplay
				secondsDisplayDiv = document.createElement("div");
				secondsDisplayDiv.classList.add("timer__display-time", "timer__secondsDisplay");
				displayDiv.append(secondsDisplayDiv);

				// decrement Hours
				decrementHoursButton = document.createElement("button");
				decrementHoursButton.innerHTML = "<i class=\"fas fa-caret-down\"></i>";
				decrementHoursButton.classList.add("timer__set-time");
				displayDiv.append(decrementHoursButton);

				// decrement minutes
				decrementMinutesButton = document.createElement("button");
				decrementMinutesButton.innerHTML = "<i class=\"fas fa-caret-down\"></i>";
				decrementMinutesButton.classList.add("timer__set-time");
				displayDiv.append(decrementMinutesButton);

				// decrement Seconds
				decrementSecondsButton = document.createElement("button");
				decrementSecondsButton.innerHTML = "<i class=\"fas fa-caret-down\"></i>";
				decrementSecondsButton.classList.add("timer__set-time");
				displayDiv.append(decrementSecondsButton);

				// counter
				counter = counterClass();
				counter.reset();
				counter.setSecondsDisplay(secondsDisplayDiv);
				counter.setMinutesDisplay(minutesDisplayDiv);
				counter.setHoursDisplay(hoursDisplayDiv);
				startPauseButton.addEventListener("click", toggleStartPause);
				resetButton.addEventListener("click", counter.reset);
				incrementHoursButton.addEventListener("click", counter.incrementHours);
				decrementHoursButton.addEventListener("click", counter.decrementHours);
				incrementMinutesButton.addEventListener("click", counter.incrementMinutes);
				decrementMinutesButton.addEventListener("click", counter.decrementMinutes);
				incrementSecondsButton.addEventListener("click", counter.incrementSeconds);
				decrementSecondsButton.addEventListener("click", counter.decrementSeconds);


				// print to DOM
				target.appendChild(timerContainer);

			},
			'startCounter': function(e){
				if(counter){
					if(counter.getRunning() === false){
						startPauseButton.innerText = "pause";
						timerContainer.classList.add("playing");
						counter.start();
					}
				}
			},
			'pauseCounter': function(e){
				if(counter){
					if(counter.getRunning() === true){
						startPauseButton.innerText = "start";
						timerContainer.classList.remove("playing");
						counter.stop();
					}
				}
			},
			'resetCounter': function(e){
				if(counter){
					counter.reset();
				}
			},
			'addClassToTimer': function(newClass){
				timerContainer.classList.add(newClass);
			}
		}
	;
	return newObj;
}




function counterClass() {

	var
		initialDate,
		currentDate,
		intervalDate,
		cumulativeDate,
		totalDate,
		secondsDisplay,
		minutesDisplay,
		hoursDisplay,
		totalDisplay,
		running = false,
		beginNewInterval = function () {
			initialDate = new Date;
			currentDate = new Date;
			intervalDate = new Date(0);
		},
		runCounter = function () {
			currentDate = new Date;
			intervalDate.setTime( currentDate.getTime() - initialDate.getTime() );
			printTotal();
			if (running) {
				setTimeout(runCounter, 1);
			}
		},
		printTotal = function(){
			if(totalDate){
				totalDate.setTime(cumulativeDate.getTime() + intervalDate.getTime());
			} else {
				totalDate = new Date(0);
			}
			if(typeof secondsDisplay !== 'undefined'){
				secondsDisplay.innerText = totalDate.toISOString().substr(17, 2);
			}
			if(typeof minutesDisplay !== 'undefined'){
				minutesDisplay.innerText = totalDate.toISOString().substr(14, 2);
			}
			if(typeof hoursDisplay !== 'undefined'){
				hoursDisplay.innerText = totalDate.toISOString().substr(11, 2);
			}
			if(typeof totalDisplay !== 'undefined'){
				totalDisplay.innerText = totalDate.toISOString().substr(11, 8);
			}
		},
		updateCumulative = function(){
			cumulativeDate.setTime(totalDate.getTime());
		},
		resetCumulativeDate = function () {
			cumulativeDate = new Date(0);
		},
		newObj = {
			'start': function (event) {				
				running = true;	
				beginNewInterval();
				runCounter();
			},
			'stop': function (event) {				
				running = false;
				updateCumulative();
				beginNewInterval();
				printTotal();
			},
			'reset': function(){
				beginNewInterval();
				resetCumulativeDate();
				printTotal();
			},
			'getRunning': function(){
				return running;
			},
			'setSecondsDisplay': function(element){
				secondsDisplay = element;
			},
			'setMinutesDisplay': function(element){
				minutesDisplay = element;
			},
			'setHoursDisplay': function(element){
				hoursDisplay = element;
			},
			'setTotalDisplay': function(element){
				totalDisplay = element;
			},
			'incrementHours': function(){
				cumulativeDate.setHours(cumulativeDate.getHours() + 1);
				printTotal();
			},
			'decrementHours': function(){
				cumulativeDate.setHours(cumulativeDate.getHours() - 1);
				printTotal();
			},
			'incrementMinutes': function(){
				cumulativeDate.setMinutes(cumulativeDate.getMinutes() + 1);
				printTotal();
			},
			'decrementMinutes': function(){
				cumulativeDate.setMinutes(cumulativeDate.getMinutes() - 1);
				printTotal();
			},
			'incrementSeconds': function(){
				cumulativeDate.setSeconds(cumulativeDate.getSeconds() + 1);
				printTotal();
			},
			'decrementSeconds': function(){
				cumulativeDate.setSeconds(cumulativeDate.getSeconds() - 1);
				printTotal();
			}
		}
	;	
	return newObj;
}
