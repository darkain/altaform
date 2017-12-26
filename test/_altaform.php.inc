<?php

if (!$af->debug()) error404();
if (!$af->cli()) $user->requireAdmin();
