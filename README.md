# Altaform



## About
Altaform is a small, simple, lightweight micro-framework for PHP web
applications. Altaform handles HTML templates, database connectivity,
$_GET/$_POST reading, URL routing, error logging, and more automatically.



## License
This software library is licensed under the BSD 3-clause license, and may be
freely used in any project (commercial, freelance, hobby, or otherwise) which
is compatible with this license. See
[LICENSE](https://github.com/darkain/altaform/blob/master/LICENSE)
for more details.



## Compatibility
Altaform is actively tested and used in production on PHP 5.6, PHP 7.0, and
HHVM 3.14.

Altaform should work as far back as PHP 5.4, but this is no longer actively
tested. Altaform heavily relies upon new features introduced in PHP 5.4,
therefor will NOT work on any version of PHP prior to 5.4.

Altaform may work on versions of HHVM prior to 3.14, but we highly discourage
it. During Altaform development, we've discovered and reported a number of bugs
in the HHVM interpreter that directly effected this project. As such, we cannot
guarantee earlier version of HHVM will work.



## Modules
Path | Library | Usage
-----|---------|------
[_altaform](https://github.com/darkain/altaform-core) | Altaform Core | URL router, user access
[_closure](https://github.com/darkain/closure) | Closure | Adds closure support to PHP 5.x
[_getvar](https://github.com/darkain/getvar) | GetVar | Handler for $_GET/$_POST data
[_pudl](https://github.com/darkain/pudl) | PHP Universal Database Library (PUDL) | DB connection and SQL query generator/processor
[_tbx](https://github.com/darkain/TinyButXtreme) | TinyButExtreme | HTML5 template processor



## Global Variables
Name | Library | Usage
-----|---------|------
$af | Altaform/TBX | Instance of the [altaform](https://github.com/darkain/altaform-core/blob/master/altaform.php.inc) class, inherits [clsTinyButXtreme](https://github.com/darkain/TinyButXtreme/blob/master/tbx_class.php) class
$afurl | Altaform | Instance of the [afurl](https://github.com/darkain/altaform-core/blob/master/url.php.inc) class
$afdevice | Altaform | Instance of the [afdevice](https://github.com/darkain/altaform-core/blob/master/device.php.inc) class
$user | Altaform | Instance of the [afuser](https://github.com/darkain/altaform-core/blob/master/user.php.inc) class
$get | GetVar | Instance of [getvar](https://github.com/darkain/getvar/blob/master/getvar.php.inc) class - [Full documentation](https://github.com/darkain/getvar/blob/master/README.md)
$db | PUDL | Instance of one of the [pudl](https://github.com/darkain/pudl/blob/master/pudl.php) classes (depends on database type) - [Full documentation](https://github.com/darkain/pudl/blob/master/README.md)
