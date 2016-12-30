# `wuaki-test` — Starter app

`wuaki-test` is an AngularJS project that allows to create, list, delete, sort and filter genres and movies. For persistence it is used the LocalStorage, being a small project.

## Getting Started

To get you started you can simply clone the `wuaki-test` repository and install the dependencies:

### Prerequisites

You need git to clone the `wuaki-test` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `wuaki-test`. You must have Node.js and its package manager (npm) installed. You can get them from [here][node].

### Clone `wuaki-test`

Clone the `wuaki-test` repository using git:

```
git clone https://github.com/jasus/wuaki-test.git
cd wuaki-test
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and Angular framework code. The tools help us manage and test the application.

* We get the tools we depend upon via `npm`, the [Node package manager][npm].
* We get the Angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`. After that, you should find out that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but `wuaki-test` changes this location through the `.bowerrc` file. Putting it in the `app` folder makes it easier to serve the files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start this server is:

```
npm start
```

Now browse to the app at [`localhost:8000`][local-app-url].


[bower]: http://bower.io/
[git]: https://git-scm.com/
[local-app-url]: http://localhost:8000
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
