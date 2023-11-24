'use strict';

function app() {
     const formComponent = document.querySelector('.search_component');
     const searchInput = document.querySelector('.search_component-input');
     const notificationBtn = document.querySelector('.notification_btn');
     const storeBtn = document.querySelector('.store_name');

     function addState(component, className) {
          component.classList.add(className);
     }

     function removeState(component, className) {
          component.classList.remove(className);
     }

     // SEARCH COMPONENT STATES
     searchInput.addEventListener('mouseenter', function () {
          addState(formComponent, 'search_component-hover');
     });

     searchInput.addEventListener('mouseleave', function () {
          removeState(formComponent, 'search_component-hover');
     });

     searchInput.addEventListener('click', function () {
          addState(formComponent, 'search_component-pressedAndFocus');
     });

     searchInput.addEventListener('focus', function () {
          addState(formComponent, 'search_component-pressedAndFocus');
     });

     searchInput.addEventListener('blur', function () {
          removeState(formComponent, 'search_component-pressedAndFocus');
     });

     /** NOTIFICATION & STORE */
     notificationBtn.addEventListener('mouseenter', function () {
          addState(notificationBtn, 'notification_btn-hover');
     });

     notificationBtn.addEventListener('mouseleave', function () {
          removeState(notificationBtn, 'notification_btn-hover');
     });

     notificationBtn.addEventListener('focus', function () {
          addState(notificationBtn, 'notification_btn-focus');
     });

     notificationBtn.addEventListener('blur', function () {
          removeState(notificationBtn, 'notification_btn-focus');
     });

     storeBtn.addEventListener('mouseenter', function () {
          addState(storeBtn, 'store_name-hover');
     });

     storeBtn.addEventListener('mouseleave', function () {
          removeState(storeBtn, 'store_name-hover');
     });

     storeBtn.addEventListener('focus', function () {
          addState(storeBtn, 'store_name-focus');
     });

     storeBtn.addEventListener('blur', function () {
          removeState(storeBtn, 'store_name-focus');
     });
}

app();
