  window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                document.getElementById('app-preloader').classList.add('hide');
                document.body.classList.remove('preload'); 
            }, 1200); 

            initializeApp();
        });

        // --- DOM Elements ---
        const chatContainer = document.getElementById('chatContainer');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const inputArea = document.getElementById('inputArea');
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatFadeMaskBottom = document.getElementById('chatFadeMaskBottom');
        const chatFadeMaskTop = document.getElementById('chatFadeMaskTop');
        const emojiBtn = document.getElementById('emojiBtn');
        const emojiPicker = document.getElementById('emojiPicker');
        const typingIndicator = document.getElementById('typingIndicator');
        const body = document.body;
        const historyList = document.getElementById('historyList');
        const newChatBtn = document.getElementById('newChatBtn');
        const currentChatTitle = document.getElementById('currentChatTitle');
        const chatHeaderInfo = document.getElementById('chatHeaderInfo'); 
        const sidebar = document.getElementById('sidebar');
        const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
        const sidebarLogoArea = document.getElementById('sidebarLogoArea');
        const historyFadeTop = document.getElementById('historyFadeTop');
        const mobileButterflyTrigger = document.getElementById('mobileButterflyTrigger');
        const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');

        // Incognito Elements
        const incognitoBtn = document.getElementById('incognitoBtn');
        const incognitoMenu = document.getElementById('incognitoMenu');
        const tempMsgCheckbox = document.getElementById('tempMsgCheckbox');
        const optPrivateChat = document.getElementById('optPrivateChat');

        // Settings Elements
        const settingsModal = document.getElementById('settingsModal');
        const closeSettings = document.getElementById('closeSettings');
        const themeToggleCheckbox = document.getElementById('themeToggleCheckbox');
        const userProfileCard = document.getElementById('userProfileCard');
        const sidebarAvatar = document.getElementById('sidebarAvatar');
        const sidebarName = document.getElementById('sidebarName');
        const sidebarEmail = document.getElementById('sidebarEmail');
        const settingsAvatarPreview = document.getElementById('settingsAvatarPreview');
        const avatarInput = document.getElementById('avatarInput');
        const editName = document.getElementById('editName');
        const editEmail = document.getElementById('editEmail');
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        const donateBtn = document.querySelector('.donate-btn');

        // Model Selector Elements
        const modelSelectorWrapper = document.getElementById('modelSelectorWrapper');
        const selectedModelBtn = document.getElementById('selectedModelBtn');
        const selectedModelName = document.getElementById('selectedModelName');
        const modelDropdown = document.getElementById('modelDropdown');

        // Dialog & Toast
        const customDialog = document.getElementById('customDialog');
        const dialogTitle = document.getElementById('dialogTitle');
        const dialogMessage = document.getElementById('dialogMessage');
        const dialogInput = document.getElementById('dialogInput');
        const dialogCancelBtn = document.getElementById('dialogCancelBtn');
        const dialogConfirmBtn = document.getElementById('dialogConfirmBtn');
        let confirmCallback = null; 
        const copyToast = document.getElementById('copyToast');
        let toastTimeout = null;
        const customContextMenu = document.getElementById('customContextMenu');
        const contextRenameBtn = document.getElementById('contextRename');
        const contextDeleteBtn = document.getElementById('contextDelete');
        let contextMenuTargetId = null;

        // --- AI MODEL DATA ---
        const modelRegistry = {
            "default": "marju",
            "models": [
                { "id": "marju", "type": "local" },
                { "id": "marjuni", "type": "local" }
            ]
        };

        const modelInfo = {
            "marju": {
                "name": "Marju 🦋",
                "description": "Cute, emotional, kid-like assistant.",
            },
            "marjuni": {
                "name": "Marjuni ✨",
                "description": "Mature, calm, and knowledgeable.",
            }
        };

        // --- STATE VARIABLES ---
        let currentModelId = modelRegistry.default;
        let isTempMessage = false;   
        let isPrivateChatMode = false; 
        const defaultAvatar = "https://ui-avatars.com/api/?name=Guest&background=FF8DA1&color=fff";
        let userProfile = { name: "Guest User", email: "user@marju", avatar: defaultAvatar };

        // --- PROFILE LOGIC ---
        function loadUserProfile() {
            const savedProfile = localStorage.getItem('marju-profile');
            if(savedProfile) userProfile = JSON.parse(savedProfile);
            renderSidebarProfile();
        }
        function renderSidebarProfile() {
            if(!isPrivateChatMode) {
                sidebarName.textContent = userProfile.name;
                sidebarEmail.textContent = userProfile.email;
                sidebarAvatar.src = userProfile.avatar || defaultAvatar;
                userProfileCard.classList.remove('locked');
            }
        }
        function openSettingsWithProfile(e) {
            if (e.target.closest('.donate-btn')) return;
            if(isPrivateChatMode) {
                showToast("Profile locked in Private Mode 🔒");
                return;
            }
            editName.value = userProfile.name;
            editEmail.value = userProfile.email;
            settingsAvatarPreview.src = userProfile.avatar || defaultAvatar;
            settingsModal.classList.add('show-modal');
        }

        avatarInput.addEventListener('change', function() {
            if(this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) { settingsAvatarPreview.src = e.target.result; }
                reader.readAsDataURL(this.files[0]);
            }
        });
        saveProfileBtn.addEventListener('click', () => {
            userProfile.name = editName.value.trim() || "Guest User";
            userProfile.email = editEmail.value.trim() || "No Email";
            userProfile.avatar = settingsAvatarPreview.src;
            localStorage.setItem('marju-profile', JSON.stringify(userProfile));
            renderSidebarProfile();
            showToast("Profile Saved!");
            settingsModal.classList.remove('show-modal');
        });
        function showToast(msg) {
             if (toastTimeout) clearTimeout(toastTimeout);
            copyToast.innerHTML = `${msg}`;
            copyToast.classList.add('show');
            toastTimeout = setTimeout(() => {
                copyToast.classList.remove('show');
                setTimeout(() => copyToast.innerHTML = `Copied! <i class="bi bi-check-lg"></i>`, 300);
            }, 3000);
        }

        const savedSidebarState = localStorage.getItem('marju-sidebar-collapsed');
        if (savedSidebarState === 'true' && window.innerWidth > 768) sidebar.classList.add('collapsed');

        function handleModelSelectorPlacement() {
            const topBarCenter = document.querySelector('.top-bar-center');
            const mobileContainer = document.getElementById('mobileModelSelectorContainer');

            if (window.innerWidth <= 992) {
                if (modelSelectorWrapper.parentElement !== mobileContainer) {
                    mobileContainer.appendChild(modelSelectorWrapper);
                }
            } else {
                if (modelSelectorWrapper.parentElement !== topBarCenter) {
                    topBarCenter.appendChild(modelSelectorWrapper);
                }
            }
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('collapsed');
            } else {
                if(localStorage.getItem('marju-sidebar-collapsed') === 'true') {
                    sidebar.classList.add('collapsed');
                }
            }
            handleModelSelectorPlacement();
        });

        toggleSidebarBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('marju-sidebar-collapsed', sidebar.classList.contains('collapsed'));
        });
        sidebarLogoArea.addEventListener('click', () => {
            if(window.innerWidth > 768 && sidebar.classList.contains('collapsed')) {
                sidebar.classList.remove('collapsed'); localStorage.setItem('marju-sidebar-collapsed', 'false');
            }
        });
        mobileButterflyTrigger.addEventListener('click', (e) => { e.stopPropagation(); sidebar.classList.add('active'); mobileSidebarOverlay.classList.add('active'); });
        mobileSidebarOverlay.addEventListener('click', () => { sidebar.classList.remove('active'); mobileSidebarOverlay.classList.remove('active'); });
        function closeMobileSidebar() { if(window.innerWidth <= 768) { sidebar.classList.remove('active'); mobileSidebarOverlay.classList.remove('active'); } }

        const welcomeOptions = ["What’s on the agenda today?", "Spill the tea! ☕", "Ready when you are! ✨", "Let's make magic happen! 🔮", "Talk to me, bestie! 💅"];
        function setRandomWelcome() {
            const msg = welcomeOptions[Math.floor(Math.random() * welcomeOptions.length)];
            const titleEl = welcomeScreen.querySelector('h1'); if(titleEl) titleEl.textContent = msg;
        }
        const savedTheme = localStorage.getItem('marju-theme');
        if (savedTheme === 'dark') { body.classList.add('dark-mode'); themeToggleCheckbox.checked = true; } 
        else { body.classList.remove('dark-mode'); themeToggleCheckbox.checked = false; }

        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('marju-chats')) || []; } catch(e) { chats = []; }
        if(chats.length === 0) chats.push({ id: Date.now(), title: 'New Chat', active: true, messages: [] });

        function saveChats() { if(isPrivateChatMode) return; localStorage.setItem('marju-chats', JSON.stringify(chats)); }

        function updateInterfaceState(hasMessages) {
            if (hasMessages) {
                inputArea.classList.remove('centered');
                welcomeScreen.style.display = 'none'; welcomeScreen.classList.remove('animate');
                chatContainer.style.display = 'flex'; chatFadeMaskBottom.style.display = 'block';
                chatHeaderInfo.style.opacity = '1'; chatFadeMaskTop.style.opacity = '0';
            } else {
                inputArea.classList.add('centered');
                welcomeScreen.style.display = 'block'; 
                void welcomeScreen.offsetWidth;
                welcomeScreen.classList.add('animate');
                chatContainer.style.display = 'none'; chatFadeMaskBottom.style.display = 'none'; chatFadeMaskTop.style.display = 'none';
                setRandomWelcome(); chatHeaderInfo.style.opacity = '0';
            }
        }

        function updateScrollMasks() { chatFadeMaskTop.style.opacity = chatContainer.scrollTop > 20 ? '1' : '0'; }
        chatContainer.addEventListener('scroll', updateScrollMasks);

        incognitoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPrivateChatMode) showDialog("Exit Private Mode?", "You will lose all temporary messages from this session.", false, () => createNewChat(), false);
            else incognitoMenu.classList.toggle('show');
        });
        tempMsgCheckbox.addEventListener('change', (e) => {
            isTempMessage = e.target.checked;
            renderMessage(isTempMessage ? "<i>Temporary Message Mode ON.</i>" : "<i>Temporary Message Mode OFF.</i>", 'bot');
        });
        document.getElementById('optTempMsgItem').addEventListener('click', (e) => e.stopPropagation());
        optPrivateChat.addEventListener('click', () => { incognitoMenu.classList.remove('show'); startPrivateChat(); });

        function startPrivateChat() {
            isPrivateChatMode = true; isTempMessage = false; tempMsgCheckbox.checked = false;
            body.classList.add('incognito-mode');
            incognitoBtn.innerHTML = '<i class="bi bi-box-arrow-right"></i>';
            incognitoBtn.classList.add('exit-mode'); incognitoBtn.title = "Exit Private Chat";
            clearChatContainer(); updateInterfaceState(false); 
            currentChatTitle.textContent = "Anonymous Chat";
            closeMobileSidebar();

            userProfileCard.classList.add('locked');
            sidebarName.textContent = "Anonymous";
            sidebarEmail.textContent = "Data not saved";
            sidebarAvatar.src = userProfile.avatar || defaultAvatar;
            
            newChatBtn.innerHTML = '<i class="bi bi-eye-slash"></i> Anonymous Reset';
            showToast("Entered Private Mode");

            if(window.innerWidth > 768) sidebar.classList.add('collapsed');
        }

        function exitPrivateChat() {
            isPrivateChatMode = false;
            body.classList.remove('incognito-mode');
            incognitoBtn.innerHTML = '<i class="bi bi-incognito"></i>';
            incognitoBtn.classList.remove('exit-mode'); incognitoBtn.title = "Private Options";
            renderSidebarProfile();
            newChatBtn.innerHTML = '<i class="bi bi-plus-lg"></i> New Chat';
        }

        function closeDialog() { customDialog.classList.remove('show-modal'); dialogInput.value = ''; dialogInput.style.display = 'none'; }
        function showDialog(title, message, isInput, onConfirm, isDanger = false) {
            dialogTitle.textContent = title; dialogMessage.textContent = message;
            dialogMessage.style.display = isInput ? 'none' : 'block'; dialogInput.style.display = isInput ? 'block' : 'none';
            if(isDanger) { dialogConfirmBtn.classList.remove('primary'); dialogConfirmBtn.classList.add('danger'); dialogConfirmBtn.textContent = "Delete/Clear"; } 
            else { dialogConfirmBtn.classList.remove('danger'); dialogConfirmBtn.classList.add('primary'); dialogConfirmBtn.textContent = title.includes("Exit") ? "Exit" : "Confirm"; }
            confirmCallback = () => { if(isInput) onConfirm(dialogInput.value); else onConfirm(); closeDialog(); };
            customDialog.classList.add('show-modal'); if(isInput) setTimeout(() => dialogInput.focus(), 100);
        }
        dialogCancelBtn.addEventListener('click', closeDialog);
        dialogConfirmBtn.addEventListener('click', () => { if(confirmCallback) confirmCallback(); });
        dialogInput.addEventListener('keypress', (e) => { if(e.key === 'Enter' && confirmCallback) confirmCallback(); });
        
        function setupModalOutsideClick(modal, closeAction) {
            let isMouseDownOnOverlay = false;
            modal.addEventListener('mousedown', (e) => {
                if (e.target === modal) isMouseDownOnOverlay = true;
                else isMouseDownOnOverlay = false;
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal && isMouseDownOnOverlay) closeAction();
                isMouseDownOnOverlay = false;
            });
        }
        setupModalOutsideClick(settingsModal, () => settingsModal.classList.remove('show-modal'));
        setupModalOutsideClick(customDialog, () => closeDialog());

        const emojis = ['😀', '😂', '🥰', '😍', '😭', '🥺', '😎', '✨', '🔥', '❤️', '👍', '🦋', '💅', '🎉', '💩', '👻', '👀', '💀', '👽', '🤖', '🙈', '🙌', '💯', '🌟'];
        emojis.forEach(emoji => {
            const span = document.createElement('span'); span.textContent = emoji; span.className = 'emoji-item';
            span.onclick = () => { userInput.value += emoji; userInput.focus(); }; emojiPicker.appendChild(span);
        });
        emojiBtn.addEventListener('click', (e) => { e.stopPropagation(); emojiPicker.classList.toggle('show'); });

        function renderMessage(text, sender, isTyping = false) {
            const msgDiv = document.createElement('div'); 
            msgDiv.classList.add('message', sender);
            if(isTempMessage) msgDiv.classList.add('temp');
            
            let menuItems = '';
            
            if (sender === 'user') {
                menuItems = `
                    <div class="msg-menu-item" onclick="handleMsgAction(this, 'edit')"><i class="bi bi-pencil"></i> Edit</div>
                    <div class="msg-menu-item" onclick="handleMsgAction(this, 'copy')"><i class="bi bi-clipboard"></i> Copy</div>
                    <div class="msg-menu-item delete" onclick="handleMsgAction(this, 'delete')"><i class="bi bi-trash"></i> Delete</div>
                `;
            } else {
                menuItems = `
                    <div class="msg-menu-item" onclick="handleMsgAction(this, 'copy')"><i class="bi bi-clipboard"></i> Copy</div>
                    <div class="msg-menu-item" onclick="handleMsgAction(this, 'regenerate')"><i class="bi bi-arrow-clockwise"></i> Regenerate</div>
                    <div class="msg-menu-item delete" onclick="handleMsgAction(this, 'delete')"><i class="bi bi-trash"></i> Delete</div>
                `;
            }

            msgDiv.innerHTML = `
                <div class="msg-content-wrapper">
                    <div class="msg-bubble">${text}</div>
                    <div class="msg-action-btn" onclick="toggleMsgMenu(this, event)">
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                    <div class="msg-menu">${menuItems}</div>
                </div>
            `;
            
            const bubble = msgDiv.querySelector('.msg-bubble');
            addLongPressHandler(bubble, (e) => {
                const btn = msgDiv.querySelector('.msg-action-btn');
                toggleMsgMenu(btn, e);
            });

            chatContainer.insertBefore(msgDiv, typingIndicator);
            
            setTimeout(() => { 
                chatContainer.scrollTop = chatContainer.scrollHeight; 
                updateScrollMasks(); 
            }, 10);
            
            return msgDiv;
        }

        function addLongPressHandler(element, callback) {
            let timer;
            const longPressDuration = 500; 

            element.addEventListener('touchstart', (e) => {
                timer = setTimeout(() => {
                    if (navigator.vibrate) navigator.vibrate(50);
                    callback(e);
                }, longPressDuration);
            }, { passive: true });

            const clearTimer = () => clearTimeout(timer);
            element.addEventListener('touchend', clearTimer);
            element.addEventListener('touchmove', clearTimer);
            element.addEventListener('contextmenu', (e) => e.preventDefault());
        }

        window.toggleMsgMenu = function(btn, e) {
            if(e) e.stopPropagation();
            document.querySelectorAll('.msg-menu.show').forEach(m => m.classList.remove('show'));
            const menu = btn.nextElementSibling;
            if (window.innerWidth <= 768) {
               menu.style.position = 'absolute'; menu.style.zIndex = '200';
            }
            menu.classList.toggle('show');
        }

        window.handleMsgAction = function(item, action) {
            const menu = item.parentElement;
            const messageDiv = menu.closest('.message');
            const bubble = messageDiv.querySelector('.msg-bubble');
            const text = bubble.innerText;
            
            menu.classList.remove('show');

            if (action === 'copy') {
                navigator.clipboard.writeText(text).then(() => showToast("Message Copied!"));
            }
            else if (action === 'delete') {
                deleteMessageFromState(messageDiv);
                messageDiv.remove();
                if(chatContainer.querySelectorAll('.message').length === 0) updateInterfaceState(false);
            }
            else if (action === 'edit') {
                enableEditMode(messageDiv, bubble, text);
            }
            else if (action === 'regenerate') {
                regenerateResponse(messageDiv);
            }
        }

        function enableEditMode(messageDiv, bubble, oldText) {
            bubble.style.display = 'none';
            messageDiv.querySelector('.msg-action-btn').style.display = 'none';
            const editWrapper = document.createElement('div');
            editWrapper.className = 'edit-wrapper';
            editWrapper.innerHTML = `
                <textarea class="edit-textarea" rows="3">${oldText}</textarea>
                <div class="edit-actions">
                    <button class="edit-btn-cancel">Cancel</button>
                    <button class="edit-btn-save">Save</button>
                </div>
            `;
            bubble.parentElement.insertBefore(editWrapper, bubble);
            const textarea = editWrapper.querySelector('textarea');
            textarea.focus();
            editWrapper.querySelector('.edit-btn-save').onclick = () => {
                const newText = textarea.value.trim();
                if(newText) {
                    bubble.innerText = newText;
                    updateMessageInState(messageDiv, newText);
                }
                cleanup();
            };
            editWrapper.querySelector('.edit-btn-cancel').onclick = cleanup;
            function cleanup() {
                bubble.style.display = 'block';
                messageDiv.querySelector('.msg-action-btn').style.display = 'block';
                editWrapper.remove();
            }
        }

        function getMessageIndex(messageDiv) {
            const messages = Array.from(chatContainer.querySelectorAll('.message:not(.temp)'));
            return messages.indexOf(messageDiv);
        }

        function deleteMessageFromState(messageDiv) {
            if(isPrivateChatMode || isTempMessage) return;
            const idx = getMessageIndex(messageDiv);
            const activeChat = chats.find(c => c.active);
            if(activeChat && idx !== -1) {
                activeChat.messages.splice(idx, 1);
                saveChats();
            }
        }

        function updateMessageInState(messageDiv, newText) {
            if(isPrivateChatMode || isTempMessage) return;
            const idx = getMessageIndex(messageDiv);
            const activeChat = chats.find(c => c.active);
            if(activeChat && idx !== -1) {
                activeChat.messages[idx].text = newText;
                saveChats();
            }
        }

        function regenerateResponse(botMessageDiv) {
            let prevSibling = botMessageDiv.previousElementSibling;
            while(prevSibling && !prevSibling.classList.contains('message')) {
                prevSibling = prevSibling.previousElementSibling;
            }
            
            if (!prevSibling || !prevSibling.classList.contains('user')) {
                showToast("Cannot regenerate: No prompt found.");
                return;
            }

            const promptText = prevSibling.querySelector('.msg-bubble').innerText;
            deleteMessageFromState(botMessageDiv);
            botMessageDiv.remove();
            typingIndicator.style.display = 'flex'; 
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            setTimeout(() => {
                const response = generateResponse(promptText); 
                typingIndicator.style.display = 'none'; 
                renderMessage(response, 'bot'); 
                addMessageToState(response, 'bot');
            }, 1500);
        }

        function clearChatContainer() {
            const msgs = chatContainer.querySelectorAll('.message');
            msgs.forEach(m => m.remove());
            typingIndicator.style.display = 'none';
        }
        
        document.addEventListener('click', (e) => {
            if (!customContextMenu.contains(e.target)) customContextMenu.classList.remove('show');
            if (!emojiPicker.contains(e.target) && !emojiBtn.contains(e.target)) emojiPicker.classList.remove('show');
            if (!incognitoMenu.contains(e.target) && !incognitoBtn.contains(e.target)) incognitoMenu.classList.remove('show');
            if (!modelDropdown.contains(e.target) && !selectedModelBtn.contains(e.target)) {
                 modelDropdown.classList.remove('show');
                 modelSelectorWrapper.classList.remove('open');
            }
            if(!e.target.closest('.msg-action-btn') && !e.target.closest('.msg-menu')) {
                document.querySelectorAll('.msg-menu.show').forEach(m => m.classList.remove('show'));
            }
        });

        historyList.addEventListener('scroll', () => { historyFadeTop.style.opacity = historyList.scrollTop > 10 ? '1' : '0'; });
        
        function renderHistory() {
            historyList.innerHTML = ''; 
            chats.forEach(chat => {
                const item = document.createElement('div'); 
                item.className = `history-item ${chat.active ? 'active' : ''}`; 
                item.dataset.id = chat.id;
                
                item.onclick = (e) => {
                    if(e.target.closest('.history-options-btn')) return;

                    if (isPrivateChatMode) {
                        showDialog("Exit Private Mode?", "You will lose all temporary messages from this session.", false, () => {
                            setActiveChat(parseInt(chat.id));
                        }, false);
                    } else {
                        setActiveChat(parseInt(chat.id));
                    }
                    closeMobileSidebar();
                };

                const titleSpan = document.createElement('span'); 
                titleSpan.className = 'chat-title-wrapper'; 
                titleSpan.textContent = chat.title;
                item.appendChild(titleSpan); 
                
                const dotsBtn = document.createElement('div');
                dotsBtn.className = 'history-options-btn';
                dotsBtn.innerHTML = '<i class="bi bi-three-dots"></i>';
                dotsBtn.onclick = (e) => openSidebarMenu(e, chat.id);
                item.appendChild(dotsBtn);

                historyList.appendChild(item);
            });
            if (historyList.scrollTop <= 10) historyFadeTop.style.opacity = '0';
        }

        function openSidebarMenu(e, chatId) {
            e.stopPropagation();
            contextMenuTargetId = chatId;
            const rect = e.target.getBoundingClientRect();
            let x = rect.left + 20;
            let y = rect.top + 10;
            if (x + 160 > window.innerWidth) x = rect.left - 140;
            if (y + 100 > window.innerHeight) y = rect.top - 80;

            customContextMenu.style.top = `${y}px`; 
            customContextMenu.style.left = `${x}px`; 
            customContextMenu.classList.add('show');
        }

        function setActiveChat(id) {
            exitPrivateChat(); 
            chats = chats.map(c => ({...c, active: c.id === id})); 
            saveChats(); 
            renderHistory(); 
            clearChatContainer();
            
            const currentChat = chats.find(c => c.id === id); 
            currentChatTitle.textContent = currentChat.title;
            
            if (currentChat.messages && currentChat.messages.length > 0) {
                updateInterfaceState(true); 
                currentChat.messages.forEach(msg => renderMessage(msg.text, msg.sender));
                setTimeout(updateScrollMasks, 50); 
            } else {
                updateInterfaceState(false);
            }
        }

        function renameChat(id) {
            const chat = chats.find(c => c.id === id); if (!chat) return; dialogInput.value = chat.title;
            showDialog("Rename Chat", "", true, (newName) => {
                if (newName && newName.trim() !== "") { chat.title = newName.trim(); saveChats(); renderHistory(); if(chat.active) currentChatTitle.textContent = chat.title; }
            });
        }
        function deleteChat(id) {
            showDialog("Delete Chat?", "Are you sure? 🥺", false, () => {
                chats = chats.filter(c => c.id !== id);
                if (chats.length === 0) { createNewChat(); return; }
                const activeExists = chats.find(c => c.active);
                if(!activeExists) { chats[0].active = true; setActiveChat(chats[0].id); } else { saveChats(); renderHistory(); }
            }, true);
        }
        
        function createNewChat() {
            exitPrivateChat(); 
            const existingEmptyChat = chats.find(c => c.title === 'New Chat' && c.messages.length === 0);
            if (existingEmptyChat) {
                setActiveChat(existingEmptyChat.id);
                closeMobileSidebar();
                return;
            }

            const newId = Date.now(); 
            chats.forEach(c => c.active = false); 
            chats.unshift({ id: newId, title: 'New Chat', active: true, messages: [] });
            
            saveChats(); 
            renderHistory(); 
            clearChatContainer(); 
            currentChatTitle.textContent = 'New Chat';
            isTempMessage = false; 
            tempMsgCheckbox.checked = false; 
            updateInterfaceState(false); 
            closeMobileSidebar();
        }
        
        function clearAllDataConfirm() {
            settingsModal.classList.remove('show-modal');
            showDialog("Factory Reset?", "This will wipe ALL chats, profile, and settings! 😱", false, () => { 
                localStorage.clear(); 
                location.reload(); 
            }, true);
        }

        newChatBtn.addEventListener('click', () => {
            if(isPrivateChatMode) {
                clearChatContainer();
                updateInterfaceState(false);
                showToast("Anonymous Chat Cleared");
            } else {
                createNewChat();
            }
        });

        userProfileCard.addEventListener('click', openSettingsWithProfile);
        closeSettings.addEventListener('click', () => settingsModal.classList.remove('show-modal'));
        donateBtn.addEventListener('click', (e) => e.stopPropagation());
        themeToggleCheckbox.addEventListener('change', (e) => {
            if(e.target.checked) { body.classList.add('dark-mode'); localStorage.setItem('marju-theme', 'dark'); } 
            else { body.classList.remove('dark-mode'); localStorage.setItem('marju-theme', 'light'); }
        });

        function populateModelDropdown() {
            modelDropdown.innerHTML = '';
            modelRegistry.models.forEach(model => {
                const info = modelInfo[model.id];
                if (!info) return;

                const option = document.createElement('div');
                option.className = 'model-option';
                option.dataset.id = model.id;
                if(model.id === currentModelId) option.classList.add('active');

                option.innerHTML = `
                    <span class="model-option-name">${info.name}</span>
                    <span class="model-option-desc">${info.description}</span>
                `;
                option.addEventListener('click', () => selectModel(model.id, info.name));
                modelDropdown.appendChild(option);
            });
        }

        function selectModel(modelId, modelName) {
            if (currentModelId === modelId) return;
            currentModelId = modelId;
            selectedModelName.textContent = modelName.replace(/🦋|✨|☁️/g, '').trim();
            
            document.querySelectorAll('.model-option').forEach(opt => opt.classList.toggle('active', opt.dataset.id === modelId));

            modelDropdown.classList.remove('show');
            modelSelectorWrapper.classList.remove('open');
            showToast(`Model switched to ${modelName}`);
        }

        selectedModelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modelDropdown.classList.toggle('show');
            modelSelectorWrapper.classList.toggle('open');
        });

        // --- UPDATED RESPONSE LOGIC TO USE EXTERNAL FILES ---
        const generateResponse = (input) => {
            if (currentModelId === 'marjuni') {
                if (typeof getMarjuniResponse === 'function') {
                    return getMarjuniResponse(input);
                } else {
                    return "Error: Marjuni logic not loaded properly.";
                }
            } else {
                // Default to Marju
                if (typeof getMarjuResponse === 'function') {
                    return getMarjuResponse(input);
                } else {
                     return "Error: Marju logic not loaded properly.";
                }
            }
        };

        const addMessageToState = (text, sender) => {
            if(isPrivateChatMode || isTempMessage) return;
            const activeChat = chats.find(c => c.active);
            if(activeChat) { if(!activeChat.messages) activeChat.messages = []; activeChat.messages.push({ text, sender }); saveChats(); }
        }
        const handleSend = () => {
            const text = userInput.value.trim(); if (!text) return;
            const activeChat = chats.find(c => c.active);
            if(activeChat && activeChat.title === 'New Chat' && !isPrivateChatMode && !isTempMessage) {
                let newTitle = text.substring(0, 20); if (text.length > 20) newTitle += '...';
                activeChat.title = newTitle; saveChats(); renderHistory(); currentChatTitle.textContent = newTitle;
            }
            updateInterfaceState(true); renderMessage(text, 'user'); addMessageToState(text, 'user'); userInput.value = '';
            typingIndicator.style.display = 'flex'; chatContainer.scrollTop = chatContainer.scrollHeight;
            setTimeout(() => {
                const response = generateResponse(text); typingIndicator.style.display = 'none'; 
                renderMessage(response, 'bot'); addMessageToState(response, 'bot');
            }, 1500);
        };
        sendBtn.addEventListener('click', handleSend);
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

        contextRenameBtn.addEventListener('click', () => { if (contextMenuTargetId) { renameChat(parseInt(contextMenuTargetId)); customContextMenu.classList.remove('show'); } });
        contextDeleteBtn.addEventListener('click', () => { if (contextMenuTargetId) { deleteChat(parseInt(contextMenuTargetId)); customContextMenu.classList.remove('show'); } });

        function initializeApp() {
            loadUserProfile();
            handleModelSelectorPlacement();

            const initialModel = modelInfo[currentModelId];
            if (initialModel) selectedModelName.textContent = initialModel.name.replace(/🦋|✨|☁️/g, '').trim();
            populateModelDropdown();

            const initChat = chats.find(c => c.active); 
            if(initChat) setActiveChat(initChat.id); 
            else createNewChat();

            setRandomWelcome();
        }