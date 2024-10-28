<?php
namespace SCANDIWEB\Database;

class DatabaseConfig {
    private static $host = 'sql212.infinityfree.com';
    private static $username = 'if0_37598014';
    private static $password = 'KZZmA8ELflvts';
    private static $dbname = 'if0_37598014_productsys';

    public static function getConnection() {
        $mysqli = new \mysqli(self::$host, self::$username, self::$password, self::$dbname);

        if ($mysqli->connect_error) {
            throw new \Exception('Connection error: ' . $mysqli->connect_error);
        }

        return $mysqli;
    }
}
