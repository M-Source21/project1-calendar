// Insert Weeks and Days in the Calendar
function calendarStructure() {
  for (i = 0; i < 5; i++) {
    $("#calendarMonth").append(`<div id="weeks_${i + 1}"></div>`);
  }
  for (i = 0; i < 7; i++) {
    $("#weeks_1").append(
      `<div class="days"><a href="#"data-toggle="modal" data-target="#exampleModalLong"></a></div>`
    );
    $("#weeks_2").append(
      `<div class="days"><a href="#"data-toggle="modal" data-target="#exampleModalLong"></a></div>`
    );
    $("#weeks_3").append(
      `<div class="days"><a href="#"data-toggle="modal" data-target="#exampleModalLong"></a></div>`
    );
    $("#weeks_4").append(
      `<div class="days"><a href="#"data-toggle="modal" data-target="#exampleModalLong"></a></div>`
    );
    $("#weeks_5").append(
      `<div class="days"><a href="#"data-toggle="modal" data-target="#exampleModalLong"></a></div>`
    );
  }
}

calendarStructure();

// Month
var daysLeftGlobalMonth;
var currentPageMonth;
function currentMonth() {
  if ($("#currentMonth").innerText == "January") {
    currentPageMonth = "01";
  } else if ($("#currentMonth").innerText == "February") {
    currentPageMonth = "02";
  } else if ($("#currentMonth").innerText == "March") {
    currentPageMonth = "03";
  } else if ($("#currentMonth").innerText == "April") {
    currentPageMonth = "04";
  } else if ($("#currentMonth").innerText == "May") {
    currentPageMonth = "05";
  } else if ($("#currentMonth").innerText == "June") {
    currentPageMonth = "06";
  } else if ($("#currentMonth").innerText == "July") {
    currentPageMonth = "07";
  } else if ($("#currentMonth").innerText == "August") {
    currentPageMonth = "08";
  } else if ($("#currentMonth").innerText == "September") {
    currentPageMonth = "09";
  } else if ($("#currentMonth").innerText == "October") {
    currentPageMonth = "10";
  } else if ($("#currentMonth").innerText == "November") {
    currentPageMonth = "11";
  } else if ($("#currentMonth").innerText == "December") {
    currentPageMonth = "12";
  }
}

// Insert days in the calendar
function insertDaysIntoTable(month, num) {
  var daysLeftMonth = 7 - ((35 - (num + month.length)) % 7);

  for (i = 0; i < 7 - num; i++) {
    $("#weeks_1")[0].children[`${num + i}`].children[0].id =
      currentPageMonth + (i + 1);
    $("#weeks_1")[0].children[`${num + i}`].children[0].text = month[i];
  }
  for (i = 0; i < 7; i++) {
    $("#weeks_2")[0].children[`${i}`].children[0].text = month[7 - num + i];
    $("#weeks_2")[0].children[`${i}`].children[0].id =
      currentPageMonth + (8 - num + i);
    $("#weeks_3")[0].children[`${i}`].children[0].text = month[14 - num + i];
    $("#weeks_3")[0].children[`${i}`].children[0].id =
      currentPageMonth + (15 - num + i);
    $("#weeks_4")[0].children[`${i}`].children[0].text = month[21 - num + i];
    $("#weeks_4")[0].children[`${i}`].children[0].id =
      currentPageMonth + (22 - num + i);
    $("#weeks_5")[0].children[`${i}`].children[0].text = month[28 - num + i];
    $("#weeks_5")[0].children[`${i}`].children[0].id =
      currentPageMonth + (29 - num + i);
  }
  for (i = 0; i < num; i++) {
    $("#weeks_1")[0].children[`${i}`].children[0].text = "";
  }
  for (i = 0; i < 7 - daysLeftMonth; i++) {
    $("#weeks_5")[0].children[`${i + daysLeftMonth}`].children[0].text = "";
  }

  daysLeftGlobalMonth = daysLeftMonth;
}

function insertDaysIntoTableMonthly(month) {
  if (month === "January") {
    insertDaysIntoTable(January, 3);
  } else if (month === "February") {
    insertDaysIntoTable(February, 6);
  } else if (month === "March") {
    insertDaysIntoTable(March, 0);
  } else if (month === "April") {
    insertDaysIntoTable(April, 3);
  } else if (month === "May") {
    insertDaysIntoTable(May, 5);
  } else if (month === "June") {
    insertDaysIntoTable(June, 1);
  } else if (month === "July") {
    insertDaysIntoTable(July, 3);
  } else if (month === "August") {
    insertDaysIntoTable(August, 6);
  } else if (month === "September") {
    insertDaysIntoTable(September, 2);
  } else if (month === "October") {
    insertDaysIntoTable(October, 4);
  } else if (month === "November") {
    insertDaysIntoTable(November, 0);
  } else if (month === "December") {
    insertDaysIntoTable(December, 2);
  }
}

// Current month
today = new Date();
var currentMonth = $("#currentMonth")[0];
var month = today.getMonth();
currentMonth.innerText = monthYear[month];
// Previous Button
$("#previousMonthBtn").on("click", function () {
  month--;
  let currentMonthIntoTable = monthYear[month];
  currentMonth.innerText = currentMonthIntoTable;
  if (month === 0) {
    $("#previousMonthBtn").hide();
  } else {
    $("#nextMonthBtn").show();
  }
  insertDaysIntoTableMonthly(currentMonthIntoTable);
});
// Next Button
$("#nextMonthBtn").on("click", function () {
  month++;
  let currentMonthIntoTable = monthYear[month];
  currentMonth.innerText = currentMonthIntoTable;
  if (month === 11) {
    $("#nextMonthBtn").hide();
  } else {
    $("#previousMonthBtn").show();
  }
  insertDaysIntoTableMonthly(currentMonthIntoTable);
});

// Insert Initial Month / Day in Calendar
insertDaysIntoTable(September, 2);
