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

var daysLeftGlobalMonth;

function insertDaysIntoTable(month, num) {
  var daysLeftMonth = 7 - ((35 - (num + month.length)) % 7);

  for (i = 0; i < 7 - num; i++) {
    $("#weeks_1")[0].children[`${num + i}`].children[0].text = month[i];
  }
  for (i = 0; i < num; i++) {
    $("#weeks_1")[0].children[`${i}`].children[0].text = "";
  }
  for (i = 0; i < 7; i++) {
    $("#weeks_2")[0].children[`${i}`].children[0].text = month[7 - num + i];
    $("#weeks_3")[0].children[`${i}`].children[0].text = month[14 - num + i];
    $("#weeks_4")[0].children[`${i}`].children[0].text = month[21 - num + i];
    $("#weeks_5")[0].children[`${i}`].children[0].text = month[28 - num + i];
  }
  for (i = 0; i < 7 - daysLeftMonth; i++) {
    $("#weeks_5")[0].children[`${i + daysLeftMonth}`].children[0].text = "";
  }

  daysLeftGlobalMonth = daysLeftMonth;
}

insertDaysIntoTable(daysSeptember, 2);

console.log(daysLeftGlobalMonth);

// function insertDaysIntoTable(month, num) {
//   var startday = $("weeks_1")[0].children[`${num}`];
// }

// insertDaysIntoTable(daysSeptember, 2);