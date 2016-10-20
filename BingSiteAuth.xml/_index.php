<?php


if (empty($afconfig->bing['auth'])) {
	error404();
}


$af	->contentType('xml')
	->renderField(
		'_index.tpl',
		'auth',
		$afconfig->bing['auth']
	);
