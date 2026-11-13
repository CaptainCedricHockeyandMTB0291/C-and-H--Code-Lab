# Code Lab
### A growing collection of useful browser tools and practical coding projects

Code Lab is a lightweight collection of original, browser-based utilities. The goal is straightforward: build small programs that solve everyday problems, keep the code readable, and make each project easy to understand, modify, and expand.

This first release combines six tools into one simple dashboard. It uses standard HTML, CSS, and JavaScript, so there is no framework to install and no build process to run.

---

## Contents

- Project Overview
- Features
- Getting Started
- Project Structure
- How Each Tool Works
- Technology
- Privacy and Local Storage
- Browser Compatibility
- Customization
- Troubleshooting
- Security Notes
- Roadmap
- Contributing
- License

## Project Overview

Code Lab is designed as a practical mini-toolbox rather than a single-purpose demo.

The collection is intentionally self-contained:

- No account required.
- No server required.
- No external JavaScript libraries required.
- No package manager required.
- Most features work offline after the page has been saved locally.

## Features

### 1. Quick Notes
- Write and save notes.
- Reopen saved notes in the same browser profile.
- Edit note titles and content.
- Store notes locally.

### 2. Task Manager
- Add new tasks.
- Mark tasks as complete.
- Delete individual tasks.
- Clear completed tasks.
- View task statistics.
- Save tasks locally.

### 3. Word Counter
- Count words.
- Count characters.
- Count characters without whitespace.
- Count lines.
- Update statistics automatically.

### 4. JSON Toolkit
- Validate JSON syntax.
- Format JSON with indentation.
- Minify JSON.
- Copy formatted results.
- Display parsing errors.

### 5. Text Toolkit
- Uppercase conversion.
- Lowercase conversion.
- Title Case conversion.
- Remove unnecessary spaces.
- Reverse text.
- Copy transformed results.

### 6. Stopwatch
- Start.
- Pause.
- Resume.
- Reset.
- Display hours, minutes, seconds and tenths of seconds.

## Getting Started

### Option A — Download

1. Download the repository.
2. Extract the files.
3. Open `index.html` in a modern browser.
4. Select a tool from the navigation bar.

### Option B — Git

```bash
git clone YOUR_REPOSITORY_URL
cd Code-Lab
```

Open `index.html` in your browser.

### Option C — GitHub Pages

1. Open repository Settings.
2. Select Pages.
3. Choose your publishing branch.
4. Select the repository root.
5. Save the settings.

GitHub Pages can publish this static application without requiring a backend.

## Project Structure

```text
Code-Lab/
│
├── index.html
│   └── Main application
│
├── README.md
│   └── Documentation
│
└── LICENSE
    └── MIT license
```

## Technology

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Application functionality |
| localStorage | Local data persistence |
| Clipboard API | Copying text |
| Performance API | Stopwatch timing |

No external dependencies are required.

## Privacy and Storage

Code Lab processes its content locally in the browser.

Notes and tasks use browser local storage. They are not automatically synchronized between devices.

Clearing browser data may remove saved notes and tasks.

Do not use this application to store passwords, private keys, authentication codes or other sensitive information.

## Browser Compatibility

Designed for modern versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Apple Safari

Some features depend on browser permissions and privacy settings.

## Customization

Code Lab is designed to be modified and expanded.

You can:

- Change the application theme.
- Add new tools.
- Modify existing JavaScript functions.
- Add additional navigation sections.
- Improve the mobile interface.
- Introduce new local storage features.

Keep the code readable and document significant changes.

## Troubleshooting

**Notes are not saving**
- Check browser storage permissions.
- Try a normal browsing window.

**Clipboard buttons do not work**
- Check browser clipboard permissions.
- Try localhost or an HTTPS-hosted version.

**JSON validation fails**
- Check quotation marks, commas and brackets.
- JSON requires double quotes around property names and strings.

## Security Notes

This is a local utility collection, not a security product.

- Do not enter passwords or sensitive credentials.
- Review contributions before running them.
- Avoid unnecessary external dependencies.
- Do not claim software is tested or secure without actually reviewing it.

## Roadmap

Potential future projects:

- [ ] Color Studio — HEX, RGB and HSL converter.
- [ ] File Size Converter.
- [ ] QR Code Generator.
- [ ] Developer Toolbox.
- [ ] System Information Panel.
- [ ] Clipboard Scratchpad.
- [ ] Markdown Previewer.
- [ ] Timestamp Converter.
- [ ] Unit Converter.
- [ ] Additional mobile improvements.

## Contributing

Contributions, bug reports and practical feature suggestions are welcome.

When contributing:

1. Explain the purpose of your change.
2. Keep features focused.
3. Use descriptive function names.
4. Avoid unnecessary dependencies.
5. Review existing functionality.
6. Update documentation when needed.

## Version Information

**Project:** Code Lab  
**Release:** Initial Collection  
**Language:** JavaScript  
**Interface:** HTML + CSS  
**License:** MIT

This repository contains the source code for the described utilities. No independent testing or production-readiness claim is made.

## License

Released under the MIT License. See the LICENSE file for details.

---

**Code Lab — Build useful things. Keep learning. Keep improving.**
