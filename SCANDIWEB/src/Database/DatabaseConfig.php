<?php
namespace SCANDIWEB\Database;

class DatabaseConfig {
    private static $host = 'localhost';
    private static $username = 'u197123263_adnan';
    private static $password = 'Remo1amal';
    private static $dbname = 'u197123263_productsys';

    public static function getConnection() {
        $mysqli = new \mysqli(self::$host, self::$username, self::$password, self::$dbname);

        if ($mysqli->connect_error) {
            throw new \Exception('Connection error: ' . $mysqli->connect_error);
        }

        return $mysqli;
    }
}
