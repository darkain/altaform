<?php


////////////////////////////////////////////////////////////////////////////////
//MANUAL GET REQUEST FROM ADMIN, ALLOW IT
////////////////////////////////////////////////////////////////////////////////
if ($get('token') === '') {
	if (!\af\cli()) $user->requireAdmin();
	return;
}




////////////////////////////////////////////////////////////////////////////////
//PULL ALL THE DATA
////////////////////////////////////////////////////////////////////////////////
$hash	= $get->hash();
$time	= $get->int('time');
$algo	= $get->string('algo');
$token	= $get->string('token');




////////////////////////////////////////////////////////////////////////////////
//VERIFY ALGORITHM EXISTS
////////////////////////////////////////////////////////////////////////////////
\af\affirm(500,
	in_array($algo, hash_algos(), true),
	'Algorithm not supported: ' . $algo
);




////////////////////////////////////////////////////////////////////////////////
//VERIFY MINIMUM SECURITY STRENGTH FOR HASH ALGORITHM
////////////////////////////////////////////////////////////////////////////////
if (!empty($af->config->github['strength'])) {
	\af\affirm(500,
		strlen(hash($algo, '')) * 4  >=  $af->config->github['strength'],
		'Hash Algorithm does not meet minimum security strength requirements'
	);
}




////////////////////////////////////////////////////////////////////////////////
//VERIFY TIME IS WITHIN CONSTRAINT
////////////////////////////////////////////////////////////////////////////////
\af\affirm(422,
	abs($time - $af->time()) < (AF_MINUTE*5),
	'Time drift is too large. Possible replay attack!'
);




////////////////////////////////////////////////////////////////////////////////
//VERIFY HASH MATCHES
////////////////////////////////////////////////////////////////////////////////
$message = implode('-', [$time, $token]);

\af\affirm(422,
	hash_equals(hash_hmac($algo, $message, $afconfig->afkey()), $hash),
	'Invalid token for request. Possible hacking attempt!'
);
