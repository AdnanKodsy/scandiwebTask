<?php
namespace SCANDIWEB\Controllers;

use SCANDIWEB\Router;

class endpointController
{
    private $router;
    private $productController;

    public function __construct()
    {
        $this->router = new Router();
        $this->productController = new ProductController();
        $this->registerRoutes();
    }

    private function registerRoutes()
    {
        $this->router->register('/index.php/scandiweb/products', [$this->productController, 'getAllProducts'], 'GET');
        $this->router->register('/index.php/scandiweb/products/save', [$this->productController, 'createProduct'], 'POST');
        $this->router->register('/index.php/scandiweb/products/delete', [$this->productController, 'deleteProducts'], 'POST');
        $this->router->register('/index.php/scandiweb/products/check-sku', [$this->productController, 'checkSku'], 'GET');
    }

    public function resolveRequest()
    {
        $requestUri = $_SERVER['REQUEST_URI'];
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->router->resolve($requestUri, $requestMethod);
    }
}
