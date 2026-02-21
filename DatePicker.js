'use strict';

class DatePicker {
    /* CONSTRUCTOR DatePicker
    INPUTS:
    ID - The ID attribute of an existing div.
    onDateChanged - A callback function, called when the date needs
    to be changed
    */
    constructor(id, onDateChanged) {
        this.id = id;
        this.onDateChanged = onDateChanged;
        console.log("Constructed!");
    }
    static getHeaderRow1Data() {
        return  [{value: "<", active: true},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: "\u00A0", active: false},
            {value: ">", active: true}];
    }
    static getHeaderRow2Data()
    {
        return [{value: "Su", active: false},
            {value: "Mo", active: false},
            {value: "Tu", active: false},
            {value: "We", active: false},
            {value: "Th", active: false},
            {value: "Fr", active: false},
            {value: "Sa", active: false}];
    }
    getTableCaption()
    {
        const month = this.renderDate.toLocaleString('default', {month: 'long'});
        const calTableCaption = document.createElement("caption");
        const cellText = document.createTextNode(month + " " + this.renderDate.getFullYear());
        calTableCaption.appendChild(cellText);
        console.log("Caption created and returned!");
        return calTableCaption;
    }
    getTableHeader() {
        const date = this.renderDate;
        const tableHeader = document.createElement("thead");
        const headerRow = this.translateRow(DatePicker.getHeaderRow1Data(), "th");
        headerRow.children[0].setAttribute("class","month-selector");
        headerRow.children[0].onclick = () => {
            date.setMonth(date.getMonth() - 1);
            this.render(date);
        };
        headerRow.children[6].setAttribute("class", "month-selector");
        headerRow.children[6].onclick = () => {
            date.setMonth(date.getMonth() + 1);
            this.render(date);
        };
        console.log("Created Header Attribute!");
        tableHeader.appendChild(headerRow);
        tableHeader.appendChild(this.translateRow(DatePicker.getHeaderRow2Data(),"th"));
        console.log("Appended both headers!");
        return tableHeader;
    }

    /*
    Has to create the calendar with all the rows.
    */
    createCalendar() {
        const selectedMonth = this.renderDate.getMonth();
        const dateIterator = new Date(this.renderDate.getFullYear(), this.renderDate.getMonth(), 1);
        dateIterator.setDate(dateIterator.getDate() - dateIterator.getDay());
        const calendarTable = document.createElement("tbody");
        // Going through the month.
        for(let i = 0; i < 7; i++) {
            //Taken from sample solution.
            // This breaks the calendar creation loop when the gridDay month
            // no longer matches the selected month of the calendar.
            if(i > 4 && dateIterator.getMonth() !== selectedMonth) {
                break;
            }
            const appendRowData = [];
            for (let j = 0; j < 7; j++) {
                appendRowData.push({
                    value: dateIterator.getDate(),
                    active: dateIterator.getMonth() === selectedMonth
                });
                dateIterator.setDate(dateIterator.getDate() + 1);
            }
            const row = this.translateRow(appendRowData,"td");
            calendarTable.appendChild(row);
        }
        return calendarTable;
    }
    translateRow(rowValues,typeRow) 
    {
        const rowElement = document.createElement("tr");
        for (let index = 0; index < rowValues.length; index++) {
            const rowCell = document.createElement(typeRow);
            const rowCellTest = document.createTextNode(rowValues[index].value);
            rowCell.appendChild(rowCellTest);
            if (rowValues[index].active) {
                const fixedDate = {
                    month: this.renderDate.getMonth() + 1,
                    day: rowValues[index].value,
                    year: this.renderDate.getFullYear()
                };
                rowCell.onclick = () => {this.onDateChanged(this.id, fixedDate);};
            } else {
                rowCell.setAttribute("class", "not-in-month");
            }
            rowElement.appendChild(rowCell);
        }
        return rowElement;
    }
    getTable() {
        const calTable = document.createElement("table");
        calTable.append(this.getTableCaption());
        calTable.append(this.getTableHeader());
        calTable.append(this.createCalendar());
        return calTable;
    }
    render(date) {
        this.renderDate = date;
        if (typeof date === "object") {
            const calendarContainer = document.getElementById(this.id);
            if (calendarContainer.firstChild !== null) {
                calendarContainer.removeChild(calendarContainer.firstChild);
            }
            calendarContainer.appendChild(this.getTable());
        }
    }
}
