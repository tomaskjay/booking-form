$(document).ready(function(){
  
    let numAdults = 1;
    let checkIn = null;
    let checkOut = null;
    let numDays = null;
    let cost = null;

    //function to calculate how many days between check-in and check-out
    function findNumDays(){
        if(checkIn && checkOut){
            numDays = checkOut.diff(checkIn,"days") 
            $('#displayDays').val(numDays + " days");
        }
    }

    //function to calculate cost based on # of adults and # of days
    function calcCost(){
        if(numAdults && checkIn && checkOut){
            cost = 150 * numAdults * numDays;
            $('#displayCost').val(cost);
        }
    }

    //when check-in date changes, update checkIn value and recalculate
    $('#checkIn').change(function(){
        checkIn = moment($(this).val());
        findNumDays();
        calcCost();
    })

    //when check-out date changes, update checkOut and recalculate
    $('#checkOut').change(function(){
        checkOut = moment($(this).val());
        findNumDays();
        calcCost();
    })
    
  //when # of adults changes, update numAdults and recalculate cost
    $('#adults').change(function(){
        numAdults = $('#adults option:selected').val();
        calcCost();
    })

    //when reset button is clicked, clear everything and reset form
    $("#reset").click(function(){
        toastr["info"]("Fields Successfully Cleared", "", {
            "closeButton": true,
            "positionClass": "toast-top-full-width",
        });
        //reset values to default
        numAdults = 1;
        checkIn = null;
        checkOut = null;   
        numDays = null;
        cost = null;
        //reset display text
        $('#displayDays').html("Displays days...");
        $('#displayCost').html("Displays cost...");
        //reset forn validation
        validator.resetForm(true);
    })

    //set up form validation rules and messages
    const validator = $("#form").validate({
        rules:{
            displayCost:{
                min:1 //verify cost can't be zero or negative
            }
        },
        messages:{
            //empty error messages for each field
            username:"",
            firstName:"",
            lastName:"",
            inputPhone:"",
            inputFax:"",
            inputEmail:"",
            displayCost:"",
        },
      
        //highlight fields with errors and display message
        highlight: function (element, errorClass) {
            const name = $(element).attr('name')
            let errorMSG = "Missing field" + name;
            //if error is related to cost, display message
            if(name === "displayCost"){
                errorMSG = "No cost was calculated"
                if(cost<=0){
                    errorMSG = "Cost must be a positive number"
                }
            }
            //show error using toast notification
            toastr["error"](errorMSG, "", {
                "closeButton": true,
                "positionClass": "toast-top-right",
            });
            //add the 'has-error' calss to show that this field has an error
            $(element).closest('.form-group').addClass('has-error');
        },
      
        //remove error styling when field is corrected
        unhighlight: function (element, errorClass) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        
        //when the form is successfully submitted:
        submitHandler: function(form){
            toastr["success"]("The form was successfully submitted", "", {
            "closeButton": true,
            "positionClass": "toast-top-full-width",
            });
            form.submit;
        },
    })
})