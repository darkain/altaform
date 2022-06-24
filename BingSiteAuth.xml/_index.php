<?php


if (empty($afconfig->bing['auth'])) {
	\af\error(404);
}


$af	->contentType('xml')
	->renderField(
		'_index.tpl',
		'auth',
		$afconfig->bing['auth']
	);
