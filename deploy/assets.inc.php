<?php


////////////////////////////////////////////////////////////////////////////////
//SET EVERYTHING UP
////////////////////////////////////////////////////////////////////////////////
$time	= $db->time();
$root	= $af->path() . $af->config->root;
$static	= $af->staticPath();




////////////////////////////////////////////////////////////////////////////////
//SET THE CONTENT TYPE TO TEXT
////////////////////////////////////////////////////////////////////////////////
$af->contentType('txt');
print("Processing Assets\n\n");




////////////////////////////////////////////////////////////////////////////////
//INCLUDE ALL THE THINGS!!
////////////////////////////////////////////////////////////////////////////////
use MatthiasMullie\Minify;
use ScssPhp\ScssPhp\Compiler;
require_once('_pathconvert/src/ConverterInterface.php');
require_once('_pathconvert/src/Converter.php');
require_once('_minify/src/Minify.php');
require_once('_minify/src/CSS.php');
require_once('_minify/src/JS.php');
require_once('_scss/scss.inc.php');




////////////////////////////////////////////////////////////////////////////////
//LOAD DATA FOR CSS AND JS MINIFIER
////////////////////////////////////////////////////////////////////////////////
print("Parsing:\t" . $root . "/header_html_debug.tpl\n\n");
$data = file_get_contents($root.'/header_html_debug.tpl');




////////////////////////////////////////////////////////////////////////////////
//MINIFY CSS STYLESHEET FILES
////////////////////////////////////////////////////////////////////////////////
$matches = [];
preg_match_all('/"[^"]*\\.s?css" \/>/i', $data, $matches);

$out = "/* DO NOT EDIT DIRECTLY, THIS FILE IS AUTO-GENERATED */\n\n";

foreach ($matches as $match) {
	foreach ($match as $item) {
		$item = str_replace(['"',' />'], '', $item);
		if (substr($item, 0, 15) !== '[afurl.static]/') continue;
		$item = $static . substr($item, 15);

		print("Loading:\t" . $item . "\n");

		$text = @file_get_contents($item);
		if ($text === false) \af\error(500, 'Cannot open file: ' . $item);

		if (substr($item, -5) === '.scss') {
			$text = (new Compiler)->compileString($text)->getCss();
		}

		$text = (new Minify\CSS($text))->minify();
		if (empty($text)) continue;

		$item = str_replace($static, '', $item);
		$out .= "/* $item */\n$text\n\n";
	}
}

$out = trim($out);

file_put_contents($static.'css/altaform.css', $out);
file_put_contents($static.'css/altaform.css.gz', gzencode($out,9));

$md5 = md5($out);
print("\nBuilding:\t");
print($static . 'css/altaform.css');
print("\nMD5 Hash:\t" . $md5 . "\n\n");

$af->setting('af.hash.css', $md5);




////////////////////////////////////////////////////////////////////////////////
//MINIFY JAVASCRIPT FILES
////////////////////////////////////////////////////////////////////////////////
$matches = [];
preg_match_all('/"[^"]*\\.js"/i', $data, $matches);

$out = "/* DO NOT EDIT DIRECTLY, THIS FILE IS AUTO-GENERATED */\n'use strict';\n\n";

foreach ($matches as $match) {
	foreach ($match as $item) {
		$item = str_replace('"', '', $item);
		if (substr($item, 0, 15) !== '[afurl.static]/') continue;
		$item = $static . substr($item, 15);

		if (strpos($item, 'jquery-ui.min.js') !== false) continue;
		if (preg_match('/jquery-\d\.\d\.\d\.min\.js/', $item)) continue;

		print("Loading:\t" . $item . "\n");

		$text = @file_get_contents($item);
		if ($text === false) \af\error(500, 'Cannot open file: ' . $item);

		$line = preg_split('/\n|\r/', trim($text));
		if (trim($line[0]) === "'use strict';") {
			unset($line[0]);
			$text = implode("\n", $line);
		}

		$text = (new Minify\JS($text))->minify();
		if (empty($text)) continue;

		$text = str_replace(
			[")\n{",	"}\n"],
			['){',		'}'],
			$text
		);

		if (substr($text, -1, 1) !== ';') $text .= ';';

		$item = str_replace($static, '', $item);
		$out .= "/* $item */\n$text\n\n";
	}
}

$out = trim($out);

file_put_contents($static.'js/altaform.js', $out);
file_put_contents($static.'js/altaform.js.gz', gzencode($out,9));

$md5 = md5($out);
print("\nBuilding:\t");
print($static . 'js/altaform.js');
print("\nMD5 Hash:\t" . $md5 . "\n\n");

$af->setting('af.hash.js', $md5);
