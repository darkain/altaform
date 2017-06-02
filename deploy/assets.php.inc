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




////////////////////////////////////////////////////////////////////////////////
//INCLUDE ALL THE THINGS!!
////////////////////////////////////////////////////////////////////////////////
use MatthiasMullie\Minify;
require_once('_pathconvert/src/ConverterInterface.php');
require_once('_pathconvert/src/Converter.php');
require_once('_minify/src/Minify.php');
require_once('_minify/src/CSS.php');
require_once('_minify/src/JS.php');




////////////////////////////////////////////////////////////////////////////////
//LOAD DATA FOR CSS AND JS MINIFIER
////////////////////////////////////////////////////////////////////////////////
$data = file_get_contents($root.'/header_html_debug.tpl');




////////////////////////////////////////////////////////////////////////////////
//MINIFY CSS STYLESHEET FILES
////////////////////////////////////////////////////////////////////////////////
$matches = array();
preg_match_all('/"[^"]*\\.css" \/>/i', $data, $matches);

$out = "/* DO NOT EDIT DIRECTLY, THIS FILE IS AUTO-GENERATED */\n\n";

foreach ($matches as $match) {
	foreach ($match as $item) {
		$item = str_replace(['"',' />'], '', $item);
		if (substr($item, 0, 2) == '//')	continue;
		if (substr($item, 0, 4) == 'http')	continue;
		$item = str_replace('[afurl.static]/', $static, $item);

		$text = (new Minify\CSS($item))->minify();
		if (empty($text)) continue;

		$item = str_replace($static, '', $item);
		$out .= "/* $item */\n$text\n\n";
	}
}

$out = trim($out);

file_put_contents($static.'css/altaform.css', $out);
file_put_contents($static.'css/altaform.css.gz', gzencode($out,9));

$md5 = md5($out);
echo $static.'css/altaform.css - ' . $md5 . "\n";

$af->setting('af.hash.css',	$md5);




////////////////////////////////////////////////////////////////////////////////
//MINIFY JAVASCRIPT FILES
////////////////////////////////////////////////////////////////////////////////
$matches = array();
preg_match_all('/"[^"]*\\.js"/i', $data, $matches);

$out = "/* DO NOT EDIT DIRECTLY, THIS FILE IS AUTO-GENERATED */\n'use strict';\n\n";

foreach ($matches as $match) {
	foreach ($match as $item) {
		$item = str_replace('"', '', $item);
		if (substr($item, 0, 2) == '//')	continue;
		if (substr($item, 0, 4) == 'http')	continue;
		$item = str_replace('[afurl.static]/', $static, $item);
		$text = @file_get_contents($item);
		if ($text === false) error500('Cannot open file: ' . $item);

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
echo $static.'js/altaform.js - ' . $md5 . "\n";

$af->setting('af.hash.js', $md5);
