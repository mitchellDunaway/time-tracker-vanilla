# Time Tracker

A tool for tracking how long multiple simultaneous things take.

## TODO list

### current goals
* [x] global buttons
	* [x] play all
	* [x] pause all
	* [x] reset
	* [x] remove all
* [x] fix bug where "play all" resets counters if they are already playing
* [x] fix usability problems with adder text field 
	* [x] pressing enter should add timer
	* [x] add placeholder text or a label
* [x] playing timers should be very easy to differentiate from paused timers
* [x] allow editing of counters: adjust time with arrows
* [x] timers should animate disappearance when removed
* [x] npm init
* [x] install Sass
* [x] refactor CSS with Sass
* [ ] refactor using ES6
* [ ] refactor animation to use [layout-tween](https://www.npmjs.com/package/layout-tween)
* [ ] allow one counter to be put in document title
* [ ] rebuild as a [React project](https://github.com/mitchellDunaway/time-tracker)
* [ ] allow the timers to be reordered by drag and drop
* [ ] add a desktop alert if a timer has been paused for given amount of time

### stretch-goals
* [ ] Write a back-end in Node.js to
	* [ ] accounts
	* [ ] buckets are grouped together in a "day" container that is tied to the current date
	* [ ] historic tracked time data can be viewed
	* [ ] bucket names can be pulled from [Replicon](https://www.replicon.com/help-center/developers/)
* [ ] add countdown timers