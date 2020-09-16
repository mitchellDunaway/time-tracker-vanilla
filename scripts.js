ready(initializePage);

function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function initializePage(){
	var 
		startingElements = {
			adderWrapper: document.querySelectorAll('.adder-wrapper')[0],
			timerWrapper: document.querySelectorAll('.timer-wrapper')[0]
		}
	;
	// create the adder
	var addBlock = adderClass(startingElements);
	addBlock.updateDOM(startingElements.adderWrapper);
}

function adderClass(startingElements){
	var
		adderContainer,
		timerAddButton,
		timerNameField,
		thisTimer,
		createNewTimer = function(e){
			thisTimer = timerClass();
			thisTimer.createTimer(startingElements.timerWrapper, timerNameField.value);
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
		},
		toggleStartPauseLabel = function(){
			startPauseButton.innerText = counter.getRunning() ? "pause" : "start";
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
				startPauseButton.addEventListener("click", counter.startStop);
				startPauseButton.addEventListener("click", toggleStartPauseLabel);
				resetButton.addEventListener("click", counter.reset);

				// print to DOM
				target.appendChild(timerContainer);

			},
			startCounter: function(e){
				if(counter){
					counter.startStop(e);
					toggleStartPauseLabel();
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
			'startStop': function (event) {				
				running = !running;				
				if (running) {
					beginNewInterval();
					incrementCounter();
				} else {
					updateCumulative();
					beginNewInterval();
					printTotal();
				}
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
