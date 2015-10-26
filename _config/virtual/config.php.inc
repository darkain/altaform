<?php

//BASIC CONFIGURATION FOR WEB SERVER
$site['root']				= '_app';
$site['debug']				= false;	//Enable all DEBUG features when true!
$site['timezone']			= 'UTC';

//CONFIGURATION FOR PUDL (PHP UNIVERSAL DATABASE LIBRARY)
$site['pudl_server']		= '127.0.0.1';
$site['pudl_database']		= 'pudl';
$site['pudl_username']		= 'root';
$site['pudl_password']		= 'password';
$site['pudl_prefix']		= 'pudl_';
//$site['pudl_redis']		= 'redis';

//CONTENT DELIVARY NETWORKS
$site['cdn']	= '/cdn/';
$site['static']	= '/static/';
$site['upload']	= '/upload/';

//ALTAFORM API
//$site['af_secret']		= '';
//$site['af_password']		= '';
//$site['af_email']			= 'bob@example.com';
//$site['session_name']		= 'PUDLSESSION';
//$site['session_domain']	= '.example.com';

//TRELLO ERROR LOGGING
//$site['error_email']		= 'board_email@boards.trello.com';
//$site['error_tag']		= ['trello_user_1', 'trello_user_2', 'trello_user_3'];

//DEFAULT SITE PERMISSIONS
$site['permission'] = [
	'banned'				=> 0,
	'guest'					=> 0,
	'user'					=> 0,
	'staff'					=> 0,
	'admin'					=> 0,
];

//DEFAULT OPEN GRAPH DATA
$og = [
	'title'					=> 'Web Site Title',
	'image' 				=> '',
	'description'			=> '',
	'keywords'				=> '',
	'viewport'				=> 'width=650,user-scalable=no',
];
