import React, { useEffect, useState } from 'react';
import { 
  Typography,
  Grid,
  Box,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableBody,
  Button,
} from '@mui/material';
import { TableRowItem, FailurePopUp, CorrectPopUp } from './components'
import axios from 'axios';

const gridCenterAttrivutes = {
  xs: 12,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const App = () => {
  const [pokemon, setPokemon] = useState('');
  const [pokemonGuess, setPokemonGuess] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType1, setPokemonType1] = useState('');
  const [pokemonType2, setPokemonType2] = useState('');
  const [openWin, setOpenWin] = React.useState(false);
  const handleOpenWin = () => setOpenWin(true);
  const handleCloseWin = () => {
    setOpenWin(false)
    settingPokemon()
  };
  const [openFail, setOpenFail] = React.useState(false);
  const handleOpenFail = () => setOpenFail(true);
  const handleCloseFail = () => {
    setOpenFail(false)
    settingPokemon()
  };
  const [pokemonStreak, setPokemonStreak] = useState(0);
  // let pokemonStreak = 0;

  function settingPokemon() {
    const pokemonRandom = Math.floor(Math.random() * 905) // limit is 905
    console.log('setting pokemon data...', pokemonRandom)
    setPokemon(pokemonRandom)
  }
  /**
   * get pokemon on load and set stats
   */
  useEffect(() => {
    settingPokemon()
  }, [])

  useEffect(() => {
    console.log(' getting pokemon data...')
    getPokemon();
  }, [pokemon])

  /**
   * call pokemonapi
   * push data to array
   */
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const result = await axios.get(url);
      toArray.push(result.data);
      setPokemonType1(result.data.types[0].type.name);
      setPokemonType2(result.data.types[1].type.name);
      setPokemonData(toArray);
      console.log(result);
      console.log(result.data.name);
    } catch(err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    setPokemonGuess(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(pokemonGuess.toLowerCase() === pokemonData[0].name) {
      // console.log('MATCHES!')
      setPokemonStreak((val) => val + 1)
      handleOpenWin()
    } else {
      // console.log('FALIURE!')
      setPokemonStreak(0)
      handleOpenFail()
    }
  }

  return (
    <>
      <Grid container display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: '75%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {/* <Button onClick={handleOpenFail}>Open modal</Button> */}
            <Grid item {...gridCenterAttrivutes}>
              <Typography variant="h1">
                Poke Guesser
              </Typography>
            </Grid>
            <Grid item {...gridCenterAttrivutes}>
              <Typography>
                Streak: {pokemonStreak}
              </Typography>
            </Grid>
            <Grid item {...gridCenterAttrivutes}>
              <Box
                sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  id='pokemon-input'
                  data-testid='pokemon-input'
                  label='Your Guess'
                  variant='filled'
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            {pokemonData.map((data) => {
              const height = `${Math.round(data.height * 3.9)} "`
              const weight = `${Math.round(data.weight / 4.9)} lbs`

              return (
                <>
                  <Grid key={data.name} item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="Pokemon stats table">
                        <TableBody>
                          <TableRowItem
                            title="Type 1"
                            info={pokemonType1}
                          />
                          <TableRowItem
                            title="Type 2"
                            info={pokemonType2}
                          />
                          <TableRowItem
                            title="Ability 1"
                            info={data.abilities[0].ability.name}
                          />
                          <TableRowItem
                            title="Height"
                            info={height}
                          />
                          <TableRowItem
                            title="Weight"
                            info={weight}
                          />
                          <TableRowItem
                            title="# of Games"
                            info={data.game_indices.length}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <CorrectPopUp
                      isOpen={openWin}
                      closeFunction={handleCloseWin}
                      pokemonName={data.name}
                      imageSource={data.sprites}
                    />
                    <FailurePopUp
                      isOpen={openFail}
                      closeFunction={handleCloseFail}
                      pokemonName={data.name}
                      imageSource={data.sprites}
                    />
                  </Grid>
                </>
              )
            })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default App;
