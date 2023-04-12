window.addEventListener('load', solve);

function solve() {
    let totalLikes = 0;

    const inputDOMSelectors = {
        genre: document.querySelector('input[name="genre"]'),
        name: document.querySelector('input[name="name"]'),
        author: document.querySelector('input[name="author"]'),
        date: document.querySelector('input[name="date"]'),
    };

    const otherDOMSelectors = {
        addBtn: document.getElementById('add-btn'),
        collectionContainer: document.querySelector('.all-hits-container'),
        savedContainer: document.querySelector('.saved-container'),
        totalLikesContainer: document.querySelector('.likes > p'),
    };

    otherDOMSelectors.addBtn.addEventListener('click', addSongHandler);

    function addSongHandler(event) {
        event.preventDefault();

        let noInputsAreEmpty = Object.values(inputDOMSelectors)
            .every((v) => v.value !== '');

        if (!noInputsAreEmpty) {
            console.log("INVALID")
            return;
        } else {
            console.log("VALID");
        }

        const { genre, name, author, date } = inputDOMSelectors;
        const songContainer = createElement('div', otherDOMSelectors.collectionContainer, '', ['hits-info']);
        createElement('img', songContainer, null, null, null, { src: './static/img/img.png' });
        createElement('h2', songContainer, `Genre: ${genre.value}`);
        createElement('h2', songContainer, `Name: ${name.value}`);
        createElement('h2', songContainer, `Author: ${author.value}`);
        createElement('h3', songContainer, `Date: ${date.value}`);
        saveBtn = createElement('button', songContainer, 'Save song', ['save-btn']);
        likeBtn = createElement('button', songContainer, 'Like song', ['like-btn']);
        deleteBtn = createElement('button', songContainer, 'Delete', ['delete-btn']);
        
        saveBtn.addEventListener('click', saveSongHandler);
        likeBtn.addEventListener('click', likeSongHandler);
        deleteBtn.addEventListener('click', deleteSongHandler);

        clearAllInputs();
    }

    function saveSongHandler() {
        const songReference = this.parentNode;
        const saveBtn = document.querySelector('.save-btn');
        const likeBtn = document.querySelector('.like-btn');

        otherDOMSelectors.savedContainer.appendChild(songReference);
        saveBtn.remove();
        likeBtn.remove();
    }

    function likeSongHandler() {
        this.setAttribute('disabled', true);
        totalLikes += 1;
        otherDOMSelectors.totalLikesContainer.textContent = `Total Likes: ${totalLikes}`;
    }

    function deleteSongHandler() {
        this.parentNode.remove(); // deleteBtn's parent node is songContainer --> We remove the songContainer
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            })
    }

    function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
        const htmlElement = document.createElement(type);
      
        if (content && useInnerHtml) {
          htmlElement.innerHTML = content;
        } else {
          if (content && type !== 'input') {
            htmlElement.textContent = content;
          }
          
          if (content && type === 'input') {
            htmlElement.value = content;
          }
        }
        
        // parse as an array
        if (classes && classes.length > 0) {
          htmlElement.classList.add(...classes);
        }
      
        if (id) {
          htmlElement.id = id;
        }
      
        // { src: 'ink', href: 'http' }
        if (attributes) {
          for (const key in attributes) {
            htmlElement.setAttribute(key, attributes[key])
          }
        }
      
        if (parentNode) {
          parentNode.appendChild(htmlElement)
        }
      
        return htmlElement;
      }
}