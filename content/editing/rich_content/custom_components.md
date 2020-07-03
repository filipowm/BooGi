---
title: ":package: Custom Components"
order: 1
---

Custom components are extensions to Markdown. To use them, use proper
HTML tag with configuration (if applicable).

## Layout

Layout can be used to implement multi-column layout. Columns always equally
share space. Within columns you can use standard Markdown syntax or include
custom components.

**Syntax**

Simple:

```html
<Layout>

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

</Layout>
```

Complex:

```html
<Layout>

<div>

![logo](/assets/favicon.png)

Here comes some **text**. And some [URL](https://google.com)

</div>

<div>

<Tip>Layout is nice!</Tip>

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

</div>
</Layout>
```

**Examples**

**Example 1 -- single paragraphs**

<Layout>

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

</Layout>

**Example 2 -- complex paragraphs**

<Layout>

<div>

![logo](../assets/favicon.png)

Here comes some **text**. And some [URL](https://google.com)

</div>

<div>

<Tip>Layout is nice!</Tip>

*Lorem ipsum* dolor **sit amet**, consectetur adipiscing elit. Aenean lobortis turpis 
luctus mi imperdiet lobortis vitae at urna. Sed posuere lacinia turpis a commodo.

</div>
</Layout>

## Highlights

Highlights can be used to distinguish some part of text.

**Syntax**

```html
<Warning>

Some **note** text</Warning>
<Tip>

Some _tip_ text
</Tip>
<Info>Some **error** text</Info>
<Error>Some _warning/error_ text</Error>
```

**Important!** There must be newline between highlight tag
and it's content to render inline markdown properly. Without
newline content will be displayed as written, without any markdown rendering.

**Examples**

<Warning>

Some **note** text
</Warning>
<Tip>

Some _tip_ text
</Tip>
<Info>Some **info** text</Info>
<Error>Some _warning/error_ text</Error>

## Badges

**Syntax**

```html
<Badge>Default Badge</Badge>
<Badge color="#fe9612">Orange Badge</Badge>

You can also use badge <Badge color="red">Inline Badge</Badge> 
inline your text.
```

**Examples**

<Badge>Default Badge</Badge>
<Badge color="#fe9612">Orange Badge</Badge>

You can also use badge <Badge color="red">Inline Badge</Badge> 
inline your text.

## Icons

It is possible to use Icons provided by `react-feather`.
Reference and available icons can be found [here](https://bit.dev/feathericons/react-feather);

**Syntax**

`<Icon name="<name>" color="[color]"/>`
* `name` - mandatory, it is `feather` icon name
* `color` - color to be used

```html
<Icon name="Calendar"/>
<Icon name="Calendar" color="#fe9612"/>
<Icon name="Calendar" color="#ff0000"/>
<Icon name="calendar" color="brown"/>
<Icon name="calendar" color="green"/>

If can use kebab-case <Icon name="phone-call" color="#3487e1"/> 
or PascalCase (UpperCamelCase) <Icon name="PhoneCall" color="#34e187"/> for icon name.
```

**Examples**

<Icon name="Calendar"/>
<Icon name="Calendar" color="#fe9612"/>
<Icon name="Calendar" color="#ff0000"/>
<Icon name="calendar" color="brown"/>
<Icon name="calendar" color="green"/>

If can use kebab case <Icon name="phone-call" color="#3487e1"/> 
or camel case <Icon name="PhoneCall" color="#34e187"/>syntax.

## Abbreviations

Follow [this guide](/editing/rich_content/abbreviations) to learn about 
abbreviations (jargon).

## Emoticons

Follow [this guide](/editing/rich_content/emojis) to learn about 
emojis (emoticons).

## Diagrams

Follow [this guide](/editing/rich_content/graphs) to learn about 
diagrams and graphs.

## Code snippets

Follow [this guide](/editing/rich_content/snippets) to learn about 
code highlighting and code snippets.

## Embeds

Follow [this guide](/editing/rich_content/embed) to learn about 
embedding external services into your page (like Youtube, Twitter, Instagram, Codepen etc..).
