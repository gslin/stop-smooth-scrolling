# Stop Smooth Scrolling

Stop smooth scrolling that websites try to simulate by JavaScript.

## Install

* https://chrome.google.com/webstore/detail/stop-smooth-scrolling/dolloijeimbmocbhcjglaobngibnhfij

## How it works

Use `addEventListener()` with `useCapture` flag, then `preventDefault()` to avoid from the initialization of smooth scrolling.  This should be working to block almost all cases, but you can add into allowlist if it does not work.

## License

The BSD 3-Clause License.  Please read [LICENSE](LICENSE) file.
