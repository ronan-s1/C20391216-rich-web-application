# React JS Notes App

## Features
- Add, delete and edit notes.
- Choose note colour from drop down
- Add a cat fact note. Facts are fetched from this [API](https://catfact.ninja/fact)
- Add a note via voice input

![image](https://github.com/ronan-s1/C20391216-rich-web-application/assets/85257187/7c3f8319-3e02-4146-9b17-dce2590d02a6)

## Set up

```
npm install axios
npm install annyang
```

```
cd lab4/react-app
npm start
```


## Exericise Questions

1. **Explain using code examples what is meant by props and state in React JS?**

Props are used to pass data from a parent component to a child component in React, while state is used to manage the internal state of a component. Here's an example:

```jsx
// Parent Component
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const [parentState, setParentState] = useState('Parent State');

    return <ChildComponent propData={parentState} />;
}

// Child Component
import React from 'react';

function ChildComponent(props) {
    return <p>{props.propData}</p>;
}
```

2. **In functional programming, what does the term functor mean? Can you give an example in JavaScript?**

A functor is an object or function that implements the map function, allowing it to transform the values inside it. Here's an example in JavaScript:

```jsx
// Functor example
const myFunctor = {
  value: 10,
  map: function (fn) {
    return { value: fn(this.value) };
  },
};

// Using the functor
const incrementedFunctor = myFunctor.map((x) => x + 1);
console.log(incrementedFunctor.value); // Output: 11

```

3.**We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises, and streams. Mention one advantage and one disadvantage of each type.**

**Callbacks:**

- Advantage: Simple and widely supported.
- Disadvantage: Callback hell or the pyramid of doom, making code hard to read and maintain.
Promises:

**Promises:**
- Advantage: Improved readability with the use of .then and .catch.
- Disadvantage: Lack of cancellation support.
Streams:

**Streams:**
- Advantage: Efficient handling of large datasets in chunks.
- Disadvantage: Limited browser support and steeper learning curve.



4. **CSS Box Model**
The CSS Box Model is a layout model that represents elements on a webpage as rectangular boxes, consisting of content, padding, border, and margin. It helps in spacing and positioning DOM elements.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .box {
      width: 200px;
      height: 100px;
      padding: 20px;
      border: 2px solid black;
      margin: 10px;
    }
  </style>
</head>
<body>
  <div class="box">Content</div>
</body>
</html>
```

5. **How does the browser load and bootstrap a rich web application from an initial URL?**

<hr>

1. **Navigation:** The process begins when a user enters a URL or clicks a link, triggering a navigation event.

2. **DNS Resolution:** The browser performs DNS resolution to convert the domain into an IP address.

3. **HTTP Request:** A TCP connection is established, and an HTTP request is sent to the server for the requested resource.

4. **Server Processing:** The server processes the request, generates a response, and sends it back to the browser.

5. **HTML Parsing:** The browser parses the received HTML document, creating a Document Object Model (DOM) representation.

6. **CSS and JavaScript:** The browser fetches and processes linked stylesheets and scripts, applying styles to the DOM and executing scripts.

7. **Rendering:** The browser renders the initial view of the web page based on the DOM and styles.

8. **Asynchronous Loading:** Additional resources like images and asynchronous scripts are loaded concurrently to prevent blocking the main rendering process.

9. **Event Handling:** The browser sets up event listeners and begins waiting for user interactions.

10. **Dynamic Content:** JavaScript can dynamically modify the DOM, fetch additional data, and update the view without requiring a full page reload.

11. **Application Bootstrapping:** Frameworks and libraries may perform additional setup, initializing the application state and components.

12. **Final Rendering:** The fully loaded and bootstrapped web application is presented to the user.

