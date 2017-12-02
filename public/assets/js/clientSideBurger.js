$(document).ready(function(){
    animateDiv();
    
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = screen.availHeight - 200;
    var w = screen.availWidth - 200;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('#burger-img').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('#burger-img').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}





// $(document).on("ready", function () {
//     let burgerMove = setInterval(myTimer, 1000);


//     let w = window.innerWidth -180;
//     let h = window.innerHeight - 180;
//     // top: 103px; left: 106px;


//     function myTimer() {
//         let topPixels = Math.floor(Math.random() * 200);
//         let leftPixels = Math.floor(Math.random() * 200);
//         $("#burger-img").animate({
//             top: topPixels,
//             left: leftPixels
//         }, "slow");
//     }
// });
$(document).keyup(function (e) {
    switch (e.which) {
        case 40:
            $("#burger-img").animate({
                top: "+=200px"
            }, "normal");
    }
});
// Move Buttons (Keyboard Right)
$(document).keyup(function (e) {
    switch (e.which) {
        case 39:
            $("#burger-img").animate({
                left: "+=200px"
            }, "normal");
    }
});
// Move Buttons (Keyboard Up)
$(document).keyup(function (e) {
    switch (e.which) {
        case 38:
            $("#burger-img").animate({
                top: "-=200px"
            }, "normal");
    }
});
// Move Buttons (Keyboard Left)
$(document).keyup(function (e) {
    switch (e.which) {
        case 37:
            $("#burger-img").animate({
                left: "-=200px"
            }, "normal");
    }
});

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


            // Reload the page to get the updated list
            // window.location.replace("/");
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