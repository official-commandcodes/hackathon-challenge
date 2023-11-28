'use strict';

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
const toggleArrowButtonOpen = document.querySelector('.guide_header_btn_open');
const toggleArrowButtonClose = document.querySelector(
     '.guide_header_btn_close'
);
const cardContainer = document.querySelector('.guide_lists');

let currentFocusItem = 0;

// GLOBAL FUNCTIONS
function addState(component, className) {
     component.classList.add(className);
}
function removeState(component, className) {
     component.classList.remove(className);
}

//  INPUT FIELD ONLY
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

/** ALERT & STORE */
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

function handleEscapeKeyPress(e) {
     if (e.key === 'Escape') {
          removeState(storeContainer, 'store_tab-toggle');
          currentFocusItem = 0;

          storeBtn.ariaExpanded = 'false';

          storeBtn.focus();
     }
}

alertsBtn.addEventListener('click', function () {
     let isExpandedAlerts =
          alertsBtn.attributes['aria-expanded'].value === 'true';

     let isExpandedStore =
          storeBtn.attributes['aria-expanded'].value === 'true';

     if (isExpandedAlerts) {
          alertsBtn.ariaExpanded = 'false';

          removeState(alertContainer, 'alert-box-show');
          removeState(alertsBtn, 'alerts_btn-focus');

          return;
     }

     if (isExpandedStore) {
          storeBtn.ariaExpanded = 'false';

          removeState(storeContainer, 'store_tab-toggle');
          removeState(storeBtn, 'store_name-focus');
     }

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
function handleOutsideClick(e) {
     const alertIsExpanded =
          alertsBtn.attributes['aria-expanded'].value === 'true';

     const storeIsExpanded =
          storeBtn.attributes['aria-expanded'].value === 'true';

     if (e.target.closest('.alerts_btn')) {
          return;
     }

     if (alertIsExpanded && e.target.closest('.alerts_component') === null) {
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

bigContainer.addEventListener('click', handleOutsideClick);

// ALERT SVG FOCUS STATE
svgFocus.addEventListener('focus', function (e) {
     return;
});

/*
 * MAIN CONTENT
 */

//REMOVE TRIAL
function handleDismissTrial() {
     addState(trialContainer, 'hidden');
}

dismissButton.addEventListener('click', handleDismissTrial);

// ARROW UP & ARROW DOWN TOGGLE
function announce(message) {
     const liveRegion = document.querySelector('.open_and_close_tab');
     liveRegion.ariaLabel = message;
}

function handleCardClose() {
     const isExpanded = toggleArrowButtonOpen.ariaExpanded === 'true';

     if (isExpanded) {
          toggleArrowButtonOpen.ariaExpanded = 'false';
          toggleArrowButtonClose.ariaExpanded = 'true';

          addState(cardContainer, 'hidden');

          addState(toggleArrowButtonClose, 'hidden');

          removeState(toggleArrowButtonOpen, 'hidden');

          toggleArrowButtonOpen.focus();

          announce('Tab closed');
     }

     // // add & hid 'hidden' class for both buttons respectively
     // removeState(toggleArrowButtonOpen, 'hidden');

     // // add 'hidden' to card container
     // addState(cardContainer, 'hidden');
}

function handleCardOpen() {
     const isExpanded = toggleArrowButtonClose.ariaExpanded === 'true';

     if (isExpanded) {
          toggleArrowButtonClose.ariaExpanded = 'false';
          toggleArrowButtonOpen.ariaExpanded = 'true';

          removeState(cardContainer, 'hidden');

          removeState(toggleArrowButtonClose, 'hidden');

          addState(toggleArrowButtonOpen, 'hidden');

          toggleArrowButtonClose.focus();

          announce('Tab opened');
     }

     // hid & add 'hidden' class for both buttons respectively
     // removeState(toggleArrowButtonClose, 'hidden');
     // addState(toggleArrowButtonOpen, 'hidden');

     // // remove 'hidden' to card container
     // removeState(cardContainer, 'hidden');
}

toggleArrowButtonOpen.addEventListener('click', handleCardOpen);
toggleArrowButtonClose.addEventListener('click', handleCardClose);

////////////////////////
////////////////
//////////
//////
// ELEMENTS
const labelButtons = document.querySelectorAll('#cta');
const unCompleteBtns = document.querySelectorAll('.open_dash');
const completeBtns = document.querySelectorAll('.open_mark');
const unMarkContainerBtn = document.querySelectorAll('.container_mark');
const markAsDoneContainerButton = document.querySelectorAll('.mark_done');
const checkLiveBtn = document.querySelector('.shopping_item_live');

const containerDash = document.querySelectorAll('.open_hover');
const containerMark = document.querySelectorAll('.container_hover');

const normalIcon = document.querySelectorAll('.icon_tab_state');
const boxIcon = document.querySelectorAll('.tab_icon');

const progressStart = document.querySelector('.progress_start');
const progressEnd = document.querySelector('.progress_end');
const progressBar = document.querySelector('#progress');
const tabLargeButtons = document.querySelectorAll(
     '.guide_tab_left_content_btn_1'
);

let currentTab = 0;
let checkedTabs = [];
const IS_LOADING = 700;
const CLOSE_AND_OPENING_TAB = 300;
progressEnd.textContent = labelButtons.length;

// HELPER FUNCTIONS
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

// OPEN CLICKED TAB AND CLOSING PREVIOUS ONE
function handleOpenClickedLabel(e) {
     const dataset = e.target.closest('.guide_list_cta').dataset.label;
     const labelContainer = e.target.closest('.guide_list_cta');
     const targetTab = document.querySelector(`[data-tab="${dataset}"]`);
     // const btnToBeFocused = document
     //      .querySelector(`[data-tab="${dataset}"]`)
     //      .querySelector('button');

     // show parent
     removeState(targetTab, 'hidden');

     // hide child parent
     addState(labelContainer, 'hidden');

     // close previouse tab
     closeTab(currentTab);

     currentTab = Number(dataset);
}
labelButtons.forEach((btn) => {
     btn.addEventListener('click', handleOpenClickedLabel);
});

// UPDATE PROGRESS STATE
function executeProgress() {
     // update number completed
     progressStart.textContent = checkedTabs.length;

     // update progress bar
     const percentageWidth = Math.min(checkedTabs.length * 20, 100);

     progressBar.style.width = `${percentageWidth}%`;
}

// MOUSE ENTER & LEAVE LABEL BUTTON
normalIcon.forEach((btn) => {
     btn.addEventListener('mouseenter', handleMouseOverLabelButton);
     btn.addEventListener('mouseleave', handleMouseLeaveLabelButton);
});
function handleMouseOverLabelButton(e) {
     const tempBtn = e.target.querySelector('.open_hover');

     const staticBtn = e.target.querySelector('.open_dash');

     const markBtn = e.target.querySelector('.open_mark');

     if (!markBtn.classList.contains('hidden')) {
          addState(tempBtn, 'hidden');
          addState(staticBtn, 'hidden');
          return;
     }

     removeState(tempBtn, 'hidden');
     addState(staticBtn, 'hidden');
}
function handleMouseLeaveLabelButton(e) {
     const tempBtn = e.target.querySelector('.open_hover');

     const staticBtn = e.target.querySelector('.open_dash');
     const markBtn = e.target.querySelector('.open_mark');

     if (!markBtn.classList.contains('hidden')) {
          addState(tempBtn, 'hidden');
          addState(staticBtn, 'hidden');
          return;
     }

     addState(tempBtn, 'hidden');
     removeState(staticBtn, 'hidden');
}

// MOUSE OVER CONTAINER BUTTONS
boxIcon.forEach((btn) => {
     btn.addEventListener('mouseenter', handleMouseOverBoxButton);
     btn.addEventListener('mouseleave', handleMouseLeaveBoxButton);
});
function handleMouseOverBoxButton(e) {
     const tempBtn = e.target.querySelector('.container_hover');

     const staticBtn = e.target.querySelector('.container_dash');
     const markBtn = e.target.querySelector('.container_mark');

     if (!markBtn.classList.contains('hidden')) {
          addState(tempBtn, 'hidden');
          addState(staticBtn, 'hidden');
          return;
     }

     removeState(tempBtn, 'hidden');
     addState(staticBtn, 'hidden');
}
function handleMouseLeaveBoxButton(e) {
     const tempBtn = e.target.querySelector('.container_hover');

     const staticBtn = e.target.querySelector('.container_dash');
     const markBtn = e.target.querySelector('.container_mark');

     if (!markBtn.classList.contains('hidden')) {
          addState(tempBtn, 'hidden');
          addState(staticBtn, 'hidden');
          return;
     }

     addState(tempBtn, 'hidden');
     removeState(staticBtn, 'hidden');
}

// MARK LABEL
containerDash.forEach((btn) => {
     btn.addEventListener('click', handleMarkLabel);
});
function handleMarkLabel(e) {
     const itemCompleted = e.target.closest('.guide_list_cta').dataset.label;
     const parentEl = e.target.closest('.icon_tab_state');

     const dash_icon = parentEl.querySelector('.open_dash');
     const mark_icon = parentEl.querySelector('.open_mark');
     const hover_icon = parentEl.querySelector('.open_hover');
     const blink_icon = parentEl.querySelector('.open_blink');
     const rotate_icon = parentEl.querySelector('.open_rotate');

     const tab = document.querySelector(`[data-tab="${itemCompleted}"]`);
     const container_dash = tab.querySelector('.container_dash');
     const container_mark = tab.querySelector('.container_mark');

     addState(dash_icon, 'hidden');
     addState(hover_icon, 'hidden');
     removeState(blink_icon, 'hidden');

     setTimeout(() => {
          addState(blink_icon, 'hidden');
          addState(hover_icon, 'hidden');
          addState(dash_icon, 'hidden');

          removeState(rotate_icon, 'hidden');

          addState(rotate_icon, 'rotate');
     }, 300);

     setTimeout(() => {
          addState(blink_icon, 'hidden');
          addState(rotate_icon, 'hidden');

          // update container buttons
          addState(container_dash, 'hidden');
          removeState(container_mark, 'hidden');

          // update
          addState(dash_icon, 'hidden');
          removeState(mark_icon, 'hidden');

          checkedTabs.push(itemCompleted);

          closeTab(currentTab);

          currentTab = Number(itemCompleted);

          openTab(itemCompleted);

          // update progress
          executeProgress();
     }, IS_LOADING);
}

// UNMARK LABEL
completeBtns.forEach((btn) => btn.addEventListener('click', handleUnMarkLabel));
function handleUnMarkLabel(e) {
     const itemCompleted = e.target.closest('.guide_list_cta').dataset.label;
     const parentEl = e.target.closest('.icon_tab_state');
     const dash_icon = parentEl.querySelector('.open_dash');
     const mark_icon = parentEl.querySelector('.open_mark');
     const rotate_icon = parentEl.querySelector('.open_rotate');
     const container = document.querySelector(`[data-tab="${itemCompleted}"]`);
     const container_dash = container.querySelector('.container_dash');
     const container_mark = container.querySelector('.container_mark');

     // update container buttons
     addState(mark_icon, 'hidden');
     removeState(rotate_icon, 'hidden');

     addState(rotate_icon, 'rotate');

     setTimeout(() => {
          // update container buttons
          removeState(container_dash, 'hidden');
          addState(container_mark, 'hidden');

          addState(rotate_icon, 'hidden');

          // // update
          // removeState(dash_icon, 'hidden');
          // addState(mark_icon, 'hidden');

          const newCheckedTab = checkedTabs.filter(
               (tab) => tab !== itemCompleted
          );

          checkedTabs = newCheckedTab;

          setTimeout(() => {
               // open the tab with mark state on it
               closeTab(currentTab);

               currentTab = itemCompleted;

               openTab(currentTab);

               // update progress
               executeProgress();
          });
     }, IS_LOADING);
}

// MARK AS NOT DONE
function handleMarkAsNotDone(btn, itemCompleted) {
     const dash_icon = btn.querySelector('.container_dash');
     const mark_icon = btn.querySelector('.container_mark');
     const hover_icon = btn.querySelector('.container_hover');
     const rotate_icon = btn.querySelector('.container_rotate');

     const label = document.querySelector(`[data-label="${itemCompleted}"]`);
     const label_dash = label.querySelector('.open_dash');
     const label_mark = label.querySelector('.open_mark');

     // update container buttons
     addState(mark_icon, 'hidden');
     addState(dash_icon, 'hidden');
     addState(hover_icon, 'hidden');
     removeState(rotate_icon, 'hidden');

     // screen reader
     document.querySelector('.shopping_item_live').ariaLabel =
          'Loading. Please wait...';

     setTimeout(() => {
          // screen reader
          btn.ariaLabel = btn.ariaLabel.replace('as not done', 'as done');

          document.querySelector('.shopping_item_live').ariaLabel =
               'unmark successful..';

          addState(rotate_icon, 'hidden');

          removeState(dash_icon, 'hidden');

          // update
          removeState(label_dash, 'hidden');
          addState(label_mark, 'hidden');

          const newCheckedTab = checkedTabs.filter(
               (tab) => tab !== itemCompleted
          );

          checkedTabs = newCheckedTab;

          if (itemCompleted === '4') {
               // update progress
               executeProgress();

               openTab(currentTab);

               return;
          }
          // open the tab with mark state on it
          closeTab(itemCompleted);

          currentTab = `${Number(itemCompleted) + 1}`;

          openTab(currentTab);

          // update progress
          executeProgress();
     }, IS_LOADING);
}

// MARK DONE HANDLER
function handleMarkAsDone(btn, itemCompleted) {
     const dash_icon = btn.querySelector('.container_dash');
     const hover_icon = btn.querySelector('.container_hover');
     const mark_icon = btn.querySelector('.container_mark');
     const blink_icon = btn.querySelector('.container_blink');
     const rotate_icon = btn.querySelector('.container_rotate');

     const label = document.querySelector(`[data-label="${itemCompleted}"]`);
     const open_dash = label.querySelector('.open_dash');
     const open_mark = label.querySelector('.open_mark');

     removeState(blink_icon, 'hidden');
     addState(hover_icon, 'hidden');
     addState(dash_icon, 'hidden');

     // screen reader
     checkLiveBtn.ariaLabel = 'Loading. Please wait...';

     setTimeout(() => {
          addState(blink_icon, 'hidden');
          addState(hover_icon, 'hidden');
          addState(dash_icon, 'hidden');

          removeState(rotate_icon, 'hidden');

          addState(rotate_icon, 'rotate');
     }, 300);

     setTimeout(() => {
          // screen reader
          btn.ariaLabel = btn.ariaLabel.replace('as done', 'as not done');

          checkLiveBtn.ariaLabel = 'Marked successful..';

          addState(rotate_icon, 'hidden');
          addState(blink_icon, 'hidden');

          // update container buttons
          addState(open_dash, 'hidden');
          removeState(open_mark, 'hidden');

          // update
          addState(hover_icon, 'hidden');
          addState(dash_icon, 'hidden');
          removeState(mark_icon, 'hidden');

          checkedTabs.push(itemCompleted);

          setTimeout(() => {
               closeTab(itemCompleted);

               if (currentTab === '4') {
                    // update progress
                    executeProgress();
                    openTab(4);
                    return;
               }

               currentTab = `${Number(itemCompleted) + 1}`;

               openTab(currentTab);
          }, CLOSE_AND_OPENING_TAB);

          // update progress
          executeProgress();
     }, IS_LOADING);
}

markAsDoneContainerButton.forEach((btn) => {
     btn.addEventListener('click', function (e) {
          const itemCompleted = btn.closest('.guide_list_tab').dataset.tab;

          const btnState = btn.ariaLabel === 'Mark tab as done';

          if (btnState) {
               handleMarkAsDone(btn, itemCompleted);
               return;
          }

          handleMarkAsNotDone(btn, itemCompleted);
     });
});

// EVENT ON EACH LARGE BROWN BUTTONS
tabLargeButtons.forEach((btn) =>
     btn.addEventListener('mouseenter', function (e) {
          addState(e.target, 'large_button_hover');
     })
);

tabLargeButtons.forEach((btn) =>
     btn.addEventListener('mouseleave', function (e) {
          removeState(e.target, 'large_button_hover');
     })
);

tabLargeButtons.forEach((btn) =>
     btn.addEventListener('focus', function (e) {
          addState(e.target, 'large_button_focus');
     })
);
