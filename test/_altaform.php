<?php

if (!$af->debug()) httpError(404);
if (!\af\cli()) $user->requireAdmin();

