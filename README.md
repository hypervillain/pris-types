# pris-types
Framework-agnostic library to generate Prismic models, from code.

Obviously, the name <code>pris-types</code> is derived from <code>prop-types</code> and in a similar fashion, offers a declarative way to document (and generate) the intended shape of data passed from Prismic to your components.

Check out the docs: https://pris-types.vercel.app!

----

## Quick Start

First of all, please note that `pris-types` is **extremely alpha**. At the moment, it:
* breaks with Vue.js files
* has not been extensively tested
* is subject to major changes

### Install 

If you still want to try it out (and you should!), this is how you can get started:

```bash
yarn add -D pris-types@alpha
````

or

```bash
npm i --save-dev pris-types@alpha
````

Of course, `alpha` is an adventurous choice but hey, if you're here you're probably an adventurer 😊

Once this is done, you should add `pris-types-watch` script to your `package.json`.
For example, this line comes from my own test project:

```bash
{
  scripts: {
    "watch": "pris-types-watch --lib ./slices"
  }
}
````

👆 To work as expected, the script expects the slice builder to be running.
If you don't have a SliceMachine project yet, please visit [its website](https://slicemachine.dev) first!

### Arguments

#### `--lib` (required)

As you could see from the previous example, the watcher expects a `--lib` argument to be passed.
It should point to a library you defined in your `sm.json` file. In you need more than one library, please raise an issue on Github.

#### `--port`

By default, the watcher connects to the builder and saves on port `9999`.
To change that, simply pass a `--port` argument to the script.

### Your first Model

Once the script is running, open your favourite editor and paste this portion of code there:

```javascript
import { PrisTypes } from 'pris-types'
export const Model = PrisTypes.shape({
  __meta: { title: 'My Slice', description: 'A simple slice' },
  defaultVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.Title,
      description: PrisTypes.RichText({
        placeholder: "short length text please"
      }),
    },
    items: {
      color: PrisTypes.Color
    }
  })
})

````

On save, if everything went well, you should see new files next to your slice:
a `model.json` file and a `mocks.json` file 🎉 This means the script was able to save
your JS model and generate a JSON model out of it, and mock content for it. If you head to the editor, you should
see your slice and be able to push it to Prismic. If you use StoryBook, check how the new story looks!

### Your first Mock config

SliceMachine generates mocks for each of your slices. This is a powerful feature as it helps you build your components
the way they will be used, without having to actualy create documents and query them. To refine the kind of data you receive,
you can pass a **optional** mock configuration object:

```javascript
import { PrisTypes } from 'pris-types'
export const Mocks = {
  defaultVariation: {
    items: {
      color: PrisTypes.Color.Light()
    }
  })
})
````

👆 As you can see, no need to pass values for each field! You should only configure fields that expect a specific type of content,
that the current builder does not offer. Check the [Fields Reference](https://pris-types.vercel.app/fields-ref) to discover all the mock helpers.


----

### How it works

Sometimes, understanding how things work can help both the debugging and the fun.

The first thing that `pris-types-watch` does is quite obvious: it takes the `--lib` argument
you passed and looks for all slices there (`your-lib-path/[SliceName]/index.(js|ts|vue)`).

Then, and everytime one of these files changes, a Babel plugin is called.

With the help of Babel transform function, this plugin does one thing: it looks for keys `Model`
and `Mocks` and extracts them as AST objects. Then, some checks are done: do the keys exist, do they look _right_?

Alright, everything looks good. A second function is then called. Its role is to take your input and to evaluate it.
You read that right: it runs `eval` on your code. Several reasons exist for this, the main one being that it allows the plugin to create the right context,
in which your code will be executed.

Once this function is called, a payload is created. It contains the `model` that Prismic expects and a `mockConfig` object
that will tell the builder how you want your mocks to be generated. It then calls its save function (`http://localhost:9999/api/update`).
If you configured everything properly, the builder should then do its job:

* Save the newly created model to FileSystem as JSON
* Store the mock configuration in `.slicemachine/mocks.json`
* Use this config to generate an actual mock and store it along your slice
* Regenerate your Storybook story and take a new screenshot of it

_Voilà_! Once you made all your changes and checked that everything worked as expected,
you can push everything to Prismic and start changing your content ✌️

----
