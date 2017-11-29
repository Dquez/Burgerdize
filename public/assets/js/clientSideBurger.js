$(".create-form").on("submit", function(event) {
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
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  //Use document.on(click, class) to be able to add event listeners to dynamically generated buttons
$(document).on("click", ".devour", function(event) {
   let devourBurger = {
    id: $(this).data("id"),
    devoured: true
   } 
    // Send the PUT request.
    $.ajax("/devour/" + devourBurger.id, {
      type: "PUT",
      data: devourBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        window.location.replace("/");
      }
    );
  });
  $(document).on("click", ".deleteBurger", function(event) {
   let deleteBurger = {
    id: $(this).data("id"),
   } 
    // Send the DELETE request.
    $.ajax("/delete/" + deleteBurger.id, {
      type: "DELETE",
      data: deleteBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        window.location.replace("/");
      }
    );
  });