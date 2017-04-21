# closure
PHP: Trait that adds ability to have closures as member variables of a class

This is a PHP trait to quickly and easily add the ability to call arbitrary closure functions within your objects.

Example of usage:

```
require_once('closure.php');


//our test class
class test {
	use closures;
}


//create an instance of our test class
$foo = new test();


//add a function to our test class
$foo->bar = function($blah) {
	var_dump($blah);
};


//now call our function!
$foo->bar('testing');
```
