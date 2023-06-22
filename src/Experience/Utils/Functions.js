export function displayDialiog(text) {
        const dialogs = document.querySelector('#dialogs')
        text.forEach((letter, index) => {
            setTimeout(() => {
                if (letter === '[' && (index !== 0 || dialogs.innerHTML.length !== 0)) {
                    dialogs.innerHTML += '<br>'
                }
                dialogs.innerHTML += letter
            }, index * 50)
        })

        setTimeout(() => {
            dialogs.innerHTML = ''
        }, (text.length * 50) + 3000)
    }