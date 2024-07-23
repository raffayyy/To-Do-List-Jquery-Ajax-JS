$(document).ready(function () {
  var taskId;
  var LIMIT = 20;

  $.ajax({
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/todos?_limit=20",

    success: function (response) {
      console.log(response);
      const listItems = response
        .map(
          (task) =>
            `<li class="todos px-2" data-completed="${task.completed}" data-id="${task.id}"> ${task.title}</li>`
        )
        .join("");
      $("#taskList").append(listItems);

      $(".todos").each(function () {
        if ($(this).data("completed")) {
          $(this).css({
            backgroundColor: "lightgreen",
            color: "white",
            textDecoration: "line-through",
          });
        }
      });
    },
  });

  $("#taskList").on("click", "li", function () {
    if (!$(this).data("completed")) {
      taskId = $(this).data("id");
      let item = $(this).text();
      $("#editInput").val(item);
      $("#pop-up").css("visibility", "visible");
    }
  });

  $("#save-edit").on("click", function () {
    const editedText = $("#editInput").val();
    if (editedText === "") {
      alert("Task cannot be empty");
      $("#pop-up").css("visibility", "hidden");
      return;
    }
    $(`li[data-id=${taskId}]`).text(editedText);
    $("#editInput").val("");
    $("#pop-up").css("visibility", "hidden");
  });

  $("#completed").on("click", function () {
    $(`li[data-id=${taskId}]`).css({
      backgroundColor: "lightgreen",
      color: "white",
      textDecoration: "line-through",
    });
    $(`li[data-id=${taskId}]`).data("completed", true);
    $("#pop-up").css("visibility", "hidden");
  });

  $("#delete").on("click", function () {
    $(`li[data-id=${taskId}]`).remove();
    $("#pop-up").css("visibility", "hidden");
  });

  $("#cancel").on("click", function () {
    $("#editInput").val("");
    $("#pop-up").css("visibility", "hidden");
  });

  $("form").on("submit", (event) => {
    event.preventDefault();
  });

  $("#add-task").on("click", function () {
    let id = $("#taskList li:last-child").data("id") + 1;
    const newTask = $("#new-input").val();
    if (newTask === "") {
      alert("Task cannot be empty");
      return;
    }
    $("#taskList").append(
      `<li class="todos px-2" data-completed="false" data-id="${id}">${newTask}</li>`
    );
    $("#new-task").val("");

    $.ajax({
      type: "POST",
      url: "https://jsonplaceholder.typicode.com/todos",
      data: {
        userId: 1,
        title: newTask,
        completed: false
      },
      success: function (response) {
        console.log(response);
       }
    });
  });
});
