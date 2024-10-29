<?php
namespace SCANDIWEB;

class Router
{
    private $routes = [];

    public function register(string $route, callable $action, string $method): self
    {
        $this->routes[$route] = ['action' => $action, 'method' => strtoupper($method)];
        return $this;
    }

    public function resolve(string $requestUri, string $requestMethod)
{
    $urlComponents = parse_url($requestUri);
    $path = $urlComponents['path'];
    
    foreach ($this->routes as $route => $details) {
        if ($route === $path && $details['method'] === strtoupper($requestMethod)) {
            return call_user_func($details['action']);
        }
    }

    header("HTTP/1.0 404 Not Found");
    echo json_encode(["message" => "Not Found"]);
}
}