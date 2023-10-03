document.addEventListener('DOMContentLoaded', function () {
  let list = document.querySelector('#shopping__list ul');
  let products;
  let productsObj;

  // display items from local storage
  const displayItems = function () {
    productsObj.forEach(function (product) {
      // create elements
      const li = document.createElement('li');
      const productItem = document.createElement('span');
      const deleteBtn = document.createElement('img');

      // add content
      deleteBtn.setAttribute('src', './images/trash.svg');
      (productItem.style.fontFamily = 'Roboto'), 'san-serif';
      productItem.textContent = product;

      // add classes
      productItem.classList.add('item');
      deleteBtn.classList.add('delete');

      // append to document
      li.appendChild(productItem);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  };

  // display updated items from local storage
  const updateItems = function () {
    itemsObj.forEach(function (item) {
      // create elements
      const li = document.createElement('li');
      const productItem = document.createElement('span');
      const deleteBtn = document.createElement('img');

      // add content
      deleteBtn.setAttribute('src', './images/trash.svg');
      // (productItem.style.color = '#fff');
      productItem.textContent = item;

      // add classes
      productItem.classList.add('item');
      deleteBtn.classList.add('delete');

      // append to document
      li.appendChild(productItem);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  };

  // grab local storage array immediately when DOM is loaded - convert it to an object and call displayItems function
  loadStorage();
  function loadStorage() {
    // if there is nothing saved initially then save an empty array
    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', '[]');
    }

    if (localStorage.getItem('products') !== null) {
      products = localStorage.getItem('products');

      productsObj = JSON.parse(products);
      displayItems();
    }
  }

  // sort items
  const sortBox = document.querySelector('#sort');
  sortBox.addEventListener('change', function (e) {
    const lis = list.querySelectorAll('li');

    if (sortBox.checked) {
      lis.forEach(function (li) {
        list.removeChild(li);
      });
      let items = localStorage.getItem('products');
      itemsObj = JSON.parse(items);
      // display sorted items from local storage
      itemsObj.sort();
      updateItems();
    } else {
      lis.forEach(function (li) {
        list.removeChild(li);
      });
      let items = localStorage.getItem('products');
      itemsObj = JSON.parse(items);
      // display unsorted items from local storage
      updateItems();
    }
  });

  // delete items
  list.addEventListener('click', function (e) {
    if (e.target.className === 'delete') {
      const li = e.target.parentElement;
      list.removeChild(li);
      // had to make sure that the items were also removed from local storage
      const items = localStorage.getItem('products');
      itemsObj = JSON.parse(items);

      const fliteredItems = itemsObj.filter(function (obj) {
        if (li.textContent !== obj) {
          return true;
        }
      });
      localStorage.setItem('products', JSON.stringify(fliteredItems));
    }
  });

  // add items
  let addForm = document.forms['add__item'];

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = addForm.querySelector('input[type="text"]').value;

    if (value) {
      // create elements
      const li = document.createElement('li');
      const productItem = document.createElement('span');
      const deleteBtn = document.createElement('img');

      // add content
      deleteBtn.setAttribute('src', './images/trash.svg');
      // (productItem.style.fontFamily = 'Darumadrop One'), 'cursive';
      productItem.textContent = value;

      // add classes
      productItem.classList.add('item');
      deleteBtn.classList.add('delete');

      // append to document
      li.appendChild(productItem);
      li.appendChild(deleteBtn);
      list.appendChild(li);

      addForm.reset();
    } else {
      return;
    }

    // save input value to local storage
    let newData = value;

    // get old data and attach it to the new data
    let oldData = JSON.parse(localStorage.getItem('products'));
    oldData.push(newData);

    // save old + new data to local storage
    localStorage.setItem('products', JSON.stringify(oldData));
  });

  // hide items
  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function (e) {
    if (hideBox.checked) {
      list.style.display = 'none';
    } else {
      list.style.display = 'initial';
    }
  });

  // filter items
  const searchBar = document.forms['search__items'].querySelector('input');
  searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase();
    const items = list.getElementsByTagName('li');

    Array.from(items).forEach(function (item) {
      const product = item.firstElementChild.textContent;

      if (product.toLowerCase().indexOf(term) != -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // tabbed content
  // const tabs = document.querySelector('.tabs');
  // const panels = document.querySelectorAll('.panel');

  // tabs.addEventListener('click', function (e) {
  //   if (e.target.tagName === 'LI') {
  //     const targetPanel = document.querySelector(e.target.dataset.target);

  //     panels.forEach(function (panel) {
  //       if (panel === targetPanel) {
  //         panel.classList.add('active');
  //       } else {
  //         panel.classList.remove('active');
  //       }
  //     });
  //   }
  // });
});
