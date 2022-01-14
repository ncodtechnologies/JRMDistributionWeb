$(function () {
  $(".container .ftitle").on("click", function () {
    if ($(this).parent().next().hasClass("open")) {
      $(this).parent().next().removeClass("open");
      $(this)
        .children()
        .first()
        .children()
        .first()
        .attr("class", "fas fa-caret-right");
    } else {
      $(this).parent().next().addClass("open");
      $(this)
        .children()
        .first()
        .children()
        .first()
        .attr("class", "fas fa-caret-down");
    }
  });
});

function setOnClicks() {
  $(".container .ftitle").on("click", function () {
    if ($(this).parent().next().hasClass("open")) {
      $(this).parent().next().removeClass("open");
      $(this)
        .children()
        .first()
        .children()
        .first()
        .attr("class", "fas fa-caret-right");
    } else {
      $(this).parent().next().addClass("open");
      $(this)
        .children()
        .first()
        .children()
        .first()
        .attr("class", "fas fa-caret-down");
    }
  });
}
