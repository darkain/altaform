<?php

if (!$af->debug()) error404();
if (!afCli()) $user->requireAdmin();
