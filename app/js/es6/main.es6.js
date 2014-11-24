(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    updateRateDisplay($('input[name=baseRate]').val());
    $('#addOption').click(addOption);
    $('#options').on('click', '.delete', deleteOption);
    $('#options').on('click', '.selectOption', adjustRate);
    $('#baseRate').keypress(adjustRate);
  }

  function adjustRate(){
    var adjustedRate = parseInt($('input[name=baseRate]').val());
    if (isNaN(adjustedRate) || adjustedRate < 0 ) {
      alert('Your base rate must be a positive integer.');
    } else {
      updateRateDisplay(adjustedRate);
      var selectedOptions = $('.selectOption:checked').closest('tr');
      selectedOptions.map((i,d)=>$(d).attr('data-amount')).each((i, value)=>{
        value = parseInt(value);
        if (isNaN(value)) {
          alert('Add-on rates must be integers.');
        } else {
          if (value > 0){
            adjustedRate = increaseRate(adjustedRate, value);
          } else {
            adjustedRate = decreaseRate(adjustedRate, value);
          }
          updateRateDisplay(adjustedRate);
        }
        });
    }
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
    amount = parseInt(amount);
    if (description.length === 0 || addOrSubtract.length === 0 || amount.length === 0){
      alert('All fields are required.');
    } else if (isNaN(amount) || amount < 0) {
      alert('Add-on rates must be positive integers.');
    } else {
      if ($('#options tbody .noOptions')) {
        $('#options tbody .noOptions').remove();
      }
      $('#option tr').clone().appendTo(optionsList);
      addDescription(description);
      addAmount(addOrSubtract, amount);
      clearAddOptionForm();
    }
  }

  function addDescription(description){
    $('#options tr .description').last().text(description);
  }

  function addAmount(addOrSubtract, amount){
    $('#options tr .amount').last().text('$' + amount);
    if (addOrSubtract === 'decrease'){
      $('#options tr .amount').last().prepend('-');
      amount *= -1;
    }
    $('#options tr').last().attr('data-amount', amount);
  }

  function deleteOption(){
    $(this).closest('tr').remove();
    var optionsList = $('#options tbody tr');
    if (optionsList.length === 0) {
      $('.noOptions').clone().appendTo($('#options tbody'));
    }
    adjustRate();
  }

  function clearAddOptionForm(){
    $('.addOption input[name=description]').val('');
    $('.addOption input[name=addOrSubtract]').prop('checked', false);
    $('.addOption input[name=addOrSubtract][value=increase]').prop('checked', true);
    $('.addOption input[name=amount]').val('');
  }

})();
