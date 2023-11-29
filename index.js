'use strict';

const app = function () {
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

     // GLOBAL FUNCTIONS
     function addState(element, className) {
          element.classList.add(className);
     }
     function removeState(element, className) {
          element.classList.remove(className);
     }
     const HIDDEN_STATE = 'hidden';

     /**
      *
      *
      *
      *
      *  navigation container
      *
      *
      *
      *
      */

     //  SEARCH COMPONENT
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

     bigContainer.addEventListener('click', handleOutsideClick);

     // mark alert component focus state
     svgFocus.addEventListener('focus', function (e) {
          return;
     });

     /**
      *
      *
      *
      *
      * main container
      *
      *
      *
      *
      */
     // DISMISS TAB TRIAL
     function handleDismissTrial() {
          addState(trialContainer, HIDDEN_STATE);
          document.querySelector('.guide_header_btn_close').focus();
     }
     dismissButton.addEventListener('click', handleDismissTrial);

     // arrow up & arrow down toggle guides
     function announce(message) {
          const liveRegion = document.querySelector('.open_and_close_tab');
          liveRegion.ariaLabel = message;
     }

     function handleCardClose() {
          const isExpanded = toggleArrowButtonOpen.ariaExpanded === 'true';

          if (isExpanded) {
               toggleArrowButtonOpen.ariaExpanded = 'false';
               toggleArrowButtonClose.ariaExpanded = 'true';

               addState(cardContainer, HIDDEN_STATE);

               addState(toggleArrowButtonClose, HIDDEN_STATE);

               removeState(toggleArrowButtonOpen, HIDDEN_STATE);

               toggleArrowButtonOpen.focus();

               announce('Tab closed');
          }
     }

     function handleCardOpen() {
          const isExpanded = toggleArrowButtonClose.ariaExpanded === 'true';

          if (isExpanded) {
               toggleArrowButtonClose.ariaExpanded = 'false';
               toggleArrowButtonOpen.ariaExpanded = 'true';

               removeState(cardContainer, HIDDEN_STATE);

               removeState(toggleArrowButtonClose, HIDDEN_STATE);

               addState(toggleArrowButtonOpen, HIDDEN_STATE);

               toggleArrowButtonClose.focus();

               announce('Tab opened');
          }
     }
     toggleArrowButtonOpen.addEventListener('click', handleCardOpen);
     toggleArrowButtonClose.addEventListener('click', handleCardClose);

     // ELEMENTS || HELPERS
     const labelButtons = document.querySelectorAll('#cta');
     const markAsDoneContainerButton = document.querySelectorAll('.mark_done');
     const checkLiveBtn = document.querySelector('.shopping_item_live');
     const progressStart = document.querySelector('.progress_start');
     const progressEnd = document.querySelector('.progress_end');
     const progressBar = document.querySelector('#progress');
     const tabLargeButtons = document.querySelectorAll(
          '.guide_tab_left_content_btn_1'
     );
     const labelBtn = document.querySelectorAll('.icon_tab_state');

     let currentTab = 0;
     let checkedTabs = [];
     const IS_LOADING = 1000;
     progressEnd.textContent = labelButtons.length;

     // update progress state
     function executeProgress() {
          // update number completed
          progressStart.textContent = checkedTabs.length;

          // update progress bar
          const percentageWidth = Math.min(checkedTabs.length * 20, 100);

          progressBar.style.width = `${percentageWidth}%`;
     }

     // For opening tab after a certain action
     function openTab(tab) {
          const nextTab = document.querySelector(`[data-tab="${tab}"]`);
          const nextLabel = document.querySelector(`[data-label="${tab}"]`);

          // remove hidden class on tab & add hidden class to label
          addState(nextLabel, HIDDEN_STATE);
          removeState(nextTab, HIDDEN_STATE);
     }
     // By default, it opens the first tab
     openTab(currentTab);

     // For closing tab after a certain action
     function closeTab(tab) {
          const previousTab = document.querySelector(`[data-tab="${tab}"]`);
          const previousLabel = document.querySelector(`[data-label="${tab}"]`);

          // remove hidden class on tab & add hidden class to label
          addState(previousTab, HIDDEN_STATE);
          removeState(previousLabel, HIDDEN_STATE);
     }

     // open clicked tab and close previous one
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
     labelButtons.forEach((btn) => {
          btn.addEventListener('click', handleLabelClickedOpen);
     });

     // mouse over and mouse leave of label buttons
     function handleMouseEnterLabelButton(e) {
          const tempBtn = e.target.querySelector('.open_hover');
          const staticBtn = e.target.querySelector('.open_dash');
          const hoverBtn = e.target.querySelector('.open_hover');
          const markBtn = e.target.querySelector('.open_mark');

          if (!markBtn.classList.contains(HIDDEN_STATE)) {
               addState(hoverBtn, HIDDEN_STATE);
               return;
          }

          removeState(tempBtn, HIDDEN_STATE);
          addState(staticBtn, HIDDEN_STATE);
     }

     function handleMouseLeaveLabelButton(e) {
          const tempBtn = e.target.querySelector('.open_hover');
          const staticBtn = e.target.querySelector('.open_dash');
          const rotateBtn = e.target.querySelector('.open_rotate');
          const markBtn = e.target.querySelector('.open_mark');

          if (!rotateBtn.classList.contains(HIDDEN_STATE)) {
               addState(staticBtn, HIDDEN_STATE);
               return;
          }

          if (!markBtn.classList.contains(HIDDEN_STATE)) {
               addState(staticBtn, HIDDEN_STATE);
               return;
          }

          addState(tempBtn, HIDDEN_STATE);
          removeState(staticBtn, HIDDEN_STATE);
     }
     labelBtn.forEach((btn) => {
          btn.addEventListener('mouseenter', handleMouseEnterLabelButton);
          btn.addEventListener('mouseleave', handleMouseLeaveLabelButton);
     });

     // mouse over and mouse leave of contain buttons
     function handleMouseEnterBoxButton(e) {
          const tempBtn = e.target.querySelector('.container_hover');
          const staticBtn = e.target.querySelector('.container_dash');
          const markBtn = e.target.querySelector('.container_mark');

          if (!markBtn.classList.contains(HIDDEN_STATE)) {
               addState(staticBtn, HIDDEN_STATE);
               return;
          }

          removeState(tempBtn, HIDDEN_STATE);
          addState(staticBtn, HIDDEN_STATE);
     }
     function handleMouseLeaveBoxButton(e) {
          const tempBtn = e.target.querySelector('.container_hover');
          const staticBtn = e.target.querySelector('.container_dash');
          const rotateBtn = e.target.querySelector('.container_rotate');
          const markBtn = e.target.querySelector('.container_mark');

          if (!rotateBtn.classList.contains(HIDDEN_STATE)) {
               addState(staticBtn, HIDDEN_STATE);
               return;
          }

          if (!markBtn.classList.contains(HIDDEN_STATE)) {
               addState(staticBtn, HIDDEN_STATE);
               return;
          }

          addState(tempBtn, HIDDEN_STATE);
          removeState(staticBtn, HIDDEN_STATE);
     }
     markAsDoneContainerButton.forEach((btn) => {
          btn.addEventListener('mouseenter', handleMouseEnterBoxButton);
          btn.addEventListener('mouseleave', handleMouseLeaveBoxButton);
     });

     // mark label as completed & mark label as not completed
     function handleMarkLabel(btn) {
          const dash_icon = btn.querySelector('.open_dash');
          const mark_icon = btn.querySelector('.open_mark');
          const hover_icon = btn.querySelector('.open_hover');
          const blink_icon = btn.querySelector('.open_blink');
          const rotate_icon = btn.querySelector('.open_rotate');

          const itemCompleted = btn.closest('.guide_list_cta').dataset.label;
          const container = document.querySelector(
               `[data-tab="${itemCompleted}"]`
          );
          const container_dash = container.querySelector('.container_dash');
          const container_mark = container.querySelector('.container_mark');

          // hidden all button except rotate btn first, in other to play save
          addState(dash_icon, HIDDEN_STATE);
          addState(mark_icon, HIDDEN_STATE);
          addState(hover_icon, HIDDEN_STATE);
          addState(blink_icon, HIDDEN_STATE);

          removeState(rotate_icon, HIDDEN_STATE);
          addState(rotate_icon, 'rotate');

          setTimeout(() => {
               addState(rotate_icon, HIDDEN_STATE);

               // update
               removeState(mark_icon, HIDDEN_STATE);
               addState(mark_icon, 'completed');

               // update container buttons
               addState(container_dash, HIDDEN_STATE);
               removeState(container_mark, HIDDEN_STATE);

               checkedTabs.push(itemCompleted);

               closeTab(currentTab);

               currentTab = Number(itemCompleted);

               openTab(itemCompleted);

               // update progress
               executeProgress();
          }, IS_LOADING);
     }
     function handleUnMarkLabel(btn) {
          const dash_icon = btn.querySelector('.open_dash');
          const mark_icon = btn.querySelector('.open_mark');
          const hover_icon = btn.querySelector('.open_hover');
          const blink_icon = btn.querySelector('.open_blink');
          const rotate_icon = btn.querySelector('.open_rotate');

          const itemCompleted = btn.closest('.guide_list_cta').dataset.label;
          const container = document.querySelector(
               `[data-tab="${itemCompleted}"]`
          );
          const container_dash = container.querySelector('.container_dash');
          const container_mark = container.querySelector('.container_mark');

          // hidden all button except rotate btn first, in other to play save
          addState(dash_icon, HIDDEN_STATE);
          addState(hover_icon, HIDDEN_STATE);
          addState(blink_icon, HIDDEN_STATE);
          addState(mark_icon, HIDDEN_STATE);

          removeState(rotate_icon, HIDDEN_STATE);
          addState(rotate_icon, 'rotate');

          setTimeout(() => {
               // hidden rotate btn
               addState(rotate_icon, HIDDEN_STATE);

               // remove dash icon hidden
               removeState(dash_icon, HIDDEN_STATE);

               // update container buttons
               removeState(container_dash, HIDDEN_STATE);
               addState(container_mark, HIDDEN_STATE);

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

     labelBtn.forEach((btn) => {
          btn.addEventListener('click', function (e) {
               if (
                    !btn
                         .querySelector('.open_mark')
                         .classList.contains(HIDDEN_STATE)
               ) {
                    return handleUnMarkLabel(btn);
               }

               handleMarkLabel(btn);
          });
     });

     // mark container as completed & mark container as not completed
     function handleMarkAsNotDone(btn, itemCompleted) {
          const dash_icon = btn.querySelector('.container_dash');
          const mark_icon = btn.querySelector('.container_mark');
          const hover_icon = btn.querySelector('.container_hover');
          const rotate_icon = btn.querySelector('.container_rotate');

          const label = document.querySelector(
               `[data-label="${itemCompleted}"]`
          );
          const label_dash = label.querySelector('.open_dash');
          const label_mark = label.querySelector('.open_mark');

          // hidden all button except rotate btn first, in other to play save
          addState(mark_icon, HIDDEN_STATE);
          addState(dash_icon, HIDDEN_STATE);
          addState(hover_icon, HIDDEN_STATE);
          removeState(rotate_icon, HIDDEN_STATE);
          addState(rotate_icon, 'rotate');

          // screen reader
          document.querySelector('.shopping_item_live').ariaLabel =
               'Loading. Please wait...';

          setTimeout(() => {
               // screen reader
               btn.ariaLabel = btn.ariaLabel.replace('as not done', 'as done');

               document.querySelector('.shopping_item_live').ariaLabel =
                    'unmark successful..';

               addState(rotate_icon, HIDDEN_STATE);

               removeState(dash_icon, HIDDEN_STATE);

               // update
               removeState(label_dash, HIDDEN_STATE);
               addState(label_mark, HIDDEN_STATE);

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

     function handleMarkAsDone(btn, itemCompleted) {
          const dash_icon = btn.querySelector('.container_dash');
          const hover_icon = btn.querySelector('.container_hover');
          const mark_icon = btn.querySelector('.container_mark');
          const blink_icon = btn.querySelector('.container_blink');
          const rotate_icon = btn.querySelector('.container_rotate');

          const label = document.querySelector(
               `[data-label="${itemCompleted}"]`
          );
          const open_dash = label.querySelector('.open_dash');
          const open_mark = label.querySelector('.open_mark');
          const open_hover = label.querySelector('.open_hover');

          addState(blink_icon, HIDDEN_STATE);
          addState(hover_icon, HIDDEN_STATE);
          addState(dash_icon, HIDDEN_STATE);
          addState(mark_icon, HIDDEN_STATE);

          removeState(rotate_icon, HIDDEN_STATE);
          addState(rotate_icon, 'rotate');

          // screen reader
          checkLiveBtn.ariaLabel = 'Loading. Please wait...';

          setTimeout(() => {
               addState(rotate_icon, HIDDEN_STATE);
               addState(open_hover, HIDDEN_STATE);
               addState(open_dash, HIDDEN_STATE);

               removeState(open_mark, HIDDEN_STATE);
               addState(mark_icon, 'completed');

               // screen reader
               btn.ariaLabel = btn.ariaLabel.replace('as done', 'as not done');

               checkLiveBtn.ariaLabel = 'Marked successful..';

               // update
               removeState(mark_icon, HIDDEN_STATE);

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

                    // update progress
                    executeProgress();
               }, 500);
          }, IS_LOADING);

          // select next tab button and focus it
          setTimeout(() => {
               const nextTabBtn = document
                    .querySelector(`[data-tab="${currentTab}"]`)
                    .querySelector('.mark_done');

               if (nextTabBtn) {
                    nextTabBtn.focus();
               } else {
                    console.error('Next tab button not found');
               }
          }, 1100);
     }

     markAsDoneContainerButton.forEach((btn) => {
          btn.addEventListener('click', function () {
               const itemCompleted = btn.closest('.guide_list_tab').dataset.tab;
               const btnState = btn
                    .querySelector('.container_mark')
                    .classList.contains('hidden');

               if (btnState) {
                    handleMarkAsDone(btn, itemCompleted);
                    return;
               }

               handleMarkAsNotDone(btn, itemCompleted);
          });
     });

     // events states of brown background buttons
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
     tabLargeButtons.forEach((btn) =>
          btn.addEventListener('blur', function (e) {
               removeState(e.target, 'large_button_focus');
          })
     );
};

app();
