<?php
include 'vars.php';
header("Content-Type: application/json; charset=UTF-8");
$method = $_SERVER['REQUEST_METHOD'];
if ($method === "POST" && $input->secret == $adminPass) {
  $input = json_decode(file_get_contents('php://input'));
  $data = [
    'name' => $input->name,
    'category' => $input->category,
    'address' => $input->address,
    'address2' => $input->address2,
    'city' => $input->city,
    'postal' => $input->postal,
    'phone' => $input->phone,
    'website' => $input->website,
    'facebook' => $input->facebook,
  ];
  try {
    $dbh = new PDO('mysql:host=' . $server . ';dbname=' . $dbname, $username, $dbPassword);
    $sql = "INSERT INTO CHANGES (`Name`, `Category`, `Address`, `Address 2`, `City`, `Postal`, `Phone`, `Website`, `Facebook Page`) VALUES (:name, :category, :address, :address2, :city, :postal, :phone, :website, :facebook)";
    $stmt= $dbh->prepare($sql);
    $stmt->execute($data);
    $rownum = $dbh->lastInsertId();
    $dbh = null;
    $success = new stdClass();
    $success->row = $rownum;
    print json_encode($success, JSON_UNESCAPED_SLASHES);
  } catch (PDOException $e) {
    $error = new stdClass();
    $error->Error = $e->getMessage();
    print json_encode($error, JSON_UNESCAPED_SLASHES);
    die();
  }
}
?>