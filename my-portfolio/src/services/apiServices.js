const FILE_MAP = {
    '/gamedev': '/data/game/game_projects.json', 
    '/photography': '/data/photography/photo_projects.json', 
    '/webdev': '/data/web/web_projects.json', 
    '/3d': '/data/3d/3d_projects.json'
}

//function used to fetch a single project based on section and id
export async function fetchOneProject(section, projId){
    
    const filePath = FILE_MAP[section]; //getting the json file path based on the passed value of seciton

    //fetch the json file from the found file path
    return fetch(filePath)
        
        //handle the fetch response
        .then(response => {

            //throw an error if thre response status is not okay
            if(!response.ok){
                throw new Error("FETCH SINGULAR PROJECT response was NOT OKAY");
            }

            return response.json(); //parse the response body as json and return a promise that resolves the parsed data
        })
        //process the parsed json data
        .then(projects => {
            //find the project based on it's id in the json data
            const project = projects.find(proj => proj.id === projId); 

            //throw an error if the project was not found
            if(!project){
                throw new Error("Project not found"); 
            }

            return {...project };   //return the project
        })
        //send console error when any error occurs during fetch
        .catch(error =>{
            console.error('Fetch operation error: ', error);
        })
}

//function used to fetch all projects in a section
export async function fetchAllProjects(section) {

    const filePath = FILE_MAP[section]; //get the file path based on the given value of section

    //fetch the json file from the file path found
    return fetch(filePath)
        .then(response =>{

            //verify that the response is okay
            if(!response.ok){
                throw new Error("FETCH MULTIPLE PROJECTS response was NOT OKAY"); 
            }
            
            return response.json(); //return the response as json
        })
        //send console error when any occur during the fetch operation
        .catch(error =>{
            console.error("fetch operation error: ", error);
        })

}