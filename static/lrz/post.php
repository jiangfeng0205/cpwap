<?php
/**
 * Created by PhpStorm.
 * User: iyahe@qq.com (天明)
 * Date: 2017/4/30
 * Time: 0:49
 */
$formFile = $_POST['img'];
$formFile = explode(',', $formFile);
$img = base64_decode($formFile[1]);
$path = __DIR__.'/demo.jpg';//拼接路劲
$result = file_put_contents($path, $img);//返回的是字节数
echo $result;
