(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#addOption').click(addOption);
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
    }
    $('#options tr').last().attr('data-operation', addOrSubtract);
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
