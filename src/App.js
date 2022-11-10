import React, { useState } from 'react';
import { 
  Typography,
  Grid,
  Box,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from '@mui/material';
import { TableRowItem } from './components'
import axios from 'axios';

const App = () => {
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [pokemonError, setPokemonError] = useState(false);
  const [pokemonErrorText, setPokemonErrorText] = useState('');

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const result = await axios.get(url);
      toArray.push(result.data);
      setPokemonType(result.data.types[0].type.name);
      setPokemonData(toArray);
      console.log(result);
    } catch(err) {
      setPokemonError(!!err)
      setPokemonErrorText('Not a Pokemon!')
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setPokemonError(false)
    setPokemonErrorText('')
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  return (
    <>
      <Grid container xs={12} display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: '75%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h1">
                Poke Guesser
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
                centered
              >
                <TextField
                  id='pokemon-choice'
                  data-testid='pokemon-input'
                  label='Pokemon'
                  variant='filled'
                  onChange={handleChange}
                  error={pokemonError}
                  helperText={pokemonErrorText}
                />
              </Box>
            </Grid>
            {pokemonData.map((data) => {
              const height = `${Math.round(data.height * 3.9)} "`
              const weight = `${Math.round(data.weight / 4.9)} lbs`

              return (
                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="Pokemon stats table">
                      <TableBody>
                        <TableRowItem
                          title="Type"
                          info={pokemonType}
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
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default App;
