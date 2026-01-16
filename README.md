Here is a professional, formatted GitHub `README.md` based on the content you provided. You can copy and paste this directly into your repository.

***

```markdown
<div align="center">

# Marju

### Your Dual-Core AI Companion. Running 100% Offline.

**No servers. No data leaks. Just you and your AI.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Privacy](https://img.shields.io/badge/Privacy-Local_Only-green.svg)](#)
[![Status](https://img.shields.io/badge/Status-Active-blue.svg)](#)

</div>

---

## 📖 About The Project

**Marju** is a browser-native AI companion built on a 'Local-First' philosophy. Unlike typical cloud tools, Marju operates entirely within your browser using lightweight JavaScript logic. There are no Python servers to configure, no Docker containers to spin up, and absolutely no hidden uplinks to remote databases.

Switch instantly between two distinct personas:
1.  **Marju:** Your cute, emotional support companion.
2.  **Marjuni:** A ruthless, stoic, logic-driven engine.

## ✨ Key Features

### 🖥️ Browser Native
No complex installation required. Marju runs entirely within your browser using optimized ES6 JavaScript.

### 🎭 Adaptive Personality
*   **Feeling down?** Chat with **Marju** for gentle encouragement and emotional support.
*   **Need optimization?** Switch to **Marjuni** for brutal honesty and logical architectural patterns.

### 🔒 Total Privacy
Your chats never leave your device.
*   **Standard Mode:** Data is saved in `LocalStorage`.
*   **Volatile Mode:** Use Incognito Mode for a RAM-only session. The moment you close the tab, the Garbage Collector wipes all session references.

---

## 🛠️ Under The Hood

Marju manages state and logic without a backend, ensuring **Data Sovereignty**.

### Logic Router
The core logic separates the UI from the 'Brain'. The prompt router hot-swaps logic files based on your selected persona.

```javascript
// Logic Router Example 
const getResponse = (input) => { 
    return currentModel === 'marjuni' 
        ? getLogic(input)   // Stoic 
        : getEmotion(input); // Cute 
};
```

### Data Persistence
*   **Local Storage:** Chat histories are serialized directly to your browser's storage engine.
*   **Flush-on-Exit:** In Volatile Mode, data lives and dies in the Random Access Memory (RAM).

---

## 🎯 Use Cases

| User | Benefit |
| :--- | :--- |
| **Developers** | Use **Marjuni** as a rubber duck debugger. Paste logic or discuss architecture without leaking proprietary code to the cloud. |
| **Writers** | Stuck on a paragraph? Use **Marju** as a creative sounding board or Marjuni for plot-hole detection. |
| **Mental Wellness** | A safe, judgment-free space to organize your thoughts privately. |

---

## 🚀 Getting Started

Since Marju is client-side only, running it is simple.

### Prerequisites
*   Any modern web browser (Chrome, Edge, Firefox, Safari).

### Installation
1.  Clone the repo:
    ```sh
    git clone https://github.com/yourusername/marju.git
    ```
2.  Open `index.html` in your browser.
    *   *No `npm install` or backend setup required.*

---

## 🗺️ Roadmap

- [x] **Core Logic Engine:** Basic conversational state and local storage implementation.
- [ ] **WebGPU Acceleration:** Hardware acceleration for faster responses on supported devices.
- [ ] **PWA Support:** Install Marju as a native application on Android and iOS.

---

## 💻 System Requirements

Marju is engineered to be lightweight and runs smoothly on low-end devices.

*   **CPU:** Any modern processor
*   **RAM:** 512MB Minimum
*   **GPU:** Not Required (CPU Inference)
*   **Network:** Offline Capable
*   **Browsers:** Google Chrome, Microsoft Edge, Mozilla Firefox, Safari (iOS/Mac)

---

## 🛡️ Privacy Policy

**Short, simple, and transparent.**

1.  **No Data Collection:** We do not have servers, databases, or analytics trackers. We cannot see your messages or IP address.
2.  **Local Storage:** Data is stored exclusively in your browser's `localStorage`.
3.  **Data Deletion:** Clearing your browser cache or cookies will permanently delete your conversation history.

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

```text
MIT License
Copyright (c) 2026 Abdur Rakib Talukder
```

---

<div align="center">
  <p>Developed with ❤️ by Abdur Rakib Talukder</p>
  <p>© 2026 Marju Project</p>
</div>
```
