$(document).ready(function () {
    $('#update-shop-name').on('click', function () {
        try {
            
            var newShopName = $('#shop_name_text_updated').val();

            // Validate the shop name using jQuery
            if (!/^[a-zA-Z0-9\s]+$/.test(newShopName)) {
                $('#errorMessage').text('Invalid shop name');
                return;
            }

            // Clear previous error messages
            $('#errorMessage').text('');

            // Send the new shop name to the server for updating the database
            $.ajax({
                type: 'POST',
                url: 'updateShopName.php',
                data: { newShopName: newShopName },
                success: function (response) {
                    // Split the response to get status and message
                    var parts = response.split('|');
                    var status = parts[0];
                    var message = parts[1];

                    if (status === 'success') {
                        // Update the shop name dynamically on the front end, shop_name_text is the actual id used ribblr
                        $('#shop_name_text').text(newShopName);
                        // alert for success notification
                        alert(message);
                    } else {
                        // alert for failure notification
                        alert('Error: ' + message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('AJAX Error:', status, error);
                    // alert for error notifications
                    alert('An error occurred while updating the shop name.');
                }
            });
        } catch (e) {
            console.log('JavaScript Error:', e.message);
        }
    });
});
