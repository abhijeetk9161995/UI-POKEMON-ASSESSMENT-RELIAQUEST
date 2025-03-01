import * as React from 'react';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PokemonSelected } from '../../hooks/useGetSelectedPokemon';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type props = {
    isOpen: boolean,
    pokemon: PokemonSelected,
    setOpenDialog: any,
}

export const CustomizedDialogs = (props: props) => {
  const classes = useStyles();
  const {isOpen, pokemon, setOpenDialog} = props; 
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  useEffect (() => {
    setOpen(isOpen);
  }, [isOpen]) 

  useEffect (() => {
    // console.log("pokemonpokemonpokemon", pokemon.types)
  }, [pokemon])

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div>{pokemon.name}</div>
          <div>{pokemon.classification}</div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
        </IconButton>
        <DialogContent dividers>
          <div className={classes.pokemonDiv}>
            <img className={classes.pokemonImg} src={pokemon.image} />
          </div>
          <Typography gutterBottom>
            <div className={classes.pokemonDetailsDiv}>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Height</h3>
                    <li>
                    Maximum: {pokemon?.height?.maximum}
                    </li>
                    <li>
                    Minimum: {pokemon?.height?.minimum}
                    </li>
              </span>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Weight</h3>
                    <li>
                    Maximum: {pokemon?.weight?.maximum}
                    </li>
                    <li>
                    Minimum: {pokemon?.weight?.minimum}
                    </li>
              </span>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Type</h3>
                { pokemon?.types && pokemon?.types?.map( (type, i) => (
                  <li key={i}>
                    {type}
                  </li>
                ))}  
              </span>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Resistant</h3>
                { pokemon?.resistant && pokemon?.resistant?.map( (type, i) => (
                  <li key={i}>
                    {type}
                  </li>
                ))}  
              </span>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Weaknesses</h3>
                { pokemon?.weaknesses && pokemon?.weaknesses?.map( (type, i) => (
                  <li key={i}>
                    {type}
                  </li>
                ))}  
              </span>
              <span className={classes.pokemonDetailsSpan}>
                <h3>Flee Rate</h3>
                    <li>
                    {pokemon?.fleeRate}
                    </li>
              </span>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}


const useStyles = createUseStyles(
  {
    pokemonDiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '20px',
      border: 'none'
    },
    pokemonImg: {
      height: '200px',
      width: '200px',
      border: 'none',
      objectFit: 'contain'
    },
    pokemonDetailsDiv: {
      width: '550px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    pokemonDetailsSpan: {
      margin: '10px',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '10px',
      width: '200px'
    }
  }
  
);
