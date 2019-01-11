<?php
include 'vars.php';
$method = $_SERVER['REQUEST_METHOD'];
if ($method === "POST") {
  header("Content-Type: application/json; charset=UTF-8");
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
    'id' => $input->id
  ];
  if ($input->secret == $adminPass) {
    try {
      $dbh = new PDO('mysql:host=' . $server . ';dbname=' . $dbname, $username, $dbPassword);
      $sql = "UPDATE BUSINESSES SET (`Name`=:name, `Category`=:category, `Address`=:address, `Address 2`=:address2, `City`=:city, `Postal`=:postal, `Phone`=:phone, `Website`=:website, `Facebook Page`=:facebook) WHERE id=:id";
      $stmt= $dbh->prepare($sql);
      $stmt->execute($data);
      $dbh = null;
      $success = new stdClass();
      $success->success = true;
      print json_encode($success, JSON_UNESCAPED_SLASHES);
    } catch (PDOException $e) {
      $error = new stdClass();
      $error->Error = $e->getMessage();
      print json_encode($error, JSON_UNESCAPED_SLASHES);
      die();
    }
  }
}
?>