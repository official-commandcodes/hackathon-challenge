'use strict';

function app() {
     const formComponent = document.querySelector('.search_component');
     const searchInput = document.querySelector('.search_component-input');
     const alertsBtn = document.querySelector('.alerts_btn');
     const storeBtn = document.querySelector('.store_btn');
     const alertContainer = document.querySelector('.alerts_component');
     const storeContainer = document.querySelector('.store_tab');
     const allMenuItems = document.querySelectorAll('[role="menuitem"]');
     const menuContainer = document.querySelector('.store_tab');
     const bigContainer = document.querySelector('.onboard_container');
     const svgFocus = document.querySelector('.alerts_component_btn_svg');
     let currentFocusItem = 0;

     function addState(component, className) {
          component.classList.add(className);
     }

     function removeState(component, className) {
          component.classList.remove(className);
     }

     // HANDLE MENU KEY PRESS
     function handleMenuKeyPress(e) {
          if (e.key === 'ArrowUp' && currentFocusItem !== 0) {
               currentFocusItem = currentFocusItem - 1;
               allMenuItems.item(currentFocusItem).focus();

               return;
          }

          if (
               e.key === 'ArrowDown' &&
               currentFocusItem !== allMenuItems.length - 1
          ) {
               currentFocusItem = currentFocusItem + 1;
               allMenuItems.item(currentFocusItem).focus();

               return;
          }

          if (e.key === 'ArrowUp' && currentFocusItem === 0) {
               currentFocusItem = allMenuItems.length - 1;
               allMenuItems.item(currentFocusItem).focus();

               return;
          }

          if (e.key === 'ArrowDown' && allMenuItems.length - 1) {
               currentFocusItem = 0;
               allMenuItems.item(currentFocusItem).focus();

               return;
          }
     }

     // HANDLE ESCAPE KEY PRESS
     function handleEscapeKeyPress(e) {
          if (e.key === 'Escape') {
               removeState(storeContainer, 'store_tab-toggle');
               currentFocusItem = 0;

               storeBtn.ariaExpanded = 'false';

               storeBtn.focus();
          }
     }

     // HANDLE OUTSIDE CLICK
     function handleOutsideClick(e) {
          const alertIsExpanded =
               alertsBtn.attributes['aria-expanded'].value === 'true';

          const storeIsExpanded =
               storeBtn.attributes['aria-expanded'].value === 'true';

          if (e.target.closest('.alerts_btn')) {
               return;
          }

          if (
               alertIsExpanded &&
               e.target.closest('.alerts_component') === null
          ) {
               alertsBtn.ariaExpanded = 'false';
               removeState(alertContainer, 'alert-box-show');

               return;
          }

          if (e.target.closest('.store_btn')) {
               return;
          }

          if (storeIsExpanded && e.target.closest('.store_tab') === null) {
               storeBtn.ariaExpanded = 'false';
               removeState(storeContainer, 'store_tab-toggle');

               return;
          }
     }

     // SEARCH COMPONENT STATES
     searchInput.addEventListener('mouseenter', function () {
          addState(formComponent, 'search_component-hover');
     });

     searchInput.addEventListener('mouseleave', function () {
          removeState(formComponent, 'search_component-hover');
     });

     // PRESSED STATE
     searchInput.addEventListener('click', function () {
          addState(formComponent, 'search_component-pressedAndFocus');
     });

     // FOCUSED STATE
     searchInput.addEventListener('focus', function () {
          addState(formComponent, 'search_component-pressedAndFocus');
     });

     searchInput.addEventListener('blur', function () {
          removeState(formComponent, 'search_component-pressedAndFocus');
     });

     /** ALERT EVENTS */
     alertsBtn.addEventListener('click', function () {
          let isExpandedAlerts =
               alertsBtn.attributes['aria-expanded'].value === 'true';

          let isExpandedStore =
               storeBtn.attributes['aria-expanded'].value === 'true';

          if (isExpandedAlerts) {
               alertsBtn.ariaExpanded = 'false';

               removeState(alertContainer, 'alert-box-show');
               removeState(alertsBtn, 'alerts_btn-focus');
               // addState(alertsBtn, 'alerts_btn-focus');

               return;
          }

          if (isExpandedStore) {
               storeBtn.ariaExpanded = 'false';

               removeState(storeContainer, 'store_tab-toggle');
               removeState(storeBtn, 'store_name-focus');

               // addState(alertContainer, 'alert-box-show');
          }

          // addState(overlay, 'overlay_hidden');

          alertsBtn.ariaExpanded = 'true';

          addState(alertContainer, 'alert-box-show');

          removeState(alertsBtn, 'alerts_btn-focus');
     });

     alertsBtn.addEventListener('mouseenter', function () {
          addState(alertsBtn, 'alerts_btn-hover');
     });

     alertsBtn.addEventListener('mouseleave', function () {
          removeState(alertsBtn, 'alerts_btn-hover');
     });

     alertsBtn.addEventListener('focus', function () {
          addState(alertsBtn, 'alerts_btn-focus');
     });

     alertsBtn.addEventListener('blur', function () {
          removeState(alertsBtn, 'alerts_btn-focus');
     });

     /** STORE EVENTS */
     storeBtn.addEventListener('click', function () {
          let isExpandedStore =
               storeBtn.attributes['aria-expanded'].value === 'true';

          let isExpandedAlerts =
               alertsBtn.attributes['aria-expanded'].value === 'true';

          if (isExpandedStore) {
               storeBtn.ariaExpanded = 'false';

               removeState(storeContainer, 'store_tab-toggle');
               removeState(storeBtn, 'store_name-focus');

               return;
          }

          if (isExpandedAlerts) {
               alertsBtn.ariaExpanded = 'false';

               removeState(alertContainer, 'alert-box-show');
               removeState(alertsBtn, 'alerts_btn-focus');

               addState(storeContainer, 'store_tab-toggle');
          }

          storeBtn.ariaExpanded = 'true';

          // addState(overlay, 'overlay_hidden');

          addState(storeContainer, 'store_tab-toggle');

          allMenuItems.item(currentFocusItem).focus();

          removeState(storeBtn, 'store_item_focus');

          // HANDLE KEY PRESS EVENT
          menuContainer.addEventListener('keyup', handleMenuKeyPress);

          // ESCAPE KEY TO CLOSE THE MENU
          menuContainer.addEventListener('keyup', handleEscapeKeyPress);
     });

     storeBtn.addEventListener('focus', function () {
          addState(storeBtn, 'store_item_focus');
     });

     storeBtn.addEventListener('blur', function () {
          removeState(storeBtn, 'store_item_focus');
     });

     storeBtn.addEventListener('mouseenter', function () {
          addState(storeBtn, 'store_name-hover');
     });

     storeBtn.addEventListener('mouseleave', function () {
          removeState(storeBtn, 'store_name-hover');
     });

     // OUTSIDE CLICK
     bigContainer.addEventListener('click', handleOutsideClick);

     svgFocus.addEventListener('focus', function (e) {
          return;
     });
}

app();
