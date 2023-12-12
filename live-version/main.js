const focus = document.querySelector('.card-focus');

function updateCardNumber() {
  const numberSpanTags = document.querySelectorAll('.card-number span');
  const numberInputField = document.getElementById('cardNumber');
  let currentNumber = '';

  numberInputField.addEventListener('focusin', () => {
    const cardNumber = document.querySelector('.card-number');
    focus.style.width = `${cardNumber.clientWidth}px`;
    focus.style.height = '25px';
    focus.style.top = '51%';
    focus.style.left = '5%';
    focus.style.opacity = '1';
  });
  numberInputField.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });

  numberInputField.addEventListener('input', (e) => {
    //  regex
    const match = /^[0-9]*$/;
    if (!match.test(e.target.value)) {
      numberInputField.value = currentNumber;
      return;
    }
    const index = e.target.value.length - 1;

    // deleteの場合
    if (e.data === null) {
      if (Math.abs(currentNumber.length - e.target.value.length) === 1) {
        // 一個づつ消した時
        numberSpanTags[index + 1].innerHTML = `<span>#<br/></span>`;
        numberSpanTags[index + 1].classList.remove('typed');
      } else {
        let i = e.target.value.length;
        while (i < 16) {
          numberSpanTags[i].innerHTML = `<span>#<br/></span>`;
          numberSpanTags[i].classList.remove('typed');
          i += 1;
        }
      }
    } else {
      numberSpanTags[index].innerHTML = `<span>#<br/>${e.data}</span>`;
      numberSpanTags[index].classList.add('typed');
      currentNumber = e.target.value;
    }
  });
}

function updateCardDate() {
  // Expiration date
  const cardDateTag = document.querySelector('.card-date');
  const monthSelect = document.getElementById('expired-month');
  const yearSelect = document.getElementById('expired-year');
  let month = '01';
  let year = '23';

  monthSelect.addEventListener('focusin', () => {
    const cardDate = document.querySelector('.card-date');
    focus.style.width = `${cardDate.clientWidth + 5}px`;
    focus.style.height = '25px';
    focus.style.top = '68%';
    focus.style.left = '5%';
    focus.style.opacity = '1';
  });
  monthSelect.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });
  yearSelect.addEventListener('focusin', () => {
    const cardDate = document.querySelector('.card-date');
    focus.style.width = `${cardDate.clientWidth + 5}px`;
    focus.style.height = '25px';
    focus.style.top = '68%';
    focus.style.left = '5%';
    focus.style.opacity = '1';
  });
  yearSelect.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });

  monthSelect.addEventListener('change', (e) => {
    month = e.target.value;
    cardDateTag.innerHTML = `<span>Good thru</span>${month}/${year}`;
  });
  yearSelect.addEventListener('change', (e) => {
    year = e.target.value.slice(2);
    cardDateTag.innerHTML = `<span>Good thru</span>${month}/${year}`;
  });
}

function updateCardName() {
  //  NAME
  const cardNameTag = document.querySelector('.card-name');
  const nameInputField = document.getElementById('cardName');

  nameInputField.addEventListener('focusin', () => {
    const cardName = document.querySelector('.card-name');
    focus.style.width = `${cardName.clientWidth + 5}px`;
    focus.style.height = '25px';
    focus.style.top = '85%';
    focus.style.left = '5%';
    focus.style.opacity = '1';
  });
  nameInputField.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });

  nameInputField.addEventListener('input', (e) => {
    const DEFAULT_NAME = 'LINE Member';

    if (e.target.value.length === 0) {
      cardNameTag.innerText = DEFAULT_NAME;
    } else {
      cardNameTag.innerText = e.target.value;
    }
    const cardName = document.querySelector('.card-name');

    focus.style.width = `${cardName.clientWidth + 5}px`;
  });
}

window.addEventListener('load', () => {
  updateCardNumber();
  updateCardDate();
  updateCardName();
});
//  tilt
VanillaTilt.init(document.querySelector('.card'), {
  reverse: true,
  max: 15,
  speed: 400,
  glare: true,
  'max-glare': 0.5,
});
