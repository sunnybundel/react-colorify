# React Colorify 🎨

> **NOTE:** This package is actively undergoing development and improvements. Although, it should work fine but if you find any issues, please create an issue on the [GitHub repository](https://github.com/sunnybundel/react-colorify/issues) to help us improve the package.

This is a simple and easy-to-use color picker component for React, Next.JS and PReact applications. Its a fully customizable color picker component that allows you to pick colors from color palettes or directly paste the color code. It also supports transparency.

# Installation

Firstly you need to install the package `react-colorify` in your project. For that, you can use any of the following package managers of your choice.:

**Using npm:**

```sh
npm i react-colorify
```

**Using yarn:**

```sh
yarn add react-colorify
```

**Using pnpm:**

```sh
pnpm add react-colorify
```

# Usage

Before using the component, you need to import it in your project:

```js
import Colorify from "react-colorify";
```

> NOTE: This only works with "Client Component" so make sure you are importing the component with "use client" directive at the top of the file.

Once you imported it, you can use the component in your project using the following code:

```jsx
<Colorify defaultValue={color} onChange={setColor} />
```

Further, you can also pass the following props to the ColorPicker component to customize it according to your needs.

# Props

### 1. `defaultValue`: #{string} | transparent;

The default Hex color value to be displayed in the color picker. You can also pass the value `transparent` to display a transparent color.

eg: `defaultValue="#000000"` or `defaultValue="transparent"`

### 2. className?: string;

A string of custom classes to style the component. By default, the component will always have the class "`react-colorify`".

eg: `className="flex w-full mx-auto items-center justify-center h-[400px]"`

### 3. onChange: (color: #{string}) => void;

A function that will be called whenever the color is changed in the color picker. The function will receive the new color value as a parameter. You can use this function to update the color value in your state.

eg: `onChange={(color) => setColor(color)}`

### 4. labelFor?: string;

A string to specify the label for the color picker. If provided, the color picker will open when the label is clicked. This is useful when you want to open the color picker on clicking a label. Remeber to add the `htmlFor` attribute to the label with the value of the `labelFor` prop.

eg: `labelFor="labelName"`

# Features

- **Fully Customizable:** The component is fully customizable.
- **React, Next.JS and PReact Support:** The component fully works with React, Next.JS and PReact.
- **TypeScript Ready:** Written in TypeScript and fully typed.
- **Allows Copy-Paste:** Allows directly copying or pasting color codes.
- **Supports Transparency:** Supports transparency in colors.
- **Easy to Use:** Easy to use and integrate in your project.

# Upcoming Features

- **Gradients:** Support for gradients in the color picker.
- **Custom Palettes:** Support for custom color palettes.
- **Color Dropper:** Support for picking colors from the screen.
- **Color History:** Support for storing color history.
- **More Color Formats:** Support for more color formats like RGB, HSL, etc.
- **More Customization:** Support for more customization options.

# UI Customization

To further customize the UI of the color picker, you can manually override the styles for Colorify Picker Button using "`.react-colorify .colorify-picker`" and for Colorify Modal Box using "`.react-colorify.colorify-modal`".

For any queries, issues or new feature requests, please create an issue on the [GitHub repository](https://github.com/sunnybundel/react-colorify/issues).

# Changelog

#### 0.2.1

- Change prop name `customClass` to `className`.
- Add support for labelFor prop to add the functionality of clicking on the label to open the color picker.
- Added class `colorify-picker` to the color picker button for easy custom styling.
