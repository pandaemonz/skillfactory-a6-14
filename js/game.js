const numDivs = 36;
const maxHits = 10;

let hits = 1;
let errors = 0;
let firstHitTime = 0;
let cor_hits = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(".target").text(hits);
  // FIXME: тут надо определять при первом клике firstHitTime
  // if (hits === 1){
  //   firstHitTime = getTimestamp();
  // }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  cor_hits = hits - errors;
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#correct-squares").text(cor_hits);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#error-squares").text(errors);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
    $(event.target).text("");
    $(event.target).removeClass("target");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    $(event.target).addClass("miss");
    errors += 1;
    hits = hits + 1;
    if (hits === maxHits) {
      endGame();
    }
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $(".game-field").hide();
  $("#button-start").click(function(){
    $(".game-field").show();
    firstHitTime = getTimestamp();
    round();
    document.getElementById("button-start").disabled = true;
  })
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
