// ie8 대응
$(function() {
  function init() {
    // 각종 pseudo class를 select 할 수 없기 때문에 js로 임의의 class 추가하고 가상 요소들도 임의의 tag 로 추가
    $("button[class^='rui']:disabled").removeAttr('disabled').addClass('rui_button_disabled').click(function() {
      return false;
    });
    $('.rui_radio_label').append("<div class='before'></div><div class='after'></div>");
    $('.rui_checkbox_label').append("<div class='before'></div><div class='after'><span class='icon-check_1'></span></div>");
    $('.rui_tab_1 a, .rui_tab_1 button, .rui_tab_2 a, .rui_tab_2 button').append("<span class='underbar'></span>");
  }

  function addEvent() {
    invalidateInputButton('.rui_radio');
    $('.rui_radio_input').change(function() {
      invalidateInputButton('.rui_radio');
    });

    invalidateInputButton('.rui_checkbox');
    $('.rui_checkbox_input').change(function() {
      invalidateInputButton('.rui_checkbox');
    });
  }

  function invalidateInputButton(target_input) {
    $(target_input + '_label').removeClass('checked').removeClass('disabled');
    $(target_input + '_input:disabled + ' + target_input + '_label').addClass('disabled');
    $(target_input + '_input:not([disabled]):checked + ' + target_input + '_label').addClass('checked');
  }

  init();
  addEvent();
});