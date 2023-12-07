const {request, response} = require('express');
const anmodels = require('../models/anime');
const pool=require('../db');

const listAnime = async (req = request, res = response) => {
    let conn; 

    try{
        conn = await pool.getConnection();

    const anime = await conn.query (anmodels.getAll, (err)=>{
        if(err){
            throw err
        }
    });

    res.json(anime);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    
}

const listAnimeByID = async (req = request, res = response) => {
    
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }

    let conn; 
    try{
        conn = await pool.getConnection();

    const [anime] = await conn.query (anmodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!anime) {
        res.status(404).json({msg: 'Anime not foud'});
        return;
    }
    
    
    res.json(anime);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}

const addAnime =async(req = request, res= response)=>{
    let conn;
    const {
        Title,
        Score
    } = req.body;
    if (!Title|| !Score){
res.status(400).json({msg:'Missing informarion'});
return;
        }
       

        const anime= [Title, Score]

       
    
    try {

        conn = await pool.getConnection();
        
        

        
        const AnimeAdded = await conn.query(anmodels.addRow,[...anime],(err)=>{

        })
        
        if (AnimeAdded.affecteRows === 0) throw new Error ({msg:'Failed to add Anime'});
        res.json({msg:'Anime add succesfully'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}

const updateAnime=async(req = request, res= response)=>{
    const {
        Title,
        Score
    } = req.body;

const {id} = req.params;
let newUserData=[
    Title,
    Score  
];
let conn;
try{
    conn = await pool.getConnection();
const [AnimeExists]=await conn.query(
    anmodels.getByID,
    [id],
    (err) => {if (err) throw err;}
);
if (!AnimeExists){
    res.status(404).json({msg:'Name not found'});
    return;
}

const oldUserData = [
    AnimeExists.Title,
    AnimeExists.Score,
    
];

newUserData.forEach((anData, index)=> {
    if (!anData){
        newUserData[index] = oldUserData[index];
    }
})

const anUpdate = await conn.query(
    anmodels.updateAnime,
    [...newUserData, id],
    (err) => {if (err) throw err;}
); 
if(anUpdate.affecteRows === 0){
    throw new Error ('Anime not updated');
}
res.json({msg:'Name of Anime updated successfully'})
}catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteAnime = async (req = request, res= response)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const {id} =req.params;
        const [anExists] =await conn.query(
            anmodels.getByID,
            [id],
            (err) => {if (err) throw err;}
        );
        if(!anExists){
            res.status(404).json({msg:'Anime not Found'});
            return;
        }

        const userDelete = await conn.query(
            anmodels.deleteRow,
            [id],
            (err) => {if(err)throw err;}
        );
        if (userDelete.affecteRows===0){
            throw new Error({msg:'failed to delete Anime'})
        };
        res.json({msg:'Anime deleted succesfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }finally{
       if(conn) conn.end(); 
    }
}

module.exports={listAnime, listAnimeByID, addAnime, updateAnime, deleteAnime};