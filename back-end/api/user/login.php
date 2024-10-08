<?php
// include database and object files
include_once '../config/database.php';
include_once '../objects/user.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    // allow all origins
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare user object
$user = new User($db);
// set ID property of user to be edited
$user->email = isset($_GET['email']) ? $_GET['email'] : die();
$user->password = base64_encode(isset($_GET['password']) ? $_GET['password'] : die());
// read the details of user to be edited
$stmt = $user->login();
if($stmt->rowCount() > 0){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $user_arr=array(
        "status" => true,
        "message" => "Successfully Login!",
        "id" => $row['id'],
        "email" => $row['email']
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Invalid Email or Password!",
    );
}
// make it json format
print_r(json_encode($user_arr));
?>