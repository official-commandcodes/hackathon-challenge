# Hackathon Nov 2023 Project (Shopify)

Hackathon Front challenge which focuses on frontend improvement by implementing Admin page of mouse users, keyboard users and screen readers.

### Stack used

-    html
-    css
-    javascript

### Javascript modern features used

-    (Closest method)[https://developer.mozilla.org/en-US/docs/Web/API/Element/closest]: The closest() method of the Element interface traverses the element and its parents until it finds a node that matches the specified CSS selector.

```js
function handleLabelClickedOpen(e) {
     const dataset = e.target.closest('.guide_list_cta').dataset.label;
     const labelContainer = e.target.closest('.guide_list_cta');
     const targetTab = document.querySelector(`[data-tab="${dataset}"]`);

     // show parent
     removeState(targetTab, HIDDEN_STATE);

     // hide child parent
     addState(labelContainer, HIDDEN_STATE);

     // close previouse tab
     closeTab(currentTab);

     currentTab = Number(dataset);

     setTimeout(() => {
          const actionSelectedContainerButton = document
               .querySelector(`[data-tab="${dataset}"]`)
               .querySelector('.mark_done');

          actionSelectedContainerButton.focus();
     }, 500);
}
```

-    Different ways of selecting dom element:

```js
// Selecting by Attribute:
const targetTab = document.querySelector(`[data-tab="${dataset}"]`);
```

-    Creating reusable functions and variables

```js
// GLOBAL FUNCTIONS
function addState(component, className) {
     component.classList.add(className);
}
function removeState(component, className) {
     component.classList.remove(className);
}
const HIDDEN_STATE = 'hidden';
```

##### clone

Use the code below and check the awesome project:

```
https://github.com/Musa-kabeer/hackathon-challenge.git
```
