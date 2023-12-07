const {Router} = require ('express')
const{listAnime,listAnimeByID, addAnime, updateAnime, deleteAnime}=require('../controllers/anime');

const router =Router();

//http://localhost:3000/api/v1/anime/
//http://localhost:3000/api/v1/anime/1
//http://localhost:3000/api/v1/anime/3
router.get('/', listAnime);
router.get('/:id', listAnimeByID);
//router.post('/', signIn);
router.put('/', addAnime);
router.patch('/:id', updateAnime);
router.delete('/:id', deleteAnime);
module.exports =router;