import React, { useEffect, useState } from 'react'
import './App.css'
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
} from '@mui/material'
import { TableRowItem, FailurePopUp, CorrectPopUp } from './components'
import voca from 'voca'
import axios from 'axios'

const gridCenterAttributes = {
  xs: 12,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const App = () => {
  const [pokemon, setPokemon] = useState(Math.floor(Math.random() * 905))
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonGuess, setPokemonGuess] = useState('')
  const [pokemonData, setPokemonData] = useState([])
  const [openWin, setOpenWin] = React.useState(false)
  const handleOpenWin = () => setOpenWin(true)
  const handleCloseWin = () => {
    setOpenWin(false)
    settingPokemon()
  }
  const [openFail, setOpenFail] = React.useState(false)
  const handleOpenFail = () => setOpenFail(true)
  const handleCloseFail = () => {
    setOpenFail(false)
    settingPokemon()
    setPokemonStreak(0)
  }
  const [pokemonStreak, setPokemonStreak] = useState(0)
  const [hintCount, setHintCount] = useState(3)
  const [hintHidden, setHintHidden] = useState(true)
  const [hintDisabled, setHintDisabled] = useState(false)

  function settingPokemon() {
    const pokemonRandom = Math.floor(Math.random() * 905) // limit is 905
    setPokemon(pokemonRandom)
  }

  /**
   * @description - sets the first pokemon on render
   */
  useEffect(() => {
    settingPokemon()
  }, [])

  /**
   * @description - runs getPokemon() anytime the pokemon state is updated
   */
  useEffect(() => {
    getPokemon()
  }, [pokemon])

  /**
   * @description makes to api call to get the pokemon data
   */
  const getPokemon = async () => {
    const toArray = []
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const result = await axios.get(url)
      toArray.push(result.data)
      setPokemonData(toArray)
      setPokemonName(result.data.name)
      console.log(result.data.name)
    } catch(err) {
      console.error(err)
    }
  }

  /**
   * @description handles the button clicks for the hint(s)
   * subtracts 1 from the total of hints left
   * shows the available hints
   * disables the button
   */
  const handleHintClick = () => {
    setHintCount((val) => val - 1)
    setHintHidden(false)
    setHintDisabled(true)
  }

  /**
   * @description checks the value of hintCount to determine if the hint button should be disabled
   */
  useEffect(() => {
    if(hintCount <= 0) {
      setHintDisabled(true)
    }
  }, [hintCount])

  /**
   * @description used to set the pokemonGuess
   * @param {string} e - value within TextField
   */
  const handleInputChange = (e) => {
    setPokemonGuess(e.target.value.toLowerCase())
  }

  /**
   * @description Handles if pokemonGuess was correct or not
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    setHintHidden(true)
    if(pokemonGuess.toLowerCase() === pokemonName.replace('-', ' ')) {
      setPokemonStreak((val) => val + 1)
      if(hintCount > 0) {
        setHintDisabled(false)
      }
      setPokemonGuess('')
      handleOpenWin()
    } else {
      setHintDisabled(false)
      setHintCount(3)
      setPokemonGuess('')
      handleOpenFail()
    }
  }

  return (
    <>
      <Grid container display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: '75%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item {...gridCenterAttributes}>
              <Typography variant="h1">
                Poke Guesser
              </Typography>
            </Grid>
            <Grid item {...gridCenterAttributes}>
              <Grid item xs={6}>
                <Typography>
                  Streak: {pokemonStreak}
                </Typography>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="right" alignItems="right">
                <Button
                  variant="contained"
                  onClick={handleHintClick}
                  disabled={hintDisabled}
                >
                  Hint ({hintCount})
                </Button>
              </Grid>
            </Grid>
            <Grid item {...gridCenterAttributes}>
              <Box
                sx={{'& .MuiTextField-root': { m: 1, minWidth: '75vw' }}}
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  id='pokemon-input'
                  data-testid='pokemon-input'
                  label='Your Guess'
                  variant='filled'
                  value={pokemonGuess}
                  onChange={handleInputChange}
                />
              </Box>
            </Grid>
            {pokemonData.map((data, key) => {
              const height = `${Math.round(data.height * 3.9)} "`
              const weight = `${Math.round(data.weight / 4.9)} lbs`

              return (
                <>
                  <Grid key={key} item xs={12} display="flex" justifyContent="center" alignItems="center">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="Pokemon stats table">
                        <TableBody>
                          {data.types.map((type, key) => {
                            const name = voca.titleCase(type.type.name).replace('-', ' ')

                            return (
                              <TableRowItem
                                key={key}
                                isHidden={false}
                                title={`Type ${key + 1}`}
                                info={name}
                              />
                            )
                          })}
                          {data.abilities.map((ability, key) => {
                            const name = voca.titleCase(ability.ability.name).replace('-', ' ')

                            return (
                              <TableRowItem
                                key={key}
                                isHidden={false}
                                title={`Ability ${key + 1}`}
                                info={name}
                              />
                            )
                          })}
                          <TableRowItem
                            isHidden={hintHidden}
                            title="Height"
                            info={height}
                          />
                          <TableRowItem
                            isHidden={hintHidden}
                            className="hint-abilities"
                            title="Weight"
                            info={weight}
                          />
                          <TableRowItem
                            isHidden={hintHidden}
                            className="hint-abilities"
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
                      streak={pokemonStreak}
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
  )
}

export default App
