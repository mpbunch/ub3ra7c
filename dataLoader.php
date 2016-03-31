<?php
$servername = "localhost";                                        //mysql options
$username = "uatc";
$password = "r\"c3p&e^EC,CKs6g";
$dbname = "udb";

$conn = new mysqli($servername, $username, $password, $dbname);   //Generic mysqli connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$data	= json_decode(file_get_contents("php://input"));
$type 	= $data[0]->a;
$check	= $data[0]->b;
$add	= $data[0]->d;
$date	= explode('T',$data[0]->e);
$date	= "BETWEEN '".$date[0]."' AND '".date('Y-m-d H:i:s', strtotime($date[0] . ' +1 day'))."'";

$address = '';
if($add){
  $address = 'sadd != 0 &&';
}

switch($type){                                                    //type [poly | circle | bounds]
  case'bounds':
  case'poly':
    $params = $data[0]->c;
    
    //if start must be in bounds but end does not need to be in bounds
    $sql = "SELECT * FROM user WHERE ".$address." ST_Contains(GeomFromText('POLYGON((".$params."))'),PointFromText(CONCAT('POINT(',slat,' ',slon,')'))) && stime ".$date.";";
    
    //if start and end points must be in bounds
    if($check){
      $sql = "SELECT * FROM user WHERE ".$address." ST_Contains(GeomFromText('POLYGON((".$params."))'), PointFromText(CONCAT('POINT(',elat,' ',elon,')'))) && ST_Contains(GeomFromText('POLYGON((".$params."))'), PointFromText(CONCAT('POINT(',slat,' ',slon,')'))) && stime ".$date.";";
    }
    break;
  case'circle':
    $lat = $data[0]->c->lat;
    $lon = $data[0]->c->lon;
    $rad = $data[0]->c->rad/1000;
    $R   = 6371;
    $maxLat = $lat + rad2deg($rad/$R);
    $minLat = $lat - rad2deg($rad/$R);
    $maxLon = $lon + rad2deg($rad/$R/cos(deg2rad($lat)));
    $minLon = $lon - rad2deg($rad/$R/cos(deg2rad($lat)));
    
    //if start must be in bounds but end does not need to be in bounds
    $sql = "SELECT *
            FROM (
                SELECT * 
                FROM user
                WHERE slat Between ".$minLat." And ".$maxLat."
                  AND slon Between ".$minLon." And ".$maxLon."
                  AND stime ".$date."
            ) As FirstCut
            WHERE ".$address." acos(sin(".deg2rad($lat).")*sin(radians(slat)) + cos(".deg2rad($lat).")*cos(radians(slat))*cos(radians(slon)-".deg2rad($lon).")) * ".$R." < ".$rad." && stime ".$date.";";
    
    
    //if start and end points must be in bounds
    if($check){
      $sql = "SELECT *
            FROM (
                SELECT * 
                FROM user
                WHERE slat Between ".$minLat." And ".$maxLat."
                  AND slon Between ".$minLon." And ".$maxLon."
                  AND stime ".$date."
            ) As FirstCut
            WHERE ".$address." acos(sin(".deg2rad($lat).")*sin(radians(slat)) + cos(".deg2rad($lat).")*cos(radians(slat))*cos(radians(slon)-".deg2rad($lon).")) * ".$R." < ".$rad." 
            AND acos(sin(".deg2rad($lat).")*sin(radians(elat)) + cos(".deg2rad($lat).")*cos(radians(elat))*cos(radians(elon)-".deg2rad($lon).")) * ".$R." < ".$rad." 
            AND stime ".$date.";";
    }
    break;
}


if($result = $conn->query($sql)){                                 //start processing
  $a = array();
  $i = 0;
  while($row = $result->fetch_array(MYSQL_ASSOC)){
    $a[$i]['id'] 	= $i;
    $a[$i]['ptime']	= $row['stime'];
    $a[$i]['dtime']	= $row['etime'];
    $a[$i]['latitude']	= $row['slat'];
    $a[$i]['longitude']	= $row['slon'];
    if($address){                                                 //no need to return address if not asked for, keep the result set as small as possible
      $a[$i]['address']	= $row['sadd'];
    }
    $a[$i]['dlongitude']= $row['elon'];
    $a[$i]['dlatitude']	= $row['elat'];
    ++$i;
  }
  echo json_encode($a);
}else{
  echo 'false';
}
$conn->close();
?>
