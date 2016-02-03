require(['jquery'], function($) {
  function setRuiSelectBoxEventListener() {
    $('.js_select_button').click(function() {
      var selectWrapper = $(this).parents('.js_select_wrapper').eq(0);
      if (!selectWrapper.hasClass('select_opened')) {
        $('.js_select_wrapper').removeClass('select_opened');
      }
      selectWrapper.toggleClass('select_opened');
    });
    $('.js_select_option').click(function() {
      var selectedOption = $(this);
      var selectWrapper = selectedOption.parents('.js_select_wrapper').eq(0);
      selectWrapper.find('.js_select_option').removeClass('selected');
      selectedOption.addClass('selected');
      selectWrapper.removeClass('select_opened').find('.js_selected_text').html(selectedOption.html());
      selectWrapper.find('.js_selected_value').val(selectedOption.val()).change();
    });
  }

  function setRuiSearchBoxEventListener() {
    $('.js_search_box_clear_button').click(function() {
      $(this).parents('.js_search_box').eq(0).find('.js_search_input')[0].value = '';
    });
  }

  function addRuiSpinnerFunctions() {
    $.fn.addRuiSpinner = function() {
      this.each(function() {
        var $this = $(this);
        $this.addClass('spinner').prop('disabled', true);
      });
      return this;
    };
    $.fn.removeRuiSpinner = function() {
      this.each(function() {
        var $this = $(this);
        if ($this.hasClass('spinner')) {
          $this.removeClass('spinner').prop('disabled', false);
        }
      });
      return this;
    };
  }

  $(function() {
    setRuiSelectBoxEventListener();
    setRuiSearchBoxEventListener();
    addRuiSpinnerFunctions();
  });

});
