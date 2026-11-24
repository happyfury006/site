<?php
include "form"
$uname= "localhost";
$unmae="root";
$password ="";

$db_name="formuser";
$conn = mysqli_connect($uname,$unmae,$password,$db_name);

if (isset($_POST['uname']) && isset($_POST['uname'])) {
    header("Location: home.html")
    exit();

}
else{
    header("Location: index.html")
    exit();
}