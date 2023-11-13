<?php
try {
    // database connection fields assumption 
    $servername = "your_servername";
    $username = "your_username";
    $password = "your_password";
    $dbname = "your_dbname";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Get the new shop name from the POST request
    $newShopName = $_POST['newShopName'];

    // Validate the new shop name 
    if (!preg_match('/^[a-zA-Z0-9\s]+$/', $newShopName)) {
        throw new Exception("Invalid shop name. Please use alphanumeric characters and spaces only.");
    }

    // Updating the shop name to the database
    $sql = "UPDATE shop_name SET s_name='$newShopName' WHERE user_id=1"; // Just for demonstration, here we can change the user_id to the actual logged in user

    if ($conn->query($sql) === TRUE) {
        echo "success|Shop name updated successfully";
    } else {
        throw new Exception("failure|Error updating shop name in the database: " . $conn->error);
    }

    $conn->close();
} catch (Exception $e) {
    echo "failure|" . $e->getMessage();
}
?>
