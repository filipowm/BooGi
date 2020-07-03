---
title: "Code snippets"
order: 4
tocDepth: 2
---

Crucial for any technical documentation is possibility to add code snippets
with proper highlighting. BooGi supports various programming languages and 
syntaxes.

To add code snippet, you can use:

* [inline code snippets](#inlinecodesnippets), which are a code blocks
  defined directly within page content
* [external code snippets](#externalcodesnippets), which are a code blocks
  inserted from external file containing code

## Inline code snippets

To use inline code snippets, you should wrap your code block
inside triple backticks(` ``` ` ), e.g.
~~~markdown
```
this is some code
```
~~~

You can define language of code block by specifying it's name
after opening triple backticks, e.g.
~~~markdown
```yaml
key: value
```

```javascript
const uppercase = value => value.toUpperCase();
```
~~~

### Supported languages and syntaxes

<Warning>New languages and syntaxes will be added soon!</Warning>

<Layout>

<div>

* bash
* clike
* c
* cpp
* css
* css-extras
* javascript
* jsx
* js-extras
* coffeescript
* diff
* git
* go
* graphql
* handlebars
* json
  
</div>
  
<div>

* less
* makefile
* markdown
* objectivec
* ocaml
* python
* reason
* sass
* scss
* sql
* stylus
* tsx
* typescript
* wasm
* yaml
  
</div>

</Layout>

### Diff

The following is a code block with diff. 
Lines with `+` highlighted in green shade indicating an addition. 
Lines with `-` highlighted in red shade indicating a deletion.

```javascript
- const data = ['1','2'];
+ const data = [1,2];
``` 

### Live editing

**Syntax**

```
```javascript react-live=true
<button className={'btn btn-default'}>Change my text</button>
`` `
```

**Example**

```javascript react-live=true
<button className={'btn btn-default'}>Change my text</button>
```

## External code snippets

You can also embed the contents of specified files as code snippets.
Any files that will be embed this way **must** exist `snippets` directory.

To embed an external code snippet just add
```
`embed:<path_to_file>`
```
to your content, where *path_to_file* is a relative path to the code
file from `snippets` directory.

**Example**

```
`embed:hello.java`
```

`embed:hello.java`

### Select lines

It's also possible to specify a range of lines to be hidden.

You can either specify line ranges in the embed using the syntax:

- #Lx - Embed one line from a file
- #Lx-y - Embed a range of lines from a file
- #Lx-y,a-b - Embed non-consecutive ranges of lines from a file

**Example**:

```markdown
This is the JSX of my app:

`embed:App.js#L6-8`
```

With this example snippet:

```js
import React from "react"
import ReactDOM from "react-dom"

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  )
}
```

Will produce something like this:

```markdown
This is the JSX of my app:

    <div className="App">
      <h1>Hello world</h1>
    </div>
```

### Omitting lines

It's also possible to specify ranges of lines to be hidden from an embedded file by adding `// hide-range` comments to your files.

**Example**:

```javascript
// hide-range{1-2}
import React from "react"
import ReactDOM from "react-dom"

function App() {
  return (
    <div className="App">
      <ul>
        <li>Not hidden</li>
        <li>Not hidden</li>
        {/* hide-range{1-2} */}
        <li>Hidden</li>
        <li>Hidden</li>
        {/* hide-next-line */}
        <li>Hidden</li>
      </ul>
    </div>
  )
}

// hide-range{1-2}
const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
```

Will produce something like this:

```jsx
function App() {
  return (
    <div className="App">
      <ul>
        <li>Not hidden</li>
        <li>Not hidden</li>
      </ul>
    </div>
  )
}
```

### Specifying snippets by name

As an alternative to selecting a range of lines from a file, you can add
`start-snippet{snippet-name}` and `end-snippet{snippet-name}` in comments in your files.
The inclusion of a name for a snippet allows you to create an example file that contains
multiple snippets that you reference from different places.

You can specify that you want to only include a named snippet from the embed by
using the syntax `{snippet: "snippet-name"}`.

**Example**:

```markdown
The function to use is:

`embed:api.js{snippet: "funcA"}`

And it is invoked via:

`embed:api.js{snippet: "invokeA"}`
```

With this example file `api.js`:

```javascript
// start-snippet{funcA}
function factorial(x) {
    if (x <= 1) return 1
    else return x * factorial(x - 1)
}
// end-snippet{funcA}

function display() {
    let x = 5
    // start-snippet{invokeA}
    let xfact = factorial(x)
    // end-snippet{invokeA}
    println!(`{} factorial is {}`, x, xfact)
}
```

Will produce something like this:

```markdown
The function to use is:

function factorial(x) {
if (x <= 1) return 1
else return x \* factorial(x - 1)
}

And it is invoked via:

let xfact = factorial(x)
```