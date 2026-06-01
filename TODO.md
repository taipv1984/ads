# TODO

- [ ] Update plan drafted after repo inspection
- [ ] Fix build error `private properties are not supported` by updating `babel.config.js` to transform private fields
- [ ] Install missing Babel transform plugins (if required) in `package.json` / npm
- [ ] Rebuild: `cd android && gradlew.bat clean && cd .. && npx expo run:android --variant release`
- [ ] If still failing, locate offending code/dependency by inspecting generated bundle for `#x/#y/#width/#height`

