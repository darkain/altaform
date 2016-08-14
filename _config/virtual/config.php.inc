<?php

//BASIC CONFIGURATION FOR WEB SERVER
$site['root']				= '_app';
$site['debug']				= false;	//Enable all DEBUG features when true!
$site['timezone']			= 'UTC';

//CONFIGURATION FOR PUDL (PHP UNIVERSAL DATABASE LIBRARY)
/*
$site['pudl']				=> [
	'server'				=> '127.0.0.1';
	'database'				=> 'pudl'
	'username'				=> 'user'
	'password'				=> 'password'
	'prefix'				=> 'pudl_'
//	'redis'					=> 'local.redis.server'
];*/

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
	'banned'				=> 0, //BANNED FROM THE SITE
	'guest'					=> 0, //ANONYMOUS USER
	'user'					=> 0, //LOGGED IN USER
	'owner'					=> 0, //OWNER OF CURRENTLY VIEWED OBJECT
	'staff'					=> 0, //SITE STAFF (MODERATOR PRIVILEGES)
	'admin'					=> 0, //100% FULL ACCESS
	'debug'					=> 0, //100% FULL ACCESS AND DEBUG ENABLED
];

//DEFAULT OPEN GRAPH DATA
$og = [
	'title'					=> 'Web Site Title',
	'image' 				=> '',
	'description'			=> '',
	'keywords'				=> '',
	'viewport'				=> 'width=650,user-scalable=no',
];
