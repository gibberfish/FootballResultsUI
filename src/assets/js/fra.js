$(document).ready(function() {




  $('#datetimepicker1').datepicker({
    format: 'D dd/mm/yyyy',
    autoclose: true
  });




  $('#league-table-button').on('click', function (e) {
    $('#league-table-button').addClass('active');
    $('#fixtures-button').removeClass('active');
    $('#league-table').removeClass('collapse');
    $('#fixtures').addClass('collapse');
  })

  $('#fixtures-button').on('click', function (e) {
    $('#league-table-button').removeClass('active');
    $('#fixtures-button').addClass('active');
    $('#league-table').addClass('collapse');
    $('#fixtures').removeClass('collapse');
  })


});
