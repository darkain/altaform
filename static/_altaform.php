<?php


use ScssPhp\ScssPhp\Compiler;

require_once('_scss/scss.inc.php');


// ONLY ALLOW .SCSS FILES
\af\affirm(404,
	substr($router->parts['path'], -5) === '.scss'
);


// VERIFY FILE EXISTS
\af\affirm(404,
	is_file($af->path() . $router->parts['path'])
);


// COMPILE SCSS TO CSS
$css = (new Compiler)->compileString(
	file_get_contents($af->path() . $router->parts['path'])
)->getCss();


// SET CONTENT TYPE TO CSS, AND OUTPUT IT
$af->contentType('css');
echo $css;


// EXIT ROUTER
$router->finalize();
