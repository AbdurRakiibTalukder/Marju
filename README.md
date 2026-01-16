<div align="center">
  <img src="https://raw.githubusercontent.com/AbdurRakiibTalukder/Marju/main/assets/marju-dark.svg#gh-light-mode-only" alt="Marju Logo" width="200">
  <img src="https://raw.githubusercontent.com/AbdurRakiibTalukder/Marju/main/assets/marju-light.svg#gh-dark-mode-only" alt="Marju Logo" width="200">
  
  <p><strong>Your Dual-Core AI Companion. Running 100% Offline.</strong></p>
  <p>No servers. No data leaks. Switch between "Marju" (Emotional Support) and "Marjuni" (Ruthless Logic) instantly in your browser.</p>

  <!-- Badges -->
  <p>
    <a href="https://github.com/AbdurRakiibTalukder/Marju/blob/main/LICENSE.txt"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
    <a href="#-privacy-first"><img src="https://img.shields.io/badge/Privacy-100%25_Local-brightgreen.svg" alt="Privacy First"></a>
    <a href="https://github.com/AbdurRakiibTalukder/Marju/actions"><img src="https://img.shields.io/badge/Status-Active-blue.svg" alt="Project Status"></a>
  </p>

  <!-- Links -->
  <p>
    <a href="https://marju.rakib.top"><strong>Try Live Demo</strong></a> ·
    <a href="https://github.com/AbdurRakiibTalukder/Marju/issues">Report a Bug</a> ·
    <a href="https://github.com/AbdurRakiibTalukder/Marju/issues">Request a Feature</a>
  </p>
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/AbdurRakiibTalukder/Marju/main/assets/dex-dark.png" alt="Desktop App Interface" width="80%">
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [✨ Key Features](#-key-features)
- [🎯 Who Is This For?](#-who-is-this-for)
- [🛠️ Under The Hood](#️-under-the-hood)
- [🚀 Getting Started](#-getting-started)
- [🗺️ Project Roadmap](#️-project-roadmap)
- [💻 System Requirements](#-system-requirements)
- [🛡️ Privacy & License](#️-privacy--license)
- [🤝 Contributing](#-contributing)
- [📧 Contact](#-contact)

---

## 📖 About The Project

**Marju** is a revolutionary AI companion built on a **'Local-First'** philosophy. It rejects the standard cloud-based model and operates entirely within your browser using lightweight, efficient JavaScript. There are no backend servers to connect to, no data packets sent across the web, and absolutely no risk of your private conversations being logged or analyzed.

The core concept is "duality." Marju offers two distinct, instantly-switchable AI personas to match your needs:

1.  **Marju (Emotional Core):** A cute, empathetic, and supportive companion. Perfect for brainstorming, creative writing, or simply venting in a safe, judgment-free space.
2.  **Marjuni (Logical Core):** A ruthless, stoic, and logic-driven engine. Ideal for developers debugging code, analyzing problems, or seeking brutally honest feedback without the fluff.

Your data, your control, your AI.

## ✨ Key Features

| Icon | Feature | Description |
| :--- | :--- | :--- |
| 🖥️ | **Browser Native** | No Python servers, Docker, or complex setup. Marju runs directly in any modern browser. Clone the repo, open the file, and you're done. |
| 🎭 | **Adaptive Personality** | Seamlessly switch between the empathetic **Marju** and the analytical **Marjuni** to get the exact type of assistance you need. |
| 🔒 | **Total Privacy** | Your chats never leave your machine. Data is saved to `LocalStorage` for persistence or held only in RAM when using Incognito Mode for a truly ephemeral session. |

---

## 🎯 Who Is This For?

Marju adapts to your workflow and emotional state, making it a powerful tool for a diverse range of users.

| User | Use Case |
| :--- | :--- |
| **Developers** | Use **Marjuni** as a "rubber duck" debugger. Paste logic, discuss architectural patterns, and get optimization suggestions without leaking proprietary code to a third-party API. |
| **Writers** | Use **Marju** as a creative sounding board to overcome writer's block, or switch to **Marjuni** for rigorous plot-hole detection and logical consistency checks. |
| **Mental Wellness** | Sometimes you just need to vent. Marju's emotional core provides a safe, non-judgmental, and completely private space to organize your thoughts and feelings. |

---

## 🛠️ Under The Hood

Marju's power comes from its simple yet robust client-side architecture.

### <i class="bi bi-hdd-network"></i> Data Sovereignty
Unlike cloud tools that harvest your data, Marju operates on a strict **'Local-First'** philosophy. Chat histories are serialized directly to your browser's `LocalStorage` engine.
- **No External APIs:** Your data never touches a remote server.
- **No Telemetry:** No hidden uplinks or analytics.
- **100% Ownership:** Your data lives and dies on your physical machine.

### <i class="bi bi-incognito"></i> Volatile Mode
For absolute ephemerality, launch Marju in your browser's Incognito or Private mode. This bypasses storage drivers completely, holding the session state only in the device's volatile RAM. A 'flush-on-exit' protocol ensures the JavaScript Garbage Collector immediately wipes all session references the moment the tab is closed.

### <i class="bi bi-code-slash"></i> Logic Router
The core of the dual-persona system is a lean prompt router that hot-swaps the underlying logic files based on your selection, separating the UI from the 'Brain'.

```javascript
// Logic Router Example
const getResponse = (input) => {
  return currentModel === 'marjuni'
    ? getLogic(input)   // Calls the Stoic/Logical engine
    : getEmotion(input); // Calls the Cute/Emotional engine
};
```

---

## 🚀 Getting Started

Getting Marju running is as simple as it gets. No build steps, no dependencies.

1.  **Clone the repository:**
    ```sh
    git marju
    ```
2.  **Navigate to the directory:**
    ```sh
    cd Marju
    ```
3.  **Open the file:**
    Simply open the `index.html` file in your favorite modern web browser. That's it!

---

## 🗺️ Project Roadmap

The future of offline, private AI is bright.

- [✅] **Core Logic Engine:** Basic conversational state and local storage implementation.
- [🔄] **WebGPU Acceleration:** Implementing hardware acceleration for significantly faster responses on supported devices.
- [📅] **PWA Support:** Full Progressive Web App support to install Marju as a native-like application on desktops, Android, and iOS.

---

## 💻 System Requirements

Marju is engineered to be exceptionally lightweight and runs smoothly even on low-end hardware.

| Category | Requirement |
| :--- | :--- |
| **CPU** | Any modern processor |
| **RAM** | 512MB Minimum |
| **GPU** | Not Required (CPU-based inference) |
| **Network** | Offline Capable |
| **Browsers** | Chrome, Edge, Firefox, Safari (Full ES6 Support) |

---

## 🛡️ Privacy & License

### Privacy Policy
Our privacy policy is simple: **We collect nothing.**
- Marju is a 100% client-side application.
- We have no servers, no databases, and no analytics.
- Your data is stored *exclusively* in your browser's `localStorage` and can be permanently deleted by clearing your browser cache.

### Open Source License
Marju is free and open-source software distributed under the **MIT License**.

<details>
<summary>Click to view MIT License</summary>

```text
MIT License

Copyright (c) 2026 Abdur Rakib Talukder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
</details>

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📧 Contact

Abdur Rakib Talukder - [abdur.rakib.top](https://abdur.rakib.top)

Project Link: [https://github.com/AbdurRakiibTalukder/Marju](https://github.com/AbdurRakiibTalukder/Marju)

<div align="center">
  <p><strong>© 2026 Marju Project</strong></p>
</div>
