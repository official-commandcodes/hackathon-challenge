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
     const dismissButton = document.querySelector('.dismiss_btn');
     const trialContainer = document.querySelector('.plan_container');
     const toggleArrowButtonOpen = document.querySelector(
          '.guide_header_btn_open'
     );
     const toggleArrowButtonClose = document.querySelector(
          '.guide_header_btn_close'
     );
     const cardContainer = document.querySelector('.guide_lists');

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

     /*
      * Main content implementation
      */

     //REMOVE TRIAL
     function handleDismissTrial() {
          addState(trialContainer, 'hidden');
     }

     dismissButton.addEventListener('click', handleDismissTrial);

     // ARROW UP & ARROW DOWN TOGGLE
     function handleCardClose() {
          // add & hid 'hidden' class for both buttons respectively
          addState(toggleArrowButtonClose, 'hidden');
          removeState(toggleArrowButtonOpen, 'hidden');

          // add 'hidden' to card container
          addState(cardContainer, 'hidden');
     }

     function handleCardOpen() {
          // hid & add 'hidden' class for both buttons respectively
          removeState(toggleArrowButtonClose, 'hidden');
          addState(toggleArrowButtonOpen, 'hidden');

          // remove 'hidden' to card container
          removeState(cardContainer, 'hidden');
     }

     toggleArrowButtonOpen.addEventListener('click', handleCardOpen);
     toggleArrowButtonClose.addEventListener('click', handleCardClose);

     /**
      *
      * MAIN CONTAJNER
      *
      *
      */

     const tabBtns = document.querySelectorAll('#cta');
     const unCompleteBtns = document.querySelectorAll('.open_dash');
     const completeBtns = document.querySelectorAll('.open_mark');

     const containerDash = document.querySelectorAll('.container_dash');
     const containerMark = document.querySelectorAll('.container_mark');

     const progressStart = document.querySelector('.progress_start');
     const progressEnd = document.querySelector('.progress_end');
     const progressBar = document.querySelector('#progress');

     let currentTab = 0;
     let checkedTabs = [];

     progressEnd.textContent = tabBtns.length;

     function openTab(tab) {
          const nextTab = document.querySelector(`[data-tab="${tab}"]`);
          const nextLabel = document.querySelector(`[data-label="${tab}"]`);

          // remove hidden class on tab & add hidden class to label
          addState(nextLabel, 'hidden');
          removeState(nextTab, 'hidden');
     }
     openTab(currentTab);

     function closeTab(tab) {
          const previousTab = document.querySelector(`[data-tab="${tab}"]`);
          const previousLabel = document.querySelector(`[data-label="${tab}"]`);

          // remove hidden class on tab & add hidden class to label
          addState(previousTab, 'hidden');
          removeState(previousLabel, 'hidden');
     }

     function handleOpenContainer(e) {
          // clicking on one of the five onboarding steps
          const closestEl = e.target.closest('.guide_list_cta');
          const btnDataset = closestEl.dataset.label;

          const parentEl = document.querySelector(`[data-tab="${btnDataset}"]`);

          // show parent
          removeState(parentEl, 'hidden');

          // hide child parent
          addState(closestEl, 'hidden');

          // close previouse tab
          closeTab(currentTab);

          if (currentTab === 4) {
               return (currentTab = 0);
          }

          currentTab = currentTab + 1;
     }

     function executeProgress() {
          // update number completed
          progressStart.textContent = checkedTabs.length;

          // update progress bar
          const percentageWidth = Math.min(checkedTabs.length * 20, 100);

          progressBar.style.width = `${percentageWidth}%`;
     }

     function handleUnCompleted(e) {
          console.log('Hello');
          const itemCompleted =
               e.target.closest('.guide_list_cta').dataset.label;
          const parentEl = e.target.closest('.icon_tab_state');

          const dash_icon = parentEl.querySelector('.open_dash');
          const mark_icon = parentEl.querySelector('.open_mark');
          const hover_icon = parentEl.querySelector('.hover_solid');
          const container = document.querySelector(
               `[data-tab="${itemCompleted}"]`
          );
          const container_dash = container.querySelector('.container_dash');
          const container_mark = container.querySelector('.container_mark');

          // update container buttons
          addState(container_dash, 'hidden');
          removeState(container_mark, 'hidden');

          // update
          addState(dash_icon, 'hidden');
          addState(hover_icon, 'hidden');
          removeState(mark_icon, 'hidden');
          checkedTabs.push(itemCompleted);

          // open the tab with mark state on it
          closeTab(currentTab);

          currentTab = itemCompleted;

          openTab(currentTab);

          // update progress
          executeProgress();
     }

     function handleComplete(e) {
          const itemCompleted =
               e.target.closest('.guide_list_cta').dataset.label;
          const parentEl = e.target.closest('.icon_tab_state');
          const dash_icon = parentEl.querySelector('.open_dash');
          const mark_icon = parentEl.querySelector('.open_mark');
          const container = document.querySelector(
               `[data-tab="${itemCompleted}"]`
          );
          const container_dash = container.querySelector('.container_dash');
          const container_mark = container.querySelector('.container_mark');

          // update container buttons
          removeState(container_dash, 'hidden');
          addState(container_mark, 'hidden');

          // update
          removeState(dash_icon, 'hidden');
          addState(mark_icon, 'hidden');

          const newCheckedTab = checkedTabs.filter(
               (tab) => tab !== itemCompleted
          );
          checkedTabs = newCheckedTab;
          // open the tab with mark state on it
          closeTab(currentTab);

          currentTab = itemCompleted;

          openTab(currentTab);

          // update progress
          executeProgress();
     }

     function handleContainerDash(e) {
          const itemCompleted = e.target.closest('.guide_list_tab').dataset.tab;
          const parentEl = e.target.closest('.tab_icon');

          const dash_icon = parentEl.querySelector('.container_dash');
          const mark_icon = parentEl.querySelector('.container_mark');
          const label = document.querySelector(
               `[data-label="${itemCompleted}"]`
          );
          const open_dash = label.querySelector('.open_dash');
          const open_mark = label.querySelector('.open_mark');
          const open_hover = label.querySelector('.hover_solid');

          // update container buttons
          addState(open_dash, 'hidden');
          addState(open_hover, 'hidden');
          removeState(open_mark, 'hidden');

          // update
          addState(dash_icon, 'hidden');
          removeState(mark_icon, 'hidden');
          checkedTabs.push(itemCompleted);

          // open the tab with mark state on it
          closeTab(currentTab);

          if (currentTab === '4') {
               // update progress
               executeProgress();
               openTab(4);
               return;
          }

          currentTab = `${Number(itemCompleted) + 1}`;

          openTab(currentTab);

          // update progress
          executeProgress();
     }

     function handleMarkContainer(e) {
          console.log('Hello');

          const itemCompleted = e.target.closest('.guide_list_tab').dataset.tab;
          const parentEl = e.target.closest('.tab_icon');

          const dash_icon = parentEl.querySelector('.container_dash');
          const mark_icon = parentEl.querySelector('.container_mark');
          const label = document.querySelector(
               `[data-label="${itemCompleted}"]`
          );
          const open_dash = label.querySelector('.open_dash');
          const open_mark = label.querySelector('.open_mark');

          // update container buttons
          removeState(open_dash, 'hidden');
          addState(open_mark, 'hidden');

          // update
          removeState(dash_icon, 'hidden');
          addState(mark_icon, 'hidden');

          const newCheckedTab = checkedTabs.filter(
               (tab) => tab !== itemCompleted
          );

          checkedTabs = newCheckedTab;

          closeTab(itemCompleted);

          if (currentTab === '4') {
               // update progress
               executeProgress();
               openTab(4);
               return;
          }

          currentTab = `${Number(itemCompleted) + 1}`;

          openTab(currentTab);

          // update progress
          executeProgress();
     }

     // function handleMouseEnter(e) {
     //      const closeContainer = e.target.closest('.tab_icon');
     //      const tempBtn = closeContainer.querySelector('.hover_solid');

     //      const staticBtn = closeContainer.querySelector('.container_dash');

     //      removeState(tempBtn, 'hidden');
     //      addState(staticBtn, 'hidden');
     // }

     // function handleMouseLeave(e) {
     //      const closeContainer = e.target.closest('.tab_icon');
     //      const tempBtn = closeContainer.querySelector('.hover_solid');

     //      const staticBtn = closeContainer.querySelector('.container_dash');

     //      addState(tempBtn, 'hidden');
     //      removeState(staticBtn, 'hidden');
     // }

     // function handleUncompleteEnter(e) {
     //      const closeContainer = e.target.closest('.icon_tab_state');
     //      const tempBtn = closeContainer.querySelector('.hover_solid');

     //      const staticBtn = closeContainer.querySelector('.open_dash');

     //      removeState(tempBtn, 'hidden');
     //      addState(staticBtn, 'hidden');
     // }

     // function handleUncompleteLeave(e) {
     //      const closeContainer = e.target.closest('.icon_tab_state');
     //      const tempBtn = closeContainer.querySelector('.hover_solid');

     //      const staticBtn = closeContainer.querySelector('.open_dash');

     //      addState(tempBtn, 'hidden');
     //      removeState(staticBtn, 'hidden');
     // }

     // OPEN CONTAINER
     tabBtns.forEach((btn) => {
          btn.addEventListener('click', handleOpenContainer);
     });

     // COMPLETE STEP
     unCompleteBtns.forEach((btn) =>
          btn.addEventListener('click', handleUnCompleted)
     );

     // UNCOMPLETE STEP
     completeBtns.forEach((btn) =>
          btn.addEventListener('click', handleComplete)
     );

     // CONTAINER DASH
     containerDash.forEach((btn) => {
          btn.addEventListener('click', handleContainerDash);
     });

     // CONTAINER MARK
     containerMark.forEach((btn) => {
          btn.addEventListener('click', handleMarkContainer);
     });

     //      // CONTAINER DASH
     //      containerDash.forEach((btn) => {
     //           btn.addEventListener('mouseenter', handleMouseEnter);
     //           btn.addEventListener('mouseleave', handleMouseLeave);
     //      });

     //      // // CONTAINER DASH
     //      unCompleteBtns.forEach((btn) => {
     //           btn.addEventListener('mouseover', handleUncompleteEnter);
     //           btn.addEventListener('mouseleave', handleUncompleteLeave);
     //      });
}

app();
