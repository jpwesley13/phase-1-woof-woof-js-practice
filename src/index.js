const urlBar = 'http://localhost:3000/pups';

const addPuppers = () => {
    fetch(urlBar)
    .then(res => res.json())
    .then(data => {
        dogBar(data);
    })
    .catch(error => {
        console.error(error)
    });
};

const dogInfo = document.querySelector('#dog-info');

const dogBar = (doggos) => {
    const dogDiv = document.querySelector('#dog-bar');

    doggos.forEach(doggo => {
        const dogSpan = document.createElement('span');

        dogSpan.textContent = doggo.name;
        dogSpan.className = 'dogs'
        dogSpan.dataset.id = doggo.id;
        dogDiv.appendChild(dogSpan);
    });

    dogDiv.addEventListener('click', function(e) {
        if(e.target.className === 'dogs') { //sees if the clicked thing has a class of dogs
            const pupID = e.target.dataset.id; //doggo id was added to the span by the earlier setting, which allows it to be accessed here
            getDoggo(pupID); //adds the dog's info to the div after clicking
        };
    });
};
    function updateDog(id, isGoodDog){
        const data = {
            isGoodDog: isGoodDog
        };
        fetch(`${urlBar}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    function getDoggo(id) {
        fetch(`${urlBar}/${id}`)
        .then(res => res.json())
        .then(data => {
            
            dogInfo.innerHTML = '';

            const dogImg = document.createElement('img');
            dogImg.src = data.image;

            const dogName = document.createElement('h2')
            dogName.textContent = data.name;

            const dogGoodness = document.createElement('button');
            dogGoodness.id = 'good-button'
            dogGoodness.classList.add('good-button')
            if (data.isGoodDog) {
                dogGoodness.textContent = 'Good Dog!'
            } else {
                dogGoodness.textContent = 'Bad Dog!'
            };
            dogInfo.appendChild(dogImg);
            dogInfo.appendChild(dogName);
            dogInfo.appendChild(dogGoodness);


            

            dogGoodness.addEventListener('click', function(e) {
                if(e.target.textContent === 'Good Dog!') {
                    console.log('good doggo');
                    e.target.textContent = 'Bad Dog!';
                    updateDog(data.id, false); //makes isGoodDog false rather than true, thus no longer good dog.
                } else {
                    console.log('bad doggo');
                    e.target.textContent = 'Good Dog!';
                    updateDog(data.id, true)
                };
            })
            })
            }

addPuppers();

