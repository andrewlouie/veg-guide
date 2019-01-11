<?php
include 'vars.php';
header('Content-Type: application/json; charset=utf-8');
if (array_key_exists("secret", $_GET) && $_GET["secret"] == $adminPass) {
    try {
        $dbh = new PDO('mysql:host=' . $server . ';dbname=' . $dbname, $username, $dbPassword);
        $myArr = array();
        foreach($dbh->query('SELECT * from `CHANGES`') as $row) {
        $myObj = new stdClass();
        $myObj->ID = utf8_encode($row["ID"]);
        $myObj->RequesterName = utf8_encode($row["Requester Name"]);
        $myObj->RequesterEmail = utf8_encode($row["Requester Email"]);
        $myObj->Record = utf8_encode($row["Record Number"]);
        $myObj->Status = utf8_encode($row["Status"]);
        $myObj->Name = utf8_encode($row["Name"]);
        $myObj->Address = utf8_encode($row["Address"]);
        $myObj->Address2 = utf8_encode($row["Address 2"]);
        $myObj->Category = utf8_encode($row["Category"]);
        $myObj->City = utf8_encode($row["City"]);
        $myObj->Postal = utf8_encode($row["Postal"]);
        $myObj->Phone = utf8_encode($row["Phone"]);
        $myObj->Website = utf8_encode($row["Website"]);
        $myObj->Facebook = utf8_encode($row["Facebook Page"]);
        array_push($myArr, $myObj);
        }
        $json = json_encode($myArr, JSON_UNESCAPED_SLASHES);
        echo $json;
        $dbh = null;
    } catch (PDOException $e) {
        $error = new stdClass();
        $error->Error = $e->getMessage();
        print json_encode($error, JSON_UNESCAPED_SLASHES);
        die();
    }
}
?>