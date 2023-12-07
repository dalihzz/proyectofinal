const anmodels = {
    getAll: `
    SELECT 
    * 
    FROM 
    anime`,

    getByID: `
    SELECT
    *
    FROM
    anime
    WHERE
    Rank_anime = ?
    `,
    addRow:`
    INSERT INTO
    anime(
        Title,
        Score
    )
    VALUES (
        ?,?
    )`,
 

    updateAnime:`
    UPDATE
    anime
    SET
    Title =? ,
    Score = ?
        WHERE 
        Rank_anime =?
    `,

    deleteRow:`
    DELETE FROM 
    anime
        WHERE 
    Rank_anime =?
    `,
    
    
}

module.exports=anmodels;