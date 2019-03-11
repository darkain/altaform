<?php


use Leafo\ScssPhp\Compiler;

require_once('_scss/scss.inc.php');


// ONLY ALLOW .SCSS FILES
assertStatus(404,
	substr($router->parts['path'], -5) === '.scss'
);


// VERIFY FILE EXISTS
assertStatus(404,
	is_file($af->path() . $router->parts['path'])
);


// SET CONTENT TYPE TO CSS
$af->contentType('css');


// OUTPUT CSS
echo (new Compiler)->compile(
	file_get_contents($af->path() . $router->parts['path'])
);


// EXIT ROUTER
$router->finalize();
