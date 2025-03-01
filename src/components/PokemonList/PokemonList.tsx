import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useSelectedGetPokemon } from '../../hooks/useGetSelectedPokemon';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef  } from '@mui/x-data-grid';
import { CustomizedDialogs } from '../Dialog/dialog'

export const PokemonList = () => {
 
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const {pokemon, setReqData} = useSelectedGetPokemon();
  const {} = useSelectedGetPokemon();
  const [rows, setRowsData] =  useState<any>([])
  const [open, setOpen] = useState<boolean>(false);

  const renderList = (types: any) => {
    return <ul className={classes.list}>
      {
        types.map( (type: any, i: any) => (
           <li key={i} className={classes.listItem}>{type}</li>
        ))
      }
    </ul>;
  }
  const columns: GridColDef[] = [
    { field: 'number', headerName: 'Number', flex: 1 , headerClassName: classes.hederStyle },
    { field: 'name', headerName: 'Name', flex: 1 , headerClassName: classes.hederStyle },
    { field: 'type',  headerName: 'Type', flex: 1 , headerClassName: classes.hederStyle, renderCell: (params) => <>{renderList(params.value)}</>},
    { field: 'image',  headerName: 'Image', flex: 1 , headerAlign: 'center', headerClassName: classes.hederStyle, renderCell: (params) => <img className={classes.pokemonImg} src={params.value} /> }
  ];
  const paginationModel = { page: 0, pageSize: 20 };
  
  useEffect ( () => {
    setData(pokemons)
  }, [pokemons]) 



  const setData = (pokemons: any) => {
    let rowData: any = [];
    pokemons.map( (pok: any) => {
      let tp: string = '';
      rowData.push({
        id: pok.id,
        number: pok.number, 
        name: pok.name, 
        type:pok.types,
        image: pok.image})
    })
    setRowsData(rowData);
  }

  const  serachPokemon = (e: any) => {
    // search by all columns 
    if (e.target.value.length) {
      const serachedValue = pokemons.filter( (value: any) => {
        return value.name.toLowerCase().includes(e.target.value.toLowerCase()) || value.number === e.target.value
         || value.types.some( (val: any) => {
            return val.toLowerCase().includes(e.target.value.toLowerCase());
         })
      })
      setData(serachedValue);
    } else {
      setData(pokemons);
    }
    
  }

  const handleRowClick = (pokemonData: any) => {
    setReqData({id: pokemonData.row.id})
    setOpen(true)
  }

  return (
    <div className={classes.root}>
      <div  className={classes.serchBox}>
        <TextField  onChange={serachPokemon} className={classes.serchInput} id="outlined-search" label="Search" type="search"/>
      </div>
      <DataGrid 
        rowHeight={200} 
        rows={rows} columns={columns} 
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20]}
        sx={{ '& .MuiDataGrid-cell': { padding: '10px' , color: "#fff"}, 
        '& .MuiDataGrid-columnHeaderTitle': {color: "#000"},
        '& .MuiDataGrid-row:hover': {
          backgroundColor: '#172538',
          cursor:'pointer'},
        '& .MuiDataGrid-menuList': {
          backgroundColor: '#000',
        },
        '& .MuiDataGrid-withBorderColor': {
          backgroundColor: "#fff"
        }
        }}
        onRowClick={handleRowClick}
          />
          {pokemon &&
          <CustomizedDialogs isOpen={open} pokemon={pokemon} setOpenDialog={setOpen}/>
          }
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokemonImg: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
    },
    hederStyle: {
      color: "#0000"
    },
    serchBox: {
     display: 'flex'
    },
    serchInput: {
      background: '#fff',
      margin: '0px 0px 10px 0px',
      border: '1px solid #000',
      borderRadius: '5px'
    },
    list: {
      margin: '0',
      lineHeight: '1',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    listItem: {
      marginTop: '20px'
    }
  },
  { name: 'PokemonList' },
  
);
