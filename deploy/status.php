<?php


require('secure.inc.php');


$commands = [
	'git status',
	'git submodule status',
];


foreach ($commands as $command) {
	echo '> ' . $command . "\n";
	echo rtrim(shell_exec($command . ' 2>&1')) . "\n\n";
}
