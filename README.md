# Installation

Using npm:
`npm i react-colorify`

Using yarn:
`yarn add react-colorify`

# Usage

First import the component:
`import { ColorPicker } from "react-colorify";`

Then use it anywhere in your project:

```jsx
<ColorPicker
  customClasses="flex w-full mx-auto items-center justify-center h-[400px]"
  defaultValue={color}
  onChange={setColor}
/>
```

# Features

- Fully supports React & Next.js.
- Written in TypeScript and fully typed.
- Allows directly pasting color codes.

# UI Customization

The component is fully customizable. You can pass custom classes to the component to style it according to your needs.

Other than you can also use the default class "`colorPicker`" to style the component.

For any queries or issues, please create an issue on the [GitHub repository](https://github.com/sunnybundel/react-colorify/issues).
