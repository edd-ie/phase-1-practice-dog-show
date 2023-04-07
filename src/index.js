// <tr>
//     <td>Dog *Name*</td>
//     <td>*Dog Breed*</td>
//     <td>*Dog Sex*</td>
//     <td><button>Edit</button></td>
// </tr>

document.addEventListener('DOMContentLoaded', () => {
    // Storing reusable data
    let url = 'http://localhost:3000/dogs'
    let table = document.querySelector('#table-body')

    // ===== Form var ======//
    let form = document.getElementById('dog-form')
    let inName = form.getElementsByTagName('input')[0];
    let inBreed = form.getElementsByTagName('input')[1];
    let inSex = form.getElementsByTagName('input')[2];

    let cache = []

    // Generating the dogs table data
    fetch(url)
    .then(raw => raw.json())
    .then((data)=>{
        let dogs = data //=>array
        
        // ===== Post data on table ======//
        for (let dog  of dogs) {
            let row = document.createElement('tr')
            table.appendChild(row)

            let name = document.createElement('td')
            let breed = document.createElement('td')
            let sex = document.createElement('td')
            let edit = document.createElement('td')
            let button = document.createElement('button')

            name.textContent = dog.name
            breed.textContent = dog.breed
            sex.textContent = dog.sex
            button.textContent = 'Edit'

            row.appendChild(name)
            row.appendChild(breed)
            row.appendChild(sex)
            row.appendChild(edit)
            edit.appendChild(button)

            button.addEventListener('click', () =>{
                inName.value = name.textContent
                inBreed.value = breed.textContent
                inSex.value = sex.textContent

                for (let i of cache){cache.pop(i)}

                cache[0] = inName.value
                cache[1] = inBreed.value
                cache[2] = inSex.value
            })
        }

    })

    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        let dogName = inName.value
        let dogBreed = inBreed.value
        let dogSex = inSex.value;

        fetch(url)
        .then(raw => raw.json())
        .then((data)=>{

            for(let dog of data){
                if(dog.name == cache[0] && dog.breed == cache[1] && dog.sex == cache[2]){
                    let id = dog.id

                    values = {
                        name:dogName,
                        breed:dogBreed,
                        sex:dogSex
                    }

                    fetch(`${url}/${id}`,{
                        method: 'PATCH',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(values)
                    })
                    .catch(err => console.log(err.message))

                    break
                }
            }

        })

        form.reset()
    })

})