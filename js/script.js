const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    const sprites = {
      animated: data['sprites']?.['versions']?.['generation-v']?.['black-white']?.['animated']?.['front_default'],
      official: data['sprites']?.['other']?.['official-artwork']?.['front_default'],
      frontDefault: data['sprites']?.['front_default'],
      home: data['sprites']?.['other']?.['home']?.['front_default']
    };
    
  
    const validSprite = sprites.animated || sprites.official || sprites.frontDefault || sprites.home;
    
    if (validSprite) {
      pokemonImage.src = validSprite; 
      pokemonImage.onerror = () => {
        console.log('Error cargando sprite, usando fallback');
        pokemonImage.src = sprites.official || sprites.frontDefault || sprites.home || '';
      };
    } 
    input.value = '';
    searchPokemon = data.id;
  }
  else {
    pokemonImage.src = './images/not-found.png';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});



renderPokemon(searchPokemon);
