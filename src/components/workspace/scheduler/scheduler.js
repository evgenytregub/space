import React, {Component} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class Schedule extends Component {
    constructor(props) {
        super(props);
    }

    calendar() {
        let startDate = {'day':'1','month':'2','year':'2021'};
        let endDate = {'day':'1','month':'2','year':'2022'};
        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }
        let calendarList = '';
        for (let i = startDate.year; i < Number(endDate.year) + 1; i++) {
            if (i == Number(startDate.year)) {
                for (let a = Number(startDate.month); a < 25; a++) {
                    let dayList = daysInMonth(a, i);
                    for (let b = 1; b < dayList + 1; b++) {
                        calendarList = calendarList + '<p class="day">' + b + '</p>';
                    }
                }
            } else {
                for (let a = 1; a < 25; a++) {
                    let dayList = daysInMonth(a, i);
                    for (let b = 1; b < dayList + 1; b++) {
                        calendarList = calendarList + '<p class="day">' + b + '</p>';
                    }
                }
            }

        }
        return calendarList;
    }

    scheduleData() {
        let scheduleData = {
            'task1': {'name': 'task1', 'start': '20', 'duration': '160', 'predecessors': '1'},
            'task2': {'name': 'task2', 'start': '380', 'duration': '100', 'predecessors': '1'},
            'task3': {'name': 'task3', 'start': '260', 'duration': '100', 'predecessors': '2'},
            'task4': {'name': 'task4', 'start': '80', 'duration': '100', 'predecessors': '1;2'}
        }

        for (let i = 5; i < 100; i++) {
            let taskID = 'task' + i;
            scheduleData[taskID] = {'name': taskID, 'start': '80', 'duration': '100', 'predecessors': '1;2'};
        }
        return scheduleData;
    }

    template() {
        let scheduleData = this.scheduleData();
        console.log(scheduleData);
        let taskRow = "";
        for (let key in scheduleData) {
            taskRow = taskRow + `
        <div id="` + scheduleData[key].name + `" class="sch_h" start="` + scheduleData[key].start + `" duration="` + scheduleData[key].duration + `" predecessors="` + scheduleData[key].predecessors + `">
          <p class="coll_5">1</p>
          <p class="coll_25"><input type="text" id="` + scheduleData[key].name + `_name" value="` + scheduleData[key].name + `" style="height: 20px; width: 90%; margin-left: 5%; border: 0"></p>
          <p class="coll_15"><input type="text" id="` + scheduleData[key].name + `_duration" value="` + scheduleData[key].duration + `" style="height: 20px; width: 90%; margin-left: 5%; border: 0"></p>
          <p class="coll_10"><input type="text" id="` + scheduleData[key].name + `_start" value="` + scheduleData[key].start + `" style="height: 20px; width: 90%; margin-left: 5%; border: 0"></p>
          <p class="coll_10">123</p>
          <p class="coll_20"><input type="text" id="` + scheduleData[key].name + `_predecessors" value="` + scheduleData[key].predecessors + `" style="height: 20px; width: 90%; margin-left: 5%; border: 0"></p>
          <p class="coll_20">123</p>
        </div>
      `;
        }
        return taskRow;
    }
    canvasExecutionBlock (taskID) {
        let task = document.querySelector(taskID);
        console.log("task");
        console.log(taskID);
        console.log(task);
        let taskCoord = task.getBoundingClientRect();
        let taskY = taskCoord.y + taskCoord.height / 4;
        let taskX = taskCoord.x + Number(task.getAttribute('start')) + Number(taskCoord.width);
        let width = task.getAttribute('duration');
        let taskXDuration = taskX + Number(width) - 3;
        let taskYDuration = Number(taskY) - 8;
        let removeID =  taskID + '_right';
        let removeCheck = document.getElementById(removeID);
        if(removeCheck){
            removeCheck.remove();
        }
        let taskBlock = '<div id="' + taskID + '" class="" style="position: absolute; z-index: 990; cursor: move; left: ' + taskX + 'px; top: ' + taskY + 'px; height: 12.5px; width: ' + width + 'px; background-color: #0b2e13">'+
            '</div>' +
            '<div id="' + taskID + '_right" class="" style="position: absolute; z-index: 990; cursor: ew-resize; left: ' + taskXDuration + 'px; top: ' + taskYDuration + 'px;">' +
            '   <svg xmlns="http://www.w3.org/2000/svg" style="color: #993333" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">' +
            '       <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>' +
            '   </svg>' +
            '</div>';
        let input = document.getElementById('root');
        let taskElement=document.getElementById(taskID);
        if(!taskElement) {
            input.insertAdjacentHTML('afterbegin', taskBlock);
        } else {
            document.getElementById(taskID).remove();
            input.insertAdjacentHTML('afterbegin', taskBlock);
        }
    }

    componentDidMount() {
        let taskNumber = document.getElementById('taskList').children.length;
        for (let i = 1; i < taskNumber + 1; i++) {
            let taskID = '#task' + i;
            this.canvasExecutionBlock(taskID);
        }
    }

    render () {
            return (
            <div className="ws_right">
                <div className="sch">
                    <div className="sch_left">
                        <div className="sch_h">
                            <p className="coll_5">ID</p>
                            <p className="coll_25">Task Name</p>
                            <p className="coll_15">Duration</p>
                            <p className="coll_10">Start</p>
                            <p className="coll_10">Finish</p>
                            <p className="coll_20">Predecessors</p>
                            <p className="coll_20">Responsible</p>
                        </div>
                    </div>
                    <div className="sch_right">
                        <div className="sch_h">
                            {ReactHtmlParser(this.calendar())}
                        </div>
                    </div>
                </div>
                <div className="sch">
                    <div id="taskList" className="sch_left">
                        {ReactHtmlParser(this.template())}
                    </div>
                    <div className="sch_right">
                        <canvas id="myCanvas"></canvas>
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;
