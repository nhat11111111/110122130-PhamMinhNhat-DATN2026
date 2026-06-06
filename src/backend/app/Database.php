<?php

/**
 * Database Configuration for Vinh Long Tourist
 * Copy this file to config.php and update with your database credentials
 */

return [
    'driver' => 'mysql',
    'host' => getenv('DB_HOST') ?: 'localhost',
    'port' => getenv('DB_PORT') ?: 3306,
    'database' => getenv('DB_NAME') ?: 'vinh_long_tourist',
    'username' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASSWORD') ?: '',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
];

/**
 * Database Connection Helper Class
 */
class Database {
    private static $connection = null;
    private static $config = null;

    public static function connect() {
        if (self::$connection === null) {
            self::$config = require 'database.config.php';
            
            try {
                $dsn = sprintf(
                    '%s:host=%s;port=%d;dbname=%s;charset=%s',
                    self::$config['driver'],
                    self::$config['host'],
                    self::$config['port'],
                    self::$config['database'],
                    self::$config['charset']
                );

                self::$connection = new PDO(
                    $dsn,
                    self::$config['username'],
                    self::$config['password']
                );

                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
            } catch (PDOException $e) {
                die('Database connection failed: ' . $e->getMessage());
            }
        }

        return self::$connection;
    }

    public static function query($sql, $params = []) {
        $connection = self::connect();
        $stmt = $connection->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public static function fetchAll($sql, $params = []) {
        $stmt = self::query($sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function fetchOne($sql, $params = []) {
        $stmt = self::query($sql, $params);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function insert($table, $data) {
        $keys = array_keys($data);
        $placeholders = array_fill(0, count($keys), '?');
        
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $table,
            implode(',', $keys),
            implode(',', $placeholders)
        );

        self::query($sql, array_values($data));
        return self::connect()->lastInsertId();
    }

    public static function update($table, $data, $where) {
        $set = [];
        foreach ($data as $key => $value) {
            $set[] = $key . ' = ?';
        }

        $whereConditions = [];
        foreach ($where as $key => $value) {
            $whereConditions[] = $key . ' = ?';
        }

        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s',
            $table,
            implode(', ', $set),
            implode(' AND ', $whereConditions)
        );

        $params = array_merge(array_values($data), array_values($where));
        self::query($sql, $params);
    }

    public static function delete($table, $where) {
        $conditions = [];
        foreach ($where as $key => $value) {
            $conditions[] = $key . ' = ?';
        }

        $sql = sprintf(
            'DELETE FROM %s WHERE %s',
            $table,
            implode(' AND ', $conditions)
        );

        self::query($sql, array_values($where));
    }
}

?>
