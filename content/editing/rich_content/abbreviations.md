---
title: "Abbreviations"
order: 2
---

BooGi offers creating inline definitions of 
popular jargon used. This is a good way to define abbreviations / terms
used in your company / area / profession.

First define your jargon / definitions in `jargon.yml` in `config`
directory.

## Configuration

Format of yaml file is following:

```yaml
<term_key>: # key by which term can be referenced in the page content to embed jargon
  name: String # required name of term
  long_name: String # optional, long name of term
  description: String # optional, term description
```

**Example:**

`jargon.yml`
```yaml
saas:
  name: SaaS
  long_name: Software as a Service
  description: Software licensing and delivery model in which software is licensed
    on a subscription basis and is centrally hosted and managed
boogi:
  name: BooGi
  description: The best documentation tool in the space! Check it <a href="https://boogi.netlify.app">here</a>.
```

<Warning>When under development mode, you must restart BooGi to apply new jargon configuration.</Warning>

## Usage

Then in markdown wrap word defined as key (`term_key`) above in `_` to use Jargon
(key is case-insensitive, thus `term_key` or `TERM_key` reference same term).

**Example**

```markdown
You can use any _saas_ application.

Try _BooGi_ -- you'll love it :heart: !
```  

You can use any _saas_ application.

Try _BooGi_ -- you'll love it :heart: !