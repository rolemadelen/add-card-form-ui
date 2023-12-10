const query = (c) => document.querySelector(c);
const queryAll = (c) => document.querySelectorAll(c);

const updateCardNumber = () => {
  let currentNumber = '';
  let inputNumberLength = 0;
  const MAX_LENGTH = 15;
  const inputCardNumber = query('#cardNumber');
  const cardNumber = query('.card-number');
  const spanCardNumber = queryAll('.card-number > span');
  const focus = query('.focus');

  inputCardNumber.addEventListener('focusin', () => {
    focus.style.opacity = '1';
    focus.style.height = '2em';
    focus.style.width = `${cardNumber.clientWidth + 15}px`;
    focus.style.top = '52%';
    focus.style.left = '5%';
  });

  inputCardNumber.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });

  inputCardNumber.addEventListener('input', (e) => {
    const match = /^[0-9]*$/;
    if (!match.test(e.target.value) || e.target.value.length > MAX_LENGTH + 1) {
      inputCardNumber.value = currentNumber;
      return;
    }

    currentNumber = e.target.value;

    const currentLength = currentNumber.length;
    if (Math.abs(inputNumberLength - currentLength) > 1) {
      spanCardNumber.forEach((span, index) => {
        if (index >= currentLength) {
          span.innerHTML = '#<br/>';
          span.classList.remove('typed');
        }
      });
    }

    if (currentLength < inputNumberLength) {
      spanCardNumber[currentLength].innerHTML = '#<br/>';
      spanCardNumber[currentLength].classList.remove('typed');
    } else {
      spanCardNumber[currentLength - 1].classList.add('typed');
      spanCardNumber[currentLength - 1].innerHTML = `#<br/>${e.data}`;
    }

    inputNumberLength = currentLength;
  });
};

const updateCardName = () => {
  const BASE_NAME = 'LINE Member';
  const inputName = query('#cardName');
  const cardName = query('.card-name');
  const focus = query('.focus');

  inputName.addEventListener('focusin', () => {
    focus.style.opacity = '1';
    focus.style.height = '2em';
    focus.style.width = `${cardName.clientWidth + 30}px`;
    focus.style.top = '84%';
    focus.style.left = '5%';
  });
  inputName.addEventListener('focusout', () => {
    focus.style.opacity = '0';
  });

  inputName.addEventListener('input', (e) => {
    let name = e.target.value || BASE_NAME;
    cardName.innerText = name;
    focus.style.width = `${cardName.clientWidth + 30}px`;
  });
};

const updateCardDate = () => {
  const cardDate = query('.card-date');
  const selectExpirationMonth = query('#expiration-month');
  const selectExpirationYear = query('#expiration-year');
  const focus = query('.focus');
  let date = '';
  let month = '01';
  let year = '23';

  const BASE_TEXT = '<span class="good-through">Good Thru</span>';

  const commonStyles = {
    opacity: '1',
    height: '32px',
    top: '68%',
    left: '5%',
  };

  [selectExpirationMonth, selectExpirationYear].forEach((select) => {
    select.addEventListener('focusin', () => {
      Object.assign(focus.style, commonStyles, {
        width: `${cardDate.clientWidth + 25}px`,
      });
    });

    select.addEventListener('focusout', () => {
      focus.style.opacity = '0';
    });

    select.addEventListener('change', (e) => {
      if (e.target.value.length === 2) {
        month = e.target.value;
      } else {
        year = e.target.value.slice(2);
      }
      date = month + '/' + year;
      cardDate.innerHTML = BASE_TEXT + date;
    });
  });
};

window.addEventListener('load', () => {
  updateCardNumber();
  updateCardName();
  updateCardDate();
});

VanillaTilt.init(document.querySelector('.card'), {
  max: 15,
  glare: true,
  'max-glare': 0.5,
  reverse: true,
  scale: 1.1,
  speed: 1500,
});
