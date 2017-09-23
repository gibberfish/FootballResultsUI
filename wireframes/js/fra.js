$(document).ready(function() {
  
    $(".toggle-accordion").on("click", function() {
  
      var accordionId = $(this).attr("data-parent"),
        numPanelOpen = $(accordionId + ' .collapse.in').length;
  
      $(this).toggleClass("active");
  
      if (numPanelOpen == 0) {
        openAllPanels(accordionId);
      } else {
        closeAllPanels(accordionId);
      }
    })
  
    openAllPanels = function(aId) {
      console.log("setAllPanelOpen (id=" + aId + ")");
      $(aId + ' .panel-collapse:not(".in")').collapse('show');
    }
    closeAllPanels = function(aId) {
      console.log("setAllPanelclose (id=" + aId + ")");
      $(aId + ' .panel-collapse.in').collapse('hide');
    }
  
  
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
  