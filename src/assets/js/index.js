jQuery(function ($) {
    //Hiden SideBar 
    $("#close-sidebar").click(function () {
        $("#wrapper").addClass("toggled");
    });
    $("#show-sidebar a").click(function () {
        $("#wrapper").removeClass("toggled");
    });

});


$(document).ready(function () {
    // Navbar Dropdown
    $('.dropdown-toggle').dropdown();
    
    // Select all
    $("#ckbCheckAll").click(function () {
        $("#addBox .overflow-control-input").prop('checked', $(this).prop('checked'));
    });
    $("#ckbCheckAllEdit").click(function () {
        $("#editBox .overflow-control-input").prop('checked', $(this).prop('checked'));
    });
    $("#ckbCheckAllDelete").click(function () {
        $("#delBox .overflow-control-input").prop('checked', $(this).prop('checked'));
    });
    $("#ckbCheckAllView").click(function () {
        $("#viewBox .overflow-control-input").prop('checked', $(this).prop('checked'));
    });
    
    
    
    // toggle flights and accommodation
    $(".toggle-line").click(function () {
        var url = $(this).data('url');
        $(".flights").toggleClass("active");
        $(".accommodation").toggleClass("active");
        if ($(".flights").hasClass("active")) {
            window.location.href = base_url+'/'+url+'/flight';
        } else if ($(".accommodation").hasClass("active")) {
            window.location.href = base_url+'/'+url+'/accommodation';

        }

    });
    
    // add Flight multiselect 
    $( function() {
        if ( $( ".selectCountry" ).length ) {
            $(".selectCountry").chosen({disable_search_threshold: 10});
        }
        if ( $( ".chosen-select" ).length ) {
            $(".chosen-select").chosen({no_results_text: "Oops, nothing found!"});
        }
      } );
    
    // add Accommodation multiselect
    // $( function() {
    //     if ( $( "#datepicker3, #datepicker4" ).length ) {
    //         $("#datepicker3, #datepicker4").datepicker({
    //             changeMonth: true,
    //             changeYear: true
    //         });
    //     }
    //   } );
});