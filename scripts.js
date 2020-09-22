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
		newObj = {
			'updateDOM': function(target){
				// Global Actions container
				globalActionsContainer = document.createElement("div");
				globalActionsContainer.classList.add("global-actions", "container");

				// pause button
				pauseAllButton = document.createElement("button");
				pauseAllButton.classList.add("container__button");
				pauseAllButton.innerText = "Pause All";
				pauseAllButton.addEventListener("click", pauseAll);			
				globalActionsContainer.appendChild(pauseAllButton);

				// play button
				playAllButton = document.createElement("button");
				playAllButton.classList.add("container__button");
				playAllButton.innerText = "Play All";
				playAllButton.addEventListener("click", playAll);			
				globalActionsContainer.appendChild(playAllButton);				

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
				adderContainer.classList.add("adder", "container");
				
				// name textfield
				timerNameField = document.createElement("input");
				timerNameField.type = "textfield";
				timerNameField.name = "adder__textfield";
				timerNameField.classList.add("adder__textfield");
				adderContainer.appendChild(timerNameField);

				// add button
				timerAddButton = document.createElement("button");
				timerAddButton.classList.add("container__button");
				timerAddButton.innerText = "Add";
				timerAddButton.addEventListener("click", createNewTimer);			
				adderContainer.appendChild(timerAddButton);

				// add and start button
				timerAddAndStartButton = document.createElement("button");
				timerAddAndStartButton.classList.add("container__button");
				timerAddAndStartButton.innerText = "Add and Start";
				timerAddAndStartButton.addEventListener("click", createNewTimerAndStart);			
				adderContainer.appendChild(timerAddAndStartButton);	

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
			// remove and delete timer
			timerContainer.remove();
			// remove it from the array
			for (let i in timerArray){
				if(timerArray[i] === newObj){
					timerArray.splice(i,1);
				}
			}
			console.log(timerArray);
		},
		toggleStartPause = function(){
			if(counter.getRunning() === true){
				newObj.pauseCounter();
			} else {
				newObj.startCounter();
			}			
		},
		newObj = {
			createTimer: function(target, name){

				// timer container
				timerContainer = document.createElement("div");
				timerContainer.classList.add("timer", "container");
				timerContainer.id = name;

				// name
				nameTitle = document.createElement("div");
				nameTitle.innerText = name;
				nameTitle.classList.add("timer__name");
				timerContainer.append(nameTitle);				

				// start/pause button
				startPauseButton = document.createElement("button");
				startPauseButton.innerText = "start";
				startPauseButton.classList.add("timer__start-stop", "container__button");
				timerContainer.append(startPauseButton);

				// reset button				
				resetButton = document.createElement("button");
				resetButton.innerText = "reset";
				resetButton.classList.add("timer__reset", "container__button");
				timerContainer.append(resetButton);

				// remove button
				removeButton = document.createElement("button");
				removeButton.innerText = "remove";
				removeButton.classList.add("timer__remove", "container__button");
				removeButton.addEventListener("click", removeTimer)	;
				timerContainer.append(removeButton);

				// display
				displayDiv = document.createElement("div");
				displayDiv.classList.add("timer__display");
				timerContainer.append(displayDiv);

				// counter
				counter = counterClass(displayDiv);
				counter.reset();
				startPauseButton.addEventListener("click", toggleStartPause);
				resetButton.addEventListener("click", counter.reset);

				// print to DOM
				target.appendChild(timerContainer);

			},
			startCounter: function(e){
				if(counter){
					startPauseButton.innerText = "pause";
					counter.start();
				}
			},
			pauseCounter: function(e){
				if(counter){
					startPauseButton.innerText = "start";
					counter.stop();
				}
			}
		}
	;
	return newObj;
}




function counterClass(timerDisplayDiv) {

	var
		initialDate,
		currentDate,
		intervalDate,
		cumulativeDate,
		totalDate,
		running = false,
		beginNewInterval = function () {
			initialDate = new Date;
			currentDate = new Date;
			intervalDate = new Date(0);
		},
		incrementCounter = function () {
			currentDate = new Date;
			intervalDate.setTime( currentDate.getTime() - initialDate.getTime() );
			printTotal();
			if (running) {
				setTimeout(incrementCounter, 1);
			}
		},
		printTotal = function(){
			if(totalDate){
				totalDate.setTime(cumulativeDate.getTime() + intervalDate.getTime());
			} else {
				totalDate = new Date(0);
			}
			timerDisplayDiv.innerText = totalDate.toISOString().substr(11, 8);
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
				incrementCounter();
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
			}
		}
	;	
	return newObj;
}
