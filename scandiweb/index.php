<?php
namespace SCANDIWEB;

use SCANDIWEB\Controllers\endpointController;
use SCANDIWEB\Database\Database;
use SCANDIWEB\Database\DatabaseConfig;

require_once __DIR__ . '/SCANDIWEB/vendor/autoload.php';

try {
    $dbConnection = DatabaseConfig::getConnection();
    Database::init($dbConnection);
} catch (\Exception $e) {
    die('Database connection failed: ' . $e->getMessage());
}

$requestUri = $_SERVER['REQUEST_URI'];

if ($requestUri === '/' || $requestUri === '/index.php') {
    include __DIR__ . '/SCANDIWEB/FrontSW/product_list.html';
} elseif ($requestUri === '/add-product') {
    include __DIR__ . '/SCANDIWEB/FrontSW/add_product.html';
} elseif (strpos($requestUri, '/scandiweb/products') !== false) {
    $controller = new endpointController();
    $controller->resolveRequest();
} else {
    header("HTTP/1.0 404 Not Found");
    echo "404 Not Found";
    exit();
}
