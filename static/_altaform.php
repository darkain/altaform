<?php


use ScssPhp\ScssPhp\Compiler;

require_once('_scss/scss.inc.php');


$ext = pathinfo($router->parts['path'], PATHINFO_EXTENSION);


// ONLY ALLOW .JS .CSS .SCSS .SVG FILES
// TODO: HAVE LIST OPTIONALLY SET VIA ALTAFORM DATABASE CONFIG
\af\affirm(404,
	in_array($ext, ['js', 'css', 'scss', 'svg'], true)
);


// VERIFY FILE EXISTS
\af\affirm(404,
	is_file($af->path() . $router->parts['path'])
);


// COMPILE SCSS TO CSS
if ($ext === 'scss') {
	$scss = (new Compiler)->compileString(
		file_get_contents($af->path() . $router->parts['path'])
	)->getCss();

	// SET CONTENT TYPE TO CSS, AND OUTPUT IT
	$af->contentType('css');
	echo $scss;


// STREAM FILE AS-IS IF NOT SCSS
} else {
	$af->contentType($ext);
	readfile($af->path() . $router->parts['path']);
}


// EXIT ROUTER
$router->finalize();
