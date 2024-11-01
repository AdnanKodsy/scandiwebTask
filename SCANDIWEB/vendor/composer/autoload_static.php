<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit65703be17fc715cf14988067068d527b
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'SCANDIWEB\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'SCANDIWEB\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit65703be17fc715cf14988067068d527b::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit65703be17fc715cf14988067068d527b::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit65703be17fc715cf14988067068d527b::$classMap;

        }, null, ClassLoader::class);
    }
}
