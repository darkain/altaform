# Altaform

## About

Altaform is a powerful [modern PHP](#php-compatibility) zero boilerplate
framework which scales well both vertically and horizontally.
The Altaform framework includes
a blazing fast [URL router](#url-router),
a simple [GET/POST parameter processor](#getpost-input-processing-via-getvar),
a [universal database driver](#persistent-database-storage-via-pudl),
and a [HTML/XML templating engine](#htmlxml-output-templates-via-tbx).
Most of these features are also fully independent modules which may be used
separately from Altaform in other applications and frameworks.

### License

Altaform is licensed under the [BSD 2-clause license](LICENSE). In-house modules
bundled with Altaform are also under the same BSD 2-clause license. 3rd party
modules, such as the TBX HTML/XML templating engine, may contain their own
software licenses. In those cases, please see each module's source code or Git
repository for licensing information.

### PHP Compatibility

Altaform is compatible with both modern and legacy PHP. Altaform is actively
tested on PHP 5.4 through 5.6, and PHP 7.0 through 7.3, plus PHP-Nightly.
Legacy PHP support is maintained to help act as a migration path for legacy PHP
code bases to move forward to modern PHP. By supporting both, legacy code can
be refactored into the Altaform framework while continuing to run on a legacy
PHP server. Once refactoring is complete, servers can be migrated from legacy
5.x to 7.x with minimal effort. For new development, the latest PHP version is
always recommended. Due to the bleeding edge development of Altaform, not all
features are guaranteed to function properly on older PHP builds, as we've
personally discovered countless bugs in the PHP interpreter and have helped to
resolve these issues. Many of these bug fixes were never back-ported.

### HHVM Compatibility

For the same reason that PHP 5.x is supported, legacy HHVM is supported.
Altaform treated HHVM as a first-class citizen for many years and was the
primary development target of the time. However, since the rise of PHP 7.x,
performance limitations of PHP are no longer an issue, and Altaform often
performs significantly better on PHP 7.x than on any HHVM version. HHVM team
has announced that they plan to deprecate their PHP compatibility layer after
HHVM version 3.30, so this will be the final version supported by Altaform.
At this time, all HHVM users are encouraged to transition to PHP 7.x.

## Getting Started

### LAMP (Debian/Ubuntu)

### FEMP (FreeBSD)

## Altaform Core
https://github.com/darkain/altaform-core

Altaform Core is the core components required for Altaform as a whole to
function. These components were moved into their own module to help organize
and speed up their development. This core handles variables, functions,
classes, methods, and interfaces for both required and optional features in
Altaform that are not provided by other modules. The most commonly used features
include User Accounts, Command Line Interface (CLI), Application Configuration,
Error Logging/Debugging, File System Access, Geolocation, Email, Git, String
Manipulation, File Handling, HTTP Status Codes, and URL Routing.

### Modules

### Global Variables

## Access Interfaces

Altaform supports three primary ways for users interact with the framework. New
interface may be added later as new requirements for applications arise.

### HTTP/HTTPS

This is the primary and standard way to access Altaform. The Altaform framework
was initially designed and intended to be used for commercial and personal web
sites. Web requests are handled by the HTTPD (Apache, Nginx, Lighttd), forwarded
to PHP/FPM, and then processed through the Altaform core by the single
entry-point index.php file. This entry point handles Altaform start-up and
initialization of all core modules and configurations. Once those are done,
execution is handed over to the URL Router, followed by clean-up and tear-down
of all modules.

### Command Line (CLI)

Altaform includes a simple "af" shell script for accessing the framework.
The "af" shell script launches the php-cli binary and accepts command line
parameters that will be forwarded to the URL Router. The CLI execution
life-cycle is otherwise identical to the HTTP/HTTPS life-cycle, with few
exceptions. Automatic status, error, and debug pages are formatted for CLI
rather than HTML. CLI access is assumed to be an admin account. Client device
and identity detection is unavailable.

Another major change: request timeouts are entirely disabled. CLI is intended
for administrative usage only. Sometimes it is required to write scripts for
large data processing which may take hours or days to complete. These should be
ran from a persistent CLI session such as a machine's local console or through
the "screen" command. This will ensure that the administrative operation can
continue to execute uninterrupted.

### Daemon

Altaform has experimental support for running as a continuous daemon process.
This interface is currently being developed for a custom in-house FreeBSD based
application, with all core utilities and functionality upstreamed back into the
main Altaform code base. The current test application is a persistent IRC
client. There will be more applications available with the Altaform Daemon
support as development continues.

Altaform Daemon mode can be thought of similarly to JavaScript language with
Node.js as the core application, but instead with PHP as the language and
the Altaform Daemon as the application layer. PHP executes the Altaform Daemon,
the Altaform Daemon provides a simple event loop handler, and internal processes
run with non-blocking I/O to enable the event loop handler to continue to run.

## Simply Status Pages

### Assert

### Status

## User Accounts

### User Access Control List

## URL Router

### \_altaform.php File

### \_index.php File

### \_virtual Folder and \_virtual.php File

### Homepage

## Get/Post Input Processing via Getvar
https://github.com/darkain/getvar

## HTML/XML Output Templates via TBX
https://github.com/darkain/TinyButXtreme

## Persistent Database Storage via PUDL
https://github.com/darkain/pudl
