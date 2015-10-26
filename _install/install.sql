CREATE DATABASE IF NOT EXISTS `pudl`;
USE `pudl`;


CREATE TABLE IF NOT EXISTS `pudl_session` (
	`id` varchar(32) COLLATE ascii_bin NOT NULL COMMENT 'Stores the Session ID',
	`access` bigint NOT NULL,
	`address` varchar(127) COLLATE ascii_bin DEFAULT NULL,
	`data` text COLLATE ascii_bin,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;


CREATE TABLE IF NOT EXISTS `pudl_user` (
	`user_id` int unsigned NOT NULL AUTO_INCREMENT,
	`user_access` set('admin','staff','debug','user','guest') COLLATE ascii_bin NOT NULL DEFAULT 'user',
	`user_debug` tinyint(1) unsigned NOT NULL DEFAULT '0',
	`user_ban` tinyint(1) unsigned NOT NULL DEFAULT '0',
	`user_icon` binary(16) DEFAULT NULL,
	PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;
