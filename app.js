const btnInit = document.getElementById('btnInit')
const content = document.getElementById('content')

btnInit.addEventListener('click', () => {
    // Spinner
    const spinner = document.createElement('span')
    const textContentBtn = document.createElement('span')

    // Spinner class
    spinner.className = 'spinner-grow spinner-grow-sm ml-3'
    spinner.setAttribute("role", "status");
    spinner.setAttribute("aria-hidden", "true");


    // Init spinner
    textContentBtn.textContent = 'Cargando'
    btnInit.textContent = ''
    btnInit.appendChild(spinner)
    btnInit.insertBefore(textContentBtn, spinner)

    // XMLHttpRequest
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://randomuser.me/api/?results=100', true)

    xhr.addEventListener('load', e => {
        const data = JSON.parse(e.target.responseText)
        
        render(data.results)

        // Cancel spinner
        btnInit.removeChild(spinner)
        btnInit.removeChild(textContentBtn)
        btnInit.textContent = 'Cargar usuarios'
    })

    xhr.send()
})

const render = data => {
    content.innerHTML = ''

    data.forEach(user => {
        const column = document.createElement('div'),
            card = document.createElement('div'),
            cardBody = document.createElement('div'),
            img = document.createElement("img"),
            title = document.createElement('h5'),
            username = document.createElement('p'),
            address = document.createElement('span')
        
            // Assigning data
            img.setAttribute("src", `${user.picture.large}`);
            title.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`
            address.innerHTML = `City: <span>${user.location.city}, ${user.location.state}</span>`
            username.textContent = `@${user.login.username}`

            cardBody.appendChild(title)
            cardBody.appendChild(username)
            cardBody.appendChild(address)

            card.appendChild(img)
            card.appendChild(cardBody)
            column.appendChild(card)

            // Bootstrap class
            column.className = 'col-md-3 mb-5'
            card.className = 'card w-100'
            cardBody.className = 'card-body'
            img.className = 'card-img-top'
            title.className = 'card-title'
            username.className = 'text-primary'
            address.querySelector('span').className = 'card-text text-muted'

            content.appendChild(column)
    });
}