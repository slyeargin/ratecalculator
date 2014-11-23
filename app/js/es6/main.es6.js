(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('.hourlyRate').text($('input[name=baseRate]').val());
    $('#addOption').click(addOption);
    $('#options').on('click', '.selectOption', adjustRate);
  }

  function adjustRate(){
    var adjustedRate = parseInt($('input[name=baseRate]').val());
    var selectedOptions = $('.selectOption:checked').closest('tr');
    selectedOptions.map((i,d)=>$(d).attr('data-amount')).each((i, value)=>{
      value = parseInt(value);
      if (value > 0){
        adjustedRate = increaseRate(adjustedRate, value);
      } else {
        adjustedRate = decreaseRate(adjustedRate, value);
      }
      updateRateDisplay(adjustedRate);
    });
  }

  function updateRateDisplay(rate){
    $('.hourlyRate').text(rate);
  }

  function increaseRate(adjustedRate, value){
    adjustedRate += value;
    return adjustedRate;
  }

  function decreaseRate(adjustedRate, value){
    adjustedRate = (adjustedRate + value < 0) ? 0 : adjustedRate + value;
    return adjustedRate;
  }

  function addOption(){
    var description = $('.addOption input[name=description]').val();
    var addOrSubtract = $('.addOption input[name=addOrSubtract]:checked').val();
    var amount = $('.addOption input[name=amount]').val();
    createOption(description, addOrSubtract, amount);
  }

  function createOption(description, addOrSubtract, amount){
    var optionsList = $('#options tbody');
    $('#option table tbody tr').clone().appendTo(optionsList);
    $('#options tr .description').last().text(description);
    $('#options tr .amount').last().text('$' + amount);
    if (addOrSubtract === 'decrease'){
      $('#options tr .amount').last().prepend('-');
      amount *= -1;
    }
    $('#options tr').last().attr('data-amount', amount);
    clearAddOptionForm();
  }

  // function deleteOption

  function clearAddOptionForm(){
    $('.addOption input[name=description]').val('');
    $('.addOption input[name=addOrSubtract]').prop('checked', false);
    $('.addOption input[name=addOrSubtract][value=increase]').prop('checked', true);
    $('.addOption input[name=amount]').val('');
  }

})();
