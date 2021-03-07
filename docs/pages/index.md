import { DefaultModel } from '../src/models'

# pris(🎤)-types
Framework-agnostic library to generate Prismic models, from code.

Obviously, the name <code>pris-types</code> is derived from <code>prop-types</code> and in a similar fashion, offers a declarative way to document (and generate) the intended shape of data passed from Prismic to your components.

### Overview

The core of <code>pris-types</code> is a simple Babel plugin that runs everytime your slices change.
What it does is quite simple: for each slice, it looks for a <code>Model</code> key and runs the function it finds.
If the result is a valid Prismic JSON model, it calls the local builder and saves everything to FileSystem.

<pre>
  {DefaultModel.code}
</pre>

👆 Usually, this function would be <code>PrisTypes.shape</code> but you're a free developer and that's great!

### But why?

Ever felt like you shouldn't actually need a UI to work with Prismic slices? Or that
at the core of a component-based CMS, there should be nothing more than a... component? Well, me too!

Now, let's face it, this isn't for everyone. Consider this before using the package:

#### Strengths

* TypeScript and linting: your IDE is here to help ✌️
* No need to switch between editors and tabs while working
* Smart default values: enhance fields once the code is ready
* What you define in Model is exactly what you get in code
* Other developers know what's up by a single look at your file

#### Weaknesses

* Another syntax to learn
* More error-prone than a UI
* Less support than the builder
* Subject to change 😊