$(function() {
  function addEvent() {
    $('.js_select_button').click(function() { ruiSelectBoxOpenerEvent(this); });
    $('.js_select_option').click(function() { ruiSelectBoxChangedEvent(this); });
    $('.js_search_box_clear_button').click(function() { ruiSearchBoxClearEvent(this); });
  }

  function ruiSelectBoxOpenerEvent(clickedObject) {
    var selectWrapper = $(clickedObject).parents('.js_select_wrapper').eq(0);
    if(!selectWrapper.hasClass('select_opened')) {
      $('.js_select_wrapper').removeClass('select_opened');
    }
    selectWrapper.toggleClass('select_opened');
  }

  function ruiSelectBoxChangedEvent(clickedObject) {
    var selectedOption = $(clickedObject);
    var selectWrapper = selectedOption.parents('.js_select_wrapper').eq(0);
    selectWrapper.find('.js_select_option').removeClass('selected');
    selectedOption.addClass('selected');
    selectWrapper.removeClass('select_opened').find('.js_selected_text').html(selectedOption.html());
    selectWrapper.find('.js_selected_value').val(selectedOption.val()).change();
  }

  function ruiSearchBoxClearEvent(clickedObject) {
    $(clickedObject).parents('.js_search_box').eq(0).find('.js_search_input')[0].value = '';
  }
  
  addEvent();
});