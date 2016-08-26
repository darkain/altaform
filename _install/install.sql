CREATE TABLE IF NOT EXISTS `pudl_session` (
  `id` varchar(64) COLLATE ascii_bin NOT NULL COMMENT 'Stores the Session ID',
  `user` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `access` bigint(20) UNSIGNED NOT NULL,
  `address` varchar(127) COLLATE ascii_bin DEFAULT NULL,
  `data` varbinary(4096) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;


CREATE TABLE IF NOT EXISTS `pudl_user` (
  `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_permission` enum('banned','guest','pending','user','staff','admin','team','deactivated') COLLATE ascii_bin NOT NULL DEFAULT 'user',
  `user_name` varchar(32) CHARACTER SET utf8 NOT NULL,
  `user_url` varchar(32) CHARACTER SET ascii DEFAULT NULL,
  `user_icon` binary(16) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_url` (`user_url`),
  KEY `user_type` (`user_permission`),
  KEY `user_icon` (`user_icon`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii COLLATE=ascii_bin;


ALTER TABLE `pudl_session`
  ADD CONSTRAINT `pudl_session_ibfk_1` FOREIGN KEY (`user`) REFERENCES `pudl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
