function setMaskPhoneNumber() {
  // var el = null,
  //   key = null,
  //   cursorPositionTillEnd = null,
  //   startLengthSymbols = null,
  //   digitsTillEndObj = null;

  // function eventBackSpaceMore (e) { // control of carriage cursor - контроль каретки
  //   if(e.key === "Backspace") {
  //     const target = e.target,
  //       prevChar = target.value[target.selectionEnd-1],
  //       doublePrevChar = target.value[target.selectionEnd-2],
  //       cursorPositionTillEnd = target.value.length - target.selectionEnd;
  //
  //     if(/\d/.test(prevChar) === false) {
  //       target.value = target.value.slice(0, target.selectionEnd-1) + target.value.slice(target.selectionEnd, target.length);
  //       target.selectionEnd = target.value.length-cursorPositionTillEnd;
  //     }
  //     if(/\d/.test(prevChar) === false && /\d/.test(doublePrevChar) === false) {
  //       target.value = target.value.slice(0, target.selectionEnd-1) + target.value.slice(target.selectionEnd, target.length);
  //       target.selectionEnd = target.value.length-cursorPositionTillEnd;
  //     }
  //   }
  //   else if(['0','1','2','3','4','5','6','7','8','9'].includes(e.key)) {
  //     const target = e.target;
  //     const arrDigitsTillEnd = target.value.slice(target.selectionEnd).match(/\d/g);
  //     digitsTillEndObj = {};
  //     if(arrDigitsTillEnd)
  //       for (const digit of arrDigitsTillEnd) {
  //         if(!digitsTillEndObj[digit]) {
  //           digitsTillEndObj[digit] = 1;
  //         }
  //         else {
  //           digitsTillEndObj[digit] += 1;
  //         }
  //       }
  //   }
  // }
  function eventCallback(e) {
    e.preventDefault();

    // if (!e.isTrusted || e.type !== "input") {
      var el = e.target,
        clearVal = el.dataset.phoneClear, // затирание номера при потере фокуса
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = el.value.replace(/\D/g, "");

      if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
          el.value = '';
          return;
        }
      }

      if (def.length >= val.length) val = def;
      el.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
      });

      // control of carriage cursor - контроль каретки
    //   const differenceChars = el.value.length - startLengthSymbols;
    //   if (key === "Backspace") {
    //     if (cursorPositionTillEnd !== 0) {
    //       el.selectionEnd = el.value.length - cursorPositionTillEnd - differenceChars;
    //     }
    //   } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key) && cursorPositionTillEnd !== 0) {
    //     console.log(key)
    //     if (cursorPositionTillEnd !== 0 && digitsTillEndObj) {
    //       el.selectionEnd = el.selectionStart = 0;
    //       let condition = true;
    //
    //       while (condition) {
    //         const digitsTillEndObjCopied = JSON.parse(JSON.stringify(digitsTillEndObj));
    //         el.selectionEnd = el.selectionStart = el.value.length - 1;
    //         const nowDigitsTillEndArr = el.value.slice(el.selectionEnd).match(/\d/g);
    //         console.log("arr: ", nowDigitsTillEndArr)
    //         console.log("obj: ", digitsTillEndObjCopied);
    //         if (nowDigitsTillEndArr) {
    //           const digit = nowDigitsTillEndArr.pop();
    //           digitsTillEndObjCopied[digit] -= 1;
    //           console.log(digitsTillEndObjCopied.hasOwnProperty(digit))
    //
    //           if (digitsTillEndObjCopied[digit] === 0) {
    //             delete digitsTillEndObjCopied[digit];
    //           }
    //         }
    //
    //         if (Object.keys(digitsTillEndObjCopied).length === 0) {
    //           condition = false;
    //           console.log("end cycle")
    //         }
    //       }
    //
    //       console.log(el.value.slice(el.selectionEnd - 1).match(/\d/g))
    //     }
    //   }
    // }
  }
  // var eventKeyCallback = function (e) {
  //   el = e.target,
  //   key = e.key,
  //   cursorPositionTillEnd = el.value.length - el.selectionStart,
  //   startLengthSymbols = el.value.length;
  //
  //   var inputEvent = new Event("input");
  //   el.dispatchEvent(inputEvent);
  // }

  var phone_inputs = document.querySelectorAll('[name="user_phone"]');
  for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCallback);
    }
    // elem.addEventListener("keyup", eventKeyCallback);
    // elem.addEventListener("keydown", eventBackSpaceMore);
  }
}

export default setMaskPhoneNumber;