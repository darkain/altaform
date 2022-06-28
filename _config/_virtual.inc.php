<?php


//BASIC CONFIGURATION FOR WEB SERVER
$afconfig([
	'root'			=> '_app',
	'debug'			=> true,

	/*
	//PHP Universal Database Library (PUDL)
	'pudl'				=>	[
		'type'			=>	'mariadb',
		'server'		=>	'local.database.server',
		'database'		=>	'MyDatabase',
		'username'		=>	'User',
		'password'		=>	'SuperSecretSauce',
		//'prefix'		=>	'prefix_',
		//'redis'		=>	'local.redis.server',
		//'hash'		=>	'REPLACE WITH A RANDOM STING',
		'session'		=>	true,
		'altaform'		=>	true,
	],
	*/
]);



//DEFAULT OPEN GRAPH DATA
$og = [
	'title'			=> 'Web Site Title',
	'image' 		=> '',
	'description'	=> '',
	'keywords'		=> '',
	'viewport'		=> 'width=650,user-scalable=no',
];
