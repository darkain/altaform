<?php

$af	->contentType('txt')
	->renderField(
		'_index.tpl',
		'disallow',
		$af->debug() ? '/' : ''
	);
