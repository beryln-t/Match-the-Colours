# Match the Colours

## Game Description

Playing the _Disney Princess Memory Card Game_ with my nieces has always been a fond memory of mine, and was a key inspiration behind the creation of this game.

With age our brain deteriorates, and our mental function slowly decreases. To prevent this, [scientists](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0055518) have found that just 15 minutes of brain training exercises a day can improve our brain function. Memory games can provide the necessary brain training exercises and have been used even in early childhood to help develop cognitive functions. This game aims to do just that and keep your mind nimble. So, match on!

## How to Play

[Click here](https://beryln-t.github.io/Project-1-Memory-Game/) to try the game.

The objective of the game is to find all matching pairs of tiles. In each level, there will be a fixed number of total correct matches. To win, players need to find all matching tiles before the timer runs out. But there's a catch, you only have a limited number of tries so choose each tile wisely! There are 12 levels to this game, how far can you go?
<br>

> - To start the game, click on the `Start` button.
> - Once the tiles are generated, click on 2 different tiles in the grid to start matching.
> - The timer will begin running once the first tile is clicked.
> - If tiles are a correct match, they will remain open.
> - If tiles do not match, they will be flipped.
> - Continue clicking tiles till all matching pairs are found.
> - Once the level is completed, proceed to the next level to attempt the game with increased difficulty.
> - If you've failed the level, click on `Restart` to try the level again.
> - Click on `Home` to restart the entire game and begin from level 1.
>   <br>

<p align="center"><img src="https://raw.githubusercontent.com/beryln-t/Project-1-Memory-Game/main/readme%20pics/Start%20Screen.png" width="50%" height="50%"> </p>
 <p align="center">[Start screen]</p>

<p align="center"><img src="https://raw.githubusercontent.com/beryln-t/Project-1-Memory-Game/main/readme%20pics/During%20game.png" width="50%" height="50%"> </p>
 <p align="center">[Game grid with successfully matched tiles]</p>

<p align="center"><img src="https://raw.githubusercontent.com/beryln-t/Project-1-Memory-Game/main/readme%20pics/Other%20Levels.png" width="50%" height="50%"> </p>
 <p align="center">[Subsequent levels with increased difficulty]</p>

## Technologies Used

1. HTML
2. CSS
3. JavaScript
4. Git and GitHub

## Key Development Considerations

### 1. Picking unique random colours

The table has to be filled with pairs of unique colours. In the event that the entire table is filled with the same colour, any random click will result in the same match. Hence there is a need to check that colours selected are not the same by comparing the hex code, and removing colours that have already been selected from available options.

```javascript
const useRandomColorHelp = () => {
  const pickRandomInteger = (maxLength) => {
    return Math.floor(Math.random() * (maxLength - 0 + 1)) + 0;
  };

  const getRandomColor = (colorsSelectedList, colorsArr) => {
    let randomIndex = pickRandomInteger(colorsArr.length - 1);
    let color = colorsArr[randomIndex].code.hex; // generating random colour with random index

    if (colorsSelectedList.includes(color)) {
      return getRandomColor(colorsSelectedList, colorsArr); //making sure it is a unique colour
    }
    return color;
  };

  return {
    pickRandomInteger,
    getRandomColor,
  };
};
```

### 2. Preventing clicks on the same tile

While testing during development, I found out that clicking on the same tile or clicking on already matched tiles would also count as a correct match. Hence to prevent that, I had to prevent clicks on tiles that are already open.

This is done by adding a "data-is-open" attribute to tiles that have already been clicked. Then checking for that attribute in subsequent clicks.

```javascript
let isTableDataOpen = tableData.getAttribute("data-is-open"); // 1 is true and data is open. 0 is false, data is closed.

tableData.setAttribute("data-is-open", 1);
```

```javascript
if (tableData.tagName !== "TD" || Number(isTableDataOpen) === 1) {
  return;
}
```

## Future Enhancements and Developments

- Including access to a list of levels that have been cleared to toggle between levels easily.
- Including a high score board based on timing taken to clear rounds.
- Tidy up colour array to make colours more distinct for easier matching.
- A way to increase difficulty other than by increasing grid size. Perhaps make it more challenging by generating an entire table with different hues of the same colour.
- Include audio.

## Summary

Embarking on this project 2 weeks into my coding journey was challenging, even though the game was relatively simpler and did not involve overly complicated codes. I tried to make it more interesting by coding a dynamic table that will allow for the creation of many levels. There are many areas that I need to work on, like furthering my understanding of JavaScript and how to write more efficient codes.

Key takeaways include:

- Be more detailed when planning user stories and write more detailed pseudo codes.
- There will be many loopholes to resolve along the way.

### Game Asset Attributions

The following assets used in the project do not belong to me. All rights belong to the original artists and creators.

- [Color Array](https://gist.github.com/mucar/3898821)
- [Background Image](https://unsplash.com/photos/BtbjCFUvBXs)
