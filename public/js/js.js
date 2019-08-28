console.log('Log from Weather App')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value

    message.textContent = 'Loading forecast for ' + address + '...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message.textContent = data.error
            }

            message.textContent = 'Forecast for ' + data.address
            message2.textContent = data.forecast
        })
    })

})