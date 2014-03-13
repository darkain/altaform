<?php

$_af_aws_client = 0;

require_once '_amazon/aws-autoloader.php';

use Aws\S3\S3Client;
use Aws\S3\Enum\Group;
use Aws\S3\Enum\CannedAcl;
use Aws\Common\Enum\Region;



function s3delete($bucket, $awspath, $options=array()) {
	global $site, $_af_aws_client;

	// Instantiate the S3 client with your AWS credentials and desired AWS region
	if (empty($_af_aws_client)) $_af_aws_client = S3Client::factory(array(
		'key'		=> $site['aws_key'],
		'secret'	=> $site['aws_secret'],
		'base_url'	=> $site['aws_url'],
	));

	// Upload an object by streaming the contents of a file
	// $filepath should be absolute path to a file on disk
	$result = $_af_aws_client->putObject(array_merge($options, array(
		'Bucket'	=> $bucket,
		'Key'		=> $awspath,
	)));		
}



function s3upload($filepath, $bucket, $awspath, $mimetype=false, $options=array()) {
	global $site, $db, $_af_aws_client;

	//If $mimetype is an extension, pull the mimetype from database
	if (is_string($mimetype)  &&  !strpos($mimetype, '/')) {
		$mimetype = $db->cellId('pudl_mimetype', 'mime_type', 'mime_ext', $mimetype);
	}

	if (empty($mimetype)) $mimetype = 'application/octet-stream';


	// Instantiate the S3 client with your AWS credentials and desired AWS region
	if (empty($_af_aws_client)) $_af_aws_client = S3Client::factory(array(
		'key'		=> $site['aws_key'],
		'secret'	=> $site['aws_secret'],
		'base_url'	=> $site['aws_url'],
	));


	// Upload an object by streaming the contents of a file
	// $filepath should be absolute path to a file on disk
	$result = $_af_aws_client->putObject(array_merge($options, array(
		'SourceFile'	=> $filepath,
		'Bucket'		=> $bucket,
		'Key'			=> $awspath,
		'ContentType'	=> $mimetype,
		'acl'			=> CannedAcl::PUBLIC_READ,
		'GrantRead'		=> 'uri="' . Group::ALL_USERS . '"',
	)));

	// We can poll the object until it is accessible
	$_af_aws_client->waitUntilObjectExists(array('Bucket'=>$bucket, 'Key'=>$awspath));

	return $result;
}



function s3list($bucket, $start='') {
	global $site, $db;
	static $_af_aws_client = 0;

	// Instantiate the S3 client with your AWS credentials and desired AWS region
	if (empty($_af_aws_client)) $_af_aws_client = S3Client::factory(array(
		'key'		=> $site['aws_key'],
		'secret'	=> $site['aws_secret'],
		'base_url'	=> $site['aws_url'],
	));


	$iterator = $_af_aws_client->getIterator('ListObjects', array(
		'Bucket' => $bucket,
		'Marker' => $start,
	));

	$list = array();


	foreach ($iterator as $object) {
		$list[] = $object['Key'];
	}

	return $list;
}
