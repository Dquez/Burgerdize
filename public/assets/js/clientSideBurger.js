$(document).ready(function(){
    animateDiv();
});

function makeNewPosition(){
    
    // This gets the current user's screen dimensions
    var h = screen.availHeight - 200;
    var w = screen.availWidth - 200;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    // calculates a new height and new width everytime this funciton is called
    return [nh,nw];    
    
}

function animateDiv(){

    var newSpot = makeNewPosition();
    // returns the offset coordinates for the selected element, relative to the document.
    var oldSpot = $('#burger-img').offset();
    var speed = calcSpeed([oldSpot.top, oldSpot.left], newSpot);
    
    $('#burger-img').animate({ top: newSpot[0], left: newSpot[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    // ternary operator to determine if x is greater than y, if so then return x, if not, return y
    var greatest = x > y ? x : y;
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

$(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event to prevent form from submitting as it normally would.
    event.preventDefault();
    var newBurger = {
        burger: $("textarea[name=burger]").val().trim(),
        devourer: 0
    };
    // Send the POST request.
    $.ajax("/burger", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            // Reload the page to get the updated list
            location.reload();
        }
    );
});
//Use document.on(click, class) to be able to add event listeners to dynamically generated buttons
$(document).on("click", ".devour", function (event) {
    let devourBurger = {
        id: $(this).data("id"),
        devoured: true
    }
    // Send the PUT request.
    $.ajax("/devour/" + devourBurger.id, {
        type: "PUT",
        data: devourBurger
    }).then(
        // here we have a series of function calls, the first one is the three quarters function, the others are callbacks once the time interval is done.
        function () {
            let quarterBurger = function () {
                $("#burger-img").attr("src", "assets/img/Quarter-Burger.png");
                setTimeout(function () {
                    window.location.replace("/");
                }, 300);
            }
            let halfBurger = function () {
                $("#burger-img").attr("src", "assets/img/Half-Burger.png");
                setTimeout(function () {
                    quarterBurger();
                }, 500);
            }

            let threeQuarters = function () {
                $("#burger-img").attr("src", "assets/img/Three-Quarter-Burger.png");
                setTimeout(function () {
                    halfBurger();
                }, 600);
            }
            threeQuarters();
        }
    );
});
$(document).on("click", ".deleteBurger", function (event) {
    let deleteBurger = {
        id: $(this).data("id"),
    }
    // Send the DELETE request.
    $.ajax("/delete/" + deleteBurger.id, {
        type: "DELETE",
        data: deleteBurger
    }).then(
        function () {
            // Reload the page to get the updated list
            window.location.replace("/");
        }
    );
});