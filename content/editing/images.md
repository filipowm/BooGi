---
title: "Adding images"
order: 3
---

You can add and embed images into content, as this is standard Markdown feature.
First, add images under `content` directory -- it can be a single `images` directory
or images can be added to any directory within `content` dir.

Then, once you have added images, reference them using Markdown image
syntax: `![some image caption](myImage.png)`. You can use any image format,
however images in `png` and `jpeg` formats will be additionally processed to improve
overal site performance and user experience.

You can leave caption empty, e.g. `![](../images/myimg.png)`.
You can also reference external images by providing full URL.

**Example**

Assuming, that all images will be embed in `page.md`:

<Layout>

```
project
│
└───content
    │── index.md
    │── img1.png
    │
    └───images
    │   │── img2.png
    │   └───another
    │       │── img3.png
    │
    └───group
        │── page.md
        │── img4.jpeg
```

```markdown
![first image](../img1.png)

![second image](../images/img2.png)

![third image](../images/another/img3.png)

![fourth image](img4.png)

```

</Layout>